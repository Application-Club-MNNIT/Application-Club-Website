import {Request, Response, NextFunction} from "express";
import axios from "axios";
import catchAsync from "../catchAsync"
import AppError from "../appError";
import {log} from "node:console";

// Configurable constants
const TOP_USERS_COUNT = 20; // Number of top users to return in leaderboard
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours cache duration
const MAX_USERS_PER_REQUEST = 100; // Codeforces API limit for handles per request

// Cache for Codeforces leaderboard data
let codeforcesLeaderboardCache = {
    data: null,
    timestamp: 0
};


/**
 Fetches rating and info for multiple Codeforces users in a single API call
 */
const fetchMultipleCodeforcesRatings = async (usernames: string[]) => {
    if (!usernames || !Array.isArray(usernames) || usernames.length === 0) {
        throw new Error("Invalid usernames array provided.");
    }

    // Split into chunks to respect API limits
    const chunks = [];
    for (let i = 0; i < usernames.length; i += MAX_USERS_PER_REQUEST) {
        chunks.push(usernames.slice(i, i + MAX_USERS_PER_REQUEST));
    }

    const results = [];

    // Process each chunk
    for (const chunk of chunks) {
        const handlesParam = chunk.join(';');
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.info?handles=${handlesParam}`
            );
            
            const data = response.data;
            if (!data || data.status !== "OK" || !Array.isArray(data.result)) {
                throw new Error("Invalid response from Codeforces API");
            }

            // Map each user to our desired format
            const usersData = data.result.map(user => ({
                username: user.handle,
                rating: user.rating || 0,
                maxRating: user.maxRating || 0,
                rank: user.rank || "unrated",
                name: user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : null
            }));

            results.push(...usersData);
        } catch (error) {
            console.error(`Error fetching Codeforces data for batch for `, handlesParam, error.message);
            // Add placeholder data for failed users in this chunk
            const failedUsers = chunk.map(username => ({
                username,
                rating: 0,
                maxRating: 0,
                rank: "unrated",
                name: null,
                error: `Failed to fetch data for ${username}`
            }));
            results.push(...failedUsers);
        }
    }

    return results;
};

//Checks if the cache is valid
const isCacheValid = () => {
    if (!codeforcesLeaderboardCache.data) return false;

    const now = Date.now();
    return now - codeforcesLeaderboardCache.timestamp < CACHE_DURATION_MS;
};

// Gets Codeforces leaderboard data with caching

const getCodeforcesLeaderboard = async (limit = TOP_USERS_COUNT) => {
    // Return cached data if valid
    if (isCacheValid()) {
        console.log("Returning cached Codeforces leaderboard data");
        const topUsers = codeforcesLeaderboardCache.data.slice(0, limit);
        return {
            users: topUsers,
            timestamp: codeforcesLeaderboardCache.timestamp,
            fromCache: true
        };
    }

    // Return null if cache is invalid (controller will fetch fresh data)
    return null;
};

// Sets the Codeforces leaderboard cache
const setCodeforcesLeaderboardCache = (leaderboardData) => {
    codeforcesLeaderboardCache = {
        data: leaderboardData,
        timestamp: Date.now()
    };
};

export {
    fetchMultipleCodeforcesRatings,
    getCodeforcesLeaderboard,
    setCodeforcesLeaderboardCache,
    TOP_USERS_COUNT,
    MAX_USERS_PER_REQUEST
};

