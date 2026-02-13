"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText, AnimatedCounter, YouTubeBackground } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { Input } from "@/components/ui/input";

/* ═══════════════════════════════════════════════
   Static Data
   ═══════════════════════════════════════════════ */

const stats: readonly {
  value: number;
  label: string;
  prefix?: string;
  suffix: string;
}[] = [
  { value: 2400000, label: "Deals Tracked", suffix: "+" },
  { value: 50, label: "Trusted Stores", suffix: "+" },
  { value: 12, label: "Saved by Gamers", prefix: "$", suffix: "M+" },
  { value: 98, label: "Accuracy Rate", suffix: "%" },
];

const rotatingWords = [
  "Game Keys",
  "PC Games",
  "DLC Packs",
  "Gift Cards",
] as const;

const platforms = [
  "Steam",
  "Epic Games",
  "GOG",
  "Humble Bundle",
  "Green Man Gaming",
  "Fanatical",
  "CDKeys",
] as const;

/* ═══════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════ */

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  function handleSearch(e: { preventDefault(): void }) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* ── Background Video ── */}
      <YouTubeBackground videoId="tzKi5pxDxgw" overlayOpacity={0.5} />

      {/* ── Gradient overlays ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.254 0.057 266.713 / 20%) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 50% at 30% 60%, oklch(0.541 0.247 293.009 / 5%) 0%, transparent 60%)",
            "radial-gradient(ellipse at center, transparent 0%, #0D0D0D 80%)",
          ].join(", "),
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 8%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 8%) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, oklch(0.159 0 0 / 80%) 100%)",
        }}
      />

      {/* ── Content ── */}
      <PageContainer className="relative z-10 py-24 lg:py-32">
        {/* ── Centered hero content ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5",
              "bg-gaming-orange/[0.08] text-gaming-orange",
              "border border-gaming-orange/15",
              "text-xs font-heading font-semibold uppercase tracking-wider"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Price Intelligence
          </motion.span>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold leading-[1.05] tracking-[-0.02em]">
              <span className="block text-white">Never Overpay for</span>
              <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed"
          >
            Compare prices from{" "}
            <span className="text-white font-semibold">50+ stores</span>,
            get AI-powered deal scores, and save up to{" "}
            <span className="text-gaming-teal font-semibold">90%</span> on your
            favorite games.
          </motion.p>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            onSubmit={handleSearch}
            className={cn(
              "flex w-full max-w-2xl items-center gap-2 p-2",
              "rounded-2xl",
              "bg-white/[0.05] backdrop-blur-xl",
              "border border-white/[0.08]",
              "shadow-2xl shadow-black/30",
              "focus-within:border-gaming-orange/30 transition-colors duration-300"
            )}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/30" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for any game, DLC, or bundle..."
                className={cn(
                  "h-12 pl-12 pr-4 rounded-xl text-sm border-0",
                  "bg-transparent text-white",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "placeholder:text-white/30"
                )}
              />
            </div>
            <GamingButton type="submit" size="lg" className="rounded-xl px-6 shrink-0">
              <Search className="h-4 w-4 mr-1.5" />
              Search
            </GamingButton>
          </motion.form>

          {/* Platform trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-[10px] text-white/30 uppercase tracking-[0.25em] font-heading font-medium">
              Tracking prices across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
              {platforms.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className={cn(
                    "text-[11px] text-white/25 font-heading font-medium",
                    "px-2.5 py-1 rounded-md",
                    "hover:text-white/55 hover:bg-white/[0.04]",
                    "transition-all duration-200 cursor-default"
                  )}
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-20 lg:mt-24 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className={cn(
                "p-5 rounded-2xl text-center",
                "bg-white/[0.03] backdrop-blur-sm",
                "border border-white/[0.06]",
                "hover:border-white/[0.12] transition-all duration-300"
              )}
            >
              <p className="font-heading font-bold text-2xl sm:text-3xl text-white">
                {stat.prefix ?? ""}
                <AnimatedCounter value={stat.value} className="tabular-nums" />
                {stat.suffix}
              </p>
              <p className="text-xs text-white/40 mt-1.5 font-heading font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <ArrowRight className="h-4 w-4 text-white/15 rotate-90" />
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
