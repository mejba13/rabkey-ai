"use client";

import { cn } from "@/lib/utils";
import { useSearchStore } from "@/stores/search-store";
import { PlatformIcon } from "@/components/gaming";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import type { Platform } from "@/lib/types";

const platforms: { value: Platform; label: string }[] = [
  { value: "pc", label: "PC" },
  { value: "playstation", label: "PS" },
  { value: "xbox", label: "Xbox" },
  { value: "nintendo", label: "NSW" },
];

interface SearchFiltersProps {
  layout?: "horizontal" | "vertical";
  onApply?: () => void;
}

export function SearchFilters({
  layout = "horizontal",
  onApply,
}: SearchFiltersProps) {
  const { filters, updateFilter, resetFilters } = useSearchStore();

  const isHorizontal = layout === "horizontal";

  const scoreValue =
    filters.minDealScore && filters.minDealScore > 0
      ? String(filters.minDealScore)
      : "any";

  return (
    <div
      className={cn(
        isHorizontal
          ? "flex items-center gap-3 flex-wrap"
          : "flex flex-col gap-5 mt-4"
      )}
    >
      {/* Platform filter */}
      <div className={cn(isHorizontal ? "" : "space-y-2")}>
        {!isHorizontal && (
          <Label className="text-[10px] uppercase text-white/35 tracking-wider font-heading">
            Platform
          </Label>
        )}
        <ToggleGroup
          type="multiple"
          variant="outline"
          size="sm"
          value={filters.platforms}
          onValueChange={(value: string[]) =>
            updateFilter({ platforms: value as Platform[] })
          }
          className="gap-0.5 bg-white/[0.03] border border-white/[0.04] rounded-full p-0.5"
        >
          {platforms.map((p) => (
            <ToggleGroupItem
              key={p.value}
              value={p.value}
              aria-label={p.label}
              className={cn(
                "gap-1.5 px-3 py-1.5 rounded-full border-0 text-xs font-heading font-semibold",
                "data-[state=on]:bg-white/[0.08] data-[state=on]:text-white data-[state=on]:shadow-sm",
                "data-[state=off]:text-white/35 data-[state=off]:hover:text-white/60",
                "transition-all duration-200"
              )}
            >
              <PlatformIcon platform={p.value} size={13} />
              <span>{p.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Price range */}
      <div className={cn(isHorizontal ? "flex items-center gap-2" : "space-y-2")}>
        {!isHorizontal && (
          <Label className="text-[10px] uppercase text-white/35 tracking-wider font-heading">
            Price Range
          </Label>
        )}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            min={0}
            value={filters.priceMin ?? ""}
            onChange={(e) =>
              updateFilter({
                priceMin: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-20 h-8 text-xs font-heading rounded-full bg-white/[0.03] border-white/[0.04] text-white/70 placeholder:text-white/25"
          />
          <span className="text-white/15 text-xs">-</span>
          <Input
            type="number"
            placeholder="Max"
            min={0}
            value={filters.priceMax ?? ""}
            onChange={(e) =>
              updateFilter({
                priceMax: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-20 h-8 text-xs font-heading rounded-full bg-white/[0.03] border-white/[0.04] text-white/70 placeholder:text-white/25"
          />
        </div>
      </div>

      {/* On sale only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="on-sale-only"
          checked={filters.onSaleOnly}
          onCheckedChange={(checked) =>
            updateFilter({ onSaleOnly: checked === true })
          }
          className="data-[state=checked]:bg-gaming-orange data-[state=checked]:border-gaming-orange border-white/[0.1]"
        />
        <Label
          htmlFor="on-sale-only"
          className="text-xs font-heading font-semibold text-white/50 cursor-pointer select-none"
        >
          On Sale
        </Label>
      </div>

      {/* Min deal score — Select dropdown instead of slider */}
      <div className={cn(isHorizontal ? "" : "space-y-2")}>
        {!isHorizontal && (
          <Label className="text-[10px] uppercase text-white/35 tracking-wider font-heading">
            Min Deal Score
          </Label>
        )}
        <Select
          value={scoreValue}
          onValueChange={(value) =>
            updateFilter({
              minDealScore: value === "any" ? undefined : Number(value),
            })
          }
        >
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
      </div>

      {/* Reset button */}
      <button
        type="button"
        onClick={() => {
          resetFilters();
          onApply?.();
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all duration-200 ml-auto"
      >
        <RotateCcw size={11} />
        Reset
      </button>

      {/* Apply button for mobile sheet */}
      {onApply && layout === "vertical" && (
        <button
          type="button"
          onClick={onApply}
          className="w-full py-2.5 rounded-full bg-gaming-orange hover:bg-gaming-orange/90 text-white text-sm font-heading font-semibold transition-colors"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}
