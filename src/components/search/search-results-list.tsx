"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DealScoreBadge, PlatformIcon, PriceTag, DiscountBadge } from "@/components/gaming";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp } from "@/animations/variants";
import type { Game } from "@/lib/types";

interface SearchResultsListProps {
  games: Game[];
  isLoading?: boolean;
}

function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/30 bg-card/50 p-3">
      <Skeleton className="h-[60px] w-[96px] rounded-lg shrink-0 shimmer-skeleton" />
      <div className="flex-1 space-y-2 min-w-0">
        <Skeleton className="h-4 w-2/3 shimmer-skeleton" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded shimmer-skeleton" />
          <Skeleton className="h-3.5 w-3.5 rounded shimmer-skeleton" />
          <Skeleton className="h-3.5 w-3.5 rounded shimmer-skeleton" />
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Skeleton className="h-5 w-16 shimmer-skeleton" />
        <Skeleton className="h-5 w-10 rounded-lg shimmer-skeleton" />
      </div>
    </div>
  );
}

export function SearchResultsList({
  games,
  isLoading = false,
}: SearchResultsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <ListItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: index * 0.03 }}
        >
          <Link
            href={`/game/${game.slug}`}
            className={cn(
              "group flex items-center gap-4 rounded-xl p-3",
              "bg-card/50 border border-border/30 backdrop-blur-sm",
              "hover:border-white/[0.08] transition-all duration-300"
            )}
          >
            {/* Cover image */}
            <div className="relative h-[60px] w-[96px] shrink-0 overflow-hidden rounded-lg bg-white/[0.04]">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="96px"
              />
            </div>

            {/* Game info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="font-heading font-semibold text-sm text-white/90 truncate group-hover:text-white transition-colors">
                  {game.title}
                </h3>
                {game.isOnSale && game.discount > 0 && (
                  <DiscountBadge discount={game.discount} />
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {game.metadata.platforms.map((platform) => (
                  <PlatformIcon
                    key={platform}
                    platform={platform}
                    size={13}
                    className="text-white/25"
                  />
                ))}
                {game.metadata.genres.length > 0 && (
                  <>
                    <span className="h-0.5 w-0.5 rounded-full bg-white/15 mx-1" />
                    <span className="text-[11px] text-white/30 truncate font-heading">
                      {game.metadata.genres.slice(0, 3).join(", ")}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Price and deal score */}
            <div className="flex items-center gap-3 shrink-0">
              <PriceTag
                currentPrice={game.bestPrice}
                originalPrice={game.isOnSale ? game.originalPrice : undefined}
                size="sm"
              />
              <DealScoreBadge score={game.dealScore} size="sm" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
