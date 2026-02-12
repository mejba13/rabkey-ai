"use client";

import { motion } from "motion/react";
import { Search, BarChart3, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";

/* -------------------------------------------------------------------------- */
/*  Step data                                                                 */
/* -------------------------------------------------------------------------- */

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Any Game",
    description:
      "Type a game name and instantly see prices from 50+ stores. Our real-time engine updates every 15 minutes across all major retailers.",
    detail: "Instant results from Steam, GOG, Epic, Humble, and more",
    accent: "orange" as const,
  },
  {
    number: "02",
    icon: BarChart3,
    title: "AI Scores Every Deal",
    description:
      "Our ML model rates each deal 0-100 by analyzing historical prices, store trust, price trends, and predicting future drops. You'll know exactly when to buy.",
    detail: "7-factor analysis with 90-day price predictions",
    accent: "purple" as const,
  },
  {
    number: "03",
    icon: Zap,
    title: "Save Big, Every Time",
    description:
      "Grab the best deal with confidence. Set alerts for price drops, sync your wishlist, and never overpay again. Our users save an average of 60%.",
    detail: "Average savings of 60% on every purchase",
    accent: "teal" as const,
  },
] as const;

type Accent = (typeof steps)[number]["accent"];

/* -------------------------------------------------------------------------- */
/*  Accent color mapping                                                      */
/* -------------------------------------------------------------------------- */

const accentColors: Record<
  Accent,
  {
    text: string;
    number: string;
    iconBg: string;
    iconBorder: string;
    pillBorder: string;
    glowFrom: string;
    gradientLine: string;
  }
> = {
  orange: {
    text: "text-gaming-orange",
    number: "text-gaming-orange",
    iconBg: "bg-gaming-orange/10",
    iconBorder: "border-gaming-orange/30",
    pillBorder: "border-gaming-orange/25",
    glowFrom: "shadow-gaming-orange/10",
    gradientLine: "from-gaming-orange/60",
  },
  purple: {
    text: "text-gaming-purple",
    number: "text-gaming-purple",
    iconBg: "bg-gaming-purple/10",
    iconBorder: "border-gaming-purple/30",
    pillBorder: "border-gaming-purple/25",
    glowFrom: "shadow-gaming-purple/10",
    gradientLine: "from-gaming-purple/60",
  },
  teal: {
    text: "text-gaming-teal",
    number: "text-gaming-teal",
    iconBg: "bg-gaming-teal/10",
    iconBorder: "border-gaming-teal/30",
    pillBorder: "border-gaming-teal/25",
    glowFrom: "shadow-gaming-teal/10",
    gradientLine: "from-gaming-teal/60",
  },
};

/* -------------------------------------------------------------------------- */
/*  Spring transition preset                                                  */
/* -------------------------------------------------------------------------- */

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};

/* -------------------------------------------------------------------------- */
/*  Step Card                                                                 */
/* -------------------------------------------------------------------------- */

interface StepCardProps {
  step: (typeof steps)[number];
  index: number;
}

function StepCard({ step, index }: StepCardProps) {
  const colors = accentColors[step.accent];
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        ...springTransition,
        delay: index * 0.15,
      }}
      className="relative flex flex-col items-center text-center"
    >
      {/* ---------- Large step number ---------- */}
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          ...springTransition,
          delay: index * 0.15 + 0.1,
        }}
        className={cn(
          "font-heading font-extrabold text-7xl lg:text-8xl leading-none select-none",
          colors.number,
          "opacity-90"
        )}
        aria-hidden="true"
      >
        {step.number}
      </motion.span>

      {/* ---------- Card body ---------- */}
      <div
        className={cn(
          "relative -mt-4 w-full rounded-2xl p-6 lg:p-8",
          "bg-gaming-surface/50 backdrop-blur-md",
          "border border-border/30",
          "transition-shadow duration-300",
          "hover:shadow-xl",
          colors.glowFrom
        )}
      >
        {/* Icon circle */}
        <div className="flex justify-center mb-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              ...springTransition,
              delay: index * 0.15 + 0.2,
            }}
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full",
              "border",
              colors.iconBg,
              colors.iconBorder
            )}
          >
            <Icon className={cn("h-6 w-6", colors.text)} />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl lg:text-2xl text-white mb-3">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-sm lg:text-base mb-5">
          {step.description}
        </p>

        {/* Detail pill */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs lg:text-sm",
            "bg-gaming-surface border",
            colors.pillBorder,
            colors.text,
            "font-heading font-medium"
          )}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          {step.detail}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress Line (desktop only)                                              */
/* -------------------------------------------------------------------------- */

function ProgressLine() {
  return (
    <div
      className="hidden lg:block absolute top-[6.5rem] left-0 right-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="mx-auto w-2/3 h-px origin-left"
        style={{
          background:
            "linear-gradient(to right, #F5A623, #7C3AED, #00D4AA)",
        }}
      />

      {/* Glow behind the line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="mx-auto -mt-px w-2/3 h-[3px] origin-left blur-sm"
        style={{
          background:
            "linear-gradient(to right, #F5A623, #7C3AED, #00D4AA)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Section                                                              */
/* -------------------------------------------------------------------------- */

export function HowItWorksSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-gaming-surface/30">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0" aria-hidden="true">
        <div
          className="mx-auto h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.304 0.029 284.551 / 50%), transparent)",
          }}
        />
      </div>

      <PageContainer>
        {/* ---- Section header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-purple mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Three Steps to{" "}
            <GradientText variant="success">Massive Savings</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            From search to savings in seconds. Our AI does the heavy lifting.
          </p>
        </motion.div>

        {/* ---- Steps grid ---- */}
        <div className="relative">
          {/* Horizontal progress line connecting steps */}
          <ProgressLine />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* ---- CTA button ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="text-center mt-16"
        >
          <GamingButton variant="primary" size="lg">
            Start Saving Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </GamingButton>
        </motion.div>
      </PageContainer>
    </section>
  );
}
