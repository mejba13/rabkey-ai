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
    <div className={cn("grid grid-cols-1 gap-3.5", className)}>
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
          <div key={key} className="flex items-start gap-2.5">
            <Icon size={13} className="mt-0.5 shrink-0 text-white/20" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-white/30 font-heading">
                {label}
              </p>
              <p className="text-[13px] font-heading font-medium text-white/70">{value}</p>
            </div>
          </div>
        );
      })}

      {/* Platforms */}
      <div className="flex items-start gap-2.5">
        <Code size={13} className="mt-0.5 shrink-0 text-white/20" />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-white/30 font-heading">
            Platforms
          </p>
          <div className="mt-1 flex items-center gap-2">
            {metadata.platforms.map((platform: Platform) => (
              <PlatformIcon
                key={platform}
                platform={platform}
                size={14}
                className="text-white/50"
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
