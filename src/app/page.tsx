"use client";

import React, { useState, useEffect } from "react";
import { Contest, PlatformType, PrizeTier, ParallelSearchResponse, TinyFishSearchApiResponse } from "@/types/contest";
import { initialContests } from "@/lib/contest-store";
import { ContestCard } from "@/components/ContestCard";
import { DetailInspector } from "@/components/DetailInspector";
import { LiveSearchOmnibox } from "@/components/LiveSearchOmnibox";
import { ContestFilters } from "@/components/ContestFilters";
import { ParallelExecutionDrawer } from "@/components/ParallelExecutionDrawer";
import { AddContestModal } from "@/components/AddContestModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatUSD } from "@/lib/utils";
import {
  Radar,
  Trophy,
  Zap,
  Globe,
  Plus,
  RefreshCw,
  Bell,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Code2,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const [contests, setContests] = useState<Contest[]>(initialContests);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(initialContests[0]);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | "all">("all");
  const [selectedTier, setSelectedTier] = useState<PrizeTier | "all">("all");
  const [selectedFormat, setSelectedFormat] = useState<"all" | "online" | "in-person" | "hybrid">("all");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isRefreshingLive, setIsRefreshingLive] = useState(false);
  const [isDeepResearching, setIsDeepResearching] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [parallelData, setParallelData] = useState<ParallelSearchResponse | null>(null);
  const [tinyfishData, setTinyfishData] = useState<TinyFishSearchApiResponse | null>(null);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  // Fetch live contests from CLIST and Codeforces on load
  const loadLiveContests = async () => {
    setIsRefreshingLive(true);
    try {
      const res = await fetch("/api/contests");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.contests) && data.contests.length > 0) {
          setContests(data.contests);
          setSelectedContest((prev) => prev || data.contests[0]);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch fresh live contests:", err);
    } finally {
      setIsRefreshingLive(false);
    }
  };

  useEffect(() => {
    loadLiveContests();
  }, []);

  // Calculate live stats
  const totalPrizePool = contests.reduce((sum, c) => sum + (c.prizePoolUSD || 0), 0);
  const megaContestsCount = contests.filter((c) => c.prizeTier === "mega").length;
  const majorContestsCount = contests.filter((c) => c.prizeTier === "major").length;
  const onlineContestsCount = contests.filter((c) => c.format === "online" || c.format === "virtual").length;

  const handleSearch = async (query: string, mode: "turbo" | "fast" | "advanced") => {
    setSearchQuery(query);
    setIsLoadingSearch(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, mode }),
      });

      const data = await res.json();
      if (data.success) {
        setParallelData(data.parallelExecution);
        setTinyfishData(data.tinyfishExecution);
        setAiInsights(data.aiGeneratedInsights || []);
        if (data.contests && data.contests.length > 0) {
          setContests(data.contests);
          setSelectedContest(data.contests[0]);
        }
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const handleDeepResearch = async (contest: Contest) => {
    setIsDeepResearching(true);
    try {
      const res = await fetch("/api/deep-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: contest.title, url: contest.url }),
      });

      const data = await res.json();
      if (data.success && data.research) {
        const updated: Contest = {
          ...contest,
          deepResearch: {
            overview: data.research.prizeTiersSummary,
            difficultyRating: contest.deepResearch?.difficultyRating || "Hard",
            expectedParticipants: contest.deepResearch?.expectedParticipants || "12,000+ competitors",
            prizeEligibilityNotes: data.research.keyEligibility,
            pastWinnersOrStats: contest.deepResearch?.pastWinnersOrStats || [],
            recommendedPreparation: data.research.strategicAdvice,
            keyRules: contest.deepResearch?.keyRules || [],
          },
        };
        setSelectedContest(updated);
        setContests((prev) => prev.map((c) => (c.id === contest.id ? updated : c)));
      }
    } catch (err) {
      console.error("Deep research error:", err);
    } finally {
      setIsDeepResearching(false);
    }
  };

  const handleContestAdded = (newContest: Contest) => {
    setContests((prev) => [newContest, ...prev]);
    setSelectedContest(newContest);
  };

  // Filter contests locally
  const filteredContests = contests.filter((c) => {
    if (selectedPlatform !== "all" && c.platform !== selectedPlatform) return false;
    if (selectedTier !== "all" && c.prizeTier !== selectedTier) return false;
    if (selectedFormat !== "all" && c.format !== selectedFormat) return false;
    if (onlyVerified && !c.isVerifiedPrize) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.prizeDescription.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar in Coss.com/ui Style */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <Radar className="w-5 h-5 text-zinc-950 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-zinc-100 font-mono">
                  CONTEST<span className="text-amber-400">RADAR</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono hidden sm:block">
                Parallel.ai &bull; TinyFish.ai &bull; CLIST &bull; Codeforces Prized Engine
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-zinc-400">Active Pool:</span>
              <span className="text-amber-300 font-bold">{formatUSD(totalPrizePool)}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>CLIST + CF: Live</span>
              </span>
              <span className="flex items-center gap-1.5 text-sky-400 bg-sky-950/40 px-2 py-1 rounded border border-sky-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span>Parallel: Fast</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              isLoading={isRefreshingLive}
              onClick={loadLiveContests}
              title="Sync latest live contests from CLIST and Codeforces APIs"
              className="font-mono text-xs hidden sm:inline-flex"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1 text-zinc-400" />
              <span>Sync Live</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              className="font-mono text-xs hidden sm:inline-flex"
            >
              <Plus className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span>Ingest Link</span>
            </Button>

            <a
              href="https://codeforces.com/blog/entry/157611"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden md:inline">CF #157611</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero Omnibox Search */}
        <LiveSearchOmnibox
          onSearch={handleSearch}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          isLoading={isLoadingSearch}
        />

        {/* Parallel & TinyFish Telemetry Status */}
        <ParallelExecutionDrawer
          parallelData={parallelData}
          tinyfishData={tinyfishData}
          isLoading={isLoadingSearch}
        />

        {/* AI Insight banner if present */}
        {aiInsights.length > 0 && (
          <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-200/90 font-mono space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Parallel Intelligence Feed</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px] text-zinc-300">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400">&bull;</span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <ContestFilters
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          selectedTier={selectedTier}
          onSelectTier={setSelectedTier}
          selectedFormat={selectedFormat}
          onSelectFormat={setSelectedFormat}
          onlyVerified={onlyVerified}
          onToggleVerified={setOnlyVerified}
          contestCounts={{
            total: filteredContests.length,
            mega: megaContestsCount,
            major: majorContestsCount,
            online: onlineContestsCount,
          }}
        />

        {/* Split-Pane Results Grid (Parallel.ai UI pattern) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Contest Cards Stream (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
              <span>
                SHOWING <strong className="text-zinc-200">{filteredContests.length}</strong> VERIFIED CONTESTS
              </span>
              <span>Sorted by Start Time & Prize Pool</span>
            </div>

            {filteredContests.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30 space-y-3">
                <Trophy className="w-8 h-8 text-zinc-600 mx-auto" />
                <h4 className="text-sm font-semibold text-zinc-300 font-mono">No matching contests found</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try broadening your search filters, or use the &ldquo;Ingest Link&rdquo; button to parse any contest URL directly with TinyFish.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPlatform("all");
                    setSelectedTier("all");
                    setSelectedFormat("all");
                    setSearchQuery("");
                  }}
                  className="font-mono text-xs"
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              filteredContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  isSelected={selectedContest?.id === contest.id}
                  onSelect={(c) => setSelectedContest(c)}
                  onDeepResearch={handleDeepResearch}
                />
              ))
            )}
          </div>

          {/* Right Column: Split-Pane Inspector (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-[calc(100vh-8rem)]">
            <DetailInspector
              contest={selectedContest}
              onRunDeepResearch={handleDeepResearch}
              isDeepResearching={isDeepResearching}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 mt-auto py-6 bg-zinc-950 text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            Built with <strong className="text-zinc-300">coss.com/ui</strong> &bull; Powered by{" "}
            <a href="https://tinyfish.ai" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
              TinyFish.ai
            </a>{" "}
            &amp;{" "}
            <a href="https://parallel.ai" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
              Parallel.ai
            </a>
          </div>
          <div>Live tracker for competitive programming, DSA challenges &amp; informatics olympiads</div>
        </div>
      </footer>

      {/* Real-time Link Ingest Modal */}
      <AddContestModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onContestAdded={handleContestAdded}
      />
    </div>
  );
}
