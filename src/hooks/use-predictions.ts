"use client";
import { useQuery } from "@tanstack/react-query";
import { mockPredictions } from "@/lib/mock-data";
import type { PricePrediction } from "@/lib/types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function usePrediction(gameId: string) {
  return useQuery<PricePrediction | undefined>({
    queryKey: ["prediction", gameId],
    queryFn: async () => {
      await delay(300);
      return mockPredictions.find((p) => p.gameId === gameId);
    },
    enabled: !!gameId,
  });
}
