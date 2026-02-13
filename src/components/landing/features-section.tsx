"use client";

import { motion } from "motion/react";
import {
  BarChart3,
  TrendingUp,
  Search,
  Bell,
  Shield,
  Zap,
  Brain,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════
   Accent Color System
   ═══════════════════════════════════════════════ */

type Accent = "orange" | "purple" | "teal" | "coral" | "gold" | "blue";

const accentColors: Record<Accent, { text: string; bg: string; border: string; hex: string }> = {
  orange: { text: "text-gaming-orange", bg: "bg-gaming-orange/[0.07]", border: "border-gaming-orange/20", hex: "#F5A623" },
  purple: { text: "text-gaming-purple", bg: "bg-gaming-purple/[0.07]", border: "border-gaming-purple/20", hex: "#7C3AED" },
  teal:   { text: "text-gaming-teal",   bg: "bg-gaming-teal/[0.07]",   border: "border-gaming-teal/20",   hex: "#00D4AA" },
  coral:  { text: "text-gaming-coral",  bg: "bg-gaming-coral/[0.07]",  border: "border-gaming-coral/20",  hex: "#FF6B35" },
  gold:   { text: "text-gaming-gold",   bg: "bg-gaming-gold/[0.07]",   border: "border-gaming-gold/20",   hex: "#FFD700" },
  blue:   { text: "text-gaming-blue",   bg: "bg-gaming-blue/[0.07]",   border: "border-gaming-blue/20",   hex: "#0EA5E9" },
};

/* ═══════════════════════════════════════════════
   Spotlight Feature Data
   ═══════════════════════════════════════════════ */

interface SpotlightFeature {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  accent: Accent;
  details: string[];
}

const spotlightFeatures: SpotlightFeature[] = [
  {
    icon: BarChart3,
    label: "Core Intelligence",
    title: "Smart Deal Scores",
    description:
      "Every deal gets an AI-generated score from 0–100. Our ML model analyzes 7 weighted factors in real time so you always know if a price is worth it.",
    accent: "orange",
    details: ["Historical price analysis", "Store trust rating", "Price trend momentum"],
  },
  {
    icon: TrendingUp,
    label: "Predictive AI",
    title: "Price Predictions",
    description:
      "LSTM neural networks combined with gradient boosting models predict price drops up to 90 days in advance. Buy now or wait — we'll tell you exactly when.",
    accent: "purple",
    details: ["7, 14, 30, 90-day forecasts", "Drop probability scoring", "Optimal buy timing"],
  },
];

/* ═══════════════════════════════════════════════
   Secondary Feature Data
   ═══════════════════════════════════════════════ */

interface SecondaryFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
}

const secondaryFeatures: SecondaryFeature[] = [
  {
    icon: Search,
    title: "50+ Store Comparison",
    description: "Steam, GOG, Epic, Humble, and 50+ more stores compared in real time.",
    accent: "teal",
  },
  {
    icon: Bell,
    title: "Instant Price Alerts",
    description: "Set your target price and get notified the moment it drops.",
    accent: "coral",
  },
  {
    icon: Shield,
    title: "Trust Verification",
    description: "NLP-powered store trust scores, review analysis, and fraud detection.",
    accent: "teal",
  },
  {
    icon: Brain,
    title: "Personalized For You",
    description: "Sync your Steam, PlayStation, Xbox, and Nintendo libraries.",
    accent: "gold",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Real-time price updates every 15 minutes across all stores.",
    accent: "orange",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "20+ currencies, 10 languages, region-specific pricing worldwide.",
    accent: "blue",
  },
];

/* ═══════════════════════════════════════════════
   Score Ring Visualization
   ═══════════════════════════════════════════════ */

function ScoreRingViz() {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const progress = (92 / 100) * circ;

  const factors = [
    { label: "Price vs Historical", pct: 95, color: "#00D4AA" },
    { label: "Store Trust", pct: 88, color: "#F5A623" },
    { label: "Price Trend", pct: 72, color: "#7C3AED" },
    { label: "Region Compat.", pct: 96, color: "#0EA5E9" },
  ];

  return (
    <div className="flex items-start gap-8">
      {/* Large score ring */}
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke="currentColor"
            className="text-border/15"
            strokeWidth="4"
          />
          <motion.circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke="url(#spotlightScoreGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - progress }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="spotlightScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#F5A623" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-heading font-extrabold text-gaming-orange leading-none"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, type: "spring", stiffness: 200, damping: 18 }}
          >
            92
          </motion.span>
          <span className="text-[8px] text-muted-foreground/40 font-heading uppercase tracking-widest mt-0.5">
            Score
          </span>
        </div>
      </div>

      {/* Factor breakdown */}
      <div className="flex flex-col gap-3 flex-1">
        {factors.map((f, i) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground/40 font-heading w-24 shrink-0">
              {f.label}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-border/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: f.color, opacity: 0.65 }}
                initial={{ width: 0 }}
                whileInView={{ width: `${f.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="text-[11px] text-muted-foreground/30 font-heading font-medium w-8 text-right tabular-nums">
              {f.pct}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Prediction Chart Visualization
   ═══════════════════════════════════════════════ */

function PredictionChartViz() {
  const historicalLine = "M 0 38 C 12 36, 20 42, 35 34 S 55 44, 72 28 S 90 35, 105 22";
  const predictedLine = "M 105 22 C 115 18, 125 20, 140 14 S 155 16, 170 10";

  return (
    <div>
      <svg className="w-full h-20" viewBox="0 0 170 52" preserveAspectRatio="none">
        <defs>
          <linearGradient id="spotHistFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="spotPredFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Historical fill */}
        <motion.path
          d={historicalLine + " L 105 52 L 0 52 Z"}
          fill="url(#spotHistFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />

        {/* Historical line */}
        <motion.path
          d={historicalLine}
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
        />

        {/* Predicted fill */}
        <motion.path
          d={predictedLine + " L 170 52 L 105 52 Z"}
          fill="url(#spotPredFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.4 }}
        />

        {/* Predicted line (dashed) */}
        <motion.path
          d={predictedLine}
          fill="none"
          stroke="#00D4AA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 3"
          strokeOpacity="0.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 1, ease: "easeInOut" }}
        />

        {/* Divider at prediction start */}
        <line x1="105" y1="8" x2="105" y2="48" stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 3" />

        {/* End dot */}
        <motion.circle
          cx="170" cy="10" r="3"
          fill="#00D4AA"
          fillOpacity="0.7"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, type: "spring", stiffness: 300 }}
        />
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-gaming-purple/50" />
          <span className="text-[10px] text-muted-foreground/35 font-heading">Historical</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-px border-t border-dashed border-gaming-teal/50" />
          <span className="text-[10px] text-muted-foreground/35 font-heading">Predicted</span>
        </div>
        <span className="ml-auto text-[10px] text-gaming-teal/70 font-heading font-semibold">
          -23% in 14d
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Spotlight Feature Block (alternating layout)
   ═══════════════════════════════════════════════ */

function SpotlightBlock({
  feature,
  reversed,
  children,
}: {
  feature: SpotlightFeature;
  reversed?: boolean;
  children: React.ReactNode;
}) {
  const colors = accentColors[feature.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "flex flex-col gap-10 items-center",
        reversed ? "lg:flex-row-reverse" : "lg:flex-row",
        "lg:gap-16 xl:gap-20"
      )}
    >
      {/* Text side */}
      <div className="flex-1 max-w-lg">
        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", colors.bg)}>
            <feature.icon className={cn("h-4 w-4", colors.text)} strokeWidth={1.75} />
          </div>
          <span className={cn("text-[11px] font-heading font-semibold uppercase tracking-[0.15em]", colors.text)}>
            {feature.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-heading font-bold tracking-tight text-foreground/95 mb-4">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground/55 text-base leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* Detail list */}
        <ul className="space-y-2.5">
          {feature.details.map((detail, i) => (
            <motion.li
              key={detail}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: colors.hex, opacity: 0.6 }}
              />
              <span className="text-sm text-muted-foreground/45 font-heading">
                {detail}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Visualization side */}
      <div
        className={cn(
          "flex-1 w-full max-w-md lg:max-w-none",
          "rounded-2xl p-6 lg:p-8",
          "bg-card/40 border border-border/20",
          "backdrop-blur-sm"
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Secondary Feature Card (with accent left border)
   ═══════════════════════════════════════════════ */

function SecondaryCard({ feature, index }: { feature: SecondaryFeature; index: number }) {
  const colors = accentColors[feature.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className={cn(
        "group relative flex gap-4 p-5 rounded-xl",
        "bg-card/30 border border-border/20",
        "hover:border-border/35 transition-all duration-300",
        "overflow-hidden"
      )}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
        style={{ background: colors.hex, opacity: 0.3 }}
      />

      {/* Icon */}
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg shrink-0", colors.bg)}>
        <feature.icon className={cn("h-4 w-4", colors.text)} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-semibold text-[15px] text-foreground/90 tracking-tight">
          {feature.title}
        </h4>
        <p className="text-sm text-muted-foreground/45 leading-relaxed mt-1">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Section Export
   ═══════════════════════════════════════════════ */

export function FeaturesSection() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.784 0.159 72.989 / 12%), transparent)",
          }}
        />
      </div>

      <PageContainer>
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 lg:mb-28"
        >
          <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-orange/80 mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5 tracking-tight">
            Why Gamers Choose{" "}
            <GradientText variant="primary">GrabKey AI</GradientText>
          </h2>
          <p className="text-muted-foreground/55 max-w-lg mx-auto text-base lg:text-lg leading-relaxed">
            Powered by machine learning and real-time data from 50+ stores.
            Every feature designed to save you money.
          </p>
        </motion.div>

        {/* ── Spotlight Features (alternating editorial layout) ── */}
        <div className="space-y-20 lg:space-y-28 mb-20 lg:mb-28">
          {/* Spotlight 1: Smart Deal Scores */}
          <SpotlightBlock feature={spotlightFeatures[0]}>
            <ScoreRingViz />
          </SpotlightBlock>

          {/* Spotlight 2: Price Predictions (reversed) */}
          <SpotlightBlock feature={spotlightFeatures[1]} reversed>
            <PredictionChartViz />
          </SpotlightBlock>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-16 lg:mb-20">
          <div className="flex-1 h-px bg-border/15" />
          <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-muted-foreground/25">
            And more
          </span>
          <div className="flex-1 h-px bg-border/15" />
        </div>

        {/* ── Secondary Features Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {secondaryFeatures.map((feature, i) => (
            <SecondaryCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
