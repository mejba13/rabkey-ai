"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import {
  Search,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Bell,
  Zap,
  Star,
  Gamepad2,
  ArrowDownRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText, AnimatedCounter } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/animations/variants";

/* ═══════════════════════════════════════════════
   Static Data
   ═══════════════════════════════════════════════ */

const stats: readonly { value: number; label: string; prefix?: string; suffix: string; icon: typeof Zap }[] = [
  { value: 2400000, label: "Deals Tracked", suffix: "+", icon: Zap },
  { value: 50, label: "Trusted Stores", suffix: "+", icon: Shield },
  { value: 12, label: "Saved by Gamers", prefix: "$", suffix: "M+", icon: Star },
  { value: 98, label: "Accuracy Rate", suffix: "%", icon: Sparkles },
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

const priceCompareData = [
  { store: "Steam", price: "$59.99", best: false },
  { store: "GOG", price: "$44.99", best: false },
  { store: "CDKeys", price: "$14.99", best: true },
  { store: "Fanatical", price: "$29.99", best: false },
] as const;

/* ═══════════════════════════════════════════════
   Bento Sub-Components
   ═══════════════════════════════════════════════ */

/** Animated circular score ring with golden gradient */
function ScoreRing({ score = 97, delay = 0.8 }: { score?: number; delay?: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const progress = (score / 100) * circ;

  return (
    <div className="relative w-[120px] h-[120px] mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        {/* background track */}
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="oklch(0.304 0.029 284.551 / 30%)"
          strokeWidth="7"
        />
        {/* animated progress arc */}
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#heroScoreGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - progress }}
          transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="heroScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
      </svg>
      {/* center number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-[28px] font-heading font-extrabold text-gaming-gold leading-none"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: delay + 0.6,
            type: "spring",
            stiffness: 220,
            damping: 18,
          }}
        >
          {score}
        </motion.span>
        <span className="text-[9px] text-muted-foreground/60 uppercase tracking-[0.15em] font-heading mt-0.5">
          Score
        </span>
      </div>
    </div>
  );
}

/** Self-drawing sparkline chart */
function MiniSparkline({ delay = 1.2 }: { delay?: number }) {
  const line = "M 0 24 C 20 22, 30 28, 50 20 S 80 30, 100 14 S 130 22, 150 10 S 170 16, 180 8";

  return (
    <svg
      className="w-full h-10"
      viewBox="0 0 180 36"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="heroSparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={line + " L 180 36 L 0 36 Z"}
        fill="url(#heroSparkFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6, duration: 0.5 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#00D4AA"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 1.8, ease: "easeInOut" }}
      />
      {/* endpoint dot */}
      <motion.circle
        cx="180"
        cy="8"
        r="3"
        fill="#00D4AA"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 1.8, type: "spring", stiffness: 300 }}
      />
    </svg>
  );
}

/** Floating particle dots in the background */
function FloatingParticles() {
  const particles = [
    { x: "12%", y: "18%", size: 3, dur: 8, del: 0 },
    { x: "85%", y: "25%", size: 2, dur: 12, del: 2 },
    { x: "45%", y: "75%", size: 2.5, dur: 10, del: 4 },
    { x: "70%", y: "60%", size: 2, dur: 14, del: 1 },
    { x: "25%", y: "55%", size: 3, dur: 9, del: 6 },
    { x: "90%", y: "80%", size: 2, dur: 11, del: 3 },
    { x: "55%", y: "15%", size: 2.5, dur: 13, del: 5 },
    { x: "8%", y: "85%", size: 2, dur: 10, del: 7 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: i % 2 === 0
              ? "oklch(0.784 0.159 72.989 / 40%)"
              : "oklch(0.541 0.247 293.009 / 35%)",
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            opacity: [0.2, 0.6, 0.3, 0.7, 0.2],
          }}
          transition={{
            duration: p.dur,
            delay: p.del,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════ */

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const router = useRouter();

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Orb parallax
  const orbX = useTransform(mouseX, [0, 1200], [-25, 25]);
  const orbY = useTransform(mouseY, [0, 800], [-20, 20]);

  // 3D tilt for bento grid
  const rawTiltX = useTransform(mouseY, [0, 800], [4, -4]);
  const rawTiltY = useTransform(mouseX, [0, 1200], [-4, 4]);
  const tiltX = useSpring(rawTiltX, { stiffness: 80, damping: 25 });
  const tiltY = useSpring(rawTiltY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
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
      {/* ────────── Background Layers ────────── */}

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-25" />

      {/* Multi-stop radial gradients for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 25% 50%, oklch(0.254 0.057 266.713 / 35%) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 50% at 75% 35%, oklch(0.541 0.247 293.009 / 8%) 0%, transparent 65%)",
            "radial-gradient(ellipse 90% 70% at 50% 100%, oklch(0.784 0.159 72.989 / 4%) 0%, transparent 50%)",
            "radial-gradient(ellipse at center, transparent 0%, #0D0D0D 85%)",
          ].join(", "),
        }}
      />

      {/* Floating glow orbs with parallax */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute top-[8%] left-[3%] h-[550px] w-[550px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.784 0.159 72.989 / 7%) 0%, transparent 70%)",
            animation: "float 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[15%] right-[5%] h-[450px] w-[450px] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.541 0.247 293.009 / 10%) 0%, transparent 70%)",
            animation: "float 17s ease-in-out infinite 4s",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[25%] h-[350px] w-[350px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.887 0.182 95.337 / 5%) 0%, transparent 70%)",
            animation: "float 20s ease-in-out infinite 8s",
          }}
        />
      </motion.div>

      {/* Diagonal accent lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {["-left-[10%]", "left-[38%]", "right-[12%]"].map((pos, i) => (
          <div
            key={i}
            className={`absolute -top-1/2 ${pos} h-[200%] w-px rotate-[25deg]`}
            style={{
              background: `linear-gradient(to bottom, transparent, oklch(${i === 1 ? "0.541 0.247 293.009" : "0.784 0.159 72.989"} / ${i === 0 ? "6" : "4"}%), transparent)`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ────────── Content ────────── */}
      <PageContainer className="relative z-10 py-20 lg:py-24">
        {/* Two-column hero layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10 xl:gap-16">
          {/* ─── LEFT COLUMN: Headline + Search ─── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center lg:items-start gap-6 lg:w-[54%] shrink-0"
          >
            {/* Badge */}
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
            <motion.div variants={staggerItem} className="text-center lg:text-left">
              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-7xl font-heading font-bold leading-[1.05] tracking-tight">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Never Overpay for
                </motion.span>
                <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 60, opacity: 0, rotateX: -45 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -60, opacity: 0, rotateX: 45 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      <GradientText
                        variant="primary"
                        className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-7xl"
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
              className="text-base sm:text-lg md:text-xl text-muted-foreground text-center lg:text-left max-w-xl leading-relaxed"
            >
              Compare prices from{" "}
              <span className="text-gaming-orange font-semibold">50+ stores</span>,
              get AI-powered deal scores, and save up to{" "}
              <span className="text-gaming-teal font-semibold">90%</span> on your
              favorite games.
            </motion.p>

            {/* Search bar with animated gradient border */}
            <motion.form
              variants={staggerItem}
              onSubmit={handleSearch}
              className={cn(
                "hero-search-border",
                "flex w-full max-w-xl items-center gap-2 p-2",
                "rounded-2xl",
                "bg-gaming-surface/70 backdrop-blur-xl",
                "shadow-2xl shadow-black/30"
              )}
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for any game, DLC, or bundle..."
                  className={cn(
                    "h-12 pl-12 pr-4 rounded-xl text-base border-0",
                    "bg-transparent",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                    "placeholder:text-muted-foreground/50"
                  )}
                />
              </div>
              <GamingButton type="submit" size="lg" className="rounded-xl px-8">
                <Search className="h-4 w-4 mr-2" />
                Search
              </GamingButton>
            </motion.form>

            {/* Platform trust line */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col items-center lg:items-start gap-2.5"
            >
              <p className="text-[11px] text-muted-foreground/40 uppercase tracking-[0.2em] font-heading">
                Tracking prices across
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {platforms.map((p, i) => (
                  <motion.span
                    key={p}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 + i * 0.07 }}
                    className="text-xs text-muted-foreground/35 font-heading font-medium hover:text-muted-foreground/70 transition-colors cursor-default"
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN: Bento Grid ─── */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:w-[46%] w-full max-w-md sm:max-w-lg lg:max-w-none"
          >
            {/* 3D perspective wrapper */}
            <motion.div
              style={{
                perspective: 1200,
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Diffused glow behind bento grid */}
              <div className="absolute -inset-8 rounded-3xl blur-3xl bg-gaming-orange/[0.03] pointer-events-none" />

              <div className="grid grid-cols-2 gap-3">
                {/* ── CARD 1: AI Deal Score (tall, left column) ── */}
                <motion.div
                  className={cn(
                    "row-span-2 rounded-2xl p-5",
                    "bg-gaming-surface/50 backdrop-blur-md",
                    "border border-border/30",
                    "flex flex-col items-center justify-between gap-3",
                    "group transition-colors duration-300",
                    "hover:border-gaming-gold/30"
                  )}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 self-start w-full">
                    <div className="w-7 h-7 rounded-lg bg-gaming-gold/10 flex items-center justify-center">
                      <Star className="w-3.5 h-3.5 text-gaming-gold" />
                    </div>
                    <span className="text-xs font-heading font-medium text-muted-foreground/70">
                      AI Deal Score
                    </span>
                  </div>

                  {/* Animated Score Ring */}
                  <ScoreRing score={97} delay={0.9} />

                  {/* Legendary badge */}
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 1.8,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
                        "text-[10px] font-heading font-bold uppercase tracking-wider",
                        "bg-gaming-gold/10 text-gaming-gold",
                        "border border-gaming-gold/20"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gaming-gold animate-pulse" />
                      Legendary Deal
                    </span>
                  </motion.div>

                  {/* Game info */}
                  <div className="w-full text-center space-y-1">
                    <p className="text-sm font-heading font-semibold text-foreground truncate">
                      Cyberpunk 2077
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl font-heading font-extrabold text-gaming-teal">
                        $14.99
                      </span>
                      <span className="text-xs text-muted-foreground/40 line-through">
                        $59.99
                      </span>
                    </div>
                    <span className="inline-block text-[10px] font-heading font-semibold text-gaming-coral bg-gaming-coral/10 px-2 py-0.5 rounded-md">
                      -75% OFF
                    </span>
                  </div>
                </motion.div>

                {/* ── CARD 2: Price Alert (top right) ── */}
                <motion.div
                  className={cn(
                    "rounded-2xl p-4",
                    "bg-gaming-surface/50 backdrop-blur-md",
                    "border border-border/30",
                    "relative overflow-hidden",
                    "group transition-colors duration-300",
                    "hover:border-gaming-coral/30"
                  )}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* Ambient glow */}
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gaming-coral/8 blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3 relative">
                    <div className="relative">
                      <div className="w-7 h-7 rounded-lg bg-gaming-coral/10 flex items-center justify-center">
                        <Bell className="w-3.5 h-3.5 text-gaming-coral" />
                      </div>
                      <motion.div
                        className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gaming-coral"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </div>
                    <span className="text-xs font-heading font-medium text-muted-foreground/70">
                      Price Alert
                    </span>
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-1.5"
                  >
                    <p className="text-sm font-heading font-semibold text-foreground">
                      Elden Ring
                    </p>
                    <div className="flex items-center gap-1.5">
                      <ArrowDownRight className="w-3.5 h-3.5 text-gaming-teal" />
                      <span className="text-xs text-gaming-teal font-heading font-semibold">
                        -58% Drop
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground/40 flex items-center gap-1.5 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gaming-teal animate-pulse" />
                      Just now
                    </p>
                  </motion.div>
                </motion.div>

                {/* ── CARD 3: Price Prediction (bottom right) ── */}
                <motion.div
                  className={cn(
                    "rounded-2xl p-4",
                    "bg-gaming-surface/50 backdrop-blur-md",
                    "border border-border/30",
                    "group transition-colors duration-300",
                    "hover:border-gaming-teal/30"
                  )}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-gaming-teal/10 flex items-center justify-center">
                      <TrendingDown className="w-3.5 h-3.5 text-gaming-teal" />
                    </div>
                    <span className="text-xs font-heading font-medium text-muted-foreground/70">
                      Prediction
                    </span>
                  </div>

                  {/* Animated sparkline */}
                  <MiniSparkline delay={1.3} />

                  {/* Footer info */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-gaming-teal font-heading font-semibold">
                      -23% in 14d
                    </span>
                    <span className="text-[10px] text-muted-foreground/40 font-heading bg-muted/30 px-2 py-0.5 rounded-md">
                      Wait
                    </span>
                  </div>
                </motion.div>

                {/* ── CARD 4: Live Price Compare (full width bottom) ── */}
                <motion.div
                  className={cn(
                    "col-span-2 rounded-2xl p-4",
                    "bg-gaming-surface/50 backdrop-blur-md",
                    "border border-border/30",
                    "group transition-colors duration-300",
                    "hover:border-gaming-orange/30"
                  )}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-gaming-orange/10 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-gaming-orange" />
                    </div>
                    <span className="text-xs font-heading font-medium text-muted-foreground/70">
                      Live Price Compare
                    </span>
                    <span className="ml-auto text-[10px] text-muted-foreground/30 font-heading">
                      Cyberpunk 2077
                    </span>
                  </div>

                  {/* Price tiles */}
                  <div className="grid grid-cols-4 gap-2">
                    {priceCompareData.map((item, i) => (
                      <motion.div
                        key={item.store}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 + i * 0.1 }}
                        className={cn(
                          "rounded-xl p-2.5 text-center border transition-all duration-200",
                          item.best
                            ? "bg-gaming-teal/8 border-gaming-teal/25 shadow-sm shadow-gaming-teal/5"
                            : "bg-gaming-surface-elevated/20 border-transparent"
                        )}
                      >
                        <p className="text-[10px] text-muted-foreground/50 font-heading truncate">
                          {item.store}
                        </p>
                        <p
                          className={cn(
                            "text-sm font-heading font-bold mt-0.5",
                            item.best
                              ? "text-gaming-teal"
                              : "text-muted-foreground/60"
                          )}
                        >
                          {item.price}
                        </p>
                        {item.best && (
                          <motion.span
                            className="inline-block text-[8px] font-heading font-bold text-gaming-teal uppercase tracking-wider mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.0 }}
                          >
                            Best
                          </motion.span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ─── Stats Bento Row ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 + i * 0.1 }}
                className={cn(
                  "relative p-5 rounded-2xl text-center",
                  "bg-gaming-surface/40 backdrop-blur-sm",
                  "border border-border/20",
                  "group overflow-hidden",
                  "hover:border-gaming-orange/20 transition-all duration-300"
                )}
              >
                {/* Subtle icon watermark */}
                <Icon className="absolute top-3 right-3 w-8 h-8 text-muted-foreground/[0.04] group-hover:text-gaming-orange/[0.08] transition-colors duration-500" />

                <p className="font-heading font-bold text-2xl sm:text-3xl text-foreground group-hover:text-gaming-orange transition-colors duration-300 relative">
                  {stat.prefix ?? ""}
                  <AnimatedCounter
                    value={stat.value}
                    className="tabular-nums"
                  />
                  {stat.suffix}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground/60 mt-1 font-heading">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── Scroll Indicator ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <Gamepad2 className="h-5 w-5 text-muted-foreground/30" />
            <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/20 to-transparent" />
          </motion.div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
