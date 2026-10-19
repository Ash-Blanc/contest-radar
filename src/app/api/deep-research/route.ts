import { NextRequest, NextResponse } from "next/server";
import { parallel } from "@/lib/parallel/client";

export async function POST(request: NextRequest) {
  try {
    const { title, url } = await request.json();
    if (!title) {
      return NextResponse.json({ success: false, error: "Contest title is required" }, { status: 400 });
    }

    const research = await parallel.runDeepResearch(title, url || "https://codeforces.com");

    return NextResponse.json({
      success: true,
      research,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
