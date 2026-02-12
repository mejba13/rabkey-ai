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
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-gaming-surface border border-border",
        "hover:border-gaming-orange/50 hover:shadow-lg hover:shadow-gaming-orange/10",
        "transition-[border-color,box-shadow] duration-200",
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
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Deal Score - top right */}
          <div className="absolute top-2 right-2">
            <DealScoreBadge score={game.dealScore} size="sm" />
          </div>

          {/* Discount Badge + Wishlist - top left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {game.isOnSale && game.discount > 0 && (
              <DiscountBadge discount={game.discount} />
            )}
            <AddToWishlistButton gameId={game.id} />
          </div>

          {/* Bottom content over gradient */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-heading font-semibold text-white text-sm line-clamp-1 mb-1.5">
              {game.title}
            </h3>

            <div className="flex items-center justify-between">
              {/* Platform icons */}
              <div className="flex items-center gap-1.5">
                {game.metadata.platforms.map((platform) => (
                  <PlatformIcon
                    key={platform}
                    platform={platform}
                    size={14}
                    className="text-white/70"
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
        </div>
      </Link>
    </motion.div>
  );
}

const MemoizedGameCard = memo(GameCard);
export { MemoizedGameCard as GameCard };
export type { GameCardProps };
