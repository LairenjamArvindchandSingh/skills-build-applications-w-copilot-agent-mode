import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  duration: number;
  difficulty: string;
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  duration: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
