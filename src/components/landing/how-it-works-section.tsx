"use client";

import { motion } from "motion/react";
import { Search, BarChart3, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared";
import { staggerContainer, staggerItem } from "@/animations/variants";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Search",
    description: "Find any game across 50+ stores instantly with a single search.",
  },
  {
    number: 2,
    icon: BarChart3,
    title: "Compare",
    description:
      "AI scores every deal and predicts price drops so you can make the smartest choice.",
  },
  {
    number: 3,
    icon: Zap,
    title: "Save",
    description:
      "Grab the best deal and save big. Our users save an average of 60% on every purchase.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="bg-gaming-surface py-20">
      <PageContainer>
        <SectionHeading
          title="How It Works"
          subtitle="Three simple steps to never overpay again"
          align="center"
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Connecting line on desktop */}
          <div className="pointer-events-none absolute top-14 left-[16.6%] right-[16.6%] hidden md:block">
            <div className="h-px w-full bg-gradient-to-r from-gaming-orange/50 via-gaming-orange/30 to-gaming-orange/50" />
          </div>

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={staggerItem}
              className="relative flex flex-col items-center text-center gap-4"
            >
              {/* Number badge */}
              <div className="relative z-10">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    "bg-gaming-orange text-white",
                    "font-heading font-bold text-lg",
                    "ring-4 ring-gaming-surface"
                  )}
                >
                  {step.number}
                </div>
              </div>

              {/* Icon */}
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-2xl",
                  "bg-gaming-surface-elevated border border-border"
                )}
              >
                <step.icon className="h-8 w-8 text-gaming-orange" />
              </div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-xl">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </PageContainer>
    </section>
  );
}
