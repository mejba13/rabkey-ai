"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Store,
  Plus,
  Search,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Star,
  Clock,
  CreditCard,
  ExternalLink,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockStores } from "@/lib/mock-data";
import type { Store as StoreType } from "@/lib/types";
import { GamingButton } from "@/components/gaming";

/* ══════════════════════════════════════════════
   STORE BRAND IDENTITY
   ══════════════════════════════════════════════ */
const brandGradients: Record<
  string,
  { from: string; to: string; accent: string }
> = {
  Steam: { from: "#1b2838", to: "#2a475e", accent: "#66c0f4" },
  GOG: { from: "#5c2d91", to: "#7b3fa0", accent: "#d4a5ff" },
  "Epic Games Store": { from: "#0078f2", to: "#004ea1", accent: "#4da6ff" },
  "Humble Bundle": { from: "#cc2929", to: "#8b1a1a", accent: "#ff6b6b" },
  "Green Man Gaming": { from: "#00b853", to: "#007d3a", accent: "#4dff91" },
  Fanatical: { from: "#f47521", to: "#c25a0e", accent: "#ffab6b" },
  GamesPlanet: { from: "#e74c3c", to: "#a33629", accent: "#ff8c82" },
  Voidu: { from: "#00bcd4", to: "#008fa1", accent: "#4de8ff" },
  WinGameStore: { from: "#2196f3", to: "#1565c0", accent: "#6bb9ff" },
  IndieGala: { from: "#e91e63", to: "#ad1457", accent: "#ff6b9d" },
  GameBillet: { from: "#4caf50", to: "#2e7d32", accent: "#81e884" },
  CDKeys: { from: "#ff9800", to: "#e65100", accent: "#ffcc80" },
  Eneba: { from: "#00c853", to: "#009624", accent: "#69f0ae" },
  G2A: { from: "#f44336", to: "#c62828", accent: "#ff8a80" },
  Kinguin: { from: "#0066cc", to: "#003d7a", accent: "#66b3ff" },
};

const defaultBrand = { from: "#333", to: "#555", accent: "#999" };

/* ── Motion variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
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

/* ── Animated Trust Score Ring ── */
function TrustRing({ score, size = 52 }: { score: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color =
    score >= 80 ? "#00D4AA" : score >= 60 ? "#FFD700" : "#FF3366";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={3}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[13px] font-heading font-bold"
          style={{ color }}
        >
          {score}
        </span>
      </div>
    </div>
  );
}

/* ── Filter configuration ── */
type FilterKey =
  | "all"
  | "official"
  | "grey"
  | "excellent"
  | "good"
  | "average";

const filterConfig: {
  key: FilterKey;
  label: string;
  activeColor: string;
  activeBg: string;
}[] = [
  {
    key: "all",
    label: "All Stores",
    activeColor: "text-white",
    activeBg: "bg-white/[0.08] border-white/[0.12]",
  },
  {
    key: "official",
    label: "Official",
    activeColor: "text-gaming-teal",
    activeBg: "bg-gaming-teal/[0.08] border-gaming-teal/20",
  },
  {
    key: "grey",
    label: "Grey Market",
    activeColor: "text-gaming-orange",
    activeBg: "bg-gaming-orange/[0.08] border-gaming-orange/20",
  },
  {
    key: "excellent",
    label: "Excellent",
    activeColor: "text-gaming-teal",
    activeBg: "bg-gaming-teal/[0.06] border-gaming-teal/15",
  },
  {
    key: "good",
    label: "Good",
    activeColor: "text-gaming-blue",
    activeBg: "bg-gaming-blue/[0.06] border-gaming-blue/15",
  },
  {
    key: "average",
    label: "Average",
    activeColor: "text-gaming-gold",
    activeBg: "bg-gaming-gold/[0.06] border-gaming-gold/15",
  },
];

/* ══════════════════════════════════════════════
   STORE CARD COMPONENT
   ══════════════════════════════════════════════ */
function StoreCard({ store, index }: { store: StoreType; index: number }) {
  const brand = brandGradients[store.name] ?? defaultBrand;
  const initial = store.name.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring" as const,
        stiffness: 200,
        damping: 22,
        delay: 0.15 + index * 0.04,
      }}
      layout
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "bg-[#0d0d18]/80 backdrop-blur-xl",
        "border border-white/[0.06]",
        "hover:border-white/[0.12]",
        "transition-colors duration-300",
      )}
    >
      {/* ── Gradient header strip ── */}
      <div
        className="relative h-24 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${brand.from} 0%, ${brand.to} 100%)`,
        }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, ${brand.accent} 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />
        {/* Large faded initial letter */}
        <div
          className="absolute -right-2 -bottom-5 text-[90px] font-heading font-black leading-none select-none"
          style={{ color: brand.accent, opacity: 0.08 }}
        >
          {initial}
        </div>

        {/* Official / Grey badge */}
        <div className="absolute top-3 right-3">
          {store.isOfficial ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
              <ShieldCheck className="size-3 text-gaming-teal" />
              <span className="text-[9px] font-heading font-bold text-gaming-teal uppercase tracking-wider">
                Official
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
              <ShieldAlert className="size-3 text-gaming-orange" />
              <span className="text-[9px] font-heading font-bold text-gaming-orange uppercase tracking-wider">
                Grey Market
              </span>
            </div>
          )}
        </div>

        {/* Trust level pill - bottom left */}
        <div className="absolute bottom-3 left-3">
          <span
            className={cn(
              "inline-flex items-center h-5 px-2 rounded-full text-[9px] font-heading font-bold border uppercase tracking-wider backdrop-blur-sm",
              store.trustLevel === "excellent" &&
                "bg-gaming-teal/20 text-gaming-teal border-gaming-teal/30",
              store.trustLevel === "good" &&
                "bg-gaming-blue/20 text-gaming-blue border-gaming-blue/30",
              store.trustLevel === "average" &&
                "bg-gaming-gold/20 text-gaming-gold border-gaming-gold/30",
              store.trustLevel === "poor" &&
                "bg-gaming-pink/20 text-gaming-pink border-gaming-pink/30",
            )}
          >
            {store.trustLevel}
          </span>
        </div>
      </div>

      {/* ── Avatar overlapping header ── */}
      <div className="relative px-5 -mt-7 z-10">
        <div
          className="size-14 rounded-xl flex items-center justify-center border-[3px] border-[#0d0d18] shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${brand.from}, ${brand.to})`,
          }}
        >
          <span
            className="text-xl font-heading font-black"
            style={{ color: brand.accent }}
          >
            {initial}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="px-5 pt-3 pb-5">
        {/* Name + URL */}
        <div className="mb-3">
          <h3 className="font-heading font-bold text-[15px] text-white/90 group-hover:text-white transition-colors">
            {store.name}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-heading text-white/20 truncate">
              {store.url.replace("https://", "").replace("https://www.", "")}
            </span>
            <ExternalLink className="size-2.5 text-white/15 shrink-0" />
          </div>
        </div>

        {/* Trust ring + description area */}
        <div className="flex items-start gap-3 mb-4">
          <TrustRing score={store.trustScore} size={48} />
          <p className="text-[11px] text-white/25 leading-relaxed font-heading line-clamp-3 pt-0.5">
            {store.description}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.04]">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="size-3 text-gaming-gold/50" />
            </div>
            <p className="text-[12px] font-heading font-semibold text-white/60 tabular-nums">
              {store.totalReviews >= 1_000_000
                ? `${(store.totalReviews / 1_000_000).toFixed(1)}M`
                : `${(store.totalReviews / 1000).toFixed(0)}K`}
            </p>
            <p className="text-[8px] font-heading text-white/15 uppercase tracking-wider mt-0.5">
              Reviews
            </p>
          </div>
          <div className="text-center border-x border-white/[0.04]">
            <div className="flex items-center justify-center mb-1">
              <Clock className="size-3 text-gaming-blue/50" />
            </div>
            <p className="text-[12px] font-heading font-semibold text-white/60">
              {store.avgDeliveryTime}
            </p>
            <p className="text-[8px] font-heading text-white/15 uppercase tracking-wider mt-0.5">
              Delivery
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Globe className="size-3 text-gaming-purple/50" />
            </div>
            <p className="text-[12px] font-heading font-semibold text-white/60 tabular-nums">
              {store.regionSupport.length}
            </p>
            <p className="text-[8px] font-heading text-white/15 uppercase tracking-wider mt-0.5">
              Regions
            </p>
          </div>
        </div>

        {/* Payment methods */}
        <div className="flex flex-wrap gap-1 mt-3">
          {store.paymentMethods.slice(0, 3).map((method) => (
            <span
              key={method}
              className="inline-flex items-center gap-1 h-[18px] px-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[8px] font-heading text-white/25"
            >
              <CreditCard className="size-2" />
              {method}
            </span>
          ))}
          {store.paymentMethods.length > 3 && (
            <span className="inline-flex items-center h-[18px] px-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[8px] font-heading text-white/20">
              +{store.paymentMethods.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* ── Hover glow overlay ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${brand.accent}06 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */
export default function AdminStoresPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

  /* ── Computed data ── */
  const filteredStores = useMemo(() => {
    return mockStores.filter((s) => {
      const matchSearch = s.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchFilter =
        activeFilter === "all" ||
        (activeFilter === "official" && s.isOfficial) ||
        (activeFilter === "grey" && !s.isOfficial) ||
        activeFilter === s.trustLevel;
      return matchSearch && matchFilter;
    });
  }, [activeFilter, search]);

  const avgTrust = Math.round(
    mockStores.reduce((a, s) => a + s.trustScore, 0) / mockStores.length,
  );
  const officialCount = mockStores.filter((s) => s.isOfficial).length;
  const greyCount = mockStores.filter((s) => !s.isOfficial).length;
  const totalReviews = mockStores.reduce((a, s) => a + s.totalReviews, 0);

  const filterCounts: Record<FilterKey, number> = {
    all: mockStores.length,
    official: officialCount,
    grey: greyCount,
    excellent: mockStores.filter((s) => s.trustLevel === "excellent").length,
    good: mockStores.filter((s) => s.trustLevel === "good").length,
    average: mockStores.filter((s) => s.trustLevel === "average").length,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* ═══════════════════════════════════════════
          PAGE HEADER
          ═══════════════════════════════════════════ */}
      <motion.div
        variants={itemVariants}
        className="flex items-end justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-gaming-blue/20 to-gaming-teal/10 border border-gaming-blue/20 flex items-center justify-center">
              <Store className="size-5 text-gaming-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-white/95 tracking-tight">
                Store Intelligence
              </h1>
              <p className="text-[13px] text-white/30 font-heading mt-0.5">
                {mockStores.length} stores tracked across official & grey
                markets
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <GamingButton variant="primary" size="sm">
            <Plus className="size-4" />
            Add Store
          </GamingButton>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          STATS ROW — 4 Bento Mini Cards
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Stores */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl overflow-hidden bg-[#0d0d18]/80 backdrop-blur-xl border border-white/[0.06] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gaming-blue/[0.08] border border-gaming-blue/15 flex items-center justify-center shrink-0">
              <Store className="size-[18px] text-gaming-blue" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-white/20">
                Total Stores
              </p>
              <p className="text-2xl font-heading font-bold text-white/90 tracking-tight tabular-nums mt-0.5">
                {mockStores.length}
              </p>
            </div>
          </div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-[3px] mt-3 h-5">
            {mockStores.slice(0, 12).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ height: 0 }}
                animate={{ height: `${(s.trustScore / 100) * 100}%` }}
                transition={{
                  delay: 0.3 + i * 0.04,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={cn(
                  "flex-1 rounded-sm",
                  s.trustScore >= 80
                    ? "bg-gaming-teal/25"
                    : s.trustScore >= 60
                      ? "bg-gaming-gold/25"
                      : "bg-gaming-pink/25",
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* Avg Trust Score */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl overflow-hidden bg-[#0d0d18]/80 backdrop-blur-xl border border-white/[0.06] p-4"
        >
          <div className="flex items-center gap-3">
            <TrustRing score={avgTrust} size={44} />
            <div className="min-w-0">
              <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-white/20">
                Avg Trust
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-2xl font-heading font-bold text-white/90 tracking-tight tabular-nums">
                  {avgTrust}
                </p>
                <div className="flex items-center gap-0.5">
                  <ArrowUpRight className="size-3 text-gaming-teal" />
                  <span className="text-[10px] font-heading font-semibold text-gaming-teal">
                    +2.1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Official Stores */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl overflow-hidden bg-[#0d0d18]/80 backdrop-blur-xl border border-white/[0.06] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gaming-teal/[0.08] border border-gaming-teal/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-[18px] text-gaming-teal" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-white/20">
                Official
              </p>
              <p className="text-2xl font-heading font-bold text-white/90 tracking-tight tabular-nums mt-0.5">
                {officialCount}
              </p>
            </div>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(officialCount / mockStores.length) * 100}%`,
              }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-gaming-teal to-gaming-blue"
            />
          </div>
        </motion.div>

        {/* Grey Market */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl overflow-hidden bg-[#0d0d18]/80 backdrop-blur-xl border border-white/[0.06] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gaming-orange/[0.08] border border-gaming-orange/15 flex items-center justify-center shrink-0">
              <ShieldAlert className="size-[18px] text-gaming-orange" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-white/20">
                Grey Market
              </p>
              <p className="text-2xl font-heading font-bold text-white/90 tracking-tight tabular-nums mt-0.5">
                {greyCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <BarChart3 className="size-3 text-gaming-orange/40" />
            <span className="text-[10px] font-heading text-white/20">
              {((totalReviews / 1_000_000) * (greyCount / mockStores.length)).toFixed(1)}M reviews from grey market
            </span>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════
          FILTER BAR + SEARCH
          ═══════════════════════════════════════════ */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-3"
      >
        {/* Filter pills */}
        <div className="flex flex-wrap gap-1.5">
          {filterConfig.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={cn(
                  "relative h-8 px-3 rounded-lg text-[11px] font-heading font-semibold border transition-all duration-200",
                  isActive
                    ? cn(f.activeBg, f.activeColor)
                    : "bg-transparent border-white/[0.06] text-white/25 hover:text-white/50 hover:border-white/[0.10]",
                )}
              >
                <span className="flex items-center gap-1.5">
                  {f.label}
                  <span
                    className={cn(
                      "text-[9px] tabular-nums",
                      isActive ? "opacity-60" : "opacity-40",
                    )}
                  >
                    {filterCounts[f.key]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-white/15" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stores..."
            className={cn(
              "w-full h-9 pl-9 pr-4 rounded-xl",
              "bg-white/[0.03] border border-white/[0.06]",
              "text-[12px] font-heading text-white/70 placeholder:text-white/15",
              "focus:outline-none focus:border-gaming-blue/30 focus:bg-white/[0.04]",
              "transition-all duration-200",
            )}
          />
        </div>
      </motion.div>

      {/* ── Results count ── */}
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <TrendingUp className="size-3 text-white/15" />
        <span className="text-[11px] font-heading text-white/20">
          Showing{" "}
          <span className="text-white/40 font-semibold">
            {filteredStores.length}
          </span>{" "}
          {filteredStores.length === 1 ? "store" : "stores"}
          {activeFilter !== "all" && (
            <>
              {" "}
              filtered by{" "}
              <span className="text-white/40 font-semibold capitalize">
                {activeFilter}
              </span>
            </>
          )}
        </span>
      </motion.div>

      {/* ═══════════════════════════════════════════
          STORE CARDS GRID
          ═══════════════════════════════════════════ */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filteredStores.map((store, i) => (
            <StoreCard key={store.id} store={store} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Empty state ── */}
      {filteredStores.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="size-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
            <Store className="size-7 text-white/15" />
          </div>
          <p className="text-[14px] font-heading font-semibold text-white/30">
            No stores found
          </p>
          <p className="text-[12px] font-heading text-white/15 mt-1">
            Try adjusting your filters or search query
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
