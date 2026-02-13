"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Tag,
  Plus,
  TrendingUp,
  TrendingDown,
  Flame,
  Crown,
  Zap,
  Star,
  Clock,
  ArrowUpRight,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  DollarSign,
  Target,
  ShoppingBag,
  Filter,
  SlidersHorizontal,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { GamingButton } from "@/components/gaming";
import { GradientText } from "@/components/shared/gradient-text";
import { formatPrice } from "@/lib/formatters";
import { mockDeals } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Deal, DealTag, Recommendation } from "@/lib/types";

/* ─── Animation Variants ─────────────────────────────────────── */

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
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

const fadeInScale = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 26 },
  },
};

/* ─── Tag + Recommendation Color Maps ────────────────────────── */

const tagColorMap: Record<string, string> = {
  "Flash Sale":
    "bg-gaming-coral/[0.12] text-gaming-coral border-gaming-coral/25",
  "Historical Low":
    "bg-gaming-teal/[0.12] text-gaming-teal border-gaming-teal/25",
  "Bundle Deal":
    "bg-gaming-purple/[0.12] text-gaming-purple border-gaming-purple/25",
  "New Release":
    "bg-gaming-blue/[0.12] text-gaming-blue border-gaming-blue/25",
  "Editor's Pick":
    "bg-gaming-gold/[0.12] text-gaming-gold border-gaming-gold/25",
  Trending:
    "bg-gaming-orange/[0.12] text-gaming-orange border-gaming-orange/25",
  "Limited Time":
    "bg-gaming-pink/[0.12] text-gaming-pink border-gaming-pink/25",
};

const tagIconMap: Record<string, typeof Flame> = {
  "Flash Sale": Zap,
  "Historical Low": TrendingDown,
  "Bundle Deal": ShoppingBag,
  "New Release": Sparkles,
  "Editor's Pick": Crown,
  Trending: Flame,
  "Limited Time": Clock,
};

const recommendationConfig: Record<
  Recommendation,
  { label: string; bg: string; text: string; glow: string }
> = {
  "strong-buy": {
    label: "Strong Buy",
    bg: "bg-gaming-teal/[0.15]",
    text: "text-gaming-teal",
    glow: "shadow-gaming-teal/10",
  },
  buy: {
    label: "Buy",
    bg: "bg-gaming-blue/[0.15]",
    text: "text-gaming-blue",
    glow: "shadow-gaming-blue/10",
  },
  wait: {
    label: "Wait",
    bg: "bg-gaming-gold/[0.15]",
    text: "text-gaming-gold",
    glow: "shadow-gaming-gold/10",
  },
  avoid: {
    label: "Avoid",
    bg: "bg-gaming-pink/[0.15]",
    text: "text-gaming-pink",
    glow: "shadow-gaming-pink/10",
  },
};

/* ─── Deal Score Ring Component ──────────────────────────────── */

function DealScoreRing({
  score,
  size = 44,
  strokeWidth = 3,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color =
    score >= 90
      ? "#FFD700"
      : score >= 75
        ? "#00D4AA"
        : score >= 50
          ? "#F5A623"
          : "#FF3366";

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
      <span
        className="absolute inset-0 flex items-center justify-center font-heading font-bold text-[11px]"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

/* ─── Large Score Ring for Hero ───────────────────────────────── */

function HeroScoreRing({ score }: { score: number }) {
  const size = 80;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

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
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FFD700"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          style={{
            filter: "drop-shadow(0 0 6px rgba(255,215,0,0.4))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-heading font-bold text-xl text-gaming-gold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 20 }}
        >
          {score}
        </motion.span>
        <span className="text-[8px] font-heading text-gaming-gold/60 uppercase tracking-widest">
          Score
        </span>
      </div>
    </div>
  );
}

/* ─── Bento Stat Card ────────────────────────────────────────── */

function BentoStat({
  label,
  value,
  subtext,
  icon: Icon,
  accentColor,
  accentGlow,
  className,
}: {
  label: string;
  value: string;
  subtext?: string;
  icon: typeof Tag;
  accentColor: string;
  accentGlow: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.06] p-5",
        "bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent",
        "backdrop-blur-sm group cursor-default",
        className
      )}
    >
      {/* Ambient glow */}
      <div
        className={cn(
          "absolute -top-12 -right-12 size-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          accentGlow
        )}
      />

      {/* Top accent line */}
      <div
        className={cn(
          "absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-60",
          accentColor
        )}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-heading font-semibold uppercase tracking-[0.15em] text-white/30">
            {label}
          </p>
          <p className="text-2xl font-heading font-bold text-white/90 tracking-tight">
            {value}
          </p>
          {subtext && (
            <p className="text-[11px] font-heading text-white/30">{subtext}</p>
          )}
        </div>
        <div
          className={cn(
            "size-10 rounded-xl flex items-center justify-center border border-white/[0.06]",
            "bg-white/[0.03]"
          )}
        >
          <Icon className={cn("size-[18px]", accentColor.replace("bg-", "text-"))} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Category Breakdown Card ────────────────────────────────── */

function CategoryCard({
  tag,
  deals,
  delay,
}: {
  tag: DealTag;
  deals: Deal[];
  delay: number;
}) {
  const Icon = tagIconMap[tag] ?? Tag;
  const count = deals.length;
  const avgDiscount = Math.round(
    deals.reduce((s, d) => s + d.discount, 0) / count
  );
  const avgScore = Math.round(
    deals.reduce((s, d) => s + d.dealScore, 0) / count
  );
  const totalSavings = deals.reduce(
    (s, d) => s + (d.originalPrice - d.currentPrice),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 240,
        damping: 24,
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.06] p-5",
        "bg-gradient-to-br from-white/[0.03] to-transparent",
        "group cursor-pointer transition-[border-color,box-shadow] duration-300",
        "hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/20"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "size-9 rounded-xl flex items-center justify-center border",
            tagColorMap[tag] ?? "bg-white/[0.04] border-white/[0.06]"
          )}
        >
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-sm font-heading font-semibold text-white/80">
            {tag}
          </p>
          <p className="text-[10px] font-heading text-white/25">
            {count} deal{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-[9px] font-heading uppercase tracking-wider text-white/20">
            Avg Off
          </p>
          <p className="text-base font-heading font-bold text-gaming-coral mt-0.5">
            -{avgDiscount}%
          </p>
        </div>
        <div>
          <p className="text-[9px] font-heading uppercase tracking-wider text-white/20">
            Avg Score
          </p>
          <p className="text-base font-heading font-bold text-gaming-teal mt-0.5">
            {avgScore}
          </p>
        </div>
        <div>
          <p className="text-[9px] font-heading uppercase tracking-wider text-white/20">
            Savings
          </p>
          <p className="text-base font-heading font-bold text-gaming-gold mt-0.5">
            ${totalSavings.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Bottom bar hover animation */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}

/* ─── Hero Featured Deal Card ────────────────────────────────── */

function HeroDealCard({ deal }: { deal: Deal }) {
  const rec = recommendationConfig[deal.recommendation];

  return (
    <motion.div
      variants={fadeInScale}
      whileHover={{ y: -2 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gaming-gold/20",
        "bg-gradient-to-br from-gaming-gold/[0.04] via-white/[0.02] to-transparent",
        "group"
      )}
    >
      {/* Ambient golden glow */}
      <div className="absolute -top-20 -right-20 size-60 rounded-full bg-gaming-gold/[0.06] blur-3xl" />
      <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-gaming-orange/[0.04] blur-3xl" />

      <div className="relative flex flex-col sm:flex-row gap-5 p-5">
        {/* Cover Image */}
        <div className="relative shrink-0 overflow-hidden rounded-xl w-full sm:w-[220px] h-[120px] sm:h-auto">
          <Image
            src={deal.coverImage}
            alt={deal.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Legendary overlay shimmer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gaming-gold/20 backdrop-blur-md border border-gaming-gold/30">
            <Crown className="size-3 text-gaming-gold" />
            <span className="text-[10px] font-heading font-bold text-gaming-gold">
              TOP DEAL
            </span>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-gaming-coral/90 backdrop-blur-sm">
            <span className="text-[12px] font-heading font-bold text-white">
              -{deal.discount}%
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between min-w-0 gap-3">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-heading font-bold text-white/90 tracking-tight line-clamp-1">
                  {deal.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 h-5 px-2 rounded-full text-[10px] font-heading font-semibold border",
                      rec.bg,
                      rec.text,
                      `border-${rec.text.replace("text-", "")}/20`
                    )}
                  >
                    {rec.label}
                  </span>
                  {deal.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "inline-flex items-center h-5 px-1.5 rounded-full text-[10px] font-heading font-semibold border",
                        tagColorMap[tag] ??
                          "bg-white/[0.03] text-white/30 border-white/[0.06]"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <HeroScoreRing score={deal.dealScore} />
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-heading font-bold text-gaming-teal">
                {formatPrice(deal.currentPrice)}
              </span>
              <span className="text-sm font-heading text-white/20 line-through">
                {formatPrice(deal.originalPrice)}
              </span>
              <span className="text-xs font-heading text-gaming-teal/60">
                Save {formatPrice(deal.originalPrice - deal.currentPrice)}
              </span>
            </div>
            <GamingButton variant="legendary" size="sm">
              <ExternalLink className="size-3.5" />
              View Deal
            </GamingButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Deal Table Row ─────────────────────────────────────────── */

function DealRow({ deal, index }: { deal: Deal; index: number }) {
  const rec = recommendationConfig[deal.recommendation];

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 300, damping: 30 }}
      className="border-b border-white/[0.03] last:border-b-0 group/row hover:bg-white/[0.02] transition-colors duration-200"
    >
      {/* Deal */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded-lg overflow-hidden ring-1 ring-white/[0.06] shrink-0">
            <Image
              src={deal.coverImage}
              alt={deal.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-heading font-semibold text-[13px] text-white/80 truncate max-w-[200px]">
              {deal.title}
            </p>
            <p className="text-[10px] text-white/25 capitalize font-heading">
              {deal.platform}
            </p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-gaming-teal text-[13px]">
            {formatPrice(deal.currentPrice)}
          </span>
          <span className="text-[11px] text-white/20 line-through font-heading">
            {formatPrice(deal.originalPrice)}
          </span>
        </div>
      </td>

      {/* Discount */}
      <td className="px-4 py-3">
        <span className="font-heading font-bold text-gaming-coral text-[13px]">
          -{deal.discount}%
        </span>
      </td>

      {/* Score */}
      <td className="px-4 py-3">
        <DealScoreRing score={deal.dealScore} />
      </td>

      {/* Recommendation */}
      <td className="px-4 py-3">
        <span
          className={cn(
            "inline-flex items-center h-5 px-2 rounded-full text-[10px] font-heading font-semibold border",
            rec.bg,
            rec.text,
            `border-current/20`
          )}
        >
          {rec.label}
        </span>
      </td>

      {/* Tags */}
      <td className="px-4 py-3">
        <div className="flex gap-1 flex-wrap max-w-[200px]">
          {deal.tags.slice(0, 2).map((tag) => {
            const TagIcon = tagIconMap[tag];
            return (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center gap-1 h-5 px-1.5 rounded-full text-[10px] font-heading font-semibold border",
                  tagColorMap[tag] ??
                    "bg-white/[0.03] text-white/30 border-white/[0.06]"
                )}
              >
                {TagIcon && <TagIcon className="size-2.5" />}
                {tag}
              </span>
            );
          })}
        </div>
      </td>

      {/* Action */}
      <td className="px-4 py-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="size-7 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/[0.12] transition-colors"
        >
          <ArrowUpRight className="size-3.5" />
        </motion.button>
      </td>
    </motion.tr>
  );
}

/* ─── Filter Pill ────────────────────────────────────────────── */

function FilterPill({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-heading font-semibold border transition-all duration-200",
        active
          ? "bg-gaming-orange/[0.12] text-gaming-orange border-gaming-orange/25"
          : "bg-white/[0.02] text-white/35 border-white/[0.06] hover:text-white/50 hover:border-white/[0.10]"
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "text-[9px] px-1.5 py-0.5 rounded-full font-bold",
            active
              ? "bg-gaming-orange/20 text-gaming-orange"
              : "bg-white/[0.04] text-white/25"
          )}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}

/* ─── Discount Distribution Mini-Bar ─────────────────────────── */

function DiscountDistribution({ deals }: { deals: Deal[] }) {
  const buckets = [
    { label: "70%+", min: 70, max: 100, color: "bg-gaming-coral" },
    { label: "50-69%", min: 50, max: 69, color: "bg-gaming-orange" },
    { label: "30-49%", min: 30, max: 49, color: "bg-gaming-gold" },
    { label: "<30%", min: 0, max: 29, color: "bg-gaming-blue" },
  ];

  const max = Math.max(
    ...buckets.map((b) => deals.filter((d) => d.discount >= b.min && d.discount <= b.max).length)
  );

  return (
    <div className="space-y-2.5">
      {buckets.map((b) => {
        const count = deals.filter(
          (d) => d.discount >= b.min && d.discount <= b.max
        ).length;
        const pct = max > 0 ? (count / max) * 100 : 0;

        return (
          <div key={b.label} className="flex items-center gap-3">
            <span className="text-[10px] font-heading text-white/30 w-12 text-right tabular-nums">
              {b.label}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", b.color)}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              />
            </div>
            <span className="text-[10px] font-heading text-white/40 w-5 tabular-nums">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ═══ MAIN PAGE COMPONENT ════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════ */

type FilterTag = "All" | DealTag;

export default function AdminDealsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const pageSize = 8;

  // Compute stats
  const totalDeals = mockDeals.length;
  const avgScore = Math.round(
    mockDeals.reduce((s, d) => s + d.dealScore, 0) / totalDeals
  );
  const totalSavings = mockDeals.reduce(
    (s, d) => s + (d.originalPrice - d.currentPrice),
    0
  );
  const strongBuys = mockDeals.filter(
    (d) => d.recommendation === "strong-buy"
  ).length;

  // Hero deal = highest score
  const heroDeal = [...mockDeals].sort((a, b) => b.dealScore - a.dealScore)[0];

  // Category groupings
  const categories = useMemo(() => {
    const cats: Record<DealTag, Deal[]> = {
      "Flash Sale": [],
      "Historical Low": [],
      "Bundle Deal": [],
      "New Release": [],
      "Editor's Pick": [],
      Trending: [],
      "Limited Time": [],
    };
    for (const d of mockDeals) {
      for (const t of d.tags) {
        if (cats[t]) cats[t].push(d);
      }
    }
    return Object.entries(cats).filter(
      ([, deals]) => deals.length > 0
    ) as [DealTag, Deal[]][];
  }, []);

  // Filter pills
  const filterTags: { label: FilterTag; count: number }[] = useMemo(() => {
    const tags: { label: FilterTag; count: number }[] = [
      { label: "All", count: totalDeals },
    ];
    for (const [tag, deals] of categories) {
      tags.push({ label: tag, count: deals.length });
    }
    return tags;
  }, [categories, totalDeals]);

  // Filtered + sorted deals for table
  const filteredDeals = useMemo(() => {
    let deals = [...mockDeals];

    // Tag filter
    if (activeFilter !== "All") {
      deals = deals.filter((d) => d.tags.includes(activeFilter as DealTag));
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      deals = deals.filter((d) => d.title.toLowerCase().includes(q));
    }

    // Sort
    if (sortKey) {
      deals.sort((a, b) => {
        const aVal = (a as unknown as Record<string, unknown>)[sortKey];
        const bVal = (b as unknown as Record<string, unknown>)[sortKey];
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }
        return 0;
      });
    }

    return deals;
  }, [activeFilter, search, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredDeals.length / pageSize);
  const pagedDeals = filteredDeals.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div className="space-y-8">
      {/* ─── Page Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
        className="flex items-start justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-gaming-orange/20 to-gaming-coral/10 border border-gaming-orange/20 flex items-center justify-center">
              <Tag className="size-5 text-gaming-orange" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold tracking-tight">
                <GradientText variant="primary">Deals</GradientText>{" "}
                <span className="text-white/80">Management</span>
              </h1>
              <p className="text-[12px] text-white/30 font-heading mt-0.5">
                {totalDeals} active deals across all stores
              </p>
            </div>
          </div>
        </div>
        <GamingButton variant="primary" size="sm">
          <Plus className="size-4" />
          Create Deal
        </GamingButton>
      </motion.div>

      {/* ─── Bento KPI Grid ─────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <BentoStat
          label="Total Deals"
          value={totalDeals.toLocaleString()}
          subtext="+12 this week"
          icon={Tag}
          accentColor="bg-gaming-orange"
          accentGlow="bg-gaming-orange/20"
        />
        <BentoStat
          label="Avg. Deal Score"
          value={avgScore.toString()}
          subtext="Out of 100"
          icon={Target}
          accentColor="bg-gaming-teal"
          accentGlow="bg-gaming-teal/20"
        />
        <BentoStat
          label="Total Savings"
          value={`$${totalSavings.toFixed(0)}`}
          subtext="Across all deals"
          icon={DollarSign}
          accentColor="bg-gaming-gold"
          accentGlow="bg-gaming-gold/20"
        />
        <BentoStat
          label="Strong Buys"
          value={strongBuys.toString()}
          subtext={`${Math.round((strongBuys / totalDeals) * 100)}% of total`}
          icon={TrendingUp}
          accentColor="bg-gaming-coral"
          accentGlow="bg-gaming-coral/20"
        />
      </motion.div>

      {/* ─── Hero Deal + Discount Distribution Bento Row ─────── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Hero deal — spans 2 cols */}
        <div className="lg:col-span-2">
          <HeroDealCard deal={heroDeal} />
        </div>

        {/* Discount distribution card */}
        <motion.div
          variants={slideInRight}
          className="rounded-2xl border border-white/[0.06] p-5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent"
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="size-4 text-gaming-purple" />
            <h3 className="text-sm font-heading font-semibold text-white/70">
              Discount Distribution
            </h3>
          </div>
          <DiscountDistribution deals={mockDeals} />

          {/* Recommendation breakdown */}
          <div className="mt-5 pt-4 border-t border-white/[0.04]">
            <p className="text-[10px] font-heading uppercase tracking-wider text-white/20 mb-3">
              Recommendations
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(
                ["strong-buy", "buy", "wait", "avoid"] as Recommendation[]
              ).map((r) => {
                const cfg = recommendationConfig[r];
                const count = mockDeals.filter(
                  (d) => d.recommendation === r
                ).length;
                return (
                  <div
                    key={r}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                  >
                    <div
                      className={cn(
                        "size-2 rounded-full",
                        cfg.bg.replace("/[0.15]", "")
                      )}
                      style={{
                        backgroundColor:
                          r === "strong-buy"
                            ? "#00D4AA"
                            : r === "buy"
                              ? "#0EA5E9"
                              : r === "wait"
                                ? "#FFD700"
                                : "#FF3366",
                      }}
                    />
                    <span className="text-[10px] font-heading text-white/40">
                      {cfg.label}
                    </span>
                    <span className="text-[11px] font-heading font-bold text-white/60 ml-auto tabular-nums">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Category Bento Cards ───────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="size-4 text-white/25" />
          <h2 className="text-sm font-heading font-semibold text-white/50">
            Deal Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {categories.map(([tag, deals], i) => (
            <CategoryCard key={tag} tag={tag} deals={deals} delay={0.1 + i * 0.05} />
          ))}
        </div>
      </div>

      {/* ─── All Deals Table ────────────────────────────────────── */}
      <div>
        {/* Table Header */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="size-4 text-gaming-orange/60" />
          <h2 className="text-sm font-heading font-semibold text-white/50">
            All Deals
          </h2>
        </div>

        {/* Filter Pills + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {filterTags.map(({ label, count }) => (
              <FilterPill
                key={label}
                label={label}
                count={count}
                active={activeFilter === label}
                onClick={() => {
                  setActiveFilter(label);
                  setPage(0);
                }}
              />
            ))}
          </div>
          <div
            className={cn(
              "flex items-center gap-2.5 max-w-xs",
              "h-9 pl-3.5 pr-2 rounded-xl",
              "bg-white/[0.03] border border-white/[0.06]",
              "focus-within:border-gaming-orange/30 focus-within:bg-white/[0.04]",
              "transition-all duration-200"
            )}
          >
            <Search className="size-3.5 shrink-0 text-white/20" />
            <input
              placeholder="Search deals..."
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
                onClick={() => setSearch("")}
                className="text-[10px] text-white/20 hover:text-white/40 font-heading px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3.5 whitespace-nowrap">
                    Deal
                  </th>
                  <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3.5 whitespace-nowrap">
                    <button
                      onClick={() => handleSort("currentPrice")}
                      className="flex items-center gap-1.5 hover:text-white/50 transition-colors"
                    >
                      Price
                      {sortKey === "currentPrice" && (
                        <span className="text-gaming-orange text-[11px]">
                          {sortDir === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3.5 whitespace-nowrap">
                    <button
                      onClick={() => handleSort("discount")}
                      className="flex items-center gap-1.5 hover:text-white/50 transition-colors"
                    >
                      Discount
                      {sortKey === "discount" && (
                        <span className="text-gaming-orange text-[11px]">
                          {sortDir === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3.5 whitespace-nowrap">
                    <button
                      onClick={() => handleSort("dealScore")}
                      className="flex items-center gap-1.5 hover:text-white/50 transition-colors"
                    >
                      Score
                      {sortKey === "dealScore" && (
                        <span className="text-gaming-orange text-[11px]">
                          {sortDir === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3.5 whitespace-nowrap">
                    Rec.
                  </th>
                  <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3.5 whitespace-nowrap">
                    Tags
                  </th>
                  <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3.5 whitespace-nowrap w-12">
                    {/* action */}
                  </th>
                </tr>
              </thead>
              <AnimatePresence mode="popLayout">
                <tbody>
                  {pagedDeals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Search className="size-8 text-white/10" />
                          <p className="text-sm text-white/25 font-heading">
                            No deals match your filters
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setSearch("");
                              setActiveFilter("All");
                            }}
                            className="text-xs text-gaming-orange/60 hover:text-gaming-orange font-heading transition-colors"
                          >
                            Clear all filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    pagedDeals.map((deal, i) => (
                      <DealRow key={deal.id} deal={deal} index={i} />
                    ))
                  )}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mt-4"
          >
            <p className="text-[11px] font-heading text-white/20">
              Showing{" "}
              <span className="text-white/40 font-semibold">
                {page * pageSize + 1}–
                {Math.min((page + 1) * pageSize, filteredDeals.length)}
              </span>{" "}
              of{" "}
              <span className="text-white/40 font-semibold">
                {filteredDeals.length}
              </span>{" "}
              deals
            </p>
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={cn(
                  "size-8 flex items-center justify-center rounded-lg",
                  "bg-white/[0.03] border border-white/[0.06]",
                  "text-white/30 hover:text-white/60 hover:bg-white/[0.06] hover:border-white/[0.10]",
                  "transition-all duration-200",
                  "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.03]"
                )}
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="size-3.5" />
              </motion.button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
                <motion.button
                  key={p}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={() => setPage(p)}
                  className={cn(
                    "size-8 flex items-center justify-center rounded-lg text-[11px] font-heading font-semibold",
                    "transition-all duration-200",
                    p === page
                      ? "bg-gaming-orange/[0.15] text-gaming-orange border border-gaming-orange/25"
                      : "bg-white/[0.02] text-white/25 border border-transparent hover:text-white/50 hover:bg-white/[0.04]"
                  )}
                >
                  {p + 1}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={cn(
                  "size-8 flex items-center justify-center rounded-lg",
                  "bg-white/[0.03] border border-white/[0.06]",
                  "text-white/30 hover:text-white/60 hover:bg-white/[0.06] hover:border-white/[0.10]",
                  "transition-all duration-200",
                  "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.03]"
                )}
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="size-3.5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
