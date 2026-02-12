"use client";

import { useSearchStore } from "@/stores/search-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortOption } from "@/lib/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price (Low)" },
  { value: "price-desc", label: "Price (High)" },
  { value: "deal-score", label: "Deal Score" },
  { value: "release-date", label: "Release Date" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export function SearchSortControls() {
  const { filters, updateFilter } = useSearchStore();

  return (
    <Select
      value={filters.sort}
      onValueChange={(value: string) =>
        updateFilter({ sort: value as SortOption })
      }
    >
      <SelectTrigger size="sm" className="w-[140px] bg-gaming-surface">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
