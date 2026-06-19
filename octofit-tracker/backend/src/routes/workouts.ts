import { Router, Request, Response } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/', async (req: Request, res: Response) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
  res.json(workout);
});

export default router;
