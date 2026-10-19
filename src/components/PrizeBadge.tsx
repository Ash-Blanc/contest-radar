import React from "react";
import { PrizeTier } from "@/types/contest";
import { formatUSD } from "@/lib/utils";
import { Trophy, Gem, Award, Medal } from "lucide-react";

interface PrizeBadgeProps {
  tier: PrizeTier;
  amountUSD: number | null;
  description?: string;
  size?: "sm" | "md" | "lg";
}

export function PrizeBadge({ tier, amountUSD, size = "md" }: PrizeBadgeProps) {
  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2 font-bold",
  };

  if (tier === "mega") {
    return (
      <div
        className={`inline-flex items-center rounded-md font-mono font-semibold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_16px_rgba(245,158,11,0.25)] ${sizeClasses[size]}`}
      >
        <Gem className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>{amountUSD ? formatUSD(amountUSD) : "MEGA PRIZE"}</span>
        <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-bold bg-amber-950/70 px-1 rounded">
          $10k+
        </span>
      </div>
    );
  }

  if (tier === "major") {
    return (
      <div
        className={`inline-flex items-center rounded-md font-mono font-semibold bg-purple-950/50 text-purple-300 border border-purple-800/60 shadow-[0_0_12px_rgba(168,85,247,0.2)] ${sizeClasses[size]}`}
      >
        <Trophy className="w-3.5 h-3.5 text-purple-400" />
        <span>{amountUSD ? formatUSD(amountUSD) : "MAJOR PRIZE"}</span>
        <span className="text-[10px] uppercase tracking-wider text-purple-400/80 font-bold bg-purple-900/60 px-1 rounded">
          $1k+
        </span>
      </div>
    );
  }

  if (tier === "standard") {
    return (
      <div
        className={`inline-flex items-center rounded-md font-mono font-semibold bg-emerald-950/50 text-emerald-300 border border-emerald-800/60 shadow-[0_0_10px_rgba(16,185,129,0.15)] ${sizeClasses[size]}`}
      >
        <Award className="w-3.5 h-3.5 text-emerald-400" />
        <span>{amountUSD ? formatUSD(amountUSD) : "CASH PRIZE"}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-md font-mono font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/70 ${sizeClasses[size]}`}
    >
      <Medal className="w-3.5 h-3.5 text-zinc-400" />
      <span>SWAG & PERKS</span>
    </div>
  );
}
