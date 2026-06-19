import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user', '-password');
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.json([]);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Failed to create activity', message: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user', '-password');
    if (!activity) { res.status(404).json({ message: 'Activity not found' }); return; }
    res.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Failed to fetch activity', message: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
