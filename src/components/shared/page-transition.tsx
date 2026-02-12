"use client";

import { motion } from "motion/react";
import { pageTransition } from "@/animations/page-transitions";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { PageTransition };
export type { PageTransitionProps };
