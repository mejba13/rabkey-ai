"use client";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatters";
import { PlatformIcon } from "@/components/gaming";
import type { GameMetadata as GameMetadataType, Platform } from "@/lib/types";
import { Calendar, Code, Building2, User } from "lucide-react";

interface GameMetadataProps {
  metadata: GameMetadataType;
  className?: string;
}

const metadataFields = [
  { key: "developer", label: "Developer", icon: User },
  { key: "publisher", label: "Publisher", icon: Building2 },
  { key: "releaseDate", label: "Release Date", icon: Calendar },
  { key: "esrbRating", label: "ESRB Rating", icon: Code },
] as const;

function GameMetadata({ metadata, className }: GameMetadataProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>
      {metadataFields.map(({ key, label, icon: Icon }) => {
        let value: string | undefined;

        if (key === "releaseDate") {
          value = formatDate(metadata.releaseDate);
        } else if (key === "esrbRating") {
          value = metadata.esrbRating;
        } else {
          value = metadata[key];
        }

        if (!value) return null;

        return (
          <div key={key} className="flex items-start gap-3">
            <Icon size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p className="text-sm font-medium">{value}</p>
            </div>
          </div>
        );
      })}

      {/* Platforms */}
      <div className="flex items-start gap-3">
        <Code size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Platforms
          </p>
          <div className="mt-1 flex items-center gap-2">
            {metadata.platforms.map((platform: Platform) => (
              <PlatformIcon
                key={platform}
                platform={platform}
                size={16}
                className="text-foreground"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { GameMetadata };
export type { GameMetadataProps };
