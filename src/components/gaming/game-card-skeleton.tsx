import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface GameCardSkeletonProps {
  className?: string;
}

function GameCardSkeleton({ className }: GameCardSkeletonProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-gaming-surface border border-border",
        className
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] w-full">
        <Skeleton className="absolute inset-0 rounded-none shimmer-skeleton" />

        {/* Score badge placeholder - top right */}
        <div className="absolute top-2 right-2">
          <Skeleton className="h-5 w-10 rounded-lg shimmer-skeleton" />
        </div>

        {/* Bottom content area */}
        <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
          {/* Title */}
          <Skeleton className="h-4 w-3/4 shimmer-skeleton" />

          <div className="flex items-center justify-between">
            {/* Platform icons row */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3.5 w-3.5 rounded shimmer-skeleton" />
              <Skeleton className="h-3.5 w-3.5 rounded shimmer-skeleton" />
              <Skeleton className="h-3.5 w-3.5 rounded shimmer-skeleton" />
            </div>

            {/* Price */}
            <Skeleton className="h-4 w-16 shimmer-skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { GameCardSkeleton };
export type { GameCardSkeletonProps };
