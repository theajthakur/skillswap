import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const { email, password } = await req.json();
    console.log(email, password, "hit");

    if (!email || !password) {
        return NextResponse.json(
            { error: "Missing fields" },
            { status: 400 }
        )
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user || !user.password) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        )
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        )
    }

    return NextResponse.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}