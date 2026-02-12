import type { Metadata } from "next";
import { plusJakartaSans, dmSans, jetbrainsMono } from "@/lib/fonts";
import { Providers } from "@/providers/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GrabKey AI — AI-Powered Game Key Price Intelligence",
    template: "%s | GrabKey AI",
  },
  description:
    "Compare prices from 50+ stores, get smart deal scores, and never overpay for games.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-gaming-orange focus:px-4 focus:py-2 focus:text-black focus:font-semibold"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
