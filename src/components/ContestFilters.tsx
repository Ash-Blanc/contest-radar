"use client";

import React from "react";
import { PlatformType, PrizeTier } from "@/types/contest";
import { PlatformIcon } from "./PlatformIcon";
import { Badge } from "./ui/badge";
import { Filter, Gem, Trophy, Award, ShieldCheck, Star, LayoutGrid, List } from "lucide-react";

interface ContestFiltersProps {
  selectedPlatform: PlatformType | "all";
  onSelectPlatform: (platform: PlatformType | "all") => void;
  selectedTier: PrizeTier | "all";
  onSelectTier: (tier: PrizeTier | "all") => void;
  selectedFormat: "all" | "online" | "in-person" | "hybrid";
  onSelectFormat: (format: "all" | "online" | "in-person" | "hybrid") => void;
  onlyVerified: boolean;
  onToggleVerified: (val: boolean) => void;
  onlyBookmarked: boolean;
  onToggleBookmarked: (val: boolean) => void;
  bookmarkedCount: number;
  viewMode: "cards" | "table";
  onToggleViewMode: (mode: "cards" | "table") => void;
  contestCounts: {
    total: number;
    mega: number;
    major: number;
    online: number;
  };
}

export function ContestFilters({
  selectedPlatform,
  onSelectPlatform,
  selectedTier,
  onSelectTier,
  selectedFormat,
  onSelectFormat,
  onlyVerified,
  onToggleVerified,
  onlyBookmarked,
  onToggleBookmarked,
  bookmarkedCount,
  viewMode,
  onToggleViewMode,
}: ContestFiltersProps) {
  const platforms: { id: PlatformType | "all"; label: string }[] = [
    { id: "all", label: "All Platforms" },
    { id: "codeforces", label: "Codeforces" },
    { id: "atcoder", label: "AtCoder" },
    { id: "meta", label: "Meta" },
    { id: "kaggle", label: "Kaggle" },
    { id: "leetcode", label: "LeetCode" },
    { id: "codechef", label: "CodeChef" },
    { id: "ieeextreme", label: "IEEEXtreme" },
    { id: "icpc", label: "ICPC" },
    { id: "yandex", label: "Yandex" },
  ];

  const tiers: { id: PrizeTier | "all"; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All Purses", icon: null },
    { id: "mega", label: "💎 Mega ($10k+)", icon: <Gem className="w-3.5 h-3.5 text-amber-400" /> },
    { id: "major", label: "🏆 Major ($1k-$10k)", icon: <Trophy className="w-3.5 h-3.5 text-purple-400" /> },
    { id: "standard", label: "🥇 Standard ($100+)", icon: <Award className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <div className="space-y-3.5 pb-2 border-b border-zinc-800/80">
      {/* Top Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Tier Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => onSelectTier(tier.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                selectedTier === tier.id
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              {tier.icon}
              <span>{tier.label}</span>
            </button>
          ))}
        </div>

        {/* Watchlist, Verified, Format & View Mode Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Watchlist Toggle */}
          <button
            onClick={() => onToggleBookmarked(!onlyBookmarked)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              onlyBookmarked
                ? "bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold"
                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyBookmarked ? "fill-amber-400 text-amber-400" : "text-zinc-500"}`} />
            <span>Watchlist ({bookmarkedCount})</span>
          </button>

          {/* Verified Toggle */}
          <button
            onClick={() => onToggleVerified(!onlyVerified)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              onlyVerified
                ? "bg-emerald-950/60 text-emerald-400 border-emerald-700 shadow-sm"
                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified</span>
          </button>

          {/* Format Toggle */}
          <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => onSelectFormat("all")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedFormat === "all" ? "bg-zinc-800 text-zinc-100 font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => onSelectFormat("online")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedFormat === "online" ? "bg-zinc-800 text-zinc-100 font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Online
            </button>
            <button
              onClick={() => onSelectFormat("in-person")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedFormat === "in-person" ? "bg-zinc-800 text-zinc-100 font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              On-site
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => onToggleViewMode("cards")}
              title="Cards Grid View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "cards" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleViewMode("table")}
              title="Data-Dense Table View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "table" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Platform Carousel / Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] font-mono text-zinc-500 mr-1 uppercase font-semibold">Filter:</span>
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPlatform(p.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-colors border ${
              selectedPlatform === p.id
                ? "bg-zinc-100 text-zinc-950 border-zinc-100 font-bold shadow-sm"
                : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            {p.id !== "all" && <PlatformIcon platform={p.id} size={13} />}
            <span>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
