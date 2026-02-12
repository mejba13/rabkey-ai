"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { Badge } from "@/components/ui/badge";
import { PageContainer } from "@/components/layout/page-container";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  PlatformIcon,
  GamingButton,
} from "@/components/gaming";
import type { Game } from "@/lib/types";

interface GameHeroProps {
  game: Game;
  className?: string;
}

function GameHero({ game, className }: GameHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background image / gradient */}
      <div className="absolute inset-0 z-0">
        {game.backgroundImage ? (
          <Image
            src={game.backgroundImage}
            alt=""
            fill
            className="object-cover blur-xl opacity-20"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-gaming-surface-elevated to-gaming-surface-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <PageContainer className="relative z-10 pb-10 pt-8 md:pb-14 md:pt-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-8 md:flex-row md:items-start"
        >
          {/* Cover Image */}
          <motion.div variants={staggerItem} className="shrink-0">
            <div className="relative h-[300px] w-[220px] overflow-hidden rounded-xl border border-border shadow-2xl sm:h-[340px] sm:w-[250px] md:h-[380px] md:w-[280px]">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Game Info */}
          <motion.div
            variants={staggerItem}
            className="flex min-w-0 flex-1 flex-col items-center text-center md:items-start md:text-left"
          >
            {/* Platform icons */}
            <div className="flex items-center gap-2">
              {game.metadata.platforms.map((platform) => (
                <Badge
                  key={platform}
                  variant="secondary"
                  className="gap-1.5 bg-gaming-surface-elevated/80 text-foreground"
                >
                  <PlatformIcon platform={platform} size={14} className="text-foreground" />
                  <span className="capitalize text-xs">
                    {platform === "pc" ? "PC" : platform}
                  </span>
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
              {game.title}
            </h1>

            {/* Short Description */}
            <p className="mt-2 max-w-xl text-muted-foreground">
              {game.shortDescription}
            </p>

            {/* Deal Score + Price Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <DealScoreBadge score={game.dealScore} size="lg" showLabel />
              <PriceTag
                currentPrice={game.bestPrice}
                originalPrice={game.originalPrice}
                size="lg"
              />
              {game.isOnSale && game.discount > 0 && (
                <DiscountBadge discount={game.discount} />
              )}
            </div>

            {/* CTA */}
            <GamingButton
              variant="primary"
              size="lg"
              className="mt-6"
              onClick={() => {
                const priceSection = document.getElementById("price-comparison");
                priceSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Buy Now &mdash; {formatPrice(game.bestPrice)}
            </GamingButton>
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}

export { GameHero };
export type { GameHeroProps };
