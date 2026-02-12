"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PriceAlert } from "@/lib/types/alert";

interface AlertsState {
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, "id" | "createdAt">) => void;
  removeAlert: (id: string) => void;
  updateAlert: (id: string, partial: Partial<PriceAlert>) => void;
  toggleAlertStatus: (id: string) => void;
  getAlertsForGame: (gameId: string) => PriceAlert[];
}

export const useAlertsStore = create<AlertsState>()(
  persist(
    (set, get) => ({
      alerts: [],

      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              ...alert,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id),
        })),

      updateAlert: (id, partial) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, ...partial } : a
          ),
        })),

      toggleAlertStatus: (id) =>
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id
              ? { ...a, status: a.status === "active" ? "paused" : "active" }
              : a
          ),
        })),

      getAlertsForGame: (gameId) =>
        get().alerts.filter((a) => a.gameId === gameId),
    }),
    {
      name: "grabkey-alerts",
    },
  ),
);
