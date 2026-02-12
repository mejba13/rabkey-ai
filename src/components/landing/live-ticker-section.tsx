"use client";

import { motion } from "motion/react";
import { TrendingDown, Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/animations/variants";

const tickerItems = [
  { game: "The Witcher 3", store: "GOG", price: "$9.99", drop: "-75%", type: "flash" as const },
  { game: "Cyberpunk 2077", store: "GOG", price: "$29.99", drop: "-50%", type: "low" as const },
  { game: "Red Dead Redemption 2", store: "Steam", price: "$19.99", drop: "-67%", type: "flash" as const },
  { game: "Elden Ring", store: "Green Man Gaming", price: "$35.99", drop: "-40%", type: "drop" as const },
  { game: "God of War", store: "Steam", price: "$19.99", drop: "-60%", type: "low" as const },
  { game: "Hades", store: "Humble Bundle", price: "$10.49", drop: "-58%", type: "flash" as const },
  { game: "Hollow Knight", store: "Steam", price: "$7.49", drop: "-50%", type: "low" as const },
  { game: "Dead Cells", store: "Steam", price: "$7.49", drop: "-70%", type: "flash" as const },
  { game: "Celeste", store: "Steam", price: "$4.99", drop: "-75%", type: "low" as const },
  { game: "Disco Elysium", store: "GOG", price: "$9.99", drop: "-75%", type: "low" as const },
  { game: "Resident Evil 4", store: "Fanatical", price: "$27.99", drop: "-53%", type: "drop" as const },
  { game: "Hogwarts Legacy", store: "GMG", price: "$29.99", drop: "-50%", type: "drop" as const },
] as const;

const typeConfig = {
  flash: {
    icon: Zap,
    color: "text-gaming-coral",
    bg: "bg-gaming-coral/10",
    borderColor: "border-l-gaming-coral/40",
    badgeBg: "bg-gaming-coral/15",
    gradientFrom: "from-gaming-coral/[0.06]",
    label: "FLASH",
  },
  low: {
    icon: TrendingDown,
    color: "text-gaming-teal",
    bg: "bg-gaming-teal/10",
    borderColor: "border-l-gaming-teal/40",
    badgeBg: "bg-gaming-teal/15",
    gradientFrom: "from-gaming-teal/[0.06]",
    label: "HIST. LOW",
  },
  drop: {
    icon: Flame,
    color: "text-gaming-orange",
    bg: "bg-gaming-orange/10",
    borderColor: "border-l-gaming-orange/40",
    badgeBg: "bg-gaming-orange/15",
    gradientFrom: "from-gaming-orange/[0.06]",
    label: "PRICE DROP",
  },
} as const;

function TickerItem({ item }: { item: (typeof tickerItems)[number] }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-2.5 mx-1.5",
        "rounded-full",
        "bg-gradient-to-r",
        config.gradientFrom,
        "to-transparent",
        "backdrop-blur-sm",
        "border border-border/20",
        "border-l-2",
        config.borderColor,
        "whitespace-nowrap shrink-0",
        "transition-colors duration-200"
      )}
    >
      {/* Type badge */}
      <span
        className={cn(
          "flex items-center gap-1 text-[10px] font-heading font-bold uppercase tracking-wider",
          "px-2 py-0.5 rounded-full",
          config.bg,
          config.color
        )}
      >
        <Icon className="h-3 w-3" />
        {config.label}
      </span>

      {/* Game name */}
      <span className="text-[15px] font-heading font-semibold text-foreground leading-none">
        {item.game}
      </span>

      {/* Store */}
      <span className="text-xs text-muted-foreground">{item.store}</span>

      {/* Separator dot */}
      <span className="h-1 w-1 rounded-full bg-border/50" />

      {/* Price */}
      <span className="text-sm font-heading font-bold text-gaming-teal tracking-tight">
        {item.price}
      </span>

      {/* Discount badge */}
      <span
        className={cn(
          "text-xs font-heading font-bold px-2.5 py-0.5 rounded-full",
          config.badgeBg,
          config.color
        )}
      >
        {item.drop}
      </span>
    </div>
  );
}

export function LiveTickerSection() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <motion.section
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="relative py-4 overflow-hidden bg-gradient-to-b from-gaming-surface-deep/80 to-gaming-surface-deep/30"
    >
      {/* Top gradient border line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gaming-orange/25 to-transparent" />

      {/* Bottom gradient border line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gaming-orange/25 to-transparent" />

      {/* Subtle ambient glow at center */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gaming-orange/[0.02] to-transparent pointer-events-none" />

      {/* Live indicator */}
      <div
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-10",
          "hidden sm:flex items-center gap-2",
          "bg-gaming-surface-deep/95 backdrop-blur-md",
          "pr-4 pl-3 py-1.5 rounded-full",
          "border border-gaming-coral/20",
          "shadow-[0_0_12px_rgba(255,107,53,0.15),0_0_4px_rgba(255,107,53,0.1)]"
        )}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gaming-coral opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gaming-coral shadow-[0_0_6px_rgba(255,107,53,0.5)]" />
        </span>
        <span className="text-[11px] font-heading font-bold text-gaming-coral uppercase tracking-widest">
          Live
        </span>
      </div>

      {/* Marquee */}
      <div
        className="marquee"
        style={{ "--marquee-duration": "60s" } as React.CSSProperties}
      >
        <div className="marquee-content">
          {doubled.map((item, i) => (
            <TickerItem key={`${item.game}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
