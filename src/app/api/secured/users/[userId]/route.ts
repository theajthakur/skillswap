import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const data = await prisma.user.findFirst({ where: { userName: userId } });
    return NextResponse.json({
      status: "success",
      message: "Fetched Successfully!",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Something went worng!",
    });
  }
}
