"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Key, Rocket } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { status } = useSession();
  return (
    <section className="relative flex flex-col md:flex-row gap-10 items-center justify-between min-h-[90vh] px-6 max-w-7xl mx-auto pt-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

      <div className="flex-1 text-center md:text-left z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4 border border-accent/20">
            🚀 The #1 Campus Skill Exchange
          </span>
          <h1 className="text-5xl md:text-7xl font-poppins font-extrabold text-foreground leading-tight mb-6">
            Learn What You <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Need</span>, <br />
            Teach What You <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Know</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
        >
          SkillSwap connects learners and mentors within your campus. Exchange
          skills, collaborate on projects, and grow your network together!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          {status === "unauthenticated" ? (
            <Link href="/auth">
              <Button size={"lg"} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg hover:shadow-primary/50 transition-all rounded-full px-8 py-6 text-lg">
                Login To Match <Key className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/match">
              <Button size={"lg"} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg hover:shadow-primary/50 transition-all rounded-full px-8 py-6 text-lg">
                Start Matching <Rocket className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
          <Link href="#how-it-works">
            <Button variant="outline" size={"lg"} className="border-primary/20 hover:bg-primary/5 text-foreground rounded-full px-8 py-6 text-lg">
              How it works
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="flex-1 relative w-full max-w-lg">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-2xl opacity-20 transform rotate-6 scale-105" />
          <Image
            alt="Students Collaborating"
            src="/hero-vibrant.png"
            width={600}
            height={600}
            className="rounded-2xl shadow-2xl border border-white/10 relative z-10 bg-surface/50 backdrop-blur-sm"
          />
        </motion.div>
      </div>
    </section>
  );
}
