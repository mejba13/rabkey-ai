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
        "rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={16} className="text-gaming-purple" />
        <h3 className="font-heading text-sm font-bold text-white/90">AI Price Prediction</h3>
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
            ? "bg-gaming-teal/[0.03] border-gaming-teal/10"
            : "bg-gaming-coral/[0.03] border-gaming-coral/10";

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
              <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-white/30">
                {dayLabels[p.days]}
              </span>

              {/* Predicted price */}
              <div className={cn("mt-1.5 flex items-center justify-center gap-1", colorClass)}>
                {isDrop ? (
                  <TrendingDown size={13} />
                ) : (
                  <TrendingUp size={13} />
                )}
                <span className="font-heading text-base font-bold">
                  {formatPrice(p.predictedPrice)}
                </span>
              </div>

              {/* Drop probability */}
              <p className="mt-1.5 text-[11px] text-white/30">
                {p.dropProbability}% drop chance
              </p>

              {/* Confidence bar */}
              <div className="mt-2">
                <Progress
                  value={p.confidence}
                  className="h-1"
                />
                <p className="mt-1 text-[10px] text-white/25">
                  {p.confidence}% confidence
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}
      <p className="mt-4 text-[11px] text-white/20">
        Powered by ML — Predictions based on historical pricing, sale calendars, and market signals.
      </p>
    </div>
  );
}

export { PricePredictionCard };
export type { PricePredictionCardProps };
