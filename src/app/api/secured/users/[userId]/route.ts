import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    return NextResponse.json({ message: 'User updated successfully', userId });
}
