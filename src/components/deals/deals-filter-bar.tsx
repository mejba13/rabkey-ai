"use client";

import { Monitor, Gamepad2, Gamepad, Smartphone, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Platform, DealTag } from "@/lib/types";

const platforms: { value: Platform | "all"; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "All", icon: Monitor },
  { value: "pc", label: "PC", icon: Monitor },
  { value: "playstation", label: "PS", icon: Gamepad2 },
  { value: "xbox", label: "Xbox", icon: Gamepad },
  { value: "nintendo", label: "Switch", icon: Smartphone },
];

const dealTags: (DealTag | "all")[] = [
  "all",
  "Flash Sale",
  "Historical Low",
  "Bundle Deal",
  "New Release",
  "Editor's Pick",
  "Trending",
  "Limited Time",
];

interface DealsFilterBarProps {
  platform: Platform | "all";
  onPlatformChange: (value: Platform | "all") => void;
  minScore: string;
  onMinScoreChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  selectedTag: DealTag | "all";
  onSelectedTagChange: (value: DealTag | "all") => void;
  onReset: () => void;
  totalCount?: number;
}

function DealsFilterBar({
  platform,
  onPlatformChange,
  minScore,
  onMinScoreChange,
  maxPrice,
  onMaxPriceChange,
  selectedTag,
  onSelectedTagChange,
  onReset,
  totalCount,
}: DealsFilterBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 flex-wrap",
        "p-3 rounded-xl",
        "bg-white/[0.02] border border-white/[0.05]"
      )}
    >
      {/* Platform pill toggles */}
      <div className="inline-flex items-center rounded-full bg-white/[0.03] border border-white/[0.04] p-0.5 gap-0.5">
        {platforms.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onPlatformChange(value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200",
              platform === value
                ? "bg-white/[0.08] text-white shadow-sm"
                : "text-white/35 hover:text-white/60"
            )}
          >
            <Icon size={12} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Min deal score */}
      <Select value={minScore} onValueChange={onMinScoreChange}>
        <SelectTrigger
          size="sm"
          className="w-[120px] rounded-full bg-white/[0.03] border-white/[0.04] text-white/50 text-xs font-heading"
        >
          <SelectValue placeholder="Min Score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any Score</SelectItem>
          <SelectItem value="50">50+</SelectItem>
          <SelectItem value="75">75+</SelectItem>
          <SelectItem value="90">90+ Legendary</SelectItem>
        </SelectContent>
      </Select>

      {/* Max price */}
      <Input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
        className="w-[110px] h-8 text-xs font-heading rounded-full bg-white/[0.03] border-white/[0.04] text-white/70 placeholder:text-white/25"
        min={0}
        step={0.01}
      />

      {/* Tag filter */}
      <Select
        value={selectedTag}
        onValueChange={(value) => onSelectedTagChange(value as DealTag | "all")}
      >
        <SelectTrigger
          size="sm"
          className="w-[150px] rounded-full bg-white/[0.03] border-white/[0.04] text-white/50 text-xs font-heading"
        >
          <SelectValue placeholder="All Tags" />
        </SelectTrigger>
        <SelectContent>
          {dealTags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag === "all" ? "All Tags" : tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Right side: count + reset */}
      <div className="flex items-center gap-3 ml-auto">
        {totalCount !== undefined && totalCount > 0 && (
          <span className="text-[11px] text-white/25 font-heading hidden sm:block">
            {totalCount} {totalCount === 1 ? "deal" : "deals"}
          </span>
        )}
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all duration-200"
        >
          <RotateCcw size={11} />
          Reset
        </button>
      </div>
    </div>
  );
}

export { DealsFilterBar };
export type { DealsFilterBarProps };
