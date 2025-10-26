"use client";

import { useState } from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Reveal from "../components/motion/reveal";
import Tilt from "../components/motion/tilt";
import SectionHeading from "../components/section-heading";
import ProjectCard from "../components/project-card";
import { Button } from "../components/ui/button";
import Magnetic from "../components/motion/magnetic";
import { Sparkles, Layout, Rocket, ShieldCheck, Code2, Server, Wrench, Mail, Github, Linkedin, Copy, Check } from "lucide-react";
import { Badge } from "../components/ui/badge";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function Page() {
  const [selectedTag, setSelectedTag] = useState("");

  // Hero parallax motion values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.2 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.2 });

  // Spotlight cursor
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const spotX = useSpring(cx, { stiffness: 120, damping: 18, mass: 0.2 });
  const spotY = useSpring(cy, { stiffness: 120, damping: 18, mass: 0.2 });
  const [spotOn, setSpotOn] = useState(false);

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mx.set(px);
    my.set(py);
    cx.set(e.clientX - rect.left);
    cy.set(e.clientY - rect.top);
    setSpotOn(true);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
    setSpotOn(false);
  }

  return (
    <div className="w-full">
      <main
        id="home"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative w-full flex flex-col items-center"
      >
        <div className="w-full">
          <Hero />
        </div>
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="space-y-32 py-20">
            <About />
            <Experience />
            <Projects selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
}

function AnimatedNumber({ end, duration = 1, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Number(v).toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, end, duration, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function ContactCard() {
  const email = "your.email@example.com";
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch { }
  }
  return (
    <div className="rounded-xl border bg-background/60 p-5">
      <h4 className="font-medium">Get in touch</h4>
      <div className="mt-3 rounded-lg border p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="min-w-0 flex-1 flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-emerald-600" />
            <span className="truncate">{email}</span>
          </div>
          <button onClick={copy} className="shrink-0 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs hover:bg-foreground/5">
            {copied ? (<><Check className="h-3.5 w-3.5" /> Copied</>) : (<><Copy className="h-3.5 w-3.5" /> Copy</>)}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${email}`}><Mail className="mr-2 h-4 w-4" />Email Me</a>
        </Button>
        <Button variant="secondary" asChild>
          <a href="https://github.com/" target="_blank" rel="noreferrer"><Github className="mr-2 h-4 w-4" />GitHub</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin className="mr-2 h-4 w-4" />LinkedIn</a>
        </Button>
      </div>
    </div>
  );
}