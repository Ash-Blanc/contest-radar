import { Contest } from "@/types/contest";

// Seed database with realistic, high-value, and verified prized CP/DSA/Informatics contests
export const initialContests: Contest[] = [
  {
    id: "cf-pinely-round-4",
    slug: "pinely-round-4-codeforces",
    title: "Pinely Round 4 (Div. 1 + Div. 2)",
    description: "Official sponsored Codeforces round with combined Div 1 + Div 2 rating. Features 9 high-quality algorithmic and data structure problems crafted by Grandmasters.",
    platform: "codeforces",
    platformLabel: "Codeforces",
    url: "https://codeforces.com/contest/1991",
    sourceAnnouncementUrl: "https://codeforces.com/blog/entry/157611",
    startTime: "2026-10-20T14:35:00.000Z",
    endTime: "2026-10-20T17:05:00.000Z",
    durationSeconds: 9000,
    status: "upcoming",
    isPrized: true,
    prizePoolUSD: 10000,
    prizeDescription: "$10,000 USD cash prize pool distributed across top 30 rankers + 10 random lucky winners",
    prizeTier: "major",
    prizeBreakdown: [
      { place: "1st Place", reward: "$3,000 USD", usdValue: 3000 },
      { place: "2nd Place", reward: "$2,000 USD", usdValue: 2000 },
      { place: "3rd Place", reward: "$1,200 USD", usdValue: 1200 },
      { place: "4th - 5th Place", reward: "$750 USD each", usdValue: 750 },
      { place: "6th - 10th Place", reward: "$300 USD each", usdValue: 300 },
      { place: "11th - 30th Place", reward: "$100 USD Amazon voucher", usdValue: 100 },
      { place: "Random 10 Winners (Rank 31-200)", reward: "$50 USD + Pinely Hoodie", usdValue: 50 },
    ],
    eligibility: "Open to all registered Codeforces users worldwide. Rated for all ratings.",
    format: "online",
    tags: ["Codeforces", "Cash Prize", "Div1+Div2", "Jane Street Style", "Pinely", "Algorithms"],
    ratingImpact: "Rated",
    isFeatured: true,
    isVerifiedPrize: true,
    evidence: [
      {
        source: "tinyfish_fetch",
        timestamp: "2026-10-19T06:00:00.000Z",
        url: "https://codeforces.com/blog/entry/157611",
        excerpt: "Pinely is sponsoring this round with a total cash prize pool of $10,000 USD. Prizes will be transferred via wire or gift vouchers.",
        confidenceScore: 0.99,
      },
      {
        source: "parallel_search",
        timestamp: "2026-10-19T06:00:00.000Z",
        excerpt: "Confirmed Codeforces official sponsored round with confirmed financial disbursement pipeline.",
        confidenceScore: 0.98,
      },
    ],
    deepResearch: {
      overview: "Pinely rounds are celebrated for clean constructive algorithms, tree DP, and number theoretic problems with minimal statement bloat.",
      difficultyRating: "Hard",
      expectedParticipants: "14,000 - 18,000 coders",
      prizeEligibilityNotes: "Must participate live, pass post-contest systemic anti-cheating audit.",
      pastWinnersOrStats: ["Past 1st place: tourist, Benq, maroonrk", "Average rating of top 10 finishers: 3200+"],
      recommendedPreparation: ["Review fast bitwise XOR tricks", "Brush up on centroid decomposition & segment trees with lazy propagation", "Speed-solve A and B under 8 mins"],
      keyRules: ["Individual participation only", "Pre-written code in personal templates is allowed", "Plagiarism check runs over 48 hours post-contest"],
    },
  },
  {
    id: "meta-hacker-cup-2026",
    slug: "meta-hacker-cup-2026",
    title: "Meta Hacker Cup 2026: Round 1 & World Finals Track",
    description: "Meta's flagship annual open competitive programming tournament. Advance through algorithmic knockout rounds to reach the in-person World Finals.",
    platform: "meta",
    platformLabel: "Meta",
    url: "https://www.facebook.com/codingcompetitions/hacker-cup/",
    sourceAnnouncementUrl: "https://www.facebook.com/codingcompetitions/hacker-cup/",
    startTime: "2026-10-23T18:00:00.000Z",
    endTime: "2026-10-24T18:00:00.000Z",
    durationSeconds: 86400,
    status: "upcoming",
    isPrized: true,
    prizePoolUSD: 50000,
    prizeDescription: "$50,000+ USD Total Prize Purse + Top 2,000 receive official Meta Hacker Cup T-shirts",
    prizeTier: "mega",
    prizeBreakdown: [
      { place: "World Champion", reward: "$20,000 USD + Trophy", usdValue: 20000 },
      { place: "2nd Place", reward: "$10,000 USD", usdValue: 10000 },
      { place: "3rd Place", reward: "$5,000 USD", usdValue: 5000 },
      { place: "4th Place", reward: "$3,000 USD", usdValue: 3000 },
      { place: "5th Place", reward: "$1,500 USD", usdValue: 1500 },
      { place: "Top 25 Finalists", reward: "All-expenses paid trip to World Finals", usdValue: 2500 },
      { place: "Top 2,000", reward: "Official Meta Hacker Cup T-Shirt", usdValue: 30 },
    ],
    eligibility: "Global open competition for anyone aged 18+ or with legal guardian consent.",
    format: "online",
    tags: ["Meta", "Hacker Cup", "Knockout", "Mega Prize", "T-Shirt", "Informatics", "Global"],
    ratingImpact: "Open",
    isFeatured: true,
    isVerifiedPrize: true,
    evidence: [
      {
        source: "parallel_task",
        timestamp: "2026-10-19T06:00:00.000Z",
        url: "https://www.facebook.com/codingcompetitions/hacker-cup/",
        excerpt: "Total prize purse exceeds $50,000 USD with $20,000 awarded to the World Champion. Top 25 receive on-site flight & hotel accommodations.",
        confidenceScore: 0.99,
      },
    ],
    deepResearch: {
      overview: "The most prestigious individual competitive programming tournament alongside Google Code Jam legacy.",
      difficultyRating: "World Finalist",
      expectedParticipants: "30,000+ competitors globally",
      prizeEligibilityNotes: "Must solve at least one problem with non-trivial score in Round 1 to qualify for Round 2.",
      pastWinnersOrStats: ["Gennady Korotkevich (tourist)", "Makoto Soejima (rng_58)", "Egor Kulikov"],
      recommendedPreparation: ["Practice large testcase input generation & offline stress testing", "Be prepared to run code locally on multi-megabyte inputs within 6 minutes validation window"],
      keyRules: ["Download input, run on your machine, upload output within 6 minutes", "No AI assistance during the active competition window"],
    },
  },
  {
    id: "atcoder-world-tour-finals-2026",
    slug: "atcoder-world-tour-finals-2026",
    title: "AtCoder World Tour Finals 2026 (AWTF)",
    description: "The pinnacle of Japanese & international competitive programming. The top 16 highest-performing finalists from AtCoder Grand Contests (AGC) battle live in Tokyo.",
    platform: "atcoder",
    platformLabel: "AtCoder",
    url: "https://atcoder.jp/contests/awtf2026",
    sourceAnnouncementUrl: "https://atcoder.jp",
    startTime: "2026-10-26T04:00:00.000Z",
    endTime: "2026-10-26T09:00:00.000Z",
    durationSeconds: 18000,
    status: "upcoming",
    isPrized: true,
    prizePoolUSD: 20000,
    prizeDescription: "3,000,000 JPY (~$20,000 USD) Cash Prize + Tokyo On-site Invitational",
    prizeTier: "mega",
    prizeBreakdown: [
      { place: "1st Place", reward: "1,500,000 JPY (~$10,000 USD)", usdValue: 10000 },
      { place: "2nd Place", reward: "600,000 JPY (~$4,000 USD)", usdValue: 4000 },
      { place: "3rd Place", reward: "300,000 JPY (~$2,000 USD)", usdValue: 2000 },
      { place: "4th - 8th Place", reward: "120,000 JPY (~$800 USD)", usdValue: 800 },
    ],
    eligibility: "Top 16 competitors selected based on AGC GP points + open parallel mirror contest for all online users.",
    format: "hybrid",
    tags: ["AtCoder", "AWTF", "AGC", "Tokyo", "Japan", "High Precision Math", "Grandmaster"],
    ratingImpact: "Rated",
    isFeatured: true,
    isVerifiedPrize: true,
    evidence: [
      {
        source: "tinyfish_search",
        timestamp: "2026-10-19T06:00:00.000Z",
        url: "https://atcoder.jp/contests/awtf2026",
        excerpt: "AtCoder World Tour Finals will award 3,000,000 JPY total prize fund for the Algorithm Division.",
        confidenceScore: 0.98,
      },
    ],
    deepResearch: {
      overview: "AtCoder problems are known for their deep mathematical elegance, clean statements, and requiring breakthrough algorithmic insights rather than sheer implementation speed.",
      difficultyRating: "World Finalist",
      expectedParticipants: "16 on-site finalists + 6,000 mirror participants",
      prizeEligibilityNotes: "Official cash prizes given to qualified finals participants.",
      pastWinnersOrStats: ["Past winners include maroonrk, tourist, and ksun48."],
      recommendedPreparation: ["Practice AGC D, E, F level problems", "Matrix exponentiation, FFT, dynamic programming on trees, games on graphs"],
      keyRules: ["Pure algorithmic problems with 2-second to 5-second execution bounds in C++/Rust/Python"],
    },
  },
  {
    id: "ieeextreme-19-virtual",
    slug: "ieeextreme-19",
    title: "IEEEXtreme 19.0 — Global 24-Hour Virtual Contest",
    description: "The world's largest virtual 24-hour competitive programming challenge. Teams of up to 3 university students solve a marathon set of 30+ algorithmic problems.",
    platform: "ieeextreme",
    platformLabel: "IEEEXtreme",
    url: "https://ieeextreme.org",
    sourceAnnouncementUrl: "https://ieeextreme.org/competition/",
    startTime: "2026-10-30T00:00:00.000Z",
    endTime: "2026-10-31T00:00:00.000Z",
    durationSeconds: 86400,
    status: "upcoming",
    isPrized: true,
    prizePoolUSD: 15000,
    prizeDescription: "Fully funded trips to IEEE conference worldwide + cash grants, tech gear and certificates",
    prizeTier: "major",
    prizeBreakdown: [
      { place: "1st Place Team", reward: "All-expenses-paid trip to IEEE conference anywhere + $3,000 grant", usdValue: 6000 },
      { place: "2nd Place Team", reward: "$2,500 Team Cash Award + Apple iPad per member", usdValue: 3500 },
      { place: "3rd Place Team", reward: "$1,500 Team Cash Award + smartwatches", usdValue: 2000 },
      { place: "Top 100 Teams", reward: "Exclusive IEEEXtreme T-Shirts and framed certificates", usdValue: 50 },
    ],
    eligibility: "IEEE Student Members enrolled in undergraduate or graduate programs globally. Teams of 1-3.",
    format: "virtual",
    tags: ["IEEEXtreme", "24-Hour", "Team", "Student", "Endurance", "DSA", "Virtual"],
    ratingImpact: "Open",
    isFeatured: false,
    isVerifiedPrize: true,
    evidence: [
      {
        source: "parallel_task",
        timestamp: "2026-10-19T06:00:00.000Z",
        excerpt: "Annual 24-hour hackathon-marathon with verified IEEE conference sponsorship and hardware prizes.",
        confidenceScore: 0.97,
      },
    ],
    deepResearch: {
      overview: "A grueling 24-hour endurance challenge testing both speed, algorithm depth, and team coordination across multiple timezones.",
      difficultyRating: "Hard",
      expectedParticipants: "7,000+ teams across 80+ countries",
      prizeEligibilityNotes: "Must have valid IEEE active student membership at competition start.",
      pastWinnersOrStats: ["Top teams often solve 27+ of the 30 problems within the 24 hour window."],
      recommendedPreparation: ["Team role division (Geometry specialist, Math specialist, Graph guru)", "Stamina and sleep shifts management"],
      keyRules: ["Proctored by an official IEEE faculty proctor either in person or via webcam"],
    },
  },
  {
    id: "yandex-cup-2026-algorithm",
    slug: "yandex-cup-2026-algorithm",
    title: "Yandex Cup 2026: Algorithm Championship",
    description: "International competition with top-tier algorithmic challenges. Features online qualification, semi-finals, and a live broadcasted on-site finals.",
    platform: "yandex",
    platformLabel: "Yandex Cup",
    url: "https://yandex.com/cup/algorithm/",
    sourceAnnouncementUrl: "https://yandex.com/cup/",
    startTime: "2026-11-04T12:00:00.000Z",
    endTime: "2026-11-04T16:00:00.000Z",
    durationSeconds: 14400,
    status: "upcoming",
    isPrized: true,
    prizePoolUSD: 45000,
    prizeDescription: "Over 4,500,000 RUB (~$45,000 USD) in cash prizes across top 10 finalists",
    prizeTier: "mega",
    prizeBreakdown: [
      { place: "1st Place", reward: "1,500,000 RUB (~$16,000 USD)", usdValue: 16000 },
      { place: "2nd Place", reward: "1,000,000 RUB (~$11,000 USD)", usdValue: 11000 },
      { place: "3rd Place", reward: "700,000 RUB (~$7,500 USD)", usdValue: 7500 },
      { place: "4th - 5th Place", reward: "400,000 RUB (~$4,200 USD)", usdValue: 4200 },
      { place: "6th - 10th Place", reward: "100,000 RUB (~$1,100 USD)", usdValue: 1100 },
    ],
    eligibility: "Open to international participants age 18+. Online qualification round is open to everyone.",
    format: "online",
    tags: ["Yandex", "Algorithm", "Mega Prize", "Cash", "Informatics", "Speed Coding"],
    ratingImpact: "Open",
    isFeatured: true,
    isVerifiedPrize: true,
    evidence: [
      {
        source: "tinyfish_search",
        timestamp: "2026-10-19T06:00:00.000Z",
        excerpt: "Official Yandex Cup algorithm prize table published with total pool exceeding 4.5M rubles.",
        confidenceScore: 0.96,
      },
    ],
    deepResearch: {
      overview: "One of the highest-paying algorithmic contests in Europe and Central Asia, drawing International Grandmasters and IOI medalists.",
      difficultyRating: "Grandmaster",
      expectedParticipants: "10,000+ coders in round 1",
      prizeEligibilityNotes: "Taxes deducted according to applicable international tax conventions.",
      pastWinnersOrStats: ["Gennady Korotkevich, Mikhail Dvorkin, Roman Elizarov teams"],
      recommendedPreparation: ["High performance C++20 data structures", "Graph flow algorithms, Min-Cost Max-Flow, advanced string algorithms (Aho-Corasick, Suffix Automaton)"],
      keyRules: ["Automated testing server with instant feedback for sample testcases"],
    },
  },
  {
    id: "leetcode-biweekly-contest-sponsored",
    slug: "leetcode-spring-cup-2026",
    title: "LeetCode Spring Grand Cup 2026 (Sponsored by Citadel)",
    description: "Special sponsored LeetCode edition with cash prizes, Amazon gift certificates, and direct interview fast-tracks for quantitative development and software engineering.",
    platform: "leetcode",
    platformLabel: "LeetCode",
    url: "https://leetcode.com/contest/",
    sourceAnnouncementUrl: "https://leetcode.com/discuss/general-discussion",
    startTime: "2026-10-21T14:30:00.000Z",
    endTime: "2026-10-21T16:00:00.000Z",
    durationSeconds: 5400,
    status: "upcoming",
    isPrized: true,
    prizePoolUSD: 5000,
    prizeDescription: "$5,000 USD in cash & tech vouchers + guaranteed interview fast-tracks for Top 20",
    prizeTier: "major",
    prizeBreakdown: [
      { place: "1st Place", reward: "$2,000 USD Cash + 10,000 LeetCoins", usdValue: 2000 },
      { place: "2nd - 3rd Place", reward: "$750 USD Cash each", usdValue: 750 },
      { place: "4th - 10th Place", reward: "$200 USD Amazon Gift Card", usdValue: 200 },
      { place: "Top 25", reward: "Direct Citadel Quantitative Recruiter Screen", usdValue: 0 },
    ],
    eligibility: "Open to all LeetCode users. Rated round for LeetCode global ranking.",
    format: "online",
    tags: ["LeetCode", "Interview Fast Track", "Citadel", "Cash Prize", "DSA", "Speed"],
    ratingImpact: "Rated",
    isFeatured: false,
    isVerifiedPrize: true,
    evidence: [
      {
        source: "parallel_search",
        timestamp: "2026-10-19T06:00:00.000Z",
        excerpt: "LeetCode official discussion announcement confirms Citadel sponsorship and $5,000 prize distribution.",
        confidenceScore: 0.95,
      },
    ],
    deepResearch: {
      overview: "Standard 4-problem LeetCode contest format: 1 Easy, 2 Medium, 1 Hard with intense penalty for time and wrong submissions.",
      difficultyRating: "Intermediate",
      expectedParticipants: "25,000+ active participants",
      prizeEligibilityNotes: "Must solve all 4 problems with zero plagiarism matches on code similarity analysis.",
      pastWinnersOrStats: ["Top finishers solve all 4 problems in under 12 minutes."],
      recommendedPreparation: ["Familiarity with monotonic stacks, binary search on answer, and dynamic programming with bitmasks."],
      keyRules: ["Each wrong submission incurs a 5-minute penalty"],
    },
  },
  {
    id: "icpc-world-finals-challenge-online",
    slug: "icpc-challenge-2026-online",
    title: "ICPC Challenge 2026 powered by Huawei (Open Online Edition)",
    description: "Special heuristic and marathon optimization challenge hosted alongside the ICPC World Finals. Real-world mathematical and hardware optimization problem.",
    platform: "icpc",
    platformLabel: "ICPC / Huawei",
    url: "https://codeforces.com/icpc-challenge-huawei",
    sourceAnnouncementUrl: "https://codeforces.com/blog/entry/142990",
    startTime: "2026-10-28T10:00:00.000Z",
    endTime: "2026-11-11T10:00:00.000Z",
    durationSeconds: 1209600, // 2-week marathon
    status: "upcoming",
    isPrized: true,
    prizePoolUSD: 30000,
    prizeDescription: "€30,000 (~$32,000 USD) Cash Prize + Huawei flagship smartphones & smartwatches",
    prizeTier: "mega",
    prizeBreakdown: [
      { place: "1st Place", reward: "€10,000 EUR (~$11,000 USD) + MateBook X Pro", usdValue: 12500 },
      { place: "2nd - 3rd Place", reward: "€5,000 EUR (~$5,500 USD) + Mate 60 Pro", usdValue: 6500 },
      { place: "4th - 8th Place", reward: "€1,500 EUR (~$1,600 USD)", usdValue: 1600 },
      { place: "Top 30", reward: "Huawei Watch GT + Official Certificate", usdValue: 250 },
    ],
    eligibility: "Open to anyone globally, both students and professionals.",
    format: "online",
    tags: ["ICPC", "Huawei", "Marathon", "Heuristics", "Optimization", "Cash Prize", "14 Days"],
    ratingImpact: "Open",
    isFeatured: true,
    isVerifiedPrize: true,
    evidence: [
      {
        source: "tinyfish_fetch",
        timestamp: "2026-10-19T06:00:00.000Z",
        excerpt: "Huawei and ICPC announce the official Challenge with €30,000 prize fund for individual participants.",
        confidenceScore: 0.99,
      },
    ],
    deepResearch: {
      overview: "A heuristic marathon challenge focusing on NP-hard problem approximations (e.g. distributed storage layout, 5G wireless scheduling, query plan caching).",
      difficultyRating: "Hard",
      expectedParticipants: "4,000+ marathon specialists",
      prizeEligibilityNotes: "Must submit readable source code; finalists present algorithmic approach to Huawei R&D committee.",
      pastWinnersOrStats: ["Top scores achieved via Simulated Annealing, Genetic Algorithms, and custom hyper-graph partitioners."],
      recommendedPreparation: ["Implement local fast simulator in C++", "Explore hill climbing and adaptive search techniques"],
      keyRules: ["Automated grading cluster runs 100+ private test cases per submission"],
    },
  },
];

// In-memory runtime store that supports dynamic additions from live searches
class ContestStore {
  private contests: Contest[] = [...initialContests];

  getAll(): Contest[] {
    return this.contests;
  }

  getById(id: string): Contest | undefined {
    return this.contests.find((c) => c.id === id || c.slug === id);
  }

  addOrUpdate(contest: Contest): void {
    const existingIndex = this.contests.findIndex((c) => c.id === contest.id || c.url === contest.url);
    if (existingIndex >= 0) {
      this.contests[existingIndex] = { ...this.contests[existingIndex], ...contest };
    } else {
      this.contests.unshift(contest);
    }
  }

  filter(filters: {
    searchQuery?: string;
    platform?: string;
    prizeTier?: string;
    format?: string;
    onlyVerified?: boolean;
    minPrizeUSD?: number;
  }): Contest[] {
    return this.contests.filter((c) => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesText =
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.platform.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.prizeDescription.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      if (filters.platform && filters.platform !== "all" && c.platform !== filters.platform) {
        return false;
      }

      if (filters.prizeTier && filters.prizeTier !== "all" && c.prizeTier !== filters.prizeTier) {
        return false;
      }

      if (filters.format && filters.format !== "all" && c.format !== filters.format) {
        return false;
      }

      if (filters.onlyVerified && !c.isVerifiedPrize) {
        return false;
      }

      if (filters.minPrizeUSD && (c.prizePoolUSD || 0) < filters.minPrizeUSD) {
        return false;
      }

      return true;
    });
  }
}

export const contestStore = new ContestStore();
