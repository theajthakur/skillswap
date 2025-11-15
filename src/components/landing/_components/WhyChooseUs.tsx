"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Goal, MessageCircle, RefreshCcw } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <RefreshCcw />,
      title: "Exchange Skills",
      desc: "Teach what you know, learn what you don’t — simple, fun, and rewarding.",
    },
    {
      icon: <MessageCircle />,
      title: "Connect & Collaborate",
      desc: "Meet like-minded students, share ideas, and grow together in your campus community.",
    },
    {
      icon: <Goal />,
      title: "Grow Together",
      desc: "Real skill learning through interaction — not boring tutorials or lectures.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-surface text-center">
      <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-foreground mb-12">
        Why Choose <span className="text-primary">SkillSwap?</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, i) => (
          <Card key={i} className="px-2 py-5 md:px-5">
            <div>
              <div className="flex w-full justify-center items-center py-3 text-primary">
                <Button variant={"ghost"} size={"icon-lg"}>
                  {f.icon}
                </Button>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-textSecondary font-inter">{f.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
