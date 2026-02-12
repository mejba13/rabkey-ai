import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DealCardSkeletonProps {
  className?: string;
}

function DealCardSkeleton({ className }: DealCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row overflow-hidden rounded-xl",
        "border border-border bg-card",
        className
      )}
    >
      {/* Image area */}
      <div className="relative w-full sm:w-[200px] shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[160px]">
        <Skeleton className="absolute inset-0 rounded-none shimmer-skeleton" />
        {/* Tag placeholders */}
        <div className="absolute top-2 left-2 flex gap-1">
          <Skeleton className="h-4 w-16 rounded-md shimmer-skeleton" />
          <Skeleton className="h-4 w-20 rounded-md shimmer-skeleton" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4 shimmer-skeleton" />

        {/* Store + platform */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-16 shimmer-skeleton" />
          <Skeleton className="h-3.5 w-3.5 rounded shimmer-skeleton" />
          <Skeleton className="h-3.5 w-8 shimmer-skeleton" />
        </div>

        {/* Price section */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-16 shimmer-skeleton" />
          <Skeleton className="h-5 w-12 shimmer-skeleton" />
          <Skeleton className="h-5 w-10 rounded-md shimmer-skeleton" />
        </div>

        {/* Score + expiry + button */}
        <div className="flex items-center gap-3 mt-auto">
          <Skeleton className="h-7 w-12 rounded-lg shimmer-skeleton" />
          <Skeleton className="h-4 w-16 shimmer-skeleton" />
          <div className="ml-auto">
            <Skeleton className="h-8 w-24 rounded-lg shimmer-skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { DealCardSkeleton };
export type { DealCardSkeletonProps };
