"use client";

import React from "react";
import { Contest } from "@/types/contest";
import { PrizeBadge } from "./PrizeBadge";
import { CountdownTimer } from "./CountdownTimer";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { formatDuration, formatDateTime } from "@/lib/utils";
import { generateGoogleCalendarUrl, downloadICS } from "./CalendarExport";
import {
  ExternalLink,
  Calendar,
  CheckCircle2,
  Sparkles,
  Globe2,
  Users,
  SearchCode,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ContestCardProps {
  contest: Contest;
  isSelected?: boolean;
  onSelect?: (contest: Contest) => void;
  onDeepResearch?: (contest: Contest) => void;
}

export function ContestCard({
  contest,
  isSelected,
  onSelect,
  onDeepResearch,
}: ContestCardProps) {
  const triggerConfetti = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (contest.prizeTier === "mega" || contest.prizeTier === "major") {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981"],
      });
    }
    if (onSelect) onSelect(contest);
  };

  const platformColors: Record<string, string> = {
    codeforces: "bg-red-500/10 text-red-400 border-red-500/20",
    atcoder: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    leetcode: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    meta: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    ieeextreme: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    yandex: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icpc: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  return (
    <div
      onClick={triggerConfetti}
      className={`group relative rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-amber-500/80 bg-zinc-900/90 shadow-[0_0_24px_rgba(245,158,11,0.18)] ring-1 ring-amber-500/50"
          : "border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-lg"
      }`}
    >
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border uppercase tracking-wider ${
              platformColors[contest.platform] || "bg-zinc-800 text-zinc-300 border-zinc-700"
            }`}
          >
            {contest.platformLabel}
          </span>

          <Badge variant="secondary" size="sm" className="font-mono">
            {formatDuration(contest.durationSeconds)}
          </Badge>

          <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
            <Globe2 className="w-3 h-3 text-zinc-500" />
            <span className="capitalize">{contest.format}</span>
          </span>
        </div>

        <CountdownTimer
          targetISO={contest.startTime}
          isOngoing={contest.status === "ongoing"}
        />
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {contest.title}
          </h3>
          {contest.isVerifiedPrize && (
            <span
              title="Verified prize by Parallel.ai & TinyFish Search"
              className="flex items-center gap-1 text-[11px] text-emerald-400/90 font-mono shrink-0 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
          {contest.description}
        </p>
      </div>

      {/* Prize Pool Display */}
      <div className="mb-4 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider mb-1">
            Prize Reward Distribution
          </div>
          <PrizeBadge
            tier={contest.prizeTier}
            amountUSD={contest.prizePoolUSD}
            description={contest.prizeDescription}
          />
        </div>

        <div className="text-right">
          <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider mb-0.5">
            Starts
          </div>
          <div className="text-xs font-mono text-zinc-300 font-medium">
            {formatDateTime(contest.startTime)}
          </div>
        </div>
      </div>

      {/* Tags & Metadata */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        {contest.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2 py-0.5 rounded bg-zinc-800/40 text-zinc-400 border border-zinc-800/80 font-mono"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-800/60">
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
            className="inline-flex items-center justify-center h-8 px-2.5 text-xs font-mono rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
          >
            <span>Register</span>
            <ExternalLink className="w-3 h-3 ml-1 text-zinc-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
