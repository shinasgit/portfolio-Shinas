"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { useLenis } from "@/providers/smooth-scroll-provider";

export default function Navbar() {
  const { dict } = useLanguage();
  const lenis = useLenis();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [dimensions, setDimensions] = useState({
    screenWidth: 1920,
    containerWidth: 1280,
    scrollHeight: 800,
  });

  const dummyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, dimensions.scrollHeight], [0, 0.85]);
  const backdropBlur = useTransform(scrollY, [0, dimensions.scrollHeight], [0, 12]);
  const backdropFilter = useMotionTemplate`blur(${backdropBlur}px)`;

  const py = useTransform(scrollY, [0, dimensions.scrollHeight], [16, 8]); // Reduced height

  const navLinks = useMemo(() => [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Work (12)", href: "#projects" },
    { name: "Services (08)", href: "#stack" },
    { name: "Contact", href: "#contact" },
  ], []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDimensions = () => {
      setDimensions({
        screenWidth: window.innerWidth,
        scrollHeight: window.innerHeight,
        containerWidth: dummyRef.current ? dummyRef.current.getBoundingClientRect().width : 1280,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const overflowVal = isMobileMenuOpen ? "hidden" : "";
    document.body.style.overflow = overflowVal;
    document.documentElement.style.overflow = overflowVal;

    if (isMobileMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem || targetId === "home") {
      setIsMobileMenuOpen(false);

      setTimeout(() => {
        let navbarHeight = 60; // Reduced height
        if (headerRef.current) {
          const currentHeight = headerRef.current.offsetHeight;
          const currentScroll = window.scrollY;
          const currentPy = currentScroll >= dimensions.scrollHeight
            ? 8
            : 16 - (currentScroll / dimensions.scrollHeight) * 8;
          const heightDifference = (currentPy - 8) * 2;
          navbarHeight = Math.max(currentHeight - heightDifference, 0);
        }

        const isDesktop = dimensions.screenWidth >= 1280;
        const isAboutOnDesktop = targetId === "about" && isDesktop;

        if (lenis) {
          lenis.scrollTo(targetId === "home" ? 0 : elem!, {
            offset: targetId === "home" ? 0 : isAboutOnDesktop ? 0 : -navbarHeight,
            duration: 1.5,
          });
        } else {
          if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (elem) {
            const rect = elem.getBoundingClientRect();
            const offsetPosition = rect.top + window.scrollY - (isAboutOnDesktop ? 0 : navbarHeight);
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }, 100);
    }
  }, [lenis, dimensions.scrollHeight, dimensions.screenWidth]);

  return (
    <motion.header
      ref={headerRef}
      style={{
        paddingTop: py,
        paddingBottom: py,
      }}
      className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300"
    >
      <div ref={dummyRef} className="container invisible absolute pointer-events-none -z-50" />

      <motion.div
        style={{
          opacity: bgOpacity,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
        }}
        className="absolute inset-0 bg-background/90 border-b border-border/10 -z-10 pointer-events-none"
      />

      <nav className="mx-auto px-container flex items-center justify-between w-full">
        {/* Left: Brand */}
        <Link
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="relative z-[110] flex items-center gap-1 group w-1/4"
        >
          <span className="text-xl font-[family-name:var(--font-black-ops-one)] font-normal tracking-tight text-white group-hover:opacity-70 transition-opacity uppercase">
            Portfolio<span className="text-sm font-normal align-top leading-[0.8]">®</span>
          </span>
        </Link>

        {/* Center: Links */}
        <div className="hidden xl:flex items-center justify-center w-2/4">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative text-xs font-[family-name:var(--font-black-ops-one)] font-normal text-white/80 hover:text-white transition-colors uppercase"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Hamburger */}
        <div className="flex items-center justify-end w-1/4 gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="relative z-[110] flex flex-col gap-1.5 focus:outline-none p-2 group"
            aria-label="Toggle Menu"
          >
            <div className="w-8 h-px bg-white transition-all duration-300 group-hover:w-6" />
            <div className="w-8 h-px bg-white transition-all duration-300 group-hover:w-10" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#111111] xl:hidden flex flex-col h-dvh w-screen"
          >
            <div className="flex flex-col flex-1 pt-32 pb-12 px-container overflow-y-auto relative z-10">
              <ul className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + (i * 0.05),
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="group flex items-baseline"
                    >
                      <span className="text-4xl font-[family-name:var(--font-black-ops-one)] font-normal text-white group-hover:pl-4 transition-all duration-300 uppercase">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
