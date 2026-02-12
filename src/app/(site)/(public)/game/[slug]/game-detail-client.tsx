"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { useGame, useGamePrices } from "@/hooks/use-games";
import { usePriceHistory } from "@/hooks/use-price-history";
import { usePrediction } from "@/hooks/use-predictions";
import { useStores } from "@/hooks/use-stores";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GameHero,
  BestDealHighlight,
  GameEditionsTabs,
  GameInfoSidebar,
} from "@/components/game-detail";
import { PriceHistoryChart, PriceStatsCards } from "@/components/charts";
import {
  PricePredictionCard,
  BuyWaitCard,
  NotEnoughData,
} from "@/components/predictions";
import type { Store } from "@/lib/types";

interface GameDetailClientProps {
  slug: string;
}

/* ─── Skeleton Loading State ──────────────────────────────── */
function GameDetailSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative bg-gaming-surface-elevated/30 pb-10 pt-8 md:pb-14 md:pt-12">
        <PageContainer>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <Skeleton className="h-[340px] w-[250px] rounded-xl" />
            <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-5 w-96" />
              <div className="flex gap-3">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="h-12 w-48 rounded-lg" />
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Content skeleton */}
      <PageContainer className="mt-8 pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

/* ─── Not Found State ─────────────────────────────────────── */
function GameNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-foreground">
          Game Not Found
        </h1>
        <p className="mt-3 text-muted-foreground">
          We could not find the game you are looking for. It may have been
          removed or the link may be incorrect.
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
function GameDetailClient({ slug }: GameDetailClientProps) {
  const { data: game, isLoading: gameLoading } = useGame(slug);
  const { data: prices = [], isLoading: pricesLoading } = useGamePrices(
    game?.id ?? "",
  );
  const { data: stores = [] } = useStores();
  const { data: priceHistory } = usePriceHistory(game?.id ?? "");
  const { data: prediction } = usePrediction(game?.id ?? "");

  const storeMap = useMemo(() => {
    const map = new Map<string, Store>();
    for (const store of stores) {
      map.set(store.id, store);
    }
    return map;
  }, [stores]);

  // Find the best-priced entry from the prices list
  const bestPrice = useMemo(() => {
    if (prices.length === 0) return undefined;
    return [...prices].sort((a, b) => b.dealScore - a.dealScore)[0];
  }, [prices]);

  const bestStore = bestPrice ? storeMap.get(bestPrice.storeId) : undefined;

  if (gameLoading || pricesLoading) {
    return <GameDetailSkeleton />;
  }

  if (!game) {
    return <GameNotFound />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <GameHero game={game} />

      {/* Main Content */}
      <PageContainer className="mt-8 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* Left column: deals + price comparison */}
          <motion.div
            variants={staggerItem}
            className="lg:col-span-2 space-y-8"
          >
            {/* Best Deal */}
            <BestDealHighlight
              price={bestPrice}
              store={bestStore}
            />

            {/* Price Comparison */}
            <div id="price-comparison">
              <h2 className="mb-4 font-heading text-xl font-bold">
                Compare Prices
              </h2>
              <GameEditionsTabs
                game={game}
                prices={prices}
                stores={stores}
              />
            </div>

            {/* Price History */}
            <div id="price-history">
              <SectionHeading title="Price History" className="mb-4" />
              {priceHistory ? (
                <div className="space-y-4">
                  <PriceStatsCards
                    priceHistory={priceHistory}
                    currentPrice={game.bestPrice}
                  />
                  <PriceHistoryChart priceHistory={priceHistory} />
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-8 text-muted-foreground">
                  <BarChart3 className="size-5" />
                  <span className="text-sm">
                    Not enough price history data available for this game yet.
                  </span>
                </div>
              )}
            </div>

            {/* AI Insights */}
            <div id="ai-insights">
              <SectionHeading title="AI Insights" className="mb-4" />
              {prediction ? (
                <div className="space-y-4">
                  <BuyWaitCard prediction={prediction} />
                  <PricePredictionCard
                    prediction={prediction}
                    currentPrice={game.bestPrice}
                  />
                </div>
              ) : (
                <NotEnoughData />
              )}
            </div>
          </motion.div>

          {/* Right column: sidebar */}
          <motion.div variants={staggerItem}>
            <GameInfoSidebar game={game} />
          </motion.div>
        </motion.div>
      </PageContainer>
    </div>
  );
}

export { GameDetailClient };
export type { GameDetailClientProps };
