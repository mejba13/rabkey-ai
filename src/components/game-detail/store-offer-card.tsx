"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Price, Store } from "@/lib/types";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  StoreTrustBadge,
  GamingButton,
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
        "rounded-xl border border-border bg-card p-4 transition-colors hover:bg-gaming-surface-elevated/50",
        isBestDeal && "border-gaming-orange/50 bg-gaming-orange/5",
        className,
      )}
    >
      {/* Store Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gaming-surface-elevated text-xs font-bold text-muted-foreground">
            {store?.name.charAt(0) ?? "?"}
          </div>
          <div>
            <p className="text-sm font-medium">{store?.name ?? "Unknown Store"}</p>
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
      <p className="mt-2 text-xs text-muted-foreground">
        Region: {price.region}
      </p>

      {/* CTA */}
      <GamingButton
        variant={isBestDeal ? "primary" : "outline"}
        size="md"
        className="mt-3 w-full"
        onClick={() => window.open(price.url, "_blank")}
      >
        Get Deal
        <ExternalLink size={14} />
      </GamingButton>
    </div>
  );
}

export { StoreOfferCard };
export type { StoreOfferCardProps };
