import express from 'express';
import { getCodeforcesRating } from '../util/fetchers/codeforces';
import { getGithubCommitsLeaderboard, getUserGithubCommits } from '../controllers/leaderboardController';

const router = express.Router();

// Codeforces routes
router.get('/codeforces/:username', getCodeforcesRating);

// Todo
router.get('/codeforces', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Codeforces leaderboard '
  });
});

// GitHub routes
router.get('/github', getGithubCommitsLeaderboard);
router.get('/github/:username', getUserGithubCommits);

export default router;