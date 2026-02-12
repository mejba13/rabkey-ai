import type { Metadata } from "next";
import { DealsPageClient } from "./deals-page-client";

export const metadata: Metadata = {
  title: "Hot Deals",
  description: "Browse the hottest game key deals with AI-powered deal scores.",
};

export default function DealsPage() {
  return <DealsPageClient />;
}
