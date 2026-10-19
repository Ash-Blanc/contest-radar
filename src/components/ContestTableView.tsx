"use client";

import React from "react";
import { Contest } from "@/types/contest";
import { PlatformIcon } from "./PlatformIcon";
import { PrizeBadge } from "./PrizeBadge";
import { CountdownTimer } from "./CountdownTimer";
import { formatDateTime, formatDuration } from "@/lib/utils";
import { ExternalLink, Star, ShieldCheck, ChevronRight } from "lucide-react";

interface ContestTableViewProps {
  contests: Contest[];
  selectedContestId?: string;
  bookmarkedIds: Set<string>;
  onSelect: (contest: Contest) => void;
  onToggleBookmark: (contestId: string) => void;
}

export function ContestTableView({
  contests,
  selectedContestId,
  bookmarkedIds,
  onSelect,
  onToggleBookmark,
}: ContestTableViewProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-zinc-950/80 border-b border-zinc-800 text-[10px] uppercase text-zinc-400">
            <tr>
              <th className="py-3 px-3 w-8">★</th>
              <th className="py-3 px-3">Platform</th>
              <th className="py-3 px-4">Contest Name</th>
              <th className="py-3 px-3">Prize Purse</th>
              <th className="py-3 px-3">Start Time</th>
              <th className="py-3 px-3">Countdown</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {contests.map((c) => {
              const isSelected = selectedContestId === c.id;
              const isBookmarked = bookmarkedIds.has(c.id);

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelect(c)}
                  className={`hover:bg-zinc-800/50 cursor-pointer transition-colors ${
                    isSelected ? "bg-amber-500/10 text-amber-200" : ""
                  }`}
                >
                  <td className="py-3 px-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(c.id);
                      }}
                      className="text-zinc-600 hover:text-amber-400"
                    >
                      <Star className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-400 text-amber-400" : ""}`} />
                    </button>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 font-bold text-zinc-200">
                      <PlatformIcon platform={c.platform} size={14} />
                      <span className="truncate max-w-[90px]">{c.platformLabel}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 max-w-xs font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-100 truncate block">{c.title}</span>
                      {c.isVerifiedPrize && (
                        <span title="Verified">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <PrizeBadge tier={c.prizeTier} amountUSD={c.prizePoolUSD} size="sm" />
                  </td>

                  <td className="py-3 px-3 text-zinc-400 whitespace-nowrap">
                    {formatDateTime(c.startTime)}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <CountdownTimer targetISO={c.startTime} isOngoing={c.status === "ongoing"} />
                  </td>

                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-amber-300 py-1 px-2 rounded hover:bg-zinc-800"
                    >
                      <span>Join</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
