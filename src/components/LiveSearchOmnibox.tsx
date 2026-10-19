"use client";

import React, { useState } from "react";
import { Search, Zap, Sparkles, Plus, RefreshCw, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface LiveSearchOmniboxProps {
  onSearch: (query: string, mode: "turbo" | "fast" | "advanced") => void;
  onOpenAddModal: () => void;
  isLoading?: boolean;
}

export function LiveSearchOmnibox({
  onSearch,
  onOpenAddModal,
  isLoading,
}: LiveSearchOmniboxProps) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"turbo" | "fast" | "advanced">("fast");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, mode);
  };

  const samplePrompts = [
    "Prized Codeforces rounds",
    "Cash prizes >= $10,000",
    "Meta Hacker Cup",
    "AtCoder World Tour Finals",
    "IEEEXtreme virtual",
    "Jane Street / Citadel DSA",
  ];

  return (
    <div className="w-full space-y-3">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4 text-zinc-400" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search live CP/DSA contests (e.g. 'Codeforces cash prize', 'Meta Hacker Cup', 'div1+div2 $10k')..."
            className="w-full h-12 pl-10 pr-28 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/80 transition-all font-sans shadow-lg"
          />

          <div className="absolute inset-y-0 right-2 flex items-center gap-1.5">
            {/* Mode Switcher */}
            <div className="flex items-center rounded-lg bg-zinc-950 p-0.5 border border-zinc-800 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setMode("turbo")}
                title="Parallel Turbo Mode (~180ms)"
                className={`px-2 py-1 rounded transition-colors ${
                  mode === "turbo"
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Turbo
              </button>
              <button
                type="button"
                onClick={() => setMode("fast")}
                title="Parallel Fast Mode (~340ms, Recommended)"
                className={`px-2 py-1 rounded transition-colors ${
                  mode === "fast"
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Fast
              </button>
              <button
                type="button"
                onClick={() => setMode("advanced")}
                title="Parallel Advanced Mode (~850ms, Deep Reasoning)"
                className={`px-2 py-1 rounded transition-colors ${
                  mode === "advanced"
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Deep
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="glow"
          size="lg"
          isLoading={isLoading}
          className="font-mono text-xs px-5 h-12 shrink-0 rounded-xl"
        >
          <Sparkles className="w-4 h-4 mr-1.5" />
          <span>Track</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onOpenAddModal}
          className="h-12 px-3.5 shrink-0 rounded-xl font-mono text-xs border-zinc-700/80"
          title="Scrape & monitor any contest URL (e.g. CF blog 157611) via TinyFish Fetch"
        >
          <Plus className="w-4 h-4 mr-1 text-emerald-400" />
          <span>Ingest URL</span>
        </Button>
      </form>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] font-mono text-zinc-400 mr-1 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Suggested:</span>
        </span>
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => {
              setQuery(prompt);
              onSearch(prompt, mode);
            }}
            className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800/80 font-mono text-[11px] transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
