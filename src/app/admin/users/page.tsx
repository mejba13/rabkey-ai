"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { formatDate } from "@/lib/formatters";
import { mockUsers } from "@/lib/mock-data/admin";
import type { MockUser } from "@/lib/mock-data/admin";
import { cn } from "@/lib/utils";

const tierColors: Record<string, string> = {
  free: "bg-muted text-muted-foreground border-border",
  pro: "bg-gaming-purple/15 text-gaming-purple border-gaming-purple/30",
  ultimate: "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
};

const statusColors: Record<string, string> = {
  active: "bg-gaming-teal/15 text-gaming-teal border-gaming-teal/30",
  inactive: "bg-gaming-gold/15 text-gaming-gold border-gaming-gold/30",
  banned: "bg-gaming-pink/15 text-gaming-pink border-gaming-pink/30",
};

const columns = [
  {
    key: "name",
    header: "User",
    render: (user: MockUser) => (
      <div className="flex items-center gap-3">
        <Image
          src={user.avatar}
          alt={user.name}
          width={32}
          height={32}
          className="size-8 rounded-full"
        />
        <div>
          <p className="font-heading font-semibold text-sm">{user.name}</p>
          <p className="text-[10px] text-muted-foreground">{user.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "tier",
    header: "Tier",
    sortable: true,
    render: (user: MockUser) => (
      <Badge
        variant="outline"
        className={cn("text-[10px] px-2 capitalize font-heading", tierColors[user.tier])}
      >
        {user.tier}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (user: MockUser) => (
      <Badge
        variant="outline"
        className={cn("text-[10px] px-2 capitalize font-heading", statusColors[user.status])}
      >
        {user.status}
      </Badge>
    ),
  },
  {
    key: "alertCount",
    header: "Alerts",
    sortable: true,
    render: (user: MockUser) => <span className="text-sm">{user.alertCount}</span>,
  },
  {
    key: "wishlistCount",
    header: "Wishlist",
    sortable: true,
    render: (user: MockUser) => <span className="text-sm">{user.wishlistCount}</span>,
  },
  {
    key: "joinedAt",
    header: "Joined",
    sortable: true,
    render: (user: MockUser) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(user.joinedAt)}
      </span>
    ),
  },
  {
    key: "lastActiveAt",
    header: "Last Active",
    sortable: true,
    render: (user: MockUser) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(user.lastActiveAt)}
      </span>
    ),
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Users className="size-6 text-gaming-orange" />
            Users Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockUsers.length} users
          </p>
        </div>
      </div>

      <DataTable
        data={mockUsers}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search users..."
        pageSize={10}
      />
    </div>
  );
}
