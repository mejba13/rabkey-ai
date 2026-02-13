"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  X,
  Crown,
  Sparkles,
  Zap,
  Shield,
  CreditCard,
  RotateCcw,
  ChevronDown,
  Building2,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { staggerContainer, staggerItem } from "@/animations/variants";

/* ═══════════════════════════════════════════════
   Types & Data
   ═══════════════════════════════════════════════ */

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

/* Comparison table rows */
const comparisonFeatures = [
  { name: "Price comparison", free: "Basic", pro: "Advanced", ultimate: "Advanced" },
  { name: "Price alerts", free: "3", pro: "25", ultimate: "Unlimited" },
  { name: "Price history", free: "30 days", pro: "1 year", ultimate: "All-time" },
  { name: "AI deal scores", free: false, pro: true, ultimate: true },
  { name: "Score breakdowns", free: false, pro: false, ultimate: true },
  { name: "Price predictions", free: false, pro: "7-day", ultimate: "90-day" },
  { name: "CSV export", free: false, pro: false, ultimate: true },
  { name: "Browser extension", free: false, pro: false, ultimate: true },
  { name: "Ad-free", free: false, pro: true, ultimate: true },
  { name: "Support", free: "Community", pro: "Email", ultimate: "Priority" },
];

/* FAQ data */
const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately and we'll prorate any differences.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes! Start a 14-day free trial of Pro with no credit card required. You'll only be charged if you choose to continue after the trial.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and Apple Pay via Stripe. All payments are securely processed and encrypted.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund — no questions asked.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your data is always preserved. On downgrade, premium features become read-only — you won't lose access to any historical data.",
  },
];

/* ═══════════════════════════════════════════════
   Billing Toggle
   ═══════════════════════════════════════════════ */

function BillingToggle({
  isYearly,
  onChange,
}: {
  isYearly: boolean;
  onChange: (v: boolean) => void;
}) {
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

/* ═══════════════════════════════════════════════
   Feature Row
   ═══════════════════════════════════════════════ */

function FeatureRow({
  feature,
  muted,
}: {
  feature: FeatureItem;
  muted?: boolean;
}) {
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
            ? muted
              ? "text-white/50"
              : "text-white/80"
            : "text-white/20 line-through decoration-white/[0.06]"
        )}
      >
        {feature.text}
      </span>
    </li>
  );
}

/* ═══════════════════════════════════════════════
   Animated Price
   ═══════════════════════════════════════════════ */

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
            <p
              className={cn(
                "font-heading font-bold text-4xl text-white/90",
                highlight && "text-white"
              )}
            >
              <span className="text-lg font-normal text-white/40 align-top mr-0.5">
                $
              </span>
              {price.toFixed(2)}
              <span className="text-base font-normal text-white/30 ml-0.5">
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
          className="text-xs text-gaming-teal/80 mt-1.5 font-heading font-medium"
        >
          Billed ${(price * 12).toFixed(2)}/year — Save $
          {((price / 0.8 - price) * 12).toFixed(0)}/yr
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Pricing Card
   ═══════════════════════════════════════════════ */

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
        y: -4,
        transition: { type: "spring", stiffness: 260, damping: 24 },
      }}
      className={cn(
        "relative flex flex-col rounded-2xl",
        isPro && "md:scale-105 z-10"
      )}
    >
      {/* Pro gradient border + glow */}
      {isPro && (
        <>
          <div
            className="absolute -inset-px rounded-2xl z-0"
            style={{
              background:
                "linear-gradient(135deg, #F5A623, #FF6B35, #F5A623)",
            }}
          />
          <div className="absolute -inset-4 rounded-3xl bg-gaming-orange/[0.04] blur-2xl z-0 pointer-events-none" />
        </>
      )}

      <div
        className={cn(
          "relative flex flex-1 flex-col rounded-2xl p-7 z-10",
          "bg-card/50 backdrop-blur-sm",
          !isPro && "border border-border/30",
          isUltimate &&
            "hover:border-gaming-purple/25 transition-colors duration-300",
          isFree &&
            "opacity-85 hover:opacity-100 transition-opacity duration-300"
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
          <h3
            className={cn(
              "font-heading font-bold text-xl",
              isFree ? "text-white/50" : "text-white/90"
            )}
          >
            {tier.name}
          </h3>
        </div>

        <p
          className={cn(
            "text-sm mb-5",
            isFree ? "text-white/30" : "text-white/40"
          )}
        >
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

/* ═══════════════════════════════════════════════
   Trust Indicators
   ═══════════════════════════════════════════════ */

function TrustBadges() {
  const badges = [
    { icon: Shield, label: "14-day money-back guarantee" },
    { icon: CreditCard, label: "No credit card for Free tier" },
    { icon: RotateCcw, label: "Cancel anytime, no lock-in" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
      {badges.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gaming-teal/60" />
          <span className="text-xs text-white/30 font-heading">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Feature Comparison Table
   ═══════════════════════════════════════════════ */

function ComparisonTable() {
  function CellValue({ value }: { value: boolean | string }) {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-4 w-4 text-gaming-teal mx-auto" />
      ) : (
        <X className="h-4 w-4 text-white/15 mx-auto" />
      );
    }
    return (
      <span className="text-sm text-white/70 font-heading">{value}</span>
    );
  }

  return (
    <div className="mt-20 lg:mt-28">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">
          Compare <GradientText variant="secondary">Plans</GradientText>
        </h3>
        <p className="text-white/35 text-sm max-w-md mx-auto">
          See exactly what you get with each plan
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl mx-auto">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-4 pr-4 text-xs font-heading font-semibold uppercase tracking-wider text-white/40 w-[40%]">
                Feature
              </th>
              <th className="py-4 px-4 text-center text-xs font-heading font-semibold uppercase tracking-wider text-white/40 w-[20%]">
                Free
              </th>
              <th className="py-4 px-4 text-center text-xs font-heading font-semibold uppercase tracking-wider text-gaming-orange w-[20%]">
                Pro
              </th>
              <th className="py-4 px-4 text-center text-xs font-heading font-semibold uppercase tracking-wider text-gaming-purple w-[20%]">
                Ultimate
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((row) => (
              <tr
                key={row.name}
                className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors"
              >
                <td className="py-3.5 pr-4 text-sm text-white/60 font-heading">
                  {row.name}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <CellValue value={row.free} />
                </td>
                <td className="py-3.5 px-4 text-center bg-gaming-orange/[0.02]">
                  <CellValue value={row.pro} />
                </td>
                <td className="py-3.5 px-4 text-center">
                  <CellValue value={row.ultimate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FAQ Accordion
   ═══════════════════════════════════════════════ */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.04]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="text-sm font-heading font-medium text-white/70 group-hover:text-white/90 transition-colors pr-4">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-white/25" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-white/35 leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mt-20 lg:mt-28">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">
          Frequently Asked{" "}
          <GradientText variant="primary">Questions</GradientText>
        </h3>
        <p className="text-white/35 text-sm max-w-md mx-auto">
          Everything you need to know about our pricing
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {faqs.map((faq) => (
          <FAQItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Enterprise CTA
   ═══════════════════════════════════════════════ */

function EnterpriseCTA() {
  return (
    <div className="mt-20 lg:mt-28">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gaming-purple/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gaming-orange/[0.03] blur-3xl" />

        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gaming-purple/[0.08] border border-gaming-purple/10 shrink-0">
            <Building2 className="h-7 w-7 text-gaming-purple/70" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="font-heading font-bold text-xl text-white/90 mb-2">
              Need a custom plan?
            </h3>
            <p className="text-sm text-white/35 leading-relaxed max-w-lg">
              For teams, publishers, and enterprises — get custom pricing, API
              access, dedicated support, and volume discounts.
            </p>
          </div>

          <GamingButton
            variant="secondary"
            size="lg"
            className="rounded-xl shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            Contact Sales
          </GamingButton>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Pricing Section (Main Export)
   ═══════════════════════════════════════════════ */

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
          <p className="text-white/40 max-w-lg mx-auto text-sm lg:text-base leading-relaxed mb-10">
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

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TrustBadges />
        </motion.div>

        {/* Comparison table */}
        <ComparisonTable />

        {/* FAQ */}
        <FAQSection />

        {/* Enterprise CTA */}
        <EnterpriseCTA />
      </PageContainer>
    </section>
  );
}
