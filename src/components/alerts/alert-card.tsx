"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Pause, Play, Trash2, Target } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatPrice, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAlertsStore } from "@/stores/alerts-store";
import type { PriceAlert } from "@/lib/types/alert";
import type { Game } from "@/lib/types";

interface AlertCardProps {
  alert: PriceAlert;
  game?: Game;
  className?: string;
}

const statusConfig: Record<
  PriceAlert["status"],
  { label: string; className: string }
> = {
  active: { label: "Active", className: "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30" },
  paused: { label: "Paused", className: "bg-muted text-muted-foreground border-border" },
  triggered: { label: "Triggered", className: "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30" },
  expired: { label: "Expired", className: "bg-gaming-pink/15 text-gaming-pink border-gaming-pink/30" },
};

export function AlertCard({ alert, game, className }: AlertCardProps) {
  const { removeAlert, toggleAlertStatus } = useAlertsStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const status = statusConfig[alert.status];
  const progress = Math.min(
    100,
    Math.max(
      0,
      ((alert.currentPrice - alert.targetPrice) /
        (alert.currentPrice || 1)) *
        100
    )
  );
  const priceGap = alert.currentPrice - alert.targetPrice;
  const isTriggered = alert.status === "triggered";

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    removeAlert(alert.id);
    toast.success("Alert removed", {
      description: game ? `Alert for ${game.title} has been deleted.` : "Alert deleted.",
    });
  }

  function handleToggle() {
    toggleAlertStatus(alert.id);
    const newStatus = alert.status === "active" ? "paused" : "active";
    toast(newStatus === "active" ? "Alert resumed" : "Alert paused", {
      description: game?.title,
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className={cn(
        "rounded-xl border bg-card p-4 transition-[border-color,box-shadow] duration-200",
        isTriggered
          ? "border-gaming-teal/50 shadow-[0_0_20px_rgba(0,212,170,0.08)]"
          : "border-border hover:border-gaming-orange/40",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Left: Game thumbnail + title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {game && (
            <Image
              src={game.coverImage}
              alt={game.title}
              width={48}
              height={48}
              className="size-12 rounded-lg object-cover shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="font-heading font-semibold text-sm truncate">
              {game?.title ?? "Unknown Game"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Created {formatDate(alert.createdAt)}
            </p>
            {isTriggered && alert.triggeredAt && (
              <p className="text-xs text-gaming-teal mt-0.5 font-medium">
                Price target hit on {formatDate(alert.triggeredAt)}!
              </p>
            )}
          </div>
        </div>

        {/* Center: Price comparison + progress */}
        <div className="hidden sm:flex flex-col items-center gap-1.5 min-w-[160px]">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">
              {formatPrice(alert.currentPrice)}
            </span>
            <Target className="size-3.5 text-gaming-orange" />
            <span className="font-heading font-bold text-gaming-teal">
              {formatPrice(alert.targetPrice)}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-gaming-surface-elevated overflow-hidden">
            <motion.div
              className={cn(
                "h-full rounded-full",
                isTriggered
                  ? "bg-gaming-teal"
                  : "bg-gradient-to-r from-gaming-orange to-gaming-coral"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${100 - progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground">
            {isTriggered
              ? "Target reached!"
              : `${formatPrice(priceGap)} away from target`}
          </p>
        </div>

        {/* Right: Status + actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Badge
            variant="outline"
            className={cn("text-[10px] px-2 py-0.5 font-heading", status.className)}
          >
            {status.label}
          </Badge>

          <div className="flex items-center gap-1">
            {(alert.status === "active" || alert.status === "paused") && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleToggle}
                aria-label={alert.status === "active" ? "Pause alert" : "Resume alert"}
              >
                {alert.status === "active" ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "size-8",
                confirmDelete && "text-gaming-pink hover:text-gaming-pink"
              )}
              onClick={handleDelete}
              aria-label={confirmDelete ? "Confirm delete" : "Delete alert"}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile price info */}
      <div className="sm:hidden mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Current: {formatPrice(alert.currentPrice)}
          </span>
          <span className="font-heading font-bold text-gaming-teal">
            Target: {formatPrice(alert.targetPrice)}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gaming-surface-elevated overflow-hidden mt-2">
          <motion.div
            className={cn(
              "h-full rounded-full",
              isTriggered
                ? "bg-gaming-teal"
                : "bg-gradient-to-r from-gaming-orange to-gaming-coral"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${100 - progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 text-center">
          {isTriggered
            ? "Target reached!"
            : `${formatPrice(priceGap)} away from target`}
        </p>
      </div>
    </motion.div>
  );
}
