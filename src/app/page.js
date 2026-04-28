"use client";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

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