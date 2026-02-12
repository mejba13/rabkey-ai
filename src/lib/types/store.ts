export type TrustLevel = "excellent" | "good" | "average" | "poor";

export interface Store {
  id: string;
  name: string;
  slug: string;
  logo: string;
  url: string;
  isOfficial: boolean;
  trustScore: number;
  trustLevel: TrustLevel;
  totalReviews: number;
  avgDeliveryTime: string;
  regionSupport: string[];
  paymentMethods: string[];
  description: string;
}
