"use client";

import { useState } from "react";
import { Settings, Zap, Shield, Globe, Bell, Database } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GamingButton } from "@/components/gaming";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { scraperStatuses } from "@/lib/mock-data/admin";

export default function AdminSettingsPage() {
  const [scraperInterval, setScraperInterval] = useState("60");
  const [alertBatchSize, setAlertBatchSize] = useState("500");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoModeration, setAutoModeration] = useState(true);

  function handleSave() {
    toast.success("Settings saved", {
      description: "Admin settings have been updated.",
    });
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
          <Settings className="size-6 text-gaming-orange" />
          Admin Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure platform behavior and monitoring
        </p>
      </div>

      {/* Scraper Config */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="size-5 text-gaming-gold" />
          <h2 className="font-heading font-semibold">Scraper Configuration</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="scraper-interval">Scrape Interval (minutes)</Label>
            <Input
              id="scraper-interval"
              type="number"
              value={scraperInterval}
              onChange={(e) => setScraperInterval(e.target.value)}
              className="bg-gaming-surface border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alert-batch">Alert Batch Size</Label>
            <Input
              id="alert-batch"
              type="number"
              value={alertBatchSize}
              onChange={(e) => setAlertBatchSize(e.target.value)}
              className="bg-gaming-surface border-border"
            />
          </div>
        </div>

        {/* Scraper health */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Scraper Health Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scraperStatuses.map((s) => (
              <div
                key={s.storeId}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gaming-surface-elevated"
              >
                <span className="text-sm">{s.storeName}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {s.avgResponseTime > 0 ? `${s.avgResponseTime}ms` : "—"}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-1.5 font-heading",
                      s.status === "healthy" && "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30",
                      s.status === "warning" && "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
                      s.status === "error" && "bg-gaming-pink/15 text-gaming-pink border-gaming-pink/30"
                    )}
                  >
                    {s.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="size-5 text-gaming-teal" />
          <h2 className="font-heading font-semibold">Security & Moderation</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={autoModeration}
              onCheckedChange={(checked) =>
                setAutoModeration(checked === true)
              }
            />
            <div>
              <p className="text-sm font-medium">Auto-moderation</p>
              <p className="text-xs text-muted-foreground">
                Automatically flag suspicious store activity and review anomalies
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={maintenanceMode}
              onCheckedChange={(checked) =>
                setMaintenanceMode(checked === true)
              }
            />
            <div>
              <p className="text-sm font-medium">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">
                Show maintenance page to all non-admin users
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Notification settings */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-gaming-orange" />
          <h2 className="font-heading font-semibold">
            Notification Thresholds
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Min Deal Score for Notification</Label>
            <Input
              type="number"
              defaultValue="75"
              className="bg-gaming-surface border-border"
            />
          </div>
          <div className="space-y-2">
            <Label>Max Alerts per User (Free Tier)</Label>
            <Input
              type="number"
              defaultValue="3"
              className="bg-gaming-surface border-border"
            />
          </div>
        </div>
      </div>

      {/* Platform info */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Database className="size-5 text-gaming-purple" />
          <h2 className="font-heading font-semibold">Platform Info</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "API Version", value: "v2.4.1" },
            { label: "DB Version", value: "PostgreSQL 16" },
            { label: "Cache", value: "Redis 7.2" },
            { label: "Search", value: "Meilisearch 1.6" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-gaming-surface-elevated">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-sm font-heading font-semibold mt-1">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Regional settings */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="size-5 text-gaming-blue" />
          <h2 className="font-heading font-semibold">Regional Settings</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Default Region</Label>
            <Input
              defaultValue="US"
              className="bg-gaming-surface border-border"
            />
          </div>
          <div className="space-y-2">
            <Label>Default Currency</Label>
            <Input
              defaultValue="USD"
              className="bg-gaming-surface border-border"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <GamingButton variant="primary" onClick={handleSave}>
          Save Settings
        </GamingButton>
      </div>
    </div>
  );
}
