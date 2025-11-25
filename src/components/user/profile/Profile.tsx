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

export default function UserProfile({ user }: { user: User }) {
  const { update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: user.mobile || "",
    skills: user.skills.join(", "),
    interests: user.interests.join(", "),
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const skillsArray = formData.skills.split(",").map((s: string) => s.trim());
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
    <div className="min-h-[60vh] bg-background flex justify-center p-6">
      {user ? (
        <Card className="w-full max-w-md bg-surface shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <Save
                    className="w-5 h-5 text-primary"
                    onClick={handleUpdate}
                  />
                ) : (
                  <Edit2 className="w-5 h-5 text-secondary" />
                )}
              </Button>
            </div>

            <div className="space-y-3 text-foreground">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                {isEditing ? (
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
              {isEditing ? (
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
                  ))}
                  {user.skills.length === 0 && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      No skills
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
              {isEditing ? (
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
              {isEditing && (
                <Button
                  className="w-full"
                  onClick={handleUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              )}
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
