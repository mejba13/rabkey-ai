"use client";
import { create } from "zustand";
import type { SearchFilters, ViewMode } from "@/lib/types";

const defaultFilters: SearchFilters = {
  query: "",
  platforms: [],
  genres: [],
  storeIds: [],
  region: "US",
  onSaleOnly: false,
  sort: "relevance",
};

interface SearchState {
  query: string;
  filters: SearchFilters;
  viewMode: ViewMode;
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  updateFilter: (partial: Partial<SearchFilters>) => void;
  setViewMode: (mode: ViewMode) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  filters: { ...defaultFilters },
  viewMode: "grid",
  setQuery: (query) =>
    set((s) => ({ query, filters: { ...s.filters, query } })),
  setFilters: (filters) => set({ filters, query: filters.query }),
  updateFilter: (partial) =>
    set((s) => ({
      filters: { ...s.filters, ...partial },
      query: partial.query !== undefined ? partial.query : s.query,
    })),
  setViewMode: (viewMode) => set({ viewMode }),
  resetFilters: () => set({ query: "", filters: { ...defaultFilters } }),
}));
