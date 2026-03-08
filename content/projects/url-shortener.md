---
title: "URL Shortener"
date: 2025-03-15
description: "Load Balanced URL Shortener"
---

[GitHub →](https://github.com/sumukhacharya03/URL-Shortener)

### What is it?

A production-grade URL shortening service — the kind of system you'd actually deploy, not just demo. Built with Flask and Redis, containerised with Docker, and orchestrated on Kubernetes with autoscaling, load balancing, and health monitoring out of the box.

### Why I built it

URL shorteners are a classic system design problem. I wanted to go beyond the basic implementation and actually build it the way it would run in production — with horizontal scaling, ingress routing, and the ability to handle real traffic spikes without falling over.

### How it works

- Flask handles the API: shorten a URL, get back a short code, redirect on lookup.
- Redis acts as the fast key-value store for the short code → original URL mapping.
- Kubernetes manages deployment across multiple pods, with a Horizontal Pod Autoscaler (HPA) that spins up new instances under load.
- NGINX Ingress handles routing under a custom domain (`short.ly`).

To verify it holds up, I wrote a stress test that fires 1000 concurrent requests — the service handled them at 88 req/sec with a 100% success rate.

### Tech Stack

- **Backend:** Python, Flask, Redis
- **Infrastructure:** Docker, Kubernetes (Minikube), NGINX Ingress, HPA