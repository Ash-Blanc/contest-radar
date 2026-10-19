"use client";

import React, { useEffect, useState } from "react";
import { getTimeRemaining } from "@/lib/utils";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetISO: string;
  isOngoing?: boolean;
}

export function CountdownTimer({ targetISO, isOngoing }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    totalSeconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeRemaining(targetISO));

    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetISO]);

  if (isOngoing) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-950/60 border border-rose-800/80 text-rose-400 font-mono text-xs font-semibold shadow-[0_0_12px_rgba(244,63,94,0.2)]">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        <span>LIVE NOW</span>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">
        <Clock className="w-3.5 h-3.5 text-zinc-500" />
        <span>Tracking...</span>
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 font-mono text-xs">
        <span>Concluded</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-200 font-mono text-xs shadow-inner">
      <Clock className="w-3.5 h-3.5 text-zinc-400" />
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <>
            <span className="font-semibold text-zinc-100">{timeLeft.days}</span>
            <span className="text-zinc-500 text-[10px]">d</span>
          </>
        )}
        <span className="font-semibold text-zinc-100">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-zinc-500 text-[10px]">h</span>
        <span className="text-zinc-600">:</span>
        <span className="font-semibold text-zinc-100">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-zinc-500 text-[10px]">m</span>
        <span className="text-zinc-600">:</span>
        <span className="font-semibold text-amber-400/90 w-4 inline-block text-right">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-zinc-500 text-[10px]">s</span>
      </div>
    </div>
  );
}
