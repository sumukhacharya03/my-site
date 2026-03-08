---
title: "Dynamic Fare Engine"
date: 2024-10-10
description: "Ensemble Forecasting for RideWave"
---

[GitHub →](https://github.com/sumukhacharya03/Dynamic-Fare-Engine)

### What is it?

A fare forecasting system for RideWave, a fictional urban mobility company operating bikes, autos, and cars in Quahog City. Given three years of hourly fare data (2021–2023), I built predictive models for each vehicle type and combined them into an ensemble to power dynamic pricing recommendations.

### Why I built it

Dynamic pricing is one of the more interesting applied ML problems — it sits at the intersection of time series forecasting, business strategy, and real operational constraints. I wanted to work through the full pipeline: exploratory analysis, model selection, feature engineering, and ensemble design, rather than just fitting a single off-the-shelf model.

### How it works

Each vehicle type behaved differently in the data, so I used a different model for each:

- **Bikes** → SARIMAX, to capture both trend and seasonality in the time series.
- **Autos** → XGBoost, after feature engineering revealed patterns better suited to a gradient boosting approach.
- **Cars** → VAR (Vector Autoregression), to model inter-variable relationships.

The three models were then combined into an ensemble for a more robust final forecast. Performance was measured using SMAPE — a percentage-based error metric that handles the scale differences across vehicle types fairly.

### Tech Stack

- **Language:** Python
- **Models:** SARIMAX, XGBoost, VAR, Holt-Winters, Ensemble
- **Libraries:** pandas, numpy, statsmodels, scikit-learn, matplotlib, seaborn