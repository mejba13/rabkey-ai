"use client";

import {
  Users,
  DollarSign,
  Bell,
  Gamepad2,
  Store,
  Tag,
  TrendingUp,
  Activity,
  CreditCard,
  AlertTriangle,
  UserPlus,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { StatCard } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  adminStats,
  revenueHistory,
  trafficData,
  topGames,
  recentActivity,
  scraperStatuses,
} from "@/lib/mock-data/admin";
import { formatDate } from "@/lib/formatters";

const activityIcons: Record<string, { icon: typeof Users; color: string }> = {
  user_signup: { icon: UserPlus, color: "text-gaming-teal" },
  alert_triggered: { icon: Bell, color: "text-gaming-orange" },
  deal_created: { icon: Tag, color: "text-gaming-purple" },
  store_updated: { icon: Store, color: "text-gaming-blue" },
  scraper_run: { icon: Zap, color: "text-gaming-gold" },
  payment_received: { icon: CreditCard, color: "text-gaming-teal" },
};

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, Admin. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={adminStats.totalUsers.toLocaleString()}
          change="+12.3% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-gaming-blue"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${adminStats.monthlyRevenue.toLocaleString()}`}
          change="+8.5% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-gaming-teal"
        />
        <StatCard
          title="Active Alerts"
          value={adminStats.activeAlerts.toLocaleString()}
          change={`${adminStats.totalAlerts.toLocaleString()} total`}
          changeType="neutral"
          icon={Bell}
          iconColor="text-gaming-orange"
        />
        <StatCard
          title="Conversion Rate"
          value={`${adminStats.conversionRate}%`}
          change="+0.3% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-gaming-purple"
        />
      </div>

      {/* Second row KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Games Tracked"
          value={adminStats.totalGames.toLocaleString()}
          icon={Gamepad2}
          iconColor="text-gaming-coral"
        />
        <StatCard
          title="Active Stores"
          value={String(adminStats.totalStores)}
          icon={Store}
          iconColor="text-gaming-blue"
        />
        <StatCard
          title="Live Deals"
          value={adminStats.totalDeals.toLocaleString()}
          icon={Tag}
          iconColor="text-gaming-gold"
        />
        <StatCard
          title="Avg Deal Score"
          value={String(adminStats.avgDealScore)}
          icon={Activity}
          iconColor="text-gaming-teal"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Revenue & User Growth
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueHistory}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00D4AA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2D3D" />
              <XAxis
                dataKey="month"
                stroke="#A0A0B0"
                fontSize={12}
                tickLine={false}
              />
              <YAxis stroke="#A0A0B0" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#1A1A2E",
                  border: "1px solid #2D2D3D",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#00D4AA"
                fill="url(#revGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic chart */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Weekly Traffic
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2D3D" />
              <XAxis
                dataKey="day"
                stroke="#A0A0B0"
                fontSize={12}
                tickLine={false}
              />
              <YAxis stroke="#A0A0B0" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#1A1A2E",
                  border: "1px solid #2D2D3D",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="visits" fill="#F5A623" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="uniqueVisitors"
                fill="#7C3AED"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row: Activity + Top Games + Scraper Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3 max-h-[340px] overflow-y-auto">
            {recentActivity.map((entry) => {
              const config = activityIcons[entry.type];
              const Icon = config?.icon ?? Activity;
              const color = config?.color ?? "text-muted-foreground";
              return (
                <div key={entry.id} className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 size-7 rounded-full flex items-center justify-center bg-gaming-surface-elevated shrink-0",
                      color
                    )}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-relaxed">{entry.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Games */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Top Games by Views
          </h2>
          <div className="space-y-3">
            {topGames.map((game, i) => (
              <div
                key={game.gameId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-heading font-bold text-muted-foreground w-5">
                    #{i + 1}
                  </span>
                  <span className="text-sm font-medium truncate">
                    {game.title}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                  <span>{(game.views / 1000).toFixed(1)}K views</span>
                  <span className="text-gaming-teal">
                    {game.conversions.toLocaleString()} conv.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scraper Status */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Scraper Health
          </h2>
          <div className="space-y-2.5 max-h-[340px] overflow-y-auto">
            {scraperStatuses.map((s) => (
              <div
                key={s.storeId}
                className="flex items-center justify-between py-1"
              >
                <span className="text-sm truncate flex-1 min-w-0">
                  {s.storeName}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {s.status === "error" && (
                    <AlertTriangle className="size-3.5 text-gaming-pink" />
                  )}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-2 py-0.5 font-heading",
                      s.status === "healthy" &&
                        "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30",
                      s.status === "warning" &&
                        "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
                      s.status === "error" &&
                        "bg-gaming-pink/15 text-gaming-pink border-gaming-pink/30"
                    )}
                  >
                    {s.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
