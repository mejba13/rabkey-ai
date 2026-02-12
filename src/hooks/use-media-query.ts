"use client";
import { useSyncExternalStore, useCallback } from "react";

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

function useIsTablet() {
  return useMediaQuery("(max-width: 1024px)");
}

export { useMediaQuery, useIsMobile, useIsTablet };
