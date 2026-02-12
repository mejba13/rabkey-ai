export type AlertStatus = "active" | "paused" | "triggered" | "expired";
export type NotificationChannel = "email" | "push" | "in-app";

export interface PriceAlert {
  id: string;
  gameId: string;
  targetPrice: number;
  currentPrice: number;
  status: AlertStatus;
  channels: NotificationChannel[];
  createdAt: string;
  triggeredAt?: string;
  expiresAt?: string;
}

export interface Notification {
  id: string;
  type: "price-drop" | "alert-triggered" | "deal-score" | "system";
  title: string;
  message: string;
  gameId?: string;
  read: boolean;
  createdAt: string;
}
