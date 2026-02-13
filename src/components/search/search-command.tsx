"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Search, Gamepad2, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";
import { useSearchAutocomplete } from "@/hooks/use-search";
import { useSearchStore } from "@/stores/search-store";
import { PlatformIcon, DealScoreBadge } from "@/components/gaming";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const setQuery = useSearchStore((s) => s.setQuery);
  const [inputValue, setInputValue] = useState("");
  const { data: results = [], isLoading } = useSearchAutocomplete(inputValue);

  // Reset input when dialog opens
  useEffect(() => {
    if (open) setInputValue("");
  }, [open]);

  const handleSelect = useCallback(
    (slug: string) => {
      onOpenChange(false);
      router.push(`/game/${slug}`);
    },
    [onOpenChange, router],
  );

  const handleSearchAll = useCallback(() => {
    if (inputValue.trim()) {
      setQuery(inputValue.trim());
      onOpenChange(false);
      router.push("/search");
    }
  }, [inputValue, setQuery, onOpenChange, router]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50",
            "bg-black/60 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />

        {/* Content — positioned near top of viewport */}
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[15%] z-50 w-full max-w-[520px]",
            "translate-x-[-50%] outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98",
            "data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
            "duration-200"
          )}
        >
          {/* Accessible title (sr-only) */}
          <DialogPrimitive.Title className="sr-only">
            Search Games
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search for games across 50+ stores
          </DialogPrimitive.Description>

          <CommandPrimitive
            className={cn(
              "flex flex-col overflow-hidden rounded-xl",
              "bg-[#12121a]/95 backdrop-blur-2xl",
              "border border-white/[0.08]",
              "shadow-2xl shadow-black/50",
              "ring-1 ring-white/[0.04]"
            )}
            shouldFilter={false}
          >
            {/* ── Search Input ── */}
            <div className="flex items-center gap-3 px-4 border-b border-white/[0.06]">
              <Search size={16} className="shrink-0 text-gaming-orange/70" />
              <CommandPrimitive.Input
                placeholder="Search for games..."
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue.trim() && results.length === 0) {
                    handleSearchAll();
                  }
                }}
                className={cn(
                  "flex-1 h-12 bg-transparent py-3",
                  "text-sm text-white/90 font-heading",
                  "placeholder:text-white/25",
                  "outline-none"
                )}
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue("")}
                  className="text-[10px] text-white/20 hover:text-white/40 font-heading px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] transition-colors"
                >
                  ESC
                </button>
              )}
            </div>

            {/* ── Results List ── */}
            <CommandPrimitive.List className="max-h-[380px] overflow-y-auto overflow-x-hidden scroll-py-1">
              {/* Prompt — before user types */}
              {inputValue.length < 2 && (
                <div className="px-4 py-10 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.05]">
                    <Gamepad2 size={22} className="text-white/15" />
                  </div>
                  <p className="text-sm text-white/30 font-heading mt-3">
                    Type to search 50+ games
                  </p>
                  <p className="text-[11px] text-white/15 mt-1">
                    e.g. Elden Ring, Cyberpunk 2077, Baldur&apos;s Gate 3
                  </p>
                </div>
              )}

              {/* Loading state */}
              {isLoading && inputValue.length >= 2 && (
                <div className="px-3 py-4 space-y-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-2 py-2.5 animate-pulse">
                      <div className="h-10 w-[72px] rounded-md bg-white/[0.04]" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 w-3/4 rounded bg-white/[0.04]" />
                        <div className="h-3 w-1/2 rounded bg-white/[0.03]" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!isLoading && inputValue.length >= 2 && results.length === 0 && (
                <CommandPrimitive.Empty className="py-10 text-center">
                  <p className="text-sm text-white/30 font-heading">
                    No games found for &ldquo;{inputValue}&rdquo;
                  </p>
                  <p className="text-[11px] text-white/15 mt-1">
                    Try a different search term
                  </p>
                </CommandPrimitive.Empty>
              )}

              {/* Results */}
              {results.length > 0 && (
                <>
                  <CommandPrimitive.Group className="px-2 py-2">
                    <p className="px-2 pb-2 text-[10px] uppercase tracking-wider text-white/20 font-heading">
                      Games
                    </p>
                    {results.map((game) => (
                      <CommandPrimitive.Item
                        key={game.id}
                        value={game.title}
                        onSelect={() => handleSelect(game.slug)}
                        className={cn(
                          "flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer",
                          "text-sm outline-none select-none",
                          "data-[selected=true]:bg-white/[0.05]",
                          "transition-colors duration-100"
                        )}
                      >
                        {/* Cover thumbnail */}
                        <div className="relative h-10 w-[72px] shrink-0 overflow-hidden rounded-md border border-white/[0.06]">
                          <Image
                            src={game.coverImage}
                            alt={game.title}
                            fill
                            className="object-cover"
                            sizes="72px"
                          />
                        </div>

                        {/* Game info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-heading font-semibold text-white/85 truncate">
                            {game.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-1">
                              {game.metadata.platforms.slice(0, 3).map((p) => (
                                <PlatformIcon
                                  key={p}
                                  platform={p}
                                  size={10}
                                  className="text-white/25"
                                />
                              ))}
                            </div>
                            <span className="h-0.5 w-0.5 rounded-full bg-white/15" />
                            <span
                              className={cn(
                                "text-xs font-heading font-bold",
                                game.isOnSale ? "text-gaming-teal" : "text-white/50",
                              )}
                            >
                              {formatPrice(game.bestPrice)}
                            </span>
                          </div>
                        </div>

                        {/* Deal score */}
                        <DealScoreBadge score={game.dealScore} size="sm" />
                      </CommandPrimitive.Item>
                    ))}
                  </CommandPrimitive.Group>

                  {/* Divider */}
                  <div className="h-px mx-3 bg-white/[0.04]" />

                  {/* View all results */}
                  <CommandPrimitive.Group className="px-2 py-2">
                    <CommandPrimitive.Item
                      value={`search-all-${inputValue}`}
                      onSelect={handleSearchAll}
                      className={cn(
                        "flex items-center gap-2.5 px-2 py-2.5 rounded-lg cursor-pointer",
                        "text-sm outline-none select-none",
                        "data-[selected=true]:bg-white/[0.05]",
                        "transition-colors duration-100"
                      )}
                    >
                      <TrendingUp size={14} className="text-gaming-orange shrink-0" />
                      <span className="text-[13px] font-heading text-white/45">
                        View all results for &ldquo;{inputValue}&rdquo;
                      </span>
                      <ArrowRight size={12} className="ml-auto text-white/15" />
                    </CommandPrimitive.Item>
                  </CommandPrimitive.Group>
                </>
              )}
            </CommandPrimitive.List>

            {/* ── Footer hint ── */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5 text-[10px] text-white/15 font-heading">
                <kbd className="inline-flex items-center justify-center h-4 w-4 rounded bg-white/[0.04] border border-white/[0.06] text-[9px]">
                  &uarr;
                </kbd>
                <kbd className="inline-flex items-center justify-center h-4 w-4 rounded bg-white/[0.04] border border-white/[0.06] text-[9px]">
                  &darr;
                </kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/15 font-heading">
                <kbd className="inline-flex items-center justify-center h-4 px-1.5 rounded bg-white/[0.04] border border-white/[0.06] text-[9px]">
                  &crarr;
                </kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/15 font-heading">
                <kbd className="inline-flex items-center justify-center h-4 px-1.5 rounded bg-white/[0.04] border border-white/[0.06] text-[9px]">
                  esc
                </kbd>
                <span>Close</span>
              </div>
            </div>
          </CommandPrimitive>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { SearchCommand };
