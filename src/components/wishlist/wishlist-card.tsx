"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { X, Bell, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";
import { DealScoreBadge, PriceTag, PlatformIcon } from "@/components/gaming";
import { Input } from "@/components/ui/input";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Game } from "@/lib/types";
import type { WishlistItem } from "@/stores/wishlist-store";

interface WishlistCardProps {
  game: Game;
  wishlistItem: WishlistItem;
  className?: string;
}

function WishlistCard({ game, wishlistItem, className }: WishlistCardProps) {
  const removeItem = useWishlistStore((state) => state.removeItem);
  const updateTargetPrice = useWishlistStore(
    (state) => state.updateTargetPrice,
  );

  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState(
    wishlistItem.targetPrice?.toString() ?? "",
  );

  const priceTargetHit =
    wishlistItem.targetPrice !== undefined &&
    game.bestPrice <= wishlistItem.targetPrice;

  const handleTargetSubmit = () => {
    const parsed = parseFloat(targetInput);
    if (!isNaN(parsed) && parsed > 0) {
      updateTargetPrice(game.id, parsed);
    }
    setIsEditingTarget(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(game.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "group flex flex-col sm:flex-row overflow-hidden rounded-xl",
        "border border-border bg-card",
        "transition-[border-color,box-shadow] duration-200",
        "hover:border-gaming-orange/30 hover:shadow-lg hover:shadow-gaming-orange/5",
        priceTargetHit && "border-gaming-teal/50",
        className,
      )}
    >
      {/* Cover image */}
      <Link
        href={`/game/${game.slug}`}
        className="relative w-full sm:w-[180px] shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-full"
      >
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 180px"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Top row: title + remove button */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/game/${game.slug}`}>
              <h3 className="font-heading font-semibold text-lg line-clamp-1 hover:text-gaming-orange transition-colors">
                {game.title}
              </h3>
            </Link>
            {/* Platforms */}
            <div className="flex items-center gap-1.5 mt-1">
              {game.metadata.platforms.map((platform) => (
                <PlatformIcon
                  key={platform}
                  platform={platform}
                  size={14}
                  className="text-muted-foreground"
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleRemove}
            className="rounded-md p-1 text-muted-foreground hover:text-gaming-pink hover:bg-gaming-pink/10 transition-colors"
            aria-label="Remove from wishlist"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Price section */}
        <div className="flex items-center gap-3 flex-wrap">
          <PriceTag
            currentPrice={game.bestPrice}
            originalPrice={game.isOnSale ? game.originalPrice : undefined}
            size="md"
          />
          <DealScoreBadge score={game.dealScore} size="sm" />
        </div>

        {/* Target price + price hit alert */}
        <div className="flex items-center gap-3 flex-wrap mt-auto">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-muted-foreground" />
            {isEditingTarget ? (
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">$</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  onBlur={handleTargetSubmit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTargetSubmit();
                    if (e.key === "Escape") setIsEditingTarget(false);
                  }}
                  className="h-7 w-20 text-sm bg-gaming-surface border-border"
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  setTargetInput(
                    wishlistItem.targetPrice?.toString() ?? "",
                  );
                  setIsEditingTarget(true);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {wishlistItem.targetPrice !== undefined
                  ? `Target: ${formatPrice(wishlistItem.targetPrice)}`
                  : "Set target price"}
              </button>
            )}
          </div>

          {priceTargetHit && (
            <div className="flex items-center gap-1 text-gaming-teal text-sm font-semibold">
              <Bell className="size-4" />
              <span>Price Target Hit!</span>
            </div>
          )}

          <Link
            href={`/game/${game.slug}`}
            className="ml-auto text-sm text-gaming-orange hover:text-gaming-orange/80 font-medium transition-colors"
          >
            Compare Prices
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export { WishlistCard };
export type { WishlistCardProps };
