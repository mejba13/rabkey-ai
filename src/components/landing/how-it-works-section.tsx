"use client";

import { motion } from "motion/react";
import { Search, BarChart3, Zap, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  accent: "orange" | "purple" | "teal";
}

const steps: Step[] = [
  {
    number: "01",
    icon: Search,
    title: "Search Any Game",
    description:
      "Type a game name and instantly compare prices from 50+ stores. Our real-time engine refreshes every 15 minutes across all major retailers.",
    detail: "Steam, GOG, Epic, Humble & more",
    accent: "orange",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "AI Scores Every Deal",
    description:
      "Our ML model rates each deal 0–100 by analyzing historical prices, store trust, price trends, and predicting future drops.",
    detail: "7-factor analysis · 90-day predictions",
    accent: "purple",
  },
  {
    number: "03",
    icon: Zap,
    title: "Save Big, Every Time",
    description:
      "Grab the best deal with confidence. Set alerts, sync your wishlist, and never overpay again. Our users save an average of 60%.",
    detail: "Average 60% savings per purchase",
    accent: "teal",
  },
];

const accentStyles = {
  orange: {
    text: "text-gaming-orange",
    iconBg: "bg-gaming-orange/[0.08]",
    iconBorder: "border-gaming-orange/20",
    hoverBorder: "hover:border-gaming-orange/25",
    numberColor: "text-gaming-orange/[0.06]",
    dotBg: "bg-gaming-orange",
    detailBg: "bg-gaming-orange/[0.06]",
    detailBorder: "border-gaming-orange/10",
  },
  purple: {
    text: "text-gaming-purple",
    iconBg: "bg-gaming-purple/[0.08]",
    iconBorder: "border-gaming-purple/20",
    hoverBorder: "hover:border-gaming-purple/25",
    numberColor: "text-gaming-purple/[0.06]",
    dotBg: "bg-gaming-purple",
    detailBg: "bg-gaming-purple/[0.06]",
    detailBorder: "border-gaming-purple/10",
  },
  teal: {
    text: "text-gaming-teal",
    iconBg: "bg-gaming-teal/[0.08]",
    iconBorder: "border-gaming-teal/20",
    hoverBorder: "hover:border-gaming-teal/25",
    numberColor: "text-gaming-teal/[0.06]",
    dotBg: "bg-gaming-teal",
    detailBg: "bg-gaming-teal/[0.06]",
    detailBorder: "border-gaming-teal/10",
  },
} as const;

function StepCard({ step }: { step: Step }) {
  const colors = accentStyles[step.accent];
  const Icon = step.icon;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden",
        "bg-card/50 border border-border/30",
        colors.hoverBorder,
        "transition-all duration-300"
      )}
    >
      {/* Watermark step number */}
      <span
        className={cn(
          "absolute -top-6 -right-3 font-heading font-black text-[10rem] leading-none select-none pointer-events-none",
          colors.numberColor
        )}
        aria-hidden="true"
      >
        {step.number}
      </span>

      <div className="relative flex flex-col flex-1 p-7 lg:p-8">
        {/* Top row: step indicator + icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Accent dot */}
            <span
              className={cn("h-2 w-2 rounded-full shrink-0", colors.dotBg)}
            />
            <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
              Step {step.number}
            </span>
          </div>

          {/* Icon box */}
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border",
              colors.iconBg,
              colors.iconBorder,
              "transition-colors duration-300"
            )}
          >
            <Icon className={cn("h-5 w-5", colors.text)} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg lg:text-xl text-foreground/90 mb-3">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground/60 leading-relaxed flex-1 mb-5">
          {step.description}
        </p>

        {/* Detail chip */}
        <div
          className={cn(
            "inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full",
            "text-[11px] font-heading font-medium",
            colors.detailBg,
            "border",
            colors.detailBorder,
            colors.text
          )}
        >
          {step.detail}
        </div>
      </div>
    </motion.div>
  );
}

/* Connecting arrows between cards — visible on lg screens only */
function StepConnector({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
      className="hidden lg:flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card/60 border border-border/30">
        <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="relative py-28 lg:py-32 overflow-hidden">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.304 0.029 284.551 / 40%), transparent)",
          }}
        />
      </div>

      {/* Subtle background tint */}
      <div className="pointer-events-none absolute inset-0 bg-gaming-surface/[0.12]" />

      <PageContainer className="relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-purple/80 mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
            Three Steps to{" "}
            <GradientText variant="success">Massive Savings</GradientText>
          </h2>
          <p className="text-muted-foreground/60 max-w-lg mx-auto text-base lg:text-lg leading-relaxed">
            From search to savings in seconds. Our AI does the heavy lifting.
          </p>
        </motion.div>

        {/* Steps grid with connectors */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 lg:gap-0 items-stretch"
        >
          {steps.map((step, i) => (
            <div key={step.number} className="contents">
              <StepCard step={step} />
              {i < steps.length - 1 && <StepConnector index={i} />}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mt-14"
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
