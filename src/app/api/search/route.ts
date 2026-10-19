import { NextRequest, NextResponse } from "next/server";
import { searchOrchestrator } from "@/lib/search-orchestrator";

export async function POST(request: NextRequest) {
  try {
    const { query, mode } = await request.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ success: false, error: "A search query string is required" }, { status: 400 });
    }

    const searchMode = mode === "turbo" || mode === "advanced" ? mode : "fast";
    const result = await searchOrchestrator.executeSearch(query, searchMode);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
