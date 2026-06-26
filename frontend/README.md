# SentinelAI — Next.js Frontend Console

This directory contains the source code for the Next.js frontend analyst dashboard. The application connects to the FastAPI backend server using Server-Sent Events (SSE) to stream classified traffic alerts.

---

## Features

### 1. Landing Portal
* **Immersive Space-Cybersecurity Hero:** Features clean cinematic looping space backgrounds and high-contrast styling.
* **Sticky Glassmorphic Header:** Blur-backdrop navbar anchor providing persistent navigation links and a direct console gate launcher.
* **Network Threat Grid:** Showcases the 15 classified attack classes (including volumetric DDoS, Port Scans, and Slow HTTP attacks) in a visual grid layout.

### 2. Administrative Gateway
* **Cookie-Based JWT Storage:** Secures sessions using `httpOnly`, `Secure`, and `SameSite=Strict` browser cookies.
* **Access Route Guarding:** Secure middleware verification redirection logic checking for active sessions.

### 3. Analyst Dashboard Console
* **Real-Time Alert Feed:** Auto-scrolling logs showing incoming flow payloads color-coded by classified threat severity.
* **Feature Inspector:** Panel listing all 78 network features (such as packet sizes, flags, and window bytes) when selecting an alert from the feed.
* **Distribution Charts:** Interactive live bar charts mapping session threat percentages utilizing Recharts.
* **Metrics Counters:** Aggregated summaries tracking total flows logged, total attacks blocked, and benign traffic percentages.

---

## Tech Stack
* **Framework:** Next.js 16.2 (Turbopack)
* **Core Library:** React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **Charts:** Recharts 2.15

---

## Installation & Commands

Ensure Node.js 20 LTS+ is installed.

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Generate production optimization build
npm run build

# Start production server
npm start
```

---

## Architecture Flow

```text
Browser Client
   |
   +--> [EventSource] --> Next.js Route Proxy (/api/stream)
                             |
                             +--> FastAPI Backend (/api/stream) [Persistent SSE]
```
