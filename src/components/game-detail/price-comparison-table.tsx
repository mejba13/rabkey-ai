"use client";

import { useMemo } from "react";
import { ExternalLink, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";
import type { Price, Store } from "@/lib/types";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  StoreTrustBadge,
  GamingButton,
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
      <div className={cn("rounded-xl border border-border bg-card p-8 text-center", className)}>
        <p className="text-muted-foreground">
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
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
              Store
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
              Price
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
              Discount
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
              Deal Score
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
              <Globe size={14} className="inline mr-1" />
              Region
            </TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">
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
                  "border-border transition-colors hover:bg-gaming-surface-elevated/50",
                  isBest &&
                    "border-l-4 border-l-gaming-orange bg-gaming-orange/5",
                )}
              >
                {/* Store */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gaming-surface-elevated text-xs font-bold text-muted-foreground">
                      {store?.name.charAt(0) ?? "?"}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
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
                    <span className="text-xs text-muted-foreground">--</span>
                  )}
                </TableCell>

                {/* Deal Score */}
                <TableCell>
                  <DealScoreBadge score={price.dealScore} size="sm" />
                </TableCell>

                {/* Region */}
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {price.region}
                  </span>
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <GamingButton
                    variant={isBest ? "primary" : "outline"}
                    size="sm"
                    onClick={() => window.open(price.url, "_blank")}
                  >
                    Get Deal
                    <ExternalLink size={12} />
                  </GamingButton>
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
