import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const hide = Number(searchParams.get('page')) * 10 || 0;

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const me = await prisma.user.findUnique({
            where: { email: session.user?.email! }
        });

        if (!me) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // 🔥 FILTERING MOVED TO PRISMA
        const users = await prisma.user.findMany({
            where: {
                id: { not: me.id },
                skills: {
                    hasSome: me.interests
                },
            },
            skip: hide || 0,
            take: 10
        });

        // Still compute match metadata
        const filteredUsers = users.map(e => {
            const matchedInterests = e.skills.filter(skill => me.interests.includes(skill));
            const matchPercentage = (matchedInterests.length / me.interests.length) * 100;

            return {
                id: e.id,
                name: e.name,
                image: e.image,
                gender: e.gender,
                skills: e.skills,
                interests: e.interests,
                matchedInterests,
                matchPercentage: matchPercentage.toFixed(2)
            };
        });

        return NextResponse.json(
            filteredUsers
                .sort((a, b) => Number(b.matchPercentage) - Number(a.matchPercentage))
        );


    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
