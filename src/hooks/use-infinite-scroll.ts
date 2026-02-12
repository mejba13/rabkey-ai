"use client";
import { useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(callback: () => void) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date without re-creating the observer
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    triggerRef.current = node;
  }, []);

  useEffect(() => {
    const node = triggerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callbackRef.current();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return setRef;
}
