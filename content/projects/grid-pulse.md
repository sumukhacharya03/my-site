---
title: "Grid Pulse"
date: 2025-07-01
description: "Real-Time Stock Market for F1 Drivers"
---

[GitHub →](https://github.com/sumukhacharya03/Grid-Pulse)

### What is it?

**Grid-Pulse** is a real-time data pipeline that turns F1 race weekends into a live stock market. Every driver has a stock value that rises and falls based on their performance — qualifying laps, race positions, practice results — visualised on a live dashboard that updates as events unfold.

### Why I built it

F1 is already obsessive about data. I wanted to explore what it would look like to model driver performance as a financial instrument — and use it as a real excuse to build a proper streaming data pipeline from scratch, not just a toy script.

### How it works

The system runs in two phases:

1. **Historical batch processing** — scrapes baseline driver values and processes a full simulated season to establish the initial market state.
2. **Live stream processing** — a long-running service listens for real-time race weekend events (triggered by a cron job on race days) and applies incremental updates to each driver's stock value.

Data flows through Apache Kafka, which decouples the producers (data generators) from the consumers (calculation service and dashboard), so each component runs independently.

### Tech Stack

- **Data pipeline:** Python, Apache Kafka
- **Dashboard:** Streamlit
- **Data sources:** Scraped baseline values + simulated race event generators