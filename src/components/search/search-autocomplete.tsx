"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";
import { useSearchAutocomplete } from "@/hooks/use-search";
import { DealScoreBadge } from "@/components/gaming";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchAutocompleteProps {
  query: string;
  onSelect: () => void;
}

export function SearchAutocomplete({
  query,
  onSelect,
}: SearchAutocompleteProps) {
  const router = useRouter();
  const { data: games, isLoading } = useSearchAutocomplete(query);

  const hasResults = games && games.length > 0;

  if (!isLoading && !hasResults) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "absolute top-full left-0 right-0 z-50 mt-2",
        "rounded-xl border border-white/[0.06] bg-card/95 backdrop-blur-xl",
        "shadow-2xl shadow-black/40 overflow-hidden"
      )}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="p-3 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <Skeleton className="h-10 w-14 rounded-lg shrink-0 shimmer-skeleton" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-3/4 shimmer-skeleton" />
                <Skeleton className="h-3 w-1/3 shimmer-skeleton" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results list */}
      {hasResults && (
        <ul className="py-1.5 max-h-[400px] overflow-y-auto">
          {games.map((game) => (
            <li key={game.id}>
              <button
                type="button"
                onClick={() => {
                  router.push(`/game/${game.slug}`);
                  onSelect();
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5",
                  "text-left transition-colors",
                  "hover:bg-white/[0.04] focus:bg-white/[0.04] outline-none"
                )}
              >
                {/* Cover image */}
                <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-white/[0.04]">
                  <Image
                    src={game.coverImage}
                    alt={game.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                {/* Game info */}
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-sm text-white/90 truncate">
                    {game.title}
                  </p>
                  <p className="text-xs text-white/35">
                    {game.metadata.platforms
                      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                      .join(", ")}
                  </p>
                </div>

                {/* Price and deal score */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-heading font-bold text-sm text-gaming-teal">
                    {formatPrice(game.bestPrice)}
                  </span>
                  <DealScoreBadge score={game.dealScore} size="sm" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
