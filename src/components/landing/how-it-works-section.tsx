"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Search, BarChart3, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Search Any Game",
    description:
      "Type a game name and instantly see prices from 50+ stores. Our real-time engine updates every 15 minutes across all major retailers.",
    accent: "gaming-orange",
    detail: "Instant results from Steam, GOG, Epic, Humble, and more",
  },
  {
    number: 2,
    icon: BarChart3,
    title: "AI Scores Every Deal",
    description:
      "Our ML model rates each deal 0-100 by analyzing historical prices, store trust, price trends, and predicting future drops. You'll know exactly when to buy.",
    accent: "gaming-purple",
    detail: "7-factor analysis with 90-day price predictions",
  },
  {
    number: 3,
    icon: Zap,
    title: "Save Big, Every Time",
    description:
      "Grab the best deal with confidence. Set alerts for price drops, sync your wishlist, and never overpay again. Our users save an average of 60%.",
    accent: "gaming-teal",
    detail: "Average savings of 60% on every purchase",
  },
] as const;

const accentColorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  "gaming-orange": { text: "text-gaming-orange", bg: "bg-gaming-orange", border: "border-gaming-orange/30", glow: "shadow-gaming-orange/20" },
  "gaming-purple": { text: "text-gaming-purple", bg: "bg-gaming-purple", border: "border-gaming-purple/30", glow: "shadow-gaming-purple/20" },
  "gaming-teal": { text: "text-gaming-teal", bg: "bg-gaming-teal", border: "border-gaming-teal/30", glow: "shadow-gaming-teal/20" },
};

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const colors = accentColorMap[step.accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 100, damping: 20 }}
      className="relative"
    >
      {/* Connecting line (hidden on last item) */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-px h-[calc(100%+2rem)]">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            className="w-full h-full origin-top"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.784 0.159 72.989 / 30%), oklch(0.541 0.247 293.009 / 15%), transparent)",
            }}
          />
        </div>
      )}

      <div
        className={cn(
          "relative rounded-2xl p-8 md:p-10",
          "bg-card border border-border/50",
          "group hover:border-border transition-colors duration-300"
        )}
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Step number + icon */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            {/* Number badge with pulse */}
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.5 }}
                className={cn(
                  "absolute inset-0 rounded-full",
                  colors.bg,
                  "opacity-30"
                )}
              />
              <div
                className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-full",
                  colors.bg,
                  "text-white font-heading font-bold text-xl",
                  "shadow-lg",
                  colors.glow
                )}
              >
                {step.number}
              </div>
            </div>

            {/* Icon */}
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl",
                "bg-gaming-surface-elevated border",
                colors.border
              )}
            >
              <step.icon className={cn("h-8 w-8", colors.text)} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-heading font-bold text-xl md:text-2xl mb-3">
              {step.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {step.description}
            </p>
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm",
                "bg-gaming-surface border border-border/50",
                colors.text,
                "font-heading font-medium"
              )}
            >
              <step.icon className="h-4 w-4" />
              {step.detail}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="relative py-24 bg-gaming-surface/50">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.304 0.029 284.551 / 50%), transparent)",
          }}
        />
      </div>

      <PageContainer>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
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

        {/* Steps */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
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
