"use client";
import { useQuery } from "@tanstack/react-query";
import { mockPriceHistories } from "@/lib/mock-data";
import type { PriceHistory } from "@/lib/types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function usePriceHistory(gameId: string) {
  return useQuery<PriceHistory | undefined>({
    queryKey: ["price-history", gameId],
    queryFn: async () => {
      await delay(300);
      return mockPriceHistories.find((ph) => ph.gameId === gameId);
    },
  });
}
