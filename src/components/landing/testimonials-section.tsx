"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading, GlowCard } from "@/components/shared";
import { staggerContainer, staggerItem } from "@/animations/variants";

const testimonials = [
  {
    quote:
      "Saved over $200 in my first month using GrabKey AI. The deal scores make it so easy to know when to pull the trigger on a purchase.",
    name: "Alex M.",
    title: "Verified Gamer",
    stars: 5,
  },
  {
    quote:
      "The deal scores are incredibly accurate. I used to spend hours comparing prices across stores, but now GrabKey does all the work for me.",
    name: "Sarah K.",
    title: "PC Enthusiast",
    stars: 5,
  },
  {
    quote:
      "Finally a price comparison tool that actually works and doesn't feel sketchy. The trust verification gives me real peace of mind.",
    name: "Mike R.",
    title: "Bargain Hunter",
    stars: 5,
  },
] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gaming-gold text-gaming-gold" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-gaming-surface py-20">
      <PageContainer>
        <SectionHeading
          title="What Gamers Say"
          subtitle="Join thousands of gamers already saving with GrabKey AI"
          align="center"
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={staggerItem}>
              <GlowCard glowColor="gold" className="h-full flex flex-col gap-4">
                <StarRating count={testimonial.stars} />

                <p className="italic text-foreground/90 text-sm leading-relaxed flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="pt-2 border-t border-border">
                  <p className="font-heading font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.title}
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
