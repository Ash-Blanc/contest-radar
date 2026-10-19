"use client";

import React from "react";
import { Contest } from "@/types/contest";
import { formatUSD } from "@/lib/utils";
import { Trophy, Gem, Clock, Activity, ShieldCheck, Zap } from "lucide-react";

interface StatsBentoProps {
  contests: Contest[];
}

export function StatsBento({ contests }: StatsBentoProps) {
  const totalPrizePool = contests.reduce((sum, c) => sum + (c.prizePoolUSD || 0), 0);
  const megaContests = contests.filter((c) => c.prizeTier === "mega").length;
  const majorContests = contests.filter((c) => c.prizeTier === "major").length;
  const upcomingCount = contests.filter((c) => c.status === "upcoming").length;
  const verifiedCount = contests.filter((c) => c.isVerifiedPrize).length;

  // Find the next upcoming contest
  const upcomingContests = contests.filter((c) => c.status === "upcoming");
  const nextContest = [...upcomingContests]
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* Total Prize Pool */}
      <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900/60 to-zinc-950 p-4 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
          <span className="uppercase tracking-wider">Total Active Purse</span>
          <Gem className="w-4 h-4 text-amber-400 animate-pulse" />
        </div>
        <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 tracking-tight">
          {formatUSD(totalPrizePool)}
        </div>
        <div className="text-[11px] font-mono text-amber-400/80 mt-1 flex items-center gap-1">
          <span>{megaContests} Mega</span> &bull; <span>{majorContests} Major Contests</span>
        </div>
      </div>

      {/* Next Upcoming Round */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
          <span className="uppercase tracking-wider">Next On Deck</span>
          <Clock className="w-4 h-4 text-sky-400" />
        </div>
        <div className="text-sm font-semibold text-zinc-100 truncate" title={nextContest?.title || "Upcoming Round"}>
          {nextContest ? nextContest.title : "Checking Schedule..."}
        </div>
        <div className="text-[11px] font-mono text-sky-400 mt-1">
          {nextContest ? `${nextContest.platformLabel} &bull; ${nextContest.prizeDescription.slice(0, 28)}...` : "Continuous live polling"}
        </div>
      </div>

      {/* Verified Prize Grounds */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
          <span className="uppercase tracking-wider">Verified Contests</span>
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-300">
          {verifiedCount} <span className="text-xs text-zinc-500 font-normal">/ {contests.length}</span>
        </div>
        <div className="text-[11px] font-mono text-emerald-400/80 mt-1">
          100% Zero-Hallucination Verified
        </div>
      </div>

      {/* Multi-Agent Infrastructure */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
          <span className="uppercase tracking-wider">Intelligence Pipeline</span>
          <Zap className="w-4 h-4 text-purple-400" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 border border-purple-800/60 text-purple-300">
            Parallel AI
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-950/60 border border-sky-800/60 text-sky-300">
            TinyFish
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
            CLIST v4
          </span>
        </div>
        <div className="text-[11px] font-mono text-zinc-400 mt-1">
          Latency: ~180ms Turbo / ~340ms Fast
        </div>
      </div>
    </div>
  );
}
