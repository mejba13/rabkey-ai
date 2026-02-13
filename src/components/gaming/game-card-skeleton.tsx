import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface GameCardSkeletonProps {
  className?: string;
}

function GameCardSkeleton({ className }: GameCardSkeletonProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card/50 border border-border/30",
        className
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] w-full">
        <Skeleton className="absolute inset-0 rounded-none shimmer-skeleton" />

        {/* Score badge placeholder — top right */}
        <div className="absolute top-2.5 right-2.5">
          <Skeleton className="h-5 w-10 rounded-lg shimmer-skeleton" />
        </div>
      </div>

      {/* Content area below image */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <Skeleton className="h-4 w-3/4 shimmer-skeleton" />

        {/* Bottom row: platforms + price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-3 rounded shimmer-skeleton" />
            <Skeleton className="h-3 w-3 rounded shimmer-skeleton" />
            <Skeleton className="h-3 w-3 rounded shimmer-skeleton" />
          </div>
          <Skeleton className="h-4 w-14 shimmer-skeleton" />
        </div>
      </div>
    </div>
  );
}

export { GameCardSkeleton };
export type { GameCardSkeletonProps };
