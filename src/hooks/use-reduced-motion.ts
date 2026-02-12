"use client";
import { useSyncExternalStore, useCallback } from "react";

export function useReducedMotion(): boolean {
  const subscribe = useCallback((callback: () => void) => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  }, []);

  const getSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
