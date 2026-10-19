/**
 * Codeforces Direct Public API Client
 * Docs: https://codeforces.com/apiHelp
 */

export interface CodeforcesContest {
  id: number;
  name: string;
  type: string;
  phase: "BEFORE" | "CODING" | "PENDING_SYSTEM_TEST" | "SYSTEM_TEST" | "FINISHED";
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
}

export class CodeforcesClient {
  private baseUrl = "https://codeforces.com/api";

  async getUpcomingContests(): Promise<CodeforcesContest[]> {
    try {
      const res = await fetch(`${this.baseUrl}/contest.list?gym=false`, {
        signal: AbortSignal.timeout(6000),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "OK" && Array.isArray(data.result)) {
          return data.result.filter((c: CodeforcesContest) => c.phase === "BEFORE" || c.phase === "CODING");
        }
      }
    } catch (err) {
      console.warn("Direct Codeforces API fetch failed:", err);
    }
    return [];
  }
}

export const codeforces = new CodeforcesClient();
