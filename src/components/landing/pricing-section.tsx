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

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Tier Data                                                                  */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Billing Toggle                                                             */
/* -------------------------------------------------------------------------- */

function BillingToggle({
  isYearly,
  onChange,
}: {
  isYearly: boolean;
  onChange: (yearly: boolean) => void;
}) {
  return (
    <div className="relative inline-flex items-center rounded-full bg-gaming-surface border border-border/50 p-1">
      {/* Sliding indicator */}
      <motion.div
        layoutId="billing-indicator"
        className="absolute top-1 bottom-1 rounded-full bg-gaming-orange shadow-lg shadow-gaming-orange/25"
        style={{ width: "calc(50% - 4px)" }}
        animate={{ x: isYearly ? "calc(100% + 4px)" : 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      />

      <button
        onClick={() => onChange(false)}
        className={cn(
          "relative z-10 px-6 py-2 rounded-full text-sm font-heading font-semibold transition-colors",
          !isYearly ? "text-white" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange(true)}
        className={cn(
          "relative z-10 px-6 py-2 rounded-full text-sm font-heading font-semibold transition-colors flex items-center gap-2",
          isYearly ? "text-white" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Yearly
        <span className="text-[10px] font-bold bg-gaming-teal/20 text-gaming-teal px-2 py-0.5 rounded-full">
          -20%
        </span>
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature Row                                                                */
/* -------------------------------------------------------------------------- */

function FeatureRow({ feature, muted }: { feature: FeatureItem; muted?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      {feature.included ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gaming-teal/15 shrink-0 ring-1 ring-gaming-teal/20">
          <Check className="h-3 w-3 text-gaming-teal" />
        </div>
      ) : (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted/50 shrink-0">
          <X className="h-3 w-3 text-muted-foreground/30" />
        </div>
      )}
      <span
        className={cn(
          feature.included
            ? muted
              ? "text-muted-foreground"
              : "text-foreground"
            : "text-muted-foreground/30 line-through decoration-muted-foreground/15"
        )}
      >
        {feature.text}
      </span>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animated Price                                                             */
/* -------------------------------------------------------------------------- */

function AnimatedPrice({
  price,
  isYearly,
  highlight,
}: {
  price: number;
  isYearly: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={isYearly ? "yearly" : "monthly"}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {price === 0 ? (
            <p className="font-heading font-bold text-4xl text-muted-foreground">
              Free
            </p>
          ) : (
            <p
              className={cn(
                "font-heading font-bold text-4xl",
                highlight && "text-white"
              )}
            >
              <span className="text-lg font-normal text-muted-foreground align-top mr-0.5">
                $
              </span>
              {price.toFixed(2)}
              <span className="text-base font-normal text-muted-foreground ml-0.5">
                /mo
              </span>
            </p>
          )}
        </motion.div>
      </AnimatePresence>
      {isYearly && price > 0 && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-gaming-teal mt-1.5 font-heading font-medium"
        >
          Billed ${(price * 12).toFixed(2)}/year — Save ${((price / 0.8 - price) * 12).toFixed(0)}/yr
        </motion.p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pricing Card                                                               */
/* -------------------------------------------------------------------------- */

function PricingCard({
  tier,
  isYearly,
}: {
  tier: TierConfig;
  isYearly: boolean;
}) {
  const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
  const TierIcon = tier.icon;
  const isFree = tier.name === "Free";
  const isPro = tier.highlight;
  const isUltimate = tier.name === "Ultimate";

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 260, damping: 24 },
      }}
      className={cn(
        "relative flex flex-col rounded-2xl",
        /* Pro tier: taller via scale, gradient-border class, highest z-index */
        isPro && "gradient-border md:scale-105 z-10",
        /* Ultimate: subtle purple glow on hover */
        isUltimate && "group/ultimate",
        /* Free: more muted, lower emphasis */
        isFree && "opacity-90 hover:opacity-100 transition-opacity duration-300"
      )}
    >
      {/* Ambient glow behind Pro card */}
      {isPro && (
        <div
          className="pointer-events-none absolute -inset-6 -z-20 rounded-3xl opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.784 0.159 72.989 / 30%), transparent 70%)",
          }}
        />
      )}

      {/* Ultimate purple hover glow */}
      {isUltimate && (
        <div
          className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover/ultimate:opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.541 0.247 293.009 / 50%), transparent 70%)",
          }}
        />
      )}

      {/* Card inner content — glassmorphic bg */}
      <div
        className={cn(
          "relative flex flex-1 flex-col rounded-2xl p-7",
          "bg-card/80 backdrop-blur-sm",
          /* Non-highlighted tiers get a subtle border */
          !isPro && "border",
          isFree && "border-border/30",
          isUltimate && "border-gaming-purple/20 group-hover/ultimate:border-gaming-purple/40 transition-colors duration-300"
        )}
      >
        {/* "Most Popular" badge */}
        {tier.badge && (
          <Badge
            className={cn(
              "absolute -top-3 left-1/2 -translate-x-1/2",
              "bg-gradient-to-r from-gaming-orange to-gaming-coral",
              "text-white border-0 shadow-lg shadow-gaming-orange/20",
              "font-heading text-xs px-4 py-1 tracking-wide"
            )}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            {tier.badge}
          </Badge>
        )}

        {/* Tier icon + name */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              isPro
                ? "bg-gaming-orange/15 ring-1 ring-gaming-orange/20"
                : isUltimate
                  ? "bg-gaming-purple/15 ring-1 ring-gaming-purple/20"
                  : "bg-gaming-surface-elevated"
            )}
          >
            <TierIcon className={cn("h-5 w-5", tier.accentColor)} />
          </div>
          <h3
            className={cn(
              "font-heading font-bold text-xl",
              isFree && "text-muted-foreground"
            )}
          >
            {tier.name}
          </h3>
        </div>

        <p
          className={cn(
            "text-sm mb-5",
            isFree ? "text-muted-foreground/60" : "text-muted-foreground"
          )}
        >
          {tier.description}
        </p>

        {/* Price with animated transition */}
        <AnimatedPrice
          price={price}
          isYearly={isYearly}
          highlight={isPro}
        />

        {/* Divider */}
        <div
          className={cn(
            "h-px w-full mb-6",
            isPro
              ? "bg-gradient-to-r from-transparent via-gaming-orange/25 to-transparent"
              : isUltimate
                ? "bg-gradient-to-r from-transparent via-gaming-purple/20 to-transparent"
                : "bg-border/30"
          )}
        />

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {tier.features.map((feature) => (
            <FeatureRow key={feature.text} feature={feature} muted={isFree} />
          ))}
        </ul>

        {/* CTA Button */}
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
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section background — subtle top divider gradient line */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.541 0.247 293.009 / 25%), oklch(0.784 0.159 72.989 / 20%), transparent)",
          }}
        />
        {/* Faint radial ambient behind the card area */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.784 0.159 72.989), transparent 70%)",
          }}
        />
      </div>

      <PageContainer>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-purple mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Choose Your{" "}
            <GradientText variant="secondary">Power Level</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-10">
            Start free and upgrade when you need more power
          </p>

          {/* Monthly / Yearly Toggle */}
          <BillingToggle isYearly={isYearly} onChange={setIsYearly} />
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center max-w-5xl mx-auto"
        >
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} isYearly={isYearly} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-10"
        >
          All plans include a 14-day money-back guarantee. No credit card required for Free tier.
        </motion.p>
      </PageContainer>
    </section>
  );
}
