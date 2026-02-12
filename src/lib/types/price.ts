export interface Price {
  id: string;
  gameId: string;
  storeId: string;
  edition: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  currency: string;
  region: string;
  url: string;
  dealScore: number;
  lastUpdated: string;
  isAvailable: boolean;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  storeId: string;
}

export interface PriceHistory {
  gameId: string;
  storeId?: string;
  points: PriceHistoryPoint[];
  allTimeLow: number;
  allTimeHigh: number;
  averagePrice: number;
}
