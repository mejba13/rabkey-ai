"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/formatters";
import { DealScoreBadge, PriceTag, DiscountBadge, PlatformIcon, GamingButton } from "@/components/gaming";
import { Badge } from "@/components/ui/badge";
import { fadeInUp } from "@/animations/variants";
import type { Deal, DealTag, Platform } from "@/lib/types";

const tagColorMap: Record<DealTag, string> = {
  "Flash Sale": "bg-gaming-coral text-white",
  "Historical Low": "bg-gaming-teal text-white",
  "Bundle Deal": "bg-gaming-purple text-white",
  "New Release": "bg-gaming-blue text-white",
  "Editor's Pick": "bg-gaming-gold text-black",
  "Trending": "bg-gaming-orange text-white",
  "Limited Time": "bg-gaming-pink text-white",
};

interface DealCardProps {
  deal: Deal;
  storeName?: string;
}

function DealCard({ deal, storeName }: DealCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "group flex flex-col sm:flex-row overflow-hidden rounded-xl",
        "border border-border bg-card",
        "transition-[border-color,box-shadow] duration-200",
        "hover:border-gaming-orange/30 hover:shadow-lg hover:shadow-gaming-orange/5"
      )}
    >
      {/* Cover image */}
      <div className="relative w-full sm:w-[200px] shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-full">
        <Image
          src={deal.coverImage}
          alt={deal.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 200px"
        />
        {/* Tag overlays */}
        {deal.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {deal.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                className={cn(
                  "rounded-md text-[10px] font-bold px-1.5 py-0.5 border-0",
                  tagColorMap[tag]
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="font-heading font-semibold text-lg line-clamp-1">
          {deal.title}
        </h3>

        {/* Store + platform row */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {storeName && <span>{storeName}</span>}
          {storeName && <span className="text-border">|</span>}
          <PlatformIcon platform={deal.platform as Platform} size={14} />
          <span className="capitalize text-xs">{deal.platform}</span>
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

        {/* Deal score + expiry + button row */}
        <div className="flex items-center gap-3 flex-wrap mt-auto">
          <DealScoreBadge score={deal.dealScore} size="md" />

          {deal.expiresAt && (
            <div className="flex items-center gap-1 text-gaming-coral text-sm">
              <Clock size={14} />
              <span>{formatRelativeTime(deal.expiresAt)}</span>
            </div>
          )}

          <div className="ml-auto">
            <GamingButton variant="primary" size="sm">
              <ExternalLink size={14} />
              Grab Deal
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
