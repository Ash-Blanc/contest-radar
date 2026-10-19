"use client";

import React, { useState } from "react";
import { Contest } from "@/types/contest";
import { PrizeBadge } from "./PrizeBadge";
import { CountdownTimer } from "./CountdownTimer";
import { PlatformIcon } from "./PlatformIcon";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { formatUSD, formatDateTime, formatDuration } from "@/lib/utils";
import { generateGoogleCalendarUrl, downloadICS } from "./CalendarExport";
import {
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  Trophy,
  Copy,
  Check,
  Compass,
  FileText,
  Flame,
  Share2,
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
  const [activeTab, setActiveTab] = useState<"prizes" | "intelligence" | "evidence">("prizes");
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);
  const [copiedAnnouncement, setCopiedAnnouncement] = useState(false);

  if (!contest) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center border rounded-2xl border-dashed border-zinc-800 text-zinc-500 bg-zinc-950/40">
        <Compass className="w-10 h-10 mb-3 text-zinc-600 animate-spin" style={{ animationDuration: "20s" }} />
        <h4 className="text-sm font-semibold text-zinc-300 mb-1 font-mono">Select a Contest to Inspect</h4>
        <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
          Click any card to inspect Parallel.ai verified evidence, prize breakdown tables, and real-time source citations.
        </p>
      </div>
    );
  }

  const copyExcerpt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(text);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  const copyAnnouncementMarkdown = () => {
    const md = `🏆 **${contest.title}**
💰 **Prize Pool:** ${contest.prizeDescription}
📅 **Start Time:** ${formatDateTime(contest.startTime)}
⏱ **Duration:** ${formatDuration(contest.durationSeconds)}
🌐 **Platform:** ${contest.platformLabel} (${contest.format})
🔗 **Register:** ${contest.url}`;
    navigator.clipboard.writeText(md);
    setCopiedAnnouncement(true);
    setTimeout(() => setCopiedAnnouncement(false), 2000);
  };

  return (
    <div className="h-full flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-2xl overflow-hidden shadow-2xl">
      {/* Top Inspector Header */}
      <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0">
            <PlatformIcon platform={contest.platform} size={15} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-zinc-200">
              {contest.platformLabel}
            </span>
            <span className="text-[10px] text-zinc-500 block font-mono">
              ID: {contest.slug.slice(0, 18)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyAnnouncementMarkdown}
            title="Copy formatted Discord/Telegram announcement"
            className="text-xs font-mono text-zinc-400 hover:text-zinc-200 h-8 px-2"
          >
            {copiedAnnouncement ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Share2 className="w-3.5 h-3.5 mr-1" />}
            <span>Share</span>
          </Button>

          <a
            href={generateGoogleCalendarUrl(contest)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono h-8 px-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
          >
            <Calendar className="w-3 h-3 text-sky-400" />
            <span>Google Cal</span>
          </a>

          {onClose && (
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300 text-xs px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="grid grid-cols-3 border-b border-zinc-800/80 bg-zinc-900/30 text-xs font-mono">
        <button
          onClick={() => setActiveTab("prizes")}
          className={`py-2.5 text-center font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === "prizes"
              ? "border-amber-400 text-amber-300 bg-amber-500/5"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Prize Pool</span>
        </button>

        <button
          onClick={() => setActiveTab("intelligence")}
          className={`py-2.5 text-center font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === "intelligence"
              ? "border-purple-400 text-purple-300 bg-purple-500/5"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Intel</span>
        </button>

        <button
          onClick={() => setActiveTab("evidence")}
          className={`py-2.5 text-center font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === "evidence"
              ? "border-emerald-400 text-emerald-300 bg-emerald-500/5"
              : "border-transparent text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Evidence ({contest.evidence.length})</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Title & Timing Header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <PrizeBadge tier={contest.prizeTier} amountUSD={contest.prizePoolUSD} size="lg" />
            <CountdownTimer targetISO={contest.startTime} isOngoing={contest.status === "ongoing"} />
          </div>
          <h2 className="text-lg font-bold text-zinc-100 mb-2 leading-tight">
            {contest.title}
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {contest.description}
          </p>
        </div>

        {/* Schedule & Metadata Bento Box */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Start Time</span>
            <span className="text-zinc-200 font-medium">{formatDateTime(contest.startTime)}</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Duration</span>
            <span className="text-zinc-200 font-medium">{formatDuration(contest.durationSeconds)}</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Format & Mode</span>
            <span className="text-zinc-200 capitalize font-medium">{contest.format}</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Eligibility</span>
            <span className="text-zinc-200 truncate block font-medium" title={contest.eligibility}>
              {contest.eligibility}
            </span>
          </div>
        </div>

        {/* TAB 1: Prize Distribution */}
        {activeTab === "prizes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Verified Reward Distribution
              </h4>
              <span className="text-[11px] font-mono text-amber-300 font-semibold">
                {contest.prizePoolUSD ? formatUSD(contest.prizePoolUSD) : "Prized"}
              </span>
            </div>

            <div className="rounded-xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800/70 bg-zinc-900/40">
              {contest.prizeBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 text-xs font-mono hover:bg-zinc-800/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-zinc-200 font-medium">{item.place}</span>
                  </div>
                  <span className="text-amber-400 font-bold">{item.reward}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 space-y-1">
              <span className="text-zinc-300 font-semibold block uppercase text-[10px]">Financial Verification</span>
              <p>Prize amounts and distribution tiers verified via official contest sponsor announcements.</p>
            </div>
          </div>
        )}

        {/* TAB 2: Deep Intelligence (Parallel Task) */}
        {activeTab === "intelligence" && (
          <div className="space-y-4">
            {contest.deepResearch ? (
              <div className="rounded-xl border border-purple-900/50 bg-purple-950/20 p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Parallel.ai Intelligence Synthesis
                  </h4>
                  <Badge variant="purple" size="sm">
                    {contest.deepResearch.difficultyRating}
                  </Badge>
                </div>

                <p className="text-xs text-purple-200/90 leading-relaxed font-sans">
                  {contest.deepResearch.overview}
                </p>

                {contest.deepResearch.recommendedPreparation.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono text-purple-400 block font-bold uppercase tracking-wider">
                      Strategic Preparation & Win Tips:
                    </span>
                    <ul className="text-xs space-y-1.5 text-zinc-300 font-sans">
                      {contest.deepResearch.recommendedPreparation.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-400 font-mono font-bold">›</span>
                          <span className="leading-snug">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {contest.deepResearch.keyRules.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-purple-900/30">
                    <span className="text-[11px] font-mono text-purple-400 block font-bold uppercase tracking-wider">
                      Anti-Cheat & Contest Rules:
                    </span>
                    <ul className="text-xs space-y-1 text-zinc-400 font-sans">
                      {contest.deepResearch.keyRules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-zinc-500 font-mono">&bull;</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-xs font-mono text-zinc-500">
                Deep research not yet run. Click &ldquo;Re-scan Intelligence&rdquo; below.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Evidence & Citations */}
        {activeTab === "evidence" && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Parallel Basis Grounding Citations
            </h4>

            {contest.evidence.map((ev, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2 text-xs relative group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="uppercase text-emerald-400 font-bold">
                    Source: {ev.source.replace("_", " ")}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400/90 font-semibold">
                      Confidence: {Math.round(ev.confidenceScore * 100)}%
                    </span>
                    <button
                      onClick={() => copyExcerpt(ev.excerpt)}
                      className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded"
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

                <p className="text-zinc-300 font-mono text-[11px] italic bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800/70 leading-relaxed">
                  &ldquo;{ev.excerpt}&rdquo;
                </p>

                {ev.url && (
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline pt-1 font-mono"
                  >
                    <span>Source: {ev.url.replace(/https?:\/\/(www\.)?/, "").slice(0, 36)}...</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/80 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadICS(contest)}
          className="font-mono text-xs"
        >
          <Calendar className="w-3.5 h-3.5 mr-1" />
          Export .ICS
        </Button>

        <div className="flex items-center gap-2">
          {onRunDeepResearch && (
            <Button
              variant="secondary"
              size="sm"
              isLoading={isDeepResearching}
              onClick={() => onRunDeepResearch(contest)}
              className="font-mono text-xs text-purple-300 border-purple-800/40"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-400" />
              Re-scan AI
            </Button>
          )}

          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-8 px-4 text-xs font-mono font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors shadow-[0_0_14px_rgba(245,158,11,0.25)]"
          >
            <span>Register Now</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
