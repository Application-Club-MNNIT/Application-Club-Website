import { Request, Response, NextFunction } from 'express';
import User from '../model/UserModel';
import { totalCommitsFetcher, getGithubLeaderboard, setGithubLeaderboardCache, TOP_USERS_COUNT } from '../util/fetchers/github';
import catchAsync from '../util/catchAsync';

interface GitHubUser {
  username: string;
  commits: number;
  verified: boolean;
}

// Controller to get GitHub commits leaderboard
export const getGithubCommitsLeaderboard = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  // Try to get from cache first
  const limit = req.query.limit ? parseInt(req.query.limit as string) : TOP_USERS_COUNT;
  const cachedLeaderboard = await getGithubLeaderboard(limit);
  
  if (cachedLeaderboard) {
    return res.status(200).json({
      status: 'success',
      message: 'GitHub leaderboard retrieved from cache',
      data: cachedLeaderboard
    });
  }
  
  // If not in cache, fetch all users with GitHub usernames
  const users = await User.find({ 'github.username': { $exists: true, $ne: '' } })
    .select('username github.username github.verified');
  
  if (!users || users.length === 0) {
    return res.status(200).json({
      status: 'success',
      message: 'No users with GitHub usernames found',
      data: {
        users: []
      }
    });
  }

  // Fetch commit counts for each user
  const leaderboardPromises = users.map(async (user) => {
    try {
      const commits = await totalCommitsFetcher(user.github.username);
      return {
        username: user.username,
        githubUsername: user.github.username,
        commits,
        verified: user.github.verified
      };
    } catch (error) {
      console.error(`Error fetching commits for ${user.github.username}:`, error.message);
      return {
        username: user.username,
        githubUsername: user.github.username,
        commits: 0,
        verified: user.github.verified,
        error: 'Failed to fetch commit count'
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
    status: 'success',
    message: 'GitHub leaderboard generated',
    data: {
      users: topUsers,
      timestamp: Date.now(),
      fromCache: false
    }
  });
});

// Get specific user's GitHub commit count
export const getUserGithubCommits = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { username } = req.params;
  
  const user = await User.findOne({ 'github.username': username }).select('username github.username github.verified');
  
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found with the provided GitHub username'
    });
  }
  
  try {
    const commits = await totalCommitsFetcher(username);
    
    res.status(200).json({
      status: 'success',
      data: {
        username: user.username,
        githubUsername: user.github.username,
        commits,
        verified: user.github.verified
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch GitHub commit count',
      error: error.message
    });
  }
});