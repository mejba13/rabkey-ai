"use client";

import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrustLevel } from "@/lib/types";

const trustStyles: Record<
  TrustLevel,
  { text: string; bg: string }
> = {
  excellent: {
    text: "text-gaming-teal",
    bg: "bg-gaming-teal/10",
  },
  good: {
    text: "text-gaming-blue",
    bg: "bg-gaming-blue/10",
  },
  average: {
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  poor: {
    text: "text-gaming-pink",
    bg: "bg-gaming-pink/10",
  },
};

interface StoreTrustBadgeProps {
  trustLevel: TrustLevel;
  trustScore: number;
  className?: string;
}

function StoreTrustBadge({
  trustLevel,
  trustScore,
  className,
}: StoreTrustBadgeProps) {
  const styles = trustStyles[trustLevel];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium font-heading",
        styles.text,
        styles.bg,
        className
      )}
    >
      <Shield size={14} />
      <span className="capitalize">{trustLevel}</span>
      <span className="opacity-70">({trustScore})</span>
    </div>
  );
}

export { StoreTrustBadge };
export type { StoreTrustBadgeProps };
