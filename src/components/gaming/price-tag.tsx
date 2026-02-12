"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
} as const;

interface PriceTagProps {
  currentPrice: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function PriceTag({
  currentPrice,
  originalPrice,
  currency = "USD",
  size = "md",
  className,
}: PriceTagProps) {
  const hasDiscount =
    originalPrice !== undefined && currentPrice < originalPrice;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "font-heading font-bold",
          sizeStyles[size],
          hasDiscount ? "text-gaming-teal" : "text-foreground"
        )}
      >
        {formatPrice(currentPrice, currency)}
      </span>
      {hasDiscount && (
        <span className="text-muted-foreground line-through text-sm font-heading">
          {formatPrice(originalPrice, currency)}
        </span>
      )}
    </div>
  );
}

export { PriceTag };
export type { PriceTagProps };
