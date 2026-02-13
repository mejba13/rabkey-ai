"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Gamepad2,
  Eye,
  MousePointerClick,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Crown,
  Zap,
  Clock,
  Signal,
  Layers,
  Target,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { GradientText } from "@/components/shared/gradient-text";
import { cn } from "@/lib/utils";
import {
  adminStats,
  revenueHistory,
  trafficData,
  subscriptionBreakdown,
  platformDistribution,
  topGames,
} from "@/lib/mock-data/admin";

/* ─── Animation Variants ─────────────────────────────────────── */

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 26 },
  },
};

/* ─── Chart Tooltip ──────────────────────────────────────────── */

const chartTooltipStyle = {
  background: "rgba(10, 10, 18, 0.96)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  fontSize: "11px",
  fontFamily: "var(--font-heading)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  padding: "10px 14px",
};

/* ─── Time Period Selector ───────────────────────────────────── */

type TimePeriod = "7D" | "30D" | "90D" | "1Y";

function PeriodSelector({
  active,
  onChange,
}: {
  active: TimePeriod;
  onChange: (p: TimePeriod) => void;
}) {
  const periods: TimePeriod[] = ["7D", "30D", "90D", "1Y"];
  return (
    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
      {periods.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={cn(
            "relative px-3 py-1.5 rounded-md text-[10px] font-heading font-semibold transition-all duration-200",
            active === p
              ? "text-gaming-orange"
              : "text-white/25 hover:text-white/45"
          )}
        >
          {active === p && (
            <motion.div
              layoutId="period-bg"
              className="absolute inset-0 rounded-md bg-gaming-orange/[0.12] border border-gaming-orange/20"
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">{p}</span>
        </button>
      ))}
    </div>
  );
}

/* ─── Animated Metric Ring ───────────────────────────────────── */

function MetricRing({
  value,
  max,
  color,
  size = 56,
  strokeWidth = 4,
  label,
}: {
  value: number;
  max: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-heading font-bold text-sm"
          style={{ color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.6,
            type: "spring" as const,
            stiffness: 300,
            damping: 20,
          }}
        >
          {value}
          {label === "%" ? "%" : ""}
        </motion.span>
        {label && label !== "%" && (
          <span
            className="text-[7px] font-heading uppercase tracking-widest opacity-50"
            style={{ color }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Sparkline Mini Chart ───────────────────────────────────── */

function Sparkline({
  data,
  color,
  height = 32,
}: {
  data: number[];
  color: string;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <defs>
        <linearGradient
          id={`spark-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#spark-${color.replace("#", "")})`}
        stroke="none"
      />
    </motion.svg>
  );
}

/* ─── KPI Bento Card ─────────────────────────────────────────── */

function KPICard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  accentColor,
  sparkData,
}: {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: typeof DollarSign;
  accentColor: string;
  sparkData?: number[];
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.06] p-5",
        "bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent",
        "backdrop-blur-sm group cursor-default"
      )}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-50"
        style={{ backgroundColor: accentColor }}
      />
      {/* Ambient glow on hover */}
      <div
        className="absolute -top-12 -right-12 size-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: accentColor, opacity: 0 }}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <div
              className="size-8 rounded-lg flex items-center justify-center border border-white/[0.06]"
              style={{ backgroundColor: `${accentColor}12` }}
            >
              <Icon className="size-4" style={{ color: accentColor }} />
            </div>
            <p className="text-[10px] font-heading font-semibold uppercase tracking-[0.15em] text-white/30">
              {label}
            </p>
          </div>
          <p className="text-2xl font-heading font-bold text-white/90 tracking-tight mt-2">
            {value}
          </p>
          <div className="flex items-center gap-1.5">
            {changeType === "positive" ? (
              <ArrowUpRight className="size-3 text-gaming-teal" />
            ) : changeType === "negative" ? (
              <ArrowDownRight className="size-3 text-gaming-pink" />
            ) : null}
            <p
              className={cn(
                "text-[11px] font-heading font-medium",
                changeType === "positive" && "text-gaming-teal",
                changeType === "negative" && "text-gaming-pink",
                changeType === "neutral" && "text-white/25"
              )}
            >
              {change}
            </p>
          </div>
        </div>
        {sparkData && (
          <div className="mt-2">
            <Sparkline data={sparkData} color={accentColor} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Chart Card Wrapper ─────────────────────────────────────── */

function ChartCard({
  children,
  title,
  icon: Icon,
  iconColor,
  rightContent,
  className,
}: {
  children: React.ReactNode;
  title: string;
  icon: typeof BarChart3;
  iconColor?: string;
  rightContent?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-white/[0.06] overflow-hidden",
        "bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent",
        "backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-1">
        <div className="flex items-center gap-2.5">
          <div
            className="size-7 rounded-lg flex items-center justify-center border border-white/[0.06]"
            style={{
              backgroundColor: `${iconColor ?? "rgba(255,255,255,0.04)"}12`,
            }}
          >
            <Icon
              className="size-3.5"
              style={{ color: iconColor ?? "rgba(255,255,255,0.3)" }}
            />
          </div>
          <h3 className="text-[13px] font-heading font-semibold text-white/70">
            {title}
          </h3>
        </div>
        {rightContent}
      </div>
      <div className="px-2 pb-4">{children}</div>
    </motion.div>
  );
}

/* ─── Subscription Donut Center Metric ───────────────────────── */

function DonutCenter({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <motion.span
        className="font-heading font-bold text-lg"
        style={{ color }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.5,
          type: "spring" as const,
          stiffness: 300,
          damping: 20,
        }}
      >
        {value}
      </motion.span>
      <span className="text-[8px] font-heading uppercase tracking-widest text-white/25">
        {label}
      </span>
    </div>
  );
}

/* ─── Leaderboard Item ───────────────────────────────────────── */

function LeaderboardItem({
  rank,
  title,
  value,
  maxValue,
  metric,
  delay,
}: {
  rank: number;
  title: string;
  value: number;
  maxValue: number;
  metric: "views" | "alerts" | "conversions";
  delay: number;
}) {
  const pct = (value / maxValue) * 100;
  const rankColors = ["text-gaming-gold", "text-white/50", "text-gaming-coral/70", "text-white/20", "text-white/20"];
  const barColors: Record<string, string> = {
    views: "from-gaming-blue to-gaming-teal",
    alerts: "from-gaming-purple to-gaming-blue",
    conversions: "from-gaming-orange to-gaming-coral",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay,
        type: "spring" as const,
        stiffness: 260,
        damping: 24,
      }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "text-[11px] font-heading font-bold tabular-nums w-5",
              rankColors[rank - 1] ?? "text-white/20"
            )}
          >
            {rank === 1 ? (
              <Crown className="size-3.5 text-gaming-gold" />
            ) : (
              `#${rank}`
            )}
          </span>
          <span className="text-[12px] font-heading font-medium text-white/60 group-hover:text-white/80 transition-colors">
            {title}
          </span>
        </div>
        <span className="text-[11px] font-heading font-bold text-white/50 tabular-nums">
          {value.toLocaleString()}
        </span>
      </div>
      <div className="ml-7 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            barColors[metric]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.15 }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Live Indicator Dot ─────────────────────────────────────── */

function LiveDot() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full rounded-full bg-gaming-teal/40 animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-gaming-teal" />
      </span>
      <span className="text-[9px] font-heading font-semibold text-gaming-teal/60 uppercase tracking-wider">
        Live
      </span>
    </div>
  );
}

/* ─── Engagement Metric Mini Card ────────────────────────────── */

function EngagementMini({
  label,
  value,
  change,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  icon: typeof Eye;
  color: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -2 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] group cursor-default"
    >
      <div
        className="size-9 rounded-lg flex items-center justify-center border border-white/[0.06] shrink-0"
        style={{ backgroundColor: `${color}12` }}
      >
        <Icon className="size-4" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-heading uppercase tracking-wider text-white/25">
          {label}
        </p>
        <p className="text-sm font-heading font-bold text-white/80">
          {value}
        </p>
      </div>
      <span className="text-[10px] font-heading font-semibold text-gaming-teal shrink-0">
        {change}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ═══ MAIN PAGE COMPONENT ════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════ */

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<TimePeriod>("30D");
  const [leaderboardMetric, setLeaderboardMetric] = useState<
    "views" | "alerts" | "conversions"
  >("conversions");

  // Revenue sparkline data
  const revenueSpark = revenueHistory.map((d) => d.revenue);
  const usersSpark = revenueHistory.map((d) => d.users);
  const conversionSpark = [3.2, 3.5, 3.9, 4.1, 4.3, 4.5, 4.6, 4.8];
  const churnSpark = [3.2, 2.9, 2.8, 2.5, 2.4, 2.3, 2.2, 2.1];

  // Computed metrics
  const totalTraffic = trafficData.reduce((s, d) => s + d.visits, 0);
  const avgBounceRate = 34.2;
  const avgSessionDuration = "4m 23s";
  const pagesPerSession = 3.8;

  // Subscription total for center label
  const subTotal = subscriptionBreakdown.reduce((s, d) => s + d.count, 0);
  const platformTotal = platformDistribution.reduce((s, d) => s + d.count, 0);

  // Growth metrics
  const revenueGrowth =
    ((revenueHistory[revenueHistory.length - 1].revenue -
      revenueHistory[revenueHistory.length - 2].revenue) /
      revenueHistory[revenueHistory.length - 2].revenue) *
    100;

  return (
    <div className="space-y-7">
      {/* ─── Page Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 240, damping: 26 }}
        className="flex items-start justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-gaming-purple/20 to-gaming-blue/10 border border-gaming-purple/20 flex items-center justify-center">
              <BarChart3 className="size-5 text-gaming-purple" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold tracking-tight">
                <GradientText variant="secondary">Analytics</GradientText>{" "}
                <span className="text-white/80">Dashboard</span>
              </h1>
              <p className="text-[12px] text-white/30 font-heading mt-0.5">
                Platform performance metrics and growth insights
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LiveDot />
          <PeriodSelector active={period} onChange={setPeriod} />
        </div>
      </motion.div>

      {/* ─── KPI Bento Grid ─────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KPICard
          label="Total Revenue"
          value={`$${adminStats.totalRevenue.toLocaleString()}`}
          change={`+${revenueGrowth.toFixed(1)}% this month`}
          changeType="positive"
          icon={DollarSign}
          accentColor="#00D4AA"
          sparkData={revenueSpark}
        />
        <KPICard
          label="Active Users"
          value={adminStats.activeUsers.toLocaleString()}
          change={`${((adminStats.activeUsers / adminStats.totalUsers) * 100).toFixed(1)}% of ${adminStats.totalUsers.toLocaleString()}`}
          changeType="neutral"
          icon={Users}
          accentColor="#0EA5E9"
          sparkData={usersSpark}
        />
        <KPICard
          label="Conversion Rate"
          value={`${adminStats.conversionRate}%`}
          change="+0.3% this month"
          changeType="positive"
          icon={MousePointerClick}
          accentColor="#F5A623"
          sparkData={conversionSpark}
        />
        <KPICard
          label="Churn Rate"
          value={`${adminStats.churnRate}%`}
          change="-0.2% this month"
          changeType="positive"
          icon={TrendingDown}
          accentColor="#7C3AED"
          sparkData={churnSpark}
        />
      </motion.div>

      {/* ─── Revenue Chart + Growth Sidebar ─────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Revenue area chart — 2 cols */}
        <ChartCard
          title="Revenue & User Growth"
          icon={TrendingUp}
          iconColor="#00D4AA"
          rightContent={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-gaming-teal" />
                <span className="text-[10px] font-heading text-white/30">
                  Revenue
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-gaming-purple" />
                <span className="text-[10px] font-heading text-white/30">
                  Users
                </span>
              </div>
            </div>
          }
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={revenueHistory}
              margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revGradPremium"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.25} />
                  <stop offset="50%" stopColor="#00D4AA" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="userGradPremium"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.2} />
                  <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.06} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.025)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.12)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                fontFamily="var(--font-heading)"
                dy={8}
              />
              <YAxis
                stroke="rgba(255,255,255,0.12)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                fontFamily="var(--font-heading)"
                dx={-4}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                }
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                cursor={{ stroke: "rgba(255,255,255,0.06)" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#00D4AA"
                fill="url(#revGradPremium)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#00D4AA",
                  stroke: "rgba(0,212,170,0.3)",
                  strokeWidth: 6,
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#7C3AED"
                fill="url(#userGradPremium)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#7C3AED",
                  stroke: "rgba(124,58,237,0.3)",
                  strokeWidth: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue Breakdown Sidebar */}
        <motion.div
          variants={slideInRight}
          className="rounded-2xl border border-white/[0.06] p-5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent space-y-5"
        >
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-gaming-teal" />
            <h3 className="text-[13px] font-heading font-semibold text-white/70">
              Growth Metrics
            </h3>
          </div>

          {/* Revenue ring */}
          <div className="flex items-center gap-4">
            <MetricRing
              value={Math.round(revenueGrowth)}
              max={50}
              color="#00D4AA"
              label="%"
            />
            <div>
              <p className="text-[10px] font-heading uppercase tracking-wider text-white/25">
                Monthly Growth
              </p>
              <p className="text-lg font-heading font-bold text-white/80">
                ${adminStats.monthlyRevenue.toLocaleString()}
              </p>
              <p className="text-[10px] font-heading text-gaming-teal">
                +${(
                  adminStats.monthlyRevenue -
                  revenueHistory[revenueHistory.length - 2].revenue
                ).toLocaleString()}{" "}
                vs last month
              </p>
            </div>
          </div>

          <div className="h-px bg-white/[0.04]" />

          {/* Key metrics list */}
          <div className="space-y-3.5">
            {[
              {
                label: "Avg Revenue Per User",
                value: `$${(adminStats.monthlyRevenue / adminStats.activeUsers * 12).toFixed(2)}`,
                color: "#00D4AA",
              },
              {
                label: "Lifetime Value",
                value: "$187.40",
                color: "#F5A623",
              },
              {
                label: "Customer Acq. Cost",
                value: "$12.50",
                color: "#0EA5E9",
              },
              {
                label: "MRR Growth Rate",
                value: `+${revenueGrowth.toFixed(1)}%`,
                color: "#7C3AED",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between"
              >
                <span className="text-[11px] font-heading text-white/35">
                  {m.label}
                </span>
                <span
                  className="text-[12px] font-heading font-bold tabular-nums"
                  style={{ color: m.color }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/[0.04]" />

          {/* MRR Target */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-heading uppercase tracking-wider text-white/20">
                MRR Target
              </span>
              <span className="text-[10px] font-heading font-semibold text-gaming-gold">
                $50,000
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gaming-teal to-gaming-blue"
                initial={{ width: 0 }}
                animate={{
                  width: `${(adminStats.monthlyRevenue / 50000) * 100}%`,
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              />
            </div>
            <p className="text-[10px] font-heading text-white/25 mt-1.5">
              {((adminStats.monthlyRevenue / 50000) * 100).toFixed(1)}%
              achieved — $
              {(50000 - adminStats.monthlyRevenue).toLocaleString()} remaining
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Traffic + Engagement Row ───────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Traffic bar chart — 2 cols */}
        <ChartCard
          title="Weekly Traffic Breakdown"
          icon={Globe}
          iconColor="#F5A623"
          rightContent={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-gaming-orange" />
                <span className="text-[10px] font-heading text-white/30">
                  Visits
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-gaming-purple" />
                <span className="text-[10px] font-heading text-white/30">
                  Unique
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-gaming-teal" />
                <span className="text-[10px] font-heading text-white/30">
                  Pages
                </span>
              </div>
            </div>
          }
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={trafficData}
              margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
              barGap={2}
            >
              <defs>
                <linearGradient
                  id="barVisits"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#F5A623" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#F5A623" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient
                  id="barUnique"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.45} />
                </linearGradient>
                <linearGradient
                  id="barPages"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#00D4AA" stopOpacity={0.45} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.025)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                stroke="rgba(255,255,255,0.12)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                fontFamily="var(--font-heading)"
                dy={8}
              />
              <YAxis
                stroke="rgba(255,255,255,0.12)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                fontFamily="var(--font-heading)"
                dx={-4}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                }
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
              />
              <Bar
                dataKey="visits"
                fill="url(#barVisits)"
                radius={[4, 4, 0, 0]}
                name="Visits"
              />
              <Bar
                dataKey="uniqueVisitors"
                fill="url(#barUnique)"
                radius={[4, 4, 0, 0]}
                name="Unique Visitors"
              />
              <Bar
                dataKey="pageViews"
                fill="url(#barPages)"
                radius={[4, 4, 0, 0]}
                name="Page Views"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Engagement sidebar */}
        <motion.div
          variants={slideInRight}
          className="rounded-2xl border border-white/[0.06] p-5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent space-y-4"
        >
          <div className="flex items-center gap-2">
            <Signal className="size-4 text-gaming-orange" />
            <h3 className="text-[13px] font-heading font-semibold text-white/70">
              Engagement
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <MetricRing
                value={Math.round(100 - avgBounceRate)}
                max={100}
                color="#00D4AA"
                size={48}
                strokeWidth={3}
              />
              <p className="text-[9px] font-heading text-white/25 mt-2 uppercase tracking-wider">
                Retention
              </p>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <MetricRing
                value={pagesPerSession}
                max={10}
                color="#F5A623"
                size={48}
                strokeWidth={3}
              />
              <p className="text-[9px] font-heading text-white/25 mt-2 uppercase tracking-wider">
                Pages/Session
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                label: "Total Weekly Traffic",
                value: totalTraffic.toLocaleString(),
                icon: Eye,
                color: "#0EA5E9",
              },
              {
                label: "Avg Session Duration",
                value: avgSessionDuration,
                icon: Clock,
                color: "#7C3AED",
              },
              {
                label: "Bounce Rate",
                value: `${avgBounceRate}%`,
                icon: TrendingDown,
                color: "#FF6B35",
              },
              {
                label: "Peak Day",
                value: "Saturday",
                icon: Zap,
                color: "#FFD700",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between py-1.5"
              >
                <div className="flex items-center gap-2">
                  <m.icon
                    className="size-3"
                    style={{ color: m.color }}
                  />
                  <span className="text-[11px] font-heading text-white/35">
                    {m.label}
                  </span>
                </div>
                <span
                  className="text-[11px] font-heading font-bold tabular-nums"
                  style={{ color: m.color }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Distribution + Leaderboard Row ─────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Subscription Distribution */}
        <ChartCard
          title="Subscription Tiers"
          icon={Layers}
          iconColor="#7C3AED"
        >
          <div className="relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={subscriptionBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="tier"
                  stroke="rgba(10,10,18,0.9)"
                  strokeWidth={2}
                >
                  {subscriptionBreakdown.map((entry) => (
                    <Cell
                      key={entry.tier}
                      fill={entry.color}
                      opacity={0.9}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <DonutCenter
              value={subTotal.toLocaleString()}
              label="Total Users"
              color="#FFFFFF"
            />
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-5 -mt-2 px-4">
            {subscriptionBreakdown.map((s) => (
              <div key={s.tier} className="flex items-center gap-1.5">
                <div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-[10px] font-heading text-white/35">
                  {s.tier}
                </span>
                <span className="text-[10px] font-heading font-bold text-white/50 tabular-nums">
                  {((s.count / subTotal) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Platform Preference */}
        <ChartCard
          title="Platform Preference"
          icon={Gamepad2}
          iconColor="#0EA5E9"
        >
          <div className="relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={platformDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="platform"
                  stroke="rgba(10,10,18,0.9)"
                  strokeWidth={2}
                >
                  {platformDistribution.map((entry) => (
                    <Cell
                      key={entry.platform}
                      fill={entry.color}
                      opacity={0.9}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <DonutCenter
              value={platformTotal.toLocaleString()}
              label="Total"
              color="#FFFFFF"
            />
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-4 -mt-2 px-4 flex-wrap">
            {platformDistribution.map((p) => (
              <div key={p.platform} className="flex items-center gap-1.5">
                <div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-[10px] font-heading text-white/35">
                  {p.platform}
                </span>
                <span className="text-[10px] font-heading font-bold text-white/50 tabular-nums">
                  {((p.count / platformTotal) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Top Games Leaderboard */}
        <motion.div
          variants={staggerItem}
          className="rounded-2xl border border-white/[0.06] p-5 bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg flex items-center justify-center bg-gaming-gold/[0.08] border border-white/[0.06]">
                <Target className="size-3.5 text-gaming-gold" />
              </div>
              <h3 className="text-[13px] font-heading font-semibold text-white/70">
                Top Games
              </h3>
            </div>
            {/* Metric toggle */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-white/[0.03] border border-white/[0.06]">
              {(["views", "alerts", "conversions"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setLeaderboardMetric(m)}
                  className={cn(
                    "px-2 py-1 rounded text-[9px] font-heading font-semibold capitalize transition-all duration-200",
                    leaderboardMetric === m
                      ? "bg-gaming-orange/[0.12] text-gaming-orange"
                      : "text-white/25 hover:text-white/45"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {topGames.map((game, i) => (
              <LeaderboardItem
                key={game.gameId}
                rank={i + 1}
                title={game.title}
                value={game[leaderboardMetric]}
                maxValue={topGames[0][leaderboardMetric]}
                metric={leaderboardMetric}
                delay={0.15 + i * 0.06}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Bottom Engagement Metrics ──────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <EngagementMini
          label="Alert Triggers"
          value="89,341"
          change="+12%"
          icon={Zap}
          color="#FF6B35"
        />
        <EngagementMini
          label="Wishlist Adds"
          value="34,210"
          change="+8%"
          icon={Layers}
          color="#7C3AED"
        />
        <EngagementMini
          label="Searches"
          value="156,780"
          change="+15%"
          icon={Eye}
          color="#0EA5E9"
        />
        <EngagementMini
          label="Deal Clicks"
          value="67,430"
          change="+22%"
          icon={MousePointerClick}
          color="#FFD700"
        />
      </motion.div>
    </div>
  );
}
