import express from 'express';
import { getCodeforcesRating } from '../util/fetchers/codeforces';

const router = express.Router();

router.get('/codeforces/:username', getCodeforcesRating);

// Todo
router.get('/codeforces', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Codeforces leaderboard '
  });
});

export default router;