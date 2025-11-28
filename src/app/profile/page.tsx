import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import UserProfile from "@/components/user/profile/Profile";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/logout");
  }

  const data = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!data) {
    redirect("/logout");
  }

  return <UserProfile user={data} />;
}
