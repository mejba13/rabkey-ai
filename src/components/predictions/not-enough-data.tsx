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
        "flex flex-col items-center justify-center rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-8 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06]">
        <BarChart3 size={22} className="text-white/30" />
      </div>
      <h4 className="mt-3 font-heading text-sm font-semibold text-white/70">
        Not Enough Data
      </h4>
      <p className="mt-1.5 max-w-xs text-[13px] text-white/35 leading-relaxed">
        We need more price history to generate AI predictions for this game.
        Check back once more data points have been collected.
      </p>
    </div>
  );
}

export { NotEnoughData };
export type { NotEnoughDataProps };
