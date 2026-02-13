"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/stores/search-store";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchAutocomplete } from "./search-autocomplete";

export function SearchBar() {
  const { query, setQuery } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(query);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(localQuery, 300);

  // Sync debounced value to store
  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery, setQuery]);

  // Sync store query back to local state when reset externally
  useEffect(() => {
    if (query !== localQuery && query === "") {
      setLocalQuery("");
    }
    // Only sync on external reset (when query becomes empty)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleClear = useCallback(() => {
    setLocalQuery("");
    setQuery("");
    inputRef.current?.focus();
  }, [setQuery]);

  // Close autocomplete when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showAutocomplete =
    isFocused && localQuery.length >= 2;

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Search icon */}
      <Search
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors",
          isFocused ? "text-gaming-orange" : "text-white/25"
        )}
      />

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        aria-label="Search for games"
        placeholder="Search for games, e.g. Elden Ring, Cyberpunk 2077..."
        className={cn(
          "h-12 w-full rounded-full pl-11 pr-11",
          "bg-white/[0.04] border text-white/90 font-heading text-sm",
          "placeholder:text-white/25",
          "outline-none transition-all duration-200",
          isFocused
            ? "border-gaming-orange/40 ring-2 ring-gaming-orange/10 bg-white/[0.06]"
            : "border-white/[0.06] hover:border-white/[0.1]"
        )}
      />

      {/* Clear button */}
      {localQuery.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2",
            "rounded-full p-1 text-white/30",
            "hover:bg-white/10 hover:text-white/60 transition-colors"
          )}
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </button>
      )}

      {/* Autocomplete dropdown */}
      {showAutocomplete && (
        <SearchAutocomplete
          query={localQuery}
          onSelect={() => setIsFocused(false)}
        />
      )}
    </div>
  );
}
