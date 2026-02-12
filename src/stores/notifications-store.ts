"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Notification } from "@/lib/types/alert";

interface NotificationsState {
  notifications: Notification[];
  get unreadCount(): number;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    type: "price-drop",
    title: "Elden Ring price dropped!",
    message: "Elden Ring is now $35.99 — down 15% from last week.",
    gameId: "g1",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
  },
  {
    id: "n2",
    type: "alert-triggered",
    title: "Price alert triggered",
    message: "Cyberpunk 2077 hit your target price of $25.00!",
    gameId: "g2",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "n3",
    type: "deal-score",
    title: "Legendary deal found",
    message: "Baldur's Gate 3 scored 95/100 — one of the best deals this month.",
    gameId: "g3",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
  },
  {
    id: "n4",
    type: "system",
    title: "Welcome to GrabKey AI",
    message: "Set up price alerts and never miss a deal again.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "n5",
    type: "price-drop",
    title: "Red Dead Redemption 2 on sale",
    message: "RDR2 dropped to $19.99 — a new historical low!",
    gameId: "g5",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
];

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: initialNotifications,

      get unreadCount() {
        return get().notifications.filter((n) => !n.read).length;
      },

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: crypto.randomUUID(),
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...state.notifications,
          ],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: "grabkey-notifications",
    },
  ),
);
