import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';
import { User } from './models/User.js';
import { Team } from './models/Team.js';
import { Activity } from './models/Activity.js';
import { LeaderboardEntry } from './models/LeaderboardEntry.js';
import { Workout } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT || 8000);

const getApiBaseUrl = () => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }

  return `http://127.0.0.1:${port}`;
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiUrl: getApiBaseUrl(),
  });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl: getApiBaseUrl(), port });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  try {
    const users = await User.find({}).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid user id' });
  }
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  try {
    const teams = await Team.find({}).lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch teams' });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activities' });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard' });
  }
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch workouts' });
  }
});

connectToDatabase().catch((error) => {
  console.error('Database connection failed:', error);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
