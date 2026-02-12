import type { Metadata } from "next";
import { StoresPageClient } from "./stores-page-client";

export const metadata: Metadata = {
  title: "Game Key Stores",
  description: "Compare 50+ game key stores with trust scores and reviews.",
};

export default function StoresPage() {
  return <StoresPageClient />;
}
