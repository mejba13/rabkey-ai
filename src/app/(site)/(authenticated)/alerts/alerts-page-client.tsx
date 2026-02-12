"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { Bell, Target, Zap } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared";
import { GlowCard } from "@/components/shared";
import { AlertsList } from "@/components/alerts";
import { useAlertsStore } from "@/stores/alerts-store";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";

export function AlertsPageClient() {
  const alerts = useAlertsStore((s) => s.alerts);

  const stats = useMemo(() => {
    const total = alerts.length;
    const active = alerts.filter((a) => a.status === "active").length;
    const triggered = alerts.filter((a) => a.status === "triggered").length;
    return { total, active, triggered };
  }, [alerts]);

  const statCards = [
    {
      label: "Total Alerts",
      value: stats.total,
      icon: Bell,
      color: "text-gaming-orange",
      bgColor: "bg-gaming-orange/10",
    },
    {
      label: "Active",
      value: stats.active,
      icon: Zap,
      color: "text-gaming-teal",
      bgColor: "bg-gaming-teal/10",
    },
    {
      label: "Triggered",
      value: stats.triggered,
      icon: Target,
      color: "text-gaming-gold",
      bgColor: "bg-gaming-gold/10",
    },
  ];

  return (
    <PageContainer className="py-20 space-y-8">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <SectionHeading
          title="Price Alerts"
          subtitle="Track game prices and get notified when they hit your target."
        />
      </motion.div>

      {/* Stats Row */}
      {alerts.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {statCards.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <GlowCard className="flex items-center gap-4 p-4">
                <div
                  className={`size-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Alerts List */}
      <AlertsList />
    </PageContainer>
  );
}
