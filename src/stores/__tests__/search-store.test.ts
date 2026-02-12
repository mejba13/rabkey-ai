import { describe, it, expect, beforeEach } from "vitest";
import { useSearchStore } from "../search-store";

describe("search store", () => {
  beforeEach(() => {
    useSearchStore.getState().resetFilters();
    useSearchStore.getState().setQuery("");
  });

  it("sets query", () => {
    useSearchStore.getState().setQuery("elden ring");
    expect(useSearchStore.getState().query).toBe("elden ring");
  });

  it("updates individual filter", () => {
    useSearchStore.getState().updateFilter({ onSaleOnly: true });
    expect(useSearchStore.getState().filters.onSaleOnly).toBe(true);
  });

  it("resets filters to defaults", () => {
    useSearchStore.getState().updateFilter({ onSaleOnly: true, sort: "price-asc" });
    useSearchStore.getState().resetFilters();
    expect(useSearchStore.getState().filters.onSaleOnly).toBe(false);
    expect(useSearchStore.getState().filters.sort).toBe("relevance");
  });

  it("sets view mode", () => {
    useSearchStore.getState().setViewMode("list");
    expect(useSearchStore.getState().viewMode).toBe("list");
  });
});
