"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Settings,
  Zap,
  Shield,
  Globe,
  Bell,
  Database,
  Server,
  Activity,
  AlertTriangle,
  Cpu,
  HardDrive,
  Search,
  Trash2,
  RotateCcw,
  Save,
  Lock,
  Eye,
  Gauge,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";
import { GamingButton } from "@/components/gaming";
import { cn } from "@/lib/utils";
import { scraperStatuses } from "@/lib/mock-data/admin";

/* ── Motion variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

/* ── Custom animated toggle switch ── */
function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  activeColor = "#00D4AA",
  icon: Icon,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description: string;
  activeColor?: string;
  icon?: typeof Shield;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full flex items-center gap-4 p-3.5 rounded-xl text-left",
        "transition-all duration-200",
        "hover:bg-white/[0.02]",
        checked && "bg-white/[0.015]",
      )}
    >
      {/* Icon */}
      {Icon && (
        <div
          className={cn(
            "size-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300",
            checked
              ? "border-white/[0.08]"
              : "bg-white/[0.02] border-white/[0.04]",
          )}
          style={
            checked
              ? { backgroundColor: `${activeColor}10`, borderColor: `${activeColor}25` }
              : undefined
          }
        >
          <Icon
            className="size-3.5 transition-colors duration-300"
            style={{ color: checked ? activeColor : "rgba(255,255,255,0.2)" }}
          />
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-[13px] font-heading font-medium transition-colors",
            checked ? "text-white/80" : "text-white/40",
          )}
        >
          {label}
        </p>
        <p className="text-[10px] font-heading text-white/20 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Toggle track */}
      <div
        className={cn(
          "relative w-10 h-[22px] rounded-full shrink-0 border transition-all duration-300",
          checked
            ? "border-transparent"
            : "bg-white/[0.04] border-white/[0.08]",
        )}
        style={
          checked
            ? { backgroundColor: `${activeColor}30`, borderColor: `${activeColor}40` }
            : undefined
        }
      >
        <motion.div
          animate={{ x: checked ? 18 : 2 }}
          transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
          className="absolute top-[3px] size-4 rounded-full shadow-sm"
          style={{
            backgroundColor: checked ? activeColor : "rgba(255,255,255,0.2)",
          }}
        />
      </div>
    </button>
  );
}

/* ── Styled input field ── */
function SettingsInput({
  label,
  value,
  onChange,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/25">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-10 px-3.5 rounded-xl text-[13px] font-heading",
          "bg-white/[0.03] border border-white/[0.06]",
          "text-white/80 placeholder:text-white/15",
          "focus:outline-none focus:border-gaming-blue/30 focus:bg-white/[0.04]",
          "focus:shadow-[0_0_0_3px_rgba(14,165,233,0.06)]",
          "transition-all duration-200",
        )}
      />
      {hint && (
        <p className="text-[9px] font-heading text-white/15 mt-1">{hint}</p>
      )}
    </div>
  );
}

/* ── Bento card wrapper ── */
function BentoCard({
  children,
  className,
  glowColor,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "bg-[#0d0d18]/80 backdrop-blur-xl",
        "border border-white/[0.06]",
        "hover:border-white/[0.10]",
        "transition-colors duration-300",
        className,
      )}
    >
      {glowColor && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top, ${glowColor} 0%, transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN SETTINGS PAGE
   ══════════════════════════════════════════════ */
export default function AdminSettingsPage() {
  const [scraperInterval, setScraperInterval] = useState("60");
  const [alertBatchSize, setAlertBatchSize] = useState("500");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoModeration, setAutoModeration] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [rateLimiting, setRateLimiting] = useState(true);
  const [minDealScore, setMinDealScore] = useState("75");
  const [maxAlerts, setMaxAlerts] = useState("3");
  const [defaultRegion, setDefaultRegion] = useState("US");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  const healthyCount = scraperStatuses.filter(
    (s) => s.status === "healthy",
  ).length;
  const warningCount = scraperStatuses.filter(
    (s) => s.status === "warning",
  ).length;
  const errorCount = scraperStatuses.filter(
    (s) => s.status === "error",
  ).length;
  const avgResponseTime = Math.round(
    scraperStatuses
      .filter((s) => s.avgResponseTime > 0)
      .reduce((a, s) => a + s.avgResponseTime, 0) /
      scraperStatuses.filter((s) => s.avgResponseTime > 0).length,
  );
  const totalGamesScraped = scraperStatuses.reduce(
    (a, s) => a + s.gamesScraped,
    0,
  );

  function handleSave() {
    toast.success("Settings saved", {
      description: "All configuration changes have been applied.",
    });
  }

  function handleClearCache() {
    toast.success("Cache cleared", {
      description: "Redis cache has been flushed successfully.",
    });
  }

  function handleReindex() {
    toast.success("Re-indexing started", {
      description: "Meilisearch re-index is running in the background.",
    });
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* ═══════════════════════════════════════════
          PAGE HEADER
          ═══════════════════════════════════════════ */}
      <motion.div
        variants={itemVariants}
        className="flex items-end justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] flex items-center justify-center">
              <Settings className="size-5 text-white/50" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-white/95 tracking-tight">
                System Configuration
              </h1>
              <p className="text-[13px] text-white/30 font-heading mt-0.5">
                Platform behavior, monitoring & infrastructure
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-[10px] font-heading text-white/15">
            Last saved: 2 hours ago
          </span>
          <GamingButton variant="primary" size="sm" onClick={handleSave}>
            <Save className="size-3.5" />
            Save Changes
          </GamingButton>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          ROW 1: Scraper Config (7) + Security (5)
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ── Scraper Configuration ── */}
        <BentoCard
          className="lg:col-span-7"
          glowColor="rgba(255,215,0,0.03)"
        >
          <div className="p-5">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-gaming-gold/[0.08] border border-gaming-gold/15 flex items-center justify-center">
                  <Zap className="size-4 text-gaming-gold" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-[14px] text-white/80">
                    Scraper Engine
                  </h2>
                  <p className="text-[10px] font-heading text-white/20 mt-0.5">
                    Data collection pipeline
                  </p>
                </div>
              </div>
              {/* Health summary pills */}
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gaming-teal/[0.06] border border-gaming-teal/15">
                  <div className="size-1.5 rounded-full bg-gaming-teal" />
                  <span className="text-[9px] font-heading font-bold text-gaming-teal tabular-nums">
                    {healthyCount}
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gaming-gold/[0.06] border border-gaming-gold/15">
                  <div className="size-1.5 rounded-full bg-gaming-gold" />
                  <span className="text-[9px] font-heading font-bold text-gaming-gold tabular-nums">
                    {warningCount}
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gaming-pink/[0.06] border border-gaming-pink/15">
                  <div className="size-1.5 rounded-full bg-gaming-pink" />
                  <span className="text-[9px] font-heading font-bold text-gaming-pink tabular-nums">
                    {errorCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Config inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <SettingsInput
                label="Scrape Interval (min)"
                value={scraperInterval}
                onChange={setScraperInterval}
                type="number"
                hint="How often to run the scraper pipeline"
              />
              <SettingsInput
                label="Alert Batch Size"
                value={alertBatchSize}
                onChange={setAlertBatchSize}
                type="number"
                hint="Max alerts processed per batch"
              />
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.04]">
              <div className="text-center p-2.5 rounded-xl bg-white/[0.02]">
                <div className="flex items-center justify-center mb-1">
                  <Gauge className="size-3 text-gaming-blue/50" />
                </div>
                <p className="text-[14px] font-heading font-bold text-white/70 tabular-nums">
                  {avgResponseTime}ms
                </p>
                <p className="text-[8px] font-heading text-white/15 uppercase tracking-wider mt-0.5">
                  Avg Response
                </p>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-white/[0.02]">
                <div className="flex items-center justify-center mb-1">
                  <HardDrive className="size-3 text-gaming-purple/50" />
                </div>
                <p className="text-[14px] font-heading font-bold text-white/70 tabular-nums">
                  {(totalGamesScraped / 1000).toFixed(1)}K
                </p>
                <p className="text-[8px] font-heading text-white/15 uppercase tracking-wider mt-0.5">
                  Games Scraped
                </p>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-white/[0.02]">
                <div className="flex items-center justify-center mb-1">
                  <Activity className="size-3 text-gaming-teal/50" />
                </div>
                <p className="text-[14px] font-heading font-bold text-white/70 tabular-nums">
                  99.1%
                </p>
                <p className="text-[8px] font-heading text-white/15 uppercase tracking-wider mt-0.5">
                  Uptime
                </p>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ── Security & Access Control ── */}
        <BentoCard
          className="lg:col-span-5"
          glowColor="rgba(0,212,170,0.03)"
        >
          <div className="p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-8 rounded-lg bg-gaming-teal/[0.08] border border-gaming-teal/15 flex items-center justify-center">
                <Shield className="size-4 text-gaming-teal" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-[14px] text-white/80">
                  Security & Access
                </h2>
                <p className="text-[10px] font-heading text-white/20 mt-0.5">
                  Platform safety controls
                </p>
              </div>
            </div>

            <div className="space-y-0.5">
              <ToggleSwitch
                checked={autoModeration}
                onChange={setAutoModeration}
                label="Auto-moderation"
                description="Flag suspicious store activity and review anomalies"
                activeColor="#00D4AA"
                icon={Eye}
              />
              <ToggleSwitch
                checked={maintenanceMode}
                onChange={setMaintenanceMode}
                label="Maintenance Mode"
                description="Show maintenance page to non-admin users"
                activeColor="#FF3366"
                icon={AlertTriangle}
              />
              <ToggleSwitch
                checked={twoFactor}
                onChange={setTwoFactor}
                label="Enforce 2FA"
                description="Require two-factor auth for admin accounts"
                activeColor="#7C3AED"
                icon={Lock}
              />
              <ToggleSwitch
                checked={rateLimiting}
                onChange={setRateLimiting}
                label="API Rate Limiting"
                description="Throttle API requests to prevent abuse"
                activeColor="#0EA5E9"
                icon={Wifi}
              />
            </div>
          </div>
        </BentoCard>
      </div>

      {/* ═══════════════════════════════════════════
          ROW 2: Scraper Health Grid (full width)
          ═══════════════════════════════════════════ */}
      <BentoCard>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-lg bg-gaming-teal/[0.06] border border-gaming-teal/10 flex items-center justify-center">
                <Server className="size-3.5 text-gaming-teal" />
              </div>
              <h2 className="font-heading font-semibold text-[13px] text-white/80">
                Scraper Health Monitor
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gaming-teal/[0.04] border border-gaming-teal/10">
              <div className="size-1.5 rounded-full bg-gaming-teal animate-pulse" />
              <span className="text-[9px] font-heading font-bold text-gaming-teal/70 uppercase tracking-wider">
                Live
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {scraperStatuses.map((scraper, i) => {
              const maxTime = 500;
              const barWidth =
                scraper.avgResponseTime > 0
                  ? Math.min((scraper.avgResponseTime / maxTime) * 100, 100)
                  : 0;
              const barColor =
                scraper.status === "healthy"
                  ? "#00D4AA"
                  : scraper.status === "warning"
                    ? "#FFD700"
                    : "#FF3366";

              return (
                <motion.div
                  key={scraper.storeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className={cn(
                    "relative p-3 rounded-xl overflow-hidden",
                    "bg-white/[0.015] border border-white/[0.04]",
                    "hover:bg-white/[0.025] hover:border-white/[0.06]",
                    "transition-all duration-200",
                  )}
                >
                  {/* Status dot + name */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12px] font-heading font-medium text-white/60 truncate pr-2">
                      {scraper.storeName}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div
                        className={cn(
                          "size-2 rounded-full",
                          scraper.status === "healthy" && "bg-gaming-teal",
                          scraper.status === "warning" &&
                            "bg-gaming-gold animate-pulse",
                          scraper.status === "error" &&
                            "bg-gaming-pink animate-pulse",
                        )}
                      />
                    </div>
                  </div>

                  {/* Response time bar */}
                  <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{
                        delay: 0.5 + i * 0.05,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColor }}
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-heading text-white/25 tabular-nums">
                      {scraper.avgResponseTime > 0
                        ? `${scraper.avgResponseTime}ms`
                        : "Offline"}
                    </span>
                    <span className="text-[10px] font-heading text-white/20 tabular-nums">
                      {scraper.gamesScraped > 0
                        ? `${(scraper.gamesScraped / 1000).toFixed(1)}K`
                        : "0"}
                    </span>
                  </div>

                  {/* Error overlay for error state */}
                  {scraper.status === "error" && (
                    <div className="absolute inset-0 rounded-xl border border-gaming-pink/15 pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </BentoCard>

      {/* ═══════════════════════════════════════════
          ROW 3: Notifications (4) + Platform (5) + Regional (3)
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ── Notification Thresholds ── */}
        <BentoCard
          className="lg:col-span-4"
          glowColor="rgba(245,166,35,0.03)"
        >
          <div className="p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="size-8 rounded-lg bg-gaming-orange/[0.08] border border-gaming-orange/15 flex items-center justify-center">
                <Bell className="size-4 text-gaming-orange" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-[14px] text-white/80">
                  Notifications
                </h2>
                <p className="text-[10px] font-heading text-white/20 mt-0.5">
                  Alert thresholds
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <SettingsInput
                label="Min Deal Score"
                value={minDealScore}
                onChange={setMinDealScore}
                type="number"
                hint="Minimum score to trigger notifications"
              />

              {/* Visual indicator for score threshold */}
              <div className="relative h-2 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Number(minDealScore)}%` }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gaming-pink via-gaming-gold to-gaming-teal"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white border-2 border-gaming-orange shadow-lg"
                  style={{ left: `calc(${Number(minDealScore)}% - 6px)` }}
                />
              </div>

              <SettingsInput
                label="Max Alerts (Free Tier)"
                value={maxAlerts}
                onChange={setMaxAlerts}
                type="number"
                hint="Alert cap for non-paying users"
              />
            </div>
          </div>
        </BentoCard>

        {/* ── Platform Stack ── */}
        <BentoCard
          className="lg:col-span-5"
          glowColor="rgba(124,58,237,0.03)"
        >
          <div className="p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="size-8 rounded-lg bg-gaming-purple/[0.08] border border-gaming-purple/15 flex items-center justify-center">
                <Database className="size-4 text-gaming-purple" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-[14px] text-white/80">
                  Platform Stack
                </h2>
                <p className="text-[10px] font-heading text-white/20 mt-0.5">
                  Infrastructure versions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                {
                  icon: Cpu,
                  label: "API",
                  value: "v2.4.1",
                  color: "#0EA5E9",
                  status: "stable",
                },
                {
                  icon: HardDrive,
                  label: "PostgreSQL",
                  value: "v16.2",
                  color: "#7C3AED",
                  status: "stable",
                },
                {
                  icon: Zap,
                  label: "Redis",
                  value: "v7.2",
                  color: "#FF6B35",
                  status: "stable",
                },
                {
                  icon: Search,
                  label: "Meilisearch",
                  value: "v1.6",
                  color: "#FFD700",
                  status: "stable",
                },
                {
                  icon: Server,
                  label: "Next.js",
                  value: "v15.2",
                  color: "#FFFFFF",
                  status: "latest",
                },
                {
                  icon: Activity,
                  label: "Kafka",
                  value: "v3.7",
                  color: "#00D4AA",
                  status: "stable",
                },
              ].map((tech) => (
                <div
                  key={tech.label}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.025] transition-colors"
                >
                  <div
                    className="size-7 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${tech.color}08`,
                      borderColor: `${tech.color}15`,
                    }}
                  >
                    <tech.icon
                      className="size-3"
                      style={{ color: `${tech.color}90` }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-heading font-semibold text-white/60 truncate">
                      {tech.label}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-heading font-mono text-white/35">
                        {tech.value}
                      </span>
                      <span
                        className={cn(
                          "text-[7px] font-heading font-bold uppercase tracking-wider px-1 py-0.5 rounded",
                          tech.status === "latest"
                            ? "bg-gaming-teal/10 text-gaming-teal"
                            : "bg-white/[0.04] text-white/20",
                        )}
                      >
                        {tech.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* ── Regional Settings ── */}
        <BentoCard
          className="lg:col-span-3"
          glowColor="rgba(14,165,233,0.03)"
        >
          <div className="p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="size-8 rounded-lg bg-gaming-blue/[0.08] border border-gaming-blue/15 flex items-center justify-center">
                <Globe className="size-4 text-gaming-blue" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-[14px] text-white/80">
                  Regional
                </h2>
                <p className="text-[10px] font-heading text-white/20 mt-0.5">
                  Locale defaults
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <SettingsInput
                label="Default Region"
                value={defaultRegion}
                onChange={setDefaultRegion}
              />
              <SettingsInput
                label="Default Currency"
                value={defaultCurrency}
                onChange={setDefaultCurrency}
              />
            </div>

            {/* Active regions indicator */}
            <div className="mt-5 pt-4 border-t border-white/[0.04]">
              <p className="text-[9px] font-heading font-bold uppercase tracking-[0.15em] text-white/15 mb-2">
                Active Regions
              </p>
              <div className="flex flex-wrap gap-1">
                {["US", "EU", "UK", "AU", "CA", "JP", "KR", "BR"].map(
                  (region) => (
                    <span
                      key={region}
                      className={cn(
                        "h-5 px-1.5 rounded-md text-[9px] font-heading font-bold inline-flex items-center",
                        region === defaultRegion
                          ? "bg-gaming-blue/[0.1] text-gaming-blue border border-gaming-blue/20"
                          : "bg-white/[0.03] text-white/20 border border-white/[0.04]",
                      )}
                    >
                      {region}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </BentoCard>
      </div>

      {/* ═══════════════════════════════════════════
          ROW 4: Danger Zone
          ═══════════════════════════════════════════ */}
      <BentoCard>
        <div className="p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="size-7 rounded-lg bg-gaming-pink/[0.06] border border-gaming-pink/10 flex items-center justify-center">
              <AlertTriangle className="size-3.5 text-gaming-pink" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[13px] text-white/80">
                Maintenance Actions
              </h2>
              <p className="text-[10px] font-heading text-white/20 mt-0.5">
                System maintenance and recovery operations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Clear Cache */}
            <button
              onClick={handleClearCache}
              className={cn(
                "group/btn flex items-center gap-3 p-4 rounded-xl text-left",
                "bg-white/[0.015] border border-white/[0.04]",
                "hover:bg-gaming-pink/[0.03] hover:border-gaming-pink/15",
                "transition-all duration-200",
              )}
            >
              <div className="size-9 rounded-lg bg-gaming-coral/[0.06] border border-gaming-coral/10 flex items-center justify-center shrink-0 group-hover/btn:bg-gaming-coral/[0.10] transition-colors">
                <Trash2 className="size-4 text-gaming-coral/60 group-hover/btn:text-gaming-coral transition-colors" />
              </div>
              <div>
                <p className="text-[12px] font-heading font-semibold text-white/60 group-hover/btn:text-white/80 transition-colors">
                  Clear Cache
                </p>
                <p className="text-[9px] font-heading text-white/15 mt-0.5">
                  Flush Redis & CDN cache
                </p>
              </div>
            </button>

            {/* Re-index Search */}
            <button
              onClick={handleReindex}
              className={cn(
                "group/btn flex items-center gap-3 p-4 rounded-xl text-left",
                "bg-white/[0.015] border border-white/[0.04]",
                "hover:bg-gaming-gold/[0.03] hover:border-gaming-gold/15",
                "transition-all duration-200",
              )}
            >
              <div className="size-9 rounded-lg bg-gaming-gold/[0.06] border border-gaming-gold/10 flex items-center justify-center shrink-0 group-hover/btn:bg-gaming-gold/[0.10] transition-colors">
                <RotateCcw className="size-4 text-gaming-gold/60 group-hover/btn:text-gaming-gold transition-colors" />
              </div>
              <div>
                <p className="text-[12px] font-heading font-semibold text-white/60 group-hover/btn:text-white/80 transition-colors">
                  Re-index Search
                </p>
                <p className="text-[9px] font-heading text-white/15 mt-0.5">
                  Rebuild Meilisearch index
                </p>
              </div>
            </button>

            {/* Force Scrape */}
            <button
              onClick={() =>
                toast.success("Scrape initiated", {
                  description: "Running full scrape across all stores.",
                })
              }
              className={cn(
                "group/btn flex items-center gap-3 p-4 rounded-xl text-left",
                "bg-white/[0.015] border border-white/[0.04]",
                "hover:bg-gaming-blue/[0.03] hover:border-gaming-blue/15",
                "transition-all duration-200",
              )}
            >
              <div className="size-9 rounded-lg bg-gaming-blue/[0.06] border border-gaming-blue/10 flex items-center justify-center shrink-0 group-hover/btn:bg-gaming-blue/[0.10] transition-colors">
                <Zap className="size-4 text-gaming-blue/60 group-hover/btn:text-gaming-blue transition-colors" />
              </div>
              <div>
                <p className="text-[12px] font-heading font-semibold text-white/60 group-hover/btn:text-white/80 transition-colors">
                  Force Scrape
                </p>
                <p className="text-[9px] font-heading text-white/15 mt-0.5">
                  Run full pipeline now
                </p>
              </div>
            </button>
          </div>
        </div>
      </BentoCard>

      {/* ── Mobile Save Button ── */}
      <motion.div variants={itemVariants} className="lg:hidden pt-2">
        <GamingButton
          variant="primary"
          size="lg"
          onClick={handleSave}
          className="w-full"
        >
          <Save className="size-4" />
          Save All Changes
        </GamingButton>
      </motion.div>
    </motion.div>
  );
}
