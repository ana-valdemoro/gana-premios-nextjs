import { UserObject } from '@/Schemas/UserSchema';
import { JWT_ACSESS_TOKEN } from '@/constants/accessToken';
import { connectDB } from '@/libs/db';
import { sendAccountActivationEmail } from '@/libs/email';
import { generateJWT } from '@/libs/jwt';
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
    user.token = generateJWT(
      { type: 'user', id: '' },
      {
        expiresIn: JWT_ACSESS_TOKEN.USER_CONFIRMATION.expiration,
        audience: JWT_ACSESS_TOKEN.USER_CONFIRMATION.scope,
      }
    );

    await user.save();

    try {
      await sendAccountActivationEmail(email, user.token);
    } catch (error) {
      console.error('We cannot send the activation email');
    }

    const userData: Partial<User> = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
      createAt: user.createAt,
      updatedAt: user.updatedAt,
      active: user.active,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('error in /signup', error);

    return NextResponse.error();
  }
}
