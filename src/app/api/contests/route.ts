import { NextRequest, NextResponse } from "next/server";
import { contestStore } from "@/lib/contest-store";
import { liveAggregator } from "@/lib/live-aggregator";
import { Contest } from "@/types/contest";

let lastFetchTimestamp = 0;
const CACHE_DURATION_MS = 60 * 1000; // 1 minute cache for live aggregator

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || undefined;
  const platform = searchParams.get("platform") || undefined;
  const prizeTier = searchParams.get("prizeTier") || undefined;
  const format = searchParams.get("format") || undefined;
  const onlyVerified = searchParams.get("onlyVerified") === "true";
  const minPrize = searchParams.get("minPrize") ? Number(searchParams.get("minPrize")) : undefined;

  // Refresh live contests from CLIST & Codeforces API if cache expired
  if (Date.now() - lastFetchTimestamp > CACHE_DURATION_MS) {
    try {
      const liveItems = await liveAggregator.fetchLiveContests();
      if (liveItems && liveItems.length > 0) {
        liveItems.forEach((c) => contestStore.addOrUpdate(c));
        lastFetchTimestamp = Date.now();
      }
    } catch (e) {
      console.warn("Live contest background sync error:", e);
    }
  }

  const results = contestStore.filter({
    searchQuery: q,
    platform,
    prizeTier,
    format,
    onlyVerified,
    minPrizeUSD: minPrize,
  });

  return NextResponse.json({
    success: true,
    total: results.length,
    contests: results,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Contest;
    if (!body.title || !body.url) {
      return NextResponse.json({ success: false, error: "Title and URL are required" }, { status: 400 });
    }

    contestStore.addOrUpdate(body);
    return NextResponse.json({ success: true, contest: body });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
