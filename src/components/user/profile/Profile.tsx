"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@prisma/client";
import { Mail, Phone, User2, Heart, Code } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserProfile({ user }: { user: User }) {
  return (
    <div className="min-h-[60vh] bg-background flex justify-center p-6">
      {user ? (
        <Card className="w-full max-w-md bg-surface shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                {user?.name?.charAt(0) || <User2 />}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {user.name}
                </h2>
                <p className="text-secondary text-sm">{user.gender}</p>
              </div>
            </div>

            <div className="space-y-3 text-foreground">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>{user.mobile}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Code className="w-5 h-5" />
                Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-secondary font-medium">
                <Heart className="w-5 h-5" />
                Interests
              </div>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Button
                variant={"destructive"}
                className="w-full"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}
