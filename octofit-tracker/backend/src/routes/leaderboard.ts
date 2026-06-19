import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const entries = await Leaderboard.find()
    .populate('user', '-password')
    .sort({ score: -1 });
  res.json(entries);
});

router.post('/', async (req: Request, res: Response) => {
  const entry = new Leaderboard(req.body);
  await entry.save();
  res.status(201).json(entry);
});

export default router;
