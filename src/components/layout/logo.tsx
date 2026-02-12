"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
} as const;

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("font-heading font-bold", sizeClasses[size], className)}
    >
      <span className="text-white">GrabKey</span>
      <span className="text-gaming-orange">{" AI"}</span>
    </Link>
  );
}
