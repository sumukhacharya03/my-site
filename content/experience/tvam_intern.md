---
title: "AI Intern @ Tvam Technologies"
date: 2025-09-01
description: "Applied LLM Fine-Tuning and Evaluation"
---

## AI Intern | Tvam Technologies  
*September 2025 – Present*

Designing and executing parameter-efficient fine-tuning workflows for compact language models, with emphasis on reliability, structured outputs, and controlled evaluation. Responsible for end-to-end experimentation — from dataset construction and instruction design to optimization, benchmarking, and validation under real-world constraints.

**Update:** Delivered two full LLM adaptation cycles; currently iterating on a third with expanded benchmarking and stylistic conditioning controls.

### **Projects**

**Project 1 — Structured Output Adaptation for Compact LLM**  
- Fine-tuned a small-scale transformer model using PEFT (LoRA/QLoRA) to improve structured response consistency.  
- Built and curated task-specific datasets, including prompt templates and edge-case scenarios.  
- Performed systematic hyperparameter exploration (rank, learning rate, dropout, batch sizing).  
- Designed validation harness to test robustness, edge cases, and output stability.

**Project 2 — Cross-Model Benchmarking & Evaluation Study**  
- Conducted comparative evaluation across multiple foundation and instruction-tuned models.  
- Developed standardized test scripts and controlled prompt sets for consistent benchmarking.  
- Measured qualitative output alignment and latency trade-offs across architectures.  
- Documented performance trends to inform model selection and optimization strategy.

**Project 3 — Stylistic Conditioning via Iterative Fine-Tuning (Ongoing)**  
- Implementing supervised fine-tuning pipeline to condition a compact model toward controlled conversational patterns.  
- Refining dataset segmentation and evaluation metrics to maintain task reliability while adapting tone.  
- Running iterative validation against baseline models to assess behavioral consistency and regression risks.
- Built and containerized a full-stack inference app (Flask, FastAPI, JavaScript, Docker) serving the fine-tuned
model via a chat UI, collecting user interaction logs as preference data for downstream DPO alignment.

### **Tech Stack**
Python · Transformers · PEFT (LoRA/QLoRA) · Supervised Fine-Tuning · Prompt Engineering · Hyperparameter Optimization · Evaluation & Benchmarking · Docker · Git · FastAPI · Flask · JavaScript · Gunicorn · Uvicorn