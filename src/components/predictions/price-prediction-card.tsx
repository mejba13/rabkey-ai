"use client";

import { motion } from "motion/react";
import { Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { Progress } from "@/components/ui/progress";
import type { PricePrediction } from "@/lib/types";

interface PricePredictionCardProps {
  prediction: PricePrediction;
  currentPrice: number;
  className?: string;
}

const dayLabels: Record<number, string> = {
  7: "7d",
  14: "14d",
  30: "30d",
  90: "90d",
};

function PricePredictionCard({
  prediction,
  currentPrice,
  className,
}: PricePredictionCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={18} className="text-gaming-purple" />
        <h3 className="font-heading text-lg font-bold">AI Price Prediction</h3>
      </div>

      {/* Prediction Timeline */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {prediction.predictions.map((p) => {
          const isDrop = p.predictedPrice < currentPrice;
          const colorClass = isDrop ? "text-gaming-teal" : "text-gaming-coral";
          const bgClass = isDrop
            ? "bg-gaming-teal/5 border-gaming-teal/20"
            : "bg-gaming-coral/5 border-gaming-coral/20";

          return (
            <motion.div
              key={p.days}
              variants={staggerItem}
              className={cn(
                "rounded-lg border p-3 text-center",
                bgClass,
              )}
            >
              {/* Time horizon label */}
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {dayLabels[p.days]}
              </span>

              {/* Predicted price */}
              <div className={cn("mt-1.5 flex items-center justify-center gap-1", colorClass)}>
                {isDrop ? (
                  <TrendingDown size={14} />
                ) : (
                  <TrendingUp size={14} />
                )}
                <span className="font-heading text-base font-bold">
                  {formatPrice(p.predictedPrice)}
                </span>
              </div>

              {/* Drop probability */}
              <p className="mt-1.5 text-xs text-muted-foreground">
                {p.dropProbability}% drop chance
              </p>

              {/* Confidence bar */}
              <div className="mt-2">
                <Progress
                  value={p.confidence}
                  className="h-1.5"
                />
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {p.confidence}% confidence
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}
      <p className="mt-4 text-xs text-muted-foreground">
        Powered by ML — Predictions based on historical pricing, sale calendars, and market signals.
      </p>
    </div>
  );
}

export { PricePredictionCard };
export type { PricePredictionCardProps };
