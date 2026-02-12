"use client";

import { motion } from "motion/react";
import {
  BarChart3,
  TrendingUp,
  Search,
  Bell,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading, GlowCard } from "@/components/shared";
import { staggerContainer, staggerItem } from "@/animations/variants";

const features = [
  {
    icon: BarChart3,
    title: "Smart Deal Scores",
    description:
      "AI rates every deal 0-100 so you know exactly how good a price is before you buy. No more guessing.",
  },
  {
    icon: TrendingUp,
    title: "Price Predictions",
    description:
      "ML models predict price drops up to 90 days out, telling you whether to buy now or wait for a better deal.",
  },
  {
    icon: Search,
    title: "50+ Store Comparison",
    description:
      "Compare prices across Steam, GOG, Epic, Humble, and 50+ more stores in a single search.",
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description:
      "Set your target price and get notified instantly when a game drops to the price you want.",
  },
  {
    icon: Shield,
    title: "Trust Verification",
    description:
      "AI-powered store trust scores and review analysis so you only buy from safe, reliable sellers.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Real-time price updates every 15 minutes across all stores. Never miss a flash sale again.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="py-20">
      <PageContainer>
        <SectionHeading
          title="Why Choose GrabKey AI?"
          subtitle="Powered by machine learning and real-time data from 50+ stores"
          align="center"
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={staggerItem}>
              <GlowCard className="h-full">
                <div className="flex flex-col gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      "bg-gaming-orange/10"
                    )}
                  >
                    <feature.icon className="h-6 w-6 text-gaming-orange" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </PageContainer>
    </section>
  );
}
