"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";
import { Input } from "@/components/ui/input";
import { useWishlist } from "@/hooks/use-wishlist";

interface BudgetTrackerProps {
  className?: string;
}

function BudgetTracker({ className }: BudgetTrackerProps) {
  const [budget, setBudget] = useState(100);
  const [isEditing, setIsEditing] = useState(false);
  const [budgetInput, setBudgetInput] = useState("100");
  const wishlistItems = useWishlist();

  const totalValue = wishlistItems.reduce(
    (sum, item) => sum + item.game.bestPrice,
    0,
  );

  const percentage = budget > 0 ? Math.min((totalValue / budget) * 100, 100) : 0;
  const isOverBudget = totalValue > budget;

  const handleBudgetSubmit = () => {
    const parsed = parseFloat(budgetInput);
    if (!isNaN(parsed) && parsed > 0) {
      setBudget(parsed);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="size-5 text-gaming-orange" />
        <h3 className="font-heading font-bold text-base">Budget Tracker</h3>
      </div>

      {/* Budget input */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">Budget</span>
        {isEditing ? (
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              step="1"
              min="0"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              onBlur={handleBudgetSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBudgetSubmit();
                if (e.key === "Escape") setIsEditing(false);
              }}
              className="h-7 w-24 text-sm bg-gaming-surface border-border text-right"
              autoFocus
            />
          </div>
        ) : (
          <button
            onClick={() => {
              setBudgetInput(budget.toString());
              setIsEditing(true);
            }}
            className="font-heading font-bold text-foreground hover:text-gaming-orange transition-colors"
          >
            {formatPrice(budget)}
          </button>
        )}
      </div>

      {/* Total wishlist value */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Wishlist Total</span>
        <span
          className={cn(
            "font-heading font-bold",
            isOverBudget ? "text-gaming-coral" : "text-gaming-teal",
          )}
        >
          {formatPrice(totalValue)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gaming-surface">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isOverBudget
              ? "bg-gradient-to-r from-gaming-coral to-gaming-pink"
              : "bg-gradient-to-r from-gaming-teal to-gaming-blue",
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Status text */}
      <p
        className={cn(
          "mt-2 text-xs font-medium",
          isOverBudget ? "text-gaming-coral" : "text-gaming-teal",
        )}
      >
        {isOverBudget
          ? `Over budget by ${formatPrice(totalValue - budget)}`
          : `Under budget - ${formatPrice(budget - totalValue)} remaining`}
      </p>
    </div>
  );
}

export { BudgetTracker };
export type { BudgetTrackerProps };
