import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      bufferCommands: false,  // Disable buffering to fail immediately
    });
    console.log('✅ Connected to octofit_db');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export default mongoose;
