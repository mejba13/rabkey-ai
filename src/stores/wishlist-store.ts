"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  gameId: string;
  addedAt: string;
  targetPrice?: number;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (gameId: string, targetPrice?: number) => void;
  removeItem: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  getItem: (gameId: string) => WishlistItem | undefined;
  updateTargetPrice: (gameId: string, targetPrice: number) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (gameId, targetPrice) =>
        set((state) => {
          // Prevent duplicates
          if (state.items.some((item) => item.gameId === gameId)) {
            return state;
          }
          return {
            items: [
              ...state.items,
              {
                gameId,
                addedAt: new Date().toISOString(),
                targetPrice,
              },
            ],
          };
        }),

      removeItem: (gameId) =>
        set((state) => ({
          items: state.items.filter((item) => item.gameId !== gameId),
        })),

      isInWishlist: (gameId) =>
        get().items.some((item) => item.gameId === gameId),

      getItem: (gameId) =>
        get().items.find((item) => item.gameId === gameId),

      updateTargetPrice: (gameId, targetPrice) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.gameId === gameId ? { ...item, targetPrice } : item,
          ),
        })),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "grabkey-wishlist",
    },
  ),
);
