import { prisma } from "@/lib/prisma";
import NotFound from "@/components/common/NotFound";
import UserProfile from "@/components/user/profile/Profile";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cache } from "react";

const getUserCached = cache(async (userId: string) => {
  return prisma.user.findFirst({
    where: { id: userId },
  });
});

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  const param = await params;
  const user = await getUserCached(param.userId);

  if (!user) {
    return { title: "User Not Found - SkillSwap" };
  }

  return {
    title: `View "${user.name}" Profile - SkillSwap`,
  };
}

export default async function Page({ params }: { params: { userId: string } }) {
  const session = await getServerSession(authOptions);
  const param = await params;
  const user = await getUserCached(param.userId);

  if (!user) return <NotFound />;

  if (param.userId === session?.user.id) {
    redirect("/profile");
  }

  user.mobile = `XXXXXX${user.mobile?.slice(-4)}`;

  return <UserProfile user={user} />;
}
