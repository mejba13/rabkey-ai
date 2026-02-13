"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/animations/variants";
import { GameMetadata } from "./game-metadata";
import type { Game } from "@/lib/types";

interface GameInfoSidebarProps {
  game: Game;
  className?: string;
}

function GameInfoSidebar({ game, className }: GameInfoSidebarProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className={cn(
        "rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden",
        className,
      )}
    >
      {/* About */}
      <div className="p-5">
        <h3 className="font-heading text-sm font-bold text-white/90">About</h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-white/40">
          {game.description}
        </p>
      </div>

      <div className="h-px bg-white/[0.04]" />

      {/* Metadata */}
      <div className="p-5">
        <h3 className="mb-3.5 font-heading text-sm font-bold text-white/90">Details</h3>
        <GameMetadata metadata={game.metadata} />
      </div>

      <div className="h-px bg-white/[0.04]" />

      {/* Genres */}
      <div className="p-5">
        <h3 className="mb-3 font-heading text-sm font-bold text-white/90">Genres</h3>
        <div className="flex flex-wrap gap-1.5">
          {game.metadata.genres.map((genre) => (
            <span
              key={genre}
              className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full",
                "bg-gaming-purple/[0.08] border border-gaming-purple/15",
                "text-[10px] font-heading font-bold uppercase tracking-wide text-gaming-purple"
              )}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      {game.metadata.features.length > 0 && (
        <>
          <div className="h-px bg-white/[0.04]" />
          <div className="p-5">
            <h3 className="mb-3 font-heading text-sm font-bold text-white/90">Features</h3>
            <div className="flex flex-wrap gap-1.5">
              {game.metadata.features.map((feature) => (
                <span
                  key={feature}
                  className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full",
                    "bg-white/[0.03] border border-white/[0.06]",
                    "text-[10px] font-heading font-medium text-white/50"
                  )}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="h-px bg-white/[0.04]" />

      {/* Languages */}
      <div className="p-5">
        <h3 className="mb-2 font-heading text-sm font-bold text-white/90">Languages</h3>
        <p className="text-[13px] text-white/40 leading-relaxed">
          {game.metadata.languages.join(", ")}
        </p>
      </div>
    </motion.div>
  );
}

export { GameInfoSidebar };
export type { GameInfoSidebarProps };
