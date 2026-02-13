"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Price, Store } from "@/lib/types";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  StoreTrustBadge,
} from "@/components/gaming";

interface StoreOfferCardProps {
  price: Price;
  store?: Store;
  isBestDeal?: boolean;
  className?: string;
}

function StoreOfferCard({
  price,
  store,
  isBestDeal = false,
  className,
}: StoreOfferCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-colors",
        "bg-card/50 backdrop-blur-sm",
        isBestDeal
          ? "border-gaming-orange/20 bg-gaming-orange/[0.03]"
          : "border-border/30 hover:border-white/[0.08]",
        className,
      )}
    >
      {/* Store Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-bold font-heading text-white/50">
            {store?.name.charAt(0) ?? "?"}
          </div>
          <div>
            <p className="text-sm font-heading font-medium text-white/80">
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
        <DealScoreBadge score={price.dealScore} size="sm" />
      </div>

      {/* Price + Discount */}
      <div className="mt-3 flex items-center gap-3">
        <PriceTag
          currentPrice={price.currentPrice}
          originalPrice={price.originalPrice}
          currency={price.currency}
          size="lg"
        />
        {price.discount > 0 && <DiscountBadge discount={price.discount} />}
      </div>

      {/* Region */}
      <p className="mt-2 text-xs text-white/30 font-heading">
        Region: <span className="text-white/50">{price.region}</span>
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={() => window.open(price.url, "_blank")}
        className={cn(
          "mt-3 w-full inline-flex items-center justify-center gap-1.5",
          "px-4 py-2.5 rounded-lg",
          "text-sm font-heading font-semibold",
          "transition-all duration-200",
          isBestDeal
            ? "bg-gradient-to-r from-gaming-orange to-gaming-coral text-white"
            : "bg-white/[0.04] border border-white/[0.06] text-white/60 hover:bg-gaming-orange/10 hover:border-gaming-orange/20 hover:text-gaming-orange",
        )}
      >
        Get Deal
        <ArrowUpRight size={13} className="opacity-60" />
      </button>
    </div>
  );
}

export { StoreOfferCard };
export type { StoreOfferCardProps };
