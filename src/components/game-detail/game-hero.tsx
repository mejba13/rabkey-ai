"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { PageContainer } from "@/components/layout/page-container";
import {
  DealScoreBadge,
  PriceTag,
  DiscountBadge,
  PlatformIcon,
} from "@/components/gaming";
import { ArrowDown } from "lucide-react";
import type { Game } from "@/lib/types";

interface GameHeroProps {
  game: Game;
  className?: string;
}

function GameHero({ game, className }: GameHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background — blurred cover with layered gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src={game.coverImage}
          alt=""
          fill
          className="object-cover scale-110 blur-2xl opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <PageContainer className="relative z-10 pb-12 pt-10 md:pb-16 md:pt-14">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10"
        >
          {/* Cover Image */}
          <motion.div variants={staggerItem} className="shrink-0">
            <div
              className={cn(
                "relative overflow-hidden rounded-xl",
                "h-[280px] w-[200px] sm:h-[320px] sm:w-[230px] md:h-[360px] md:w-[260px]",
                "border border-white/[0.08] shadow-2xl shadow-black/40",
                "ring-1 ring-white/[0.04]"
              )}
            >
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
            className="flex min-w-0 flex-1 flex-col items-center text-center md:items-start md:text-left md:pt-2"
          >
            {/* Platform pills */}
            <div className="flex items-center gap-1.5">
              {game.metadata.platforms.map((platform) => (
                <span
                  key={platform}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
                    "bg-white/[0.04] border border-white/[0.06]",
                    "text-[11px] font-heading font-medium text-white/50"
                  )}
                >
                  <PlatformIcon platform={platform} size={12} className="text-white/40" />
                  <span className="capitalize">
                    {platform === "pc" ? "PC" : platform}
                  </span>
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mt-4 font-heading text-3xl font-bold text-white/95 tracking-tight md:text-4xl lg:text-[42px] lg:leading-tight">
              {game.title}
            </h1>

            {/* Short Description */}
            <p className="mt-2.5 max-w-xl text-white/40 text-[15px] leading-relaxed">
              {game.shortDescription}
            </p>

            {/* Deal Score + Price Row */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <DealScoreBadge score={game.dealScore} size="lg" showLabel />

              <span className="h-5 w-px bg-white/[0.08] hidden sm:block" />

              <PriceTag
                currentPrice={game.bestPrice}
                originalPrice={game.originalPrice}
                size="lg"
              />
              {game.isOnSale && game.discount > 0 && (
                <DiscountBadge discount={game.discount} />
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const priceSection = document.getElementById("price-comparison");
                priceSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "mt-7 inline-flex items-center gap-2.5",
                "px-7 py-3.5 rounded-xl",
                "bg-gradient-to-r from-gaming-orange to-gaming-coral",
                "text-white font-heading font-semibold text-[15px]",
                "shadow-lg shadow-gaming-orange/20",
                "hover:shadow-xl hover:shadow-gaming-orange/30",
                "transition-shadow duration-300"
              )}
            >
              Compare Prices &mdash; {formatPrice(game.bestPrice)}
              <ArrowDown size={16} className="opacity-70" />
            </motion.button>
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}

export { GameHero };
export type { GameHeroProps };
