"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Magnetic from "../motion/magnetic";

export default function Hero() {
  // Mouse position trackers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Grid movement based on mouse position
  const gridX = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);
  const gridY = useTransform(mouseY, [0, window.innerHeight], [-10, 10]);
  const gridSkew = useTransform(mouseY, [0, window.innerHeight], [0, 0.5]);
  
  // Parallax layers
  const layer1x = useTransform(mouseX, [0, window.innerWidth], [0, 20]);
  const layer1y = useTransform(mouseY, [0, window.innerHeight], [0, 20]);
  const layer2x = useTransform(mouseX, [0, window.innerWidth], [0, -15]);
  const layer2y = useTransform(mouseY, [0, window.innerHeight], [0, -15]);
  const layer3x = useTransform(mouseX, [0, window.innerWidth], [0, 10]);
  const layer3y = useTransform(mouseY, [0, window.innerHeight], [0, 10]);
  
  // Spotlight effect
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const [spotOn, setSpotOn] = useState(false);

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    spotX.set(clientX);
    spotY.set(clientY);
    mouseX.set(clientX);
    mouseY.set(clientY);
    setSpotOn(true);
  };

  const onMouseLeave = () => {
    setSpotOn(false);
  };

  return (
    <main
      id="home"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Subtle grid background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{ x: gridX, y: gridY, skewX: gridSkew }}
      >
        <div className="h-full w-full opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      </motion.div>
      
      {/* Parallax layers */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[50vmin] w-[50vmin] rounded-full blur-3xl"
        style={{ x: layer1x, y: layer1y, background: "radial-gradient(closest-side, rgba(16,185,129,0.20), transparent)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[45vmin] w-[45vmin] rounded-full blur-3xl"
        style={{ x: layer2x, y: layer2y, background: "radial-gradient(closest-side, rgba(99,102,241,0.15), transparent)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
        style={{ x: layer3x, y: layer3y, background: "radial-gradient(closest-side, rgba(56,189,248,0.12), transparent)" }}
      />
      
      {/* Spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 size-[420px] -translate-x-1/2 -translate-y-1/2 transform rounded-full mix-blend-screen"
        style={{ left: spotX, top: spotY, background: "radial-gradient(200px circle at center, rgba(16,185,129,0.22), transparent 60%)" }}
        animate={{ opacity: spotOn ? 0.6 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      
      {/* Cursor ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40"
        style={{ left: spotX, top: spotY }}
        animate={{ opacity: spotOn ? 0.8 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-semibold tracking-tight"
      >
        Hi, I'm{" "}
        <motion.span
          initial={{ backgroundPositionX: "0%" }}
          animate={{ backgroundPositionX: "100%" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-[length:200%_100%] bg-clip-text text-transparent"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Farhan
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mt-4 max-w-xl text-balance text-sm md:text-base text-foreground/70"
      >
        MERN Stack Developer · 2.5+ years · Building performant, animated web experiences with
        Next.js, Node, and thoughtful UX.
      </motion.p>

      {/* Tech badges */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-foreground/60"
      >
        <span className="rounded-full border px-2.5 py-1">MongoDB</span>
        <span className="rounded-full border px-2.5 py-1">Express</span>
        <span className="rounded-full border px-2.5 py-1">React</span>
        <span className="rounded-full border px-2.5 py-1">Node</span>
        <span className="rounded-full border px-2.5 py-1">Next.js</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex items-center gap-3"
      >
        <Magnetic>
          <a
            href="#projects"
            className="relative overflow-hidden rounded-md bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-500 transition-colors"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{ x: ["0%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 5, ease: "easeOut" }}
            />
            <span className="relative">View Projects</span>
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="#contact"
            className="rounded-md border px-4 py-2 hover:bg-foreground/5 transition-colors"
          >
            Contact Me
          </a>
        </Magnetic>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-6 text-xs text-foreground/60"
      >
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </main>
  );
}
