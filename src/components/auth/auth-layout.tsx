"use client";

import { motion } from "motion/react";
import { Logo } from "@/components/layout/logo";
import { Gamepad2, Shield, TrendingDown, Zap } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const features = [
  {
    icon: TrendingDown,
    title: "Smart Price Tracking",
    description: "Compare prices across 50+ stores instantly",
  },
  {
    icon: Zap,
    title: "AI-Powered Predictions",
    description: "Know when to buy with ML price forecasting",
  },
  {
    icon: Shield,
    title: "Trust Verified Stores",
    description: "Every seller rated for your safety",
  },
  {
    icon: Gamepad2,
    title: "12,000+ Games",
    description: "From AAA blockbusters to hidden indie gems",
  },
];

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col relative bg-gaming-surface-deep overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gaming-orange/5 blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gaming-purple/5 blur-[100px]" />
          <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-gaming-teal/5 blur-[80px]" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative flex flex-col flex-1 p-8 lg:p-10">
          {/* Logo */}
          <Logo size="lg" />

          {/* Main tagline */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl xl:text-4xl font-heading font-bold leading-tight">
                Never Overpay
                <br />
                for{" "}
                <span className="bg-gradient-to-r from-gaming-orange to-gaming-coral bg-clip-text text-transparent">
                  Game Keys
                </span>{" "}
                Again
              </h2>
              <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
                Join 24,000+ gamers saving money with AI-powered price
                intelligence and smart deal scoring.
              </p>
            </motion.div>

            {/* Feature list */}
            <motion.div
              className="mt-10 space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  >
                    <div className="size-9 rounded-lg bg-gaming-surface-elevated flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-4 text-gaming-orange" />
                    </div>
                    <div>
                      <p className="text-sm font-heading font-semibold">
                        {feature.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            className="flex items-center gap-6 text-xs text-muted-foreground pt-6 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div>
              <span className="font-heading font-bold text-white text-lg">
                50+
              </span>
              <p>Stores</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <span className="font-heading font-bold text-white text-lg">
                $12M+
              </span>
              <p>Saved</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <span className="font-heading font-bold text-white text-lg">
                24K+
              </span>
              <p>Users</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile logo */}
        <div className="lg:hidden p-6">
          <Logo size="md" />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-2xl font-heading font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
