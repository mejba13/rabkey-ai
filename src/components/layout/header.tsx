"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Search, Menu, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { useUIStore } from "@/stores/ui-store";
import { useAuthStore } from "@/stores/auth-store";
import { NotificationDropdown } from "@/components/notifications";
import { GamingButton } from "@/components/gaming";
import { Logo } from "./logo";
import { PageContainer } from "./page-container";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const pathname = usePathname();
  const toggleMobileNav = useUIStore((s) => s.toggleMobileNav);
  const { user, isAuthenticated, logout } = useAuthStore();

  function handleLogout() {
    logout();
    toast.success("Signed out", { description: "See you next time!" });
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-gaming-surface-deep/80 backdrop-blur-xl border-b border-border">
      <PageContainer>
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Logo size="md" />

          {/* Center: Desktop navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-2 text-sm font-medium transition-colors"
                >
                  <span
                    className={
                      isActive
                        ? "text-gaming-orange"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gaming-orange rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="size-4" />
            </Button>

            <NotificationDropdown />

            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gaming-surface transition-colors"
                >
                  <Image
                    src={user.avatar || `https://placehold.co/32x32/1A1A2E/F5A623?text=${user.name.charAt(0)}`}
                    alt={user.name}
                    width={28}
                    height={28}
                    className="size-7 rounded-full"
                  />
                  <span className="text-sm font-heading font-medium max-w-[100px] truncate">
                    {user.name}
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={handleLogout}
                  aria-label="Sign out"
                >
                  <LogOut className="size-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <GamingButton variant="primary" size="sm">
                    Sign Up
                  </GamingButton>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileNav}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </PageContainer>

      <MobileNav />
    </header>
  );
}
