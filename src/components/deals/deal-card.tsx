"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/formatters";
import { DealScoreBadge, PriceTag, DiscountBadge, PlatformIcon } from "@/components/gaming";
import { fadeInUp } from "@/animations/variants";
import type { Deal, DealTag, Platform } from "@/lib/types";

const tagStyles: Record<DealTag, { bg: string; text: string; border: string }> = {
  "Flash Sale": { bg: "bg-gaming-coral/[0.08]", text: "text-gaming-coral", border: "border-gaming-coral/15" },
  "Historical Low": { bg: "bg-gaming-teal/[0.08]", text: "text-gaming-teal", border: "border-gaming-teal/15" },
  "Bundle Deal": { bg: "bg-gaming-purple/[0.08]", text: "text-gaming-purple", border: "border-gaming-purple/15" },
  "New Release": { bg: "bg-gaming-blue/[0.08]", text: "text-gaming-blue", border: "border-gaming-blue/15" },
  "Editor's Pick": { bg: "bg-gaming-gold/[0.08]", text: "text-gaming-gold", border: "border-gaming-gold/15" },
  "Trending": { bg: "bg-gaming-orange/[0.08]", text: "text-gaming-orange", border: "border-gaming-orange/15" },
  "Limited Time": { bg: "bg-gaming-pink/[0.08]", text: "text-gaming-pink", border: "border-gaming-pink/15" },
};

interface DealCardProps {
  deal: Deal;
  storeName?: string;
}

function DealCard({ deal, storeName }: DealCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
      className={cn(
        "group flex flex-col sm:flex-row overflow-hidden rounded-xl",
        "bg-card/50 border border-border/30 backdrop-blur-sm",
        "hover:border-white/[0.08] transition-all duration-300"
      )}
    >
      {/* Cover image */}
      <div className="relative w-full sm:w-[240px] shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-full overflow-hidden">
        <Image
          src={deal.coverImage}
          alt={deal.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 240px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-black/30" />

        {/* Discount badge on image */}
        {deal.discount > 0 && (
          <div className="absolute top-3 left-3">
            <DiscountBadge discount={deal.discount} />
          </div>
        )}

        {/* Score badge on image */}
        <div className="absolute top-3 right-3 sm:hidden">
          <DealScoreBadge score={deal.dealScore} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
        {/* Top row: Tags + Score */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Tags */}
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            {deal.tags.slice(0, 2).map((tag) => {
              const style = tagStyles[tag];
              return (
                <span
                  key={tag}
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-md shrink-0",
                    "text-[9px] font-heading font-bold uppercase tracking-wide",
                    "border",
                    style.bg,
                    style.text,
                    style.border
                  )}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Score - desktop only */}
          <div className="hidden sm:block shrink-0">
            <DealScoreBadge score={deal.dealScore} size="sm" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-[15px] sm:text-base text-white/90 line-clamp-1 group-hover:text-white transition-colors mb-1.5">
          {deal.title}
        </h3>

        {/* Store + Platform */}
        <div className="flex items-center gap-2 mb-3">
          {storeName && (
            <span className="text-white/40 font-heading text-xs">{storeName}</span>
          )}
          {storeName && <span className="h-0.5 w-0.5 rounded-full bg-white/15" />}
          <PlatformIcon platform={deal.platform as Platform} size={12} className="text-white/25" />
          <span className="capitalize text-[11px] text-white/25 font-heading">
            {deal.platform}
          </span>
        </div>

        {/* Price section — hero element */}
        <div className="flex items-baseline gap-2.5 mb-4">
          <PriceTag
            currentPrice={deal.currentPrice}
            originalPrice={deal.originalPrice}
            size="lg"
          />
        </div>

        {/* Bottom row: Expiry + CTA */}
        <div className="flex items-center gap-3 mt-auto">
          {deal.expiresAt && (
            <div className="flex items-center gap-1.5 text-white/30 text-[11px] font-heading">
              <Clock size={11} className="text-white/20" />
              <span>{formatRelativeTime(deal.expiresAt)}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => window.open(deal.url, "_blank")}
            className={cn(
              "ml-auto inline-flex items-center gap-1.5",
              "px-4 py-2 rounded-lg",
              "bg-white/[0.06] border border-white/[0.06]",
              "text-xs font-heading font-semibold text-white/70",
              "hover:bg-gaming-orange/15 hover:border-gaming-orange/25 hover:text-gaming-orange",
              "transition-all duration-200"
            )}
          >
            Grab Deal
            <ArrowUpRight
              size={12}
              className="opacity-50 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const MemoizedDealCard = memo(DealCard);
export { MemoizedDealCard as DealCard };
export type { DealCardProps };
