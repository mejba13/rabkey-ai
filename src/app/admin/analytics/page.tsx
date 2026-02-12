"use client";

import { BarChart3 } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { StatCard } from "@/components/admin/stat-card";
import {
  adminStats,
  revenueHistory,
  trafficData,
  subscriptionBreakdown,
  platformDistribution,
  topGames,
} from "@/lib/mock-data/admin";
import { TrendingUp, Users, DollarSign, Percent } from "lucide-react";

const tooltipStyle = {
  background: "#1A1A2E",
  border: "1px solid #2D2D3D",
  borderRadius: "8px",
  fontSize: "12px",
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
          <BarChart3 className="size-6 text-gaming-orange" />
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform performance metrics and insights
        </p>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${adminStats.totalRevenue.toLocaleString()}`}
          change="+32% all time"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-gaming-teal"
        />
        <StatCard
          title="Active Users"
          value={adminStats.activeUsers.toLocaleString()}
          change={`${((adminStats.activeUsers / adminStats.totalUsers) * 100).toFixed(1)}% of total`}
          changeType="neutral"
          icon={Users}
          iconColor="text-gaming-blue"
        />
        <StatCard
          title="Conversion Rate"
          value={`${adminStats.conversionRate}%`}
          change="+0.3% this month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-gaming-orange"
        />
        <StatCard
          title="Churn Rate"
          value={`${adminStats.churnRate}%`}
          change="-0.2% this month"
          changeType="positive"
          icon={Percent}
          iconColor="text-gaming-purple"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue over time */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueHistory}>
              <defs>
                <linearGradient id="analyticsRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00D4AA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="analyticsUserGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2D3D" />
              <XAxis dataKey="month" stroke="#A0A0B0" fontSize={12} tickLine={false} />
              <YAxis stroke="#A0A0B0" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#00D4AA" fill="url(#analyticsRevGrad)" strokeWidth={2} name="Revenue ($)" />
              <Area type="monotone" dataKey="users" stroke="#7C3AED" fill="url(#analyticsUserGrad)" strokeWidth={2} name="Users" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Weekly Traffic Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2D3D" />
              <XAxis dataKey="day" stroke="#A0A0B0" fontSize={12} tickLine={false} />
              <YAxis stroke="#A0A0B0" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="visits" fill="#F5A623" radius={[4, 4, 0, 0]} name="Visits" />
              <Bar dataKey="uniqueVisitors" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Unique Visitors" />
              <Bar dataKey="pageViews" fill="#00D4AA" radius={[4, 4, 0, 0]} name="Page Views" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription breakdown pie */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Subscription Distribution
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={subscriptionBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="count"
                nameKey="tier"
              >
                {subscriptionBreakdown.map((entry) => (
                  <Cell key={entry.tier} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Platform distribution pie */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Platform Preference
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={platformDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="count"
                nameKey="platform"
              >
                {platformDistribution.map((entry) => (
                  <Cell key={entry.platform} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top games table */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-heading font-semibold text-sm mb-4">
            Top Converting Games
          </h2>
          <div className="space-y-4">
            {topGames.map((game, i) => (
              <div key={game.gameId}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">
                    <span className="text-muted-foreground mr-2">#{i + 1}</span>
                    {game.title}
                  </span>
                  <span className="text-xs text-gaming-teal font-heading font-semibold">
                    {game.conversions.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gaming-surface-elevated overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gaming-orange to-gaming-coral"
                    style={{
                      width: `${(game.conversions / topGames[0].conversions) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
