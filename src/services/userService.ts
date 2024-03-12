import { User } from '@/models/User';
import { connectDB } from '@/libs/db';

async function getUserByEmail(email: string): Promise<User | null> {
  await connectDB();

  return await User.findOneBy({ email });
}

async function getAllUsers(): Promise<User[] | null> {
  await connectDB();

  return await User.find();
}

export const userService = {
  getUserByEmail,
  getAllUsers,
};
