"use client";
import { useQuery } from "@tanstack/react-query";
import { mockStores } from "@/lib/mock-data";
import type { Store } from "@/lib/types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useStores() {
  return useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: async () => {
      await delay(200);
      return mockStores;
    },
  });
}
