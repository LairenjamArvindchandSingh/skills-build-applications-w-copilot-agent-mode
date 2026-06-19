import { Router, Request, Response } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) { res.status(404).json({ message: 'User not found' }); return; }
  res.json(user);
});

export default router;
