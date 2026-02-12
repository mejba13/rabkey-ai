"use client";

import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotEnoughDataProps {
  className?: string;
}

function NotEnoughData({ className }: NotEnoughDataProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gaming-surface-elevated">
        <BarChart3 size={24} className="text-muted-foreground" />
      </div>
      <h4 className="mt-3 font-heading text-base font-semibold text-foreground">
        Not Enough Data
      </h4>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        We need more price history to generate AI predictions for this game.
        Check back once more data points have been collected.
      </p>
    </div>
  );
}

export { NotEnoughData };
export type { NotEnoughDataProps };
