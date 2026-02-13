"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Star, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/animations/variants";
import type { Price, Store, DealScoreBreakdown } from "@/lib/types";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  StoreTrustBadge,
} from "@/components/gaming";
import { DealScoreBreakdownModal } from "@/components/predictions";

interface BestDealHighlightProps {
  price?: Price;
  store?: Store;
  className?: string;
}

const defaultBreakdown: DealScoreBreakdown = {
  historicalLowFactor: 82,
  predictionFactor: 78,
  storeTrustFactor: 90,
  priceTrendFactor: 85,
  regionCompatibility: 95,
  editionValue: 80,
  timeSensitivity: 72,
};

function BestDealHighlight({
  price,
  store,
  className,
}: BestDealHighlightProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  if (!price) return null;

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-card/50 border border-gaming-orange/20 backdrop-blur-sm",
        className,
      )}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-gaming-orange/[0.04]">
        <Star size={14} className="text-gaming-gold fill-gaming-gold" />
        <span className="font-heading text-sm font-bold text-white/80">Best Deal</span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Store Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm font-bold font-heading text-gaming-orange">
              {store?.name.charAt(0) ?? "?"}
            </div>
            <div>
              <p className="font-heading font-semibold text-sm text-white/90">
                {store?.name ?? "Unknown Store"}
              </p>
              {store && (
                <StoreTrustBadge
                  trustLevel={store.trustLevel}
                  trustScore={store.trustScore}
                  className="mt-0.5"
                />
              )}
            </div>
          </div>

          {/* Price + Score */}
          <div className="flex items-center gap-3">
            <PriceTag
              currentPrice={price.currentPrice}
              originalPrice={price.originalPrice}
              currency={price.currency}
              size="lg"
            />
            {price.discount > 0 && (
              <DiscountBadge discount={price.discount} />
            )}
            <button
              type="button"
              onClick={() => setBreakdownOpen(true)}
              className="cursor-pointer transition-opacity hover:opacity-80"
              aria-label="View deal score breakdown"
            >
              <DealScoreBadge score={price.dealScore} size="md" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => window.open(price.url, "_blank")}
          className={cn(
            "mt-5 inline-flex items-center gap-2",
            "px-5 py-2.5 rounded-lg",
            "bg-gradient-to-r from-gaming-orange to-gaming-coral",
            "text-white text-sm font-heading font-semibold",
            "hover:shadow-lg hover:shadow-gaming-orange/20",
            "transition-all duration-200"
          )}
        >
          Get This Deal
          <ArrowUpRight size={14} className="opacity-70" />
        </button>
      </div>

      <DealScoreBreakdownModal
        dealScore={price.dealScore}
        breakdown={defaultBreakdown}
        open={breakdownOpen}
        onOpenChange={setBreakdownOpen}
      />
    </motion.div>
  );
}

export { BestDealHighlight };
export type { BestDealHighlightProps };
