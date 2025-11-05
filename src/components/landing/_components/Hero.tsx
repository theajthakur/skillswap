"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row gap-5 flex-wrap items-center justify-center text-center min-h-[90vh] p-6 bg-gradient-to-b from-primary/5 to-background">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-poppins font-bold text-foreground mb-4"
        >
          Learn What You Need, <br /> Teach What You Know 💡
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-textSecondary max-w-xl font-inter mb-8"
        >
          SkillSwap connects learners and mentors within your campus. Exchange
          skills, collaborate, and grow together!
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/register">
            <Button className="bg-primary text-white text-lg px-6 py-3 hover:bg-primary/90">
              Start Swapping 🚀
            </Button>
          </Link>
        </motion.div>
      </div>
      <div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            alt="Hero Image"
            src="/hero.png"
            width={400}
            height={400}
            className="rounded"
          />
        </motion.div>
      </div>
    </section>
  );
}
