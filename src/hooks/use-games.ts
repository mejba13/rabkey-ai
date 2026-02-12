"use client";
import { useQuery } from "@tanstack/react-query";
import { mockGames, mockPrices } from "@/lib/mock-data";
import type { Game, SearchFilters, SearchResult, Price } from "@/lib/types";
import { MAX_RESULTS_PER_PAGE } from "@/lib/constants";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function filterGames(
  games: Game[],
  filters: SearchFilters,
  prices: Price[],
): Game[] {
  return games.filter((game) => {
    // Query filter — case-insensitive title match
    if (
      filters.query &&
      !game.title.toLowerCase().includes(filters.query.toLowerCase())
    ) {
      return false;
    }

    // Platform filter — intersection check
    if (
      filters.platforms.length > 0 &&
      !filters.platforms.some((p) => game.metadata.platforms.includes(p))
    ) {
      return false;
    }

    // Genre filter — intersection check
    if (
      filters.genres.length > 0 &&
      !filters.genres.some((g) => game.metadata.genres.includes(g))
    ) {
      return false;
    }

    // Price min/max — based on bestPrice
    if (filters.priceMin !== undefined && game.bestPrice < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && game.bestPrice > filters.priceMax) {
      return false;
    }

    // Store filter — check if any mockPrice for this game matches the store
    if (filters.storeIds.length > 0) {
      const gamePrices = prices.filter((p) => p.gameId === game.id);
      const hasMatchingStore = gamePrices.some((p) =>
        filters.storeIds.includes(p.storeId),
      );
      if (!hasMatchingStore) {
        return false;
      }
    }

    // On-sale-only filter
    if (filters.onSaleOnly && !game.isOnSale) {
      return false;
    }

    // Minimum deal score filter
    if (
      filters.minDealScore !== undefined &&
      game.dealScore < filters.minDealScore
    ) {
      return false;
    }

    return true;
  });
}

function sortGames(games: Game[], sort: SearchFilters["sort"]): Game[] {
  const sorted = [...games];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.bestPrice - b.bestPrice);
    case "price-desc":
      return sorted.sort((a, b) => b.bestPrice - a.bestPrice);
    case "deal-score":
      return sorted.sort((a, b) => b.dealScore - a.dealScore);
    case "release-date":
      return sorted.sort(
        (a, b) =>
          new Date(b.metadata.releaseDate).getTime() -
          new Date(a.metadata.releaseDate).getTime(),
      );
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "relevance":
    default:
      // For relevance, prioritise deal score as a proxy
      return sorted.sort((a, b) => b.dealScore - a.dealScore);
  }
}

export function useSearchGames(filters: SearchFilters, page: number) {
  return useQuery<SearchResult>({
    queryKey: ["games", "search", filters, page],
    queryFn: async () => {
      await delay(400);

      const filtered = filterGames(mockGames, filters, mockPrices);
      const sorted = sortGames(filtered, filters.sort);

      const totalCount = sorted.length;
      const start = (page - 1) * MAX_RESULTS_PER_PAGE;
      const end = start + MAX_RESULTS_PER_PAGE;
      const paginatedGames = sorted.slice(start, end);

      return {
        games: paginatedGames,
        totalCount,
        page,
        pageSize: MAX_RESULTS_PER_PAGE,
        hasMore: end < totalCount,
      };
    },
  });
}

export function useGame(slug: string) {
  return useQuery<Game | undefined>({
    queryKey: ["game", slug],
    queryFn: async () => {
      await delay(200);
      return mockGames.find((g) => g.slug === slug);
    },
  });
}

export function useGamePrices(gameId: string) {
  return useQuery<Price[]>({
    queryKey: ["game-prices", gameId],
    queryFn: async () => {
      await delay(300);
      return mockPrices.filter((p) => p.gameId === gameId);
    },
  });
}
