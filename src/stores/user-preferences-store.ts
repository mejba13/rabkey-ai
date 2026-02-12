"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform } from "@/lib/types";

interface UserPreferencesState {
  region: string;
  currency: string;
  preferredPlatforms: Platform[];
  setRegion: (region: string) => void;
  setCurrency: (currency: string) => void;
  setPreferredPlatforms: (platforms: Platform[]) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      region: "US",
      currency: "USD",
      preferredPlatforms: ["pc"] as Platform[],
      setRegion: (region) => set({ region }),
      setCurrency: (currency) => set({ currency }),
      setPreferredPlatforms: (platforms) =>
        set({ preferredPlatforms: platforms }),
    }),
    {
      name: "grabkey-user-preferences",
    },
  ),
);
