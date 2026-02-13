"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { formatPrice, formatDate } from "@/lib/formatters";
import type { PriceHistory } from "@/lib/types";

type TimeRange = "30d" | "90d" | "1y" | "all";

const timeRangeLabels: Record<TimeRange, string> = {
  "30d": "30 Days",
  "90d": "90 Days",
  "1y": "1 Year",
  all: "All Time",
};

interface PriceHistoryChartProps {
  priceHistory: PriceHistory;
  className?: string;
}

function filterPointsByRange(
  points: PriceHistory["points"],
  range: TimeRange,
) {
  if (range === "all") return points;

  const now = new Date();
  const daysMap: Record<Exclude<TimeRange, "all">, number> = {
    "30d": 30,
    "90d": 90,
    "1y": 365,
  };

  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - daysMap[range]);

  return points.filter((pt) => new Date(pt.date) >= cutoff);
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-white/[0.06] bg-card/95 backdrop-blur-xl px-3 py-2 shadow-lg">
      <p className="text-[11px] text-white/40 font-heading">
        {label ? formatDate(label) : ""}
      </p>
      <p className="font-heading font-bold text-gaming-teal">
        {formatPrice(payload[0].value)}
      </p>
    </div>
  );
}

function PriceHistoryChart({ priceHistory, className }: PriceHistoryChartProps) {
  const [range, setRange] = useState<TimeRange>("all");

  const filteredPoints = useMemo(
    () => filterPointsByRange(priceHistory.points, range),
    [priceHistory.points, range],
  );

  const chartData = useMemo(
    () =>
      filteredPoints.map((pt) => ({
        date: pt.date,
        price: pt.price,
      })),
    [filteredPoints],
  );

  const [yMin, yMax] = useMemo(() => {
    if (chartData.length === 0) return [0, 100];
    const prices = chartData.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1 || 5;
    return [Math.max(0, Math.floor(min - padding)), Math.ceil(max + padding)];
  }, [chartData]);

  return (
    <div className={cn("rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-5", className)}>
      {/* Time range selector — pill-shaped toggle */}
      <div className="mb-5 inline-flex items-center rounded-full bg-white/[0.03] border border-white/[0.04] p-0.5 gap-0.5">
        {(Object.keys(timeRangeLabels) as TimeRange[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setRange(key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200",
              range === key
                ? "bg-white/[0.08] text-gaming-teal shadow-sm"
                : "text-white/35 hover:text-white/60",
            )}
          >
            {timeRangeLabels[key]}
          </button>
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00D4AA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.03)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(val: string) => {
                const d = new Date(val);
                return d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[yMin, yMax]}
              tickFormatter={(val: number) => `$${val}`}
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00D4AA"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#00D4AA",
                stroke: "rgba(0,0,0,0.4)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[280px] items-center justify-center text-white/30 text-sm font-heading">
          No data available for this time range.
        </div>
      )}
    </div>
  );
}

export { PriceHistoryChart };
export type { PriceHistoryChartProps };
