"use client";

import { useRouter } from "next/navigation";
import { Bell, Search, Command, LogOut } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export function AdminHeader() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  function handleLogout() {
    logout();
    toast.success("Logged out", { description: "You have been signed out." });
    router.push("/login");
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-[72px] flex items-center justify-between px-6",
        "bg-[#0c0c14]/80 backdrop-blur-2xl",
        "border-b border-white/[0.04]",
      )}
    >
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <button
          type="button"
          className={cn(
            "flex items-center gap-2.5 w-full max-w-sm",
            "h-9 pl-3.5 pr-2.5 rounded-lg",
            "bg-white/[0.03] border border-white/[0.06]",
            "text-white/25 hover:text-white/40",
            "hover:bg-white/[0.05] hover:border-white/[0.08]",
            "transition-all duration-200 cursor-pointer",
          )}
        >
          <Search className="size-3.5 shrink-0 text-white/20" />
          <span className="text-xs font-heading">Search admin...</span>
          <kbd
            className={cn(
              "ml-auto inline-flex items-center gap-0.5",
              "h-5 px-1.5 rounded",
              "bg-white/[0.04] border border-white/[0.06]",
              "text-[10px] font-heading text-white/15",
            )}
          >
            <Command className="size-2.5" />K
          </kbd>
        </button>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          type="button"
          className={cn(
            "relative size-9 flex items-center justify-center rounded-lg",
            "bg-white/[0.03] border border-white/[0.06]",
            "hover:bg-white/[0.06] hover:border-white/[0.08]",
            "text-white/30 hover:text-white/60",
            "transition-all duration-200",
          )}
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-gaming-orange ring-2 ring-[#0c0c14]" />
        </button>

        {/* Separator */}
        <div className="h-5 w-px bg-white/[0.06]" />

        {/* Admin avatar + info */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Image
              src={
                user?.avatar ||
                "https://placehold.co/32x32/1A1A2E/F5A623?text=A"
              }
              alt={user?.name || "Admin"}
              width={32}
              height={32}
              className="size-8 rounded-lg ring-1 ring-white/[0.08] object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-gaming-teal ring-2 ring-[#0c0c14]" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-heading font-semibold text-white/80 leading-tight">
              {user?.name || "Admin"}
            </p>
            <p className="text-[10px] font-heading text-white/25">
              {user?.role === "admin" ? "Super Admin" : "User"} &middot;{" "}
              {user?.tier}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-5 w-px bg-white/[0.06]" />

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "size-9 flex items-center justify-center rounded-lg",
            "bg-white/[0.03] border border-white/[0.06]",
            "hover:bg-gaming-pink/10 hover:border-gaming-pink/20",
            "text-white/30 hover:text-gaming-pink",
            "transition-all duration-200",
          )}
          aria-label="Log out"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </header>
  );
}
