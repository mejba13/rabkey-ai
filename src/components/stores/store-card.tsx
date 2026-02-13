"use client";

import { Globe, MessageSquare, Truck, MapPin, CreditCard, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoreTrustBadge, GamingButton } from "@/components/gaming";
import type { Store, TrustLevel } from "@/lib/types";

function formatReviewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
}

const trustColors: Record<TrustLevel, { bg: string; text: string; border: string }> = {
  excellent: { bg: "bg-gaming-teal/[0.07]", text: "text-gaming-teal", border: "border-gaming-teal/15" },
  good: { bg: "bg-gaming-orange/[0.07]", text: "text-gaming-orange", border: "border-gaming-orange/15" },
  average: { bg: "bg-yellow-400/[0.07]", text: "text-yellow-400", border: "border-yellow-400/15" },
  poor: { bg: "bg-gaming-pink/[0.07]", text: "text-gaming-pink", border: "border-gaming-pink/15" },
};

interface StoreCardProps {
  store: Store;
}

function StoreCard({ store }: StoreCardProps) {
  const initialLetter = store.name.charAt(0).toUpperCase();
  const colors = trustColors[store.trustLevel];

  return (
    <div
      className={cn(
        "group flex flex-col gap-4 p-5 rounded-xl",
        "bg-card/50 border border-border/30 backdrop-blur-sm",
        "hover:border-white/[0.08] transition-all duration-300"
      )}
    >
      {/* Header: logo + name + badges */}
      <div className="flex items-start gap-3">
        {/* Store initial */}
        <div
          className={cn(
            "flex items-center justify-center rounded-xl text-lg font-heading font-bold",
            "size-11 shrink-0",
            colors.bg,
            colors.text
          )}
        >
          {initialLetter}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading font-semibold text-base text-white/90 line-clamp-1">
              {store.name}
            </h3>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-md",
                "text-[9px] font-heading font-bold uppercase tracking-wide",
                "border",
                store.isOfficial
                  ? "bg-gaming-teal/[0.07] text-gaming-teal border-gaming-teal/15"
                  : "bg-yellow-400/[0.07] text-yellow-400 border-yellow-400/15"
              )}
            >
              {store.isOfficial ? "Official" : "Grey Market"}
            </span>
          </div>
          <div className="mt-1.5">
            <StoreTrustBadge
              trustLevel={store.trustLevel}
              trustScore={store.trustScore}
            />
          </div>
        </div>
      </div>

      {/* Stats grid (2x2) */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { icon: MessageSquare, value: formatReviewCount(store.totalReviews), label: "Reviews" },
          { icon: Truck, value: store.avgDeliveryTime, label: "" },
          { icon: MapPin, value: String(store.regionSupport.length), label: "Regions" },
          { icon: CreditCard, value: String(store.paymentMethods.length), label: "Payments" },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label || value} className="flex items-center gap-2 text-sm">
            <Icon size={13} className="text-white/20 shrink-0" />
            <div>
              <span className="font-heading font-semibold text-white/70 text-xs">
                {value}
              </span>
              {label && (
                <span className="text-white/25 text-[10px] ml-1 font-heading">{label}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-xs text-white/35 leading-relaxed line-clamp-2">
        {store.description}
      </p>

      {/* Visit Store */}
      <div className="mt-auto pt-1">
        <GamingButton variant="outline" size="sm" className="w-full group/btn">
          <Globe size={13} />
          Visit Store
          <ExternalLink
            size={10}
            className="ml-auto opacity-0 group-hover/btn:opacity-60 transition-opacity"
          />
        </GamingButton>
      </div>
    </div>
  );
}

export { StoreCard };
export type { StoreCardProps };
