---
title: "Restaurant Ordering System"
date: 2024-04-15
description: "Restaurant Ordering System using Socket Programming and SSL"
---

[GitHub →](https://github.com/sumukhacharya03/Restaurant-Ordering-System)

### What is it?

A client-server restaurant ordering system built in Python using raw sockets, secured with SSL/TLS. Clients can browse the menu, place orders, and get a GST-calculated bill — all over an encrypted connection.

### Why I built it

This was an early deep-dive into network programming. I wanted to understand how client-server communication actually works at the socket level, and adding SSL on top made it a practical exercise in securing that channel — not just making things talk, but making them talk safely.

### How it works

- The server listens for incoming client connections over an SSL-wrapped TCP socket.
- Clients can view the menu, place orders with quantities, and receive an itemised bill with 5% GST applied.
- Python objects are serialised with `pickle` to pass structured data (menus, orders) cleanly across the connection.
- Clients can also submit feedback, which the server logs.

### Tech Stack

- **Language:** Python 3
- **Networking:** `socket`, `ssl`
- **Serialisation:** `pickle`
- **Libraries:** `tabulate`