# GlobalPulse Terminal

> Financial market research dashboard aggregating macroeconomic indicators, real-time equity quotes, and market news for internal investment research workflows.

## Overview

GlobalPulse Terminal is a Bloomberg-style market research dashboard built for daily investment research. The platform unifies multiple data streams (FRED economic data, Finnhub market news, Twelve Data candles, AIS maritime tracking) into a single terminal-aesthetic interface, with bilingual UI (Traditional Chinese / English) and a tactical risk scoring engine.

**Live demo**: see `index.html` (GitHub Pages)

## Features

- **FRED Economic Decoder** — Multi-component macro risk scoring (yield curve, Sahm Rule, real rates, term premium)
- **Market Flash Stream** — Finnhub news with risk classification + Chinese translation
- **Economic Calendar** — Auto-rolling weekly high-impact US releases
- **Live Equity Tape** — 37 curated US equities via WebSocket trade stream
- **Multi-timeframe K-Line** — 1m / 5m / 15m / 1h / 1d candles with technical indicators (MA, BB, MACD, RSI) and drawing tools
- **AIS Maritime Stream** — Real-time vessel tracking for shipping disruption signals

## Stack

- **Frontend** — Single-page web application, vanilla JS, no build step
- **Backend** — Cloudflare Workers (API proxy, edge cache, WebSocket bridges)
- **Charting** — Currently `lightweight-charts`; planned upgrade to professional charting library
- **Data sources** — FRED, Finnhub, Twelve Data, AISStream, MyMemory translation

## Status

In production use for daily market analysis. Active development on charting upgrades, crypto coverage, and Taiwan equity integration.

## Roadmap

- Q2 2026 — Advanced charting integration with full drawing tool suite
- Q2 2026 — Crypto market module
- Q3 2026 — Taiwan equity coverage
- Q3 2026 — Geopolitical event tracking
- Q4 2026 — Backtesting framework

## License

Internal research project. Not for redistribution.
