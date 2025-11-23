import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import UserProfile from "@/components/user/profile/Profile";
import { User } from "@prisma/client";

export default async function Page() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return <div>Not logged in</div>;
  }

  const data = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!data) return <div>User not found</div>;

  return <UserProfile user={data} />;
}
