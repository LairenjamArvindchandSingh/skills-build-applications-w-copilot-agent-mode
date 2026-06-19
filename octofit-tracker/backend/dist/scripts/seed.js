"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Seed the octofit_db database with test data
const mongoose_1 = __importDefault(require("mongoose"));
const User_js_1 = __importDefault(require("../models/User.js"));
const Team_js_1 = __importDefault(require("../models/Team.js"));
const Activity_js_1 = __importDefault(require("../models/Activity.js"));
const Leaderboard_js_1 = __importDefault(require("../models/Leaderboard.js"));
const Workout_js_1 = __importDefault(require("../models/Workout.js"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGODB_URI);
    await Promise.all([
        User_js_1.default.deleteMany({}),
        Team_js_1.default.deleteMany({}),
        Activity_js_1.default.deleteMany({}),
        Leaderboard_js_1.default.deleteMany({}),
        Workout_js_1.default.deleteMany({}),
    ]);
    const users = await User_js_1.default.insertMany([
        { username: 'octocat', email: 'octocat@github.com', password: 'password123' },
        { username: 'monalisa', email: 'monalisa@github.com', password: 'password123' },
        { username: 'hubot', email: 'hubot@github.com', password: 'password123' },
        { username: 'defunkt', email: 'defunkt@github.com', password: 'password123' },
        { username: 'mojombo', email: 'mojombo@github.com', password: 'password123' },
    ]);
    await Team_js_1.default.insertMany([
        { name: 'OctoFit Champions', members: [users[0]._id, users[1]._id] },
        { name: 'GitHub Runners', members: [users[2]._id, users[3]._id] },
        { name: 'Commit Crushers', members: [users[4]._id] },
    ]);
    await Activity_js_1.default.insertMany([
        { user: users[0]._id, type: 'running', duration: 30 },
        { user: users[1]._id, type: 'cycling', duration: 45 },
        { user: users[2]._id, type: 'swimming', duration: 60 },
        { user: users[3]._id, type: 'yoga', duration: 40 },
        { user: users[4]._id, type: 'weightlifting', duration: 50 },
    ]);
    await Leaderboard_js_1.default.insertMany([
        { user: users[0]._id, score: 150 },
        { user: users[1]._id, score: 200 },
        { user: users[2]._id, score: 175 },
        { user: users[3]._id, score: 125 },
        { user: users[4]._id, score: 100 },
    ]);
    await Workout_js_1.default.insertMany([
        { name: '5K Run', description: 'A 5 kilometer run outdoors', duration: 30, difficulty: 'easy' },
        { name: 'HIIT Session', description: 'High intensity interval training', duration: 45, difficulty: 'hard' },
        { name: 'Yoga Flow', description: 'Relaxing yoga and stretching session', duration: 60, difficulty: 'easy' },
        { name: 'Cycling Tour', description: 'Long distance cycling workout', duration: 90, difficulty: 'medium' },
        { name: 'Swim Laps', description: 'Endurance swimming workout', duration: 45, difficulty: 'medium' },
    ]);
    console.log('Database seeded successfully');
    await mongoose_1.default.disconnect();
}
seed().catch(console.error);
