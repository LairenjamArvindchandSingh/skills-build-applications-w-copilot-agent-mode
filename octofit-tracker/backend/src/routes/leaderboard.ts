import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const entries = await Leaderboard.find()
      .populate('user', '-password')
      .sort({ score: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.json([]);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error('Error creating leaderboard entry:', error);
    res.status(500).json({ error: 'Failed to create leaderboard entry', message: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
