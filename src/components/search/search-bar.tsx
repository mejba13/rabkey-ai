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
          "absolute left-4 top-1/2 -translate-y-1/2 size-5 transition-colors",
          isFocused ? "text-gaming-orange" : "text-muted-foreground"
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
          "h-12 w-full rounded-xl border bg-gaming-surface pl-12 pr-12",
          "text-foreground placeholder:text-muted-foreground",
          "outline-none transition-all duration-200",
          "focus:border-gaming-orange focus:ring-2 focus:ring-gaming-orange/20",
          isFocused ? "border-gaming-orange" : "border-border"
        )}
      />

      {/* Clear button */}
      {localQuery.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2",
            "rounded-full p-1 text-muted-foreground",
            "hover:bg-white/10 hover:text-foreground transition-colors"
          )}
          aria-label="Clear search"
        >
          <X className="size-4" />
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
