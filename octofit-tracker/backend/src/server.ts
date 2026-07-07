import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';
import { User } from './models/User.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
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

connectToDatabase().catch((error) => {
  console.error('Database connection failed:', error);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
