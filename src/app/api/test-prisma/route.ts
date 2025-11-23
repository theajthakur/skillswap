
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST() {
    try {
        const user = await prisma.user.create({
            data: {
                email: `test${Date.now()}@example.com`,
                name: 'Test User',
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}
export async function GET() {
    try {
        const user = await prisma.user.findMany();
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}
