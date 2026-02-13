"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Search, Menu, LogOut, Command } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { useUIStore } from "@/stores/ui-store";
import { useAuthStore } from "@/stores/auth-store";
import { NotificationDropdown } from "@/components/notifications";
import { GamingButton } from "@/components/gaming";
import { SearchCommand } from "@/components/search";
import { Logo } from "./logo";
import { PageContainer } from "./page-container";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const toggleMobileNav = useUIStore((s) => s.toggleMobileNav);
  const { user, isAuthenticated, logout } = useAuthStore();
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openSearch = useCallback(() => setSearchOpen(true), []);

  function handleLogout() {
    logout();
    toast.success("Signed out", { description: "See you next time!" });
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 z-50 w-full"
      >
        {/* ── Multi-layer glass background ── */}
        <div className="absolute inset-0">
          {/* Base glass */}
          <div
            className="absolute inset-0 backdrop-blur-2xl"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.13 0.01 270 / 85%) 0%, oklch(0.10 0.005 270 / 80%) 100%)",
            }}
          />
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* ── Luminous bottom border — orange glow strip ── */}
        <div className="absolute inset-x-0 bottom-0 h-px">
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(to right, transparent 5%, oklch(0.784 0.159 72.989 / 20%) 25%, oklch(0.784 0.159 72.989 / 35%) 50%, oklch(0.784 0.159 72.989 / 20%) 75%, transparent 95%)",
            }}
          />
        </div>
        {/* Soft glow beneath the border */}
        <div className="absolute inset-x-0 -bottom-px h-[2px]">
          <div
            className="h-full w-full blur-[1px]"
            style={{
              background:
                "linear-gradient(to right, transparent 15%, oklch(0.784 0.159 72.989 / 12%) 40%, oklch(0.784 0.159 72.989 / 18%) 50%, oklch(0.784 0.159 72.989 / 12%) 60%, transparent 85%)",
            }}
          />
        </div>

        <PageContainer className="relative">
          <div className="flex items-center justify-between h-[72px]">
            {/* ── Left: Logo ── */}
            <Logo size="lg" />

            {/* ── Center: Desktop navigation ── */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center gap-1 bg-white/[0.03] rounded-full px-2 py-1 border border-white/[0.04]"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200",
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white/90"
                    )}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.06]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: Actions ── */}
            <div className="flex items-center gap-2">
              {/* Search pill with keyboard shortcut */}
              <button
                type="button"
                onClick={openSearch}
                className={cn(
                  "hidden md:inline-flex items-center gap-2.5",
                  "h-9 pl-3.5 pr-2.5 rounded-full",
                  "bg-white/[0.04] border border-white/[0.06]",
                  "text-white/40 hover:text-white/70",
                  "hover:bg-white/[0.06] hover:border-white/[0.08]",
                  "transition-all duration-200 cursor-pointer"
                )}
                aria-label="Search"
              >
                <Search className="size-4" />
                <span className="text-xs font-heading font-medium">Search</span>
                <kbd
                  className={cn(
                    "inline-flex items-center gap-0.5",
                    "h-5 px-1.5 rounded",
                    "bg-white/[0.05] border border-white/[0.06]",
                    "text-[10px] font-heading text-muted-foreground/30"
                  )}
                >
                  <Command className="size-2.5" />K
                </kbd>
              </button>

              {/* Mobile search icon */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={openSearch}
                className="md:hidden text-muted-foreground/60 hover:text-foreground size-9"
              >
                <Search className="size-4" />
              </Button>

              <NotificationDropdown />

              {/* Separator */}
              <div className="hidden md:block h-5 w-px bg-white/[0.08] mx-1.5" />

              {isAuthenticated && user ? (
                <div className="hidden md:flex items-center gap-1.5">
                  <Link
                    href="/dashboard"
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-1.5 rounded-full",
                      "bg-white/[0.03] border border-white/[0.05]",
                      "hover:bg-white/[0.06] hover:border-white/[0.08]",
                      "transition-all duration-200"
                    )}
                  >
                    <Image
                      src={
                        user.avatar ||
                        `https://placehold.co/32x32/1A1A2E/F5A623?text=${user.name.charAt(0)}`
                      }
                      alt={user.name}
                      width={24}
                      height={24}
                      className="size-6 rounded-full ring-1 ring-white/10"
                    />
                    <span className="text-[13px] font-heading font-medium max-w-[100px] truncate text-foreground/85">
                      {user.name}
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full text-muted-foreground/40 hover:text-foreground/80 hover:bg-white/[0.05]"
                    onClick={handleLogout}
                    aria-label="Sign out"
                  >
                    <LogOut className="size-3.5" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2.5">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-sm font-heading font-semibold text-white/50 hover:text-white/90 hover:bg-white/[0.04] rounded-full px-4 h-9"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <div className="relative group">
                      {/* CTA glow */}
                      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-gaming-orange/20 to-gaming-coral/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <GamingButton variant="primary" size="sm" className="relative">
                        Sign Up
                      </GamingButton>
                    </div>
                  </Link>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground/60 hover:text-foreground size-9"
                onClick={toggleMobileNav}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </div>
        </PageContainer>

        <MobileNav />
      </motion.header>

      {/* Search Command Palette */}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
