"use client";

import {
  Globe,
  MessageSquare,
  Truck,
  MapPin,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GamingButton } from "@/components/gaming";
import type { Store, TrustLevel } from "@/lib/types";

/* ═══════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════ */

function formatReviewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
}

const trustConfig: Record<
  TrustLevel,
  {
    label: string;
    color: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    ringColor: string;
  }
> = {
  excellent: {
    label: "Excellent",
    color: "oklch(0.775 0.151 171.689)",
    textColor: "text-gaming-teal",
    bgColor: "bg-gaming-teal/[0.06]",
    borderColor: "border-gaming-teal/10",
    ringColor: "hover:border-gaming-teal/20",
  },
  good: {
    label: "Good",
    color: "oklch(0.685 0.148 237.336)",
    textColor: "text-gaming-blue",
    bgColor: "bg-gaming-blue/[0.06]",
    borderColor: "border-gaming-blue/10",
    ringColor: "hover:border-gaming-blue/20",
  },
  average: {
    label: "Average",
    color: "oklch(0.852 0.199 91.936)",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-400/[0.06]",
    borderColor: "border-yellow-400/10",
    ringColor: "hover:border-yellow-400/20",
  },
  poor: {
    label: "Poor",
    color: "oklch(0.656 0.235 13.33)",
    textColor: "text-gaming-pink",
    bgColor: "bg-gaming-pink/[0.06]",
    borderColor: "border-gaming-pink/10",
    ringColor: "hover:border-gaming-pink/20",
  },
};

/* ═══════════════════════════════════════════════
   Trust Score Ring
   ═══════════════════════════════════════════════ */

function TrustScoreRing({
  score,
  trustLevel,
}: {
  score: number;
  trustLevel: TrustLevel;
}) {
  const config = trustConfig[trustLevel];
  const circumference = 2 * Math.PI * 28;
  const progress = (score / 100) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div className="relative size-16 shrink-0">
      <svg viewBox="0 0 64 64" className="size-full -rotate-90">
        {/* Track */}
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-white/[0.04]"
        />
        {/* Progress */}
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke={config.color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Score number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "text-lg font-heading font-bold tabular-nums",
            config.textColor
          )}
        >
          {score}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Store Card
   ═══════════════════════════════════════════════ */

interface StoreCardProps {
  store: Store;
}

function StoreCard({ store }: StoreCardProps) {
  const config = trustConfig[store.trustLevel];

  const stats = [
    {
      icon: MessageSquare,
      value: formatReviewCount(store.totalReviews),
      label: "Reviews",
    },
    {
      icon: Truck,
      value: store.avgDeliveryTime,
      label: "Delivery",
    },
    {
      icon: MapPin,
      value: `${store.regionSupport.length} Regions`,
      label: "",
    },
    {
      icon: CreditCard,
      value: `${store.paymentMethods.length} Methods`,
      label: "",
    },
  ];

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl",
        "bg-white/[0.02] border border-white/[0.06]",
        "transition-all duration-300 ease-out",
        config.ringColor,
        "hover:bg-white/[0.03]",
        "hover:shadow-lg hover:shadow-black/10"
      )}
    >
      {/* ── Main content ── */}
      <div className="p-6">
        {/* Header row: info + trust ring */}
        <div className="flex items-start gap-4 mb-5">
          {/* Store identity */}
          <div className="flex-1 min-w-0">
            {/* Name + type badge */}
            <div className="flex items-center gap-2.5 mb-2">
              <h3 className="font-heading font-bold text-[15px] text-white truncate">
                {store.name}
              </h3>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-md shrink-0",
                  "text-[9px] font-heading font-bold uppercase tracking-wider",
                  "border",
                  store.isOfficial
                    ? "bg-gaming-teal/[0.06] text-gaming-teal/80 border-gaming-teal/10"
                    : "bg-yellow-400/[0.06] text-yellow-400/80 border-yellow-400/10"
                )}
              >
                {store.isOfficial ? (
                  <ShieldCheck size={9} />
                ) : (
                  <ShieldAlert size={9} />
                )}
                {store.isOfficial ? "Official" : "Grey"}
              </span>
            </div>

            {/* Trust label */}
            <div className="flex items-center gap-1.5">
              <div
                className={cn("size-1.5 rounded-full", config.bgColor)}
                style={{ backgroundColor: config.color }}
              />
              <span
                className={cn(
                  "text-xs font-heading font-medium",
                  config.textColor
                )}
              >
                {config.label}
              </span>
              <span className="text-[10px] text-white/20 font-heading">
                Trust Score
              </span>
            </div>
          </div>

          {/* Trust score ring */}
          <TrustScoreRing
            score={store.trustScore}
            trustLevel={store.trustLevel}
          />
        </div>

        {/* Description */}
        <p className="text-[13px] text-white/35 leading-relaxed line-clamp-2 mb-5">
          {store.description}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0">
                <Icon size={12} className="text-white/25" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-heading font-semibold text-white/70 truncate">
                  {value}
                </p>
                {label && (
                  <p className="text-[9px] font-heading text-white/20 uppercase tracking-wider">
                    {label}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto px-6 pb-6 pt-1">
        <div className="pt-4 border-t border-white/[0.04]">
          <GamingButton
            variant="outline"
            size="sm"
            className={cn(
              "w-full rounded-xl h-10",
              "border-white/[0.06] hover:border-white/[0.12]",
              "group/btn"
            )}
          >
            <Globe size={13} className="text-white/40 group-hover/btn:text-white/60 transition-colors" />
            <span className="text-xs">Visit Store</span>
            <ExternalLink
              size={10}
              className="ml-auto opacity-0 group-hover/btn:opacity-50 transition-opacity duration-200"
            />
          </GamingButton>
        </div>
      </div>
    </div>
  );
}

export { StoreCard };
export type { StoreCardProps };
