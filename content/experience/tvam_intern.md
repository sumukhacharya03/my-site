---
title: "Machine Learning Intern @ tvam Technologies"
date: 2025-09-01
description: ""
---

### Machine Learning Intern | tvam Technologies  
*September 2025 – June 2026*

### **Projects**

**Project 1 — Agentic Tool-Calling SLM** | LoRA/QLoRA, Instruction-Tuned Fine-Tuning 
- Fine-tuned SLM for agentic tool-calling through 5 iterative cycles of instruction tuning, edge-case diagnosis,
and synthetic data regeneration using larger LLMs, improving correct tool-call accuracy by 85% over the base
model.

**Project 2 — Conversational Fine-Tuning for Human-Like Interaction** | LoRA/QLoRA, SFT  
- Self-curated a 1.5M-token conversational dataset from scratch by sourcing and manually curating interview
transcripts from a couple of public figures into a JSONL corpus, then supervised fine-tuned the tool-calling
SLM for conversational quality and emotional nuance, narrowing the performance gap to GPT-5.2 by 75% on
human-evaluated conversational scenarios.

**Project 3 — DPO Alignment for Emotional Maturity** | DPO, SFT  
- Fine-Tuning the latest fine-tuned SLM on 14M DPO preference pairs curated from LLM-generated conversation
logs, using a hybrid DPO + SFT objective to jointly optimize preference alignment and next-token prediction,
with edge-case testing and loss optimization currently in progress.

**Project 4 — Audio Codec & Text-to-Audio-Token Modeling** | PyTorch, torchaudio, GAN, BiMamba2  
- Training a GAN-based neural audio codec for high-fidelity audio reconstruction, currently at 3,750 epochs with
near-lossless reconstruction quality on most inputs and a handful of edge cases still being refined, alongside a
separate BiMamba2-based neural network to convert text into audio tokens – the two core components for an
eventual speech-to-speech (STS) system.