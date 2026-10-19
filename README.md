# ⚡ ContestRadar — Prized CP / DSA / Informatics Live Tracker

> Built on top of **[coss.com/ui](https://coss.com/ui)** &bull; Powered by **[TinyFish.ai](https://tinyfish.ai)** & **[Parallel.ai](https://parallel.ai)** search and extraction infrastructure.

Never miss cash-prized, high-stakes competitive programming, data structure, and informatics contests again.

---

## 🚀 Key Features

1. **TinyFish.ai Search & Cloud Browser Fetch API**
   - Live query searching across Codeforces blogs, AtCoder announcements, and contest forums with recency filters (`recency_minutes`).
   - Noise-free markdown extraction using TinyFish Fetch (`POST https://api.fetch.tinyfish.ai`) to parse prize pools, eligibility, and schedules directly from URLs (e.g. `https://codeforces.com/blog/entry/157611`).

2. **Parallel.ai Multi-Stream Agent & Basis Grounding**
   - Multi-query parallel web retrieval (`POST https://api.parallel.ai/v1/search`) with sub-second execution modes:
     - ⚡ **Turbo Mode** (~180ms)
     - 🚀 **Fast Mode** (~340ms)
     - 🔬 **Deep Mode** (~850ms)
   - Basis verifiability: all prize claims backed by token-dense excerpts and calibrated confidence scores.
   - Deep Research Task agent: runs strategic preparation analysis and breakdown of winners.

3. **coss.com/ui Design Language**
   - High-density dark mode design with monospace timing chips, subtle borders, and micro-interactions.
   - Split-pane layout: Live feed with interactive GenUI contest cards on the left, Evidence & Prize Inspector on the right.
   - Live real-time countdown clocks ticking down to contest start.
   - Prize tier categorization: 💎 Mega ($10k+), 🏆 Major ($1k-$10k), 🥇 Standard ($100+), 🏅 Swag.

4. **1-Click Sync to Calendar**
   - Download offline `.ICS` calendar alerts with pre-configured 1-hour alarms.
   - Direct "Add to Google Calendar" button with pre-filled contest titles, prize details, and links.

5. **Instant Ingestion of Any Contest Link**
   - Paste any link (e.g., Codeforces blog entries, AtCoder posts, Hackathon portals) to trigger TinyFish Fetch and auto-index into your live radar feed.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Styling:** Tailwind CSS v4 + coss.com/ui design system primitives
- **AI Web Intelligence:**
  - `TinyFishClient`: Search & Fetch endpoints
  - `ParallelClient`: Search & Task endpoints
- **Icons & Visuals:** `lucide-react`, `canvas-confetti`

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your API keys (the app has intelligent mock fallbacks if keys are not provided immediately):
```env
TINYFISH_API_KEY="your-tinyfish-api-key"
PARALLEL_API_KEY="your-parallel-api-key"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or production build on port 3001.
