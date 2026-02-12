"use client";

import { Monitor, Gamepad2, Gamepad, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Platform } from "@/lib/types";

const platformIcons: Record<Platform, React.ElementType> = {
  pc: Monitor,
  playstation: Gamepad2,
  xbox: Gamepad,
  nintendo: Smartphone,
};

const platformLabels: Record<Platform, string> = {
  pc: "PC",
  playstation: "PlayStation",
  xbox: "Xbox",
  nintendo: "Nintendo",
};

interface PlatformIconProps {
  platform: Platform;
  size?: number;
  className?: string;
}

function PlatformIcon({ platform, size = 16, className }: PlatformIconProps) {
  const Icon = platformIcons[platform];
  const label = platformLabels[platform];

  return (
    <Icon
      size={size}
      className={cn("text-muted-foreground", className)}
      aria-label={label}
    />
  );
}

export { PlatformIcon };
export type { PlatformIconProps };
