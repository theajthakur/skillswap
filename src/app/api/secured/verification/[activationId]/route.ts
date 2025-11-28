import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ activationId: string }> }
) {
  const { activationId } = await params;
  try {
    const activationUser = await prisma.verificationToken.findUnique({
      where: { token: activationId },
    });

    if (!activationUser || !activationUser?.userId) {
      return NextResponse.json(
        { error: "Invalid or expired activation link" },
        { status: 400 }
      );
    }

    if (activationUser.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Activation link has expired" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: activationUser.userId },
      data: { status: "active" },
    });

    await prisma.verificationToken.deleteMany({
      where: { userId: activationUser.userId },
    });
    return NextResponse.json({ message: "Account verified successfully" });
  } catch (error) {
    return NextResponse.json({
      status: 401,
      message: "Account verification failed!",
    });
  }
}
