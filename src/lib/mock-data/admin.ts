// Admin-specific mock data

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalAlerts: number;
  activeAlerts: number;
  totalGames: number;
  totalStores: number;
  totalDeals: number;
  avgDealScore: number;
  conversionRate: number;
  churnRate: number;
}

export const adminStats: AdminStats = {
  totalUsers: 24_853,
  activeUsers: 18_412,
  totalRevenue: 487_250,
  monthlyRevenue: 42_680,
  totalAlerts: 89_341,
  activeAlerts: 52_176,
  totalGames: 12_450,
  totalStores: 53,
  totalDeals: 3_842,
  avgDealScore: 72.4,
  conversionRate: 4.8,
  churnRate: 2.1,
};

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  users: number;
}

export const revenueHistory: RevenueDataPoint[] = [
  { month: "Jul", revenue: 18_200, users: 8_420 },
  { month: "Aug", revenue: 22_450, users: 10_180 },
  { month: "Sep", revenue: 25_300, users: 12_340 },
  { month: "Oct", revenue: 28_900, users: 14_520 },
  { month: "Nov", revenue: 35_600, users: 17_890 },
  { month: "Dec", revenue: 41_200, users: 20_340 },
  { month: "Jan", revenue: 38_750, users: 22_150 },
  { month: "Feb", revenue: 42_680, users: 24_853 },
];

export interface TrafficDataPoint {
  day: string;
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
}

export const trafficData: TrafficDataPoint[] = [
  { day: "Mon", visits: 12_450, uniqueVisitors: 8_230, pageViews: 34_500 },
  { day: "Tue", visits: 14_200, uniqueVisitors: 9_150, pageViews: 38_200 },
  { day: "Wed", visits: 13_800, uniqueVisitors: 8_900, pageViews: 36_100 },
  { day: "Thu", visits: 15_600, uniqueVisitors: 10_200, pageViews: 41_300 },
  { day: "Fri", visits: 18_900, uniqueVisitors: 12_400, pageViews: 48_700 },
  { day: "Sat", visits: 22_300, uniqueVisitors: 15_100, pageViews: 56_200 },
  { day: "Sun", visits: 19_800, uniqueVisitors: 13_600, pageViews: 50_100 },
];

export interface TopGameStat {
  gameId: string;
  title: string;
  views: number;
  alerts: number;
  conversions: number;
}

export const topGames: TopGameStat[] = [
  { gameId: "1", title: "Elden Ring", views: 45_200, alerts: 3_420, conversions: 1_890 },
  { gameId: "3", title: "Baldur's Gate 3", views: 38_900, alerts: 2_950, conversions: 1_620 },
  { gameId: "2", title: "Cyberpunk 2077", views: 35_400, alerts: 2_780, conversions: 1_450 },
  { gameId: "5", title: "Starfield", views: 28_700, alerts: 2_100, conversions: 980 },
  { gameId: "4", title: "Hogwarts Legacy", views: 24_300, alerts: 1_850, conversions: 870 },
];

export type SubscriptionTier = "free" | "pro" | "ultimate";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tier: SubscriptionTier;
  joinedAt: string;
  lastActiveAt: string;
  alertCount: number;
  wishlistCount: number;
  status: "active" | "inactive" | "banned";
}

export const mockUsers: MockUser[] = [
  { id: "u1", name: "Alex Morgan", email: "alex.morgan@email.com", avatar: "https://placehold.co/40x40/1A1A2E/F5A623?text=AM", tier: "ultimate", joinedAt: "2025-03-15", lastActiveAt: "2026-02-12", alertCount: 24, wishlistCount: 18, status: "active" },
  { id: "u2", name: "Sarah Chen", email: "sarah.chen@email.com", avatar: "https://placehold.co/40x40/1A1A2E/00D4AA?text=SC", tier: "pro", joinedAt: "2025-05-22", lastActiveAt: "2026-02-11", alertCount: 12, wishlistCount: 8, status: "active" },
  { id: "u3", name: "James Wilson", email: "james.w@email.com", avatar: "https://placehold.co/40x40/1A1A2E/7C3AED?text=JW", tier: "pro", joinedAt: "2025-06-10", lastActiveAt: "2026-02-10", alertCount: 8, wishlistCount: 15, status: "active" },
  { id: "u4", name: "Emma Davis", email: "emma.d@email.com", avatar: "https://placehold.co/40x40/1A1A2E/FF6B35?text=ED", tier: "free", joinedAt: "2025-07-03", lastActiveAt: "2026-02-09", alertCount: 3, wishlistCount: 5, status: "active" },
  { id: "u5", name: "Michael Brown", email: "m.brown@email.com", avatar: "https://placehold.co/40x40/1A1A2E/0EA5E9?text=MB", tier: "ultimate", joinedAt: "2025-04-18", lastActiveAt: "2026-02-08", alertCount: 31, wishlistCount: 22, status: "active" },
  { id: "u6", name: "Olivia Taylor", email: "olivia.t@email.com", avatar: "https://placehold.co/40x40/1A1A2E/FFD700?text=OT", tier: "free", joinedAt: "2025-08-25", lastActiveAt: "2026-01-15", alertCount: 2, wishlistCount: 3, status: "inactive" },
  { id: "u7", name: "David Kim", email: "david.kim@email.com", avatar: "https://placehold.co/40x40/1A1A2E/FF3366?text=DK", tier: "pro", joinedAt: "2025-09-12", lastActiveAt: "2026-02-12", alertCount: 15, wishlistCount: 10, status: "active" },
  { id: "u8", name: "Lisa Johnson", email: "lisa.j@email.com", avatar: "https://placehold.co/40x40/1A1A2E/F5A623?text=LJ", tier: "free", joinedAt: "2025-10-01", lastActiveAt: "2025-12-20", alertCount: 1, wishlistCount: 2, status: "inactive" },
  { id: "u9", name: "Ryan Garcia", email: "ryan.g@email.com", avatar: "https://placehold.co/40x40/1A1A2E/00D4AA?text=RG", tier: "ultimate", joinedAt: "2025-02-28", lastActiveAt: "2026-02-11", alertCount: 42, wishlistCount: 28, status: "active" },
  { id: "u10", name: "Sophie Martin", email: "sophie.m@email.com", avatar: "https://placehold.co/40x40/1A1A2E/7C3AED?text=SM", tier: "pro", joinedAt: "2025-11-15", lastActiveAt: "2026-02-07", alertCount: 7, wishlistCount: 6, status: "active" },
  { id: "u11", name: "Chris Lee", email: "chris.lee@email.com", avatar: "https://placehold.co/40x40/1A1A2E/FF6B35?text=CL", tier: "free", joinedAt: "2025-12-01", lastActiveAt: "2026-01-30", alertCount: 3, wishlistCount: 4, status: "active" },
  { id: "u12", name: "Banned User", email: "bad.actor@email.com", avatar: "https://placehold.co/40x40/1A1A2E/FF3366?text=BU", tier: "free", joinedAt: "2025-11-20", lastActiveAt: "2025-12-01", alertCount: 0, wishlistCount: 0, status: "banned" },
];

export interface ActivityLogEntry {
  id: string;
  type: "user_signup" | "alert_triggered" | "deal_created" | "store_updated" | "scraper_run" | "payment_received";
  message: string;
  timestamp: string;
}

export const recentActivity: ActivityLogEntry[] = [
  { id: "a1", type: "payment_received", message: "Ryan Garcia upgraded to Ultimate ($24.99/mo)", timestamp: "2026-02-12T10:32:00Z" },
  { id: "a2", type: "alert_triggered", message: "1,247 alerts triggered for Elden Ring price drop", timestamp: "2026-02-12T09:15:00Z" },
  { id: "a3", type: "scraper_run", message: "Price scraper completed: 53 stores, 12,450 prices updated", timestamp: "2026-02-12T08:00:00Z" },
  { id: "a4", type: "deal_created", message: "New deal detected: Baldur's Gate 3 at -45% on GOG", timestamp: "2026-02-12T07:30:00Z" },
  { id: "a5", type: "user_signup", message: "142 new users signed up today", timestamp: "2026-02-12T06:00:00Z" },
  { id: "a6", type: "store_updated", message: "CDKeys trust score updated: 68 → 71", timestamp: "2026-02-11T22:00:00Z" },
  { id: "a7", type: "payment_received", message: "Sophie Martin subscribed to Pro ($9.99/mo)", timestamp: "2026-02-11T18:45:00Z" },
  { id: "a8", type: "scraper_run", message: "Price scraper completed: 53 stores, 12,380 prices updated", timestamp: "2026-02-11T08:00:00Z" },
  { id: "a9", type: "alert_triggered", message: "832 alerts triggered for Steam Winter Sale updates", timestamp: "2026-02-11T04:00:00Z" },
  { id: "a10", type: "deal_created", message: "Flash Sale: Cyberpunk 2077 at -60% on Steam", timestamp: "2026-02-10T16:20:00Z" },
];

export interface ScraperStatus {
  storeId: string;
  storeName: string;
  lastRun: string;
  status: "healthy" | "warning" | "error";
  gamesScraped: number;
  avgResponseTime: number;
  errorRate: number;
}

export const scraperStatuses: ScraperStatus[] = [
  { storeId: "s1", storeName: "Steam", lastRun: "2026-02-12T08:00:00Z", status: "healthy", gamesScraped: 4_200, avgResponseTime: 120, errorRate: 0.1 },
  { storeId: "s2", storeName: "GOG", lastRun: "2026-02-12T08:00:00Z", status: "healthy", gamesScraped: 2_800, avgResponseTime: 95, errorRate: 0.2 },
  { storeId: "s3", storeName: "Epic Games Store", lastRun: "2026-02-12T08:00:00Z", status: "healthy", gamesScraped: 1_900, avgResponseTime: 150, errorRate: 0.3 },
  { storeId: "s4", storeName: "Humble Bundle", lastRun: "2026-02-12T08:00:00Z", status: "healthy", gamesScraped: 1_200, avgResponseTime: 180, errorRate: 0.5 },
  { storeId: "s5", storeName: "Green Man Gaming", lastRun: "2026-02-12T08:00:00Z", status: "warning", gamesScraped: 980, avgResponseTime: 340, errorRate: 2.1 },
  { storeId: "s6", storeName: "Fanatical", lastRun: "2026-02-12T08:00:00Z", status: "healthy", gamesScraped: 1_100, avgResponseTime: 110, errorRate: 0.4 },
  { storeId: "s7", storeName: "CDKeys", lastRun: "2026-02-12T07:55:00Z", status: "warning", gamesScraped: 650, avgResponseTime: 420, errorRate: 3.2 },
  { storeId: "s8", storeName: "Eneba", lastRun: "2026-02-12T08:00:00Z", status: "healthy", gamesScraped: 890, avgResponseTime: 200, errorRate: 0.8 },
  { storeId: "s9", storeName: "G2A", lastRun: "2026-02-12T07:50:00Z", status: "error", gamesScraped: 0, avgResponseTime: 0, errorRate: 100 },
  { storeId: "s10", storeName: "Kinguin", lastRun: "2026-02-12T08:00:00Z", status: "healthy", gamesScraped: 720, avgResponseTime: 230, errorRate: 1.1 },
];

export interface SubscriptionBreakdown {
  tier: string;
  count: number;
  color: string;
}

export const subscriptionBreakdown: SubscriptionBreakdown[] = [
  { tier: "Free", count: 18_200, color: "#A0A0B0" },
  { tier: "Pro", count: 4_853, color: "#7C3AED" },
  { tier: "Ultimate", count: 1_800, color: "#FFD700" },
];

export interface PlatformDistribution {
  platform: string;
  count: number;
  color: string;
}

export const platformDistribution: PlatformDistribution[] = [
  { platform: "PC", count: 8_450, color: "#0EA5E9" },
  { platform: "PlayStation", count: 2_100, color: "#7C3AED" },
  { platform: "Xbox", count: 1_400, color: "#00D4AA" },
  { platform: "Nintendo", count: 500, color: "#FF6B35" },
];
