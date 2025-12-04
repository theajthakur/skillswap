"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Us",
            value: "hello@skillswap.com",
            link: "mailto:hello@skillswap.com"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us",
            value: "+1 (555) 123-4567",
            link: "tel:+15551234567"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Us",
            value: "123 Innovation Dr, Tech City, TC 90210",
            link: "#"
        }
    ];

    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, href: "#" },
        { icon: <Twitter className="w-5 h-5" />, href: "#" },
        { icon: <Linkedin className="w-5 h-5" />, href: "#" },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-poppins font-bold mb-6"
                    >
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="grid gap-6">
                            {contactInfo.map((item, index) => (
                                <Card key={index} className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                        <a href={item.link} className="text-muted-foreground hover:text-primary transition-colors">
                                            {item.value}
                                        </a>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">Connect with us</h3>
                            <p className="text-muted-foreground mb-6">
                                Follow our journey on social media and stay updated with the latest news and features.
                            </p>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="p-8 bg-white/5 backdrop-blur-lg border-white/10">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium ml-1">First Name</label>
                                        <Input placeholder="John" className="bg-white/5 border-white/10 focus:border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium ml-1">Last Name</label>
                                        <Input placeholder="Doe" className="bg-white/5 border-white/10 focus:border-primary/50" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Email</label>
                                    <Input type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 focus:border-primary/50" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Message</label>
                                    <Textarea placeholder="How can we help you?" className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary/50 resize-none" />
                                </div>

                                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg py-6">
                                    Send Message <Send className="ml-2 w-4 h-4" />
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
