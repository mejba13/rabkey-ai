"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { Search, Sparkles, ChevronRight, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText, AnimatedCounter } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/animations/variants";

const stats: readonly { value: number; label: string; prefix?: string; suffix: string }[] = [
  { value: 2400000, label: "Deals Tracked", suffix: "+" },
  { value: 50, label: "Trusted Stores", suffix: "+" },
  { value: 12, label: "Saved by Gamers", prefix: "$", suffix: "M+" },
  { value: 98, label: "Accuracy Rate", suffix: "%" },
];

const platforms = [
  "Steam", "Epic Games", "GOG", "Humble Bundle",
  "Green Man Gaming", "Fanatical", "CDKeys",
] as const;

const rotatingWords = ["Game Keys", "PC Games", "DLC Packs", "Gift Cards"] as const;

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const orbX = useTransform(mouseX, [0, 1000], [-20, 20]);
  const orbY = useTransform(mouseY, [0, 800], [-15, 15]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section
      className="relative min-h-[100vh] flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated dot grid background */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #16213E 0%, transparent 70%), radial-gradient(ellipse at center, transparent 0%, #0D0D0D 80%)",
        }}
      />

      {/* Floating glow orbs with parallax */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute top-[15%] left-[10%] h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.784 0.159 72.989 / 8%) 0%, transparent 70%)",
            animation: "float 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[40%] right-[5%] h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.541 0.247 293.009 / 10%) 0%, transparent 70%)",
            animation: "float 15s ease-in-out infinite 3s",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[30%] h-[350px] w-[350px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.775 0.151 171.689 / 6%) 0%, transparent 70%)",
            animation: "float 18s ease-in-out infinite 6s",
          }}
        />
      </motion.div>

      {/* Diagonal accent lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -left-1/4 h-[200%] w-px rotate-[25deg]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.784 0.159 72.989 / 8%), transparent)",
          }}
        />
        <div
          className="absolute -top-1/2 right-[20%] h-[200%] w-px rotate-[25deg]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.541 0.247 293.009 / 6%), transparent)",
          }}
        />
      </div>

      <PageContainer className="relative z-10 py-24 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-6"
        >
          {/* Top badge */}
          <motion.div variants={staggerItem}>
            <motion.span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-1.5",
                "bg-gaming-orange/10 text-gaming-orange",
                "border border-gaming-orange/20",
                "text-sm font-heading font-medium",
                "backdrop-blur-sm"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Price Intelligence
              <ChevronRight className="h-3 w-3 ml-1" />
            </motion.span>
          </motion.div>

          {/* Headline with rotating word */}
          <motion.div
            variants={staggerItem}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[1.05] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Never Overpay for
              </motion.span>
              <br />
              <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 50, opacity: 0, rotateX: -40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -50, opacity: 0, rotateX: 40 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    <GradientText
                      variant="primary"
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                    >
                      {rotatingWords[wordIndex]}
                    </GradientText>
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-2xl leading-relaxed"
          >
            Compare prices from{" "}
            <span className="text-gaming-orange font-medium">50+ stores</span>,
            get AI-powered deal scores, and save up to{" "}
            <span className="text-gaming-teal font-medium">90%</span> on your
            favorite games.
          </motion.p>

          {/* Glassmorphism Search Bar */}
          <motion.form
            variants={staggerItem}
            onSubmit={handleSearch}
            className={cn(
              "flex w-full max-w-2xl items-center gap-2 p-2",
              "rounded-2xl",
              "bg-gaming-surface/60 backdrop-blur-xl",
              "border border-border/50",
              "shadow-2xl shadow-black/20"
            )}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for any game, DLC, or bundle..."
                className={cn(
                  "h-12 pl-12 pr-4 rounded-xl text-base border-0",
                  "bg-transparent",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "placeholder:text-muted-foreground/60"
                )}
              />
            </div>
            <GamingButton type="submit" size="lg" className="rounded-xl px-8">
              <Search className="h-4 w-4 mr-2" />
              Search
            </GamingButton>
          </motion.form>

          {/* Stats Row */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-6 w-full max-w-3xl"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={cn(
                  "text-center p-4 rounded-xl",
                  "bg-gaming-surface/40 backdrop-blur-sm",
                  "border border-border/30"
                )}
              >
                <p className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                  {stat.prefix ?? ""}
                  <AnimatedCounter
                    value={stat.value}
                    className="tabular-nums"
                  />
                  {stat.suffix}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Platform Trust Badges */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center gap-3 mt-4"
          >
            <p className="text-xs text-muted-foreground/60 uppercase tracking-widest font-heading">
              Tracking prices across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {platforms.map((platform, i) => (
                <motion.span
                  key={platform}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 + i * 0.08 }}
                  className="text-sm text-muted-foreground/50 font-heading font-medium hover:text-muted-foreground transition-colors"
                >
                  {platform}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <Gamepad2 className="h-5 w-5 text-muted-foreground/40" />
              <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
