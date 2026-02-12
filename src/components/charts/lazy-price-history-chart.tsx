"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const PriceHistoryChart = dynamic(
  () => import("./price-history-chart").then((mod) => ({ default: mod.PriceHistoryChart })),
  {
    loading: () => <Skeleton className="h-[300px] w-full rounded-xl" />,
    ssr: false,
  }
);

export { PriceHistoryChart as LazyPriceHistoryChart };
