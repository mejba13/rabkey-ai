"use client";

import { useEffect, useRef } from "react";
import { useSpring, useTransform, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

function AnimatedCounter({
  value,
  duration = 0.8,
  className,
}: AnimatedCounterProps) {
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest)
  );

  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = String(latest);
      }
    });
    return unsubscribe;
  }, [displayValue]);

  return <motion.span ref={ref} className={cn(className)} />;
}

export { AnimatedCounter };
export type { AnimatedCounterProps };
