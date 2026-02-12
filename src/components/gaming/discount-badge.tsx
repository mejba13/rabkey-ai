"use client";

import { cn } from "@/lib/utils";

interface DiscountBadgeProps {
  discount: number;
  className?: string;
}

function DiscountBadge({ discount, className }: DiscountBadgeProps) {
  return (
    <span
      className={cn(
        "bg-gaming-coral text-white font-bold rounded-md px-2 py-0.5 text-xs font-heading",
        className
      )}
    >
      -{Math.round(discount)}%
    </span>
  );
}

export { DiscountBadge };
export type { DiscountBadgeProps };
