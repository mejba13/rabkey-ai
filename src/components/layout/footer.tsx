"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUp,
  Send,
  Gamepad2,
  MessageCircle,
  GitBranch,
  Store,
  Users,
  Shield,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { PageContainer } from "./page-container";

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Search Games", href: "/search" },
      { label: "Hot Deals", href: "/deals" },
      { label: "Price Tracker", href: "/search" },
      { label: "Store Directory", href: "/stores" },
      { label: "Browser Extension", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press Kit", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing Plans", href: "/pricing" },
      { label: "API Docs", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Status Page", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    icon: Gamepad2,
    href: "https://twitter.com",
    label: "Twitter / X",
    hoverClass: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/20",
  },
  {
    icon: MessageCircle,
    href: "https://discord.com",
    label: "Discord",
    hoverClass: "hover:bg-[#5865F2]/10 hover:text-[#5865F2] hover:border-[#5865F2]/20",
  },
  {
    icon: GitBranch,
    href: "https://github.com",
    label: "GitHub",
    hoverClass: "hover:bg-white/[0.06] hover:text-white hover:border-white/15",
  },
];

const stats = [
  { icon: Store, value: "50+", label: "Stores Tracked" },
  { icon: Users, value: "1M+", label: "Active Gamers" },
  { icon: Shield, value: "99.9%", label: "Uptime" },
  { icon: Zap, value: "< 1s", label: "Price Updates" },
];

/* ═══════════════════════════════════════════════
   Newsletter Form
   ═══════════════════════════════════════════════ */

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gaming-orange/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gaming-purple/[0.04] blur-3xl" />

      <div className="relative p-6 md:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="mb-5 lg:mb-0 lg:flex-1">
          <h3 className="font-heading font-bold text-lg text-white mb-1.5">
            Never miss a legendary deal
          </h3>
          <p className="text-sm text-white/35 leading-relaxed max-w-md">
            Get weekly AI-curated deals, price drop alerts, and exclusive offers
            delivered to your inbox.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2.5 rounded-xl bg-gaming-teal/10 border border-gaming-teal/20 px-5 py-3"
          >
            <CheckCircle2 className="h-4 w-4 text-gaming-teal shrink-0" />
            <span className="text-sm font-heading font-medium text-gaming-teal">
              You&apos;re subscribed!
            </span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 lg:w-auto lg:min-w-[360px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className={cn(
                "flex-1 h-11 px-4 rounded-xl text-sm font-heading",
                "bg-white/[0.04] border border-white/[0.08]",
                "text-white placeholder:text-white/20",
                "outline-none focus:border-gaming-orange/30 focus:ring-1 focus:ring-gaming-orange/20",
                "transition-all duration-200"
              )}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "h-11 px-5 rounded-xl",
                "bg-gradient-to-r from-gaming-orange to-gaming-coral",
                "text-sm font-heading font-semibold text-white",
                "flex items-center gap-2 shrink-0",
                "hover:shadow-lg hover:shadow-gaming-orange/20",
                "transition-shadow duration-200"
              )}
            >
              Subscribe
              <Send className="h-3.5 w-3.5" />
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Link Group
   ═══════════════════════════════════════════════ */

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-heading font-semibold uppercase tracking-[0.15em] text-white/50 mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className={cn(
                "text-[13px] text-white/30 font-heading",
                "hover:text-white/70 transition-colors duration-200",
                "relative inline-block",
                "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0",
                "after:bg-gaming-orange/40 after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════════ */

export function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245,166,35,0.15) 25%, rgba(124,58,237,0.15) 50%, rgba(0,212,170,0.1) 75%, transparent 100%)",
        }}
      />

      <PageContainer className="pt-16 pb-8">
        {/* ── Newsletter ── */}
        <div className="mb-14">
          <NewsletterForm />
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gaming-orange/[0.06]">
                <Icon className="h-4 w-4 text-gaming-orange/70" />
              </div>
              <div>
                <div className="font-heading font-bold text-base text-white/90">
                  {value}
                </div>
                <div className="text-[10px] font-heading text-white/25 uppercase tracking-wider">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main Grid: Brand + Links ── */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-8 mb-14">
          {/* Brand column — 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="lg" />
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
              AI-powered game key price intelligence. Compare prices from 50+
              stores, get smart deal scores, and never overpay for games.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "text-white/30 border border-white/[0.06] bg-white/[0.02]",
                    "transition-all duration-200",
                    social.hoverClass
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns — 4 cols */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {linkGroups.map((group) => (
              <FooterLinkGroup
                key={group.title}
                title={group.title}
                links={group.links}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/[0.04] pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/20 font-heading">
              &copy; {new Date().getFullYear()} GrabKey AI. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <p className="text-[11px] text-white/15 font-heading">
                Made for gamers who hate overpaying.
              </p>
              <button
                onClick={scrollToTop}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "border border-white/[0.06] bg-white/[0.02]",
                  "text-white/25 hover:text-white/60",
                  "hover:border-white/[0.1] hover:bg-white/[0.04]",
                  "transition-all duration-200"
                )}
                aria-label="Back to top"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
