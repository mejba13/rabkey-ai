"use client";

import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-gaming-surface-deep/80 backdrop-blur-xl flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search admin..."
          className="pl-9 bg-gaming-surface border-border h-9 text-sm"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="size-9 relative">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-gaming-orange" />
        </Button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          <Image
            src="https://placehold.co/32x32/1A1A2E/F5A623?text=A"
            alt="Admin"
            width={32}
            height={32}
            className="size-8 rounded-full"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-heading font-semibold leading-tight">
              Admin
            </p>
            <p className="text-[10px] text-muted-foreground">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
