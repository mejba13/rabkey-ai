"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const state = useAuthStore.getState();
      if (!state.isAuthenticated) {
        router.replace("/login");
      } else {
        setReady(true);
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [router, isAuthenticated]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-2 border-gaming-orange/30 border-t-gaming-orange rounded-full animate-spin" />
          <p className="text-sm font-heading text-white/30">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
