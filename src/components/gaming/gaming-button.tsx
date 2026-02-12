"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gamingButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-heading font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gaming-orange/50 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-gaming-orange to-gaming-coral text-white hover:shadow-lg hover:shadow-gaming-orange/25",
        secondary:
          "bg-gradient-to-r from-gaming-purple to-[#9F67FF] text-white hover:shadow-lg hover:shadow-gaming-purple/25",
        ghost:
          "bg-transparent text-foreground hover:bg-gaming-surface-elevated",
        outline:
          "border border-border text-foreground hover:border-gaming-orange hover:text-gaming-orange",
        success:
          "bg-gradient-to-r from-gaming-teal to-gaming-blue text-white",
        legendary:
          "bg-gradient-to-r from-gaming-gold to-gaming-orange text-black font-bold",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface GamingButtonProps
  extends VariantProps<typeof gamingButtonVariants> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

const GamingButton = React.forwardRef<HTMLButtonElement, GamingButtonProps>(
  ({ className, variant, size, children, disabled, onClick, type = "button", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={disabled ? undefined : { scale: 1.03 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        className={cn(gamingButtonVariants({ variant, size, className }))}
        disabled={disabled}
        onClick={onClick}
        aria-label={props["aria-label"]}
      >
        {children}
      </motion.button>
    );
  }
);

GamingButton.displayName = "GamingButton";

export { GamingButton, gamingButtonVariants };
