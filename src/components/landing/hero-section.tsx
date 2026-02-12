"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText, AnimatedCounter } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/animations/variants";

const stats: readonly { value: number; label: string; prefix?: string; suffix: string }[] = [
  { value: 2400000, label: "Deals Tracked", suffix: "+" },
  { value: 50, label: "Stores", suffix: "+" },
  { value: 12, label: "Saved by Gamers", prefix: "$", suffix: "M+" },
];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #16213E 0%, #0D0D0D 70%)",
      }}
    >
      {/* Subtle decorative glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gaming-orange/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gaming-purple/5 blur-3xl" />
      </div>

      <PageContainer className="relative z-10 py-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-8"
        >
          {/* Badge */}
          <motion.div variants={staggerItem}>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1",
                "bg-gaming-orange/10 text-gaming-orange",
                "border border-gaming-orange/20",
                "text-sm font-heading font-medium"
              )}
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Price Intelligence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-center leading-tight"
          >
            Never Overpay for
            <br />
            <GradientText variant="primary">Game Keys Again</GradientText>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-lg text-muted-foreground text-center max-w-2xl"
          >
            Compare prices from 50+ stores, get AI-powered deal scores, and save
            up to 90% on your favorite games.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            variants={staggerItem}
            onSubmit={handleSearch}
            className="flex w-full max-w-xl items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for any game..."
                className={cn(
                  "h-12 pl-10 pr-4 rounded-lg text-base",
                  "bg-gaming-surface border-border",
                  "focus:border-gaming-orange focus:ring-gaming-orange/30"
                )}
              />
            </div>
            <GamingButton type="submit" size="lg">
              Search
            </GamingButton>
          </motion.form>

          {/* Stats Row */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-4"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && (
                  <div className="hidden sm:block h-8 w-px bg-border" />
                )}
                <div className="text-center">
                  <p className="font-heading font-bold text-xl sm:text-2xl text-foreground">
                    {stat.prefix ?? ""}
                    <AnimatedCounter
                      value={stat.value}
                      className="tabular-nums"
                    />
                    {stat.suffix}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
