import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ShimmerSkeletonProps {
  className?: string;
}

function ShimmerSkeleton({ className }: ShimmerSkeletonProps) {
  return <Skeleton className={cn("shimmer-skeleton", className)} />;
}

export { ShimmerSkeleton };
export type { ShimmerSkeletonProps };
