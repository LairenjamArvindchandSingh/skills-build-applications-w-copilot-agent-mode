// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed(): Promise<void> {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { username: 'octocat', email: 'octocat@github.com', password: 'password123' },
    { username: 'monalisa', email: 'monalisa@github.com', password: 'password123' },
    { username: 'hubot', email: 'hubot@github.com', password: 'password123' },
    { username: 'defunkt', email: 'defunkt@github.com', password: 'password123' },
    { username: 'mojombo', email: 'mojombo@github.com', password: 'password123' },
  ]);

  await Team.insertMany([
    { name: 'OctoFit Champions', members: [users[0]._id, users[1]._id] },
    { name: 'GitHub Runners', members: [users[2]._id, users[3]._id] },
    { name: 'Commit Crushers', members: [users[4]._id] },
  ]);

  await Activity.insertMany([
    { user: users[0]._id, type: 'running', duration: 30 },
    { user: users[1]._id, type: 'cycling', duration: 45 },
    { user: users[2]._id, type: 'swimming', duration: 60 },
    { user: users[3]._id, type: 'yoga', duration: 40 },
    { user: users[4]._id, type: 'weightlifting', duration: 50 },
  ]);

  await Leaderboard.insertMany([
    { user: users[0]._id, score: 150 },
    { user: users[1]._id, score: 200 },
    { user: users[2]._id, score: 175 },
    { user: users[3]._id, score: 125 },
    { user: users[4]._id, score: 100 },
  ]);

  await Workout.insertMany([
    { name: '5K Run', description: 'A 5 kilometer run outdoors', duration: 30, difficulty: 'easy' },
    { name: 'HIIT Session', description: 'High intensity interval training', duration: 45, difficulty: 'hard' },
    { name: 'Yoga Flow', description: 'Relaxing yoga and stretching session', duration: 60, difficulty: 'easy' },
    { name: 'Cycling Tour', description: 'Long distance cycling workout', duration: 90, difficulty: 'medium' },
    { name: 'Swim Laps', description: 'Endurance swimming workout', duration: 45, difficulty: 'medium' },
  ]);

  console.log('Database seeded successfully');
  await mongoose.disconnect();
}

seed().catch(console.error);
