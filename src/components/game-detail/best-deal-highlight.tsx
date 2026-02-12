"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/animations/variants";
import type { Price, Store, DealScoreBreakdown } from "@/lib/types";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  StoreTrustBadge,
  GamingButton,
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
        "rounded-xl border border-gaming-orange/50 bg-gaming-surface-elevated p-6 glow-orange",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Star size={18} className="text-gaming-gold fill-gaming-gold" />
        <h2 className="font-heading text-lg font-bold">Best Deal</h2>
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Store Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gaming-surface text-sm font-bold text-gaming-orange">
            {store?.name.charAt(0) ?? "?"}
          </div>
          <div>
            <p className="font-heading font-semibold">
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
        <div className="flex items-center gap-4">
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
      <GamingButton
        variant="primary"
        size="lg"
        className="mt-5 w-full sm:w-auto"
        onClick={() => window.open(price.url, "_blank")}
      >
        Get This Deal
        <ExternalLink size={16} />
      </GamingButton>

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
