"use client";
import { AlertTriangle } from "lucide-react";
import { GamingButton } from "@/components/gaming";
import { PageContainer } from "@/components/layout/page-container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageContainer className="py-20">
      <div className="flex flex-col items-center justify-center gap-6 text-center min-h-[50vh]">
        <AlertTriangle className="size-16 text-gaming-coral" />
        <h1 className="text-3xl font-heading font-bold">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md">{error.message || "An unexpected error occurred. Please try again."}</p>
        <div className="flex gap-3">
          <GamingButton onClick={reset} variant="primary">Try Again</GamingButton>
          <GamingButton onClick={() => window.location.href = "/"} variant="outline">Go Home</GamingButton>
        </div>
      </div>
    </PageContainer>
  );
}
