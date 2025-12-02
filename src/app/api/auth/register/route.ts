import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { sendMail } from "@/lib/mailSender";

export async function POST(req: Request) {
  const { name, email, password, mobile, gender, skills, interests, userName } =
    await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!Array.isArray(skills) || !Array.isArray(interests)) {
    return NextResponse.json(
      { error: "Skills and Interests must be arrays" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      gender,
      mobile,
      provider: "credentials",
      skills,
      interests,
      userName,
    },
  });

  const verificationCode = randomUUID();

  await prisma.verificationToken.create({
    data: {
      token: verificationCode,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  sendMail({
    to: email,
    subject: "Verify your email",
    html: `<p>Please verify your email by clicking the link below:</p>
           <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/api/secured/verification/${verificationCode}">Verify Email</a>
           <br><p>This link will expire in 24 hours.</p>`,
  })
    .then(() => {
      console.log("Verification email sent to", email);
    })
    .catch((error) => {
      console.error("Error sending verification email:", error);
    });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      skills: user.skills,
      interests: user.interests,
    },
  });
}
