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
    <section id="why-choose-us" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SkillSwap?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join a community where learning is collaborative, fun, and free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Card key={i} className="group relative overflow-hidden border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-8 relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {f.icon}
                  </div>
                </div>
                <h3 className="text-xl font-poppins font-bold text-foreground mb-3">
                  {f.title}
                </h3>
                <p className="text-muted-foreground font-inter leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
