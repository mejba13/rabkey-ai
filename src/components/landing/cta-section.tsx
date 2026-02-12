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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Card */}
          <div
            className={cn(
              "relative rounded-3xl p-10 sm:p-16 overflow-hidden",
              "border border-border/50"
            )}
          >
            {/* Background gradients */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 30% 50%, oklch(0.784 0.159 72.989 / 8%) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 70% 50%, oklch(0.541 0.247 293.009 / 6%) 0%, transparent 70%), linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #1A1A2E 100%)",
                }}
              />
              {/* Dot grid overlay */}
              <div className="absolute inset-0 dot-grid opacity-20" />
            </div>

            {/* Floating accent orbs */}
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute top-[20%] right-[10%] h-32 w-32 rounded-full blur-[60px]"
                style={{
                  background: "oklch(0.784 0.159 72.989 / 15%)",
                  animation: "float 10s ease-in-out infinite",
                }}
              />
              <div
                className="absolute bottom-[20%] left-[15%] h-24 w-24 rounded-full blur-[50px]"
                style={{
                  background: "oklch(0.541 0.247 293.009 / 12%)",
                  animation: "float 12s ease-in-out infinite 3s",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gaming-orange/10 text-gaming-orange text-sm font-heading font-medium border border-gaming-orange/20">
                  <Sparkles className="h-4 w-4" />
                  Join 50,000+ Smart Gamers
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-tight">
                Ready to{" "}
                <GradientText variant="primary">
                  Stop Overpaying
                </GradientText>
                ?
              </h2>

              <p className="text-muted-foreground text-lg max-w-lg">
                Join thousands of gamers who use GrabKey AI to find the best prices,
                predict drops, and never overpay again.
              </p>

              {/* Email Form */}
              <form
                onSubmit={handleSubmit}
                className={cn(
                  "flex w-full max-w-md items-center gap-2 p-1.5",
                  "rounded-xl",
                  "bg-gaming-surface-deep/50 backdrop-blur-sm",
                  "border border-border/50"
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
                <GamingButton type="submit" size="md" className="rounded-lg shrink-0">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-1" />
                </GamingButton>
              </form>

              {/* Trust Points */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
                {trustPoints.map((point) => (
                  <span
                    key={point.text}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <point.icon className="h-3.5 w-3.5 text-gaming-teal" />
                    {point.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </section>
  );
}
