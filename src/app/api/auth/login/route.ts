import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Check if email or password is missing
  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Check if user does not exist or password is missing
  if (!user || !user.password) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Check if user status is active
  if (user.status !== "active") {
    return NextResponse.json(
      { error: "Verify your account!" },
      { status: 400 }
    );
  }

  // Validate the password
  const valid = await bcrypt.compare(password, user.password);

  // If password is invalid, return error with status 401
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Return user data if everything is valid
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}
