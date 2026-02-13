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
    iconBg: string;
  }
> = {
  "strong-buy": {
    label: "Strong Buy",
    icon: ShieldCheck,
    bg: "bg-gaming-teal/[0.04]",
    border: "border-gaming-teal/15",
    text: "text-gaming-teal",
    iconBg: "bg-gaming-teal/10",
  },
  buy: {
    label: "Buy Now",
    icon: TrendingDown,
    bg: "bg-gaming-blue/[0.04]",
    border: "border-gaming-blue/15",
    text: "text-gaming-blue",
    iconBg: "bg-gaming-blue/10",
  },
  wait: {
    label: "Wait for Drop",
    icon: Clock,
    bg: "bg-gaming-orange/[0.04]",
    border: "border-gaming-orange/15",
    text: "text-gaming-orange",
    iconBg: "bg-gaming-orange/10",
  },
  "strong-wait": {
    label: "Hold Off",
    icon: AlertTriangle,
    bg: "bg-gaming-pink/[0.04]",
    border: "border-gaming-pink/15",
    text: "text-gaming-pink",
    iconBg: "bg-gaming-pink/10",
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
            config.iconBg,
          )}
        >
          <Icon size={20} className={config.text} />
        </div>
        <h3 className={cn("font-heading text-xl font-bold", config.text)}>
          {config.label}
        </h3>
      </div>

      {/* Reasoning */}
      <p className="mt-3 text-[13px] leading-relaxed text-white/40">
        {prediction.reasoning}
      </p>

      {/* Last updated */}
      <p className="mt-3 text-[11px] text-white/20">
        Last updated {formatDate(prediction.lastUpdated)}
      </p>
    </div>
  );
}

export { BuyWaitCard };
export type { BuyWaitCardProps };
