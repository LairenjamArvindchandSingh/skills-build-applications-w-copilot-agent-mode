import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members', '-password');
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.json([]);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Failed to create team', message: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', '-password');
    if (!team) { res.status(404).json({ message: 'Team not found' }); return; }
    res.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Failed to fetch team', message: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
