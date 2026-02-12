"use client";

import {
  ShieldCheck,
  TrendingDown,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatters";
import type { PricePrediction, BuyWaitRecommendation } from "@/lib/types";

interface BuyWaitCardProps {
  prediction: PricePrediction;
  className?: string;
}

const recommendationConfig: Record<
  BuyWaitRecommendation,
  {
    label: string;
    icon: React.ElementType;
    bg: string;
    border: string;
    text: string;
  }
> = {
  "strong-buy": {
    label: "Strong Buy",
    icon: ShieldCheck,
    bg: "bg-gaming-teal/10",
    border: "border-gaming-teal/30",
    text: "text-gaming-teal",
  },
  buy: {
    label: "Buy Now",
    icon: TrendingDown,
    bg: "bg-gaming-blue/10",
    border: "border-gaming-blue/30",
    text: "text-gaming-blue",
  },
  wait: {
    label: "Wait for Drop",
    icon: Clock,
    bg: "bg-gaming-orange/10",
    border: "border-gaming-orange/30",
    text: "text-gaming-orange",
  },
  "strong-wait": {
    label: "Hold Off",
    icon: AlertTriangle,
    bg: "bg-gaming-pink/10",
    border: "border-gaming-pink/30",
    text: "text-gaming-pink",
  },
};

function BuyWaitCard({ prediction, className }: BuyWaitCardProps) {
  const config = recommendationConfig[prediction.recommendation];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-xl border p-5",
        config.bg,
        config.border,
        className,
      )}
    >
      {/* Recommendation */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            config.bg,
          )}
        >
          <Icon size={22} className={config.text} />
        </div>
        <h3 className={cn("font-heading text-xl font-bold", config.text)}>
          {config.label}
        </h3>
      </div>

      {/* Reasoning */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {prediction.reasoning}
      </p>

      {/* Last updated */}
      <p className="mt-3 text-xs text-muted-foreground/70">
        Last updated {formatDate(prediction.lastUpdated)}
      </p>
    </div>
  );
}

export { BuyWaitCard };
export type { BuyWaitCardProps };
