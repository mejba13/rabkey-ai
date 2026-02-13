"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  CheckCircle2,
  Gamepad2,
  KeyRound,
  Trophy,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { GradientText } from "@/components/shared";
import { GamingButton } from "@/components/gaming";

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

const trustPoints = [
  { icon: Shield, text: "No credit card required" },
  { icon: Zap, text: "Start comparing in seconds" },
  { icon: Sparkles, text: "14-day Pro trial included" },
] as const;

const avatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&q=80",
];

/* ═══════════════════════════════════════════════
   Floating Decorative Elements
   ═══════════════════════════════════════════════ */

function FloatingElements() {
  const elements = [
    {
      icon: Gamepad2,
      x: "8%",
      y: "18%",
      size: 20,
      delay: 0,
      duration: 6,
      color: "text-gaming-purple/[0.12]",
    },
    {
      icon: KeyRound,
      x: "88%",
      y: "22%",
      size: 18,
      delay: 1.5,
      duration: 7,
      color: "text-gaming-orange/[0.1]",
    },
    {
      icon: Trophy,
      x: "12%",
      y: "72%",
      size: 16,
      delay: 0.8,
      duration: 5.5,
      color: "text-gaming-gold/[0.1]",
    },
    {
      icon: Target,
      x: "85%",
      y: "68%",
      size: 22,
      delay: 2,
      duration: 6.5,
      color: "text-gaming-teal/[0.1]",
    },
    {
      icon: Sparkles,
      x: "5%",
      y: "45%",
      size: 14,
      delay: 3,
      duration: 8,
      color: "text-gaming-coral/[0.08]",
    },
    {
      icon: KeyRound,
      x: "92%",
      y: "45%",
      size: 15,
      delay: 1,
      duration: 7.5,
      color: "text-gaming-purple/[0.08]",
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
            y: [0, -12, 0, 8, 0],
            rotate: [0, 6, -3, 4, 0],
            opacity: [0.6, 1, 0.7, 1, 0.6],
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
   Animated Glow Orbs
   ═══════════════════════════════════════════════ */

function GlowOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Orange orb — left */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gaming-orange/[0.04] blur-[100px]"
        style={{ left: "-10%", top: "10%" }}
        animate={{
          x: [0, 30, -10, 20, 0],
          y: [0, -20, 15, -10, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Purple orb — right */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-gaming-purple/[0.05] blur-[100px]"
        style={{ right: "-8%", top: "20%" }}
        animate={{
          x: [0, -25, 15, -10, 0],
          y: [0, 15, -20, 10, 0],
          scale: [1, 0.95, 1.08, 1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Teal orb — bottom center */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gaming-teal/[0.03] blur-[80px]"
        style={{ left: "35%", bottom: "-5%" }}
        animate={{
          x: [0, 20, -15, 10, 0],
          scale: [1, 1.05, 0.98, 1.03, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Social Proof Avatars
   ═══════════════════════════════════════════════ */

function SocialProof() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {avatars.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            width={32}
            height={32}
            className="rounded-full ring-2 ring-[#1A1A2E] object-cover"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06 }}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-heading font-semibold text-white/70">
          50,000+ gamers
        </span>
        <span className="text-[10px] font-heading text-white/30">
          saving with AI deals
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CTA Section
   ═══════════════════════════════════════════════ */

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 4000);
  }

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* Ambient glow orbs */}
      <GlowOrbs />

      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Animated gradient border */}
          <div className="absolute -inset-px rounded-3xl overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from 0deg, #F5A623, #FF6B35, #7C3AED, #00D4AA, #F5A623)",
                opacity: 0.15,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Card */}
          <div
            className={cn(
              "relative rounded-3xl overflow-hidden",
              "border border-white/[0.04]",
              "bg-[#0F0F1E]/90 backdrop-blur-sm"
            )}
          >
            {/* Background layers */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background: [
                    "radial-gradient(ellipse 70% 50% at 20% 40%, oklch(0.784 0.159 72.989 / 5%) 0%, transparent 60%)",
                    "radial-gradient(ellipse 60% 40% at 80% 30%, oklch(0.541 0.247 293.009 / 4%) 0%, transparent 60%)",
                    "radial-gradient(ellipse 50% 50% at 50% 90%, oklch(0.7 0.15 175 / 3%) 0%, transparent 60%)",
                  ].join(", "),
                }}
              />
              {/* Subtle grid */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(1 0 0 / 10%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 10%) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
            </div>

            {/* Floating elements */}
            <FloatingElements />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-28">
              <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <SocialProof />
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.05] tracking-tight"
                >
                  Ready to{" "}
                  <GradientText variant="primary">
                    Stop
                    <br />
                    Overpaying
                  </GradientText>
                  ?
                </motion.h2>

                {/* Stat line */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-base sm:text-lg text-white/40 max-w-xl leading-relaxed"
                >
                  <span className="text-white/80 font-medium">50,000+</span>{" "}
                  gamers saving{" "}
                  <span className="text-gaming-teal font-medium">$12M+</span>{" "}
                  on game keys — powered by AI price prediction and real-time
                  comparison across 50+ stores.
                </motion.p>

                {/* Email Form */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="w-full max-w-lg"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center justify-center gap-3 h-16 rounded-2xl bg-gaming-teal/10 border border-gaming-teal/20"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring" as const,
                            stiffness: 300,
                            damping: 15,
                          }}
                        >
                          <CheckCircle2 className="h-6 w-6 text-gaming-teal" />
                        </motion.div>
                        <span className="font-heading font-semibold text-gaming-teal">
                          Welcome aboard! Check your inbox.
                        </span>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className={cn(
                          "flex w-full items-center gap-2 p-2",
                          "rounded-2xl",
                          "bg-white/[0.03] backdrop-blur-sm",
                          "border border-white/[0.06]",
                          "focus-within:border-gaming-orange/20 transition-colors duration-300",
                          "shadow-[0_0_40px_rgba(245,166,35,0.03)]"
                        )}
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className={cn(
                            "flex-1 h-12 px-4 rounded-xl text-sm font-heading",
                            "bg-transparent border-0",
                            "text-white placeholder:text-white/20",
                            "outline-none focus:ring-0"
                          )}
                        />
                        <GamingButton
                          type="submit"
                          size="lg"
                          className="rounded-xl shrink-0 h-12 px-7"
                        >
                          Get Started
                          <ArrowRight className="h-4 w-4 ml-1.5" />
                        </GamingButton>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Trust Points */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
                >
                  {trustPoints.map((point) => (
                    <span
                      key={point.text}
                      className="flex items-center gap-2 text-[13px] text-white/30 font-heading"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gaming-teal/[0.08]">
                        <point.icon className="h-3 w-3 text-gaming-teal/60" />
                      </div>
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
