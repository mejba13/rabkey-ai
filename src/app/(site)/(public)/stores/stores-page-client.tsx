"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Store } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading, EmptyState } from "@/components/shared";
import { StoresGrid } from "@/components/stores/stores-grid";
import { useStores } from "@/hooks/use-stores";
import { Input } from "@/components/ui/input";
import { fadeInUp } from "@/animations/variants";
import { cn } from "@/lib/utils";

type StoreFilter = "all" | "official" | "grey";

export function StoresPageClient() {
  const { data: stores, isLoading } = useStores();

  const [searchQuery, setSearchQuery] = useState("");
  const [storeFilter, setStoreFilter] = useState<StoreFilter>("all");

  const filteredStores = useMemo(() => {
    if (!stores) return [];

    return stores.filter((store) => {
      // Search filter
      if (
        searchQuery &&
        !store.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Official / grey market filter
      if (storeFilter === "official" && !store.isOfficial) return false;
      if (storeFilter === "grey" && store.isOfficial) return false;

      return true;
    });
  }, [stores, searchQuery, storeFilter]);

  const showEmpty = !isLoading && filteredStores.length === 0;

  const filterOptions: { value: StoreFilter; label: string }[] = [
    { value: "all", label: "All Stores" },
    { value: "official", label: "Official" },
    { value: "grey", label: "Grey Market" },
  ];

  return (
    <PageContainer className="py-8 md:py-12">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <SectionHeading
          title="Game Key Stores"
          subtitle="Compare 50+ stores with trust scores, reviews, and delivery times"
        />

        {/* Search + filter controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search input */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Search stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          {/* Toggle: all / official / grey market */}
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            {filterOptions.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setStoreFilter(value)}
                className={cn(
                  "px-3 py-1.5 text-xs font-heading font-medium transition-colors",
                  storeFilter === value
                    ? "bg-gaming-orange text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-gaming-surface-elevated"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <StoresGrid stores={filteredStores} isLoading={isLoading} />

        {showEmpty && (
          <EmptyState
            icon={<Store />}
            title="No stores found"
            description="Try adjusting your search or filter to find stores."
          />
        )}
      </motion.div>
    </PageContainer>
  );
}
