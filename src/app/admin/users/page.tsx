"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  UserPlus,
  Search,
  ChevronLeft,
  ChevronRight,
  Crown,
  Shield,
  Bell,
  Heart,
  Activity,
  Calendar,
  LayoutGrid,
  List,
  ArrowUpDown,
  Filter,
  Ban,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  MoreHorizontal,
  Mail,
  Eye,
} from "lucide-react";
import { GamingButton } from "@/components/gaming";
import { formatDate } from "@/lib/formatters";
import { mockUsers } from "@/lib/mock-data/admin";
import type { MockUser } from "@/lib/mock-data/admin";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   Real Unsplash Avatars for premium feel
   ═══════════════════════════════════════════════ */

const realAvatars: Record<string, string> = {
  u1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&q=80",
  u2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&q=80",
  u3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&q=80",
  u4: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&q=80",
  u5: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&q=80",
  u6: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&q=80",
  u7: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face&q=80",
  u8: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face&q=80",
  u9: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face&q=80",
  u10: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face&q=80",
  u11: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face&q=80",
  u12: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=80&h=80&fit=crop&crop=face&q=80",
};

function getAvatar(user: MockUser) {
  return realAvatars[user.id] || user.avatar;
}

/* ═══════════════════════════════════════════════
   Computed Stats
   ═══════════════════════════════════════════════ */

function useUserStats() {
  return useMemo(() => {
    const active = mockUsers.filter((u) => u.status === "active").length;
    const inactive = mockUsers.filter((u) => u.status === "inactive").length;
    const banned = mockUsers.filter((u) => u.status === "banned").length;
    const pro = mockUsers.filter((u) => u.tier === "pro").length;
    const ultimate = mockUsers.filter((u) => u.tier === "ultimate").length;
    const free = mockUsers.filter((u) => u.tier === "free").length;
    const totalAlerts = mockUsers.reduce((s, u) => s + u.alertCount, 0);
    const totalWishlist = mockUsers.reduce((s, u) => s + u.wishlistCount, 0);
    const topUser = [...mockUsers].sort(
      (a, b) => b.alertCount + b.wishlistCount - (a.alertCount + a.wishlistCount)
    )[0];

    return {
      total: mockUsers.length,
      active,
      inactive,
      banned,
      pro,
      ultimate,
      free,
      totalAlerts,
      totalWishlist,
      topUser,
    };
  }, []);
}

/* ═══════════════════════════════════════════════
   Stat Mini-Card
   ═══════════════════════════════════════════════ */

function StatMini({
  icon: Icon,
  label,
  value,
  accent,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
  delay: number;
}) {
  const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    orange: {
      bg: "bg-gaming-orange/[0.03]",
      text: "text-gaming-orange",
      border: "border-gaming-orange/10",
      iconBg: "bg-gaming-orange/[0.08]",
    },
    teal: {
      bg: "bg-gaming-teal/[0.03]",
      text: "text-gaming-teal",
      border: "border-gaming-teal/10",
      iconBg: "bg-gaming-teal/[0.08]",
    },
    purple: {
      bg: "bg-gaming-purple/[0.03]",
      text: "text-gaming-purple",
      border: "border-gaming-purple/10",
      iconBg: "bg-gaming-purple/[0.08]",
    },
    gold: {
      bg: "bg-gaming-gold/[0.03]",
      text: "text-gaming-gold",
      border: "border-gaming-gold/10",
      iconBg: "bg-gaming-gold/[0.08]",
    },
    coral: {
      bg: "bg-gaming-coral/[0.03]",
      text: "text-gaming-coral",
      border: "border-gaming-coral/10",
      iconBg: "bg-gaming-coral/[0.08]",
    },
    blue: {
      bg: "bg-gaming-blue/[0.03]",
      text: "text-gaming-blue",
      border: "border-gaming-blue/10",
      iconBg: "bg-gaming-blue/[0.08]",
    },
    pink: {
      bg: "bg-gaming-pink/[0.03]",
      text: "text-gaming-pink",
      border: "border-gaming-pink/10",
      iconBg: "bg-gaming-pink/[0.08]",
    },
  };

  const c = colorMap[accent] || colorMap.orange;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        "rounded-xl border p-4 backdrop-blur-sm transition-all duration-200",
        c.bg,
        c.border,
        "hover:border-opacity-30"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "size-10 rounded-lg flex items-center justify-center border border-white/[0.04]",
            c.iconBg
          )}
        >
          <Icon className={cn("size-[18px]", c.text)} />
        </div>
        <div>
          <p className="text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25">
            {label}
          </p>
          <p className="text-lg font-heading font-bold text-white/90 tracking-tight mt-0.5">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Top User Hero Card
   ═══════════════════════════════════════════════ */

function TopUserHero({ user }: { user: MockUser }) {
  const engagement = user.alertCount + user.wishlistCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c14]"
    >
      {/* Ambient gradient background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, oklch(0.65 0.15 145 / 8%) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, oklch(0.60 0.18 300 / 6%) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative flex items-center gap-6 p-6">
        {/* Avatar with glow ring */}
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gaming-teal/20 via-gaming-purple/15 to-gaming-orange/20 blur-sm" />
          <Image
            src={getAvatar(user)}
            alt={user.name}
            width={80}
            height={80}
            className="relative size-20 rounded-2xl object-cover ring-2 ring-white/[0.08]"
          />
          <div className="absolute -bottom-1 -right-1 size-6 rounded-lg bg-gaming-gold/15 border border-gaming-gold/25 flex items-center justify-center">
            <Crown className="size-3 text-gaming-gold" />
          </div>
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="size-3.5 text-gaming-gold" />
            <span className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-gaming-gold/70">
              Most Engaged User
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-white/90 truncate">
            {user.name}
          </h3>
          <p className="text-[11px] text-white/30 font-heading mt-0.5">
            {user.email} &middot; Joined{" "}
            {formatDate(user.joinedAt)}
          </p>
        </div>

        {/* Engagement stats */}
        <div className="hidden sm:flex items-center gap-5 shrink-0">
          <div className="text-center">
            <p className="text-[10px] font-heading text-white/25 uppercase tracking-wider">
              Alerts
            </p>
            <p className="text-xl font-heading font-bold text-gaming-orange mt-0.5">
              {user.alertCount}
            </p>
          </div>
          <div className="h-8 w-px bg-white/[0.06]" />
          <div className="text-center">
            <p className="text-[10px] font-heading text-white/25 uppercase tracking-wider">
              Wishlist
            </p>
            <p className="text-xl font-heading font-bold text-gaming-purple mt-0.5">
              {user.wishlistCount}
            </p>
          </div>
          <div className="h-8 w-px bg-white/[0.06]" />
          <div
            className={cn(
              "h-14 px-4 rounded-xl flex flex-col items-center justify-center border",
              "bg-gaming-teal/[0.08] border-gaming-teal/20"
            )}
          >
            <span className="text-lg font-heading font-black text-gaming-teal leading-none">
              {engagement}
            </span>
            <span className="text-[8px] font-heading font-semibold uppercase tracking-wider text-gaming-teal/60 mt-0.5">
              Total
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Tier Distribution Bar (visual mini-chart)
   ═══════════════════════════════════════════════ */

function TierDistribution({
  free,
  pro,
  ultimate,
  total,
}: {
  free: number;
  pro: number;
  ultimate: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-heading font-semibold uppercase tracking-wider text-white/30">
          Subscription Distribution
        </p>
        <TrendingUp className="size-3.5 text-white/15" />
      </div>

      {/* Stacked bar */}
      <div className="h-3 rounded-full overflow-hidden bg-white/[0.03] flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(free / total) * 100}%` }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/10 h-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(pro / total) * 100}%` }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gaming-purple/40 h-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(ultimate / total) * 100}%` }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gaming-gold/40 h-full"
        />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-white/20" />
          <span className="text-[10px] font-heading text-white/30">
            Free ({free})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-gaming-purple/60" />
          <span className="text-[10px] font-heading text-gaming-purple/60">
            Pro ({pro})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-gaming-gold/60" />
          <span className="text-[10px] font-heading text-gaming-gold/60">
            Ultimate ({ultimate})
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Tier Badge
   ═══════════════════════════════════════════════ */

const tierConfig: Record<
  string,
  { bg: string; text: string; border: string; icon?: React.ElementType }
> = {
  free: {
    bg: "bg-white/[0.03]",
    text: "text-white/35",
    border: "border-white/[0.08]",
  },
  pro: {
    bg: "bg-gaming-purple/[0.08]",
    text: "text-gaming-purple",
    border: "border-gaming-purple/20",
    icon: Shield,
  },
  ultimate: {
    bg: "bg-gaming-gold/[0.08]",
    text: "text-gaming-gold",
    border: "border-gaming-gold/20",
    icon: Crown,
  },
};

function TierBadge({ tier }: { tier: string }) {
  const config = tierConfig[tier] || tierConfig.free;
  const TierIcon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 h-[22px] px-2 rounded-full text-[10px] font-heading font-bold border capitalize",
        config.bg,
        config.text,
        config.border
      )}
    >
      {TierIcon && <TierIcon className="size-2.5" />}
      {tier}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   Status Badge
   ═══════════════════════════════════════════════ */

const statusConfig: Record<
  string,
  { bg: string; text: string; border: string; icon: React.ElementType; dot: string }
> = {
  active: {
    bg: "bg-gaming-teal/[0.08]",
    text: "text-gaming-teal",
    border: "border-gaming-teal/20",
    icon: CheckCircle2,
    dot: "bg-gaming-teal",
  },
  inactive: {
    bg: "bg-gaming-gold/[0.06]",
    text: "text-gaming-gold/70",
    border: "border-gaming-gold/15",
    icon: Clock,
    dot: "bg-gaming-gold/60",
  },
  banned: {
    bg: "bg-gaming-pink/[0.08]",
    text: "text-gaming-pink",
    border: "border-gaming-pink/20",
    icon: Ban,
    dot: "bg-gaming-pink",
  },
};

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.active;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-[22px] px-2 rounded-full text-[10px] font-heading font-semibold border capitalize",
        config.bg,
        config.text,
        config.border
      )}
    >
      <span className={cn("size-1.5 rounded-full animate-pulse", config.dot)} />
      {status}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   Activity Bar — visual engagement indicator
   ═══════════════════════════════════════════════ */

function ActivityBar({ alerts, wishlist }: { alerts: number; wishlist: number }) {
  const maxAlerts = 42;
  const maxWishlist = 28;
  const alertPct = Math.min((alerts / maxAlerts) * 100, 100);
  const wishlistPct = Math.min((wishlist / maxWishlist) * 100, 100);

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex flex-col gap-1 w-20">
        <div className="flex items-center justify-between">
          <Bell className="size-2.5 text-gaming-orange/50" />
          <span className="text-[9px] font-heading text-white/25">{alerts}</span>
        </div>
        <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
          <div
            className="h-full rounded-full bg-gaming-orange/40 transition-all duration-500"
            style={{ width: `${alertPct}%` }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-20">
        <div className="flex items-center justify-between">
          <Heart className="size-2.5 text-gaming-purple/50" />
          <span className="text-[9px] font-heading text-white/25">{wishlist}</span>
        </div>
        <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
          <div
            className="h-full rounded-full bg-gaming-purple/40 transition-all duration-500"
            style={{ width: `${wishlistPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Grid User Card
   ═══════════════════════════════════════════════ */

function UserGridCard({ user, index }: { user: MockUser; index: number }) {
  const engagement = user.alertCount + user.wishlistCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "bg-white/[0.02] border border-white/[0.05]",
        "hover:border-white/[0.1] hover:bg-white/[0.03]",
        "transition-all duration-300"
      )}
    >
      {/* Top accent gradient */}
      <div
        className={cn(
          "h-1 w-full",
          user.tier === "ultimate" && "bg-gradient-to-r from-gaming-gold/30 to-gaming-orange/20",
          user.tier === "pro" && "bg-gradient-to-r from-gaming-purple/30 to-gaming-blue/20",
          user.tier === "free" && "bg-gradient-to-r from-white/[0.06] to-white/[0.02]"
        )}
      />

      <div className="p-4">
        {/* Avatar + Status */}
        <div className="flex items-start justify-between mb-3">
          <div className="relative">
            <Image
              src={getAvatar(user)}
              alt={user.name}
              width={48}
              height={48}
              className="size-12 rounded-xl object-cover ring-1 ring-white/[0.08] group-hover:ring-white/[0.15] transition-all"
            />
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-[#0c0c14]",
                statusConfig[user.status]?.dot || "bg-white/20"
              )}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <TierBadge tier={user.tier} />
          </div>
        </div>

        {/* Name + Email */}
        <h4 className="font-heading font-semibold text-[13px] text-white/85 truncate">
          {user.name}
        </h4>
        <p className="text-[10px] text-white/25 font-heading mt-0.5 truncate">
          {user.email}
        </p>

        {/* Engagement stats */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-1">
            <Bell className="size-3 text-gaming-orange/40" />
            <span className="text-[11px] font-heading font-semibold text-white/40">
              {user.alertCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="size-3 text-gaming-purple/40" />
            <span className="text-[11px] font-heading font-semibold text-white/40">
              {user.wishlistCount}
            </span>
          </div>
          <div className="ml-auto">
            <span
              className={cn(
                "text-[10px] font-heading font-bold px-1.5 py-0.5 rounded",
                engagement >= 40
                  ? "text-gaming-gold bg-gaming-gold/[0.08]"
                  : engagement >= 20
                    ? "text-gaming-teal bg-gaming-teal/[0.06]"
                    : "text-white/25 bg-white/[0.03]"
              )}
            >
              {engagement} pts
            </span>
          </div>
        </div>

        {/* Join date + Last active */}
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[9px] font-heading text-white/15">
            Joined {formatDate(user.joinedAt)}
          </span>
          <StatusBadge status={user.status} />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   View Mode & Sort Types
   ═══════════════════════════════════════════════ */

type ViewMode = "table" | "grid";
type SortOption = "name" | "tier" | "alertCount" | "wishlistCount" | "joinedAt" | "lastActiveAt";

/* ═══════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════ */

export default function AdminUsersPage() {
  const stats = useUserStats();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [sortBy, setSortBy] = useState<SortOption>("alertCount");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const pageSize = viewMode === "grid" ? 12 : 10;

  // Filter + Sort
  const processed = useMemo(() => {
    let result = [...mockUsers];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    if (tierFilter !== "all") {
      result = result.filter((u) => u.tier === tierFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((u) => u.status === statusFilter);
    }

    result.sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;
      switch (sortBy) {
        case "alertCount":
          aVal = a.alertCount;
          bVal = b.alertCount;
          break;
        case "wishlistCount":
          aVal = a.wishlistCount;
          bVal = b.wishlistCount;
          break;
        case "tier":
          const tierOrder = { free: 0, pro: 1, ultimate: 2 };
          aVal = tierOrder[a.tier as keyof typeof tierOrder] ?? 0;
          bVal = tierOrder[b.tier as keyof typeof tierOrder] ?? 0;
          break;
        case "joinedAt":
          aVal = new Date(a.joinedAt).getTime();
          bVal = new Date(b.joinedAt).getTime();
          break;
        case "lastActiveAt":
          aVal = new Date(a.lastActiveAt).getTime();
          bVal = new Date(b.lastActiveAt).getTime();
          break;
        default:
          aVal = a.name;
          bVal = b.name;
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return result;
  }, [search, sortBy, sortDir, tierFilter, statusFilter]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const paged = processed.slice(page * pageSize, (page + 1) * pageSize);

  function toggleSort(key: SortOption) {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("desc");
    }
    setPage(0);
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-to-br from-gaming-purple/15 to-gaming-blue/10 border border-gaming-purple/15 flex items-center justify-center">
              <Users className="size-4.5 text-gaming-purple" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-white/90 tracking-tight">
                Users Management
              </h1>
              <p className="text-[11px] text-white/25 font-heading mt-0.5">
                {mockUsers.length} registered users &middot; {stats.active} active
              </p>
            </div>
          </div>
        </div>
        <GamingButton variant="primary" size="sm">
          <UserPlus className="size-4" />
          Add User
        </GamingButton>
      </motion.div>

      {/* ── Bento Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatMini icon={Users} label="Total Users" value={String(stats.total)} accent="purple" delay={0} />
        <StatMini icon={Activity} label="Active" value={String(stats.active)} accent="teal" delay={0.05} />
        <StatMini icon={Crown} label="Ultimate" value={String(stats.ultimate)} accent="gold" delay={0.1} />
        <StatMini icon={Shield} label="Pro" value={String(stats.pro)} accent="blue" delay={0.15} />
        <StatMini icon={Bell} label="Total Alerts" value={String(stats.totalAlerts)} accent="orange" delay={0.2} />
        <StatMini icon={Heart} label="Wishlisted" value={String(stats.totalWishlist)} accent="coral" delay={0.25} />
      </div>

      {/* ── Hero + Distribution Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TopUserHero user={stats.topUser} />
        </div>
        <TierDistribution
          free={stats.free}
          pro={stats.pro}
          ultimate={stats.ultimate}
          total={stats.total}
        />
      </div>

      {/* ── Toolbar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2.5 flex-1 w-full sm:w-auto flex-wrap">
          {/* Search */}
          <div
            className={cn(
              "flex items-center gap-2.5 flex-1 min-w-[200px] max-w-sm",
              "h-9 pl-3.5 pr-2 rounded-lg",
              "bg-white/[0.03] border border-white/[0.06]",
              "focus-within:border-white/[0.12] focus-within:bg-white/[0.04]",
              "transition-all duration-200"
            )}
          >
            <Search className="size-3.5 shrink-0 text-white/20" />
            <input
              placeholder="Search users or emails..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="flex-1 bg-transparent text-xs font-heading text-white/80 placeholder:text-white/20 outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(0);
                }}
                className="text-[10px] text-white/20 hover:text-white/40 font-heading px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tier filter */}
          <div className="flex items-center gap-1">
            <Filter className="size-3.5 text-white/15 mr-1" />
            {["all", "free", "pro", "ultimate"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTierFilter(t);
                  setPage(0);
                }}
                className={cn(
                  "h-7 px-2.5 rounded-lg text-[10px] font-heading font-semibold capitalize",
                  "border transition-all duration-200",
                  tierFilter === t
                    ? t === "ultimate"
                      ? "bg-gaming-gold/[0.1] text-gaming-gold border-gaming-gold/20"
                      : t === "pro"
                        ? "bg-gaming-purple/[0.1] text-gaming-purple border-gaming-purple/20"
                        : "bg-gaming-orange/[0.1] text-gaming-orange border-gaming-orange/20"
                    : "bg-white/[0.02] text-white/25 border-white/[0.05] hover:text-white/40 hover:border-white/[0.08]"
                )}
              >
                {t === "all" ? "All Tiers" : t}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1">
            {["all", "active", "inactive", "banned"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatusFilter(s);
                  setPage(0);
                }}
                className={cn(
                  "h-7 px-2.5 rounded-lg text-[10px] font-heading font-semibold capitalize",
                  "border transition-all duration-200",
                  statusFilter === s
                    ? s === "banned"
                      ? "bg-gaming-pink/[0.1] text-gaming-pink border-gaming-pink/20"
                      : s === "inactive"
                        ? "bg-gaming-gold/[0.08] text-gaming-gold/70 border-gaming-gold/15"
                        : "bg-gaming-teal/[0.1] text-gaming-teal border-gaming-teal/20"
                    : "bg-white/[0.02] text-white/25 border-white/[0.05] hover:text-white/40 hover:border-white/[0.08]"
                )}
              >
                {s === "all" ? "All Status" : s}
              </button>
            ))}
          </div>
        </div>

        {/* View + Sort controls */}
        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="flex items-center gap-1 mr-2">
            <ArrowUpDown className="size-3 text-white/15" />
            {(
              [
                { key: "alertCount", label: "Alerts" },
                { key: "wishlistCount", label: "Wishlist" },
                { key: "joinedAt", label: "Joined" },
                { key: "name", label: "Name" },
              ] as { key: SortOption; label: string }[]
            ).map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => toggleSort(s.key)}
                className={cn(
                  "h-7 px-2 rounded-lg text-[10px] font-heading font-semibold",
                  "border transition-all duration-200",
                  sortBy === s.key
                    ? "bg-gaming-purple/[0.1] text-gaming-purple border-gaming-purple/20"
                    : "bg-white/[0.02] text-white/25 border-white/[0.05] hover:text-white/40"
                )}
              >
                {s.label}
                {sortBy === s.key && (
                  <span className="ml-1 text-[9px]">
                    {sortDir === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex rounded-lg overflow-hidden border border-white/[0.06]">
            <button
              type="button"
              onClick={() => {
                setViewMode("table");
                setPage(0);
              }}
              className={cn(
                "size-8 flex items-center justify-center transition-colors",
                viewMode === "table"
                  ? "bg-white/[0.08] text-white/70"
                  : "bg-white/[0.02] text-white/20 hover:text-white/40"
              )}
              aria-label="Table view"
            >
              <List className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("grid");
                setPage(0);
              }}
              className={cn(
                "size-8 flex items-center justify-center transition-colors border-l border-white/[0.06]",
                viewMode === "grid"
                  ? "bg-white/[0.08] text-white/70"
                  : "bg-white/[0.02] text-white/20 hover:text-white/40"
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Results count ── */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-heading text-white/20">
          Showing{" "}
          <span className="text-white/40 font-semibold">
            {processed.length}
          </span>{" "}
          {processed.length === 1 ? "user" : "users"}
          {search && (
            <>
              {" "}
              for &ldquo;
              <span className="text-gaming-purple/70">{search}</span>&rdquo;
            </>
          )}
        </p>
      </div>

      {/* ── Content: Table or Grid ── */}
      <AnimatePresence mode="wait">
        {viewMode === "table" ? (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.01] backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        User
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        <button
                          onClick={() => toggleSort("tier")}
                          className="flex items-center gap-1 hover:text-white/50 transition-colors"
                        >
                          Tier
                          {sortBy === "tier" && (
                            <span className="text-gaming-purple text-[11px]">
                              {sortDir === "asc" ? "\u2191" : "\u2193"}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        Status
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        Engagement
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        <button
                          onClick={() => toggleSort("joinedAt")}
                          className="flex items-center gap-1 hover:text-white/50 transition-colors"
                        >
                          Joined
                          {sortBy === "joinedAt" && (
                            <span className="text-gaming-purple text-[11px]">
                              {sortDir === "asc" ? "\u2191" : "\u2193"}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        <button
                          onClick={() => toggleSort("lastActiveAt")}
                          className="flex items-center gap-1 hover:text-white/50 transition-colors"
                        >
                          Last Active
                          {sortBy === "lastActiveAt" && (
                            <span className="text-gaming-purple text-[11px]">
                              {sortDir === "asc" ? "\u2191" : "\u2193"}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="text-right text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paged.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center">
                          <Users className="size-8 text-white/10 mx-auto mb-2" />
                          <p className="text-sm text-white/25 font-heading">
                            No users found
                          </p>
                        </td>
                      </tr>
                    ) : (
                      paged.map((user, i) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.025 }}
                          className="border-b border-white/[0.03] last:border-b-0 hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* User */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Image
                                  src={getAvatar(user)}
                                  alt={user.name}
                                  width={40}
                                  height={40}
                                  className="size-10 rounded-xl object-cover ring-1 ring-white/[0.06] group-hover:ring-white/[0.12] transition-all"
                                />
                                <span
                                  className={cn(
                                    "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-[#0c0c14]",
                                    statusConfig[user.status]?.dot || "bg-white/20"
                                  )}
                                />
                              </div>
                              <div>
                                <p className="font-heading font-semibold text-[13px] text-white/80 group-hover:text-white/95 transition-colors">
                                  {user.name}
                                </p>
                                <p className="text-[10px] text-white/25 font-heading flex items-center gap-1">
                                  <Mail className="size-2.5" />
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* Tier */}
                          <td className="px-4 py-3">
                            <TierBadge tier={user.tier} />
                          </td>
                          {/* Status */}
                          <td className="px-4 py-3">
                            <StatusBadge status={user.status} />
                          </td>
                          {/* Engagement bars */}
                          <td className="px-4 py-3">
                            <ActivityBar
                              alerts={user.alertCount}
                              wishlist={user.wishlistCount}
                            />
                          </td>
                          {/* Joined */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="size-3 text-white/15" />
                              <span className="text-[12px] font-heading text-white/35">
                                {formatDate(user.joinedAt)}
                              </span>
                            </div>
                          </td>
                          {/* Last Active */}
                          <td className="px-4 py-3">
                            <span className="text-[12px] font-heading text-white/35">
                              {formatDate(user.lastActiveAt)}
                            </span>
                          </td>
                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                className={cn(
                                  "size-7 flex items-center justify-center rounded-lg",
                                  "bg-white/[0.02] border border-white/[0.05]",
                                  "hover:bg-white/[0.06] hover:border-white/[0.1]",
                                  "text-white/20 hover:text-white/60",
                                  "transition-all duration-200",
                                  "opacity-0 group-hover:opacity-100"
                                )}
                                aria-label="View user"
                              >
                                <Eye className="size-3" />
                              </button>
                              <button
                                type="button"
                                className={cn(
                                  "size-7 flex items-center justify-center rounded-lg",
                                  "bg-white/[0.02] border border-white/[0.05]",
                                  "hover:bg-white/[0.06] hover:border-white/[0.1]",
                                  "text-white/20 hover:text-white/60",
                                  "transition-all duration-200",
                                  "opacity-0 group-hover:opacity-100"
                                )}
                                aria-label="More actions"
                              >
                                <MoreHorizontal className="size-3" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {paged.length === 0 ? (
              <div className="col-span-full py-16 text-center">
                <Users className="size-8 text-white/10 mx-auto mb-2" />
                <p className="text-sm text-white/25 font-heading">
                  No users found
                </p>
              </div>
            ) : (
              paged.map((user, i) => (
                <UserGridCard key={user.id} user={user} index={i} />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between"
        >
          <p className="text-[11px] font-heading text-white/20">
            Showing{" "}
            <span className="text-white/40 font-semibold">
              {page * pageSize + 1}&ndash;
              {Math.min((page + 1) * pageSize, processed.length)}
            </span>{" "}
            of{" "}
            <span className="text-white/40 font-semibold">
              {processed.length}
            </span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className={cn(
                "size-8 flex items-center justify-center rounded-lg",
                "bg-white/[0.03] border border-white/[0.06]",
                "text-white/30 hover:text-white/60 hover:bg-white/[0.06]",
                "transition-all duration-200",
                "disabled:opacity-30 disabled:cursor-not-allowed"
              )}
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="size-3.5" />
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pageNum =
                totalPages <= 5
                  ? i
                  : Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "size-8 flex items-center justify-center rounded-lg text-[11px] font-heading font-semibold",
                    "transition-all duration-200",
                    page === pageNum
                      ? "bg-gaming-purple/[0.12] text-gaming-purple border border-gaming-purple/20"
                      : "bg-white/[0.03] text-white/25 border border-white/[0.06] hover:text-white/50"
                  )}
                >
                  {pageNum + 1}
                </button>
              );
            })}

            <button
              type="button"
              className={cn(
                "size-8 flex items-center justify-center rounded-lg",
                "bg-white/[0.03] border border-white/[0.06]",
                "text-white/30 hover:text-white/60 hover:bg-white/[0.06]",
                "transition-all duration-200",
                "disabled:opacity-30 disabled:cursor-not-allowed"
              )}
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
