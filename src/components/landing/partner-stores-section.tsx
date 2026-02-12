"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { AnimatedCounter } from "@/components/shared";

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
  return (
    <div
      className={cn(
        "flex-shrink-0 mx-2",
        "inline-flex items-center gap-2 px-5 py-2.5",
        "rounded-full",
        "bg-gaming-surface/60 border border-border/30",
        "text-sm font-heading font-medium text-muted-foreground",
        "transition-colors hover:text-foreground hover:border-gaming-orange/30"
      )}
    >
      <div className="h-2 w-2 rounded-full bg-gaming-teal/50" />
      {name}
    </div>
  );
}

export function PartnerStoresSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <PageContainer className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
            Tracking{" "}
            <span className="text-gaming-orange">
              <AnimatedCounter value={50} className="tabular-nums" />+
            </span>{" "}
            Stores Worldwide
          </h2>
          <p className="text-muted-foreground text-sm">
            Real-time price monitoring across every major game retailer
          </p>
        </motion.div>
      </PageContainer>

      {/* Row 1 */}
      <div className="marquee mb-3" style={{ "--marquee-duration": "50s" } as React.CSSProperties}>
        <div className="marquee-content">
          {[...storeRows[0], ...storeRows[0]].map((store, i) => (
            <StoreChip key={`r1-${i}`} name={store} />
          ))}
        </div>
      </div>

      {/* Row 2 - Reverse */}
      <div className="marquee marquee-reverse" style={{ "--marquee-duration": "55s" } as React.CSSProperties}>
        <div className="marquee-content">
          {[...storeRows[1], ...storeRows[1]].map((store, i) => (
            <StoreChip key={`r2-${i}`} name={store} />
          ))}
        </div>
      </div>
    </section>
  );
}
