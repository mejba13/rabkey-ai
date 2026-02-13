"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Game } from "@/lib/types";
import { DealScoreBadge } from "./deal-score-badge";
import { DiscountBadge } from "./discount-badge";
import { PriceTag } from "./price-tag";
import { PlatformIcon } from "./platform-icon";
import { AddToWishlistButton } from "@/components/wishlist/add-to-wishlist-button";

interface GameCardProps {
  game: Game;
  className?: string;
}

function GameCard({ game, className }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-card/50 border border-border/30 backdrop-blur-sm",
        "hover:border-white/[0.08] transition-all duration-300",
        className
      )}
    >
      <Link href={`/game/${game.slug}`} className="block">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Subtle vignette — no heavy gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Deal Score — top right */}
          <div className="absolute top-2.5 right-2.5">
            <DealScoreBadge score={game.dealScore} size="sm" />
          </div>

          {/* Discount Badge — top left */}
          {game.isOnSale && game.discount > 0 && (
            <div className="absolute top-2.5 left-2.5">
              <DiscountBadge discount={game.discount} />
            </div>
          )}

          {/* Wishlist — bottom right of image */}
          <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <AddToWishlistButton gameId={game.id} />
          </div>
        </div>

        {/* Content section below image */}
        <div className="p-3 space-y-2">
          {/* Title */}
          <h3 className="font-heading font-semibold text-[13px] sm:text-sm text-white/90 line-clamp-1 group-hover:text-white transition-colors">
            {game.title}
          </h3>

          {/* Bottom row: platforms + price */}
          <div className="flex items-center justify-between gap-2">
            {/* Platform icons */}
            <div className="flex items-center gap-1.5">
              {game.metadata.platforms.map((platform) => (
                <PlatformIcon
                  key={platform}
                  platform={platform}
                  size={12}
                  className="text-white/30"
                />
              ))}
            </div>

            {/* Price */}
            <PriceTag
              currentPrice={game.bestPrice}
              originalPrice={
                game.isOnSale ? game.originalPrice : undefined
              }
              size="sm"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const MemoizedGameCard = memo(GameCard);
export { MemoizedGameCard as GameCard };
export type { GameCardProps };
