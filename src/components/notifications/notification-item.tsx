"use client";

import { memo, type ElementType } from "react";
import { TrendingDown, Bell, Star, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/formatters";
import type { Notification } from "@/lib/types/alert";

interface NotificationItemProps {
  notification: Notification;
  onRead: () => void;
}

const typeIcons: Record<Notification["type"], ElementType> = {
  "price-drop": TrendingDown,
  "alert-triggered": Bell,
  "deal-score": Star,
  system: Info,
};

const typeColors: Record<Notification["type"], string> = {
  "price-drop": "text-gaming-teal",
  "alert-triggered": "text-gaming-orange",
  "deal-score": "text-gaming-gold",
  system: "text-gaming-blue",
};

function NotificationItemInner({
  notification,
  onRead,
}: NotificationItemProps) {
  const Icon = typeIcons[notification.type];
  const iconColor = typeColors[notification.type];

  return (
    <button
      type="button"
      onClick={onRead}
      className={cn(
        "flex items-start gap-3 w-full text-left p-3 rounded-lg transition-colors",
        notification.read
          ? "opacity-60 hover:opacity-80"
          : "hover:bg-gaming-surface-elevated"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "mt-0.5 shrink-0 size-8 rounded-full flex items-center justify-center bg-gaming-surface-elevated",
          iconColor
        )}
      >
        <Icon className="size-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm truncate",
            !notification.read && "font-semibold"
          )}
        >
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {notification.message}
        </p>
        <p className="text-[10px] text-muted-foreground mt-1">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <span className="mt-2 size-2 rounded-full bg-gaming-orange shrink-0" />
      )}
    </button>
  );
}

const NotificationItem = memo(NotificationItemInner);
export { NotificationItem };
export type { NotificationItemProps };
