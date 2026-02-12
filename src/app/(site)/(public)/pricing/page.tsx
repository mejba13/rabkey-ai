import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PricingSection } from "@/components/landing/pricing-section";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <PageContainer className="py-20">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold">Pricing</h1>
        <p className="text-muted-foreground mt-2">Compare our plans and find the right one for you.</p>
      </div>
      <PricingSection />
    </PageContainer>
  );
}
