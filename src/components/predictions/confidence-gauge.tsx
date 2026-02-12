"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ConfidenceGaugeProps {
  confidence: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { width: 60, strokeWidth: 4, fontSize: "text-sm" },
  md: { width: 80, strokeWidth: 5, fontSize: "text-lg" },
  lg: { width: 100, strokeWidth: 6, fontSize: "text-xl" },
} as const;

function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "#00D4AA"; // teal
  if (confidence >= 60) return "#0EA5E9"; // blue
  if (confidence >= 30) return "#F5A623"; // orange
  return "#FF3366"; // pink
}

function ConfidenceGauge({
  confidence,
  size = "md",
  className,
}: ConfidenceGaugeProps) {
  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getConfidenceColor(confidence);

  // Animate the stroke dash offset
  const springOffset = useSpring(circumference, {
    stiffness: 100,
    damping: 30,
  });

  // Animate the number display
  const springValue = useSpring(0, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(springValue, (v) =>
    Math.round(v).toString(),
  );

  useEffect(() => {
    const targetOffset = circumference - (confidence / 100) * circumference;
    springOffset.set(targetOffset);
    springValue.set(confidence);
  }, [confidence, circumference, springOffset, springValue]);

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative" style={{ width: config.width, height: config.width }}>
        {/* Background circle */}
        <svg
          width={config.width}
          height={config.width}
          className="rotate-[-90deg]"
        >
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-border"
          />
          <motion.circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: springOffset }}
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={cn(
              "font-heading font-bold",
              config.fontSize,
            )}
            style={{ color }}
          >
            {displayValue}
          </motion.span>
        </div>
      </div>

      <span className="text-xs text-muted-foreground">Confidence</span>
    </div>
  );
}

export { ConfidenceGauge };
export type { ConfidenceGaugeProps };
