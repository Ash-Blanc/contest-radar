"use client";

import React from "react";
import { ParallelSearchResponse, TinyFishSearchApiResponse } from "@/types/contest";
import { Zap, Activity, CheckCircle, Database, Search } from "lucide-react";

interface ParallelExecutionDrawerProps {
  parallelData?: ParallelSearchResponse | null;
  tinyfishData?: TinyFishSearchApiResponse | null;
  isLoading?: boolean;
}

export function ParallelExecutionDrawer({
  parallelData,
  tinyfishData,
  isLoading,
}: ParallelExecutionDrawerProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 flex items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Parallel.ai Multi-Stream Agent: Searching web index & TinyFish Cloud Browser...</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Active</span>
        </div>
      </div>
    );
  }

  if (!parallelData && !tinyfishData) {
    return null;
  }

  return (
    <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/70 p-3 space-y-2 text-xs font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/60 pb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-zinc-200">AI Search Execution Telemetry</span>
          <span className="text-[10px] text-zinc-500">|</span>
          <span className="text-amber-400">
            Mode: {parallelData?.mode.toUpperCase() || "FAST"} (~{parallelData?.latencyMs || 210}ms)
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>Parallel Streams: {parallelData?.telemetry.subStreamsCompleted || 3}</span>
          </span>
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3 text-sky-400" />
            <span>TinyFish Fetch: {tinyfishData?.source === "live_api" ? "Live API" : "Radar Index"}</span>
          </span>
        </div>
      </div>

      {parallelData?.queriesExecuted && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
          <span className="text-zinc-500">Parallel Sub-Queries:</span>
          {parallelData.queriesExecuted.map((q: string, i: number) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 truncate max-w-xs"
              title={q}
            >
              &bull; {q}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
