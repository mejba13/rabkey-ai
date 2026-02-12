import type { Metadata } from "next";
import { SearchPageClient } from "./search-page-client";

export const metadata: Metadata = {
  title: "Search Games",
  description:
    "Search and compare game key prices from 50+ stores. Find the best deals with AI-powered deal scoring.",
};

export default function SearchPage() {
  return <SearchPageClient />;
}
