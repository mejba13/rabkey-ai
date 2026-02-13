"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Store } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText, EmptyState } from "@/components/shared";
import { StoresGrid } from "@/components/stores/stores-grid";
import { useStores } from "@/hooks/use-stores";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type StoreFilter = "all" | "official" | "grey";

export function StoresPageClient() {
  const { data: stores, isLoading } = useStores();

  const [searchQuery, setSearchQuery] = useState("");
  const [storeFilter, setStoreFilter] = useState<StoreFilter>("all");

  const filteredStores = useMemo(() => {
    if (!stores) return [];

    return stores.filter((store) => {
      if (
        searchQuery &&
        !store.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

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
    <PageContainer className="py-12 md:py-16 lg:py-20">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 lg:mb-16"
      >
        <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-teal/80 mb-4">
          Stores
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
          Trusted{" "}
          <GradientText variant="success">Game Key Stores</GradientText>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto text-base lg:text-lg leading-relaxed">
          Compare 50+ stores with trust scores, reviews, and delivery times
        </p>
      </motion.div>

      {/* ── Filters ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className={cn(
          "flex items-center gap-3 flex-wrap mb-8",
          "p-3 rounded-xl",
          "bg-white/[0.02] border border-white/[0.05]"
        )}
      >
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
          />
          <Input
            type="text"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 text-xs font-heading rounded-full bg-white/[0.03] border-white/[0.04] text-white/70 placeholder:text-white/25"
          />
        </div>

        {/* Pill toggle: all / official / grey */}
        <div className="inline-flex items-center rounded-full bg-white/[0.03] border border-white/[0.04] p-1 gap-0.5">
          {filterOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStoreFilter(value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200",
                storeFilter === value
                  ? "bg-white/[0.08] text-white shadow-sm"
                  : "text-white/35 hover:text-white/60"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Grid ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <StoresGrid stores={filteredStores} isLoading={isLoading} />
      </motion.div>

      {showEmpty && (
        <EmptyState
          icon={<Store />}
          title="No stores found"
          description="Try adjusting your search or filter to find stores."
        />
      )}
    </PageContainer>
  );
}
