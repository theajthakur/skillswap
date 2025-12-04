"use client";

import { motion } from "framer-motion";
import { MessageCircle, Zap, Shield, Users, Trophy, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function FeaturesPage() {
    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Instant Matching",
            desc: "Our smart algorithm pairs you with the perfect learning partner based on skills and interests.",
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Real-time Chat",
            desc: "Connect instantly with built-in messaging. Share resources, schedule sessions, and stay in touch.",
            color: "from-blue-400 to-cyan-500"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Verified Profiles",
            desc: "Safety first. All student profiles are verified with university email addresses.",
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Community Events",
            desc: "Join workshops, hackathons, and meetups organized by the SkillSwap community.",
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: <Trophy className="w-6 h-6" />,
            title: "Skill Badges",
            desc: "Earn recognition for your teaching and learning achievements. Show off your progress.",
            color: "from-red-400 to-rose-500"
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Resource Library",
            desc: "Access a shared library of notes, tutorials, and guides curated by top students.",
            color: "from-indigo-400 to-violet-500"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-poppins font-bold mb-6"
                    >
                        Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Features</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Everything you need to learn, teach, and grow. Designed for students, by students.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={item}>
                            <Card className="group relative overflow-hidden p-8 h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-3 font-poppins">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.desc}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <div className="p-12 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 backdrop-blur-lg border border-white/10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Join thousands of students already learning and sharing on SkillSwap.
                        </p>
                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
                            Get Started Now
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
