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
import { GamingButton } from "@/components/gaming";
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
}: DealsFilterBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Platform toggles */}
      <div className="flex items-center rounded-lg border border-border overflow-hidden">
        {platforms.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onPlatformChange(value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-heading font-medium transition-colors",
              platform === value
                ? "bg-gaming-orange text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-gaming-surface-elevated"
            )}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Min deal score */}
      <Select value={minScore} onValueChange={onMinScoreChange}>
        <SelectTrigger size="sm" className="w-[120px]">
          <SelectValue placeholder="Min Score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any Score</SelectItem>
          <SelectItem value="50">50+</SelectItem>
          <SelectItem value="75">75+</SelectItem>
          <SelectItem value="90">90+</SelectItem>
        </SelectContent>
      </Select>

      {/* Max price */}
      <Input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
        className="w-[110px] h-8 text-sm"
        min={0}
        step={0.01}
      />

      {/* Tag filter */}
      <Select
        value={selectedTag}
        onValueChange={(value) => onSelectedTagChange(value as DealTag | "all")}
      >
        <SelectTrigger size="sm" className="w-[150px]">
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

      {/* Reset */}
      <GamingButton variant="ghost" size="sm" onClick={onReset}>
        <RotateCcw size={14} />
        Reset
      </GamingButton>
    </div>
  );
}

export { DealsFilterBar };
export type { DealsFilterBarProps };
