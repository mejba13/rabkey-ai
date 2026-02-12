"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DealScoreBadge } from "@/components/gaming";
import { cn } from "@/lib/utils";
import type { DealScoreBreakdown } from "@/lib/types";

interface DealScoreBreakdownModalProps {
  dealScore: number;
  breakdown: DealScoreBreakdown;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FactorRow {
  label: string;
  weight: number;
  score: number;
}

function getScoreColor(score: number): string {
  if (score >= 90) return "text-gaming-teal";
  if (score >= 75) return "text-gaming-blue";
  if (score >= 50) return "text-gaming-orange";
  return "text-gaming-pink";
}

function getProgressColor(score: number): string {
  if (score >= 90) return "[&>div]:bg-gaming-teal";
  if (score >= 75) return "[&>div]:bg-gaming-blue";
  if (score >= 50) return "[&>div]:bg-gaming-orange";
  return "[&>div]:bg-gaming-pink";
}

function DealScoreBreakdownModal({
  dealScore,
  breakdown,
  open,
  onOpenChange,
}: DealScoreBreakdownModalProps) {
  const factors: FactorRow[] = [
    {
      label: "Historical Low Comparison",
      weight: 25,
      score: breakdown.historicalLowFactor,
    },
    {
      label: "Price vs Prediction",
      weight: 20,
      score: breakdown.predictionFactor,
    },
    {
      label: "Store Trust",
      weight: 15,
      score: breakdown.storeTrustFactor,
    },
    {
      label: "Price Trend",
      weight: 15,
      score: breakdown.priceTrendFactor,
    },
    {
      label: "Region Compatibility",
      weight: 10,
      score: breakdown.regionCompatibility,
    },
    {
      label: "Edition Value",
      weight: 10,
      score: breakdown.editionValue,
    },
    {
      label: "Time Sensitivity",
      weight: 5,
      score: breakdown.timeSensitivity,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gaming-surface border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-heading">
            Deal Score Breakdown
            <DealScoreBadge score={dealScore} size="md" />
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-1" />

        <div className="space-y-4">
          {factors.map((factor) => {
            const contribution = Math.round(
              (factor.score * factor.weight) / 100,
            );

            return (
              <div key={factor.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {factor.label}
                    </span>
                    <Badge
                      variant="outline"
                      className="h-5 px-1.5 text-[10px] font-mono"
                    >
                      {factor.weight}%
                    </Badge>
                  </div>
                  <span
                    className={cn(
                      "font-heading text-sm font-bold",
                      getScoreColor(factor.score),
                    )}
                  >
                    {factor.score}
                  </span>
                </div>

                <Progress
                  value={factor.score}
                  className={cn("h-2", getProgressColor(factor.score))}
                />

                <p className="text-[11px] text-muted-foreground">
                  Weighted contribution: {factor.score} x {factor.weight}% ={" "}
                  <span className="font-mono font-semibold">
                    {contribution}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        <Separator className="my-1" />

        <p className="text-xs text-muted-foreground leading-relaxed">
          Deal scores are calculated using a weighted combination of 7 factors.
          Each factor is scored 0-100, then multiplied by its weight to determine
          its contribution to the final score. Higher scores indicate better deals.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export { DealScoreBreakdownModal };
export type { DealScoreBreakdownModalProps };
