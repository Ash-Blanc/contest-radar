"use client";

import React from "react";
import { Contest } from "@/types/contest";
import { PrizeBadge } from "./PrizeBadge";
import { CountdownTimer } from "./CountdownTimer";
import { PlatformIcon } from "./PlatformIcon";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { formatDuration, formatDateTime, formatUSD } from "@/lib/utils";
import { downloadICS } from "./CalendarExport";
import {
  ExternalLink,
  Calendar,
  Sparkles,
  Globe2,
  ShieldCheck,
  Star,
  SearchCode,
  Share2,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ContestCardProps {
  contest: Contest;
  isSelected?: boolean;
  isBookmarked?: boolean;
  onSelect?: (contest: Contest) => void;
  onToggleBookmark?: (contestId: string) => void;
  onDeepResearch?: (contest: Contest) => void;
}

export function ContestCard({
  contest,
  isSelected,
  isBookmarked,
  onSelect,
  onToggleBookmark,
  onDeepResearch,
}: ContestCardProps) {
  const triggerConfetti = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (contest.prizeTier === "mega" || contest.prizeTier === "major") {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.8 },
        colors: ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981"],
      });
    }
    if (onSelect) onSelect(contest);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `🏆 ${contest.title} - Prized CP Contest`,
        text: `Prize: ${contest.prizeDescription}\nStarts: ${contest.startTime}`,
        url: contest.url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `🏆 ${contest.title}\n💰 ${contest.prizeDescription}\n🔗 ${contest.url}`
      );
    }
  };

  return (
    <div
      onClick={triggerConfetti}
      className={`group relative rounded-2xl border p-5 transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected
          ? "border-amber-500/80 bg-zinc-900/90 shadow-[0_0_28px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/60"
          : "border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-750 hover:bg-zinc-900/80 hover:shadow-xl"
      }`}
    >
      {/* Subtle top gradient accent on hover/select */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-all ${
          isSelected
            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400"
            : "bg-transparent group-hover:bg-zinc-700/40"
        }`}
      />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          {/* Platform Icon Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 font-mono text-xs font-semibold text-zinc-200">
            <PlatformIcon platform={contest.platform} size={15} />
            <span>{contest.platformLabel}</span>
          </div>

          <Badge variant="secondary" size="sm" className="font-mono">
            {formatDuration(contest.durationSeconds)}
          </Badge>

          <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
            <Globe2 className="w-3 h-3 text-zinc-500" />
            <span className="capitalize">{contest.format}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          {onToggleBookmark && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(contest.id);
              }}
              title={isBookmarked ? "Remove from Watchlist" : "Save to Watchlist"}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : "bg-zinc-950/60 text-zinc-500 border-zinc-800 hover:text-zinc-300"
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          <CountdownTimer
            targetISO={contest.startTime}
            isOngoing={contest.status === "ongoing"}
          />
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1 leading-snug">
            {contest.title}
          </h3>
          {contest.isVerifiedPrize && (
            <span
              title="Verified by Parallel.ai Basis & CLIST"
              className="flex items-center gap-1 text-[11px] text-emerald-400/90 font-mono shrink-0 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/50"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed font-sans">
          {contest.description}
        </p>
      </div>

      {/* Prize Pool Display Bento Box */}
      <div className="mb-4 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 shadow-inner">
        <div>
          <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider mb-1">
            Prize Distribution
          </div>
          <PrizeBadge
            tier={contest.prizeTier}
            amountUSD={contest.prizePoolUSD}
            description={contest.prizeDescription}
          />
        </div>

        <div className="text-right font-mono">
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-0.5">
            Starts
          </div>
          <div className="text-xs text-zinc-200 font-medium">
            {formatDateTime(contest.startTime)}
          </div>
        </div>
      </div>

      {/* Tags Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        {contest.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-800/40 text-zinc-400 border border-zinc-800/80 font-mono"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Footer Bar */}
      <div className="flex items-center justify-between gap-2 pt-3.5 border-t border-zinc-800/70">
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(contest);
            }}
            className="text-xs font-mono hover:text-amber-300"
          >
            <SearchCode className="w-3.5 h-3.5 mr-1" />
            Inspect Sources
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              downloadICS(contest);
            }}
            title="Download .ics Calendar Event"
            className="text-xs font-mono text-zinc-400 hover:text-zinc-200"
          >
            <Calendar className="w-3.5 h-3.5 mr-1" />
            .ICS
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            title="Share or Copy Contest Details"
            className="text-xs font-mono text-zinc-400 hover:text-zinc-200"
          >
            <Share2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1.5">
          {onDeepResearch && (
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeepResearch(contest);
              }}
              className="text-xs font-mono text-purple-300 hover:text-purple-200 border-purple-800/40"
            >
              <Sparkles className="w-3 h-3 mr-1 text-purple-400" />
              Deep Research
            </Button>
          )}

          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center h-8 px-3 text-xs font-mono rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
          >
            <span>Register</span>
            <ExternalLink className="w-3 h-3 ml-1 text-zinc-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
