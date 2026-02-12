"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";
import { Input } from "@/components/ui/input";
import { fadeInUp } from "@/animations/variants";

export function CTASection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrate with email signup API
    setEmail("");
  }

  return (
    <section className="py-20">
      <PageContainer>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className={cn(
            "rounded-2xl p-8 sm:p-12",
            "bg-gradient-to-br from-gaming-surface-elevated to-gaming-surface",
            "border border-border",
            "flex flex-col items-center text-center gap-6"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            <GradientText variant="primary">
              Ready to Save on Every Game?
            </GradientText>
          </h2>

          <p className="text-muted-foreground max-w-lg">
            Join thousands of gamers who use GrabKey AI to find the best prices,
            predict drops, and never overpay again.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md items-center gap-2"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={cn(
                "h-12 rounded-lg text-base",
                "bg-gaming-surface-deep border-border",
                "focus:border-gaming-orange focus:ring-gaming-orange/30"
              )}
            />
            <GamingButton type="submit" size="lg">
              Get Started Free
            </GamingButton>
          </form>

          <p className="text-xs text-muted-foreground">
            No credit card required. Start comparing prices in seconds.
          </p>
        </motion.div>
      </PageContainer>
    </section>
  );
}
