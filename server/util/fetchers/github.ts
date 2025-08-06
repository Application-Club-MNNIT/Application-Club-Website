import axios from "axios";
import githubUsernameRegex from "github-username-regex";

// Configurable constants
const TOP_USERS_COUNT = 20; // Number of top users to return in leaderboard
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours cache duration

const githubToken = process.env.GITHUB_TOKEN;

// Cache for GitHub leaderboard data
let githubLeaderboardCache = {
    data: null,
    timestamp: 0
};

const totalCommitsFetcher = async (username: string) => {
    if (!githubUsernameRegex.test(username)) {
        console.log("Invalid username provided.");
        throw new Error("Invalid username provided.");
    }

    const fetchTotalCommits = (variables: { login: string }, token: string) => {
        return axios({
            method: "get", url: `https://api.github.com/search/commits?q=author:${variables.login}`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.github.cloak-preview",
                Authorization: `token ${token}`,
            },
        });
    };

    let res: any;
    try {
        res = await fetchTotalCommits({ login: username }, githubToken);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }

    const totalCount = res.data.total_count;
    if (!totalCount || isNaN(totalCount)) {
        throw new Error(
            "Could not fetch total commits.",
        );
    }
    return totalCount;
};

// Function to check if cache is valid
const isCacheValid = () => {
    if (!githubLeaderboardCache.data) return false;
    
    const now = Date.now();
    return now - githubLeaderboardCache.timestamp < CACHE_DURATION_MS;
};

// Function to get GitHub leaderboard
const getGithubLeaderboard = async (limit = TOP_USERS_COUNT) => {
    // Return cached data if valid
    if (isCacheValid()) {
        console.log("Returning cached GitHub leaderboard data");
        const topUsers = githubLeaderboardCache.data.slice(0, limit);
        return {
            users: topUsers,
            timestamp: githubLeaderboardCache.timestamp,
            fromCache: true
        };
    }

    // Fetch fresh data if cache is invalid
    // This will be implemented in the controller
    return null;
};

// Set leaderboard cache
const setGithubLeaderboardCache = (leaderboardData) => {
    githubLeaderboardCache = {
        data: leaderboardData,
        timestamp: Date.now()
    };
};

// test
const testTotalCommitsFetcher = async () => {
    try {
        const username = 'mahtosujeet';
        const totalCommits = await totalCommitsFetcher(username);
        console.log(`Total commits for ${username}: ${totalCommits}`);
    } catch (error) {
        console.error(error.message)
    }
};
// testTotalCommitsFetcher();

export { totalCommitsFetcher, getGithubLeaderboard, setGithubLeaderboardCache, TOP_USERS_COUNT };
