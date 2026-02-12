export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

export function formatDiscount(discount: number): string {
  return `-${Math.round(discount)}%`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)}d ago`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays < 7) return `${diffDays}d left`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w left`;
  return `${Math.floor(diffDays / 30)}mo left`;
}

export function getDealScoreTier(score: number): "legendary" | "excellent" | "good" | "fair" | "poor" {
  if (score >= 90) return "legendary";
  if (score >= 75) return "excellent";
  if (score >= 50) return "good";
  if (score >= 25) return "fair";
  return "poor";
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
