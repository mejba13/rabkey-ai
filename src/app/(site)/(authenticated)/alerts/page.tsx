import type { Metadata } from "next";
import { AlertsPageClient } from "./alerts-page-client";

export const metadata: Metadata = { title: "Price Alerts" };

export default function AlertsPage() {
  return <AlertsPageClient />;
}
