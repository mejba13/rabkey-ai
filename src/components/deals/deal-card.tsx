"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/formatters";
import { DealScoreBadge, PriceTag, DiscountBadge, PlatformIcon, GamingButton } from "@/components/gaming";
import { fadeInUp } from "@/animations/variants";
import type { Deal, DealTag, Platform } from "@/lib/types";

const tagStyles: Record<DealTag, { bg: string; text: string }> = {
  "Flash Sale": { bg: "bg-gaming-coral/[0.1]", text: "text-gaming-coral" },
  "Historical Low": { bg: "bg-gaming-teal/[0.1]", text: "text-gaming-teal" },
  "Bundle Deal": { bg: "bg-gaming-purple/[0.1]", text: "text-gaming-purple" },
  "New Release": { bg: "bg-gaming-blue/[0.1]", text: "text-gaming-blue" },
  "Editor's Pick": { bg: "bg-gaming-gold/[0.1]", text: "text-gaming-gold" },
  "Trending": { bg: "bg-gaming-orange/[0.1]", text: "text-gaming-orange" },
  "Limited Time": { bg: "bg-gaming-pink/[0.1]", text: "text-gaming-pink" },
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
        y: -3,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className={cn(
        "group flex flex-col sm:flex-row overflow-hidden rounded-xl",
        "bg-card/50 border border-border/30 backdrop-blur-sm",
        "hover:border-white/[0.08] transition-all duration-300"
      )}
    >
      {/* Cover image */}
      <div className="relative w-full sm:w-[200px] shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-full overflow-hidden">
        <Image
          src={deal.coverImage}
          alt={deal.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/20" />

        {/* Tags */}
        {deal.tags.length > 0 && (
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            {deal.tags.slice(0, 2).map((tag) => {
              const style = tagStyles[tag];
              return (
                <span
                  key={tag}
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-md",
                    "text-[9px] font-heading font-bold uppercase tracking-wide",
                    "backdrop-blur-md border border-white/[0.06]",
                    style.bg,
                    style.text
                  )}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        {/* Title */}
        <h3 className="font-heading font-bold text-base sm:text-lg text-white/90 line-clamp-1 group-hover:text-white transition-colors">
          {deal.title}
        </h3>

        {/* Store + platform */}
        <div className="flex items-center gap-2 text-sm">
          {storeName && (
            <span className="text-white/35 font-heading text-xs">{storeName}</span>
          )}
          {storeName && <span className="h-0.5 w-0.5 rounded-full bg-white/15" />}
          <PlatformIcon platform={deal.platform as Platform} size={13} />
          <span className="capitalize text-xs text-white/30 font-heading">
            {deal.platform}
          </span>
        </div>

        {/* Price section */}
        <div className="flex items-center gap-3 flex-wrap">
          <PriceTag
            currentPrice={deal.currentPrice}
            originalPrice={deal.originalPrice}
            size="md"
          />
          {deal.discount > 0 && <DiscountBadge discount={deal.discount} />}
        </div>

        {/* Bottom row: score + expiry + CTA */}
        <div className="flex items-center gap-3 flex-wrap mt-auto pt-1">
          <DealScoreBadge score={deal.dealScore} size="md" />

          {deal.expiresAt && (
            <div className="flex items-center gap-1.5 text-gaming-coral/70 text-xs font-heading">
              <Clock size={12} />
              <span>{formatRelativeTime(deal.expiresAt)}</span>
            </div>
          )}

          <div className="ml-auto">
            <GamingButton
              variant="primary"
              size="sm"
              className="group/btn"
              onClick={() => window.open(deal.url, "_blank")}
            >
              Grab Deal
              <ExternalLink
                size={12}
                className="ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity"
              />
            </GamingButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const MemoizedDealCard = memo(DealCard);
export { MemoizedDealCard as DealCard };
export type { DealCardProps };
