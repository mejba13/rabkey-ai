"use client";

import { motion } from "motion/react";
import {
  Star,
  TrendingDown,
  Quote,
  Verified,
  Gamepad2,
  KeyRound,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { fadeIn } from "@/animations/variants";

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

const testimonials = [
  {
    quote:
      "Saved over $200 in my first month using GrabKey AI. The deal scores make it so easy to know when to pull the trigger.",
    name: "Alex Morrison",
    title: "Verified Gamer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&q=80",
    stars: 5,
    saved: "$200+",
    platform: "Steam",
  },
  {
    quote:
      "The deal scores are incredibly accurate. I used to spend hours comparing prices, but now GrabKey does all the work for me.",
    name: "Sarah Kim",
    title: "PC Enthusiast",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face&q=80",
    stars: 5,
    saved: "$350+",
    platform: "Epic",
  },
  {
    quote:
      "Finally a price comparison tool that actually works and doesn't feel sketchy. The trust verification gives me real peace of mind.",
    name: "Mike Rodriguez",
    title: "Bargain Hunter",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&q=80",
    stars: 5,
    saved: "$150+",
    platform: "GOG",
  },
  {
    quote:
      "The price predictions are scarily accurate. Waited 2 weeks like it suggested and saved $20 on Elden Ring. Mind blown.",
    name: "Jordan Taylor",
    title: "RPG Addict",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face&q=80",
    stars: 5,
    saved: "$180+",
    platform: "Steam",
  },
  {
    quote:
      "I sync my Steam wishlist and get alerts whenever something drops. It's like having a personal deal hunter working 24/7.",
    name: "Chris Laurent",
    title: "Steam Collector",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=120&h=120&fit=crop&crop=face&q=80",
    stars: 5,
    saved: "$500+",
    platform: "Steam",
  },
  {
    quote:
      "Browser extension is a game changer. Auto-applies the best coupon and shows deal scores right on the store page.",
    name: "Priya Narayan",
    title: "Smart Shopper",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face&q=80",
    stars: 5,
    saved: "$275+",
    platform: "Humble",
  },
  {
    quote:
      "Compared to other deal sites, GrabKey's AI scoring actually tells you if you should wait. Saved me from impulse buys multiple times.",
    name: "David Walsh",
    title: "Patient Gamer",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face&q=80",
    stars: 5,
    saved: "$400+",
    platform: "Green Man",
  },
  {
    quote:
      "The historical price charts are incredible. Finally I can see if a 'sale' is actually a good deal or just marketing.",
    name: "Emma Svensson",
    title: "Data Nerd",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face&q=80",
    stars: 5,
    saved: "$320+",
    platform: "Fanatical",
  },
] as const;

const accentStyles = [
  {
    glow: "group-hover:shadow-gaming-orange/[0.06]",
    accent: "bg-gaming-orange",
    savedColor: "text-gaming-orange",
    quoteColor: "text-gaming-orange/20",
  },
  {
    glow: "group-hover:shadow-gaming-purple/[0.06]",
    accent: "bg-gaming-purple",
    savedColor: "text-gaming-purple",
    quoteColor: "text-gaming-purple/20",
  },
  {
    glow: "group-hover:shadow-gaming-teal/[0.06]",
    accent: "bg-gaming-teal",
    savedColor: "text-gaming-teal",
    quoteColor: "text-gaming-teal/20",
  },
  {
    glow: "group-hover:shadow-gaming-coral/[0.06]",
    accent: "bg-gaming-coral",
    savedColor: "text-gaming-coral",
    quoteColor: "text-gaming-coral/20",
  },
  {
    glow: "group-hover:shadow-gaming-gold/[0.06]",
    accent: "bg-gaming-gold",
    savedColor: "text-gaming-gold",
    quoteColor: "text-gaming-gold/20",
  },
  {
    glow: "group-hover:shadow-gaming-blue/[0.06]",
    accent: "bg-gaming-blue",
    savedColor: "text-gaming-blue",
    quoteColor: "text-gaming-blue/20",
  },
] as const;

/* ═══════════════════════════════════════════════
   Floating Decorative Elements
   ═══════════════════════════════════════════════ */

function FloatingElements() {
  const elements = [
    {
      icon: Gamepad2,
      x: "6%",
      y: "20%",
      size: 18,
      delay: 0,
      duration: 7,
      color: "text-gaming-purple/[0.08]",
    },
    {
      icon: KeyRound,
      x: "92%",
      y: "30%",
      size: 16,
      delay: 1.5,
      duration: 6,
      color: "text-gaming-orange/[0.07]",
    },
    {
      icon: Trophy,
      x: "4%",
      y: "70%",
      size: 14,
      delay: 0.8,
      duration: 8,
      color: "text-gaming-gold/[0.06]",
    },
    {
      icon: Star,
      x: "94%",
      y: "65%",
      size: 12,
      delay: 2.5,
      duration: 5.5,
      color: "text-gaming-teal/[0.07]",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -10, 0, 6, 0],
            rotate: [0, 5, -3, 4, 0],
            opacity: [0.5, 0.8, 0.5, 0.7, 0.5],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          <el.icon className={cn("shrink-0", el.color)} size={el.size} />
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Ambient Glow
   ═══════════════════════════════════════════════ */

function AmbientGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gaming-orange/[0.025] blur-[120px]"
        style={{ left: "-5%", top: "20%" }}
        animate={{
          x: [0, 20, -10, 15, 0],
          y: [0, -15, 10, -8, 0],
          scale: [1, 1.08, 0.95, 1.04, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gaming-purple/[0.03] blur-[100px]"
        style={{ right: "-3%", top: "40%" }}
        animate={{
          x: [0, -20, 12, -8, 0],
          y: [0, 12, -18, 8, 0],
          scale: [1, 0.96, 1.06, 0.98, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-gaming-teal/[0.02] blur-[90px]"
        style={{ left: "40%", bottom: "-8%" }}
        animate={{
          x: [0, 15, -10, 8, 0],
          scale: [1, 1.04, 0.97, 1.02, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Star Rating
   ═══════════════════════════════════════════════ */

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
  const style = accentStyles[index % accentStyles.length];

  return (
    <div
      className={cn(
        "group relative flex-shrink-0 w-[340px] mx-2.5",
        "rounded-2xl overflow-hidden",
        "bg-[#0F0F1E]/80 backdrop-blur-sm",
        "border border-white/[0.05]",
        "hover:border-white/[0.1]",
        "shadow-lg shadow-black/20",
        style.glow,
        "hover:shadow-2xl",
        "transition-all duration-400"
      )}
    >
      {/* Top accent line */}
      <div className={cn("h-[2px] w-full", style.accent, "opacity-30 group-hover:opacity-60 transition-opacity duration-400")} />

      <div className="relative p-6">
        {/* Quote icon — top right */}
        <Quote
          className={cn(
            "absolute top-4 right-5 h-8 w-8",
            style.quoteColor,
            "group-hover:opacity-100 opacity-60 transition-opacity duration-300"
          )}
        />

        {/* Header: Avatar + Info */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="relative shrink-0">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white/[0.08] group-hover:ring-white/[0.15] transition-all duration-300"
            />
            {/* Verified badge */}
            <div className="absolute -bottom-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gaming-teal ring-2 ring-[#0F0F1E]">
              <Verified className="h-2.5 w-2.5 text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-heading font-semibold text-[15px] text-white/90 truncate">
                {testimonial.name}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-white/30 font-heading">
                {testimonial.title}
              </span>
              <span className="text-white/10">·</span>
              <span className="text-[10px] text-white/20 font-heading uppercase tracking-wider">
                {testimonial.platform}
              </span>
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="mb-4">
          <StarRating count={testimonial.stars} />
        </div>

        {/* Quote text */}
        <p className="text-[14px] text-white/55 leading-[1.7] mb-6 group-hover:text-white/65 transition-colors duration-300">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Saved amount — bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04]">
              <TrendingDown className="h-3.5 w-3.5 text-gaming-teal/70" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/25 font-heading">
                Total Saved
              </span>
              <span
                className={cn(
                  "text-base font-heading font-bold",
                  style.savedColor
                )}
              >
                {testimonial.saved}
              </span>
            </div>
          </div>
          <div className="text-[10px] text-white/15 font-heading">
            via GrabKey AI
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Stats Bar
   ═══════════════════════════════════════════════ */

function StatsBar() {
  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "$12M+", label: "Total Saved" },
    { value: "4.9", label: "Avg Rating" },
    { value: "98%", label: "Recommend" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-16"
    >
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-heading font-extrabold text-white/90">
            {stat.value}
          </span>
          <span className="text-xs text-white/30 font-heading uppercase tracking-wider">
            {stat.label}
          </span>
          {i < stats.length - 1 && (
            <div className="hidden sm:block w-px h-6 bg-white/[0.06] ml-5" />
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Testimonials Section
   ═══════════════════════════════════════════════ */

export function TestimonialsSection() {
  const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
  const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Ambient glow */}
      <AmbientGlow />

      {/* Floating decorations */}
      <FloatingElements />

      {/* Subtle background wash */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, oklch(0.541 0.247 293.009 / 2%) 0%, transparent 70%)",
        }}
      />

      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(245,166,35,0.12), rgba(124,58,237,0.12), transparent)",
          }}
        />
      </div>

      {/* Header */}
      <PageContainer className="relative z-10 mb-6">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-gaming-gold/10 bg-gaming-gold/[0.04] px-4 py-1.5 mb-6"
          >
            <Star className="h-3 w-3 fill-gaming-gold text-gaming-gold" />
            <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-gaming-gold/70">
              Testimonials
            </span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight mb-5"
          >
            Loved by{" "}
            <GradientText variant="legendary">50,000+</GradientText>
            <br />
            <span className="text-white/90">Smart Gamers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-white/35 max-w-xl mx-auto leading-relaxed"
          >
            Join the community of gamers who save hundreds every month
            with AI-powered price intelligence
          </motion.p>
        </motion.div>
      </PageContainer>

      {/* Stats */}
      <div className="relative z-10">
        <StatsBar />
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <div
        className="marquee relative z-10 mb-5"
        style={{ "--marquee-duration": "42s" } as React.CSSProperties}
      >
        <div className="marquee-content">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} index={i % 4} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — scrolls right */}
      <div
        className="marquee marquee-reverse relative z-10"
        style={{ "--marquee-duration": "48s" } as React.CSSProperties}
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

      {/* Bottom divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(0,212,170,0.08), rgba(245,166,35,0.08), transparent)",
          }}
        />
      </div>
    </section>
  );
}
