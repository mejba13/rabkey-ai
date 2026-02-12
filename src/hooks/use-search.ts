"use client";
import { useQuery } from "@tanstack/react-query";
import { mockGames } from "@/lib/mock-data";
import type { Game } from "@/lib/types";
import { useDebounce } from "./use-debounce";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useSearchAutocomplete(query: string) {
  const debouncedQuery = useDebounce(query, 200);

  return useQuery<Game[]>({
    queryKey: ["search-autocomplete", debouncedQuery],
    queryFn: async () => {
      await delay(150);

      const lowerQuery = debouncedQuery.toLowerCase();
      return mockGames
        .filter((game) => game.title.toLowerCase().includes(lowerQuery))
        .slice(0, 8);
    },
    enabled: debouncedQuery.length >= 2,
  });
}
