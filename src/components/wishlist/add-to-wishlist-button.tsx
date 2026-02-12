"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlist-store";

interface AddToWishlistButtonProps {
  gameId: string;
  className?: string;
}

function AddToWishlistButton({ gameId, className }: AddToWishlistButtonProps) {
  const isInWishlist = useWishlistStore((state) =>
    state.items.some((item) => item.gameId === gameId),
  );
  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      removeItem(gameId);
    } else {
      addItem(gameId);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-lg p-1.5",
        "bg-black/50 backdrop-blur-sm border border-white/10",
        "transition-colors duration-150",
        isInWishlist
          ? "text-gaming-pink hover:bg-gaming-pink/20"
          : "text-white/70 hover:text-gaming-pink hover:bg-black/60",
        className,
      )}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className="size-4"
        fill={isInWishlist ? "currentColor" : "none"}
      />
    </motion.button>
  );
}

export { AddToWishlistButton };
export type { AddToWishlistButtonProps };
