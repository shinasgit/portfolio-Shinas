"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
    const { content, dict } = useLanguage();

    const isDesktop = useMediaQuery(BREAKPOINTS.xl);

    const targetRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [measurements, setMeasurements] = useState({ scrollRange: 0, dynamicHeight: "auto" });
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            const frame = requestAnimationFrame(() => {
                setMeasurements({ scrollRange: 0, dynamicHeight: "auto" });
            });
            return () => cancelAnimationFrame(frame);
        }

        const updateMeasurements = () => {
            if (horizontalContainerRef.current) {
                const totalWidth = horizontalContainerRef.current.scrollWidth;
                const viewportW = window.innerWidth;
                const range = totalWidth - viewportW;
                const safeRange = range > 0 ? range : 0;

                setMeasurements({
                    scrollRange: safeRange,
                    dynamicHeight: `${safeRange + window.innerHeight}px`,
                });
            }
        };

        updateMeasurements();

        const timeout = setTimeout(updateMeasurements, 100);
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateMeasurements);
        });

        if (horizontalContainerRef.current) {
            resizeObserver.observe(horizontalContainerRef.current);
        }

        return () => {
            clearTimeout(timeout);
            resizeObserver.disconnect();
        };
    }, [isDesktop, content.projects]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -measurements.scrollRange]);
    const smoothX = useSpring(x, { stiffness: 400, damping: 60, restDelta: 0.5 });

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            id="projects"
            ref={targetRef}
            data-slot="projects"
            className="relative py-16 md:py-24 lg:py-32 xl:py-0"
            style={{ height: measurements.dynamicHeight }}
        >
            <div
                className={`
                    w-full 
                    ${isDesktop
                        ? "sticky top-0 h-screen flex items-center overflow-hidden"
                        : "relative flex flex-col"
                    }
                `}
            >

                {!isDesktop ? (
                    <>
                        <div className="flex flex-col gap-4 px-container mb-10">
                            <BlurReveal>
                                <span className="title-counter">
                                    [003]
                                </span>
                            </BlurReveal>

                            <BlurReveal>
                                <h2 className="title transition-colors duration-300 hover:text-primary">
                                    {dict.title.projects}
                                </h2>
                            </BlurReveal>

                            <BlurReveal>
                                <p className="mt-4 text-muted-foreground text-lg transition-colors duration-300 hover:text-primary">
                                    {dict.projectsIntro}
                                </p>
                            </BlurReveal>
                        </div>
                        <div className="flex flex-col w-full max-w-full px-container gap-container">
                            {content.projects.map((project: ProjectItem, index: number) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onClick={() => handleOpenProject(project)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        ref={horizontalContainerRef}
                        style={{ x: smoothX }}
                        className="flex px-container w-max items-center"
                    >
                        <div className="w-[60vw] xl:w-[40vw] shrink-0 flex flex-col justify-center pl-4 md:pl-8 lg:pl-12">
                            <div className="flex flex-col gap-4">
                                <BlurReveal>
                                    <span className="title-counter">
                                        [003]
                                    </span>
                                </BlurReveal>

                                <BlurReveal>
                                    <h2 className="title transition-colors duration-300 hover:text-primary">
                                        {dict.title.projects}
                                    </h2>
                                </BlurReveal>

                                <BlurReveal>
                                    <p className="mt-4 text-5xl font-light leading-tight transition-colors duration-300 hover:text-primary">
                                        {dict.projectsIntro}
                                    </p>
                                </BlurReveal>

                                <BlurReveal>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="h-px w-24 bg-border" />
                                        <span className="text-sm font-mono text-foreground/40 uppercase">
                                            {dict.projectsScrollText}
                                        </span>
                                    </div>
                                </BlurReveal>
                            </div>
                        </div>

                        {content.projects.map((project: ProjectItem, index: number) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={() => handleOpenProject(project)}
                            />
                        ))}

                        <div className="w-[40vw] h-[70vh] shrink-0 flex flex-col justify-center items-center">
                            <h3 className="text-[10vw] font-black tracking-tighter text-border uppercase">
                                {dict.projectsEndText}
                            </h3>
                        </div>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}

const ProjectCard = React.memo(function ProjectCard({ project, index, onClick }: { project: ProjectItem; index: number; onClick?: () => void }) {
    return (
        <BlurReveal>
            <div
                onClick={onClick}
                className="group relative w-full xl:w-[45vw] aspect-4/3 shrink-0 xl:mx-6 perspective-1000 cursor-pointer"
            >
                <div className="relative w-full h-full overflow-hidden bg-card/60 border border-border/50 transition-all duration-700 ease-out group-hover:border-primary/40 group-hover:shadow-[0_0_30px_rgba(0,245,212,0.1)]">
                    <div className="absolute inset-0 z-0">
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 1280px) 100vw, 45vw"
                                priority={index === 0}
                                loading={index === 0 ? undefined : "lazy"}
                                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-card via-[#0D1117] to-secondary/30 flex flex-col justify-center px-6 xl:px-12 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,245,212,0.1),rgba(255,255,255,0))]" />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-8xl md:text-9xl font-black font-mono text-border/10 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                                    0{index + 1}
                                </div>
                                <div className="relative z-10 max-w-lg mb-16 md:mb-20">
                                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed mb-4 font-light">
                                        {project.description}
                                    </p>
                                    {project.stack && project.stack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.stack.slice(0, 5).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2.5 py-0.5 rounded-full border border-border/60 bg-secondary/40 text-[11px] font-mono text-foreground/80 group-hover:border-primary/30 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.stack.length > 5 && (
                                                <span className="px-2 py-0.5 rounded-full border border-border/60 bg-secondary/20 text-[11px] font-mono text-muted-foreground">
                                                    +{project.stack.length - 5}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent pointer-events-none" />
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 xl:p-12 pointer-events-none">
                        <div className="flex justify-between items-start">
                            <div className="overflow-hidden">
                                <span className="block text-xs xl:text-sm font-mono tracking-widest text-muted-foreground uppercase group-hover:text-primary transition-colors duration-300">
                                    {project.category}
                                </span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="block text-xs xl:text-sm font-mono text-muted-foreground">
                                    {project.year}
                                </span>
                            </div>
                        </div>

                        <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter uppercase leading-tight transition-all duration-500 delay-100 ${
                            project.image
                                ? "text-foreground opacity-20 group-hover:opacity-100"
                                : "text-foreground opacity-90 group-hover:text-primary group-hover:opacity-100"
                        }`}>
                            {project.title}
                        </h3>
                    </div>

                </div>
            </div>
        </BlurReveal>
    );
});