---
title: "Streamly"
date: 2024-09-10
description: "Content Strategy and User Retention Analysis for Streamly"
---

[GitHub →](https://github.com/sumukhacharya03/Streamly)

### What is it?

A data analysis and modelling project for Streamly, a fictional streaming platform. Using their catalogue and engagement data, I analysed what content actually drives user retention and built regression models to predict it — giving the business a data-backed foundation for content decisions.

### Why I built it

Streaming platforms live and die by retention. I was curious about what the data actually says when you cut through intuition — does budget correlate with ROI? Do certain genres retain users better than others? This project was about asking those questions rigorously and letting the analysis answer them.

### How it works

- Started with EDA: cleaned nulls, encoded categoricals, capped outliers, and plotted a correlogram to understand variable relationships.
- Calculated ROI and EAROI (engagement-adjusted ROI) across genres to identify which content types deliver the best returns.
- Modelled user retention using Multiple Linear Regression and Random Forest Regressor, with R² as the evaluation metric.
- Drew actionable insights from correlation analysis on what features most influence whether a user comes back.

### Tech Stack

- **Language:** Python
- **Models:** Multiple Linear Regression, Random Forest Regressor
- **Libraries:** pandas, numpy, scikit-learn, matplotlib, seaborn