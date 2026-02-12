"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type GlowColor = "orange" | "teal" | "gold" | "purple";

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: GlowColor;
  className?: string;
}

const glowColorMap: Record<GlowColor, string> = {
  orange: "hover:glow-orange hover:border-gaming-orange/50",
  teal: "hover:glow-teal hover:border-gaming-teal/50",
  gold: "hover:glow-gold hover:border-gaming-gold/50",
  purple: "hover:glow-purple hover:border-gaming-purple/50",
};

function GlowCard({
  children,
  glowColor = "orange",
  className,
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "rounded-xl border border-border bg-card p-6",
        "transition-[border-color,box-shadow] duration-200",
        glowColorMap[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export { GlowCard };
export type { GlowCardProps, GlowColor };
