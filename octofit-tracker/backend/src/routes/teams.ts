import { Router, Request, Response } from 'express';
import Team from '../models/Team.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members', '-password');
  res.json(teams);
});

router.post('/', async (req: Request, res: Response) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id).populate('members', '-password');
  if (!team) { res.status(404).json({ message: 'Team not found' }); return; }
  res.json(team);
});

export default router;
