"use client";

import Image from "next/image";
import { Store, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GamingButton } from "@/components/gaming";
import { DataTable } from "@/components/admin/data-table";
import { mockStores } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Store as StoreType } from "@/lib/types";

const columns = [
  {
    key: "name",
    header: "Store",
    render: (store: StoreType) => (
      <div className="flex items-center gap-3">
        <Image
          src={store.logo}
          alt={store.name}
          width={32}
          height={32}
          className="size-8 rounded object-cover"
        />
        <div>
          <p className="font-heading font-semibold text-sm">{store.name}</p>
          <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">
            {store.url}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "trustScore",
    header: "Trust Score",
    sortable: true,
    render: (store: StoreType) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 rounded-full bg-gaming-surface-elevated overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full",
              store.trustScore >= 80 && "bg-gaming-teal",
              store.trustScore >= 60 && store.trustScore < 80 && "bg-gaming-gold",
              store.trustScore < 60 && "bg-gaming-pink"
            )}
            style={{ width: `${store.trustScore}%` }}
          />
        </div>
        <span className="text-sm font-heading font-semibold">
          {store.trustScore}
        </span>
      </div>
    ),
  },
  {
    key: "trustLevel",
    header: "Level",
    render: (store: StoreType) => (
      <Badge
        variant="outline"
        className={cn(
          "text-[10px] px-2 py-0.5 font-heading capitalize",
          store.trustLevel === "excellent" && "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30",
          store.trustLevel === "good" && "bg-gaming-blue/15 text-gaming-blue border-gaming-blue/30",
          store.trustLevel === "average" && "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
          store.trustLevel === "poor" && "bg-gaming-pink/15 text-gaming-pink border-gaming-pink/30"
        )}
      >
        {store.trustLevel}
      </Badge>
    ),
  },
  {
    key: "isOfficial",
    header: "Type",
    render: (store: StoreType) => (
      <Badge
        variant="outline"
        className={cn(
          "text-[10px] px-2",
          store.isOfficial
            ? "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30"
            : "bg-gaming-orange/15 text-gaming-orange border-gaming-orange/30"
        )}
      >
        {store.isOfficial ? "Official" : "Grey Market"}
      </Badge>
    ),
  },
  {
    key: "totalReviews",
    header: "Reviews",
    sortable: true,
    render: (store: StoreType) => (
      <span className="text-sm">{store.totalReviews.toLocaleString()}</span>
    ),
  },
  {
    key: "avgDeliveryTime",
    header: "Delivery",
    render: (store: StoreType) => (
      <span className="text-sm text-muted-foreground">
        {store.avgDeliveryTime}
      </span>
    ),
  },
  {
    key: "regionSupport",
    header: "Regions",
    render: (store: StoreType) => (
      <span className="text-sm text-muted-foreground">
        {store.regionSupport.length} regions
      </span>
    ),
  },
];

export default function AdminStoresPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Store className="size-6 text-gaming-orange" />
            Stores Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockStores.length} stores tracked
          </p>
        </div>
      </div>

      <DataTable
        data={mockStores}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search stores..."
        pageSize={10}
        actions={
          <GamingButton variant="primary" size="sm">
            <Plus className="size-4" />
            Add Store
          </GamingButton>
        }
      />
    </div>
  );
}
