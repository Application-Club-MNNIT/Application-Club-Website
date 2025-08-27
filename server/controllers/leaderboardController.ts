import { NextFunction, Request, Response } from "express";
import User from "../model/UserModel";
import {
  getGithubLeaderboard,
  setGithubLeaderboardCache,
  TOP_USERS_COUNT,
  totalCommitsFetcher,
} from "../util/fetchers/github";
import {
  fetchMultipleCodeforcesRatings,
  getCodeforcesLeaderboard,
  setCodeforcesLeaderboardCache,
  TOP_USERS_COUNT as CF_TOP_USERS_COUNT,
} from "../util/fetchers/codeforces";
import catchAsync from "../util/catchAsync";

// Constants for POTD leaderboard
export const POTD_TOP_USERS_COUNT = 20;
const POTD_CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Cache storage for POTD leaderboard
let potdLeaderboardCache: any = null;
let potdCacheTimestamp: number = 0;

interface GitHubUser {
  username: string;
  commits: number;
  batch?: number;
  verified: boolean;
}

interface CodeforcesUser {
  username: string;
  codeforcesUsername: string;
  rating: number;
  rank?: string;
  name?: string;
  batch?: number;
  verified: boolean;
}

interface PotdUser {
  username: string;
  solvedCount: number;
  timeTaken: number;
  batch?: number;
  verified: boolean;
}

// Controller to get GitHub commits leaderboard
export const getGithubCommitsLeaderboard = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Try to get from cache first
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : TOP_USERS_COUNT;

    // TODO: commenting it for now, just to test, have to uncomment it later
    /*
    const cachedLeaderboard = await getGithubLeaderboard(limit);
    if (cachedLeaderboard) {
      return res.status(200).json({
        status: "success",
        message: "GitHub leaderboard retrieved from cache",
        data: cachedLeaderboard,
      });
    }
    */
    // If not in cache, fetch all users with GitHub usernames
    // console.log("here");
    const users = await User.find({
      verified: true,
      "github.username": { $exists: true, $ne: "" },
    }).select("username github.username github.verified");
    if (!users || users.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No users with GitHub usernames found",
        data: {
          users: [],
        },
      });
    }

    // Fetch commit counts for each user
    const leaderboardPromises = users.map(async (user) => {
      try {
        const commits = await totalCommitsFetcher(user.github.username);
        console.log(`Fetched ${commits} commits for ${user.github.username}`);
        return {
          username: user.username,
          githubUsername: user.github.username,
          commits,
          verified: user.github.verified,
          batch: user.batch,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error(
          `Error fetching commits for ${user.github.username}:`,
          errorMessage
        );
        return {
          username: user.username,
          githubUsername: user.github.username,
          commits: 0,
          verified: user.github.verified,
          batch: user.batch,
          error: "Failed to fetch commit count",
        };
      }
    });

    // Wait for all promises to resolve
    let leaderboardData = await Promise.all(leaderboardPromises);

    // Sort by commit count (descending)
    leaderboardData = leaderboardData.sort((a, b) => b.commits - a.commits);

    // Cache the full leaderboard data
    setGithubLeaderboardCache(leaderboardData);

    // Return only the requested number of users
    const topUsers = leaderboardData.slice(0, limit);

    res.status(200).json({
      status: "success",
      message: "GitHub leaderboard generated",
      data: {
        users: topUsers,
        timestamp: Date.now(),
        fromCache: false,
      },
    });
  }
);

// Get specific user's GitHub commit count
export const getUserGithubCommits = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { username } = req.params;

    const user = await User.findOne({ "github.username": username }).select(
      "username github.username github.verified"
    );

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found with the provided GitHub username",
      });
    }

    try {
      const commits = await totalCommitsFetcher(username);

      res.status(200).json({
        status: "success",
        data: {
          username: user.username,
          githubUsername: user.github.username,
          commits,
          verified: user.github.verified,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        status: "error",
        message: "Failed to fetch GitHub commit count",
        error: errorMessage,
      });
    }
  }
);

// Controller to get Codeforces rating leaderboard
export const getCodeforcesRatingLeaderboard = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Try to get from cache first
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : CF_TOP_USERS_COUNT;
    const cachedLeaderboard = await getCodeforcesLeaderboard(limit);

    if (cachedLeaderboard) {
      return res.status(200).json({
        status: "success",
        message: "Codeforces leaderboard retrieved from cache",
        data: cachedLeaderboard,
      });
    }

    // If not in cache, fetch all users with Codeforces usernames
    const users = await User.find({
      verified: true,
      "codeforces.username": { $exists: true, $ne: "" },
    }).select("username codeforces.username codeforces.verified");

    if (!users || users.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No users with Codeforces usernames found",
        data: {
          users: [],
        },
      });
    }
    // console.log("users: ");
    // console.log(users);

    try {
      // Extract just the Codeforces usernames
      const codeforcesUsernames = users.map((user) => user.codeforces.username);

      // Fetch all ratings in a single batch request
      const codeforcesData = await fetchMultipleCodeforcesRatings(
        codeforcesUsernames
      );
      // console.log("codeforces Data: ");
      // console.log(codeforcesData);
      // Map the API data back to our users
      const leaderboardData = users.map((user) => {
        // Find the corresponding Codeforces data for this user
        const cfData = codeforcesData.find((data) => {
          // console.log(data.username);
          // console.log(user.codeforces);
          if (data.username != null && user.codeforces.username != null) {
            return (
              data.username.toLowerCase() ===
              user.codeforces.username.toLowerCase()
            );
          } else {
            return false;
          }
        });
        // console.log("cf data");
        // console.log(cfData);
        return {
          username: user.username,
          codeforcesUsername: user.codeforces.username,
          rating: cfData?.rating || 0,
          batch: cfData?.batch,
          maxRating: cfData?.rating || 0, //todo: maxRating was added to comply with FormattedCodeforcesUser interface
          rank: cfData?.rank || "unrated",
          name: cfData?.name || null,
          verified: user.codeforces.verified,
        };
      });

      // Sort by rating (descending)
      const sortedData = leaderboardData.sort((a, b) => b.rating - a.rating);

      // Cache the full leaderboard data
      setCodeforcesLeaderboardCache(sortedData);

      // Return only the requested number of users
      const topUsers = sortedData.slice(0, limit);

      res.status(200).json({
        status: "success",
        message: "Codeforces leaderboard generated",
        data: {
          users: topUsers,
          timestamp: Date.now(),
          fromCache: false,
        },
      });
    } catch (error) {
      console.error("Error generating Codeforces leaderboard:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        status: "error",
        message: "Failed to generate Codeforces leaderboard",
        error: errorMessage,
      });
    }
  }
);

// Function to get cached POTD leaderboard or null if cache is expired
function getPotdLeaderboardCache(limit: number): any {
  if (
    potdLeaderboardCache &&
    Date.now() - potdCacheTimestamp < POTD_CACHE_DURATION_MS
  ) {
    return {
      users: potdLeaderboardCache.slice(0, limit),
      timestamp: potdCacheTimestamp,
      fromCache: true,
    };
  }
  return null;
}

// Function to set POTD leaderboard cache
function setPotdLeaderboardCache(data: any): void {
  potdLeaderboardCache = data;
  potdCacheTimestamp = Date.now();
}

// Controller to get POTD leaderboard
export const getPotdLeaderboard = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Try to get from cache first
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : POTD_TOP_USERS_COUNT;
    const cachedLeaderboard = getPotdLeaderboardCache(limit);

    if (cachedLeaderboard) {
      return res.status(200).json({
        status: "success",
        message: "POTD leaderboard retrieved from cache",
        data: cachedLeaderboard,
      });
    }

    // If not in cache, fetch all users with POTD data
    const users = await User.find({ "potds.status": { $exists: true } }).select(
      "username potds.status potds.sumOfTime verified batch"
    );
    console.log(users);

    if (!users || users.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No users with POTD data found",
        data: {
          users: [],
        },
      });
    }

    // Process each user's POTD data
    const leaderboardData = users.map((user) => {
      // Count solved problems (1s in the status string)
      const solvedCount = (user.potds?.status?.match(/1/g) || []).length;
      // console.log(user);
      return {
        username: user.username,
        solvedCount,
        batch: user.batch,
        timeTaken: user.potds?.sumOfTime || 0,
        verified: user.verified,
      };
    });

    // Sort by solved count (descending) and then by time taken (ascending) for ties
    const sortedData = leaderboardData.sort((a, b) => {
      if (b.solvedCount !== a.solvedCount) {
        return b.solvedCount - a.solvedCount;
      }
      return a.timeTaken - b.timeTaken;
    });

    // Cache the full leaderboard data
    setPotdLeaderboardCache(sortedData);

    // Return only the requested number of users
    const topUsers = sortedData.slice(0, limit);

    res.status(200).json({
      status: "success",
      message: "POTD leaderboard generated",
      data: {
        users: topUsers,
        timestamp: Date.now(),
        fromCache: false,
      },
    });
  }
);
