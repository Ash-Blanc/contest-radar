"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Contest } from "@/types/contest";
import { Sparkles, Globe, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface AddContestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContestAdded: (contest: Contest) => void;
}

export function AddContestModal({ isOpen, onClose, onContestAdded }: AddContestModalProps) {
  const [url, setUrl] = useState("https://codeforces.com/blog/entry/157611");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedContest, setExtractedContest] = useState<Contest | null>(null);

  if (!isOpen) return null;

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setExtractedContest(null);

    try {
      const res = await fetch("/api/fetch-contest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch and parse contest URL");
      }

      setExtractedContest(data.contest);
      onContestAdded(data.contest);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching the URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-zinc-100 text-sm font-mono uppercase tracking-wider">
              TinyFish Real-Time Contest Ingest
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-zinc-200 font-mono px-2 py-1 rounded"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">
          Paste any contest link, Codeforces blog announcement (e.g. Pinely, VK Cup, Good Bye), or AtCoder post.
          TinyFish.ai Cloud Browser Fetch extracts the noise-free content and automatically parses prize pools and schedules.
        </p>

        <form onSubmit={handleFetch} className="space-y-3">
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              CONTEST OR ANNOUNCEMENT URL
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://codeforces.com/blog/entry/157611"
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={onClose} className="font-mono text-xs">
              Cancel
            </Button>
            <Button
              variant="glow"
              size="sm"
              type="submit"
              isLoading={isLoading}
              className="font-mono text-xs"
            >
              <span>Ingest & Verify</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </form>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {extractedContest && (
          <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-800/50 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Contest Successfully Ingested & Indexed!</span>
            </div>
            <div className="text-xs text-zinc-200 font-medium">
              {extractedContest.title}
            </div>
            <div className="text-xs font-mono text-amber-400 font-semibold">
              Prize: {extractedContest.prizeDescription}
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="w-full font-mono text-xs"
              >
                View in Radar Feed
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
