export type Platform = "pc" | "playstation" | "xbox" | "nintendo";

export type Genre =
  | "action"
  | "adventure"
  | "rpg"
  | "strategy"
  | "simulation"
  | "sports"
  | "racing"
  | "puzzle"
  | "horror"
  | "fps"
  | "mmorpg"
  | "indie"
  | "open-world"
  | "souls-like"
  | "roguelike"
  | "platformer"
  | "fighting"
  | "survival";

export type Edition = "standard" | "deluxe" | "gold" | "ultimate" | "goty" | "complete";

export interface GameMetadata {
  developer: string;
  publisher: string;
  releaseDate: string;
  genres: Genre[];
  platforms: Platform[];
  features: string[];
  languages: string[];
  esrbRating?: string;
}

export interface GameEdition {
  id: string;
  gameId: string;
  name: string;
  edition: Edition;
  includes: string[];
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  backgroundImage?: string;
  description: string;
  shortDescription: string;
  metadata: GameMetadata;
  editions: GameEdition[];
  bestPrice: number;
  bestPriceStoreId: string;
  originalPrice: number;
  discount: number;
  dealScore: number;
  isOnSale: boolean;
  priceDropPercent?: number;
}
