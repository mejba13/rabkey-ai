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

  const currentVsLowPercent =
    currentPrice !== undefined && allTimeLow > 0
      ? Math.round(((currentPrice - allTimeLow) / allTimeLow) * 100)
      : undefined;

  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-3", className)}>
      {/* All-Time Low */}
      <div className="rounded-xl border border-gaming-teal/10 bg-gaming-teal/[0.03] p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="size-3.5 text-gaming-teal" />
          <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-white/35">
            All-Time Low
          </span>
        </div>
        <p className="font-heading text-xl font-bold text-gaming-teal">
          {formatPrice(allTimeLow)}
        </p>
        {currentVsLowPercent !== undefined && (
          <p className="mt-1 text-[11px] text-white/30">
            {currentVsLowPercent === 0
              ? "Currently at all-time low!"
              : `Current is ${currentVsLowPercent}% above low`}
          </p>
        )}
      </div>

      {/* All-Time High */}
      <div className="rounded-xl border border-gaming-coral/10 bg-gaming-coral/[0.03] p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="size-3.5 text-gaming-coral" />
          <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-white/35">
            All-Time High
          </span>
        </div>
        <p className="font-heading text-xl font-bold text-gaming-coral">
          {formatPrice(allTimeHigh)}
        </p>
      </div>

      {/* Average Price */}
      <div className="rounded-xl border border-gaming-blue/10 bg-gaming-blue/[0.03] p-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="size-3.5 text-gaming-blue" />
          <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-white/35">
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
