"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";

const testimonials = [
  {
    quote: "Saved over $200 in my first month using GrabKey AI. The deal scores make it so easy to know when to pull the trigger.",
    name: "Alex M.",
    title: "Verified Gamer",
    avatar: "A",
    stars: 5,
    saved: "$200+",
  },
  {
    quote: "The deal scores are incredibly accurate. I used to spend hours comparing prices, but now GrabKey does all the work for me.",
    name: "Sarah K.",
    title: "PC Enthusiast",
    avatar: "S",
    stars: 5,
    saved: "$350+",
  },
  {
    quote: "Finally a price comparison tool that actually works and doesn't feel sketchy. The trust verification gives me real peace of mind.",
    name: "Mike R.",
    title: "Bargain Hunter",
    avatar: "M",
    stars: 5,
    saved: "$150+",
  },
  {
    quote: "The price predictions are scarily accurate. Waited 2 weeks like it suggested and saved $20 on Elden Ring. Mind blown.",
    name: "Jordan T.",
    title: "RPG Addict",
    avatar: "J",
    stars: 5,
    saved: "$180+",
  },
  {
    quote: "I sync my Steam wishlist and get alerts whenever something drops. It's like having a personal deal hunter working 24/7.",
    name: "Chris L.",
    title: "Steam Collector",
    avatar: "C",
    stars: 5,
    saved: "$500+",
  },
  {
    quote: "Browser extension is a game changer. Auto-applies the best coupon and shows deal scores right on the store page.",
    name: "Priya N.",
    title: "Smart Shopper",
    avatar: "P",
    stars: 5,
    saved: "$275+",
  },
  {
    quote: "Compared to other deal sites, GrabKey's AI scoring actually tells you if you should wait. Saved me from impulse buys multiple times.",
    name: "David W.",
    title: "Patient Gamer",
    avatar: "D",
    stars: 5,
    saved: "$400+",
  },
  {
    quote: "The historical price charts are incredible. Finally I can see if a 'sale' is actually a good deal or just marketing.",
    name: "Emma S.",
    title: "Data Nerd",
    avatar: "E",
    stars: 5,
    saved: "$320+",
  },
] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-gaming-gold text-gaming-gold" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-[340px] mx-3",
        "rounded-2xl p-6",
        "bg-card border border-border/50",
        "transition-[border-color] duration-300",
        "hover:border-gaming-gold/30"
      )}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gaming-orange/10 text-gaming-orange font-heading font-bold text-sm shrink-0">
          {testimonial.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-semibold text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.title}</p>
        </div>
        <StarRating count={testimonial.stars} />
      </div>

      <Quote className="h-5 w-5 text-gaming-orange/30 mb-2" />

      <p className="text-sm text-foreground/80 leading-relaxed mb-4">
        {testimonial.quote}
      </p>

      <div className="pt-3 border-t border-border/50">
        <span className="text-xs font-heading font-bold text-gaming-teal">
          Saved {testimonial.saved}
        </span>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
  const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

  return (
    <section className="relative py-24 bg-gaming-surface/50 overflow-hidden">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-3/4"
          style={{
            background: "linear-gradient(to right, transparent, oklch(0.887 0.182 95.337 / 20%), transparent)",
          }}
        />
      </div>

      <PageContainer className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-gold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Trusted by{" "}
            <GradientText variant="legendary">50,000+ Gamers</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Join the community of smart gamers who never overpay
          </p>
        </motion.div>
      </PageContainer>

      {/* Marquee Row 1 */}
      <div className="marquee mb-4" style={{ "--marquee-duration": "40s" } as React.CSSProperties}>
        <div className="marquee-content">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Reverse */}
      <div className="marquee marquee-reverse" style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
        <div className="marquee-content">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
