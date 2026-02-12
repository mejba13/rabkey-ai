"use client";

import { TrendingDown, TrendingUp, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";
import type { PriceHistory } from "@/lib/types";

interface PriceStatsCardsProps {
  priceHistory: PriceHistory;
  currentPrice?: number;
  className?: string;
}

function PriceStatsCards({
  priceHistory,
  currentPrice,
  className,
}: PriceStatsCardsProps) {
  const { allTimeLow, allTimeHigh, averagePrice } = priceHistory;

  // Calculate how close the current price is to the all-time low
  const currentVsLowPercent =
    currentPrice !== undefined && allTimeLow > 0
      ? Math.round(((currentPrice - allTimeLow) / allTimeLow) * 100)
      : undefined;

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3", className)}>
      {/* All-Time Low */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <TrendingDown className="size-4 text-gaming-teal" />
          <span className="text-xs font-medium uppercase tracking-wide">
            All-Time Low
          </span>
        </div>
        <p className="font-heading text-xl font-bold text-gaming-teal">
          {formatPrice(allTimeLow)}
        </p>
        {currentVsLowPercent !== undefined && (
          <p className="mt-1 text-xs text-muted-foreground">
            {currentVsLowPercent === 0
              ? "Currently at all-time low!"
              : `Current is ${currentVsLowPercent}% above low`}
          </p>
        )}
      </div>

      {/* All-Time High */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <TrendingUp className="size-4 text-gaming-coral" />
          <span className="text-xs font-medium uppercase tracking-wide">
            All-Time High
          </span>
        </div>
        <p className="font-heading text-xl font-bold text-gaming-coral">
          {formatPrice(allTimeHigh)}
        </p>
      </div>

      {/* Average Price */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <BarChart3 className="size-4 text-gaming-blue" />
          <span className="text-xs font-medium uppercase tracking-wide">
            Average Price
          </span>
        </div>
        <p className="font-heading text-xl font-bold text-gaming-blue">
          {formatPrice(averagePrice)}
        </p>
      </div>
    </div>
  );
}

export { PriceStatsCards };
export type { PriceStatsCardsProps };
