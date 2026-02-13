"use client";

import { motion } from "motion/react";
import {
  Search,
  BarChart3,
  Zap,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  TrendingUp,
  Bell,
  Store,
  Gamepad2,
  KeyRound,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: { icon: LucideIcon; text: string }[];
  accent: "orange" | "purple" | "teal";
}

const steps: Step[] = [
  {
    number: "01",
    icon: Search,
    title: "Search Any Game",
    description:
      "Type a game name and instantly compare prices from 50+ stores. Our real-time engine refreshes every 15 minutes across all major retailers.",
    highlights: [
      { icon: Store, text: "50+ stores" },
      { icon: Clock, text: "Real-time prices" },
    ],
    accent: "orange",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "AI Scores Every Deal",
    description:
      "Our ML model rates each deal 0-100 by analyzing historical prices, store trust, price trends, and predicting future price drops.",
    highlights: [
      { icon: Shield, text: "7-factor analysis" },
      { icon: TrendingUp, text: "90-day predictions" },
    ],
    accent: "purple",
  },
  {
    number: "03",
    icon: Zap,
    title: "Save Big, Every Time",
    description:
      "Grab the best deal with confidence. Set alerts, sync your wishlist, and never overpay again. Our users save an average of 60%.",
    highlights: [
      { icon: Bell, text: "Smart alerts" },
      { icon: Sparkles, text: "Avg 60% saved" },
    ],
    accent: "teal",
  },
];

const accentMap = {
  orange: {
    gradient: "from-gaming-orange to-gaming-coral",
    text: "text-gaming-orange",
    iconBg: "bg-gaming-orange/[0.08]",
    iconRing: "ring-gaming-orange/15",
    iconGlow: "shadow-gaming-orange/[0.08]",
    numberGradient: "from-gaming-orange/[0.07] to-transparent",
    dotBg: "bg-gaming-orange",
    dotGlow: "shadow-gaming-orange/40",
    lineBg: "from-gaming-orange/40",
    chipBg: "bg-gaming-orange/[0.05]",
    chipBorder: "border-gaming-orange/10",
    chipText: "text-gaming-orange/70",
    hoverBorder: "group-hover:border-gaming-orange/15",
    hoverGlow: "group-hover:shadow-gaming-orange/[0.04]",
  },
  purple: {
    gradient: "from-gaming-purple to-[#9F67FF]",
    text: "text-gaming-purple",
    iconBg: "bg-gaming-purple/[0.08]",
    iconRing: "ring-gaming-purple/15",
    iconGlow: "shadow-gaming-purple/[0.08]",
    numberGradient: "from-gaming-purple/[0.07] to-transparent",
    dotBg: "bg-gaming-purple",
    dotGlow: "shadow-gaming-purple/40",
    lineBg: "from-gaming-purple/40",
    chipBg: "bg-gaming-purple/[0.05]",
    chipBorder: "border-gaming-purple/10",
    chipText: "text-gaming-purple/70",
    hoverBorder: "group-hover:border-gaming-purple/15",
    hoverGlow: "group-hover:shadow-gaming-purple/[0.04]",
  },
  teal: {
    gradient: "from-gaming-teal to-gaming-blue",
    text: "text-gaming-teal",
    iconBg: "bg-gaming-teal/[0.08]",
    iconRing: "ring-gaming-teal/15",
    iconGlow: "shadow-gaming-teal/[0.08]",
    numberGradient: "from-gaming-teal/[0.07] to-transparent",
    dotBg: "bg-gaming-teal",
    dotGlow: "shadow-gaming-teal/40",
    lineBg: "from-gaming-teal/40",
    chipBg: "bg-gaming-teal/[0.05]",
    chipBorder: "border-gaming-teal/10",
    chipText: "text-gaming-teal/70",
    hoverBorder: "group-hover:border-gaming-teal/15",
    hoverGlow: "group-hover:shadow-gaming-teal/[0.04]",
  },
} as const;

/* ═══════════════════════════════════════════════
   Ambient Background
   ═══════════════════════════════════════════════ */

function AmbientBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Orange glow — left */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-gaming-orange/[0.02] blur-[110px]"
        style={{ left: "-8%", top: "15%" }}
        animate={{
          x: [0, 25, -10, 18, 0],
          y: [0, -12, 10, -6, 0],
          scale: [1, 1.06, 0.96, 1.03, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Purple glow — center */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gaming-purple/[0.025] blur-[100px]"
        style={{ left: "35%", top: "25%" }}
        animate={{
          x: [0, -15, 10, -8, 0],
          y: [0, 10, -15, 8, 0],
          scale: [1, 0.97, 1.05, 0.99, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Teal glow — right */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full bg-gaming-teal/[0.02] blur-[100px]"
        style={{ right: "-5%", top: "30%" }}
        animate={{
          x: [0, -20, 12, -8, 0],
          scale: [1, 1.04, 0.97, 1.02, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Floating Decorative Icons
   ═══════════════════════════════════════════════ */

function FloatingIcons() {
  const icons = [
    {
      icon: Gamepad2,
      x: "5%",
      y: "25%",
      size: 16,
      delay: 0,
      duration: 7,
      color: "text-gaming-purple/[0.06]",
    },
    {
      icon: KeyRound,
      x: "93%",
      y: "20%",
      size: 14,
      delay: 1.2,
      duration: 6.5,
      color: "text-gaming-orange/[0.06]",
    },
    {
      icon: Trophy,
      x: "7%",
      y: "75%",
      size: 12,
      delay: 0.6,
      duration: 8,
      color: "text-gaming-gold/[0.05]",
    },
    {
      icon: Sparkles,
      x: "91%",
      y: "70%",
      size: 14,
      delay: 2,
      duration: 5.5,
      color: "text-gaming-teal/[0.06]",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((el, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -8, 0, 5, 0],
            rotate: [0, 4, -2, 3, 0],
            opacity: [0.5, 0.8, 0.5, 0.7, 0.5],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          <el.icon className={cn("shrink-0", el.color)} size={el.size} />
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Step Card
   ═══════════════════════════════════════════════ */

function StepCard({ step, index }: { step: Step; index: number }) {
  const colors = accentMap[step.accent];
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.1 + index * 0.15, duration: 0.5 }}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden",
        "bg-[#0F0F1E]/70 backdrop-blur-sm",
        "border border-white/[0.05]",
        colors.hoverBorder,
        "shadow-lg shadow-black/20",
        colors.hoverGlow,
        "hover:shadow-2xl",
        "transition-all duration-400"
      )}
    >
      {/* Large watermark number — background */}
      <div className="absolute -top-8 -right-4 pointer-events-none select-none">
        <span
          className={cn(
            "font-heading font-black text-[11rem] leading-none",
            "bg-gradient-to-b bg-clip-text text-transparent",
            colors.numberGradient
          )}
          aria-hidden="true"
        >
          {step.number}
        </span>
      </div>

      {/* Top accent line */}
      <div
        className={cn(
          "h-[2px] w-full bg-gradient-to-r opacity-30 group-hover:opacity-70 transition-opacity duration-400",
          colors.gradient
        )}
      />

      <div className="relative flex flex-col flex-1 p-7 lg:p-8">
        {/* Step indicator + Icon */}
        <div className="flex items-start justify-between mb-7">
          {/* Step badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5"
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full shrink-0",
                colors.dotBg,
                "shadow-lg",
                colors.dotGlow
              )}
            />
            <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-white/35">
              Step {step.number}
            </span>
          </motion.div>

          {/* Icon container with ring */}
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              "ring-1",
              colors.iconRing,
              colors.iconBg,
              "shadow-lg",
              colors.iconGlow,
              "group-hover:shadow-xl transition-shadow duration-300"
            )}
          >
            <Icon className={cn("h-5 w-5", colors.text)} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl lg:text-[22px] text-white/90 mb-3 tracking-tight">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-white/40 leading-[1.75] flex-1 mb-6 group-hover:text-white/50 transition-colors duration-300">
          {step.description}
        </p>

        {/* Highlight chips */}
        <div className="flex flex-wrap gap-2">
          {step.highlights.map((h) => (
            <div
              key={h.text}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                "text-[11px] font-heading font-medium",
                colors.chipBg,
                "border",
                colors.chipBorder,
                colors.chipText
              )}
            >
              <h.icon className="h-3 w-3 shrink-0" />
              {h.text}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Timeline Connector (desktop)
   ═══════════════════════════════════════════════ */

function TimelineConnector({ index }: { index: number }) {
  const colors = [accentMap.orange, accentMap.purple];
  const c = colors[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
      className="hidden lg:flex items-center justify-center px-1"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-1">
        {/* Dashed line segments */}
        <div className={cn("w-px h-3 rounded-full bg-gradient-to-b", c.lineBg, "to-transparent")} />
        <div className="w-px h-2 rounded-full bg-white/[0.06]" />
        {/* Arrow dot */}
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            "bg-[#0F0F1E] border border-white/[0.08]",
            "shadow-lg shadow-black/30"
          )}
        >
          <ArrowRight className="h-3.5 w-3.5 text-white/25" />
        </div>
        <div className="w-px h-2 rounded-full bg-white/[0.06]" />
        <div className={cn("w-px h-3 rounded-full bg-gradient-to-t", c.lineBg, "to-transparent")} />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Progress Indicator
   ═══════════════════════════════════════════════ */

function ProgressLine() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
      className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0"
    >
      <div className="mx-auto max-w-5xl px-16">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(245,166,35,0.12) 20%, rgba(124,58,237,0.12) 50%, rgba(0,212,170,0.12) 80%, transparent 95%)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   How It Works Section
   ═══════════════════════════════════════════════ */

export function HowItWorksSection() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Ambient background */}
      <AmbientBackground />

      {/* Floating decorations */}
      <FloatingIcons />

      {/* Subtle surface tint */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.541 0.247 293.009 / 2%) 0%, transparent 70%)",
        }}
      />

      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(124,58,237,0.12), rgba(245,166,35,0.12), transparent)",
          }}
        />
      </div>

      <PageContainer className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-gaming-purple/10 bg-gaming-purple/[0.04] px-4 py-1.5 mb-6"
          >
            <Sparkles className="h-3 w-3 text-gaming-purple/70" />
            <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-purple/70">
              How It Works
            </span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight mb-5"
          >
            Three Steps to{" "}
            <GradientText variant="success">Massive Savings</GradientText>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-white/35 max-w-lg mx-auto leading-relaxed"
          >
            From search to savings in seconds. Our AI does the heavy lifting
            so you never overpay for another game.
          </motion.p>
        </div>

        {/* Steps grid with connectors */}
        <div className="relative">
          {/* Background progress line */}
          <ProgressLine />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 lg:gap-0 items-stretch">
            {steps.map((step, i) => (
              <div key={step.number} className="contents">
                <StepCard step={step} index={i} />
                {i < steps.length - 1 && <TimelineConnector index={i} />}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center mt-16"
        >
          <GamingButton variant="primary" size="lg">
            Start Saving Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </GamingButton>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="text-xs text-white/20 font-heading mt-4"
          >
            No credit card required — free to start
          </motion.p>
        </motion.div>
      </PageContainer>

      {/* Bottom divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(0,212,170,0.08), rgba(124,58,237,0.08), transparent)",
          }}
        />
      </div>
    </section>
  );
}
