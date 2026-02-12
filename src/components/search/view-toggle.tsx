"use client";

import { Grid3X3, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/stores/search-store";
import type { ViewMode } from "@/lib/types";

const viewOptions: { value: ViewMode; icon: React.ElementType; label: string }[] = [
  { value: "grid", icon: Grid3X3, label: "Grid view" },
  { value: "list", icon: List, label: "List view" },
];

export function ViewToggle() {
  const { viewMode, setViewMode } = useSearchStore();

  return (
    <div className="flex items-center rounded-lg border border-border bg-gaming-surface overflow-hidden">
      {viewOptions.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setViewMode(value)}
          aria-label={label}
          className={cn(
            "flex items-center justify-center p-2 transition-colors",
            viewMode === value
              ? "bg-gaming-orange/15 text-gaming-orange"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
