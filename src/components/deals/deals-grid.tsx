"use client";

import { motion } from "motion/react";
import { DealCard } from "./deal-card";
import { DealCardSkeleton } from "./deal-card-skeleton";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { Deal, Store } from "@/lib/types";

interface DealsGridProps {
  deals: Deal[];
  isLoading?: boolean;
  stores?: Store[];
}

function DealsGrid({ deals, isLoading, stores }: DealsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <DealCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const storeMap = new Map(stores?.map((s) => [s.id, s.name]) ?? []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      {deals.map((deal) => (
        <motion.div key={deal.id} variants={staggerItem}>
          <DealCard deal={deal} storeName={storeMap.get(deal.storeId)} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export { DealsGrid };
export type { DealsGridProps };
