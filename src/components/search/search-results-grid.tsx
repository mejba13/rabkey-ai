"use client";

import { motion } from "motion/react";
import { GameCard, GameCardSkeleton } from "@/components/gaming";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { Game } from "@/lib/types";

interface SearchResultsGridProps {
  games: Game[];
  isLoading?: boolean;
}

export function SearchResultsGrid({
  games,
  isLoading = false,
}: SearchResultsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      {games.map((game) => (
        <motion.div key={game.id} variants={staggerItem}>
          <GameCard game={game} />
        </motion.div>
      ))}
    </motion.div>
  );
}
