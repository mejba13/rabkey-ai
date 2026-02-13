import type { Metadata } from "next";
import { PricingSection } from "@/components/landing/pricing-section";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return <PricingSection />;
}
