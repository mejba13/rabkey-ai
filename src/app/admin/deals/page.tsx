"use client";

import Image from "next/image";
import { Tag, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GamingButton } from "@/components/gaming";
import { DataTable } from "@/components/admin/data-table";
import { formatPrice } from "@/lib/formatters";
import { mockDeals } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Deal } from "@/lib/types";

const tagColorMap: Record<string, string> = {
  "Flash Sale": "bg-gaming-coral/15 text-gaming-coral border-gaming-coral/30",
  "Historical Low": "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30",
  "Bundle Deal": "bg-gaming-purple/15 text-gaming-purple border-gaming-purple/30",
  "New Release": "bg-gaming-blue/15 text-gaming-blue border-gaming-blue/30",
  "Editor's Pick": "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
  Trending: "bg-gaming-orange/15 text-gaming-orange border-gaming-orange/30",
  "Limited Time": "bg-gaming-pink/15 text-gaming-pink border-gaming-pink/30",
};

const columns = [
  {
    key: "title",
    header: "Deal",
    render: (deal: Deal) => (
      <div className="flex items-center gap-3">
        <Image
          src={deal.coverImage}
          alt={deal.title}
          width={40}
          height={40}
          className="size-10 rounded-lg object-cover"
        />
        <div>
          <p className="font-heading font-semibold text-sm truncate max-w-[200px]">
            {deal.title}
          </p>
          <p className="text-[10px] text-muted-foreground capitalize">
            {deal.platform}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "currentPrice",
    header: "Price",
    sortable: true,
    render: (deal: Deal) => (
      <div>
        <span className="font-heading font-semibold text-gaming-teal">
          {formatPrice(deal.currentPrice)}
        </span>
        <span className="text-xs text-muted-foreground line-through ml-2">
          {formatPrice(deal.originalPrice)}
        </span>
      </div>
    ),
  },
  {
    key: "discount",
    header: "Discount",
    sortable: true,
    render: (deal: Deal) => (
      <span className="font-heading font-bold text-gaming-coral">
        -{deal.discount}%
      </span>
    ),
  },
  {
    key: "dealScore",
    header: "Score",
    sortable: true,
    render: (deal: Deal) => (
      <Badge
        variant="outline"
        className={cn(
          "font-heading text-[10px] px-2",
          deal.dealScore >= 90 && "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
          deal.dealScore >= 75 && deal.dealScore < 90 && "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30",
          deal.dealScore < 75 && "bg-gaming-orange/15 text-gaming-orange border-gaming-orange/30"
        )}
      >
        {deal.dealScore}
      </Badge>
    ),
  },
  {
    key: "recommendation",
    header: "Recommendation",
    render: (deal: Deal) => (
      <Badge
        variant="outline"
        className={cn(
          "text-[10px] px-2 capitalize font-heading",
          deal.recommendation === "strong-buy" && "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30",
          deal.recommendation === "buy" && "bg-gaming-blue/15 text-gaming-blue border-gaming-blue/30",
          deal.recommendation === "wait" && "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
          deal.recommendation === "avoid" && "bg-gaming-pink/15 text-gaming-pink border-gaming-pink/30"
        )}
      >
        {deal.recommendation.replace("-", " ")}
      </Badge>
    ),
  },
  {
    key: "tags",
    header: "Tags",
    render: (deal: Deal) => (
      <div className="flex gap-1 flex-wrap max-w-[200px]">
        {deal.tags.slice(0, 2).map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className={cn("text-[10px] px-1.5 py-0", tagColorMap[tag])}
          >
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
];

export default function AdminDealsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Tag className="size-6 text-gaming-orange" />
            Deals Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockDeals.length} active deals
          </p>
        </div>
      </div>

      <DataTable
        data={mockDeals}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search deals..."
        pageSize={10}
        actions={
          <GamingButton variant="primary" size="sm">
            <Plus className="size-4" />
            Create Deal
          </GamingButton>
        }
      />
    </div>
  );
}
