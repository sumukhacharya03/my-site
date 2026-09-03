/* =========================================================================
   Site behaviour: mobile nav, timeline rails, skills chips, terminal.
   Everything here is progressive enhancement — with JS off, the page is
   still fully navigable and readable.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  var MOBILE = "(max-width: 800px)";

  function syncNav() {
    if (!navToggle || !nav) return;
    if (window.matchMedia(MOBILE).matches) {
      nav.hidden = navToggle.getAttribute("aria-expanded") !== "true";
    } else {
      nav.hidden = false;
    }
  }

  if (navToggle && nav) {
    navToggle.setAttribute("aria-expanded", "false");
    syncNav();

    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", open ? "false" : "true");
      syncNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        navToggle.setAttribute("aria-expanded", "false");
        syncNav();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", syncNav);
  }

  /* ---------------------------------------------------------------------
     Timeline rails

     The green dot marks the entry the cursor (or keyboard focus) is on: it
     glides to whichever item is hovered and fades out when the pointer leaves
     the rail. Position is measured from the item's own node marker, so the dot
     lands exactly on it rather than at a guessed offset.

     Focus is handled alongside hover so the dot is not mouse-only, and the
     one-off fade-up of entries is skipped under prefers-reduced-motion.
     --------------------------------------------------------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var rails = [].slice.call(
    document.querySelectorAll("[data-rail], .prose #education + ul")
  );

  rails.forEach(function (rail) {
    var items = [].slice.call(
      rail.querySelectorAll(".timeline__list > li, :scope > li")
    );
    if (!items.length) return;

    /* Move the dot onto an item's node marker. */
    function markerCentre(item) {
      var railBox = rail.getBoundingClientRect();
      var itemBox = item.getBoundingClientRect();
      var y = itemBox.top - railBox.top;

      /* The node is a ::before, so read its used geometry rather than
         hard-coding an offset that differs per rail type. */
      var top = 0;
      var height = 8;
      try {
        var cs = window.getComputedStyle(item, "::before");
        top = parseFloat(cs.top) || 0;
        height = parseFloat(cs.height) || height;
      } catch (e) {
        /* fall back to the item's own top */
      }
      return y + top + height / 2;
    }

    function moveTo(item) {
      rail.style.setProperty("--rail-y", markerCentre(item).toFixed(1) + "px");
      rail.classList.add("rail--active");
    }

    function clear() {
      rail.classList.remove("rail--active");
    }

    items.forEach(function (item) {
      item.addEventListener("pointerenter", function () {
        moveTo(item);
      });
      item.addEventListener("focusin", function () {
        moveTo(item);
      });
    });

    rail.addEventListener("pointerleave", clear);
    rail.addEventListener("focusout", function (e) {
      if (!rail.contains(e.relatedTarget)) clear();
    });

    /* One-off fade-up as entries scroll into view. */
    if (reduceMotion.matches) return;

    items.forEach(function (li) {
      li.classList.add("rail-item");
    });

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
      );
      items.forEach(function (li) {
        io.observe(li);
      });
    } else {
      items.forEach(function (li) {
        li.classList.add("is-visible");
      });
    }
  });

  /* ---------------------------------------------------------------------
     Skills: turn each comma-separated list into chips

     Purely a re-layout of text that is already in the page — the words are
     read straight out of the DOM and never rewritten.
     --------------------------------------------------------------------- */
  (function () {
    var heading = document.getElementById("skills");
    if (!heading) return;
    var list = heading.nextElementSibling;
    if (!list || list.tagName !== "UL") return;

    [].forEach.call(list.children, function (li) {
      var label = li.querySelector("strong");
      if (!label) return;

      /* Everything after the bold label is the comma-separated value list. */
      var rest = "";
      var node = label.nextSibling;
      while (node) {
        rest += node.textContent;
        var next = node.nextSibling;
        li.removeChild(node);
        node = next;
      }

      var values = rest
        .split(",")
        .map(function (s) {
          return s.trim();
        })
        .filter(Boolean);

      if (!values.length) {
        li.appendChild(document.createTextNode(rest));
        return;
      }

      var wrap = document.createElement("div");
      wrap.className = "skill-chips";
      values.forEach(function (v) {
        var chip = document.createElement("span");
        chip.className = "skill-chip";
        chip.textContent = v;
        wrap.appendChild(chip);
      });
      li.appendChild(wrap);
    });
  })();

  /* ---------------------------------------------------------------------
     Terminal
     Command data is rendered by Hugo into window.__TERMINAL__, so the
     commands always reflect the real site menu — nothing is hard-coded here.
     --------------------------------------------------------------------- */
  var term = document.getElementById("terminal");
  if (!term) return;

  var data = window.__TERMINAL__;
  if (!data || !data.sections) return;

  var history = document.getElementById("terminal-history");
  var input = document.getElementById("terminal-input");
  if (!history || !input) return;

  var body = term.querySelector(".terminal__body") || term;
  var sections = data.sections || [];
  var past = [];
  var pastIndex = 0;
  var busy = false;

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pad(s, n) {
    s = String(s);
    while (s.length < n) s += " ";
    return s;
  }

  function promptHTML() {
    return (
      '<span class="terminal__prompt"><span class="user">' +
      escapeHTML(data.prompt) +
      '</span>:<span class="dir">~</span>$</span> '
    );
  }

  function echo(cmd) {
    var line = document.createElement("div");
    line.className = "terminal__line";
    line.innerHTML = promptHTML() + "<span>" + escapeHTML(cmd) + "</span>";
    history.appendChild(line);
  }

  /* Output keeps its literal spacing — the CSS sets white-space: pre-wrap, so
     padded columns survive instead of collapsing into a single space. */
  function out(text, isError) {
    var line = document.createElement("div");
    line.className = isError ? "terminal__err" : "terminal__out";
    line.textContent = text;
    history.appendChild(line);
  }

  function scrollToEnd() {
    body.scrollTop = body.scrollHeight;
  }

  function findSection(name) {
    for (var i = 0; i < sections.length; i++) {
      if (
        sections[i].slug === name ||
        String(sections[i].name).toLowerCase() === name
      ) {
        return sections[i];
      }
    }
    return null;
  }

  function findItem(section, name) {
    var items = section.items || [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].slug === name || String(items[i].name).toLowerCase() === name) {
        return items[i];
      }
    }
    return null;
  }

  /* Strips surrounding slashes/quotes and lowercases, so `cd "Projects"/`
     and `cd projects` behave the same. */
  function normalise(arg) {
    return String(arg || "")
      .trim()
      .replace(/^["']|["']$/g, "")
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase();
  }

  function navigate(url, label) {
    out("opening " + label + " ...");
    busy = true;
    input.setAttribute("disabled", "disabled");
    window.setTimeout(function () {
      window.location.href = url;
    }, 250);
  }

  var commands = Object.create(null);

  commands.help = function () {
    out("Available commands:");
    out("  " + pad("whoami", 16) + "who runs this site");
    out("  " + pad("ls", 16) + "list the sections of this site");
    out("  " + pad("ls <section>", 16) + "list what is inside a section");
    out("  " + pad("cd <section>", 16) + "go to a section (e.g. cd projects)");
    out("  " + pad("cd <sec>/<page>", 16) + "go straight to a page");
    out("  " + pad("clear", 16) + "clear the screen");
    out("");
    out("Tab completes, ↑/↓ walks your history, Ctrl+L clears.");
  };

  commands.whoami = function () {
    (data.whoami || []).forEach(function (l) {
      out(l);
    });
  };

  commands.ls = function (arg) {
    var target = normalise(arg);

    /* Bare `ls` — list the sections. */
    if (target === "") {
      sections.forEach(function (s) {
        var n = (s.items || []).length;
        out(pad(s.slug + "/", 16) + s.name + (n ? "  (" + n + ")" : ""));
      });
      return;
    }

    var section = findSection(target);
    if (!section) {
      out("ls: no such section: " + arg.trim(), true);
      out("Try `ls` on its own to see what exists.", true);
      return;
    }

    var items = section.items || [];
    if (!items.length) {
      out(section.name + " has nothing in it yet.");
      return;
    }
    items.forEach(function (it) {
      out(pad(it.slug, 24) + it.name);
    });
  };

  commands.clear = function () {
    history.innerHTML = "";
  };

  commands.cd = function (arg) {
    var target = normalise(arg);

    if (target === "") {
      out("cd: which section? Try `ls` to see them.", true);
      return;
    }

    var parts = target.split("/").filter(Boolean);
    var section = findSection(parts[0]);

    if (!section) {
      /* Allow `cd grid-pulse` without naming the section. */
      for (var i = 0; i < sections.length; i++) {
        var hit = findItem(sections[i], parts[0]);
        if (hit) {
          navigate(hit.url, hit.name);
          return;
        }
      }
      out("cd: no such section: " + arg.trim(), true);
      out("Try `ls` to see what exists.", true);
      return;
    }

    if (parts.length === 1) {
      navigate(section.url, section.name);
      return;
    }

    var item = findItem(section, parts.slice(1).join("/"));
    if (!item) {
      out("cd: " + section.slug + " has no page called: " + parts.slice(1).join("/"), true);
      out("Try `ls " + section.slug + "` to see what is in there.", true);
      return;
    }
    navigate(item.url, item.name);
  };

  /* ---- Tab completion ----
     Tab only ever completes. It never lists the possibilities — `help` and
     `ls` are where listings belong, and dumping every candidate on each Tab
     buries the prompt in noise. */
  function completions(value) {
    var m = value.match(/^(\s*)(\S*)(\s+)?([\s\S]*)$/);
    var cmd = (m[2] || "").toLowerCase();
    var hasSpace = !!m[3];

    if (!hasSpace) {
      return {
        prefix: "",
        typed: cmd,
        candidates: Object.keys(commands).filter(function (c) {
          return c.indexOf(cmd) === 0;
        })
      };
    }

    if (cmd !== "cd" && cmd !== "ls") return { prefix: null, typed: "", candidates: [] };

    var arg = (m[4] || "").toLowerCase();
    var slash = arg.lastIndexOf("/");

    if (slash === -1) {
      return {
        prefix: cmd + " ",
        typed: arg,
        candidates: sections
          .map(function (s) {
            return s.slug;
          })
          .filter(function (s) {
            return s.indexOf(arg) === 0;
          })
      };
    }

    var section = findSection(arg.slice(0, slash));
    if (!section) return { prefix: null, typed: "", candidates: [] };
    var rest = arg.slice(slash + 1);
    return {
      prefix: cmd + " " + section.slug + "/",
      typed: rest,
      candidates: (section.items || [])
        .map(function (it) {
          return it.slug;
        })
        .filter(function (s) {
          return s.indexOf(rest) === 0;
        })
    };
  }

  function commonPrefix(list) {
    var p = list[0] || "";
    for (var i = 1; i < list.length; i++) {
      var j = 0;
      while (j < p.length && j < list[i].length && p.charAt(j) === list[i].charAt(j)) j++;
      p = p.slice(0, j);
      if (!p) break;
    }
    return p;
  }

  function complete() {
    var res = completions(input.value);
    if (res.prefix === null || !res.candidates.length) return;

    /* Exactly one match — fill it in and move on. */
    if (res.candidates.length === 1) {
      input.value = res.prefix + res.candidates[0] + " ";
      return;
    }

    /* Several matches — fill in as far as they all agree, then stop.
       If they agree on nothing more, do nothing at all rather than
       printing a wall of options. */
    var shared = commonPrefix(res.candidates);
    if (shared.length > res.typed.length) {
      input.value = res.prefix + shared;
    }
  }

  function run(raw) {
    var line = raw.trim();
    echo(line);
    if (!line) return;

    /* Don't stack identical consecutive entries in the history. */
    if (past[past.length - 1] !== line) past.push(line);
    pastIndex = past.length;

    var parts = line.split(/\s+/);
    var name = parts[0].toLowerCase();
    var arg = parts.slice(1).join(" ");

    /* hasOwnProperty guard: without it, `constructor` or `toString` would
       resolve up the prototype chain and get called as a command. */
    if (Object.prototype.hasOwnProperty.call(commands, name)) {
      commands[name](arg);
    } else {
      /* Echo what they actually typed, not the lowercased lookup key. */
      out("command not found: " + parts[0] + " — type `help` to see what works.", true);
    }
  }

  input.addEventListener("keydown", function (e) {
    if (busy) {
      e.preventDefault();
      return;
    }

    /* Ctrl+L clears, as in a real shell. */
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      commands.clear();
      return;
    }

    /* Ctrl+C abandons the current line. */
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      echo(input.value + "^C");
      input.value = "";
      pastIndex = past.length;
      scrollToEnd();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      complete();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      run(input.value);
      input.value = "";
      scrollToEnd();
      return;
    }

    if (e.key === "ArrowUp") {
      if (pastIndex > 0) {
        pastIndex--;
        input.value = past[pastIndex];
        e.preventDefault();
        /* Put the caret at the end rather than wherever it was. */
        window.setTimeout(function () {
          input.selectionStart = input.selectionEnd = input.value.length;
        }, 0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      if (pastIndex < past.length - 1) {
        pastIndex++;
        input.value = past[pastIndex];
      } else {
        pastIndex = past.length;
        input.value = "";
      }
      e.preventDefault();
    }
  });

  /* Clicking anywhere in the terminal focuses the prompt — but never steal
     focus from a link the user is actually trying to click. */
  term.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    if (window.getSelection && String(window.getSelection())) return;
    input.focus();
  });
})();
