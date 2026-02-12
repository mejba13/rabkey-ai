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
import { staggerContainer, staggerItem } from "@/animations/variants";

/* ═══════════════════════════════════════════════
   Feature data
   ═══════════════════════════════════════════════ */

const features = [
  {
    icon: BarChart3,
    title: "Smart Deal Scores",
    description:
      "AI rates every deal 0-100 so you know exactly how good a price is. No more guessing — our ML model analyzes 7 factors in real time.",
    accent: "orange" as const,
    span: "md:col-span-2",
    visual: "score" as const,
  },
  {
    icon: TrendingUp,
    title: "Price Predictions",
    description:
      "LSTM + gradient boosting models predict price drops up to 90 days out. Buy now or wait — we'll tell you.",
    accent: "purple" as const,
    span: "md:row-span-2",
    visual: "chart" as const,
  },
  {
    icon: Search,
    title: "50+ Store Comparison",
    description:
      "Steam, GOG, Epic, Humble, and 50+ more stores compared instantly.",
    accent: "teal" as const,
    span: "",
    visual: "none" as const,
  },
  {
    icon: Bell,
    title: "Instant Price Alerts",
    description:
      "Set your target price and get notified the moment it drops. Never miss a deal again.",
    accent: "coral" as const,
    span: "",
    visual: "none" as const,
  },
  {
    icon: Shield,
    title: "Trust Verification",
    description:
      "NLP-powered store trust scores and review analysis. We track key revocation rates and fraud patterns.",
    accent: "teal" as const,
    span: "",
    visual: "none" as const,
  },
  {
    icon: Brain,
    title: "Personalized For You",
    description:
      "Sync your Steam, PlayStation, Xbox, and Nintendo libraries. Get recommendations tailored to your taste.",
    accent: "gold" as const,
    span: "",
    visual: "none" as const,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Real-time price updates every 15 minutes across all stores.",
    accent: "orange" as const,
    span: "",
    visual: "none" as const,
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "20+ currencies, 10 languages, region-specific pricing. Find the best deals anywhere in the world.",
    accent: "blue" as const,
    span: "md:col-span-2",
    visual: "globe" as const,
  },
] as const;

/* ═══════════════════════════════════════════════
   Color mapping
   ═══════════════════════════════════════════════ */

type Accent = (typeof features)[number]["accent"];

const palette: Record<Accent, { text: string; bg: string; border: string; glow: string; gradient: string }> = {
  orange: {
    text: "text-gaming-orange",
    bg: "bg-gaming-orange/10",
    border: "border-gaming-orange/20",
    glow: "hover:border-gaming-orange/40 hover:shadow-[0_0_30px_oklch(0.784_0.159_72.989/8%)]",
    gradient: "from-gaming-orange/8 via-transparent to-transparent",
  },
  purple: {
    text: "text-gaming-purple",
    bg: "bg-gaming-purple/10",
    border: "border-gaming-purple/20",
    glow: "hover:border-gaming-purple/40 hover:shadow-[0_0_30px_oklch(0.541_0.247_293.009/8%)]",
    gradient: "from-gaming-purple/8 via-transparent to-transparent",
  },
  teal: {
    text: "text-gaming-teal",
    bg: "bg-gaming-teal/10",
    border: "border-gaming-teal/20",
    glow: "hover:border-gaming-teal/40 hover:shadow-[0_0_30px_oklch(0.775_0.151_171.689/8%)]",
    gradient: "from-gaming-teal/8 via-transparent to-transparent",
  },
  coral: {
    text: "text-gaming-coral",
    bg: "bg-gaming-coral/10",
    border: "border-gaming-coral/20",
    glow: "hover:border-gaming-coral/40 hover:shadow-[0_0_30px_oklch(0.705_0.193_39.221/8%)]",
    gradient: "from-gaming-coral/8 via-transparent to-transparent",
  },
  gold: {
    text: "text-gaming-gold",
    bg: "bg-gaming-gold/10",
    border: "border-gaming-gold/20",
    glow: "hover:border-gaming-gold/40 hover:shadow-[0_0_30px_oklch(0.887_0.182_95.337/8%)]",
    gradient: "from-gaming-gold/8 via-transparent to-transparent",
  },
  blue: {
    text: "text-gaming-blue",
    bg: "bg-gaming-blue/10",
    border: "border-gaming-blue/20",
    glow: "hover:border-gaming-blue/40 hover:shadow-[0_0_30px_oklch(0.685_0.148_237.336/8%)]",
    gradient: "from-gaming-blue/8 via-transparent to-transparent",
  },
};

/* ═══════════════════════════════════════════════
   Mini-visualizations for hero cards
   ═══════════════════════════════════════════════ */

/** Score gauge for "Smart Deal Scores" card */
function MiniScoreViz() {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const progress = (92 / 100) * circ;

  return (
    <div className="flex items-center gap-4">
      {/* Score ring */}
      <div className="relative w-16 h-16 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="oklch(0.304 0.029 284.551 / 30%)" strokeWidth="4" />
          <motion.circle
            cx="32" cy="32" r={r}
            fill="none" stroke="url(#featScoreGrad)" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - progress }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="featScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-heading font-extrabold text-gaming-orange">92</span>
        </div>
      </div>

      {/* Score bars */}
      <div className="flex flex-col gap-1.5 flex-1 max-w-[140px]">
        {[
          { label: "Price", pct: 95, color: "#00D4AA" },
          { label: "Trust", pct: 88, color: "#F5A623" },
          { label: "Trend", pct: 72, color: "#7C3AED" },
        ].map((bar) => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground/50 w-8 font-heading">{bar.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-border/30 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: bar.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${bar.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Sparkline for "Price Predictions" card */
function MiniChartViz() {
  const line = "M 0 35 C 15 33, 25 40, 40 30 S 65 42, 85 22 S 110 30, 130 15 S 145 20, 160 10";

  return (
    <div className="mt-2">
      <svg className="w-full h-14" viewBox="0 0 160 48" preserveAspectRatio="none">
        <defs>
          <linearGradient id="featChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={line + " L 160 48 L 0 48 Z"}
          fill="url(#featChartFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        <motion.path
          d={line}
          fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="160" cy="10" r="3" fill="#7C3AED"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
        />
      </svg>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-muted-foreground/40 font-heading">30 days ago</span>
        <span className="text-[10px] text-gaming-purple font-heading font-semibold">-23% predicted</span>
      </div>
    </div>
  );
}

/** Globe dots for "Global Coverage" card */
function MiniGlobeViz() {
  const flags = ["🇺🇸", "🇬🇧", "🇩🇪", "🇫🇷", "🇯🇵", "🇧🇷", "🇦🇺", "🇰🇷", "🇨🇦", "🇵🇱", "🇮🇹", "🇪🇸"];

  return (
    <div className="flex items-center gap-2 flex-wrap mt-1">
      {flags.map((flag, i) => (
        <motion.span
          key={i}
          className="text-sm"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
        >
          {flag}
        </motion.span>
      ))}
      <span className="text-[10px] text-muted-foreground/40 font-heading ml-1">+8 more</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Features Section
   ═══════════════════════════════════════════════ */

export function FeaturesSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Section top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.784 0.159 72.989 / 20%), transparent)",
          }}
        />
      </div>

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, oklch(0.784 0.159 72.989 / 3%) 0%, transparent 70%)" }}
        />
      </div>

      <PageContainer>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-orange mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5">
            Why Gamers Choose{" "}
            <GradientText variant="primary">GrabKey AI</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Powered by machine learning and real-time data from 50+ stores.
            Every feature designed to save you money.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((feature) => {
            const colors = palette[feature.accent];
            const isWide = feature.span.includes("col-span-2");
            const isTall = feature.span.includes("row-span-2");

            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 280, damping: 22 },
                }}
                className={cn(
                  feature.span,
                  "group relative rounded-2xl",
                  isWide || isTall ? "p-7" : "p-6",
                  "bg-card/80 backdrop-blur-sm",
                  "border border-border/40",
                  "transition-all duration-300",
                  colors.glow,
                  "overflow-hidden"
                )}
              >
                {/* Hover gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    colors.gradient
                  )}
                />

                {/* Ambient glow for larger cards */}
                {(isWide || isTall) && (
                  <div
                    className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: feature.accent === "orange"
                        ? "oklch(0.784 0.159 72.989 / 10%)"
                        : feature.accent === "purple"
                          ? "oklch(0.541 0.247 293.009 / 10%)"
                          : "oklch(0.685 0.148 237.336 / 10%)",
                    }}
                  />
                )}

                <div className="relative z-10 flex flex-col gap-4 h-full">
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl border",
                      colors.bg,
                      colors.border,
                      "transition-shadow duration-300",
                      "group-hover:shadow-lg group-hover:shadow-black/10"
                    )}
                  >
                    <feature.icon className={cn("h-5 w-5", colors.text)} />
                  </div>

                  {/* Title */}
                  <h3 className={cn(
                    "font-heading font-bold",
                    isWide || isTall ? "text-xl" : "text-lg"
                  )}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  {/* Visual elements for hero cards */}
                  {feature.visual === "score" && <MiniScoreViz />}
                  {feature.visual === "chart" && <MiniChartViz />}
                  {feature.visual === "globe" && <MiniGlobeViz />}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </PageContainer>
    </section>
  );
}
