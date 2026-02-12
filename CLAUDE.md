# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GrabKey AI** is an AI-powered game key price intelligence SaaS platform. It aggregates prices from 50+ game key retailers, applies ML-based price prediction and deal scoring, and delivers personalized recommendations. The platform spans web, mobile, and browser extension.

The PRD is in `GrabKey_AI_PRD.docx` at the project root. Design inspiration images (Gamety platform) are in `design reference/`.

## Tech Stack

| Layer | Technology |
|---|---|
| Web Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS 4 |
| Animations | Framer Motion, GSAP |
| State | Zustand (client) + TanStack Query (server/cache) |
| Mobile | Flutter 3.x, Dart, Riverpod |
| API | tRPC (type-safe for web) + REST (mobile/public) |
| Primary DB | PostgreSQL 16 (Supabase) |
| Cache | Redis 7.x (Upstash) |
| Search | Meilisearch |
| AI/ML | Python, TensorFlow, scikit-learn |
| AI Services | OpenAI GPT-4, Anthropic Claude |
| Data Pipeline | Apache Kafka, Celery |
| Scraping | Playwright, Puppeteer, Scrapy |
| Auth | NextAuth.js / Clerk (OAuth: Google, Steam, Discord) |
| Payments | Stripe |
| Hosting | Vercel (web), Railway (API) |
| CI/CD | GitHub Actions, Docker |
| Monitoring | Sentry, Datadog, PostHog |

## Architecture

The platform has three client surfaces backed by shared services:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│  Next.js 15  │  │  Flutter App │  │ Browser Extension │
│  (Web/SSR)   │  │  (iOS+Android)│  │  (Chrome)        │
└──────┬───────┘  └──────┬───────┘  └────────┬─────────┘
       │ tRPC            │ REST              │ REST
       └────────┬────────┴───────────────────┘
                │
       ┌────────▼────────┐
       │   API Layer      │
       │  tRPC + REST     │
       └────────┬────────┘
                │
  ┌─────────────┼─────────────────┐
  │             │                 │
  ▼             ▼                 ▼
PostgreSQL    Redis           Meilisearch
(Supabase)   (Upstash)       (Search)
                │
       ┌────────▼────────┐
       │  Data Pipeline   │
       │  Kafka + Celery  │
       └────────┬────────┘
                │
  ┌─────────────┼──────────────┐
  │             │              │
  ▼             ▼              ▼
Scrapers    ML Pipeline     AI Services
(50+ stores) (TF/sklearn)  (GPT-4/Claude)
```

### Core AI Systems

- **Price Prediction Engine**: LSTM + gradient boosting hybrid. Considers historical prices, store sale calendars, game lifecycle, publisher behavior, market signals. Outputs: drop probability (7/14/30/90 day), predicted low price, Buy/Wait recommendation.
- **Smart Deal Scoring**: 0-100 score using weighted factors — price vs historical low (25%), price vs prediction (20%), store trust (15%), price trend (15%), region compatibility (10%), edition value (10%), time sensitivity (5%).
- **Personalization Engine**: Collaborative + content-based filtering. Library sync from Steam/PlayStation/Xbox/Nintendo.
- **Trust Verification**: NLP sentiment analysis of reviews, key revocation tracking, fraud pattern detection.

### Key Database Tables

- `games`, `game_editions`, `stores`, `prices`, `price_history` — core catalog and pricing
- `price_predictions`, `deal_scores` — AI output storage
- `users`, `wishlists`, `price_alerts`, `user_libraries`, `subscriptions`, `referrals`, `affiliate_clicks` — user engagement

## Design System

Premium dark gaming aesthetic inspired by **Gamety** (see `design reference/` images).

### Colors
- **Backgrounds**: Deep Black `#0D0D0D`, Dark Surface `#1A1A2E`, Elevated `#16213E`
- **Primary**: Orange Amber `#F5A623` (CTAs, highlights), Dark Orange `#E8961E` (hover)
- **Secondary**: Purple `#7C3AED`, Light Purple `#9F67FF`
- **Accents**: Coral Red `#FF6B35` (sales), Teal Green `#00D4AA` (success/price drops), Pink `#FF3366` (errors), Electric Blue `#0EA5E9` (info), Gold `#FFD700` (premium/legendary)
- **Text**: White `#FFFFFF` (primary), Light Gray `#A0A0B0` (secondary), Dark Gray `#2D2D3D` (borders)

### Gradients
- Primary CTA: `#F5A623 → #FF6B35`
- Premium: `#7C3AED → #9F67FF`
- Success: `#00D4AA → #0EA5E9`
- Dark depth: `#0D0D0D → #1A1A2E`
- Legendary: `#FFD700 → #F5A623`

### Typography
- **Headings/Display/Buttons/Prices/Scores**: Outfit (Google Fonts)
- **Body text**: Red Hat Display
- **Code/Mono**: JetBrains Mono

### Animation Principles (Framer Motion)
- Spring physics: stiffness 200-300, damping 20-30
- GPU-only properties (transform, opacity)
- Timing: micro-interactions 150-200ms, page transitions 300-400ms, complex reveals 500-800ms
- Skeleton shimmer loading (`#1A1A2E → #2D2D3D → #1A1A2E`)
- Card hover: scale 1.02x, orange glow border, shadow elevation
- Deal Score: animated counter with color transition (red→yellow→green), legendary = golden particle burst

## Web Routes

### Public
`/` (landing), `/search`, `/game/[slug]`, `/deals`, `/stores`, `/blog`, `/pricing`

### Authenticated
`/dashboard`, `/wishlist`, `/alerts`, `/library`, `/settings`, `/referral`

## Subscription Tiers
- **Free**: Basic comparison, 3 alerts, 30-day history, no predictions
- **Pro** ($9.99/mo): Full deal scores, 25 alerts, 1-year history, 7-day predictions, ad-free
- **Ultimate** ($24.99/mo): Score breakdowns, unlimited alerts, all-time history + export, 90-day predictions, auto-coupon extension

## Development Phases

1. **Foundation (Weeks 1-6)**: Project setup, design system, DB/API, scraping infra (15 stores), core UI (search, listing, detail), price history + alerts
2. **AI Integration (Weeks 7-12)**: Deal scoring, price prediction MVP, browser extension, dashboard/wishlists, Stripe/premium
3. **Mobile & Scale (Weeks 13-20)**: Flutter app, personalization engine, trust verification, budget optimizer, public API
4. **Optimization (Weeks 21-26)**: Performance/SEO, analytics/A/B testing, i18n (10 languages, 20+ currencies), advanced AI, security audit + launch
