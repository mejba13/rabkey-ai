"use client";

import { motion } from "motion/react";
import { StoreCard } from "./store-card";
import { Skeleton } from "@/components/ui/skeleton";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { Store } from "@/lib/types";

/* ═══════════════════════════════════════════════
   Skeleton Loader
   ═══════════════════════════════════════════════ */

function StoreCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] flex flex-col">
      <div className="p-6">
        {/* Header: info + ring */}
        <div className="flex items-start gap-4 mb-5">
          <div className="flex-1 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-5 w-32 shimmer-skeleton" />
              <Skeleton className="h-4 w-14 rounded-md shimmer-skeleton" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-1.5 rounded-full shimmer-skeleton" />
              <Skeleton className="h-3.5 w-24 shimmer-skeleton" />
            </div>
          </div>
          <Skeleton className="size-16 rounded-full shimmer-skeleton" />
        </div>

        {/* Description */}
        <div className="space-y-1.5 mb-5">
          <Skeleton className="h-3.5 w-full shimmer-skeleton" />
          <Skeleton className="h-3.5 w-4/5 shimmer-skeleton" />
        </div>

        {/* Stats 2x2 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <Skeleton className="size-7 rounded-lg shimmer-skeleton" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-14 shimmer-skeleton" />
                <Skeleton className="h-2 w-10 shimmer-skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 pb-6 pt-1">
        <div className="pt-4 border-t border-white/[0.04]">
          <Skeleton className="h-10 w-full rounded-xl shimmer-skeleton" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Grid
   ═══════════════════════════════════════════════ */

interface StoresGridProps {
  stores: Store[];
  isLoading?: boolean;
}

function StoresGrid({ stores, isLoading }: StoresGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
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
