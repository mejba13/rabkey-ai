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
    <div className="inline-flex items-center rounded-full bg-white/[0.03] border border-white/[0.04] p-0.5 gap-0.5">
      {viewOptions.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setViewMode(value)}
          aria-label={label}
          className={cn(
            "flex items-center justify-center p-2 rounded-full transition-all duration-200",
            viewMode === value
              ? "bg-white/[0.08] text-white shadow-sm"
              : "text-white/35 hover:text-white/60"
          )}
        >
          <Icon className="size-3.5" />
        </button>
      ))}
    </div>
  );
}
