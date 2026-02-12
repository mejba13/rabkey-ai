"use client";

import { useMemo } from "react";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { WishlistItem } from "@/stores/wishlist-store";
import { mockGames } from "@/lib/mock-data";
import type { Game } from "@/lib/types";

export interface WishlistItemWithGame {
  wishlistItem: WishlistItem;
  game: Game;
}

/**
 * Returns wishlist items enriched with game data, sorted by addedAt descending.
 */
export function useWishlist(): WishlistItemWithGame[] {
  const items = useWishlistStore((state) => state.items);

  return useMemo(() => {
    const enriched: WishlistItemWithGame[] = [];

    for (const item of items) {
      const game = mockGames.find((g) => g.id === item.gameId);
      if (game) {
        enriched.push({ wishlistItem: item, game });
      }
    }

    // Sort by addedAt descending (newest first)
    enriched.sort(
      (a, b) =>
        new Date(b.wishlistItem.addedAt).getTime() -
        new Date(a.wishlistItem.addedAt).getTime(),
    );

    return enriched;
  }, [items]);
}

/**
 * Returns wishlist action methods without subscribing to the full items array.
 */
export function useWishlistActions() {
  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const updateTargetPrice = useWishlistStore(
    (state) => state.updateTargetPrice,
  );

  return { addItem, removeItem, isInWishlist, updateTargetPrice };
}
