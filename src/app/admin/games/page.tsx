"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Gamepad2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Tag,
  Flame,
  Filter,
  LayoutGrid,
  List,
  ArrowUpDown,
  Percent,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { GamingButton } from "@/components/gaming";
import { formatPrice, getDealScoreTier } from "@/lib/formatters";
import { mockGames } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Game } from "@/lib/types";

/* ═══════════════════════════════════════════════
   Computed Stats
   ═══════════════════════════════════════════════ */

function useGameStats() {
  return useMemo(() => {
    const onSale = mockGames.filter((g) => g.isOnSale);
    const avgDiscount =
      onSale.length > 0
        ? Math.round(onSale.reduce((sum, g) => sum + g.discount, 0) / onSale.length)
        : 0;
    const avgScore = Math.round(
      mockGames.reduce((sum, g) => sum + g.dealScore, 0) / mockGames.length
    );
    const legendaryCount = mockGames.filter((g) => g.dealScore >= 90).length;
    const totalSavings = mockGames.reduce(
      (sum, g) => sum + (g.originalPrice - g.bestPrice),
      0
    );
    const topGame = [...mockGames].sort((a, b) => b.dealScore - a.dealScore)[0];

    return {
      total: mockGames.length,
      onSaleCount: onSale.length,
      avgDiscount,
      avgScore,
      legendaryCount,
      totalSavings,
      topGame,
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
   Featured Game Hero Card
   ═══════════════════════════════════════════════ */

function FeaturedGameHero({ game }: { game: Game }) {
  const tier = getDealScoreTier(game.dealScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c14]"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src={game.coverImage}
          alt=""
          fill
          className="object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c14] via-[#0c0c14]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent" />
      </div>

      <div className="relative flex items-center gap-6 p-6">
        {/* Cover */}
        <Image
          src={game.coverImage}
          alt={game.title}
          width={120}
          height={56}
          className="rounded-xl object-cover ring-1 ring-white/[0.08] w-[120px] h-[56px] shrink-0"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="size-3.5 text-gaming-gold" />
            <span className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-gaming-gold/70">
              Top Rated Game
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-white/90 truncate">
            {game.title}
          </h3>
          <p className="text-[11px] text-white/30 font-heading mt-0.5">
            {game.metadata.developer} &middot; {game.metadata.genres.slice(0, 2).join(", ")}
          </p>
        </div>

        {/* Score + Price */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-[10px] font-heading text-white/25 uppercase tracking-wider">
              Best Price
            </p>
            <p className="text-xl font-heading font-bold text-gaming-teal mt-0.5">
              {formatPrice(game.bestPrice)}
            </p>
            {game.discount > 0 && (
              <p className="text-[11px] font-heading text-gaming-coral font-semibold">
                -{game.discount}% off
              </p>
            )}
          </div>
          <div
            className={cn(
              "size-14 rounded-xl flex flex-col items-center justify-center border",
              tier === "legendary" &&
                "bg-gaming-gold/[0.1] border-gaming-gold/25 text-gaming-gold",
              tier === "excellent" &&
                "bg-gaming-teal/[0.1] border-gaming-teal/25 text-gaming-teal",
              tier === "good" &&
                "bg-gaming-orange/[0.1] border-gaming-orange/25 text-gaming-orange",
              (tier === "fair" || tier === "poor") &&
                "bg-white/[0.03] border-white/[0.08] text-white/40"
            )}
          >
            <span className="text-lg font-heading font-black leading-none">
              {game.dealScore}
            </span>
            <span className="text-[8px] font-heading font-semibold uppercase tracking-wider opacity-70 mt-0.5">
              Score
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Score Badge
   ═══════════════════════════════════════════════ */

function ScoreBadge({ score }: { score: number }) {
  const tier = getDealScoreTier(score);
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center h-7 w-9 rounded-lg text-[11px] font-heading font-bold border",
        tier === "legendary" &&
          "bg-gaming-gold/[0.1] text-gaming-gold border-gaming-gold/20",
        tier === "excellent" &&
          "bg-gaming-teal/[0.1] text-gaming-teal border-gaming-teal/20",
        tier === "good" &&
          "bg-gaming-orange/[0.1] text-gaming-orange border-gaming-orange/20",
        (tier === "fair" || tier === "poor") &&
          "bg-white/[0.04] text-white/30 border-white/[0.06]"
      )}
    >
      {score}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   View Modes
   ═══════════════════════════════════════════════ */

type ViewMode = "table" | "grid";
type SortOption = "title" | "bestPrice" | "discount" | "dealScore";

/* ═══════════════════════════════════════════════
   Grid Card
   ═══════════════════════════════════════════════ */

function GameGridCard({ game, index }: { game: Game; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "bg-white/[0.02] border border-white/[0.05]",
        "hover:border-white/[0.1] hover:bg-white/[0.03]",
        "transition-all duration-300"
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-[460/215] overflow-hidden">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent opacity-80" />

        {/* Discount badge */}
        {game.discount > 0 && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-gaming-coral/90 text-[10px] font-heading font-bold text-white">
            -{game.discount}%
          </div>
        )}

        {/* Score */}
        <div className="absolute top-2 right-2">
          <ScoreBadge score={game.dealScore} />
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
          <div>
            <p className="text-xs font-heading font-bold text-gaming-teal">
              {formatPrice(game.bestPrice)}
            </p>
            {game.discount > 0 && (
              <p className="text-[10px] text-white/30 line-through font-heading">
                {formatPrice(game.originalPrice)}
              </p>
            )}
          </div>
          {game.isOnSale && (
            <span className="text-[9px] font-heading font-bold uppercase px-1.5 py-0.5 rounded bg-gaming-teal/15 text-gaming-teal border border-gaming-teal/20">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="font-heading font-semibold text-[13px] text-white/85 truncate">
          {game.title}
        </h4>
        <p className="text-[10px] text-white/25 font-heading mt-0.5 truncate">
          {game.metadata.developer}
        </p>
        <div className="flex gap-1 mt-2 flex-wrap">
          {game.metadata.platforms.map((p) => (
            <span
              key={p}
              className="text-[9px] font-heading text-white/20 bg-white/[0.03] border border-white/[0.05] px-1.5 py-0.5 rounded capitalize"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════ */

export default function AdminGamesPage() {
  const stats = useGameStats();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [sortBy, setSortBy] = useState<SortOption>("dealScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const pageSize = viewMode === "grid" ? 12 : 10;

  // Filter + Sort
  const processed = useMemo(() => {
    let result = [...mockGames];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.metadata.developer.toLowerCase().includes(q)
      );
    }

    if (platformFilter !== "all") {
      result = result.filter((g) =>
        g.metadata.platforms.includes(platformFilter as Game["metadata"]["platforms"][number])
      );
    }

    result.sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;
      switch (sortBy) {
        case "bestPrice":
          aVal = a.bestPrice;
          bVal = b.bestPrice;
          break;
        case "discount":
          aVal = a.discount;
          bVal = b.discount;
          break;
        case "dealScore":
          aVal = a.dealScore;
          bVal = b.dealScore;
          break;
        default:
          aVal = a.title;
          bVal = b.title;
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return result;
  }, [search, sortBy, sortDir, platformFilter]);

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
            <div className="size-9 rounded-xl bg-gradient-to-br from-gaming-orange/15 to-gaming-coral/10 border border-gaming-orange/15 flex items-center justify-center">
              <Gamepad2 className="size-4.5 text-gaming-orange" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-white/90 tracking-tight">
                Games Management
              </h1>
              <p className="text-[11px] text-white/25 font-heading mt-0.5">
                {mockGames.length} games in catalog &middot; {stats.onSaleCount} on sale
              </p>
            </div>
          </div>
        </div>
        <GamingButton variant="primary" size="sm">
          <Plus className="size-4" />
          Add Game
        </GamingButton>
      </motion.div>

      {/* ── Bento Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatMini icon={Gamepad2} label="Total Games" value={String(stats.total)} accent="orange" delay={0} />
        <StatMini icon={Flame} label="On Sale" value={String(stats.onSaleCount)} accent="coral" delay={0.05} />
        <StatMini icon={Percent} label="Avg Discount" value={`${stats.avgDiscount}%`} accent="purple" delay={0.1} />
        <StatMini icon={BarChart3} label="Avg Score" value={String(stats.avgScore)} accent="teal" delay={0.15} />
        <StatMini icon={Trophy} label="Legendary" value={String(stats.legendaryCount)} accent="gold" delay={0.2} />
        <StatMini icon={DollarSign} label="Total Savings" value={`$${Math.round(stats.totalSavings).toLocaleString()}`} accent="blue" delay={0.25} />
      </div>

      {/* ── Featured Game ── */}
      <FeaturedGameHero game={stats.topGame} />

      {/* ── Toolbar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2.5 flex-1 w-full sm:w-auto">
          {/* Search */}
          <div
            className={cn(
              "flex items-center gap-2.5 flex-1 max-w-sm",
              "h-9 pl-3.5 pr-2 rounded-lg",
              "bg-white/[0.03] border border-white/[0.06]",
              "focus-within:border-white/[0.12] focus-within:bg-white/[0.04]",
              "transition-all duration-200"
            )}
          >
            <Search className="size-3.5 shrink-0 text-white/20" />
            <input
              placeholder="Search games or developers..."
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

          {/* Platform filter */}
          <div className="flex items-center gap-1">
            <Filter className="size-3.5 text-white/15 mr-1" />
            {["all", "pc", "playstation", "xbox", "nintendo"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPlatformFilter(p);
                  setPage(0);
                }}
                className={cn(
                  "h-7 px-2.5 rounded-lg text-[10px] font-heading font-semibold capitalize",
                  "border transition-all duration-200",
                  platformFilter === p
                    ? "bg-gaming-orange/[0.1] text-gaming-orange border-gaming-orange/20"
                    : "bg-white/[0.02] text-white/25 border-white/[0.05] hover:text-white/40 hover:border-white/[0.08]"
                )}
              >
                {p === "all" ? "All" : p}
              </button>
            ))}
          </div>
        </div>

        {/* View + Sort controls */}
        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <div className="flex items-center gap-1 mr-2">
            <ArrowUpDown className="size-3 text-white/15" />
            {(
              [
                { key: "dealScore", label: "Score" },
                { key: "bestPrice", label: "Price" },
                { key: "discount", label: "Discount" },
                { key: "title", label: "Name" },
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

          {/* View mode toggle */}
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
          {processed.length === 1 ? "game" : "games"}
          {search && (
            <>
              {" "}
              for &ldquo;
              <span className="text-gaming-orange/70">{search}</span>&rdquo;
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
                        Game
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        <button
                          onClick={() => toggleSort("bestPrice")}
                          className="flex items-center gap-1 hover:text-white/50 transition-colors"
                        >
                          Best Price
                          {sortBy === "bestPrice" && (
                            <span className="text-gaming-orange text-[11px]">
                              {sortDir === "asc" ? "\u2191" : "\u2193"}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        Original
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        <button
                          onClick={() => toggleSort("discount")}
                          className="flex items-center gap-1 hover:text-white/50 transition-colors"
                        >
                          Discount
                          {sortBy === "discount" && (
                            <span className="text-gaming-orange text-[11px]">
                              {sortDir === "asc" ? "\u2191" : "\u2193"}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        <button
                          onClick={() => toggleSort("dealScore")}
                          className="flex items-center gap-1 hover:text-white/50 transition-colors"
                        >
                          Score
                          {sortBy === "dealScore" && (
                            <span className="text-gaming-orange text-[11px]">
                              {sortDir === "asc" ? "\u2191" : "\u2193"}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        Platforms
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        Genre
                      </th>
                      <th className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paged.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center">
                          <Gamepad2 className="size-8 text-white/10 mx-auto mb-2" />
                          <p className="text-sm text-white/25 font-heading">
                            No games found
                          </p>
                        </td>
                      </tr>
                    ) : (
                      paged.map((game, i) => (
                        <motion.tr
                          key={game.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.02 }}
                          className="border-b border-white/[0.03] last:border-b-0 hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* Game */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Image
                                src={game.coverImage}
                                alt={game.title}
                                width={48}
                                height={22}
                                className="w-12 h-[22px] rounded-md object-cover ring-1 ring-white/[0.06] group-hover:ring-white/[0.1] transition-all"
                              />
                              <div>
                                <p className="font-heading font-semibold text-[13px] text-white/80 group-hover:text-white/95 transition-colors">
                                  {game.title}
                                </p>
                                <p className="text-[10px] text-white/20 font-heading">
                                  {game.metadata.developer}
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* Best Price */}
                          <td className="px-4 py-3">
                            <span className="font-heading font-semibold text-gaming-teal text-[13px]">
                              {formatPrice(game.bestPrice)}
                            </span>
                          </td>
                          {/* Original */}
                          <td className="px-4 py-3">
                            <span className="text-white/25 text-[13px] font-heading line-through">
                              {formatPrice(game.originalPrice)}
                            </span>
                          </td>
                          {/* Discount */}
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "font-heading font-bold text-[13px]",
                                game.discount > 0
                                  ? "text-gaming-coral"
                                  : "text-white/15"
                              )}
                            >
                              {game.discount > 0
                                ? `-${game.discount}%`
                                : "\u2014"}
                            </span>
                          </td>
                          {/* Score */}
                          <td className="px-4 py-3">
                            <ScoreBadge score={game.dealScore} />
                          </td>
                          {/* Platforms */}
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {game.metadata.platforms.map((p) => (
                                <span
                                  key={p}
                                  className="text-[9px] font-heading text-white/25 bg-white/[0.03] border border-white/[0.05] px-1.5 py-0.5 rounded capitalize"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </td>
                          {/* Genre */}
                          <td className="px-4 py-3">
                            <span className="text-[11px] text-white/25 font-heading capitalize">
                              {game.metadata.genres[0]}
                            </span>
                          </td>
                          {/* Status */}
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 h-5 px-2 rounded-full text-[10px] font-heading font-semibold border",
                                game.isOnSale
                                  ? "bg-gaming-teal/[0.08] text-gaming-teal border-gaming-teal/20"
                                  : "bg-white/[0.03] text-white/25 border-white/[0.06]"
                              )}
                            >
                              {game.isOnSale && (
                                <Tag className="size-2.5" />
                              )}
                              {game.isOnSale ? "On Sale" : "Full Price"}
                            </span>
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
                <Gamepad2 className="size-8 text-white/10 mx-auto mb-2" />
                <p className="text-sm text-white/25 font-heading">
                  No games found
                </p>
              </div>
            ) : (
              paged.map((game, i) => (
                <GameGridCard key={game.id} game={game} index={i} />
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

            {/* Page numbers */}
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pageNum =
                totalPages <= 5
                  ? i
                  : Math.max(
                      0,
                      Math.min(page - 2, totalPages - 5)
                    ) + i;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "size-8 flex items-center justify-center rounded-lg text-[11px] font-heading font-semibold",
                    "transition-all duration-200",
                    page === pageNum
                      ? "bg-gaming-orange/[0.12] text-gaming-orange border border-gaming-orange/20"
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
