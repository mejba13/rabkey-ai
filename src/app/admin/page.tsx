"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  DollarSign,
  Bell,
  Gamepad2,
  Store,
  Tag,
  Activity,
  CreditCard,
  UserPlus,
  Zap,
  AlertTriangle,
  ArrowUpRight,
  Flame,
  Shield,
  Crown,
  Eye,
  Target,
  Percent,
  TrendingUp,
  Search,
  Settings,
  Sparkles,
  Clock,
  ChevronRight,
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
import { cn } from "@/lib/utils";
import {
  adminStats,
  revenueHistory,
  trafficData,
  topGames,
  recentActivity,
  scraperStatuses,
  subscriptionBreakdown,
  platformDistribution,
} from "@/lib/mock-data/admin";
import { formatDate } from "@/lib/formatters";
import { GradientText } from "@/components/shared/gradient-text";

/* ═══════════════════════════════════════════════
   Animated Counter Hook
   ═══════════════════════════════════════════════ */

function useAnimatedCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);

  return { count, ref };
}

/* ═══════════════════════════════════════════════
   Motion Variants
   ═══════════════════════════════════════════════ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

/* ═══════════════════════════════════════════════
   BentoCard with ambient hover glow
   ═══════════════════════════════════════════════ */

function BentoCard({
  children,
  className,
  glowColor,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-white/[0.03] via-[#0d0d18]/80 to-transparent",
        "backdrop-blur-xl",
        "border border-white/[0.06]",
        "hover:border-white/[0.12]",
        "transition-all duration-300",
        className,
      )}
    >
      {glowColor && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top, ${glowColor} 0%, transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Sparkline SVG
   ═══════════════════════════════════════════════ */

function Sparkline({
  data,
  color,
  width = 100,
  height = 28,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const coords = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height * 0.85,
  }));

  const polyline = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const areaPath = `M0,${height} ${coords.map((c) => `L${c.x},${c.y}`).join(" ")} L${width},${height} Z`;
  const gradId = `spark-${color.replace("#", "")}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#${gradId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Activity Icon Config
   ═══════════════════════════════════════════════ */

const activityIcons: Record<
  string,
  { icon: typeof Users; color: string; bg: string }
> = {
  user_signup: {
    icon: UserPlus,
    color: "text-gaming-teal",
    bg: "bg-gaming-teal/10 border-gaming-teal/20",
  },
  alert_triggered: {
    icon: Bell,
    color: "text-gaming-orange",
    bg: "bg-gaming-orange/10 border-gaming-orange/20",
  },
  deal_created: {
    icon: Tag,
    color: "text-gaming-purple",
    bg: "bg-gaming-purple/10 border-gaming-purple/20",
  },
  store_updated: {
    icon: Store,
    color: "text-gaming-blue",
    bg: "bg-gaming-blue/10 border-gaming-blue/20",
  },
  scraper_run: {
    icon: Zap,
    color: "text-gaming-gold",
    bg: "bg-gaming-gold/10 border-gaming-gold/20",
  },
  payment_received: {
    icon: CreditCard,
    color: "text-gaming-teal",
    bg: "bg-gaming-teal/10 border-gaming-teal/20",
  },
};

/* ═══════════════════════════════════════════════
   Chart Tooltip Style
   ═══════════════════════════════════════════════ */

const chartTooltipStyle = {
  background: "rgba(8, 8, 15, 0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  fontSize: "11px",
  fontFamily: "var(--font-heading)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  padding: "8px 12px",
};

/* ═══════════════════════════════════════════════
   Ring Progress (for Conversion Rate)
   ═══════════════════════════════════════════════ */

function RingProgress({
  value,
  size = 64,
  strokeWidth = 5,
  color,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.03)"
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
        animate={{ strokeDashoffset: offset }}
        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Donut Chart (for Subscription Breakdown)
   ═══════════════════════════════════════════════ */

function DonutChart({
  segments,
  size = 120,
  strokeWidth = 14,
}: {
  segments: { value: number; color: string; label: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, seg) => s + seg.value, 0);

  let accumulatedOffset = 0;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.02)"
        strokeWidth={strokeWidth}
      />
      {segments.map((seg, i) => {
        const segLength = (seg.value / total) * circumference;
        const gap = 4;
        const dashArray = `${segLength - gap} ${circumference - segLength + gap}`;
        const currentOffset = accumulatedOffset;
        accumulatedOffset += segLength;

        return (
          <motion.circle
            key={seg.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset={-currentOffset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
          />
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Quick Action Button
   ═══════════════════════════════════════════════ */

function QuickAction({
  icon: Icon,
  label,
  color,
  bg,
}: {
  icon: typeof Users;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "flex items-center gap-2.5 px-4 py-2.5 rounded-xl w-full",
        "bg-white/[0.02] border border-white/[0.06]",
        "hover:bg-white/[0.04] hover:border-white/[0.10]",
        "transition-all duration-200 cursor-pointer",
      )}
    >
      <div
        className={cn(
          "size-7 rounded-lg flex items-center justify-center",
          bg,
        )}
      >
        <Icon className={cn("size-3.5", color)} />
      </div>
      <span className="text-[12px] font-heading font-semibold text-white/50">
        {label}
      </span>
      <ChevronRight className="size-3 text-white/15 ml-auto" />
    </motion.button>
  );
}

/* ══════════════════════════════════════════════
   MAIN DASHBOARD
   ══════════════════════════════════════════════ */

export default function AdminOverviewPage() {
  const usersCounter = useAnimatedCounter(adminStats.totalUsers);
  const revenueCounter = useAnimatedCounter(adminStats.monthlyRevenue);
  const alertsCounter = useAnimatedCounter(adminStats.activeAlerts);
  const gamesCounter = useAnimatedCounter(adminStats.totalGames);

  const totalSubs = subscriptionBreakdown.reduce((s, b) => s + b.count, 0);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* ── Page Header ── */}
      <motion.div
        variants={itemVariants}
        className="flex items-end justify-between"
      >
        <div>
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-xl bg-gradient-to-br from-gaming-orange/20 to-gaming-coral/10 border border-gaming-orange/20 flex items-center justify-center shadow-lg shadow-gaming-orange/5">
              <Flame className="size-5 text-gaming-orange" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold tracking-tight">
                <GradientText variant="primary">Command Center</GradientText>
              </h1>
              <p className="text-[13px] text-white/30 font-heading mt-0.5">
                Welcome back, Admin. Here&apos;s your real-time overview.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gaming-teal/[0.06] border border-gaming-teal/15">
            <div className="size-1.5 rounded-full bg-gaming-teal animate-pulse" />
            <span className="text-[10px] font-heading font-semibold text-gaming-teal/80 uppercase tracking-wider">
              Live
            </span>
          </div>
          <span className="text-[11px] font-heading text-white/20">
            Last updated: just now
          </span>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          BENTO GRID — Hero Stats (4 major KPIs with sparklines)
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* ── Total Users ── */}
        <BentoCard glowColor="rgba(14,165,233,0.04)">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/25">
                Total Users
              </span>
              <div className="size-9 rounded-xl bg-gaming-blue/[0.08] border border-gaming-blue/15 flex items-center justify-center">
                <Users className="size-4 text-gaming-blue" />
              </div>
            </div>
            <div ref={usersCounter.ref}>
              <p className="text-3xl font-heading font-extrabold text-white/95 tracking-tight tabular-nums">
                {usersCounter.count.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <ArrowUpRight className="size-3 text-gaming-teal" />
              <span className="text-[11px] font-heading font-semibold text-gaming-teal">
                +12.3%
              </span>
              <span className="text-[11px] font-heading text-white/20">
                from last month
              </span>
            </div>
            <div className="mt-4">
              <Sparkline
                data={[35, 45, 38, 52, 48, 60, 55, 70, 65, 78, 72, 85]}
                color="#0EA5E9"
              />
            </div>
          </div>
        </BentoCard>

        {/* ── Monthly Revenue ── */}
        <BentoCard glowColor="rgba(0,212,170,0.04)">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/25">
                Monthly Revenue
              </span>
              <div className="size-9 rounded-xl bg-gaming-teal/[0.08] border border-gaming-teal/15 flex items-center justify-center">
                <DollarSign className="size-4 text-gaming-teal" />
              </div>
            </div>
            <p className="text-3xl font-heading font-extrabold text-white/95 tracking-tight tabular-nums">
              ${revenueCounter.count.toLocaleString()}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <ArrowUpRight className="size-3 text-gaming-teal" />
              <span className="text-[11px] font-heading font-semibold text-gaming-teal">
                +8.5%
              </span>
              <span className="text-[11px] font-heading text-white/20">
                from last month
              </span>
            </div>
            <div className="mt-4">
              <Sparkline
                data={[40, 35, 55, 50, 45, 65, 70, 60, 75, 80, 72, 90]}
                color="#00D4AA"
              />
            </div>
          </div>
        </BentoCard>

        {/* ── Active Alerts ── */}
        <BentoCard glowColor="rgba(245,166,35,0.04)">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/25">
                Active Alerts
              </span>
              <div className="size-9 rounded-xl bg-gaming-orange/[0.08] border border-gaming-orange/15 flex items-center justify-center">
                <Bell className="size-4 text-gaming-orange" />
              </div>
            </div>
            <p className="text-3xl font-heading font-extrabold text-white/95 tracking-tight tabular-nums">
              {alertsCounter.count.toLocaleString()}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] font-heading text-white/20">
                {adminStats.totalAlerts.toLocaleString()} total alerts
              </span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="relative flex items-center justify-center size-6">
                <div className="absolute inset-0 rounded-full bg-gaming-orange/10 animate-ping" />
                <div className="size-2.5 rounded-full bg-gaming-orange/60" />
              </div>
              <span className="text-[10px] font-heading text-white/25">
                12 triggered today
              </span>
            </div>
          </div>
        </BentoCard>

        {/* ── Conversion Rate — with ring progress ── */}
        <BentoCard glowColor="rgba(124,58,237,0.04)">
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/25">
                Conversion Rate
              </span>
              <div className="size-9 rounded-xl bg-gaming-purple/[0.08] border border-gaming-purple/15 flex items-center justify-center">
                <Target className="size-4 text-gaming-purple" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <RingProgress
                  value={adminStats.conversionRate * 10}
                  size={60}
                  strokeWidth={5}
                  color="#7C3AED"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-heading font-extrabold text-white/90 tabular-nums">
                    {adminStats.conversionRate}%
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <ArrowUpRight className="size-3 text-gaming-teal" />
                  <span className="text-[11px] font-heading font-semibold text-gaming-teal">
                    +0.3%
                  </span>
                </div>
                <span className="text-[10px] font-heading text-white/20">
                  from last month
                </span>
                <div className="flex items-center gap-1.5 mt-2">
                  <Percent className="size-2.5 text-white/15" />
                  <span className="text-[10px] font-heading text-white/20">
                    Churn: {adminStats.churnRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>
      </div>

      {/* ═══════════════════════════════════════════
          BENTO GRID — Secondary Stats + Quick Actions
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Secondary stats */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Games Tracked",
              value: gamesCounter.count.toLocaleString(),
              icon: Gamepad2,
              color: "text-gaming-coral",
              bg: "bg-gaming-coral/[0.06]",
              border: "border-gaming-coral/10",
            },
            {
              label: "Active Stores",
              value: String(adminStats.totalStores),
              icon: Store,
              color: "text-gaming-blue",
              bg: "bg-gaming-blue/[0.06]",
              border: "border-gaming-blue/10",
            },
            {
              label: "Live Deals",
              value: adminStats.totalDeals.toLocaleString(),
              icon: Tag,
              color: "text-gaming-gold",
              bg: "bg-gaming-gold/[0.06]",
              border: "border-gaming-gold/10",
            },
            {
              label: "Avg Deal Score",
              value: String(adminStats.avgDealScore),
              icon: Activity,
              color: "text-gaming-teal",
              bg: "bg-gaming-teal/[0.06]",
              border: "border-gaming-teal/10",
            },
          ].map((stat) => (
            <BentoCard key={stat.label}>
              <div className="p-4 flex items-center gap-3">
                <div
                  className={cn(
                    "size-10 rounded-xl flex items-center justify-center border shrink-0",
                    stat.bg,
                    stat.border,
                  )}
                >
                  <stat.icon className={cn("size-[18px]", stat.color)} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-white/20">
                    {stat.label}
                  </p>
                  <p className="text-xl font-heading font-bold text-white/90 tracking-tight tabular-nums mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>

        {/* Quick Actions */}
        <BentoCard className="lg:col-span-4">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-3.5 text-gaming-orange/50" />
              <h3 className="text-[11px] font-heading font-bold uppercase tracking-wider text-white/25">
                Quick Actions
              </h3>
            </div>
            <div className="space-y-2">
              <QuickAction
                icon={Search}
                label="Search Games"
                color="text-gaming-blue"
                bg="bg-gaming-blue/[0.08]"
              />
              <QuickAction
                icon={TrendingUp}
                label="Run Scrapers"
                color="text-gaming-teal"
                bg="bg-gaming-teal/[0.08]"
              />
              <QuickAction
                icon={Settings}
                label="Site Settings"
                color="text-gaming-purple"
                bg="bg-gaming-purple/[0.08]"
              />
            </div>
          </div>
        </BentoCard>
      </div>

      {/* ═══════════════════════════════════════════
          BENTO GRID — Charts Row (7 + 5 asymmetric)
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ── Revenue Chart ── */}
        <BentoCard className="lg:col-span-7" glowColor="rgba(0,212,170,0.02)">
          <div className="p-5 pb-2">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-gradient-to-br from-gaming-teal/[0.12] to-gaming-teal/[0.04] border border-gaming-teal/15 flex items-center justify-center">
                  <DollarSign className="size-3.5 text-gaming-teal" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-[13px] text-white/80">
                    Revenue & Growth
                  </h2>
                  <p className="text-[10px] font-heading text-white/20 mt-0.5">
                    Last 8 months &middot; MRR trend
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-gaming-teal" />
                  <span className="text-[10px] font-heading text-white/25">
                    Revenue
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-gaming-purple/50" />
                  <span className="text-[10px] font-heading text-white/25">
                    Users
                  </span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueHistory}>
                <defs>
                  <linearGradient
                    id="cmdRevGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#00D4AA"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="50%"
                      stopColor="#00D4AA"
                      stopOpacity={0.08}
                    />
                    <stop
                      offset="100%"
                      stopColor="#00D4AA"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="cmdUsrGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#7C3AED"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="100%"
                      stopColor="#7C3AED"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.03)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.12)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="var(--font-heading)"
                />
                <YAxis
                  stroke="rgba(255,255,255,0.12)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="var(--font-heading)"
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                  }
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00D4AA"
                  fill="url(#cmdRevGrad)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "#00D4AA",
                    stroke: "#0d0d18",
                    strokeWidth: 2,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#7C3AED"
                  fill="url(#cmdUsrGrad)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* ── Traffic Chart ── */}
        <BentoCard
          className="lg:col-span-5"
          glowColor="rgba(245,166,35,0.02)"
        >
          <div className="p-5 pb-2">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-gradient-to-br from-gaming-orange/[0.12] to-gaming-orange/[0.04] border border-gaming-orange/15 flex items-center justify-center">
                  <Eye className="size-3.5 text-gaming-orange" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-[13px] text-white/80">
                    Weekly Traffic
                  </h2>
                  <p className="text-[10px] font-heading text-white/20 mt-0.5">
                    Visits &amp; unique visitors
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-gaming-orange" />
                  <span className="text-[10px] font-heading text-white/25">
                    Visits
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-gaming-purple" />
                  <span className="text-[10px] font-heading text-white/25">
                    Unique
                  </span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={trafficData} barGap={2}>
                <defs>
                  <linearGradient
                    id="cmdVisitGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#F5A623"
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="100%"
                      stopColor="#F5A623"
                      stopOpacity={0.4}
                    />
                  </linearGradient>
                  <linearGradient
                    id="cmdUniqueGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#7C3AED"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="#7C3AED"
                      stopOpacity={0.3}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.03)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke="rgba(255,255,255,0.12)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="var(--font-heading)"
                />
                <YAxis
                  stroke="rgba(255,255,255,0.12)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="var(--font-heading)"
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                  }
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar
                  dataKey="visits"
                  fill="url(#cmdVisitGrad)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="uniqueVisitors"
                  fill="url(#cmdUniqueGrad)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>
      </div>

      {/* ═══════════════════════════════════════════
          BENTO GRID — Subscriptions + Platforms Row
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ── Subscription Breakdown ── */}
        <BentoCard glowColor="rgba(124,58,237,0.02)">
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-gradient-to-br from-gaming-purple/[0.12] to-gaming-purple/[0.04] border border-gaming-purple/15 flex items-center justify-center">
                  <Crown className="size-3.5 text-gaming-purple" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-[13px] text-white/80">
                    Subscription Mix
                  </h2>
                  <p className="text-[10px] font-heading text-white/20 mt-0.5">
                    {totalSubs.toLocaleString()} total subscribers
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Donut */}
              <div className="relative shrink-0">
                <DonutChart
                  size={120}
                  strokeWidth={14}
                  segments={subscriptionBreakdown.map((b) => ({
                    value: b.count,
                    color: b.color,
                    label: b.tier,
                  }))}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-heading font-extrabold text-white/90 tabular-nums">
                    {totalSubs.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-heading text-white/25 uppercase tracking-wider">
                    Users
                  </span>
                </div>
              </div>

              {/* Breakdown list */}
              <div className="flex-1 space-y-3">
                {subscriptionBreakdown.map((b) => {
                  const pct = ((b.count / totalSubs) * 100).toFixed(1);
                  return (
                    <div key={b.tier} className="flex items-center gap-3">
                      <div
                        className="size-3 rounded-full shrink-0"
                        style={{ background: b.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-heading font-semibold text-white/60">
                            {b.tier}
                          </span>
                          <span className="text-[11px] font-heading tabular-nums text-white/40">
                            {b.count.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(b.count / totalSubs) * 100}%`,
                            }}
                            transition={{
                              delay: 0.5,
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full"
                            style={{ background: b.color }}
                          />
                        </div>
                        <span className="text-[9px] font-heading text-white/20 mt-0.5">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ── Platform Distribution ── */}
        <BentoCard glowColor="rgba(14,165,233,0.02)">
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-gradient-to-br from-gaming-blue/[0.12] to-gaming-blue/[0.04] border border-gaming-blue/15 flex items-center justify-center">
                  <Gamepad2 className="size-3.5 text-gaming-blue" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-[13px] text-white/80">
                    Platform Distribution
                  </h2>
                  <p className="text-[10px] font-heading text-white/20 mt-0.5">
                    User preferences by platform
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {platformDistribution.map((p, i) => {
                const maxCount = platformDistribution[0].count;
                const barPct = (p.count / maxCount) * 100;
                return (
                  <motion.div
                    key={p.platform}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] font-heading font-semibold text-white/60">
                        {p.platform}
                      </span>
                      <span className="text-[11px] font-heading font-bold tabular-nums text-white/40">
                        {p.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-white/[0.03] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barPct}%` }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${p.color}60 0%, ${p.color} 100%)`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </BentoCard>
      </div>

      {/* ═══════════════════════════════════════════
          BENTO GRID — Bottom Row (5-4-3 asymmetric)
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ── Recent Activity ── */}
        <BentoCard className="lg:col-span-5">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <Activity className="size-3.5 text-white/40" />
                </div>
                <h2 className="font-heading font-semibold text-[13px] text-white/80">
                  Live Activity
                </h2>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gaming-teal/[0.06] border border-gaming-teal/10">
                <div className="size-1.5 rounded-full bg-gaming-teal animate-pulse" />
                <span className="text-[9px] font-heading font-semibold text-gaming-teal/70 uppercase tracking-wider">
                  Real-time
                </span>
              </div>
            </div>

            <div className="space-y-0.5 max-h-[340px] overflow-y-auto pr-1">
              {recentActivity.map((entry, i) => {
                const config = activityIcons[entry.type];
                const Icon = config?.icon ?? Activity;
                const color = config?.color ?? "text-white/30";
                const bg =
                  config?.bg ?? "bg-white/[0.04] border-white/[0.06]";

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.6 + i * 0.05,
                      type: "spring" as const,
                      stiffness: 200,
                      damping: 25,
                    }}
                    className="group flex items-start gap-3 px-2.5 py-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={cn(
                          "size-8 rounded-lg flex items-center justify-center shrink-0 border",
                          bg,
                          color,
                        )}
                      >
                        <Icon className="size-3.5" />
                      </div>
                      {i < recentActivity.length - 1 && (
                        <div className="w-px h-4 bg-white/[0.04] mt-1" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      <p className="text-[12px] text-white/50 leading-relaxed">
                        {entry.message}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock className="size-2.5 text-white/10" />
                        <p className="text-[10px] text-white/15 font-heading">
                          {formatDate(entry.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </BentoCard>

        {/* ── Top Games ── */}
        <BentoCard
          className="lg:col-span-4"
          glowColor="rgba(124,58,237,0.02)"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-gradient-to-br from-gaming-purple/[0.12] to-gaming-purple/[0.04] border border-gaming-purple/15 flex items-center justify-center">
                  <Gamepad2 className="size-3.5 text-gaming-purple" />
                </div>
                <h2 className="font-heading font-semibold text-[13px] text-white/80">
                  Top Games
                </h2>
              </div>
              <span className="text-[10px] font-heading text-white/15">
                By views
              </span>
            </div>

            <div className="space-y-2">
              {topGames.map((game, i) => {
                const barWidth = (game.views / topGames[0].views) * 100;
                const isFirst = i === 0;

                return (
                  <motion.div
                    key={game.gameId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.06 }}
                    className="group relative py-2.5 px-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Background bar */}
                    <div className="absolute inset-y-0 left-0 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{
                          delay: 0.8 + i * 0.08,
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        className={cn(
                          "h-full bg-gradient-to-r",
                          isFirst
                            ? "from-gaming-gold/[0.08] to-transparent"
                            : "from-gaming-purple/[0.06] to-transparent",
                        )}
                      />
                    </div>

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        {isFirst ? (
                          <div className="size-7 rounded-md bg-gaming-gold/[0.08] border border-gaming-gold/15 flex items-center justify-center">
                            <Crown className="size-3.5 text-gaming-gold" />
                          </div>
                        ) : (
                          <span
                            className={cn(
                              "text-[11px] font-heading font-extrabold w-7 h-7 rounded-md flex items-center justify-center",
                              i === 1
                                ? "text-white/40 bg-white/[0.02]"
                                : i === 2
                                  ? "text-gaming-orange/50 bg-gaming-orange/[0.03]"
                                  : "text-white/15 bg-white/[0.01]",
                            )}
                          >
                            #{i + 1}
                          </span>
                        )}
                        <span className="text-[13px] font-heading font-medium text-white/70 truncate">
                          {game.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-[11px] font-heading text-white/20 tabular-nums">
                          {(game.views / 1000).toFixed(1)}K
                        </span>
                        <span className="text-[11px] font-heading font-bold text-gaming-teal tabular-nums">
                          {game.conversions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Insight bar */}
            <div className="mt-4 pt-3 border-t border-white/[0.04]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading text-white/20">
                  Total conversions
                </span>
                <span className="text-[12px] font-heading font-bold text-gaming-teal tabular-nums">
                  {topGames
                    .reduce((s, g) => s + g.conversions, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ── System Health ── */}
        <BentoCard className="lg:col-span-3">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-gradient-to-br from-gaming-teal/[0.10] to-gaming-teal/[0.03] border border-gaming-teal/10 flex items-center justify-center">
                  <Shield className="size-3.5 text-gaming-teal" />
                </div>
                <h2 className="font-heading font-semibold text-[13px] text-white/80">
                  Health
                </h2>
              </div>
            </div>

            {/* Health summary */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                {
                  label: "OK",
                  count: scraperStatuses.filter((s) => s.status === "healthy")
                    .length,
                  color: "text-gaming-teal",
                  bg: "bg-gaming-teal/[0.06]",
                  border: "border-gaming-teal/10",
                },
                {
                  label: "Warn",
                  count: scraperStatuses.filter((s) => s.status === "warning")
                    .length,
                  color: "text-gaming-gold",
                  bg: "bg-gaming-gold/[0.06]",
                  border: "border-gaming-gold/10",
                },
                {
                  label: "Error",
                  count: scraperStatuses.filter((s) => s.status === "error")
                    .length,
                  color: "text-gaming-pink",
                  bg: "bg-gaming-pink/[0.06]",
                  border: "border-gaming-pink/10",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className={cn(
                    "rounded-lg p-2 text-center border",
                    s.bg,
                    s.border,
                  )}
                >
                  <p
                    className={cn(
                      "text-lg font-heading font-bold tabular-nums",
                      s.color,
                    )}
                  >
                    {s.count}
                  </p>
                  <p className="text-[9px] font-heading font-semibold uppercase tracking-wider text-white/20">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* 30-Day Uptime bar */}
            <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-heading font-semibold text-white/25 uppercase tracking-wider">
                  30-Day Uptime
                </span>
                <span className="text-[12px] font-heading font-bold text-gaming-teal tabular-nums">
                  99.8%
                </span>
              </div>
              <div className="flex gap-[2px]">
                {Array.from({ length: 30 }, (_, i) => {
                  const isDown = i === 12 || i === 23;
                  return (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.8 + i * 0.02 }}
                      className={cn(
                        "flex-1 h-4 rounded-sm origin-bottom",
                        isDown ? "bg-gaming-pink/40" : "bg-gaming-teal/25",
                      )}
                    />
                  );
                })}
              </div>
            </div>

            {/* Scraper list */}
            <div className="space-y-0.5 max-h-[150px] overflow-y-auto pr-1">
              {scraperStatuses.map((s, i) => (
                <motion.div
                  key={s.storeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.04 }}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {s.status === "error" && (
                      <AlertTriangle className="size-3 text-gaming-pink shrink-0" />
                    )}
                    <span className="text-[12px] text-white/40 truncate font-heading">
                      {s.storeName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {s.avgResponseTime > 0 && (
                      <span className="text-[9px] font-heading text-white/15 tabular-nums">
                        {s.avgResponseTime}ms
                      </span>
                    )}
                    <div
                      className={cn(
                        "size-2 rounded-full shrink-0",
                        s.status === "healthy" && "bg-gaming-teal",
                        s.status === "warning" && "bg-gaming-gold",
                        s.status === "error" && "bg-gaming-pink animate-pulse",
                      )}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BentoCard>
      </div>
    </motion.div>
  );
}
