"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { Badge } from "@/components/ui/badge";
import { SUBSCRIPTION_TIERS } from "@/lib/constants";
import { formatPrice } from "@/lib/formatters";
import { staggerContainer, staggerItem } from "@/animations/variants";

interface FeatureItem {
  text: string;
  included: boolean;
}

interface TierConfig {
  key: keyof typeof SUBSCRIPTION_TIERS;
  features: FeatureItem[];
  highlight: boolean;
  badge?: string;
  borderClass: string;
  buttonVariant: "outline" | "primary" | "secondary";
  buttonText: string;
}

const tiers: TierConfig[] = [
  {
    key: "free",
    features: [
      { text: "Basic price comparison", included: true },
      { text: "3 price alerts", included: true },
      { text: "30-day price history", included: true },
      { text: "Community support", included: true },
      { text: "AI deal scores", included: false },
      { text: "Price predictions", included: false },
    ],
    highlight: false,
    borderClass: "border-border",
    buttonVariant: "outline",
    buttonText: "Get Started",
  },
  {
    key: "pro",
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
    borderClass: "border-gaming-orange",
    buttonVariant: "primary",
    buttonText: "Start Pro Trial",
  },
  {
    key: "ultimate",
    features: [
      { text: "Everything in Pro +", included: true },
      { text: "Score breakdowns", included: true },
      { text: "Unlimited alerts", included: true },
      { text: "All-time history + export", included: true },
      { text: "90-day predictions", included: true },
      { text: "Auto-coupon browser extension", included: true },
      { text: "Priority support", included: true },
    ],
    highlight: false,
    borderClass: "border-gaming-purple",
    buttonVariant: "secondary",
    buttonText: "Go Ultimate",
  },
];

export function PricingSection() {
  return (
    <section className="py-20">
      <PageContainer>
        <SectionHeading
          title="Choose Your Plan"
          subtitle="Start free and upgrade when you need more power"
          align="center"
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {tiers.map((tier) => {
            const tierData = SUBSCRIPTION_TIERS[tier.key];

            return (
              <motion.div
                key={tier.key}
                variants={staggerItem}
                className={cn(
                  "relative rounded-xl border bg-card p-6",
                  "flex flex-col",
                  tier.borderClass,
                  tier.highlight && "glow-orange md:-mt-4 md:mb-4"
                )}
              >
                {/* Badge */}
                {tier.badge && (
                  <Badge
                    className={cn(
                      "absolute -top-3 left-1/2 -translate-x-1/2",
                      "bg-gaming-orange text-white border-0",
                      "font-heading text-xs px-3 py-0.5"
                    )}
                  >
                    {tier.badge}
                  </Badge>
                )}

                {/* Tier Name */}
                <h3 className="font-heading font-bold text-xl">
                  {tierData.name}
                </h3>

                {/* Price */}
                <div className="mt-3 mb-6">
                  {tierData.price === 0 ? (
                    <p className="font-heading font-bold text-3xl">Free</p>
                  ) : (
                    <p className="font-heading font-bold text-3xl">
                      {formatPrice(tierData.price)}
                      <span className="text-base font-normal text-muted-foreground">
                        /mo
                      </span>
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-start gap-2 text-sm"
                    >
                      {feature.included ? (
                        <Check className="h-4 w-4 text-gaming-teal shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/50"
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
              </motion.div>
            );
          })}
        </motion.div>
      </PageContainer>
    </section>
  );
}
