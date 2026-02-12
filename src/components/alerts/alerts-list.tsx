"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamingButton } from "@/components/gaming";
import { EmptyState } from "@/components/shared";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { mockGames } from "@/lib/mock-data";
import { useAlertsStore } from "@/stores/alerts-store";
import { AlertCard } from "./alert-card";
import { CreateAlertModal } from "./create-alert-modal";
import type { AlertStatus } from "@/lib/types/alert";

type FilterTab = "all" | AlertStatus;

export function AlertsList() {
  const alerts = useAlertsStore((s) => s.alerts);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const filteredAlerts = useMemo(() => {
    if (filter === "all") return alerts;
    return alerts.filter((a) => a.status === filter);
  }, [alerts, filter]);

  const gamesMap = useMemo(() => {
    const map = new Map<string, (typeof mockGames)[number]>();
    mockGames.forEach((g) => map.set(g.id, g));
    return map;
  }, []);

  if (alerts.length === 0) {
    return (
      <>
        <EmptyState
          icon={<Bell />}
          title="No Price Alerts Yet"
          description="Create your first alert and we'll notify you when a game drops to your target price."
          action={
            <GamingButton onClick={() => setModalOpen(true)}>
              <Plus className="size-4" />
              Create Your First Alert
            </GamingButton>
          }
        />
        <CreateAlertModal open={modalOpen} onOpenChange={setModalOpen} />
      </>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as FilterTab)}
        >
          <TabsList className="bg-gaming-surface-elevated">
            <TabsTrigger value="all">
              All ({alerts.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({alerts.filter((a) => a.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="triggered">
              Triggered ({alerts.filter((a) => a.status === "triggered").length})
            </TabsTrigger>
            <TabsTrigger value="paused">
              Paused ({alerts.filter((a) => a.status === "paused").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <GamingButton size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="size-4" />
          New Alert
        </GamingButton>
      </div>

      {/* Alert cards */}
      {filteredAlerts.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No {filter} alerts found.
        </p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredAlerts.map((alert) => (
              <motion.div key={alert.id} variants={staggerItem}>
                <AlertCard
                  alert={alert}
                  game={gamesMap.get(alert.gameId)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <CreateAlertModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
