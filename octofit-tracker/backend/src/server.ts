import cors from 'cors';
import express, { Application } from 'express';
import { connectDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

export const PORT = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
export const BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

export const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl: BASE_URL });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

export async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`API listening on ${BASE_URL}`);
    console.log(`  GET ${BASE_URL}/api/users`);
    console.log(`  GET ${BASE_URL}/api/activities`);
  });
}
