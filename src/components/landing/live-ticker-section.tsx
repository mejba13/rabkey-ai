"use client";

import { motion } from "motion/react";
import { TrendingDown, Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/animations/variants";

const tickerItems = [
  { game: "The Witcher 3", store: "GOG", price: "$9.99", drop: "-75%", type: "flash" as const },
  { game: "Cyberpunk 2077", price: "$29.99", store: "GOG", drop: "-50%", type: "low" as const },
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
  flash: { icon: Zap, color: "text-gaming-coral", bg: "bg-gaming-coral/10", label: "FLASH" },
  low: { icon: TrendingDown, color: "text-gaming-teal", bg: "bg-gaming-teal/10", label: "HIST. LOW" },
  drop: { icon: Flame, color: "text-gaming-orange", bg: "bg-gaming-orange/10", label: "PRICE DROP" },
} as const;

function TickerItem({ item }: { item: (typeof tickerItems)[number] }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-2.5 mx-2",
        "rounded-full",
        "bg-gaming-surface/60 backdrop-blur-sm",
        "border border-border/30",
        "whitespace-nowrap shrink-0"
      )}
    >
      <span className={cn("flex items-center gap-1 text-[10px] font-heading font-bold uppercase tracking-wider", config.color)}>
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
      <span className="text-sm font-heading font-semibold text-foreground">
        {item.game}
      </span>
      <span className="text-xs text-muted-foreground">{item.store}</span>
      <span className="text-sm font-heading font-bold text-gaming-teal">
        {item.price}
      </span>
      <span className={cn(
        "text-xs font-heading font-bold px-2 py-0.5 rounded-full",
        config.bg,
        config.color
      )}>
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
      className="relative py-4 overflow-hidden border-y border-border/30 bg-gaming-surface-deep/50"
    >
      {/* Live indicator */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center gap-2 bg-gaming-surface-deep/90 backdrop-blur-sm pr-4 pl-3 py-1.5 rounded-full border border-border/30">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gaming-coral opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gaming-coral" />
        </span>
        <span className="text-[10px] font-heading font-bold text-gaming-coral uppercase tracking-wider">
          Live
        </span>
      </div>

      <div className="marquee" style={{ "--marquee-duration": "60s" } as React.CSSProperties}>
        <div className="marquee-content">
          {doubled.map((item, i) => (
            <TickerItem key={`${item.game}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
