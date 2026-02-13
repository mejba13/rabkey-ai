"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Store, ShieldCheck, AlertTriangle, LayoutGrid } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText, EmptyState } from "@/components/shared";
import { StoresGrid } from "@/components/stores/stores-grid";
import { useStores } from "@/hooks/use-stores";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type StoreFilter = "all" | "official" | "grey";

const filterOptions: {
  value: StoreFilter;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "all", label: "All Stores", icon: LayoutGrid },
  { value: "official", label: "Official", icon: ShieldCheck },
  { value: "grey", label: "Grey Market", icon: AlertTriangle },
];

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

  const officialCount = stores?.filter((s) => s.isOfficial).length ?? 0;
  const greyCount = stores?.filter((s) => !s.isOfficial).length ?? 0;

  return (
    <PageContainer className="py-16 md:py-20 lg:py-24">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-14 lg:mb-20"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6",
            "bg-gaming-teal/[0.06] border border-gaming-teal/10",
            "text-[10px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-teal/80"
          )}
        >
          <ShieldCheck size={12} />
          Verified & Rated
        </motion.span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.1]">
          <span className="text-white">Trusted </span>
          <GradientText variant="success">Game Key Stores</GradientText>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-white/40 max-w-xl mx-auto text-base lg:text-lg leading-relaxed mt-5"
        >
          Compare {stores?.length ?? "50+"}  stores with trust scores, user
          reviews, delivery times, and regional availability.
        </motion.p>
      </motion.div>

      {/* ── Filter Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-10 lg:mb-12"
      >
        <div
          className={cn(
            "flex flex-col sm:flex-row items-stretch sm:items-center gap-4",
            "p-2 rounded-2xl",
            "bg-white/[0.02] border border-white/[0.06]",
            "backdrop-blur-sm"
          )}
        >
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
            />
            <Input
              type="text"
              placeholder="Search by store name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-11 pr-4 h-11 text-sm font-heading rounded-xl",
                "bg-white/[0.03] border-white/[0.04]",
                "text-white placeholder:text-white/25",
                "focus-visible:ring-1 focus-visible:ring-gaming-teal/30 focus-visible:border-gaming-teal/20",
                "transition-all duration-200"
              )}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center rounded-xl bg-white/[0.03] border border-white/[0.04] p-1 gap-1 shrink-0">
            {filterOptions.map(({ value, label, icon: Icon }) => {
              const isActive = storeFilter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStoreFilter(value)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-lg",
                    "text-xs font-heading font-semibold",
                    "transition-all duration-250 ease-out",
                    isActive
                      ? "bg-white/[0.08] text-white shadow-sm shadow-black/20"
                      : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"
                  )}
                >
                  <Icon
                    size={13}
                    className={cn(
                      "shrink-0 transition-colors duration-250",
                      isActive ? "text-gaming-teal" : "text-white/25"
                    )}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="flex items-center justify-between mt-5 px-1"
          >
            <p className="text-xs font-heading text-white/30">
              Showing{" "}
              <span className="text-white/60 font-semibold">
                {filteredStores.length}
              </span>{" "}
              {filteredStores.length === 1 ? "store" : "stores"}
              {storeFilter !== "all" && (
                <span className="text-white/20">
                  {" "}
                  &middot;{" "}
                  {storeFilter === "official" ? "Official only" : "Grey market only"}
                </span>
              )}
            </p>
            <div className="flex items-center gap-3 text-[10px] font-heading text-white/20">
              <span>
                <span className="text-gaming-teal/60 font-semibold">
                  {officialCount}
                </span>{" "}
                Official
              </span>
              <span className="text-white/10">&middot;</span>
              <span>
                <span className="text-yellow-400/60 font-semibold">
                  {greyCount}
                </span>{" "}
                Grey Market
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── Grid ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
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
