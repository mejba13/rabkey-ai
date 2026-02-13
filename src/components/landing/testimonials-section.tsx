"use client";

import { motion } from "motion/react";
import { Star, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { fadeIn } from "@/animations/variants";

const accentColors = [
  { border: "border-l-gaming-orange/40", ring: "ring-gaming-orange/30", bg: "bg-gaming-orange/[0.08]", text: "text-gaming-orange" },
  { border: "border-l-gaming-purple/40", ring: "ring-gaming-purple/30", bg: "bg-gaming-purple/[0.08]", text: "text-gaming-purple" },
  { border: "border-l-gaming-teal/40", ring: "ring-gaming-teal/30", bg: "bg-gaming-teal/[0.08]", text: "text-gaming-teal" },
  { border: "border-l-gaming-coral/40", ring: "ring-gaming-coral/30", bg: "bg-gaming-coral/[0.08]", text: "text-gaming-coral" },
  { border: "border-l-gaming-gold/40", ring: "ring-gaming-gold/30", bg: "bg-gaming-gold/[0.08]", text: "text-gaming-gold" },
  { border: "border-l-gaming-blue/40", ring: "ring-gaming-blue/30", bg: "bg-gaming-blue/[0.08]", text: "text-gaming-blue" },
] as const;

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
        <Star
          key={i}
          className="h-3 w-3 fill-gaming-gold text-gaming-gold"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const accent = accentColors[index % accentColors.length];

  return (
    <div
      className={cn(
        "group relative flex-shrink-0 w-[320px] mx-2.5",
        "rounded-2xl p-6 overflow-hidden",
        "bg-gaming-surface/40 backdrop-blur-sm",
        "border border-border/20 border-l-2",
        accent.border,
        "hover:border-border/35 transition-all duration-300"
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
            "font-heading font-bold text-sm",
            "ring-1",
            accent.ring,
            accent.bg,
            accent.text
          )}
        >
          {testimonial.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-heading font-semibold text-sm text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground/50">{testimonial.title}</p>
        </div>

        <StarRating count={testimonial.stars} />
      </div>

      {/* Quote */}
      <p className="text-sm text-foreground/75 font-body leading-relaxed mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Saved amount */}
      <div className="flex items-center gap-2 pt-4 border-t border-border/15">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gaming-teal/[0.08]">
          <TrendingDown className="h-3.5 w-3.5 text-gaming-teal" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/40 font-heading">
            Total Saved
          </span>
          <span className="text-sm font-heading font-bold text-gaming-teal">
            {testimonial.saved}
          </span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
  const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

  return (
    <section className="relative py-28 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gaming-surface/15" />

      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background: "linear-gradient(to right, transparent, oklch(0.887 0.182 95.337 / 15%), transparent)",
          }}
        />
      </div>

      {/* Header */}
      <PageContainer className="relative z-10 mb-14">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <span className="inline-block text-[11px] font-heading font-bold uppercase tracking-[0.25em] text-gaming-gold/80 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-5">
            Trusted by{" "}
            <GradientText variant="legendary">50,000+ Gamers</GradientText>
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-base lg:text-lg leading-relaxed">
            Join the community of smart gamers who never overpay for their
            favorite titles
          </p>
        </motion.div>
      </PageContainer>

      {/* Marquee Row 1 */}
      <div
        className="marquee relative z-10 mb-4"
        style={{ "--marquee-duration": "40s" } as React.CSSProperties}
      >
        <div className="marquee-content">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} index={i % 4} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div
        className="marquee marquee-reverse relative z-10"
        style={{ "--marquee-duration": "45s" } as React.CSSProperties}
      >
        <div className="marquee-content">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} index={(i % 4) + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
