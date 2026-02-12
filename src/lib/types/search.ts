import type { Platform, Genre } from "./game";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "deal-score" | "release-date" | "name-asc" | "name-desc";

export type ViewMode = "grid" | "list";

export interface SearchFilters {
  query: string;
  platforms: Platform[];
  genres: Genre[];
  priceMin?: number;
  priceMax?: number;
  storeIds: string[];
  region: string;
  onSaleOnly: boolean;
  minDealScore?: number;
  sort: SortOption;
}

export interface SearchResult {
  games: import("./game").Game[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
