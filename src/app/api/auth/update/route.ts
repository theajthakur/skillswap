import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { mobile, skills, interests } = body;

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                mobile,
                skills,
                interests,
            },
        });

        return NextResponse.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
