import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.json([]);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ error: 'Failed to create workout', message: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
    res.json(workout);
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({ error: 'Failed to fetch workout', message: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
