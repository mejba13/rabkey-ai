"use client";

import { type ElementType } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: ElementType;
  iconColor?: string;
}

/* Map icon colors to subtle card accent tints */
const accentMap: Record<string, { bg: string; border: string; iconBg: string }> = {
  "text-gaming-orange": {
    bg: "bg-gaming-orange/[0.02]",
    border: "border-gaming-orange/10 hover:border-gaming-orange/20",
    iconBg: "bg-gaming-orange/[0.08]",
  },
  "text-gaming-teal": {
    bg: "bg-gaming-teal/[0.02]",
    border: "border-gaming-teal/10 hover:border-gaming-teal/20",
    iconBg: "bg-gaming-teal/[0.08]",
  },
  "text-gaming-blue": {
    bg: "bg-gaming-blue/[0.02]",
    border: "border-gaming-blue/10 hover:border-gaming-blue/20",
    iconBg: "bg-gaming-blue/[0.08]",
  },
  "text-gaming-purple": {
    bg: "bg-gaming-purple/[0.02]",
    border: "border-gaming-purple/10 hover:border-gaming-purple/20",
    iconBg: "bg-gaming-purple/[0.08]",
  },
  "text-gaming-coral": {
    bg: "bg-gaming-coral/[0.02]",
    border: "border-gaming-coral/10 hover:border-gaming-coral/20",
    iconBg: "bg-gaming-coral/[0.08]",
  },
  "text-gaming-gold": {
    bg: "bg-gaming-gold/[0.02]",
    border: "border-gaming-gold/10 hover:border-gaming-gold/20",
    iconBg: "bg-gaming-gold/[0.08]",
  },
};

const defaultAccent = {
  bg: "bg-white/[0.01]",
  border: "border-white/[0.06] hover:border-white/[0.10]",
  iconBg: "bg-white/[0.04]",
};

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-gaming-orange",
}: StatCardProps) {
  const accent = accentMap[iconColor] ?? defaultAccent;

  return (
    <div
      className={cn(
        "rounded-xl border p-5 backdrop-blur-sm transition-all duration-200",
        accent.bg,
        accent.border,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-heading font-semibold uppercase tracking-wider text-white/30">
            {title}
          </p>
          <p className="text-2xl font-heading font-bold text-white/90 mt-2 tracking-tight">
            {value}
          </p>
          {change && (
            <p
              className={cn(
                "text-[11px] mt-1.5 font-heading font-medium",
                changeType === "positive" && "text-gaming-teal",
                changeType === "negative" && "text-gaming-pink",
                changeType === "neutral" && "text-white/25",
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "size-10 rounded-lg flex items-center justify-center border border-white/[0.04]",
            accent.iconBg,
          )}
        >
          <Icon className={cn("size-[18px]", iconColor)} />
        </div>
      </div>
    </div>
  );
}
