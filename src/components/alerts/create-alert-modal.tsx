"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Bell, Search, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GamingButton } from "@/components/gaming";
import { formatPrice } from "@/lib/formatters";
import { mockGames } from "@/lib/mock-data";
import { useAlertsStore } from "@/stores/alerts-store";
import type { NotificationChannel } from "@/lib/types/alert";

interface CreateAlertModalProps {
  gameId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAlertModal({
  gameId,
  open,
  onOpenChange,
}: CreateAlertModalProps) {
  const addAlert = useAlertsStore((s) => s.addAlert);

  const [selectedGameId, setSelectedGameId] = useState<string | undefined>(
    gameId
  );
  const [targetPrice, setTargetPrice] = useState("");
  const [channels, setChannels] = useState<NotificationChannel[]>(["in-app"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const selectedGame = useMemo(
    () => mockGames.find((g) => g.id === (selectedGameId ?? gameId)),
    [selectedGameId, gameId]
  );

  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return mockGames;
    return mockGames.filter((g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  function toggleChannel(channel: NotificationChannel) {
    setChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  }

  function handleSubmit() {
    if (!selectedGame) {
      setError("Please select a game.");
      return;
    }

    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      setError("Target price must be greater than $0.");
      return;
    }

    if (price >= selectedGame.bestPrice) {
      setError(
        `Target price must be lower than the current price (${formatPrice(selectedGame.bestPrice)}).`
      );
      return;
    }

    if (channels.length === 0) {
      setError("Select at least one notification channel.");
      return;
    }

    addAlert({
      gameId: selectedGame.id,
      targetPrice: price,
      currentPrice: selectedGame.bestPrice,
      status: "active",
      channels,
    });

    toast.success("Alert created!", {
      description: `You'll be notified when ${selectedGame.title} drops below ${formatPrice(price)}.`,
    });

    // Reset form
    setTargetPrice("");
    setChannels(["in-app"]);
    setSearchQuery("");
    setError("");
    if (!gameId) setSelectedGameId(undefined);
    onOpenChange(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setError("");
      setSearchQuery("");
      if (!gameId) setSelectedGameId(undefined);
    }
    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gaming-surface border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <Bell className="size-5 text-gaming-orange" />
            Create Price Alert
          </DialogTitle>
          <DialogDescription>
            Get notified when the price drops to your target.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Game Selector */}
          {!gameId && !selectedGame && (
            <div className="space-y-2">
              <Label>Select Game</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gaming-surface-elevated border-border"
                />
              </div>
              <div className="max-h-48 overflow-y-auto rounded-lg border border-border bg-gaming-surface-elevated">
                {filteredGames.length === 0 ? (
                  <p className="p-3 text-sm text-muted-foreground text-center">
                    No games found.
                  </p>
                ) : (
                  filteredGames.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => {
                        setSelectedGameId(game.id);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 w-full p-2.5 text-left text-sm hover:bg-gaming-surface transition-colors"
                    >
                      <Image
                        src={game.coverImage}
                        alt={game.title}
                        width={32}
                        height={32}
                        className="size-8 rounded object-cover"
                      />
                      <span className="flex-1 font-medium truncate">
                        {game.title}
                      </span>
                      <span className="text-gaming-teal text-xs font-heading font-semibold">
                        {formatPrice(game.bestPrice)}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Selected Game Info */}
          {selectedGame && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gaming-surface-elevated border border-border">
              <Image
                src={selectedGame.coverImage}
                alt={selectedGame.title}
                width={40}
                height={40}
                className="size-10 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-sm truncate">
                  {selectedGame.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  Current best:{" "}
                  <span className="text-gaming-teal font-semibold">
                    {formatPrice(selectedGame.bestPrice)}
                  </span>
                </p>
              </div>
              {!gameId && (
                <button
                  type="button"
                  onClick={() => setSelectedGameId(undefined)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Change
                </button>
              )}
            </div>
          )}

          {/* Target Price */}
          <div className="space-y-2">
            <Label htmlFor="target-price">Target Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                $
              </span>
              <Input
                id="target-price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={targetPrice}
                onChange={(e) => {
                  setTargetPrice(e.target.value);
                  setError("");
                }}
                className="pl-7 bg-gaming-surface-elevated border-border"
              />
            </div>
            {selectedGame && (
              <p className="text-xs text-muted-foreground">
                Must be below current price of{" "}
                {formatPrice(selectedGame.bestPrice)}
              </p>
            )}
          </div>

          {/* Notification Channels */}
          <div className="space-y-3">
            <Label>Notify me via</Label>
            <div className="space-y-2">
              {(
                [
                  { id: "email" as const, label: "Email" },
                  { id: "push" as const, label: "Push Notification" },
                  { id: "in-app" as const, label: "In-App" },
                ] as const
              ).map((ch) => (
                <label
                  key={ch.id}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <Checkbox
                    checked={channels.includes(ch.id)}
                    onCheckedChange={() => toggleChannel(ch.id)}
                  />
                  <span className="text-sm">{ch.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-gaming-pink">{error}</p>
          )}

          {/* Submit */}
          <GamingButton
            onClick={handleSubmit}
            className="w-full"
          >
            <Check className="size-4" />
            Create Alert
          </GamingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
