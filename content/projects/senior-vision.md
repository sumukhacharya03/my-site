---
title: "Senior Vision AI"
date: 2025-08-15
description: "AI Assistant for the Elderly"
---

[GitHub →](https://github.com/sumukhacharya03/Senior-Vision-AI)

### What is it?

**Scan-n-Say** is a mobile web app that helps elderly and visually impaired users shop independently at supermarkets. Point your phone camera at any product, and the app reads out a simple, friendly summary of what's on the label — no squinting required.

### Why I built it

Product labels are a nightmare — tiny fonts, dense ingredient lists, unfamiliar terms. For older adults or anyone with low vision, this makes supermarket shopping unnecessarily hard. I wanted to fix that with something genuinely useful: a tool that strips away the noise and just tells you what you need to know.

### How it works

1. You take a photo of a product using your phone.
2. Google Cloud Vision OCR extracts the text from the packaging.
3. Gemini processes that text and generates a short, plain-English summary.
4. The app reads the summary aloud via text-to-speech and displays it in large, high-contrast text.

### Tech Stack

- **Backend:** Python, Flask, Gunicorn — deployed on Render
- **Frontend:** HTML, CSS, JavaScript — deployed on Vercel
- **AI:** Google Cloud Vision API (OCR) + Google Gemini API (summarisation)