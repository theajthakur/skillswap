"use client";

import { ArrowRight, Users, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-surface shadow-lg rounded-2xl p-10 space-y-8">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">SkillSwap</h1>
        </div>

        <p className="text-foreground/80leading-relaxed text-lg">
          Everyone has a skill. Everyone has an interest. SkillSwap connects
          people who want to learn something with people who already know it.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border bg-background space-y-3">
            <Users className="w-7 h-7 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Find Your Match
            </h2>
            <p className="text-foreground/80text-sm">
              Complete your profile to discover users who match your interests.
            </p>
          </div>

          <div className="p-5 rounded-xl border bg-background space-y-3">
            <BookOpen className="w-7 h-7 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Learn or Teach
            </h2>
            <p className="text-foreground/80text-sm">
              Users skilled in something can teach. Users interested in
              something can learn. Both sides win.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl border bg-background space-y-3">
          <Sparkles className="w-7 h-7 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Swap Skills, One-to-One
          </h2>
          <p className="text-foreground/80text-sm">
            You can request another user to teach you. Once accepted, both of
            you get a 1-on-1 P2P session and can swap skills freely.
          </p>
        </div>

        <Button className="w-full bg-primary hover:bg-secondary text-white flex items-center gap-2 justify-center">
          Get Started <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
