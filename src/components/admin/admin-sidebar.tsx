"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gamepad2,
  Store,
  Tag,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";

const navItems = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
    accent: "from-gaming-orange/20 to-gaming-coral/20",
    glow: "shadow-gaming-orange/10",
    dot: "bg-gaming-orange",
  },
  {
    href: "/admin/games",
    label: "Games",
    icon: Gamepad2,
    accent: "from-gaming-purple/20 to-gaming-blue/20",
    glow: "shadow-gaming-purple/10",
    dot: "bg-gaming-purple",
  },
  {
    href: "/admin/stores",
    label: "Stores",
    icon: Store,
    accent: "from-gaming-blue/20 to-gaming-teal/20",
    glow: "shadow-gaming-blue/10",
    dot: "bg-gaming-blue",
  },
  {
    href: "/admin/deals",
    label: "Deals",
    icon: Tag,
    accent: "from-gaming-gold/20 to-gaming-orange/20",
    glow: "shadow-gaming-gold/10",
    dot: "bg-gaming-gold",
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
    accent: "from-gaming-teal/20 to-gaming-blue/20",
    glow: "shadow-gaming-teal/10",
    dot: "bg-gaming-teal",
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
    accent: "from-gaming-coral/20 to-gaming-pink/20",
    glow: "shadow-gaming-coral/10",
    dot: "bg-gaming-coral",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
    accent: "from-white/[0.06] to-white/[0.03]",
    glow: "shadow-white/5",
    dot: "bg-white/40",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 h-screen flex flex-col overflow-hidden"
    >
      {/* ── Multi-layer glass background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#08080f]/95 backdrop-blur-2xl" />
        {/* Subtle vertical gradient for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,166,35,0.02) 0%, transparent 30%, transparent 70%, rgba(245,166,35,0.01) 100%)",
          }}
        />
        {/* Right edge glow line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gaming-orange/15 to-transparent" />
      </div>

      <div className="relative flex flex-col h-full z-10">
        {/* ── Logo area ── */}
        <div className="flex items-center h-[72px] border-b border-white/[0.04] px-4">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <Logo />
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex justify-center"
              >
                <div className="size-8 rounded-lg bg-gradient-to-br from-gaming-orange/20 to-gaming-coral/10 border border-gaming-orange/20 flex items-center justify-center">
                  <Zap className="size-4 text-gaming-orange" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setCollapsed(!collapsed)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "size-7 flex items-center justify-center rounded-lg",
              "bg-white/[0.04] border border-white/[0.06]",
              "hover:bg-white/[0.08] hover:border-white/[0.10]",
              "text-white/25 hover:text-white/60",
              "transition-colors duration-200",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="size-3.5" />
            ) : (
              <ChevronLeft className="size-3.5" />
            )}
          </motion.button>
        </div>

        {/* ── Admin Panel badge ── */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pt-5 pb-3 flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-gaming-orange animate-pulse" />
                <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-gaming-orange/60">
                  Command Center
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Navigation ── */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto py-2",
            collapsed ? "px-2" : "px-3",
            "space-y-1",
          )}
        >
          {navItems.map((item, index) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center rounded-xl overflow-hidden",
                    "transition-all duration-300 ease-out",
                    collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5",
                    isActive
                      ? cn("shadow-lg", item.glow)
                      : "hover:bg-white/[0.03]",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {/* Active gradient background */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-bg"
                      className={cn(
                        "absolute inset-0 rounded-xl bg-gradient-to-r",
                        item.accent,
                        "border border-white/[0.08]",
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Active side accent */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-bar"
                      className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2",
                        "w-[3px] h-5 rounded-r-full",
                        item.dot,
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Icon container */}
                  <div
                    className={cn(
                      "relative z-10 size-8 rounded-lg flex items-center justify-center shrink-0",
                      "transition-all duration-300",
                      isActive
                        ? "bg-white/[0.08] border border-white/[0.10]"
                        : "bg-transparent group-hover:bg-white/[0.04]",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-[16px] transition-all duration-300",
                        isActive
                          ? "text-white/90"
                          : "text-white/25 group-hover:text-white/50",
                      )}
                    />
                    {/* Glow effect on active icon */}
                    {isActive && (
                      <div
                        className={cn(
                          "absolute inset-0 rounded-lg blur-md opacity-30",
                          `bg-gradient-to-br ${item.accent}`,
                        )}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "relative z-10 text-[13px] font-heading font-medium whitespace-nowrap overflow-hidden",
                          isActive
                            ? "text-white/90"
                            : "text-white/35 group-hover:text-white/70",
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active dot indicator for collapsed state */}
                  {isActive && collapsed && (
                    <div
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full",
                        item.dot,
                      )}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* ── System status indicator ── */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mx-3 mb-3 p-3 rounded-xl bg-gaming-teal/[0.04] border border-gaming-teal/[0.08]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="size-1.5 rounded-full bg-gaming-teal animate-pulse" />
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-gaming-teal/70">
                    System Status
                  </span>
                </div>
                <p className="text-[11px] font-heading text-white/30">
                  All scrapers operational
                </p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full bg-gaming-teal/30"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ── */}
        <div
          className={cn(
            "border-t border-white/[0.04]",
            collapsed ? "p-2" : "p-4",
          )}
        >
          <Link
            href="/"
            className={cn(
              "group flex items-center gap-2 text-[11px] font-heading text-white/20 hover:text-white/50 transition-all duration-200",
              collapsed && "justify-center",
            )}
            title={collapsed ? "Back to site" : undefined}
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Back to site
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}
