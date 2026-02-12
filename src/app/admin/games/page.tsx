"use client";

import Image from "next/image";
import { Gamepad2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GamingButton } from "@/components/gaming";
import { DataTable } from "@/components/admin/data-table";
import { formatPrice } from "@/lib/formatters";
import { mockGames } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Game } from "@/lib/types";

const columns = [
  {
    key: "coverImage",
    header: "Game",
    render: (game: Game) => (
      <div className="flex items-center gap-3">
        <Image
          src={game.coverImage}
          alt={game.title}
          width={40}
          height={40}
          className="size-10 rounded-lg object-cover"
        />
        <div>
          <p className="font-heading font-semibold text-sm">{game.title}</p>
          <p className="text-[10px] text-muted-foreground">
            {game.metadata.developer}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "bestPrice",
    header: "Best Price",
    sortable: true,
    render: (game: Game) => (
      <span className="font-heading font-semibold text-gaming-teal">
        {formatPrice(game.bestPrice)}
      </span>
    ),
  },
  {
    key: "originalPrice",
    header: "Original",
    sortable: true,
    render: (game: Game) => (
      <span className="text-muted-foreground">
        {formatPrice(game.originalPrice)}
      </span>
    ),
  },
  {
    key: "discount",
    header: "Discount",
    sortable: true,
    render: (game: Game) => (
      <span
        className={cn(
          "font-heading font-semibold",
          game.discount > 0 ? "text-gaming-coral" : "text-muted-foreground"
        )}
      >
        {game.discount > 0 ? `-${game.discount}%` : "—"}
      </span>
    ),
  },
  {
    key: "dealScore",
    header: "Deal Score",
    sortable: true,
    render: (game: Game) => (
      <Badge
        variant="outline"
        className={cn(
          "font-heading text-[10px] px-2",
          game.dealScore >= 90 && "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
          game.dealScore >= 75 && game.dealScore < 90 && "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30",
          game.dealScore >= 50 && game.dealScore < 75 && "bg-gaming-orange/15 text-gaming-orange border-gaming-orange/30",
          game.dealScore < 50 && "bg-muted text-muted-foreground border-border"
        )}
      >
        {game.dealScore}
      </Badge>
    ),
  },
  {
    key: "platforms",
    header: "Platforms",
    render: (game: Game) => (
      <div className="flex gap-1">
        {game.metadata.platforms.map((p) => (
          <Badge key={p} variant="outline" className="text-[10px] px-1.5 py-0 capitalize">
            {p}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    key: "isOnSale",
    header: "Status",
    render: (game: Game) => (
      <Badge
        variant="outline"
        className={cn(
          "text-[10px] px-2",
          game.isOnSale
            ? "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30"
            : "bg-muted text-muted-foreground border-border"
        )}
      >
        {game.isOnSale ? "On Sale" : "Full Price"}
      </Badge>
    ),
  },
];

export default function AdminGamesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Gamepad2 className="size-6 text-gaming-orange" />
            Games Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockGames.length} games in catalog
          </p>
        </div>
      </div>

      <DataTable
        data={mockGames}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search games..."
        pageSize={10}
        actions={
          <GamingButton variant="primary" size="sm">
            <Plus className="size-4" />
            Add Game
          </GamingButton>
        }
      />
    </div>
  );
}
