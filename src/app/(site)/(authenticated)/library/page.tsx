import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = { title: "Game Library" };

export default function LibraryPage() {
  return (
    <PageContainer className="py-20">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold">Game Library</h1>
        <p className="text-muted-foreground mt-2">Coming soon.</p>
      </div>
    </PageContainer>
  );
}
