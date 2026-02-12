import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = { title: "Referral Program" };

export default function ReferralPage() {
  return (
    <PageContainer className="py-20">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold">Referral Program</h1>
        <p className="text-muted-foreground mt-2">Coming soon.</p>
      </div>
    </PageContainer>
  );
}
