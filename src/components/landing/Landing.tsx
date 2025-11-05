"use client";
import { motion } from "framer-motion";
import React from "react";
import Hero from "./_components/Hero";
import WhyChooseUs from "./_components/WhyChooseUs";

export default function Landing() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
    </>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-indigo-50 p-6 rounded-2xl shadow-sm"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-700">{title}</h3>
      <p className="text-gray-600 font-inter">{desc}</p>
    </motion.div>
  );
};
