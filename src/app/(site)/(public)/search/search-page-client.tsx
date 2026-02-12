"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared";
import { EmptyState } from "@/components/shared";
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
import { fadeInUp } from "@/animations/variants";
import type { Game } from "@/lib/types";

export function SearchPageClient() {
  const { filters, viewMode } = useSearchStore();
  const [page, setPage] = useState(1);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const isMobile = useIsMobile();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data, isLoading, isFetching } = useSearchGames(filters, page);

  // Accumulate games across pages
  const hasMore = data?.hasMore ?? false;
  const totalCount = data?.totalCount ?? 0;

  // When page 1 data arrives, reset accumulated games
  // When subsequent pages arrive, append
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

  // Reset page when filters change
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
    <PageContainer className="py-8 md:py-12">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Page heading */}
        <SectionHeading
          title="Search Games"
          subtitle="Compare prices from 50+ stores and find the best deals"
        />

        {/* Search bar */}
        <SearchBar />

        {/* Toolbar: filters, sort, view toggle */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Mobile: Sheet trigger for filters */}
            {isMobile ? (
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 shrink-0"
                  >
                    <SlidersHorizontal className="size-4" />
                    Filters
                  </Button>
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
            {/* Result count */}
            {!isLoading && totalCount > 0 && (
              <span className="text-sm text-muted-foreground hidden sm:block">
                {totalCount} {totalCount === 1 ? "result" : "results"}
              </span>
            )}

            <SearchSortControls />
            <ViewToggle />
          </div>
        </div>

        {/* Results */}
        {showResults && viewMode === "grid" && (
          <SearchResultsGrid games={displayGames} isLoading={false} />
        )}

        {showResults && viewMode === "list" && (
          <SearchResultsList games={displayGames} isLoading={false} />
        )}

        {/* Loading skeletons */}
        {isLoading && viewMode === "grid" && (
          <SearchResultsGrid games={[]} isLoading />
        )}

        {isLoading && viewMode === "list" && (
          <SearchResultsList games={[]} isLoading />
        )}

        {/* Loading more indicator */}
        {isFetching && !isLoading && (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gaming-orange border-t-transparent" />
          </div>
        )}

        {/* Infinite scroll trigger */}
        {hasMore && <div ref={infiniteScrollRef} className="h-1" />}

        {/* Empty state */}
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
