"use client";

import { useState, useMemo } from "react";
import { Heart, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading, EmptyState } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { WishlistCard, BudgetTracker } from "@/components/wishlist";
import { useWishlist } from "@/hooks/use-wishlist";
import type { WishlistItemWithGame } from "@/hooks/use-wishlist";

type SortOption = "date" | "price" | "deal-score";

const sortLabels: Record<SortOption, string> = {
  date: "Date Added",
  price: "Price",
  "deal-score": "Deal Score",
};

function sortItems(
  items: WishlistItemWithGame[],
  sort: SortOption,
): WishlistItemWithGame[] {
  const sorted = [...items];
  switch (sort) {
    case "date":
      return sorted.sort(
        (a, b) =>
          new Date(b.wishlistItem.addedAt).getTime() -
          new Date(a.wishlistItem.addedAt).getTime(),
      );
    case "price":
      return sorted.sort((a, b) => a.game.bestPrice - b.game.bestPrice);
    case "deal-score":
      return sorted.sort((a, b) => b.game.dealScore - a.game.dealScore);
    default:
      return sorted;
  }
}

export default function WishlistPage() {
  const wishlistItems = useWishlist();
  const [sortBy, setSortBy] = useState<SortOption>("date");

  const sortedItems = useMemo(
    () => sortItems(wishlistItems, sortBy),
    [wishlistItems, sortBy],
  );

  return (
    <PageContainer className="py-10 pb-20">
      <SectionHeading
        title="My Wishlist"
        subtitle={
          wishlistItems.length > 0
            ? `${wishlistItems.length} game${wishlistItems.length === 1 ? "" : "s"} tracked`
            : undefined
        }
      />

      {wishlistItems.length === 0 ? (
        <EmptyState
          icon={<Heart />}
          title="Your wishlist is empty"
          description="Start adding games to your wishlist to track prices and get notified about deals."
          action={
            <Link href="/search">
              <GamingButton variant="primary" size="md">
                <Search className="size-4" />
                Browse Games
              </GamingButton>
            </Link>
          }
          className="mt-12"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content: sorted wishlist cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Sort controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="flex gap-1 rounded-lg bg-gaming-surface p-1">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`rounded-md px-3 py-1.5 text-xs font-heading font-semibold transition-colors ${
                      sortBy === key
                        ? "bg-gaming-surface-elevated text-gaming-orange"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            </div>

            {/* Wishlist cards */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {sortedItems.map(({ game, wishlistItem }) => (
                  <motion.div key={game.id} variants={staggerItem}>
                    <WishlistCard game={game} wishlistItem={wishlistItem} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Sidebar: budget tracker */}
          <div>
            <BudgetTracker className="sticky top-24" />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
