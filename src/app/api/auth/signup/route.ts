import { connectDB } from "@/libs/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

type bodyUser = {
  fullname: string;
  email: string;
  password: string;
};
export async function POST(request: Request) {
  try {
    await connectDB();

    const { fullname, email, password }: bodyUser = await request.json();

    if (password.length < 8)
      return NextResponse.json(
        {
          message: "Password must be at leat 8 characters",
        },
        { status: 400 }
      );

    // TODO: check user is not found inside DB

    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.password = password;
    throw new Error("x");
    await user.save();

    return NextResponse.json(user);
  } catch (error) {
    console.error("error in /signup", error);

    return NextResponse.error();
  }
}
