"use client";

import { motion } from "motion/react";
import { Star, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { fadeIn } from "@/animations/variants";

/* ═══════════════════════════════════════════════
   Accent colors that cycle across cards
   ═══════════════════════════════════════════════ */

const accentColors = [
  {
    border: "border-l-gaming-orange",
    ring: "ring-gaming-orange/40",
    bg: "bg-gaming-orange/10",
    text: "text-gaming-orange",
    hoverBorder: "hover:border-gaming-orange/40",
    hoverShadow: "hover:shadow-gaming-orange/5",
    quoteFrom: "#F5A623",
    quoteTo: "#FF6B35",
  },
  {
    border: "border-l-gaming-purple",
    ring: "ring-gaming-purple/40",
    bg: "bg-gaming-purple/10",
    text: "text-gaming-purple",
    hoverBorder: "hover:border-gaming-purple/40",
    hoverShadow: "hover:shadow-gaming-purple/5",
    quoteFrom: "#7C3AED",
    quoteTo: "#9F67FF",
  },
  {
    border: "border-l-gaming-teal",
    ring: "ring-gaming-teal/40",
    bg: "bg-gaming-teal/10",
    text: "text-gaming-teal",
    hoverBorder: "hover:border-gaming-teal/40",
    hoverShadow: "hover:shadow-gaming-teal/5",
    quoteFrom: "#00D4AA",
    quoteTo: "#0EA5E9",
  },
  {
    border: "border-l-gaming-coral",
    ring: "ring-gaming-coral/40",
    bg: "bg-gaming-coral/10",
    text: "text-gaming-coral",
    hoverBorder: "hover:border-gaming-coral/40",
    hoverShadow: "hover:shadow-gaming-coral/5",
    quoteFrom: "#FF6B35",
    quoteTo: "#FF3366",
  },
  {
    border: "border-l-gaming-gold",
    ring: "ring-gaming-gold/40",
    bg: "bg-gaming-gold/10",
    text: "text-gaming-gold",
    hoverBorder: "hover:border-gaming-gold/40",
    hoverShadow: "hover:shadow-gaming-gold/5",
    quoteFrom: "#FFD700",
    quoteTo: "#F5A623",
  },
  {
    border: "border-l-gaming-blue",
    ring: "ring-gaming-blue/40",
    bg: "bg-gaming-blue/10",
    text: "text-gaming-blue",
    hoverBorder: "hover:border-gaming-blue/40",
    hoverShadow: "hover:shadow-gaming-blue/5",
    quoteFrom: "#0EA5E9",
    quoteTo: "#00D4AA",
  },
] as const;

/* ═══════════════════════════════════════════════
   Testimonial data
   ═══════════════════════════════════════════════ */

const testimonials = [
  {
    quote:
      "Saved over $200 in my first month using GrabKey AI. The deal scores make it so easy to know when to pull the trigger.",
    name: "Alex M.",
    title: "Verified Gamer",
    avatar: "A",
    stars: 5,
    saved: "$200+",
  },
  {
    quote:
      "The deal scores are incredibly accurate. I used to spend hours comparing prices, but now GrabKey does all the work for me.",
    name: "Sarah K.",
    title: "PC Enthusiast",
    avatar: "S",
    stars: 5,
    saved: "$350+",
  },
  {
    quote:
      "Finally a price comparison tool that actually works and doesn't feel sketchy. The trust verification gives me real peace of mind.",
    name: "Mike R.",
    title: "Bargain Hunter",
    avatar: "M",
    stars: 5,
    saved: "$150+",
  },
  {
    quote:
      "The price predictions are scarily accurate. Waited 2 weeks like it suggested and saved $20 on Elden Ring. Mind blown.",
    name: "Jordan T.",
    title: "RPG Addict",
    avatar: "J",
    stars: 5,
    saved: "$180+",
  },
  {
    quote:
      "I sync my Steam wishlist and get alerts whenever something drops. It's like having a personal deal hunter working 24/7.",
    name: "Chris L.",
    title: "Steam Collector",
    avatar: "C",
    stars: 5,
    saved: "$500+",
  },
  {
    quote:
      "Browser extension is a game changer. Auto-applies the best coupon and shows deal scores right on the store page.",
    name: "Priya N.",
    title: "Smart Shopper",
    avatar: "P",
    stars: 5,
    saved: "$275+",
  },
  {
    quote:
      "Compared to other deal sites, GrabKey's AI scoring actually tells you if you should wait. Saved me from impulse buys multiple times.",
    name: "David W.",
    title: "Patient Gamer",
    avatar: "D",
    stars: 5,
    saved: "$400+",
  },
  {
    quote:
      "The historical price charts are incredible. Finally I can see if a 'sale' is actually a good deal or just marketing.",
    name: "Emma S.",
    title: "Data Nerd",
    avatar: "E",
    stars: 5,
    saved: "$320+",
  },
] as const;

/* ═══════════════════════════════════════════════
   Star Rating
   ═══════════════════════════════════════════════ */

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-gaming-gold text-gaming-gold drop-shadow-[0_0_3px_rgba(255,215,0,0.4)]"
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Testimonial Card
   ═══════════════════════════════════════════════ */

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
        "group relative flex-shrink-0 w-[340px] mx-3",
        "rounded-2xl p-6 overflow-hidden",
        "bg-card/80 backdrop-blur-sm",
        "border border-border/40 border-l-[3px]",
        accent.border,
        "transition-all duration-300 ease-out",
        accent.hoverBorder,
        accent.hoverShadow,
        "hover:shadow-lg"
      )}
    >
      {/* Decorative quote icon — large, semi-transparent, gradient */}
      <div className="pointer-events-none absolute -top-2 -right-2 h-24 w-24 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`quote-grad-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={accent.quoteFrom} />
              <stop offset="100%" stopColor={accent.quoteTo} />
            </linearGradient>
          </defs>
          <path
            d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
            fill={`url(#quote-grad-${index})`}
          />
          <path
            d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
            fill={`url(#quote-grad-${index})`}
          />
        </svg>
      </div>

      {/* Header: avatar + info + stars */}
      <div className="relative flex items-start gap-3 mb-5">
        {/* Avatar with gradient ring */}
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full shrink-0",
            "font-heading font-bold text-sm",
            "ring-2",
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
          <p className="text-xs text-muted-foreground">{testimonial.title}</p>
        </div>

        <StarRating count={testimonial.stars} />
      </div>

      {/* Quote body */}
      <p className="relative text-sm text-foreground/80 font-body leading-relaxed mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Saved amount callout */}
      <div className="flex items-center gap-2 pt-4 border-t border-border/30">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gaming-teal/10">
          <TrendingDown className="h-3.5 w-3.5 text-gaming-teal" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-heading">
            Total Saved
          </span>
          <span className="text-base font-heading font-bold text-gaming-teal drop-shadow-[0_0_6px_rgba(0,212,170,0.3)]">
            {testimonial.saved}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Section export
   ═══════════════════════════════════════════════ */

export function TestimonialsSection() {
  const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
  const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section background with subtle radial glow */}
      <div className="absolute inset-0 bg-gaming-surface/30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.887 0.182 95.337 / 5%), transparent 70%)",
        }}
      />

      {/* Top divider gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.887 0.182 95.337 / 20%), oklch(0.831 0.15 84 / 12%), transparent)",
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
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-gold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5">
            Trusted by{" "}
            <GradientText variant="legendary">50,000+ Gamers</GradientText>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-lg">
            Join the community of smart gamers who never overpay for their
            favorite titles
          </p>
        </motion.div>
      </PageContainer>

      {/* Marquee Row 1 */}
      <div
        className="marquee relative z-10 mb-5"
        style={{ "--marquee-duration": "40s" } as React.CSSProperties}
      >
        <div className="marquee-content">
          {row1.map((t, i) => (
            <TestimonialCard
              key={`r1-${i}`}
              testimonial={t}
              index={i % 4}
            />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — Reverse */}
      <div
        className="marquee marquee-reverse relative z-10"
        style={{ "--marquee-duration": "45s" } as React.CSSProperties}
      >
        <div className="marquee-content">
          {row2.map((t, i) => (
            <TestimonialCard
              key={`r2-${i}`}
              testimonial={t}
              index={(i % 4) + 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
