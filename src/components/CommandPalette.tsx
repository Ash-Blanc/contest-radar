"use client";

import React, { useState, useEffect } from "react";
import { Contest, PlatformType, PrizeTier } from "@/types/contest";
import { PlatformIcon } from "./PlatformIcon";
import { PrizeBadge } from "./PrizeBadge";
import { Search, Trophy, Globe, Zap, ArrowRight, Plus, RefreshCw, X } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  contests: Contest[];
  onSelectContest: (contest: Contest) => void;
  onOpenAddModal: () => void;
  onRefreshLive: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  contests,
  onSelectContest,
  onOpenAddModal,
  onRefreshLive,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredContests = contests
    .filter((c) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.platformLabel.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.prizeDescription.toLowerCase().includes(q)
      );
    })
    .slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden divide-y divide-zinc-800">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 h-14 gap-3 bg-zinc-950/60">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search prized contests (e.g. Codeforces, $10k, Meta)..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 font-sans focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800 border border-zinc-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Quick Actions */}
        <div className="p-2 bg-zinc-900/40 grid grid-cols-2 gap-1.5 text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
          <button
            onClick={() => {
              onClose();
              onOpenAddModal();
            }}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 hover:text-zinc-200 text-left transition-colors"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Ingest & Scrape New URL</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onRefreshLive();
            }}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 hover:text-zinc-200 text-left transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>Sync Live CLIST & CF Feeds</span>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-zinc-800/40">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-3 py-1.5">
            Matching Prized Contests ({filteredContests.length})
          </div>

          {filteredContests.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-zinc-500">
              No contests match &ldquo;{search}&rdquo;
            </div>
          ) : (
            filteredContests.map((contest) => (
              <div
                key={contest.id}
                onClick={() => {
                  onSelectContest(contest);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/70 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
                    <PlatformIcon platform={contest.platform} size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors truncate">
                      {contest.title}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 truncate">
                      {contest.platformLabel} &bull; {contest.prizeDescription}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <PrizeBadge tier={contest.prizeTier} amountUSD={contest.prizePoolUSD} size="sm" />
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
