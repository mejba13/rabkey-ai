"use client";

import { cn } from "@/lib/utils";

type GradientVariant = "primary" | "secondary" | "success" | "legendary";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: GradientVariant;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

const gradientVariants: Record<GradientVariant, string> = {
  primary: "from-gaming-orange to-gaming-coral",
  secondary: "from-gaming-purple to-[#9F67FF]",
  success: "from-gaming-teal to-gaming-blue",
  legendary: "from-gaming-gold to-gaming-orange",
};

function GradientText({
  children,
  variant = "primary",
  className,
  as: Component = "span",
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradientVariants[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}

export { GradientText };
export type { GradientTextProps, GradientVariant };
