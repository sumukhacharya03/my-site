---
title: "DFOS"
date: 2024-11-15
description: "Distributed File Orchestration System"
---

[GitHub →](https://github.com/sumukhacharya03/DFOS)

### What is it?

A multi-client file transfer system built from scratch in Python — no frameworks, just raw sockets. Clients authenticate, get their own isolated storage directory on the server, and can upload, download, preview, or delete files concurrently without stepping on each other.

### Why I built it

I wanted to understand what actually happens under the hood when files move across a network — before abstractions like FTP clients or cloud SDKs hide all the interesting parts. Building it at the socket level made the concurrency and protocol design problems impossible to ignore.

### How it works

- A thread pool on the server handles multiple client connections simultaneously, so one slow transfer doesn't block others.
- Each authenticated user gets their own dedicated directory — no cross-user access.
- File operations: upload, download, delete, and a lightweight preview mode that fetches just the first 1KB of a file without pulling the whole thing.
- Performance is logged throughout: connection counts, transfer metrics, and CPU/memory stats on shutdown.

### Tech Stack

- **Language:** Python 3
- **Networking:** `socket` (raw TCP)
- **Concurrency:** `threading`, `ThreadPoolExecutor`
- **Monitoring:** `logging`, `psutil`