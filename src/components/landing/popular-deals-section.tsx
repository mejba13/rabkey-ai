"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Flame,
  TrendingDown,
  Clock,
  Store,
  ExternalLink,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  GamingButton,
} from "@/components/gaming";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedDeals } from "@/hooks/use-deals";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { Deal } from "@/lib/types";

/* ═══════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════ */

const storeNames: Record<string, string> = {
  s1: "Steam",
  s2: "GOG",
  s3: "Epic Games",
  s4: "Humble Bundle",
  s5: "Green Man Gaming",
  s6: "Fanatical",
};

const recommendationStyles: Record<
  string,
  { label: string; class: string; bg: string }
> = {
  "strong-buy": { label: "Strong Buy", class: "text-gaming-teal", bg: "bg-gaming-teal/10 border-gaming-teal/20" },
  buy: { label: "Buy", class: "text-gaming-orange", bg: "bg-gaming-orange/10 border-gaming-orange/20" },
  wait: { label: "Wait", class: "text-white/40", bg: "bg-white/[0.04] border-white/[0.06]" },
  avoid: { label: "Avoid", class: "text-gaming-pink", bg: "bg-gaming-pink/10 border-gaming-pink/20" },
};

/* ═══════════════════════════════════════════════
   Live Timer
   ═══════════════════════════════════════════════ */

function LiveUpdateBadge() {
  const [minutes, setMinutes] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes((prev) => (prev >= 59 ? 1 : prev + 1));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gaming-teal/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gaming-teal" />
      </span>
      <span className="text-[11px] font-heading text-white/30">
        Updated {minutes}m ago
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Deal Tag
   ═══════════════════════════════════════════════ */

function DealTag({ tag }: { tag: string }) {
  const isFlash = tag === "Flash Sale";
  const isHistLow = tag === "Historical Low";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md",
        "text-[9px] font-heading font-bold uppercase tracking-wider",
        "backdrop-blur-md border",
        isFlash &&
          "bg-gaming-coral/15 text-gaming-coral border-gaming-coral/20",
        isHistLow &&
          "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/20",
        !isFlash &&
          !isHistLow &&
          "bg-gaming-orange/15 text-gaming-orange border-gaming-orange/20"
      )}
    >
      {isFlash && <Flame className="h-2.5 w-2.5" />}
      {isHistLow && <TrendingDown className="h-2.5 w-2.5" />}
      {tag}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   Featured Deal Card (Hero — spans 2 cols + 2 rows)
   ═══════════════════════════════════════════════ */

function FeaturedDealCard({ deal }: { deal: Deal }) {
  const store = storeNames[deal.storeId] || "Store";
  const rec = recommendationStyles[deal.recommendation];

  return (
    <motion.div
      variants={staggerItem}
      className="group relative col-span-1 md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
    >
      <Link href={`/game/${deal.gameId}`} className="block h-full">
        {/* Full image background */}
        <div className="relative h-full min-h-[400px] md:min-h-[500px] overflow-hidden">
          <Image
            src={deal.coverImage}
            alt={deal.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {/* Layered gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          {/* Top bar: Tag + Score */}
          <div className="absolute top-4 inset-x-4 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              {deal.tags[0] && <DealTag tag={deal.tags[0]} />}
              {rec && (
                <span className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-heading font-bold border",
                  rec.bg, rec.class
                )}>
                  <Sparkles className="h-2.5 w-2.5" />
                  {rec.label}
                </span>
              )}
            </div>
            <DealScoreBadge score={deal.dealScore} size="md" />
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 inset-x-0 p-5 md:p-7">
            {/* Featured label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-heading font-bold uppercase tracking-wider bg-gaming-orange/90 text-black">
                <Flame className="h-2.5 w-2.5" />
                Top Deal
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl md:text-2xl text-white leading-tight mb-3 group-hover:text-gaming-orange transition-colors duration-300">
              {deal.title}
            </h3>

            {/* Meta */}
            <div className="flex items-center gap-2 mb-4 text-[11px] text-white/35 font-heading">
              <span className="uppercase tracking-wider">{deal.platform}</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span className="flex items-center gap-1">
                <Store className="h-3 w-3" />
                {store}
              </span>
              {deal.expiresAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/15" />
                  <span className="flex items-center gap-1 text-gaming-coral/70">
                    <Clock className="h-3 w-3" />
                    Limited Time
                  </span>
                </>
              )}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <PriceTag
                  currentPrice={deal.currentPrice}
                  originalPrice={deal.originalPrice}
                  size="lg"
                />
                <DiscountBadge discount={deal.discount} />
              </div>

              <GamingButton
                size="md"
                className="rounded-xl group/btn"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(deal.url, "_blank");
                }}
              >
                Grab This Deal
                <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </GamingButton>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Compact Deal Card
   ═══════════════════════════════════════════════ */

function CompactDealCard({ deal }: { deal: Deal }) {
  const store = storeNames[deal.storeId] || "Store";
  const rec = recommendationStyles[deal.recommendation];

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -4,
        transition: { type: "spring" as const, stiffness: 300, damping: 25 },
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Deal score — top right */}
        <div className="absolute top-3 right-3">
          <DealScoreBadge score={deal.dealScore} size="sm" />
        </div>

        {/* Tags — top left */}
        {deal.tags[0] && (
          <div className="absolute top-3 left-3">
            <DealTag tag={deal.tags[0]} />
          </div>
        )}

        {/* Price overlay — bottom of image */}
        <div className="absolute bottom-0 inset-x-0 px-4 pb-3">
          <div className="flex items-center gap-2">
            <PriceTag
              currentPrice={deal.currentPrice}
              originalPrice={deal.originalPrice}
              size="md"
            />
            <DiscountBadge discount={deal.discount} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <h3 className="font-heading font-bold text-sm text-white line-clamp-1 group-hover:text-white/90 transition-colors">
            {deal.title}
          </h3>

          {/* Meta row */}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] text-white/30 font-heading uppercase tracking-wider">
              {deal.platform}
            </span>
            <span className="h-0.5 w-0.5 rounded-full bg-white/15" />
            <span className="flex items-center gap-1 text-[10px] text-white/30 font-heading">
              <Store className="h-2.5 w-2.5" />
              {store}
            </span>
            {rec && (
              <>
                <span className="h-0.5 w-0.5 rounded-full bg-white/15" />
                <span
                  className={cn(
                    "text-[10px] font-heading font-semibold",
                    rec.class
                  )}
                >
                  {rec.label}
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <GamingButton
          size="sm"
          className="w-full h-9 rounded-xl text-xs group/btn"
          onClick={() => window.open(deal.url, "_blank")}
        >
          Grab Deal
          <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </GamingButton>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Skeletons
   ═══════════════════════════════════════════════ */

function FeaturedSkeleton() {
  return (
    <div className="col-span-1 md:col-span-2 md:row-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <Skeleton className="w-full h-full min-h-[400px] md:min-h-[500px] shimmer-skeleton" />
    </div>
  );
}

function CompactSkeleton() {
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
   Section
   ═══════════════════════════════════════════════ */

export function PopularDealsSection() {
  const { data: deals, isLoading } = useFeaturedDeals(7);

  const featured = deals?.[0];
  const rest = deals?.slice(1);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Section divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.705 0.193 39.221 / 12%), transparent)",
          }}
        />
      </div>

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gaming-orange/[0.02] blur-[120px]" />

      <PageContainer>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-14"
        >
          <div>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5",
                "bg-gaming-coral/[0.06] border border-gaming-coral/10",
                "text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-coral/80"
              )}
            >
              <Flame size={11} />
              Hot Deals
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
              Today&apos;s{" "}
              <GradientText variant="primary">Hottest Deals</GradientText>
            </h2>
            <p className="text-white/35 mt-3 text-base max-w-lg leading-relaxed">
              AI-curated deals with the highest scores — handpicked from 50+
              stores, updated every hour.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <LiveUpdateBadge />
            <Link
              href="/deals"
              className={cn(
                "inline-flex items-center gap-2",
                "px-5 py-2.5 rounded-xl",
                "text-xs font-heading font-semibold",
                "text-gaming-orange/80 hover:text-gaming-orange",
                "bg-gaming-orange/[0.04] hover:bg-gaming-orange/[0.08]",
                "border border-gaming-orange/[0.08] hover:border-gaming-orange/15",
                "transition-all duration-200 group"
              )}
            >
              View All Deals
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* ── Bento Grid: Featured + Compact ── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {isLoading ? (
            <>
              <FeaturedSkeleton />
              {Array.from({ length: 4 }).map((_, i) => (
                <CompactSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {/* Featured — spans 2 cols + 2 rows on md+ */}
              {featured && <FeaturedDealCard deal={featured} />}

              {/* Remaining cards */}
              {rest?.map((deal) => (
                <CompactDealCard key={deal.id} deal={deal} />
              ))}
            </>
          )}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <p className="text-xs text-white/20 font-heading">
            Showing top {deals?.length ?? 7} AI-scored deals &middot; Updated
            every hour
          </p>
          <Link
            href="/deals"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-gaming-orange/50 hover:text-gaming-orange/80 transition-colors"
          >
            Browse all deals
            <ChevronRight className="h-3 w-3" />
          </Link>
        </motion.div>
      </PageContainer>
    </section>
  );
}
