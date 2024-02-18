import { connectDB } from '@/libs/db';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type bodyUser = {
  fullname: string;
  email: string;
  password: string;
};

const validateUser = (
  user: bodyUser
): { isValid: boolean; message?: string; status?: number } => {
  const { fullname, email, password }: bodyUser = user;

  if (fullname === '' || email === '' || password === '') {
    return {
      isValid: false,
      message: 'Fullname, email, and password are required fields',
      status: 400,
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at leat 8 characters',
      status: 400,
    };
  }
  return { isValid: true };
};

export async function POST(request: Request): Promise<Response> {
  const bodyUser: bodyUser = await request.json();

  const { isValid, message, status } = validateUser(bodyUser);

  if (!isValid) {
    return NextResponse.json({ message }, { status });
  }

  try {
    await connectDB();
    const { email, fullname, password } = bodyUser;
    const existUserWithEmail = await User.findOneBy({ email });

    if (existUserWithEmail instanceof User) {
      return NextResponse.json(
        {
          message: 'User already registered. Please, use another email',
        },
        { status: 400 }
      );
    }

    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.password = password;
    await user.save();

    return NextResponse.json(user);
  } catch (error) {
    console.error('error in /signup', error);

    return NextResponse.error();
  }
}
