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

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-gaming-orange",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:border-gaming-orange/30 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-heading font-bold mt-1">{value}</p>
          {change && (
            <p
              className={cn(
                "text-xs mt-1 font-medium",
                changeType === "positive" && "text-gaming-teal",
                changeType === "negative" && "text-gaming-pink",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "size-10 rounded-lg flex items-center justify-center bg-gaming-surface-elevated",
            iconColor
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}
