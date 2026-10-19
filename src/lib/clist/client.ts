/**
 * CLIST.by Official API Client (v4)
 * Docs: https://clist.by/api/v4/doc/
 */

export interface CLISTContestObject {
  id: number;
  resource: string;
  resource_id: number;
  event: string;
  start: string;
  end: string;
  duration: number; // in seconds
  href: string;
  host?: string;
  problems?: any;
}

export class CLISTClient {
  private username: string;
  private apiKey: string;
  private baseUrl = "https://clist.by/api/v4";

  constructor(username?: string, apiKey?: string) {
    this.username = username || process.env.CLIST_USERNAME || "";
    this.apiKey = apiKey || process.env.CLIST_API_KEY || "";
  }

  get isConfigured(): boolean {
    return Boolean(this.username && this.apiKey);
  }

  /**
   * Fetch live upcoming competitive programming contests
   */
  async getUpcomingContests(limit = 40): Promise<CLISTContestObject[]> {
    if (!this.isConfigured) {
      return [];
    }

    try {
      const resources = "codeforces.com,atcoder.jp,leetcode.com,codechef.com,kaggle.com,topcoder.com,ieeextreme.org,icpc.global";
      const url = `${this.baseUrl}/contest/?username=${encodeURIComponent(this.username)}&api_key=${encodeURIComponent(this.apiKey)}&resource__in=${resources}&upcoming=true&order_by=start&limit=${limit}`;

      const res = await fetch(url, {
        headers: { "Accept": "application/json" },
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        const data = await res.json();
        return data.objects || [];
      } else {
        console.warn("CLIST API error:", res.status, await res.text());
      }
    } catch (err) {
      console.warn("CLIST fetch failed:", err);
    }
    return [];
  }
}

export const clist = new CLISTClient();
