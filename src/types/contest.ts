export type PlatformType =
  | "codeforces"
  | "atcoder"
  | "leetcode"
  | "codechef"
  | "topcoder"
  | "hackerrank"
  | "meta"
  | "ieeextreme"
  | "icpc"
  | "kaggle"
  | "unstop"
  | "yandex"
  | "other";

export type PrizeTier = "mega" | "major" | "standard" | "swag";

export interface PrizeBreakdownItem {
  place: string;
  reward: string;
  usdValue?: number;
}

export interface ContestEvidence {
  source: "tinyfish_search" | "tinyfish_fetch" | "parallel_search" | "parallel_task" | "clist" | "codeforces_api" | "verified";
  timestamp: string;
  url?: string;
  excerpt: string;
  confidenceScore: number; // 0 to 1
}

export interface DeepResearchIntelligence {
  overview: string;
  difficultyRating: "Beginner" | "Intermediate" | "Hard" | "Grandmaster" | "World Finalist";
  expectedParticipants: string;
  prizeEligibilityNotes: string;
  pastWinnersOrStats: string[];
  recommendedPreparation: string[];
  keyRules: string[];
}

export interface Contest {
  id: string;
  slug: string;
  title: string;
  description: string;
  platform: PlatformType;
  platformLabel: string;
  url: string;
  sourceAnnouncementUrl: string;
  startTime: string; // ISO
  endTime: string; // ISO
  durationSeconds: number;
  status: "upcoming" | "ongoing" | "completed";
  
  // Prize tracking
  isPrized: boolean;
  prizePoolUSD: number | null;
  prizeDescription: string;
  prizeTier: PrizeTier;
  prizeBreakdown: PrizeBreakdownItem[];
  
  // Metadata & Rules
  eligibility: string;
  format: "online" | "virtual" | "hybrid" | "in-person";
  tags: string[];
  ratingImpact: "Rated" | "Unrated" | "Open";
  
  // Intelligence & Evidence
  evidence: ContestEvidence[];
  deepResearch?: DeepResearchIntelligence;
  isFeatured?: boolean;
  isVerifiedPrize: boolean;
}

export interface ContestFilterState {
  searchQuery: string;
  platform: PlatformType | "all";
  prizeTier: PrizeTier | "all";
  format: "all" | "online" | "in-person" | "hybrid";
  status: "all" | "upcoming" | "ongoing" | "completed";
  onlyVerified: boolean;
  minPrizeUSD: number;
}

export type { ParallelSearchResponse, ParallelSearchResultItem } from "@/lib/parallel/client";
export type { TinyFishSearchApiResponse, TinyFishSearchResultItem, TinyFishFetchResult } from "@/lib/tinyfish/client";
