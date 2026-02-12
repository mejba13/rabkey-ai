"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/animations/variants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
        "rounded-xl border border-border bg-card p-6",
        className,
      )}
    >
      {/* About */}
      <div>
        <h3 className="font-heading text-lg font-bold">About</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {game.description}
        </p>
      </div>

      <Separator className="my-5" />

      {/* Metadata */}
      <div>
        <h3 className="mb-3 font-heading text-lg font-bold">Details</h3>
        <GameMetadata metadata={game.metadata} />
      </div>

      <Separator className="my-5" />

      {/* Genres */}
      <div>
        <h3 className="mb-3 font-heading text-lg font-bold">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {game.metadata.genres.map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="capitalize"
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-5" />

      {/* Features */}
      {game.metadata.features.length > 0 && (
        <>
          <div>
            <h3 className="mb-3 font-heading text-lg font-bold">Features</h3>
            <div className="flex flex-wrap gap-2">
              {game.metadata.features.map((feature) => (
                <Badge key={feature} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-5" />
        </>
      )}

      {/* Languages */}
      <div>
        <h3 className="mb-3 font-heading text-lg font-bold">Languages</h3>
        <p className="text-sm text-muted-foreground">
          {game.metadata.languages.join(", ")}
        </p>
      </div>
    </motion.div>
  );
}

export { GameInfoSidebar };
export type { GameInfoSidebarProps };
