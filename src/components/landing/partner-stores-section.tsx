"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { AnimatedCounter } from "@/components/shared";
import { fadeIn } from "@/animations/variants";

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

function StoreChip({ name }: { name: string }) {
  const isPremium = premiumStores.has(name as typeof premiumStores extends Set<infer T> ? T : never);

  return (
    <div
      className={cn(
        "flex-shrink-0 mx-2",
        "inline-flex items-center gap-2 px-5 py-2.5",
        "rounded-full",
        "bg-gaming-surface/40 border border-border/15",
        "text-sm font-heading font-medium text-muted-foreground/60",
        "transition-all duration-300",
        "hover:text-foreground/80 hover:border-border/30"
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            isPremium ? "bg-gaming-orange/60" : "bg-gaming-teal/50"
          )}
        />
      </span>
      {name}
    </div>
  );
}

export function PartnerStoresSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div
          className="mx-auto h-px w-2/3"
          style={{
            background: "linear-gradient(to right, transparent, oklch(0.775 0.151 171.689 / 15%), transparent)",
          }}
        />
      </div>

      {/* Header */}
      <PageContainer className="mb-12">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <span className="inline-block text-[11px] font-heading font-bold uppercase tracking-[0.25em] text-gaming-teal/80 mb-4">
            Partners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
            Tracking{" "}
            <span className="text-gaming-orange">
              <AnimatedCounter value={50} className="tabular-nums" />+
            </span>{" "}
            Stores Worldwide
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
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

      {/* Row 2 */}
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
