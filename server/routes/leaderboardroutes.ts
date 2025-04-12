import express from 'express';
import { getGithubCommitsLeaderboard, getUserGithubCommits,getCodeforcesRatingLeaderboard } from '../controllers/leaderboardController';

const router = express.Router();

// Codeforces routes
router.get('/codeforces', getCodeforcesRatingLeaderboard);

// GitHub routes
router.get('/github', getGithubCommitsLeaderboard);
router.get('/github/:username', getUserGithubCommits);

export default router;