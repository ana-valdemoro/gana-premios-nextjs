import { userService } from '@/services/userService';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<Response> {
  try {
    const allUsers = await userService.getAllUsers();
    return NextResponse.json({ data: allUsers });
  } catch (error) {
    return NextResponse.error();
  }
}
