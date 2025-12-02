import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  return {
    title: `${session && session.user?.name} Profile - SkillSwap`,
  };
}
export default function layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
