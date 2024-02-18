import { UserObject } from '@/Schemas/UserSchema';
import { connectDB } from '@/libs/db';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';
import { ValidationError } from 'yup';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type bodyUser = {
  fullname: string;
  email: string;
  password: string;
};

export async function POST(request: Request): Promise<Response> {
  const bodyUser: bodyUser = await request.json();

  try {
    await UserObject.validate(bodyUser);
  } catch (error) {
    if (error instanceof ValidationError) {
      const { errors, path } = error;
      return NextResponse.json(
        {
          field: path,
          errors,
        },
        { status: 409 }
      );
    }
    return NextResponse.error();
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
