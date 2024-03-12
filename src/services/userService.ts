import { User } from '@/models/User';
import { connectDB } from '@/libs/db';

async function getUserByEmail(email: string): Promise<User | null> {
  await connectDB();

  // eslint-disable-next-line @typescript-eslint/return-await
  return User.findOneBy({ email });
}

async function getAllUsers(): Promise<User[] | null> {
  await connectDB();

  // eslint-disable-next-line @typescript-eslint/return-await
  return User.find({
    select: [
      'id',
      'email',
      'fullname',
      'role',
      'createAt',
      'updatedAt',
      'active',
    ],
  });
}

export const userService = {
  getUserByEmail,
  getAllUsers,
};
