import axios from "axios";
import githubUsernameRegex from "github-username-regex";

// Type definitions for GitHub API responses and data structures
interface GitHubApiResponse {
  data: {
    total_count: number;
  };
}

export interface GitHubUserData {
  username: string;
  commits: number;
  batch?: number;
  name?: string | null;
}

interface GitHubLeaderboardCache {
  data: GitHubUserData[] | null;
  timestamp: number;
}

interface LeaderboardResponse {
  users: GitHubUserData[];
  timestamp: number;
  fromCache: boolean;
}

// Configurable constants
const TOP_USERS_COUNT = 20; // Number of top users to return in leaderboard
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours cache duration

const githubToken = process.env.GITHUB_TOKEN as string;

// Cache for GitHub leaderboard data
let githubLeaderboardCache: GitHubLeaderboardCache = {
  data: null,
  timestamp: 0,
};

const totalCommitsFetcher = async (username: string): Promise<number> => {
  if (!githubUsernameRegex.test(username)) {
    console.log("Invalid username provided.");
    throw new Error("Invalid username provided.");
  }

  const fetchTotalCommits = (
    variables: { login: string },
    token: string
  ): Promise<GitHubApiResponse> => {
    return axios({
      method: "get",
      url: `https://api.github.com/search/commits?q=author:${variables.login}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `token ${token}`,
      },
    });
  };

  let res: GitHubApiResponse;
  try {
    res = await fetchTotalCommits({ login: username }, githubToken);
  } catch (err: any) {
    // console.log(err);
    throw new Error(err instanceof Error ? err.message : String(err));
  }

  const totalCount = res.data.total_count;
  if (!totalCount || isNaN(totalCount)) {
    throw new Error("Could not fetch total commits.");
  }
  return totalCount;
};

// Function to check if cache is valid
const isCacheValid = (): boolean => {
  if (!githubLeaderboardCache.data) return false;

  const now = Date.now();
  return now - githubLeaderboardCache.timestamp < CACHE_DURATION_MS;
};

// Function to get GitHub leaderboard
const getGithubLeaderboard = async (
  limit = TOP_USERS_COUNT
): Promise<LeaderboardResponse | null> => {
  // Return cached data if valid
  if (isCacheValid()) {
    console.log("Returning cached GitHub leaderboard data");
    const topUsers = githubLeaderboardCache.data!.slice(0, limit);
    return {
      users: topUsers,
      timestamp: githubLeaderboardCache.timestamp,
      fromCache: true,
    };
  }

  // Fetch fresh data if cache is invalid
  // This will be implemented in the controller
  return null;
};

// Set leaderboard cache
const setGithubLeaderboardCache = (leaderboardData: GitHubUserData[]): void => {
  githubLeaderboardCache = {
    data: leaderboardData,
    timestamp: Date.now(),
  };
};

export {
  totalCommitsFetcher,
  getGithubLeaderboard,
  setGithubLeaderboardCache,
  TOP_USERS_COUNT,
};
