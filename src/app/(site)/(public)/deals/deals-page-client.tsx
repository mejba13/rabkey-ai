"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame,
  Monitor,
  Gamepad2,
  Gamepad,
  Smartphone,
  RotateCcw,
  ArrowUpRight,
  Clock,
  Store,
  TrendingDown,
  ArrowDownWideNarrow,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  PlatformIcon,
} from "@/components/gaming";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeals } from "@/hooks/use-deals";
import { useStores } from "@/hooks/use-stores";
import { formatRelativeTime } from "@/lib/formatters";
import type { Platform, DealTag, Deal } from "@/lib/types";

/* ═══════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════ */

type SortOption = "score" | "price-asc" | "discount" | "newest";

const platforms: {
  value: Platform | "all";
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "all", label: "All", icon: Monitor },
  { value: "pc", label: "PC", icon: Monitor },
  { value: "playstation", label: "PS", icon: Gamepad2 },
  { value: "xbox", label: "Xbox", icon: Gamepad },
  { value: "nintendo", label: "Switch", icon: Smartphone },
];

const dealTags: (DealTag | "all")[] = [
  "all",
  "Flash Sale",
  "Historical Low",
  "Bundle Deal",
  "New Release",
  "Editor's Pick",
  "Trending",
  "Limited Time",
];

const tagStyles: Record<string, { bg: string; text: string; border: string }> =
  {
    "Flash Sale": {
      bg: "bg-gaming-coral/[0.08]",
      text: "text-gaming-coral",
      border: "border-gaming-coral/15",
    },
    "Historical Low": {
      bg: "bg-gaming-teal/[0.08]",
      text: "text-gaming-teal",
      border: "border-gaming-teal/15",
    },
    "Bundle Deal": {
      bg: "bg-gaming-purple/[0.08]",
      text: "text-gaming-purple",
      border: "border-gaming-purple/15",
    },
    "New Release": {
      bg: "bg-gaming-blue/[0.08]",
      text: "text-gaming-blue",
      border: "border-gaming-blue/15",
    },
    "Editor's Pick": {
      bg: "bg-gaming-gold/[0.08]",
      text: "text-gaming-gold",
      border: "border-gaming-gold/15",
    },
    Trending: {
      bg: "bg-gaming-orange/[0.08]",
      text: "text-gaming-orange",
      border: "border-gaming-orange/15",
    },
    "Limited Time": {
      bg: "bg-gaming-pink/[0.08]",
      text: "text-gaming-pink",
      border: "border-gaming-pink/15",
    },
  };

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

/* ═══════════════════════════════════════════════
   Stats Bar
   ═══════════════════════════════════════════════ */

function StatsBar({ deals }: { deals: Deal[] }) {
  const avgSavings = useMemo(() => {
    if (deals.length === 0) return 0;
    const total = deals.reduce((sum, d) => sum + d.discount, 0);
    return Math.round(total / deals.length);
  }, [deals]);

  const stats = [
    {
      icon: Flame,
      value: deals.length.toString(),
      label: "Active Deals",
      color: "text-gaming-coral",
    },
    {
      icon: TrendingDown,
      value: `${avgSavings}%`,
      label: "Avg. Savings",
      color: "text-gaming-teal",
    },
    {
      icon: ShieldCheck,
      value: "50+",
      label: "Verified Stores",
      color: "text-gaming-purple",
    },
    {
      icon: Zap,
      value: "< 1h",
      label: "Price Freshness",
      color: "text-gaming-orange",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map(({ icon: Icon, value, label, color }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3"
        >
          <Icon className={cn("h-4 w-4 shrink-0", color)} />
          <div>
            <span className="font-heading font-bold text-sm text-white/90">
              {value}
            </span>
            <p className="text-[10px] font-heading text-white/25 uppercase tracking-wider">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Deal Card (Vertical)
   ═══════════════════════════════════════════════ */

function DealCardVertical({
  deal,
  storeName,
}: {
  deal: Deal;
  storeName?: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -4,
        transition: {
          type: "spring" as const,
          stiffness: 300,
          damping: 25,
        },
      }}
      className={cn(
        "group flex flex-col rounded-2xl overflow-hidden",
        "bg-white/[0.02] border border-white/[0.06]",
        "hover:border-white/[0.12] transition-all duration-300",
        "hover:shadow-xl hover:shadow-black/20"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={deal.coverImage}
          alt={deal.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

        {/* Score — top right */}
        <div className="absolute top-3 right-3">
          <DealScoreBadge score={deal.dealScore} size="sm" />
        </div>

        {/* Tag — top left */}
        {deal.tags[0] && (
          <div className="absolute top-3 left-3">
            {(() => {
              const style = tagStyles[deal.tags[0]];
              return style ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-md",
                    "text-[9px] font-heading font-bold uppercase tracking-wider",
                    "backdrop-blur-md border",
                    style.bg,
                    style.text,
                    style.border
                  )}
                >
                  {deal.tags[0]}
                </span>
              ) : null;
            })()}
          </div>
        )}

        {/* Price — bottom of image */}
        <div className="absolute bottom-0 inset-x-0 px-4 pb-3">
          <div className="flex items-center gap-2">
            <PriceTag
              currentPrice={deal.currentPrice}
              originalPrice={deal.originalPrice}
              size="md"
            />
            {deal.discount > 0 && <DiscountBadge discount={deal.discount} />}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <h3 className="font-heading font-bold text-sm text-white line-clamp-1 group-hover:text-white/90 transition-colors">
          {deal.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <PlatformIcon
            platform={deal.platform as Platform}
            size={11}
            className="text-white/25"
          />
          <span className="capitalize text-[10px] text-white/30 font-heading">
            {deal.platform}
          </span>
          <span className="h-0.5 w-0.5 rounded-full bg-white/15" />
          <span className="flex items-center gap-1 text-[10px] text-white/30 font-heading">
            <Store className="h-2.5 w-2.5" />
            {storeName || "Store"}
          </span>
          {deal.expiresAt && (
            <>
              <span className="h-0.5 w-0.5 rounded-full bg-white/15" />
              <span className="flex items-center gap-1 text-[10px] text-gaming-coral/60 font-heading">
                <Clock className="h-2.5 w-2.5" />
                {formatRelativeTime(deal.expiresAt)}
              </span>
            </>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => window.open(deal.url, "_blank")}
          className={cn(
            "mt-auto w-full flex items-center justify-center gap-1.5",
            "h-9 rounded-xl",
            "bg-white/[0.05] border border-white/[0.06]",
            "text-xs font-heading font-semibold text-white/60",
            "hover:bg-gaming-orange/15 hover:border-gaming-orange/25 hover:text-gaming-orange",
            "transition-all duration-200"
          )}
        >
          Grab Deal
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Skeleton
   ═══════════════════════════════════════════════ */

function DealCardVerticalSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <Skeleton className="w-full aspect-[16/9] shimmer-skeleton" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4 shimmer-skeleton" />
        <Skeleton className="h-3 w-2/5 shimmer-skeleton" />
        <Skeleton className="h-9 w-full rounded-xl shimmer-skeleton" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Deals Page
   ═══════════════════════════════════════════════ */

export function DealsPageClient() {
  const { data: deals, isLoading: dealsLoading } = useDeals();
  const { data: stores, isLoading: storesLoading } = useStores();

  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [minScore, setMinScore] = useState<string>("any");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<DealTag | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("score");

  const isLoading = dealsLoading || storesLoading;
  const storeMap = useMemo(
    () => new Map(stores?.map((s) => [s.id, s.name]) ?? []),
    [stores]
  );

  const filteredDeals = useMemo(() => {
    if (!deals) return [];

    const filtered = deals.filter((deal) => {
      if (platform !== "all" && deal.platform !== platform) return false;
      if (minScore !== "any") {
        const threshold = parseInt(minScore, 10);
        if (deal.dealScore < threshold) return false;
      }
      if (maxPrice !== "") {
        const max = parseFloat(maxPrice);
        if (!isNaN(max) && deal.currentPrice > max) return false;
      }
      if (selectedTag !== "all" && !deal.tags.includes(selectedTag))
        return false;
      return true;
    });

    // Sort
    switch (sortBy) {
      case "score":
        filtered.sort((a, b) => b.dealScore - a.dealScore);
        break;
      case "price-asc":
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case "newest":
        // No explicit date, use id as proxy
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return filtered;
  }, [deals, platform, minScore, maxPrice, selectedTag, sortBy]);

  const handleReset = () => {
    setPlatform("all");
    setMinScore("any");
    setMaxPrice("");
    setSelectedTag("all");
    setSortBy("score");
  };

  const showEmpty = !isLoading && filteredDeals.length === 0;

  return (
    <PageContainer className="py-12 md:py-16 lg:py-20">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 lg:mb-12"
      >
        <span className="inline-flex items-center gap-2 text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-coral/80 mb-4">
          <Flame className="h-3.5 w-3.5" />
          Hot Deals
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
          Today&apos;s{" "}
          <GradientText variant="primary">Best Deals</GradientText>
        </h1>
        <p className="text-white/40 max-w-lg mx-auto text-sm lg:text-base leading-relaxed">
          AI-scored deals from 50+ verified stores — grab them before they
          expire
        </p>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <StatsBar deals={filteredDeals} />
      </motion.div>

      {/* ── Filter Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-8"
      >
        <div
          className={cn(
            "flex items-center gap-3 flex-wrap",
            "p-3 rounded-xl",
            "bg-white/[0.02] border border-white/[0.05]"
          )}
        >
          {/* Platform pills */}
          <div className="inline-flex items-center rounded-full bg-white/[0.03] border border-white/[0.04] p-0.5 gap-0.5">
            {platforms.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPlatform(value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200",
                  platform === value
                    ? "bg-white/[0.08] text-white shadow-sm"
                    : "text-white/35 hover:text-white/60"
                )}
              >
                <Icon size={12} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Min score */}
          <Select value={minScore} onValueChange={setMinScore}>
            <SelectTrigger
              size="sm"
              className="w-[120px] rounded-full bg-white/[0.03] border-white/[0.04] text-white/50 text-xs font-heading"
            >
              <SelectValue placeholder="Min Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Score</SelectItem>
              <SelectItem value="50">50+</SelectItem>
              <SelectItem value="75">75+</SelectItem>
              <SelectItem value="90">90+ Legendary</SelectItem>
            </SelectContent>
          </Select>

          {/* Max price */}
          <Input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-[110px] h-8 text-xs font-heading rounded-full bg-white/[0.03] border-white/[0.04] text-white/70 placeholder:text-white/25"
            min={0}
            step={0.01}
          />

          {/* Tag filter */}
          <Select
            value={selectedTag}
            onValueChange={(v) => setSelectedTag(v as DealTag | "all")}
          >
            <SelectTrigger
              size="sm"
              className="w-[150px] rounded-full bg-white/[0.03] border-white/[0.04] text-white/50 text-xs font-heading"
            >
              <SelectValue placeholder="All Tags" />
            </SelectTrigger>
            <SelectContent>
              {dealTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag === "all" ? "All Tags" : tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort by */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowDownWideNarrow className="h-3.5 w-3.5 text-white/20" />
            <Select
              value={sortBy}
              onValueChange={(v) => setSortBy(v as SortOption)}
            >
              <SelectTrigger
                size="sm"
                className="w-[130px] rounded-full bg-white/[0.03] border-white/[0.04] text-white/50 text-xs font-heading"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Best Score</SelectItem>
                <SelectItem value="price-asc">Lowest Price</SelectItem>
                <SelectItem value="discount">Biggest Discount</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Count + Reset */}
          <div className="flex items-center gap-3">
            {filteredDeals.length > 0 && (
              <span className="text-[11px] text-white/25 font-heading hidden sm:block">
                {filteredDeals.length}{" "}
                {filteredDeals.length === 1 ? "deal" : "deals"}
              </span>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all duration-200"
            >
              <RotateCcw size={11} />
              Reset
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Deals Grid (3 columns) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <DealCardVerticalSkeleton key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${platform}-${minScore}-${selectedTag}-${sortBy}`}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredDeals.map((deal) => (
                <DealCardVertical
                  key={deal.id}
                  deal={deal}
                  storeName={storeMap.get(deal.storeId)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* ── Empty State ── */}
      {showEmpty && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
            <Search className="h-7 w-7 text-white/15" />
          </div>
          <p className="text-white/40 font-heading text-sm font-medium mb-1">
            No deals match your filters
          </p>
          <p className="text-white/20 text-xs mb-5">
            Try adjusting your filters to discover more deals
          </p>
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl",
              "text-xs font-heading font-semibold",
              "text-gaming-orange/80 hover:text-gaming-orange",
              "bg-gaming-orange/[0.04] hover:bg-gaming-orange/[0.08]",
              "border border-gaming-orange/[0.08] hover:border-gaming-orange/15",
              "transition-all duration-200"
            )}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All Filters
          </button>
        </motion.div>
      )}
    </PageContainer>
  );
}
