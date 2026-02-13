"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Flame,
  TrendingDown,
  Clock,
  Store,
  Timer,
  ExternalLink,
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

const recommendationLabels: Record<string, string> = {
  "strong-buy": "Strong Buy",
  buy: "Buy",
  wait: "Wait",
  avoid: "Avoid",
};

/* ═══════════════════════════════════════════════
   Deal Tag Pill
   ═══════════════════════════════════════════════ */

function DealTag({ tag }: { tag: string }) {
  const isFlash = tag === "Flash Sale";
  const isHistLow = tag === "Historical Low";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-md",
        "text-[10px] font-heading font-semibold uppercase tracking-wide",
        "backdrop-blur-md border",
        isFlash && "bg-gaming-coral/15 text-gaming-coral border-gaming-coral/20",
        isHistLow && "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/20",
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
   Featured Deal Card (hero — col-span-2, row-span-2)
   ═══════════════════════════════════════════════ */

function FeaturedDealCard({ deal }: { deal: Deal }) {
  const store = storeNames[deal.storeId] || "Store";
  const rec = recommendationLabels[deal.recommendation] || deal.recommendation;

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "md:col-span-2 md:row-span-2",
        "group relative rounded-2xl overflow-hidden",
        "bg-card/50 border border-border/30",
        "hover:border-gaming-orange/20 transition-all duration-300"
      )}
    >
      {/* Full-bleed image with overlay */}
      <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-full md:min-h-[480px]">
        <Image
          src={deal.coverImage}
          alt={deal.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority
        />

        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Tags — top left */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          {deal.tags.slice(0, 2).map((tag) => (
            <DealTag key={tag} tag={tag} />
          ))}
        </div>

        {/* Deal Score — top right */}
        <div className="absolute top-5 right-5">
          <DealScoreBadge score={deal.dealScore} size="lg" />
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="space-y-4">
            {/* Title & meta */}
            <div>
              <h3 className="font-heading font-bold text-xl md:text-2xl lg:text-3xl text-white leading-tight">
                {deal.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-sm text-white/40 font-heading uppercase">
                  {deal.platform}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1 text-sm text-white/50">
                  <Store className="h-3 w-3" />
                  {store}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span
                  className={cn(
                    "text-sm font-heading font-semibold",
                    deal.recommendation === "strong-buy"
                      ? "text-gaming-teal"
                      : deal.recommendation === "buy"
                        ? "text-gaming-orange"
                        : "text-muted-foreground"
                  )}
                >
                  {rec}
                </span>
              </div>
            </div>

            {/* Price row */}
            <div className="flex items-center gap-3 flex-wrap">
              <PriceTag
                currentPrice={deal.currentPrice}
                originalPrice={deal.originalPrice}
                size="lg"
              />
              <DiscountBadge discount={deal.discount} />
              {deal.expiresAt && (
                <span className="flex items-center gap-1.5 text-xs text-white/40 font-heading">
                  <Clock className="h-3 w-3" />
                  Limited time
                </span>
              )}
            </div>

            {/* CTA */}
            <GamingButton
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => window.open(deal.url, "_blank")}
            >
              <Flame className="h-4 w-4" />
              Grab This Deal
            </GamingButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Supporting Deal Card (compact)
   ═══════════════════════════════════════════════ */

function SupportingDealCard({ deal }: { deal: Deal }) {
  const store = storeNames[deal.storeId] || "Store";

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className={cn(
        "group flex flex-col rounded-2xl overflow-hidden",
        "bg-card/50 border border-border/30",
        "hover:border-gaming-orange/20 transition-all duration-300"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gaming-surface">
        <Image
          src={deal.coverImage}
          alt={deal.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Deal Score */}
        <div className="absolute top-3 right-3">
          <DealScoreBadge score={deal.dealScore} size="sm" />
        </div>

        {/* Tags */}
        {deal.tags[0] && (
          <div className="absolute top-3 left-3">
            <DealTag tag={deal.tags[0]} />
          </div>
        )}

        {/* Expiry badge */}
        {deal.expiresAt && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[9px] font-heading font-medium text-white/60 border border-white/10">
              <Timer className="h-2.5 w-2.5" />
              Limited time
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-sm text-foreground/90 line-clamp-1">
            {deal.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/50 mt-1 font-heading">
            <span className="uppercase">{deal.platform}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/30" />
            {store}
          </p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <PriceTag
              currentPrice={deal.currentPrice}
              originalPrice={deal.originalPrice}
              size="sm"
            />
            <DiscountBadge discount={deal.discount} />
          </div>
        </div>

        <GamingButton
          size="sm"
          className="w-full group/btn"
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
   Skeleton Loading States
   ═══════════════════════════════════════════════ */

function DealCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/20 bg-card/30 overflow-hidden",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      <Skeleton
        className={cn(
          "w-full shimmer-skeleton",
          featured ? "aspect-[16/10] md:aspect-auto md:min-h-[480px]" : "aspect-[16/9]"
        )}
      />
      {!featured && (
        <div className="p-4 space-y-3">
          <Skeleton className="h-4 w-3/4 shimmer-skeleton" />
          <Skeleton className="h-3 w-1/3 shimmer-skeleton" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 shimmer-skeleton" />
            <Skeleton className="h-4 w-10 shimmer-skeleton" />
          </div>
          <Skeleton className="h-8 w-full shimmer-skeleton rounded-lg" />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Section Export
   ═══════════════════════════════════════════════ */

export function PopularDealsSection() {
  const { data: deals, isLoading } = useFeaturedDeals(6);
  const featured = deals?.[0];
  const sideDeals = deals?.slice(1, 3);
  const bottomDeals = deals?.slice(3, 6);

  return (
    <section className="relative py-28 lg:py-32 overflow-hidden">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.705 0.193 39.221 / 15%), transparent)",
          }}
        />
      </div>

      <PageContainer>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-coral/80 mb-4">
              Hot Deals
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight">
              Today&apos;s{" "}
              <GradientText variant="primary">Hottest Deals</GradientText>
            </h2>
            <p className="text-muted-foreground/60 mt-2 text-base max-w-md">
              AI-curated deals with the highest scores right now
            </p>
          </div>
          <Link
            href="/deals"
            className={cn(
              "inline-flex items-center gap-2",
              "text-sm font-heading font-semibold text-gaming-orange/80",
              "hover:text-gaming-orange transition-colors",
              "group shrink-0"
            )}
          >
            View All Deals
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3.5"
        >
          {isLoading ? (
            <>
              <DealCardSkeleton featured />
              {Array.from({ length: 5 }).map((_, i) => (
                <DealCardSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {/* Featured hero card — col-span-2, row-span-2 */}
              {featured && <FeaturedDealCard deal={featured} />}

              {/* Side cards — right column, stacked */}
              {sideDeals?.map((deal) => (
                <SupportingDealCard key={deal.id} deal={deal} />
              ))}

              {/* Bottom row — 3 equal cards */}
              {bottomDeals?.map((deal) => (
                <SupportingDealCard key={deal.id} deal={deal} />
              ))}
            </>
          )}
        </motion.div>
      </PageContainer>
    </section>
  );
}
