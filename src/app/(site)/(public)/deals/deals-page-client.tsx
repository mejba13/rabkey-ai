"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText, EmptyState } from "@/components/shared";
import { DealsFilterBar } from "@/components/deals/deals-filter-bar";
import { DealsGrid } from "@/components/deals/deals-grid";
import { useDeals } from "@/hooks/use-deals";
import { useStores } from "@/hooks/use-stores";
import type { Platform, DealTag } from "@/lib/types";

export function DealsPageClient() {
  const { data: deals, isLoading: dealsLoading } = useDeals();
  const { data: stores, isLoading: storesLoading } = useStores();

  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [minScore, setMinScore] = useState<string>("any");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<DealTag | "all">("all");

  const isLoading = dealsLoading || storesLoading;

  const filteredDeals = useMemo(() => {
    if (!deals) return [];

    return deals.filter((deal) => {
      if (platform !== "all" && deal.platform !== platform) return false;

      if (minScore !== "any") {
        const threshold = parseInt(minScore, 10);
        if (deal.dealScore < threshold) return false;
      }

      if (maxPrice !== "") {
        const max = parseFloat(maxPrice);
        if (!isNaN(max) && deal.currentPrice > max) return false;
      }

      if (selectedTag !== "all" && !deal.tags.includes(selectedTag)) return false;

      return true;
    });
  }, [deals, platform, minScore, maxPrice, selectedTag]);

  const handleReset = () => {
    setPlatform("all");
    setMinScore("any");
    setMaxPrice("");
    setSelectedTag("all");
  };

  const showEmpty = !isLoading && filteredDeals.length === 0;

  return (
    <PageContainer className="py-12 md:py-16 lg:py-20">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 lg:mb-16"
      >
        <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-coral/80 mb-4">
          Hot Deals
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
          Today&apos;s{" "}
          <GradientText variant="primary">Best Deals</GradientText>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto text-base lg:text-lg leading-relaxed">
          AI-scored deals from 50+ stores — grab them before they expire
        </p>
      </motion.div>

      {/* ── Filter Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-8"
      >
        <DealsFilterBar
          platform={platform}
          onPlatformChange={setPlatform}
          minScore={minScore}
          onMinScoreChange={setMinScore}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          selectedTag={selectedTag}
          onSelectedTagChange={setSelectedTag}
          onReset={handleReset}
        />
      </motion.div>

      {/* ── Deals Grid ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <DealsGrid
          deals={filteredDeals}
          isLoading={isLoading}
          stores={stores}
        />
      </motion.div>

      {showEmpty && (
        <EmptyState
          icon={<Flame />}
          title="No deals match your filters"
          description="Try adjusting your filters to discover more deals."
        />
      )}
    </PageContainer>
  );
}
