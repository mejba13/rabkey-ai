"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DealScoreBadge, PlatformIcon, PriceTag } from "@/components/gaming";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInUp } from "@/animations/variants";
import type { Game } from "@/lib/types";

interface SearchResultsListProps {
  games: Game[];
  isLoading?: boolean;
}

function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-gaming-surface p-3">
      <Skeleton className="h-[60px] w-[80px] rounded-lg shrink-0 shimmer-skeleton" />
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
    <div className="space-y-3">
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
              "group flex items-center gap-4 rounded-xl border border-border bg-gaming-surface p-3",
              "hover:border-gaming-orange/50 hover:shadow-lg hover:shadow-gaming-orange/5",
              "transition-all duration-200"
            )}
          >
            {/* Cover image */}
            <div className="relative h-[60px] w-[80px] shrink-0 overflow-hidden rounded-lg bg-gaming-surface-elevated">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="80px"
              />
            </div>

            {/* Game info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-sm text-foreground truncate group-hover:text-gaming-orange transition-colors">
                {game.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                {game.metadata.platforms.map((platform) => (
                  <PlatformIcon
                    key={platform}
                    platform={platform}
                    size={14}
                    className="text-muted-foreground"
                  />
                ))}
                {game.metadata.genres.length > 0 && (
                  <>
                    <span className="text-border mx-1">|</span>
                    <span className="text-xs text-muted-foreground truncate">
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
