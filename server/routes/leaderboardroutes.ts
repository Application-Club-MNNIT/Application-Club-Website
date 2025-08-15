import express from 'express';
import {
    getCodeforcesRatingLeaderboard,
    getGithubCommitsLeaderboard,
    getPotdLeaderboard,
    getUserGithubCommits
} from '../controllers/leaderboardController';

const router = express.Router();

// Codeforces routes
router.get('/codeforces', getCodeforcesRatingLeaderboard);

// GitHub routes
router.get('/github', getGithubCommitsLeaderboard);
router.get('/github/:username', getUserGithubCommits);

// POTD routes
router.get('/potd', getPotdLeaderboard);

export default router;