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

const features = [
  {
    icon: BarChart3,
    title: "Smart Deal Scores",
    description:
      "AI rates every deal 0-100 so you know exactly how good a price is. No more guessing - our ML model analyzes 7 factors in real time.",
    accent: "gaming-orange",
    span: "md:col-span-2 md:row-span-1",
    gradient: "from-gaming-orange/10 to-transparent",
  },
  {
    icon: TrendingUp,
    title: "Price Predictions",
    description:
      "LSTM + gradient boosting models predict price drops up to 90 days out. Buy now or wait - we'll tell you.",
    accent: "gaming-purple",
    span: "md:col-span-1 md:row-span-2",
    gradient: "from-gaming-purple/10 to-transparent",
  },
  {
    icon: Search,
    title: "50+ Store Comparison",
    description:
      "Steam, GOG, Epic, Humble, and 50+ more stores compared instantly.",
    accent: "gaming-teal",
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-gaming-teal/10 to-transparent",
  },
  {
    icon: Bell,
    title: "Instant Price Alerts",
    description:
      "Set your target price and get notified the moment it drops. Never miss a deal again.",
    accent: "gaming-coral",
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-gaming-coral/10 to-transparent",
  },
  {
    icon: Shield,
    title: "Trust Verification",
    description:
      "NLP-powered store trust scores and review analysis. We track key revocation rates and fraud patterns.",
    accent: "gaming-teal",
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-gaming-teal/10 to-transparent",
  },
  {
    icon: Brain,
    title: "Personalized For You",
    description:
      "Sync your Steam, PlayStation, Xbox, and Nintendo libraries. Get recommendations tailored to your taste.",
    accent: "gaming-gold",
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-gaming-gold/10 to-transparent",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Real-time price updates every 15 minutes across all stores.",
    accent: "gaming-orange",
    span: "md:col-span-1 md:row-span-1",
    gradient: "from-gaming-orange/10 to-transparent",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "20+ currencies, 10 languages, region-specific pricing. Find the best deals anywhere in the world.",
    accent: "gaming-blue",
    span: "md:col-span-2 md:row-span-1",
    gradient: "from-gaming-blue/10 to-transparent",
  },
] as const;

const accentColorMap: Record<string, string> = {
  "gaming-orange": "text-gaming-orange bg-gaming-orange/10 border-gaming-orange/20 shadow-gaming-orange/10",
  "gaming-purple": "text-gaming-purple bg-gaming-purple/10 border-gaming-purple/20 shadow-gaming-purple/10",
  "gaming-teal": "text-gaming-teal bg-gaming-teal/10 border-gaming-teal/20 shadow-gaming-teal/10",
  "gaming-coral": "text-gaming-coral bg-gaming-coral/10 border-gaming-coral/20 shadow-gaming-coral/10",
  "gaming-gold": "text-gaming-gold bg-gaming-gold/10 border-gaming-gold/20 shadow-gaming-gold/10",
  "gaming-blue": "text-gaming-blue bg-gaming-blue/10 border-gaming-blue/20 shadow-gaming-blue/10",
};

const accentBorderMap: Record<string, string> = {
  "gaming-orange": "hover:border-gaming-orange/40",
  "gaming-purple": "hover:border-gaming-purple/40",
  "gaming-teal": "hover:border-gaming-teal/40",
  "gaming-coral": "hover:border-gaming-coral/40",
  "gaming-gold": "hover:border-gaming-gold/40",
  "gaming-blue": "hover:border-gaming-blue/40",
};

export function FeaturesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.784 0.159 72.989 / 20%), transparent)",
          }}
        />
      </div>

      <PageContainer>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-orange mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Why Gamers Choose{" "}
            <GradientText variant="primary">GrabKey AI</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Powered by machine learning and real-time data from 50+ stores.
            Every feature designed to save you money.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((feature) => {
            const colorClasses = accentColorMap[feature.accent] ?? "";
            const textClass = colorClasses.split(" ")[0];
            const borderHover = accentBorderMap[feature.accent] ?? "";

            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 25 } }}
                className={cn(
                  feature.span,
                  "group relative rounded-2xl p-6",
                  "bg-card border border-border/50",
                  "transition-[border-color] duration-300",
                  borderHover,
                  "overflow-hidden"
                )}
              >
                {/* Gradient background */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    feature.gradient
                  )}
                />

                <div className="relative z-10 flex flex-col gap-4 h-full">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl border",
                      accentColorMap[feature.accent]
                    )}
                  >
                    <feature.icon className={cn("h-6 w-6", textClass)} />
                  </motion.div>

                  <h3 className="font-heading font-bold text-lg">{feature.title}</h3>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </PageContainer>
    </section>
  );
}
