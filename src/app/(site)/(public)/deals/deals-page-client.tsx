"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading, EmptyState } from "@/components/shared";
import { DealsFilterBar } from "@/components/deals/deals-filter-bar";
import { DealsGrid } from "@/components/deals/deals-grid";
import { useDeals } from "@/hooks/use-deals";
import { useStores } from "@/hooks/use-stores";
import { fadeInUp } from "@/animations/variants";
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
    <PageContainer className="py-8 md:py-12">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <SectionHeading
          title="Hot Deals"
          subtitle="AI-scored deals from 50+ stores -- grab them before they expire"
        />

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

        <DealsGrid
          deals={filteredDeals}
          isLoading={isLoading}
          stores={stores}
        />

        {showEmpty && (
          <EmptyState
            icon={<Flame />}
            title="No deals match your filters"
            description="Try adjusting your filters to discover more deals."
          />
        )}
      </motion.div>
    </PageContainer>
  );
}
