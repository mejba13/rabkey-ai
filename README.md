<div align="center">

# 🎮 GrabKey AI

### AI-Powered Game Key Price Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-F5A623?style=for-the-badge)](LICENSE)

**Compare prices from 50+ stores · AI deal scoring · Smart price predictions · Never overpay for game keys**

<img width="1935" height="1440" alt="landing-screen1" src="https://github.com/user-attachments/assets/641917c0-c159-4827-8c5b-d03b1de3c345" />
<img width="1929" height="1429" alt="deals-age" src="https://github.com/user-attachments/assets/a2d9772c-f51a-4e0a-83cd-ce5306dcb127" />



</div>

---

## ✨ Features

### 🔍 Smart Price Comparison
- Real-time price aggregation from **50+ game key retailers**
- Side-by-side comparison with store trust scores
- Region-aware pricing with currency conversion

### 🤖 AI-Powered Intelligence
- **Price Prediction Engine** — LSTM + gradient boosting hybrid forecasts price drops at 7/14/30/90 day horizons
- **Smart Deal Scoring** — 0-100 score using 7 weighted factors (historical low, prediction, store trust, trend, region, edition value, time sensitivity)
- **Buy/Wait Recommendations** — Strong Buy, Buy, Wait, or Avoid with confidence percentages

### 📊 Price History & Analytics
- Interactive price history charts with 30d/90d/1y/All time ranges
- All-time low/high/average price statistics
- Store-specific price tracking

### 🔔 Alerts & Notifications
- Custom price alerts with target price thresholds
- Multi-channel notifications (email, push, in-app)
- Alert management with pause/resume/delete

### 💰 Wishlist & Budget
- Wishlist with target price tracking
- Budget tracker with spending progress
- Sortable by price, deal score, or date added

### 🛡️ Store Trust Verification
- Trust scores for every retailer (0-100)
- Official vs grey market classification
- Delivery time, region support, and payment method details

### 🎛️ Admin Dashboard
- **Overview** — KPI cards, revenue/traffic charts, activity feed, scraper health
- **Games/Stores/Deals/Users Management** — Full CRUD tables with search, sort, pagination
- **Analytics** — Revenue trends, subscription breakdown, platform distribution, top converting games
- **Settings** — Scraper config, security toggles, notification thresholds

### 🔐 Authentication
- Email/password login and registration with validation
- Social login (Google, Steam, Discord)
- Password strength meter
- Persistent auth state

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) (strict mode) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) + custom gaming design system |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) (24 components, new-york style) |
| **Animations** | [Framer Motion](https://motion.dev) (spring physics, GPU-optimized) |
| **Client State** | [Zustand](https://zustand-demo.pmnd.rs) with persist middleware |
| **Server State** | [TanStack Query](https://tanstack.com/query) with simulated async |
| **Charts** | [Recharts](https://recharts.org) |
| **Notifications** | [Sonner](https://sonner.emilkowal.dev) (toast system) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Testing** | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| **Package Manager** | [pnpm](https://pnpm.io) |

---

## 🎨 Design System

Premium dark gaming aesthetic inspired by **Gamety** platform.

| Element | Value |
|---------|-------|
| **Background** | Deep Black `#0D0D0D` → Dark Surface `#1A1A2E` |
| **Primary** | Orange Amber `#F5A623` → Coral `#FF6B35` |
| **Secondary** | Purple `#7C3AED` → Light Purple `#9F67FF` |
| **Success** | Teal Green `#00D4AA` |
| **Error** | Pink `#FF3366` |
| **Premium** | Gold `#FFD700` |
| **Headings** | Outfit (Google Fonts) |
| **Body** | Red Hat Display |
| **Code** | JetBrains Mono |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17+
- **pnpm** 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/mejba13/grabkey-ai.git
cd grabkey-ai

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
pnpm dev        # Start development server (Turbopack)
pnpm build      # Create production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm test       # Run tests in watch mode
pnpm test:run   # Run tests once
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (site)/           # Public site with header/footer
│   │   ├── (public)/     # Search, game detail, deals, stores, blog, pricing
│   │   └── (authenticated)/ # Dashboard, wishlist, alerts, library, settings
│   ├── (auth)/           # Login, register (standalone layout)
│   └── admin/            # Admin panel with sidebar layout
├── components/
│   ├── ui/               # shadcn/ui base components
│   ├── layout/           # Header, footer, mobile nav, logo
│   ├── gaming/           # Game card, deal score badge, price tag, platform icon
│   ├── search/           # Search bar, autocomplete, filters, results grid
│   ├── game-detail/      # Hero, price comparison, editions, info sidebar
│   ├── deals/            # Deal cards, filter bar
│   ├── stores/           # Store cards, grid
│   ├── charts/           # Price history chart, stats cards
│   ├── predictions/      # AI prediction cards, confidence gauge
│   ├── alerts/           # Alert cards, create modal
│   ├── notifications/    # Notification dropdown, items
│   ├── wishlist/         # Wishlist cards, budget tracker
│   ├── landing/          # Hero, features, pricing, testimonials
│   ├── auth/             # Auth layout, social buttons
│   ├── admin/            # Admin sidebar, header, stat card, data table
│   └── shared/           # Gradient text, glow card, empty state
├── lib/
│   ├── types/            # TypeScript interfaces
│   ├── mock-data/        # 50 games, 15 stores, 200+ prices, predictions
│   ├── fonts.ts          # Google Fonts configuration
│   ├── formatters.ts     # Price, date, deal score formatters
│   └── constants.ts      # App-wide constants
├── hooks/                # Custom React hooks
├── stores/               # Zustand state stores
├── providers/            # Theme, query, composite providers
├── animations/           # Spring configs, motion variants
└── test/                 # Test setup
```

---

## 🗺️ Routes

### Public
| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, deals, pricing |
| `/search` | Game search with filters, grid/list views, infinite scroll |
| `/game/[slug]` | Game detail with price comparison, charts, AI insights |
| `/deals` | Curated deals feed with filtering |
| `/stores` | Store directory with trust scores |
| `/blog` | Blog listings |
| `/pricing` | Subscription tier comparison |

### Authenticated
| Route | Description |
|-------|-------------|
| `/dashboard` | User dashboard |
| `/wishlist` | Wishlist with budget tracker |
| `/alerts` | Price alert management |
| `/library` | Game library |
| `/settings` | User preferences |

### Auth
| Route | Description |
|-------|-------------|
| `/login` | Sign in with email or social (Google, Steam, Discord) |
| `/register` | Create account with password strength meter |

### Admin
| Route | Description |
|-------|-------------|
| `/admin` | Overview with KPIs, charts, activity feed |
| `/admin/games` | Games CRUD table |
| `/admin/stores` | Stores management |
| `/admin/deals` | Deals management |
| `/admin/users` | User management |
| `/admin/analytics` | Analytics with charts and distributions |
| `/admin/settings` | Platform configuration |

---

## 🧪 Testing

```bash
# Run all tests
pnpm test:run

# Watch mode
pnpm test

# Current coverage: 4 test suites, 27 tests
# - Formatters (13 tests)
# - Wishlist store (7 tests)
# - Search store (4 tests)
# - Alerts store (3 tests)
```

---

## 📈 Roadmap

- [x] Foundation — Design system, layout, component library
- [x] Search & Discovery — Search, game detail, price comparison
- [x] Price History — Charts, stats, wishlist, budget tracker
- [x] Alerts & Notifications — Price alerts, toast system, notification center
- [x] AI Predictions — Price forecasting, buy/wait recommendations, deal score breakdown
- [x] Admin Dashboard — Overview, management tables, analytics, settings
- [x] Authentication — Login, register, social auth, auth state
- [ ] Real API Integration — tRPC, Supabase, Redis
- [ ] Authentication Provider — NextAuth.js / Clerk
- [ ] Scraping Infrastructure — Playwright, Puppeteer for 50+ stores
- [ ] ML Pipeline — TensorFlow price prediction models
- [ ] Mobile App — Flutter (iOS + Android)
- [ ] Browser Extension — Chrome auto-coupon finder
- [ ] Internationalization — 10 languages, 20+ currencies

---

## Developed By

<div align="center">

<img width="380" height="420" alt="engr-mejba-ahmed" src="https://github.com/user-attachments/assets/83e72c39-5eaa-428a-884b-cb4714332487" />


### **Engr Mejba Ahmed**

**AI Developer | Software Engineer | Entrepreneur**

[![Portfolio](https://img.shields.io/badge/Portfolio-mejba.me-10B981?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.mejba.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mejba)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mejba13)

</div>

---

## Hire / Work With Me

I build AI-powered applications, mobile apps, and enterprise solutions. Let's bring your ideas to life!

| Platform | Description | Link |
|----------|-------------|------|
| **Fiverr** | Custom builds, integrations, performance optimization | [fiverr.com/s/EgxYmWD](https://www.fiverr.com/s/EgxYmWD) |
| **Mejba Personal Portfolio** | Full portfolio & contact | [mejba.me](https://www.mejba.me) |
| **Ramlit Limited** | Software development company | [ramlit.com](https://www.ramlit.com) |
| **ColorPark Creative Agency** | UI/UX & creative solutions | [colorpark.io](https://www.colorpark.io) |
| **xCyberSecurity** | Global cybersecurity services | [xcybersecurity.io](https://www.xcybersecurity.io) |

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and AI**

<sub>GrabKey AI — Compare. Predict. Save.</sub>

</div>
