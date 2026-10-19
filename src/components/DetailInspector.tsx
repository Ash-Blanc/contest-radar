"use client";

import React, { useState } from "react";
import { Contest } from "@/types/contest";
import { PrizeBadge } from "./PrizeBadge";
import { CountdownTimer } from "./CountdownTimer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { formatUSD, formatDateTime, formatDuration } from "@/lib/utils";
import { generateGoogleCalendarUrl, downloadICS } from "./CalendarExport";
import {
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  BookOpen,
  Trophy,
  CheckCircle2,
  FileText,
  Compass,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

interface DetailInspectorProps {
  contest: Contest | null;
  onClose?: () => void;
  onRunDeepResearch?: (contest: Contest) => void;
  isDeepResearching?: boolean;
}

export function DetailInspector({
  contest,
  onClose,
  onRunDeepResearch,
  isDeepResearching,
}: DetailInspectorProps) {
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  if (!contest) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center border rounded-xl border-dashed border-zinc-800 text-zinc-500">
        <Compass className="w-10 h-10 mb-3 text-zinc-600 animate-spin" style={{ animationDuration: "20s" }} />
        <h4 className="text-sm font-medium text-zinc-400 mb-1">Select a Contest to Inspect</h4>
        <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
          Click any card to inspect Parallel.ai verified evidence, prize breakdown tables, and TinyFish source excerpts.
        </p>
      </div>
    );
  }

  const copyExcerpt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(text);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  return (
    <div className="h-full flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Top Inspector Bar */}
      <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="glow" size="sm" className="font-mono">
            {contest.platformLabel}
          </Badge>
          <span className="text-xs font-mono text-zinc-400">
            ID: {contest.slug.slice(0, 16)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={generateGoogleCalendarUrl(contest)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            <Calendar className="w-3 h-3" />
            <span>Google Cal</span>
          </a>

          {onClose && (
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300 text-xs px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Title & Countdown */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <PrizeBadge tier={contest.prizeTier} amountUSD={contest.prizePoolUSD} size="lg" />
            <CountdownTimer targetISO={contest.startTime} isOngoing={contest.status === "ongoing"} />
          </div>
          <h2 className="text-lg font-bold text-zinc-100 mb-2 leading-tight">
            {contest.title}
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {contest.description}
          </p>
        </div>

        {/* Schedule & Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
          <div>
            <span className="text-zinc-500 block text-[10px]">START TIME</span>
            <span className="text-zinc-200">{formatDateTime(contest.startTime)}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px]">DURATION</span>
            <span className="text-zinc-200">{formatDuration(contest.durationSeconds)}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px]">FORMAT & VENUE</span>
            <span className="text-zinc-200 capitalize">{contest.format}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px]">ELIGIBILITY</span>
            <span className="text-zinc-200 truncate block" title={contest.eligibility}>
              {contest.eligibility}
            </span>
          </div>
        </div>

        {/* Prize Breakdown Table */}
        {contest.prizeBreakdown && contest.prizeBreakdown.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Prize Structure Breakdown
              </h4>
              <span className="text-[11px] font-mono text-zinc-400">
                Total Pool: {contest.prizePoolUSD ? formatUSD(contest.prizePoolUSD) : "Prized"}
              </span>
            </div>

            <div className="rounded-lg border border-zinc-800/80 overflow-hidden divide-y divide-zinc-800/60 bg-zinc-900/30">
              {contest.prizeBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 text-xs font-mono hover:bg-zinc-800/30">
                  <span className="text-zinc-300 font-medium">{item.place}</span>
                  <span className="text-amber-400 font-semibold">{item.reward}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deep Research Section (Parallel.ai Task) */}
        {contest.deepResearch && (
          <div className="rounded-lg border border-purple-900/40 bg-purple-950/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-semibold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Parallel.ai Deep Research Synthesis
              </h4>
              <Badge variant="purple" size="sm">
                {contest.deepResearch.difficultyRating}
              </Badge>
            </div>

            <p className="text-xs text-purple-200/90 leading-relaxed">
              {contest.deepResearch.overview}
            </p>

            {contest.deepResearch.recommendedPreparation.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-mono text-purple-400 block font-semibold">
                  RECOMMENDED WIN STRATEGY:
                </span>
                <ul className="text-xs space-y-1 text-zinc-300">
                  {contest.deepResearch.recommendedPreparation.map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-400 font-mono">›</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Grounding Evidence & Citations */}
        {contest.evidence && contest.evidence.length > 0 && (
          <div>
            <h4 className="text-xs font-mono font-semibold text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verifiable Evidence & Source Citations
            </h4>

            <div className="space-y-2">
              {contest.evidence.map((ev, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/60 space-y-1.5 text-xs relative group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="uppercase text-emerald-400/90 font-semibold">
                      Source: {ev.source.replace("_", " ")}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>Confidence: {Math.round(ev.confidenceScore * 100)}%</span>
                      <button
                        onClick={() => copyExcerpt(ev.excerpt)}
                        className="text-zinc-500 hover:text-zinc-300"
                        title="Copy excerpt"
                      >
                        {copiedQuote === ev.excerpt ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-zinc-300 font-mono text-[11px] italic bg-zinc-950/70 p-2 rounded border border-zinc-800/60 leading-relaxed">
                    &ldquo;{ev.excerpt}&rdquo;
                  </p>

                  {ev.url && (
                    <a
                      href={ev.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400/90 hover:underline pt-1 font-mono"
                    >
                      <span>Announcement: {ev.url.replace(/https?:\/\/(www\.)?/, "").slice(0, 36)}...</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/70 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadICS(contest)}
          className="font-mono text-xs"
        >
          <Calendar className="w-3.5 h-3.5 mr-1" />
          Export .ICS Event
        </Button>

        <div className="flex items-center gap-2">
          {onRunDeepResearch && (
            <Button
              variant="secondary"
              size="sm"
              isLoading={isDeepResearching}
              onClick={() => onRunDeepResearch(contest)}
              className="font-mono text-xs text-purple-300"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-400" />
              Re-scan Intelligence
            </Button>
          )}

          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-8 px-4 text-xs font-mono font-medium rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors shadow-sm"
          >
            <span>Register & Compete</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
