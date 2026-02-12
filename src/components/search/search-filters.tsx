"use client";

import { cn } from "@/lib/utils";
import { useSearchStore } from "@/stores/search-store";
import { PlatformIcon } from "@/components/gaming";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
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

  return (
    <div
      className={cn(
        isHorizontal
          ? "flex items-center gap-4 flex-wrap"
          : "flex flex-col gap-5 mt-4"
      )}
    >
      {/* Platform filter */}
      <div className={cn(isHorizontal ? "" : "space-y-2")}>
        {!isHorizontal && (
          <Label className="text-xs uppercase text-muted-foreground tracking-wider">
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
          className="gap-1"
        >
          {platforms.map((p) => (
            <ToggleGroupItem
              key={p.value}
              value={p.value}
              aria-label={p.label}
              className={cn(
                "gap-1.5 px-2.5 data-[state=on]:bg-gaming-orange/20 data-[state=on]:text-gaming-orange data-[state=on]:border-gaming-orange/50"
              )}
            >
              <PlatformIcon platform={p.value} size={14} className="" />
              <span className="text-xs">{p.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Price range */}
      <div className={cn(isHorizontal ? "flex items-center gap-2" : "space-y-2")}>
        {!isHorizontal && (
          <Label className="text-xs uppercase text-muted-foreground tracking-wider">
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
            className="w-20 h-8 text-xs bg-gaming-surface"
          />
          <span className="text-muted-foreground text-xs">-</span>
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
            className="w-20 h-8 text-xs bg-gaming-surface"
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
          className="data-[state=checked]:bg-gaming-orange data-[state=checked]:border-gaming-orange"
        />
        <Label
          htmlFor="on-sale-only"
          className="text-sm cursor-pointer select-none"
        >
          On Sale
        </Label>
      </div>

      {/* Min deal score */}
      <div
        className={cn(
          isHorizontal
            ? "flex items-center gap-2"
            : "space-y-2"
        )}
      >
        {!isHorizontal && (
          <Label className="text-xs uppercase text-muted-foreground tracking-wider">
            Min Deal Score
          </Label>
        )}
        <div className="flex items-center gap-3">
          {isHorizontal && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Score:
            </span>
          )}
          <Slider
            value={[filters.minDealScore ?? 0]}
            onValueChange={([value]) =>
              updateFilter({ minDealScore: value === 0 ? undefined : value })
            }
            min={0}
            max={100}
            step={5}
            className="w-24 md:w-32"
          />
          <span className="text-xs font-heading font-bold text-gaming-orange min-w-[2rem] text-right">
            {filters.minDealScore ?? 0}
          </span>
        </div>
      </div>

      {/* Reset button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          resetFilters();
          onApply?.();
        }}
        className="gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <X className="size-3.5" />
        Reset
      </Button>

      {/* Apply button for mobile sheet */}
      {onApply && layout === "vertical" && (
        <Button
          onClick={onApply}
          className="w-full bg-gaming-orange hover:bg-gaming-orange-hover text-white"
        >
          Apply Filters
        </Button>
      )}
    </div>
  );
}
