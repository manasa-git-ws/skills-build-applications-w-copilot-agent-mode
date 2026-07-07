import { connectToDatabase } from '../config/database.js';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Workout } from '../models/Workout.js';

async function main() {
  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Patel', email: 'ava@example.com', role: 'admin' },
    { name: 'Noah Kim', email: 'noah@example.com', role: 'member' },
    { name: 'Mia Chen', email: 'mia@example.com', role: 'member' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Alpha Squad', members: 4, goal: 'Daily streaks' },
    { name: 'Momentum Crew', members: 3, goal: 'Weekly challenges' },
  ]);

  const activities = await Activity.insertMany([
    { type: 'Run', duration: '30m', calories: 280, date: new Date('2026-07-01') },
    { type: 'Yoga', duration: '20m', calories: 120, date: new Date('2026-07-02') },
    { type: 'Cycling', duration: '45m', calories: 320, date: new Date('2026-07-03') },
  ]);

  const leaderboardEntries = await LeaderboardEntry.insertMany([
    { rank: 1, name: 'Ava Patel', score: 980 },
    { rank: 2, name: 'Noah Kim', score: 940 },
    { rank: 3, name: 'Mia Chen', score: 910 },
  ]);

  const workouts = await Workout.insertMany([
    { title: 'Beginner Cardio', difficulty: 'Easy', duration: '20m', focus: 'Endurance' },
    { title: 'Strength Builder', difficulty: 'Medium', duration: '35m', focus: 'Strength' },
    { title: 'Core Flow', difficulty: 'Easy', duration: '15m', focus: 'Mobility' },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded activities:', activities.length);
  console.log('Seeded leaderboard entries:', leaderboardEntries.length);
  console.log('Seeded workouts:', workouts.length);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
