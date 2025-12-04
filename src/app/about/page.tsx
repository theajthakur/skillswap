"use client";

import { motion } from "framer-motion";
import { Users, Heart, Globe, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
    const stats = [
        { label: "Active Users", value: "10K+" },
        { label: "Skills Shared", value: "50K+" },
        { label: "Countries", value: "25+" },
    ];

    const values = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Community First",
            desc: "We believe in the power of connection and shared growth.",
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Passion Driven",
            desc: "Learning should be fueled by curiosity and genuine interest.",
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Accessible to All",
            desc: "Knowledge should have no barriers. Everyone has something to teach.",
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Innovation",
            desc: "Constantly evolving to provide the best learning experience.",
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-poppins font-bold mb-6"
                    >
                        Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Growth</span> Through Sharing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto"
                    >
                        SkillSwap is more than just a platform; it's a movement to democratize education and foster meaningful connections across the globe.
                    </motion.p>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10">
                            <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                            <p className="text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Our Values */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-poppins font-bold text-center mb-12"
                    >
                        Our Core <span className="text-primary">Values</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((val, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-4">
                                        {val.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                                    <p className="text-muted-foreground text-sm">{val.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Started in a college dorm room, SkillSwap was born from a simple observation: everyone is an expert at something. We wanted to create a space where students could trade their knowledge freely, without the barriers of cost or formal structure. Today, we're a growing community of learners and teachers, proving that the best way to learn is together.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
