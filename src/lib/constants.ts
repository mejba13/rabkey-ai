export const SITE_NAME = "GrabKey AI";
export const SITE_DESCRIPTION = "AI-powered game key price intelligence. Compare prices from 50+ stores, get smart deal scores, and never overpay for games.";
export const SITE_URL = "https://grabkey.ai";

export const MAX_RESULTS_PER_PAGE = 24;

export const DEAL_SCORE_THRESHOLDS = {
  legendary: 90,
  excellent: 75,
  good: 50,
  fair: 25,
} as const;

export const DEAL_SCORE_COLORS = {
  legendary: "text-gaming-gold",
  excellent: "text-gaming-teal",
  good: "text-yellow-400",
  fair: "text-gaming-orange",
  poor: "text-gaming-pink",
} as const;

export const DEAL_SCORE_BG_COLORS = {
  legendary: "bg-gaming-gold/20",
  excellent: "bg-gaming-teal/20",
  good: "bg-yellow-400/20",
  fair: "bg-gaming-orange/20",
  poor: "bg-gaming-pink/20",
} as const;

export const NAV_ITEMS = [
  { label: "Deals", href: "/deals" },
  { label: "Search", href: "/search" },
  { label: "Stores", href: "/stores" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const SUBSCRIPTION_TIERS = {
  free: { name: "Free", price: 0, alerts: 3, history: "30 days", predictions: false },
  pro: { name: "Pro", price: 9.99, alerts: 25, history: "1 year", predictions: "7-day" },
  ultimate: { name: "Ultimate", price: 24.99, alerts: "Unlimited", history: "All-time", predictions: "90-day" },
} as const;
