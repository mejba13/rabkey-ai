"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { getDealScoreTier } from "@/lib/formatters";

const tierStyles = {
  legendary: {
    text: "text-gaming-gold",
    border: "border-gaming-gold/50",
    bg: "bg-gaming-gold/10",
  },
  excellent: {
    text: "text-gaming-teal",
    border: "border-gaming-teal/50",
    bg: "bg-gaming-teal/10",
  },
  good: {
    text: "text-yellow-400",
    border: "border-yellow-400/50",
    bg: "bg-yellow-400/10",
  },
  fair: {
    text: "text-gaming-orange",
    border: "border-gaming-orange/50",
    bg: "bg-gaming-orange/10",
  },
  poor: {
    text: "text-gaming-pink",
    border: "border-gaming-pink/50",
    bg: "bg-gaming-pink/10",
  },
} as const;

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-lg px-4 py-1.5",
} as const;

interface DealScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

function DealScoreBadge({
  score,
  size = "md",
  showLabel = false,
  className,
}: DealScoreBadgeProps) {
  const tier = getDealScoreTier(score);
  const styles = tierStyles[tier];

  const springValue = useSpring(0, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(springValue, (v) =>
    Math.round(v).toString()
  );

  useEffect(() => {
    springValue.set(score);
  }, [score, springValue]);

  return (
    <div
      aria-label={`Deal score: ${score} out of 100`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border font-heading font-bold",
        styles.text,
        styles.border,
        styles.bg,
        sizeStyles[size],
        className
      )}
    >
      <motion.span>{displayValue}</motion.span>
      {showLabel && (
        <span className="font-medium opacity-70">Deal Score</span>
      )}
    </div>
  );
}

export { DealScoreBadge };
export type { DealScoreBadgeProps };
