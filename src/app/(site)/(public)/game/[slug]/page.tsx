import type { Metadata } from "next";
import { GameDetailClient } from "./game-detail-client";
import { mockGames } from "@/lib/mock-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = mockGames.find((g) => g.slug === slug);

  return {
    title: game?.title ?? "Game Not Found",
    description:
      game?.shortDescription ?? "Find the best prices for this game.",
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  return <GameDetailClient slug={slug} />;
}
