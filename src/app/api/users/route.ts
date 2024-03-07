import { connectDB } from '@/libs/db';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<Response> {
  try {
    await connectDB();
    const allUsers = await User.find();
    return NextResponse.json({ data: allUsers });
  } catch (error) {
    return NextResponse.error();
  }
}
