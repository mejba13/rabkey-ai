"use client";

import { Globe, MessageSquare, Truck, MapPin, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/shared";
import { StoreTrustBadge, GamingButton } from "@/components/gaming";
import { Badge } from "@/components/ui/badge";
import type { Store, TrustLevel } from "@/lib/types";

function getGlowColor(trustLevel: TrustLevel) {
  if (trustLevel === "excellent") return "teal" as const;
  if (trustLevel === "good") return "orange" as const;
  return undefined;
}

function formatReviewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
}

interface StoreCardProps {
  store: Store;
}

function StoreCard({ store }: StoreCardProps) {
  const initialLetter = store.name.charAt(0).toUpperCase();
  const glowColor = getGlowColor(store.trustLevel);

  return (
    <GlowCard glowColor={glowColor} className="flex flex-col gap-4">
      {/* Header: logo + name + badges */}
      <div className="flex items-start gap-3">
        {/* Store initial */}
        <div
          className={cn(
            "flex items-center justify-center rounded-lg text-xl font-heading font-bold",
            "size-12 shrink-0",
            store.trustLevel === "excellent" && "bg-gaming-teal/15 text-gaming-teal",
            store.trustLevel === "good" && "bg-gaming-orange/15 text-gaming-orange",
            store.trustLevel === "average" && "bg-yellow-400/15 text-yellow-400",
            store.trustLevel === "poor" && "bg-gaming-pink/15 text-gaming-pink"
          )}
        >
          {initialLetter}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading font-semibold text-lg line-clamp-1">
              {store.name}
            </h3>
            <Badge
              className={cn(
                "text-[10px] font-bold border-0",
                store.isOfficial
                  ? "bg-gaming-teal/15 text-gaming-teal"
                  : "bg-yellow-400/15 text-yellow-400"
              )}
            >
              {store.isOfficial ? "Official" : "Grey Market"}
            </Badge>
          </div>
          <div className="mt-1">
            <StoreTrustBadge
              trustLevel={store.trustLevel}
              trustScore={store.trustScore}
            />
          </div>
        </div>
      </div>

      {/* Stats grid (2x2) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm">
          <MessageSquare size={14} className="text-muted-foreground shrink-0" />
          <div>
            <span className="font-heading font-semibold text-foreground">
              {formatReviewCount(store.totalReviews)}
            </span>
            <span className="text-muted-foreground text-xs ml-1">Reviews</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Truck size={14} className="text-muted-foreground shrink-0" />
          <div>
            <span className="font-heading font-semibold text-foreground">
              {store.avgDeliveryTime}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-muted-foreground shrink-0" />
          <div>
            <span className="font-heading font-semibold text-foreground">
              {store.regionSupport.length}
            </span>
            <span className="text-muted-foreground text-xs ml-1">Regions</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CreditCard size={14} className="text-muted-foreground shrink-0" />
          <div>
            <span className="font-heading font-semibold text-foreground">
              {store.paymentMethods.length}
            </span>
            <span className="text-muted-foreground text-xs ml-1">Payments</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2">
        {store.description}
      </p>

      {/* Visit Store button */}
      <div className="mt-auto pt-1">
        <GamingButton variant="outline" size="sm" className="w-full">
          <Globe size={14} />
          Visit Store
        </GamingButton>
      </div>
    </GlowCard>
  );
}

export { StoreCard };
export type { StoreCardProps };
