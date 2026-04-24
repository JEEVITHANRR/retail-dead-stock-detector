# 🏷️ Dead Stock Detector — Retail Inventory Intelligence

An elegant, AI-powered retail analytics dashboard that identifies dead stock inventory, calculates capital at risk, and provides actionable markdown recommendations. Built with React and Vite, featuring a luxury gold-on-dark UI with animated tickers, floating cards, and risk scoring.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Real-Time Capital Risk Counter** — Animated counter showing total locked capital across flagged SKUs.
- **Dead Stock Scoring** — Each product is scored 0–100 with risk-level classification (Dead Stock / High Risk / Watch / Low Risk).
- **Interactive Product Table** — Click any product row to deep-dive into its full analytics breakdown.
- **Root Cause Analysis** — AI-powered explanations for why each product is stagnating.
- **Recommended Actions** — Smart markdown/promotion strategies tailored per risk tier.
- **Scrolling Alert Ticker** — ESPN-style urgency ticker for critical inventory alerts.
- **Premium Luxury UI** — Gold shimmer gradients, Playfair Display typography, floating card animations, and ambient glow effects.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR-USERNAME/retail-dead-stock-detector.git
   ```

2. **Navigate into the project**
   ```bash
   cd retail-dead-stock-detector
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the dev server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Folder Structure

```
retail-dead-stock-detector/
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx
    └── App.jsx
```

## 🛠️ Built With

- **React 18** — Component-based UI
- **Vite 5** — Lightning-fast dev server & bundler
- **Playfair Display + IBM Plex Mono + Manrope** — Premium typography stack
- **Custom CSS Animations** — Gold shimmer, floating cards, ticker scrolls, and risk badge bounces

## 📊 Business Impact

| Metric | Value |
|--------|-------|
| Products Flagged | 5 SKUs |
| Capital at Risk | $27,790 |
| Avg Days Stagnant | 61 days |
| Recovery Potential | 68% with markdowns |

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
