"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface YouTubeBackgroundProps {
  videoId: string;
  /** Overlay opacity — lower = more video visible. Default 0.55 */
  overlayOpacity?: number;
  className?: string;
}

export function YouTubeBackground({
  videoId,
  overlayOpacity = 0.55,
  className,
}: YouTubeBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoad = useCallback(() => setIsLoaded(true), []);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* YouTube iframe — scaled to cover viewport like object-fit:cover */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[max(100%,177.78vh)] h-[max(100%,56.25vw)]",
          "transition-opacity duration-[1.5s] ease-out",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${videoId}&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1&fs=0`}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media"
          loading="eager"
          title="Background video"
          onLoad={handleLoad}
        />
      </div>

      {/* Cinematic color-grade overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            oklch(0.159 0.02 280 / ${overlayOpacity * 0.8}) 0%,
            oklch(0.159 0 0 / ${overlayOpacity}) 40%,
            oklch(0.159 0.01 280 / ${overlayOpacity * 1.1}) 100%)`,
        }}
      />

      {/* Bottom fade to page background */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, oklch(0.159 0 0) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
