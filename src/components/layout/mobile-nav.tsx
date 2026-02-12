"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { useUIStore } from "@/stores/ui-store";
import { Logo } from "./logo";

export function MobileNav() {
  const pathname = usePathname();
  const mobileNavOpen = useUIStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen);

  return (
    <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <SheetContent
        side="left"
        className="bg-gaming-surface border-border"
      >
        <SheetHeader>
          <SheetTitle asChild>
            <Logo size="lg" />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4 mt-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`
                  flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "text-gaming-orange border-l-2 border-gaming-orange bg-gaming-orange/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-gaming-surface-elevated/50"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4">
          <Button
            variant="default"
            className="w-full"
            onClick={() => setMobileNavOpen(false)}
          >
            Sign In
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
