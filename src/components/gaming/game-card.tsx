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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Deal Score - top right */}
          <div className="absolute top-2.5 right-2.5">
            <DealScoreBadge score={game.dealScore} size="sm" />
          </div>

          {/* Discount Badge + Wishlist - top left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
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
                    size={13}
                    className="text-white/50"
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
