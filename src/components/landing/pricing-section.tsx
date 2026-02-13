"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Crown, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
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
    accentColor: "text-white/40",
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
    buttonVariant: "secondary",
    buttonText: "Go Ultimate",
  },
];

function BillingToggle({ isYearly, onChange }: { isYearly: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full bg-white/[0.03] border border-white/[0.05] p-1">
      <motion.div
        layoutId="billing-indicator"
        className="absolute top-1 bottom-1 rounded-full bg-gaming-orange"
        style={{ width: "calc(50% - 4px)" }}
        animate={{ x: isYearly ? "calc(100% + 4px)" : 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      />
      <button
        onClick={() => onChange(false)}
        className={cn(
          "relative z-10 px-6 py-2 rounded-full text-sm font-heading font-semibold transition-colors",
          !isYearly ? "text-white" : "text-white/35 hover:text-white/60"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange(true)}
        className={cn(
          "relative z-10 px-6 py-2 rounded-full text-sm font-heading font-semibold transition-colors flex items-center gap-2",
          isYearly ? "text-white" : "text-white/35 hover:text-white/60"
        )}
      >
        Yearly
        <span className="text-[10px] font-bold bg-gaming-teal/15 text-gaming-teal px-2 py-0.5 rounded-full">
          -20%
        </span>
      </button>
    </div>
  );
}

function FeatureRow({ feature, muted }: { feature: FeatureItem; muted?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      {feature.included ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gaming-teal/[0.1] shrink-0">
          <Check className="h-3 w-3 text-gaming-teal" />
        </div>
      ) : (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.04] shrink-0">
          <X className="h-3 w-3 text-white/15" />
        </div>
      )}
      <span
        className={cn(
          feature.included
            ? muted ? "text-white/50" : "text-white/80"
            : "text-white/20 line-through decoration-white/[0.06]"
        )}
      >
        {feature.text}
      </span>
    </li>
  );
}

function AnimatedPrice({ price, isYearly, highlight }: { price: number; isYearly: boolean; highlight?: boolean }) {
  return (
    <div className="mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={isYearly ? "yearly" : "monthly"}
          initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {price === 0 ? (
            <p className="font-heading font-bold text-4xl text-white/40">
              Free
            </p>
          ) : (
            <p className={cn("font-heading font-bold text-4xl text-white/90", highlight && "text-white")}>
              <span className="text-lg font-normal text-white/40 align-top mr-0.5">$</span>
              {price.toFixed(2)}
              <span className="text-base font-normal text-white/30 ml-0.5">/mo</span>
            </p>
          )}
        </motion.div>
      </AnimatePresence>
      {isYearly && price > 0 && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-gaming-teal/80 mt-1.5 font-heading font-medium"
        >
          Billed ${(price * 12).toFixed(2)}/year — Save ${((price / 0.8 - price) * 12).toFixed(0)}/yr
        </motion.p>
      )}
    </div>
  );
}

function PricingCard({ tier, isYearly }: { tier: TierConfig; isYearly: boolean }) {
  const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
  const TierIcon = tier.icon;
  const isFree = tier.name === "Free";
  const isPro = tier.highlight;
  const isUltimate = tier.name === "Ultimate";

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 260, damping: 24 } }}
      className={cn(
        "relative flex flex-col rounded-2xl",
        isPro && "md:scale-105 z-10"
      )}
    >
      {/* Pro card gradient border */}
      {isPro && (
        <div
          className="absolute -inset-px rounded-2xl z-0"
          style={{
            background: "linear-gradient(135deg, #F5A623, #FF6B35, #F5A623)",
          }}
        />
      )}

      <div
        className={cn(
          "relative flex flex-1 flex-col rounded-2xl p-7 z-10",
          "bg-card/50 backdrop-blur-sm",
          !isPro && "border border-border/30",
          isUltimate && "hover:border-gaming-purple/25 transition-colors duration-300",
          isFree && "opacity-85 hover:opacity-100 transition-opacity duration-300"
        )}
      >
        {/* Badge */}
        {tier.badge && (
          <span
            className={cn(
              "absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center",
              "bg-gradient-to-r from-gaming-orange to-gaming-coral",
              "text-white shadow-lg shadow-gaming-orange/15",
              "font-heading text-[10px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full"
            )}
          >
            <Sparkles className="h-3 w-3 mr-1.5" />
            {tier.badge}
          </span>
        )}

        {/* Tier header */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              isPro
                ? "bg-gaming-orange/[0.1]"
                : isUltimate
                  ? "bg-gaming-purple/[0.1]"
                  : "bg-white/[0.04]"
            )}
          >
            <TierIcon className={cn("h-5 w-5", tier.accentColor)} />
          </div>
          <h3 className={cn("font-heading font-bold text-xl", isFree ? "text-white/50" : "text-white/90")}>
            {tier.name}
          </h3>
        </div>

        <p className={cn("text-sm mb-5", isFree ? "text-white/30" : "text-white/40")}>
          {tier.description}
        </p>

        <AnimatedPrice price={price} isYearly={isYearly} highlight={isPro} />

        {/* Divider */}
        <div
          className={cn(
            "h-px w-full mb-6",
            isPro
              ? "bg-gradient-to-r from-transparent via-gaming-orange/20 to-transparent"
              : isUltimate
                ? "bg-gradient-to-r from-transparent via-gaming-purple/15 to-transparent"
                : "bg-white/[0.06]"
          )}
        />

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {tier.features.map((feature) => (
            <FeatureRow key={feature.text} feature={feature} muted={isFree} />
          ))}
        </ul>

        <GamingButton variant={tier.buttonVariant} size="lg" className="w-full">
          {tier.buttonText}
        </GamingButton>
      </div>
    </motion.div>
  );
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      <PageContainer>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-purple/80 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
            Choose Your{" "}
            <GradientText variant="secondary">Power Level</GradientText>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base lg:text-lg leading-relaxed mb-10">
            Start free and upgrade when you need more power
          </p>

          <BillingToggle isYearly={isYearly} onChange={setIsYearly} />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center max-w-5xl mx-auto"
        >
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} isYearly={isYearly} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-white/30 mt-10"
        >
          All plans include a 14-day money-back guarantee. No credit card required for Free tier.
        </motion.p>
      </PageContainer>
    </section>
  );
}
