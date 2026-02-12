"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { AnimatedCounter } from "@/components/shared";
import { fadeIn } from "@/animations/variants";

/* ═══════════════════════════════════════════════
   Store data
   ═══════════════════════════════════════════════ */

const premiumStores = new Set([
  "Steam",
  "GOG",
  "Epic Games",
  "Humble Bundle",
] as const);

const storeRows = [
  [
    "Steam", "GOG", "Epic Games", "Humble Bundle", "Green Man Gaming",
    "Fanatical", "CDKeys", "Eneba", "G2A", "Kinguin",
    "AllKeyShop", "IsThereAnyDeal", "GameBillet", "Voidu", "WinGameStore",
  ],
  [
    "GamersGate", "DLGamer", "IndieGala", "Nuuvem", "Gamesplanet",
    "2Game", "Instant Gaming", "MMOGA", "Gamivo", "HRK Game",
    "JoyBuggy", "Games Republic", "Noctre", "Dreamgame", "Genba",
  ],
] as const;

/* ═══════════════════════════════════════════════
   Store chip component
   ═══════════════════════════════════════════════ */

function StoreChip({ name }: { name: string }) {
  const isPremium = premiumStores.has(name as typeof premiumStores extends Set<infer T> ? T : never);

  return (
    <div
      className={cn(
        "flex-shrink-0 mx-2",
        "inline-flex items-center gap-2.5 px-6 py-3",
        "rounded-full",
        "bg-gaming-surface/60 border border-border/30",
        "text-sm font-heading font-medium text-muted-foreground",
        "transition-all duration-300",
        "hover:text-foreground",
        isPremium
          ? "hover:border-gaming-orange/40 hover:shadow-[0_0_20px_oklch(0.784_0.159_72.989/8%)]"
          : "hover:border-gaming-teal/40 hover:shadow-[0_0_20px_oklch(0.775_0.151_171.689/6%)]"
      )}
    >
      {/* Status indicator dot */}
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inset-0 rounded-full animate-ping",
            isPremium
              ? "bg-gaming-orange/40"
              : "bg-gaming-teal/40"
          )}
          style={{ animationDuration: "2.5s" }}
        />
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            isPremium
              ? "bg-gaming-orange/70"
              : "bg-gaming-teal/60"
          )}
        />
      </span>
      {name}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Partner Stores Section
   ═══════════════════════════════════════════════ */

export function PartnerStoresSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Top divider gradient line (teal-tinted) */}
      <div className="pointer-events-none absolute inset-x-0 top-0" aria-hidden="true">
        <div
          className="mx-auto h-px w-3/4"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.775 0.151 171.689 / 25%), transparent)",
          }}
        />
      </div>

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[200px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.775 0.151 171.689 / 3%) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Section header */}
      <PageContainer className="mb-12">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gaming-teal mb-4">
            Partners
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Tracking{" "}
            <span className="text-gaming-orange">
              <AnimatedCounter value={50} className="tabular-nums" />+
            </span>{" "}
            Stores Worldwide
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Real-time price monitoring across every major game retailer
            — updated every 15 minutes, 24/7.
          </p>
        </motion.div>
      </PageContainer>

      {/* Row 1 */}
      <div
        className="marquee mb-3"
        style={{ "--marquee-duration": "50s" } as React.CSSProperties}
      >
        <div className="marquee-content">
          {[...storeRows[0], ...storeRows[0]].map((store, i) => (
            <StoreChip key={`r1-${i}`} name={store} />
          ))}
        </div>
      </div>

      {/* Row 2 - Reverse */}
      <div
        className="marquee marquee-reverse"
        style={{ "--marquee-duration": "55s" } as React.CSSProperties}
      >
        <div className="marquee-content">
          {[...storeRows[1], ...storeRows[1]].map((store, i) => (
            <StoreChip key={`r2-${i}`} name={store} />
          ))}
        </div>
      </div>
    </section>
  );
}
