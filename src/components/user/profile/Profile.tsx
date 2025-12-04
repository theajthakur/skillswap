"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@prisma/client";
import { Mail, Phone, User2, Heart, Code, Edit2, Save } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function UserProfile({
  user,
  type = "profile",
}: {
  user: User;
  type?: string;
}) {
  const { update, data } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: user.mobile || "",
    skills: user.skills.join(", "),
    interests: user.interests.join(", "),
  });

  const handleUpdate = async () => {
    if (type === "profile") return;
    setIsLoading(true);
    try {
      const skillsArray = formData.skills
        .split(",")
        .map((s: string) => s.trim());
      const interestsArray = formData.interests
        .split(",")
        .map((i: string) => i.trim());

      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: formData.mobile,
          skills: skillsArray,
          interests: interestsArray,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await res.json();

      await update({
        ...user,
        mobile: formData.mobile,
        skills: skillsArray,
        interests: interestsArray,
      });

      toast.success("Profile updated successfully");

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex justify-center p-6">
      {user ? (
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user?.name || "User"}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span>{user?.name?.charAt(0) || <User2 />}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {user.name}
                  </h2>
                  <p className="text-secondary text-sm">{user.gender}</p>
                </div>
              </div>
              {type == "self" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing && type == "self" ? (
                    <Save
                      className="w-5 h-5 text-primary"
                      onClick={handleUpdate}
                    />
                  ) : (
                    <Edit2 className="w-5 h-5 text-secondary" />
                  )}
                </Button>
              )}
            </div>

            <div className="space-y-3 text-foreground">
              {user.userName && (
                <div className="flex items-center gap-3">
                  <User2 className="w-5 h-5 text-primary" />
                  <Badge variant={"outline"} className="tracking-wide">
                    @ {user.userName}
                  </Badge>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                {isEditing && type == "self" ? (
                  <Input
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="h-8"
                  />
                ) : (
                  <span>{user.mobile || "Not available"}</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Code className="w-5 h-5" />
                Skills
              </div>
              {isEditing && type == "self" ? (
                <Textarea
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="Comma separated skills"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill: any) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}{" "}
                  {user.skills.length === 0 && (
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                      No Skills
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-secondary font-medium">
                <Heart className="w-5 h-5" />
                Interests
              </div>
              {isEditing && type == "self" ? (
                <Textarea
                  value={formData.interests}
                  onChange={(e) =>
                    setFormData({ ...formData, interests: e.target.value })
                  }
                  placeholder="Comma separated interests"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((item: any) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                  {user.interests.length === 0 && (
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                      No interests
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="space-y-2">
              {isEditing && type == "self" && (
                <div className="flex w-full gap-2">
                  <Button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="whitespace-nowrap hover:flex-1 transition-all"
                  >
                    Cancel
                  </Button>
                </div>
              )}
              {type == "self" && (
                <Button
                  variant={"destructive"}
                  className="w-full"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}
