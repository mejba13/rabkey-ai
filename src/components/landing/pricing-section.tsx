"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Crown, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem } from "@/animations/variants";

interface FeatureItem {
  text: string;
  included: boolean;
}

interface TierConfig {
  name: string;
  icon: typeof Crown;
  monthlyPrice: number;
  yearlyPrice: number;
  features: FeatureItem[];
  highlight: boolean;
  badge?: string;
  accentColor: string;
  borderClass: string;
  glowClass: string;
  buttonVariant: "outline" | "primary" | "secondary" | "legendary";
  buttonText: string;
  description: string;
}

const tiers: TierConfig[] = [
  {
    name: "Free",
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for casual gamers",
    features: [
      { text: "Basic price comparison", included: true },
      { text: "3 price alerts", included: true },
      { text: "30-day price history", included: true },
      { text: "Community support", included: true },
      { text: "AI deal scores", included: false },
      { text: "Price predictions", included: false },
    ],
    highlight: false,
    accentColor: "text-muted-foreground",
    borderClass: "border-border/50",
    glowClass: "",
    buttonVariant: "outline",
    buttonText: "Get Started Free",
  },
  {
    name: "Pro",
    icon: Sparkles,
    monthlyPrice: 9.99,
    yearlyPrice: 7.99,
    description: "For the smart deal hunter",
    features: [
      { text: "Everything in Free +", included: true },
      { text: "Full AI deal scores", included: true },
      { text: "25 price alerts", included: true },
      { text: "1-year price history", included: true },
      { text: "7-day price predictions", included: true },
      { text: "Ad-free experience", included: true },
    ],
    highlight: true,
    badge: "Most Popular",
    accentColor: "text-gaming-orange",
    borderClass: "border-gaming-orange/50",
    glowClass: "glow-orange",
    buttonVariant: "primary",
    buttonText: "Start Pro Trial",
  },
  {
    name: "Ultimate",
    icon: Crown,
    monthlyPrice: 24.99,
    yearlyPrice: 19.99,
    description: "Maximum savings, zero limits",
    features: [
      { text: "Everything in Pro +", included: true },
      { text: "Score breakdowns & insights", included: true },
      { text: "Unlimited price alerts", included: true },
      { text: "All-time history + CSV export", included: true },
      { text: "90-day price predictions", included: true },
      { text: "Auto-coupon browser extension", included: true },
      { text: "Priority support", included: true },
    ],
    highlight: false,
    accentColor: "text-gaming-purple",
    borderClass: "border-gaming-purple/30",
    glowClass: "",
    buttonVariant: "secondary",
    buttonText: "Go Ultimate",
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.541 0.247 293.009 / 20%), transparent)",
          }}
        />
      </div>

      <PageContainer>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-purple mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Choose Your{" "}
            <GradientText variant="secondary">Power Level</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-8">
            Start free and upgrade when you need more power
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-gaming-surface border border-border/50">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all",
                !isYearly
                  ? "bg-gaming-orange text-white shadow-lg shadow-gaming-orange/25"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all flex items-center gap-2",
                isYearly
                  ? "bg-gaming-orange text-white shadow-lg shadow-gaming-orange/25"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <span className="text-[10px] font-bold bg-gaming-teal/20 text-gaming-teal px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {tiers.map((tier) => {
            const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
            const TierIcon = tier.icon;

            return (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 25 } }}
                className={cn(
                  "relative rounded-2xl border bg-card p-7",
                  "flex flex-col",
                  tier.borderClass,
                  tier.highlight && cn(tier.glowClass, "md:-mt-4 md:mb-4")
                )}
              >
                {/* Gradient border effect for highlighted tier */}
                {tier.highlight && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.784 0.159 72.989 / 15%), transparent 50%, oklch(0.705 0.193 39.221 / 15%))",
                    }}
                  />
                )}

                {/* Badge */}
                {tier.badge && (
                  <Badge
                    className={cn(
                      "absolute -top-3 left-1/2 -translate-x-1/2",
                      "bg-gaming-orange text-white border-0",
                      "font-heading text-xs px-4 py-1"
                    )}
                  >
                    {tier.badge}
                  </Badge>
                )}

                <div className="relative z-10">
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      tier.highlight ? "bg-gaming-orange/10" : "bg-gaming-surface-elevated"
                    )}>
                      <TierIcon className={cn("h-5 w-5", tier.accentColor)} />
                    </div>
                    <h3 className="font-heading font-bold text-xl">{tier.name}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isYearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {price === 0 ? (
                          <p className="font-heading font-bold text-4xl">Free</p>
                        ) : (
                          <p className="font-heading font-bold text-4xl">
                            ${price.toFixed(2)}
                            <span className="text-base font-normal text-muted-foreground">
                              /mo
                            </span>
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    {isYearly && price > 0 && (
                      <p className="text-xs text-gaming-teal mt-1 font-heading">
                        Billed ${(price * 12).toFixed(2)}/year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature.text}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        {feature.included ? (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gaming-teal/10 shrink-0">
                            <Check className="h-3 w-3 text-gaming-teal" />
                          </div>
                        ) : (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted shrink-0">
                            <X className="h-3 w-3 text-muted-foreground/40" />
                          </div>
                        )}
                        <span
                          className={cn(
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground/40"
                          )}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <GamingButton
                    variant={tier.buttonVariant}
                    size="lg"
                    className="w-full"
                  >
                    {tier.buttonText}
                  </GamingButton>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          All plans include a 14-day money-back guarantee. No credit card required for Free tier.
        </motion.p>
      </PageContainer>
    </section>
  );
}
