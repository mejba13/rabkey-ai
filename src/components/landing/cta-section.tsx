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

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  }

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Card container */}
          <div
            className={cn(
              "relative rounded-3xl overflow-hidden",
              "border border-border/20",
              "bg-gaming-surface/50"
            )}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background: [
                    "radial-gradient(ellipse 70% 50% at 20% 40%, oklch(0.784 0.159 72.989 / 6%) 0%, transparent 60%)",
                    "radial-gradient(ellipse 60% 40% at 80% 30%, oklch(0.541 0.247 293.009 / 5%) 0%, transparent 60%)",
                    "linear-gradient(160deg, oklch(0.228 0.038 282.927) 0%, oklch(0.254 0.057 266.713 / 50%) 40%, oklch(0.228 0.038 282.927) 100%)",
                  ].join(", "),
                }}
              />

              {/* Subtle grid */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(1 0 0 / 10%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 10%) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-24">
              <div className="flex flex-col items-center gap-7 max-w-2xl mx-auto">
                {/* Badge */}
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
                    "bg-gaming-orange/[0.08] border border-gaming-orange/15",
                    "text-gaming-orange text-xs font-heading font-semibold uppercase tracking-wider"
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Join 50,000+ Smart Gamers
                </motion.span>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] tracking-tight"
                >
                  Ready to{" "}
                  <GradientText variant="primary">Stop Overpaying</GradientText>?
                </motion.h2>

                {/* Stat line */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
                >
                  <span className="text-foreground font-medium">50,000+</span>{" "}
                  gamers saving{" "}
                  <span className="text-gaming-teal font-medium">$12M+</span>{" "}
                  on game keys — powered by AI price prediction and real-time
                  comparison across 50+ stores.
                </motion.p>

                {/* Email Form */}
                <motion.form
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  onSubmit={handleSubmit}
                  className={cn(
                    "flex w-full max-w-md items-center gap-2 p-1.5",
                    "rounded-xl",
                    "bg-gaming-surface-deep/50 backdrop-blur-sm",
                    "border border-border/25",
                    "focus-within:border-gaming-orange/25 transition-colors duration-300"
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
                      "placeholder:text-muted-foreground/40"
                    )}
                  />
                  <GamingButton type="submit" size="md" className="rounded-lg shrink-0">
                    {isSubmitted ? "Sent!" : "Get Started"}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </GamingButton>
                </motion.form>

                {/* Trust Points */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5"
                >
                  {trustPoints.map((point) => (
                    <span
                      key={point.text}
                      className="flex items-center gap-2 text-sm text-muted-foreground/60"
                    >
                      <point.icon className="h-3.5 w-3.5 text-gaming-teal/70 shrink-0" />
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
