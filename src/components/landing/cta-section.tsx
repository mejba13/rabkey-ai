"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { Input } from "@/components/ui/input";

const trustPoints = [
  { icon: Shield, text: "No credit card required" },
  { icon: Zap, text: "Start comparing in seconds" },
  { icon: Sparkles, text: "14-day Pro trial included" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  }

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <PageContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="relative"
        >
          {/* Card container */}
          <div
            className={cn(
              "relative rounded-3xl overflow-hidden",
              "border border-border/30",
              "bg-card"
            )}
          >
            {/* --- Multi-layered background --- */}
            <div className="absolute inset-0">
              {/* Gradient mesh */}
              <div
                className="absolute inset-0"
                style={{
                  background: [
                    "radial-gradient(ellipse 80% 60% at 20% 40%, oklch(0.784 0.159 72.989 / 10%) 0%, transparent 60%)",
                    "radial-gradient(ellipse 70% 50% at 80% 30%, oklch(0.541 0.247 293.009 / 8%) 0%, transparent 60%)",
                    "radial-gradient(ellipse 60% 50% at 50% 80%, oklch(0.784 0.159 72.989 / 6%) 0%, transparent 60%)",
                    "radial-gradient(ellipse 90% 70% at 60% 50%, oklch(0.541 0.247 293.009 / 5%) 0%, transparent 70%)",
                    "linear-gradient(160deg, #1A1A2E 0%, #16213E 40%, #1A1A2E 100%)",
                  ].join(", "),
                }}
              />

              {/* Dot grid overlay */}
              <div className="absolute inset-0 dot-grid opacity-20" />
            </div>

            {/* --- Floating glow orbs --- */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div
                className="absolute top-[15%] right-[8%] h-40 w-40 rounded-full blur-[80px]"
                style={{
                  background: "oklch(0.784 0.159 72.989 / 15%)",
                  animation: "float 10s ease-in-out infinite",
                }}
              />
              <div
                className="absolute bottom-[15%] left-[10%] h-32 w-32 rounded-full blur-[70px]"
                style={{
                  background: "oklch(0.541 0.247 293.009 / 12%)",
                  animation: "float 13s ease-in-out infinite 2s",
                }}
              />
              <div
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full blur-[100px]"
                style={{
                  background: "oklch(0.784 0.159 72.989 / 6%)",
                  animation: "float 16s ease-in-out infinite 5s",
                }}
              />
              <div
                className="absolute top-[10%] left-[25%] h-20 w-20 rounded-full blur-[50px]"
                style={{
                  background: "oklch(0.541 0.247 293.009 / 10%)",
                  animation: "float 9s ease-in-out infinite 1s",
                }}
              />
            </div>

            {/* --- Content --- */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-24">
              <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
                {/* Badge */}
                <motion.div variants={itemVariants}>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 px-5 py-2 rounded-full",
                      "bg-gaming-orange/10 border border-gaming-orange/20",
                      "text-gaming-orange text-sm font-heading font-medium"
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                    Join 50,000+ Smart Gamers
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-[1.1] tracking-tight"
                >
                  Ready to{" "}
                  <GradientText variant="primary">
                    Stop Overpaying
                  </GradientText>
                  ?
                </motion.h2>

                {/* Stat line */}
                <motion.p
                  variants={itemVariants}
                  className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed"
                >
                  <span className="text-foreground font-heading font-semibold">
                    50,000+
                  </span>{" "}
                  gamers saving{" "}
                  <span className="text-gaming-teal font-heading font-semibold">
                    $12M+
                  </span>{" "}
                  on game keys — powered by AI price prediction and real-time
                  comparison across 50+ stores.
                </motion.p>

                {/* Email Form */}
                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubmit}
                  className={cn(
                    "hero-search-border",
                    "flex w-full max-w-md items-center gap-2 p-1.5",
                    "rounded-xl",
                    "bg-gaming-surface-deep/60 backdrop-blur-sm"
                  )}
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={cn(
                      "h-11 rounded-lg text-sm border-0",
                      "bg-transparent",
                      "focus-visible:ring-0 focus-visible:ring-offset-0",
                      "placeholder:text-muted-foreground/50"
                    )}
                  />
                  <GamingButton
                    type="submit"
                    size="md"
                    className="rounded-lg shrink-0"
                  >
                    {isSubmitted ? "Sent!" : "Get Started"}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </GamingButton>
                </motion.form>

                {/* Trust Points */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-2"
                >
                  {trustPoints.map((point) => (
                    <span
                      key={point.text}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <point.icon className="h-4 w-4 text-gaming-teal shrink-0" />
                      {point.text}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
