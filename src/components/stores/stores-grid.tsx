"use client";

import { motion } from "motion/react";
import { StoreCard } from "./store-card";
import { Skeleton } from "@/components/ui/skeleton";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { Store } from "@/lib/types";

function StoreCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Skeleton className="size-12 rounded-lg shimmer-skeleton" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-28 shimmer-skeleton" />
            <Skeleton className="h-4 w-16 rounded-full shimmer-skeleton" />
          </div>
          <Skeleton className="h-5 w-32 rounded-full shimmer-skeleton" />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="size-3.5 rounded shimmer-skeleton" />
            <Skeleton className="h-3.5 w-16 shimmer-skeleton" />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-full shimmer-skeleton" />
        <Skeleton className="h-3.5 w-3/4 shimmer-skeleton" />
      </div>

      {/* Button */}
      <Skeleton className="h-8 w-full rounded-lg shimmer-skeleton mt-auto" />
    </div>
  );
}

interface StoresGridProps {
  stores: Store[];
  isLoading?: boolean;
}

function StoresGrid({ stores, isLoading }: StoresGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <StoreCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {stores.map((store) => (
        <motion.div key={store.id} variants={staggerItem}>
          <StoreCard store={store} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export { StoresGrid };
export type { StoresGridProps };
