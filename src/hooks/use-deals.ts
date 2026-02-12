"use client";
import { useQuery } from "@tanstack/react-query";
import { mockDeals } from "@/lib/mock-data";
import type { Deal } from "@/lib/types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useDeals() {
  return useQuery<Deal[]>({
    queryKey: ["deals"],
    queryFn: async () => {
      await delay(400);
      return mockDeals;
    },
  });
}

export function useFeaturedDeals(limit = 8) {
  return useQuery<Deal[]>({
    queryKey: ["deals", "featured", limit],
    queryFn: async () => {
      await delay(400);
      const sorted = [...mockDeals].sort((a, b) => b.dealScore - a.dealScore);
      return sorted.slice(0, limit);
    },
  });
}
