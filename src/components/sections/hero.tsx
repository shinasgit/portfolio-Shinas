"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
    const { dict } = useLanguage();

    return (
        <section
            id="home"
            className="relative w-full h-screen min-h-[800px] flex flex-col justify-end overflow-hidden bg-background"
        >
            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Vertical Lines */}
                <div className="absolute top-0 bottom-0 left-[10%] w-px bg-primary/10" />
                <div className="absolute top-0 bottom-0 left-[50%] w-px bg-primary/10" />
                <div className="absolute top-0 bottom-0 right-[10%] w-px bg-primary/10" />
                {/* Horizontal Lines */}
                <div className="absolute left-0 right-0 top-[20%] h-px bg-primary/10" />
                <div className="absolute left-0 right-0 top-[75%] h-px bg-primary/10" />
                {/* Intersections (Crosshairs) */}
                <div className="absolute left-[10%] top-[20%] -translate-x-1/2 -translate-y-1/2 text-primary/40 text-[10px]">+</div>
                <div className="absolute right-[10%] top-[20%] -translate-x-1/2 -translate-y-1/2 text-primary/40 text-[10px]">+</div>
                <div className="absolute left-[10%] top-[75%] -translate-x-1/2 -translate-y-1/2 text-primary/40 text-[10px]">+</div>
                <div className="absolute right-[10%] top-[75%] -translate-x-1/2 -translate-y-1/2 text-primary/40 text-[10px]">+</div>
            </div>

            {/* Giant Background Typography */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-x-0 -top-[6%] flex justify-center pointer-events-none z-0 overflow-hidden"
            >
                <h1 className="text-[18vw] font-[family-name:var(--font-black-ops-one)] font-normal text-white/10 select-none tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_80px_rgba(204,255,0,0.15)]">
                    SHINAS
                </h1>
            </motion.div>

            {/* Main Hero Person Image (Sliding up from bottom) */}
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute bottom-0 left-[50%] -translate-x-1/2 w-[100%] md:w-[85%] lg:w-[75%] xl:w-[65%] h-[130%] z-10 pointer-events-none flex justify-center items-end"
            >
                <div className="relative w-full h-full [mask-image:linear-gradient(to_top,transparent_0%,black_15%)]">
                    <Image
                        src="/home-portfolio-image.png"
                        alt="Shinas S"
                        fill
                        priority
                        className="object-contain object-bottom"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 65vw"
                    />
                </div>
            </motion.div>

            {/* Content Foreground */}
            <div className="relative z-20 container mx-auto h-full flex flex-col justify-between px-container pt-8 pb-12">
                
                {/* Top Section: Just Right Floating Project */}
                <div className="flex justify-end items-start w-full mt-4 md:mt-8">
                    
                    {/* Right Floating Project Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="bg-white p-3 shadow-2xl flex flex-col w-[240px] rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer"
                    >
                        <div className="relative w-full aspect-square bg-gray-100 mb-3 overflow-hidden">
                            <Image 
                                src="/projects/20260427093247620.jpg" 
                                alt="Aether JS Project" 
                                fill 
                                className="object-cover hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="flex justify-between items-center text-xs font-[500] text-black">
                            <span className="flex items-center gap-1">
                                <span className="text-[10px]">✱</span> AETHER JS
                            </span>
                            <span className="text-gray-500 font-[400]">/Library</span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section: Huge Name & Description (Left) & Right Profile Card */}
                <div className="flex flex-col md:flex-row justify-between items-end w-full pb-12 md:pb-20 lg:pb-28">
                    
                    {/* Left: Huge Name Title + Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col"
                    >
                        <h2 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-[family-name:var(--font-black-ops-one)] font-normal text-foreground leading-[0.8] tracking-tighter uppercase drop-shadow-xl z-20 mix-blend-normal mb-4">
                            SHINAS S
                        </h2>
                        {/* Left Description under SHINAS S */}
                    </motion.div>

                    {/* Profile / Let's Talk Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="bg-card p-3 md:p-4 rounded-sm flex items-center gap-4 text-card-foreground shadow-2xl w-[260px] md:w-[280px] mb-8 md:mb-0 relative z-30 group cursor-pointer border border-border"
                    >
                        <div className="relative w-12 h-12 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500">
                            <Image 
                                src="/home-portfolio-image.png" 
                                alt="Profile" 
                                fill 
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                            <span className="text-xs text-muted-foreground mb-1 font-[500]">Let's Talk</span>
                            <span className="text-sm font-[600]">Shinas S</span>
                            <span className="text-[11px] text-muted-foreground font-[400] mt-0.5">Full Stack Developer</span>
                        </div>
                        <div className="bg-primary text-primary-foreground p-2 rounded-sm group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}