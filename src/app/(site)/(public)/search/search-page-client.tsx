"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText, EmptyState } from "@/components/shared";
import { SearchBar } from "@/components/search/search-bar";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchResultsGrid } from "@/components/search/search-results-grid";
import { SearchResultsList } from "@/components/search/search-results-list";
import { SearchSortControls } from "@/components/search/search-sort-controls";
import { ViewToggle } from "@/components/search/view-toggle";
import { useSearchStore } from "@/stores/search-store";
import { useSearchGames } from "@/hooks/use-games";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useIsMobile } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Game } from "@/lib/types";

export function SearchPageClient() {
  const { filters, viewMode } = useSearchStore();
  const [page, setPage] = useState(1);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const isMobile = useIsMobile();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data, isLoading, isFetching } = useSearchGames(filters, page);

  const hasMore = data?.hasMore ?? false;
  const totalCount = data?.totalCount ?? 0;

  if (data && page === 1 && data.games !== allGames) {
    if (allGames.length === 0 || allGames[0]?.id !== data.games[0]?.id) {
      setAllGames(data.games);
    }
  }
  if (data && page > 1 && data.page === page) {
    const lastAccumulated = allGames[allGames.length - 1]?.id;
    const lastNew = data.games[data.games.length - 1]?.id;
    if (lastAccumulated !== lastNew && data.games.length > 0) {
      setAllGames((prev) => [...prev, ...data.games]);
    }
  }

  const handleLoadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  const infiniteScrollRef = useInfiniteScroll(handleLoadMore);

  const currentFiltersKey = JSON.stringify(filters);
  const [prevFiltersKey, setPrevFiltersKey] = useState(currentFiltersKey);
  if (currentFiltersKey !== prevFiltersKey) {
    setPrevFiltersKey(currentFiltersKey);
    setPage(1);
    setAllGames([]);
  }

  const displayGames = page === 1 ? (data?.games ?? []) : allGames;
  const showEmpty = !isLoading && displayGames.length === 0;
  const showResults = displayGames.length > 0;

  return (
    <PageContainer className="py-12 md:py-16 lg:py-20">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 lg:mb-16"
      >
        <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-orange/80 mb-4">
          Search
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
          Find Your{" "}
          <GradientText variant="primary">Best Price</GradientText>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto text-base lg:text-lg leading-relaxed">
          Compare prices from 50+ stores and find the best deals
        </p>
      </motion.div>

      {/* ── Search Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <SearchBar />
      </motion.div>

      {/* ── Toolbar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={cn(
          "flex items-center justify-between gap-3 flex-wrap mb-8",
          "p-3 rounded-xl",
          "bg-white/[0.02] border border-white/[0.05]"
        )}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {isMobile ? (
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full",
                    "bg-white/[0.04] border border-white/[0.06]",
                    "text-xs font-heading font-semibold text-white/50",
                    "hover:text-white/70 hover:bg-white/[0.06]",
                    "transition-all duration-200"
                  )}
                >
                  <SlidersHorizontal className="size-3.5" />
                  Filters
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search results
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 pb-4">
                  <SearchFilters
                    layout="vertical"
                    onApply={() => setFiltersOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <SearchFilters layout="horizontal" />
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isLoading && totalCount > 0 && (
            <span className="text-xs text-white/30 hidden sm:block font-heading">
              {totalCount} {totalCount === 1 ? "result" : "results"}
            </span>
          )}

          <SearchSortControls />
          <ViewToggle />
        </div>
      </motion.div>

      {/* ── Results ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {showResults && viewMode === "grid" && (
          <SearchResultsGrid games={displayGames} isLoading={false} />
        )}

        {showResults && viewMode === "list" && (
          <SearchResultsList games={displayGames} isLoading={false} />
        )}

        {isLoading && viewMode === "grid" && (
          <SearchResultsGrid games={[]} isLoading />
        )}

        {isLoading && viewMode === "list" && (
          <SearchResultsList games={[]} isLoading />
        )}

        {/* Loading more */}
        {isFetching && !isLoading && (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gaming-orange border-t-transparent" />
          </div>
        )}

        {hasMore && <div ref={infiniteScrollRef} className="h-1" />}

        {showEmpty && (
          <EmptyState
            icon={<Search />}
            title="No games found"
            description="Try adjusting your search query or filters to find what you're looking for."
            action={
              <Button
                variant="outline"
                onClick={() => useSearchStore.getState().resetFilters()}
              >
                Reset Filters
              </Button>
            }
          />
        )}
      </motion.div>
    </PageContainer>
  );
}
