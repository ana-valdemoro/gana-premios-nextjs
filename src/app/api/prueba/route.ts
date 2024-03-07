import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<Response> {
  try {
    // await connectDB();
    // const allUsers = await User.find();
    return NextResponse.json({ msg: 'Prueba test works' });
  } catch (error) {
    return NextResponse.error();
  }
}
