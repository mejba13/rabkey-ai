"use client";

import { useMemo } from "react";
import { Globe, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";
import type { Price, Store } from "@/lib/types";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  StoreTrustBadge,
} from "@/components/gaming";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { StoreOfferCard } from "./store-offer-card";

interface PriceComparisonTableProps {
  prices: Price[];
  stores: Store[];
  className?: string;
}

function PriceComparisonTable({
  prices,
  stores,
  className,
}: PriceComparisonTableProps) {
  const isMobile = useIsMobile();

  const sortedPrices = useMemo(() => {
    return [...prices]
      .filter((p) => p.isAvailable)
      .sort((a, b) => b.dealScore - a.dealScore);
  }, [prices]);

  const bestPrice = sortedPrices.length > 0 ? sortedPrices[0] : null;

  const storeMap = useMemo(() => {
    const map = new Map<string, Store>();
    for (const store of stores) {
      map.set(store.id, store);
    }
    return map;
  }, [stores]);

  if (sortedPrices.length === 0) {
    return (
      <div className={cn("rounded-xl border border-border/30 bg-card/50 p-8 text-center", className)}>
        <p className="text-white/40 text-sm">
          No prices available for this edition.
        </p>
      </div>
    );
  }

  // Mobile: card layout
  if (isMobile) {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {sortedPrices.map((price) => (
          <StoreOfferCard
            key={price.id}
            price={price}
            store={storeMap.get(price.storeId)}
            isBestDeal={price.id === bestPrice?.id}
          />
        ))}
      </div>
    );
  }

  // Desktop: table layout
  return (
    <div className={cn("rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-white/[0.04] hover:bg-transparent">
            <TableHead className="text-[10px] uppercase tracking-wider text-white/30 font-heading">
              Store
            </TableHead>
            <TableHead className="text-[10px] uppercase tracking-wider text-white/30 font-heading">
              Price
            </TableHead>
            <TableHead className="text-[10px] uppercase tracking-wider text-white/30 font-heading">
              Discount
            </TableHead>
            <TableHead className="text-[10px] uppercase tracking-wider text-white/30 font-heading">
              Deal Score
            </TableHead>
            <TableHead className="text-[10px] uppercase tracking-wider text-white/30 font-heading">
              <Globe size={11} className="inline mr-1 opacity-60" />
              Region
            </TableHead>
            <TableHead className="text-right text-[10px] uppercase tracking-wider text-white/30 font-heading">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPrices.map((price) => {
            const store = storeMap.get(price.storeId);
            const isBest = price.id === bestPrice?.id;

            return (
              <TableRow
                key={price.id}
                className={cn(
                  "border-white/[0.03] transition-colors hover:bg-white/[0.02]",
                  isBest && "border-l-2 border-l-gaming-orange bg-gaming-orange/[0.03]",
                )}
              >
                {/* Store */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-bold font-heading text-white/50">
                      {store?.name.charAt(0) ?? "?"}
                    </div>
                    <div>
                      <p className="font-heading font-medium text-sm text-white/80">
                        {store?.name ?? "Unknown"}
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
                </TableCell>

                {/* Price */}
                <TableCell>
                  <PriceTag
                    currentPrice={price.currentPrice}
                    originalPrice={price.originalPrice}
                    currency={price.currency}
                    size="sm"
                  />
                </TableCell>

                {/* Discount */}
                <TableCell>
                  {price.discount > 0 ? (
                    <DiscountBadge discount={price.discount} />
                  ) : (
                    <span className="text-xs text-white/20">--</span>
                  )}
                </TableCell>

                {/* Deal Score */}
                <TableCell>
                  <DealScoreBadge score={price.dealScore} size="sm" />
                </TableCell>

                {/* Region */}
                <TableCell>
                  <span className="text-sm text-white/40">
                    {price.region}
                  </span>
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <button
                    type="button"
                    onClick={() => window.open(price.url, "_blank")}
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      "px-3.5 py-1.5 rounded-lg",
                      "text-xs font-heading font-semibold",
                      "transition-all duration-200",
                      isBest
                        ? "bg-gradient-to-r from-gaming-orange to-gaming-coral text-white hover:shadow-md hover:shadow-gaming-orange/20"
                        : "bg-white/[0.04] border border-white/[0.06] text-white/60 hover:bg-gaming-orange/10 hover:border-gaming-orange/20 hover:text-gaming-orange",
                    )}
                  >
                    Get Deal
                    <ArrowUpRight size={11} className="opacity-60" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export { PriceComparisonTable };
export type { PriceComparisonTableProps };
