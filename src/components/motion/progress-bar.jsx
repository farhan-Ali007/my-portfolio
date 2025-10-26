"use client";

import { motion, useScroll } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left"
      style={{ scaleX: scrollYProgress,
        background:
          "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(56,189,248,1) 50%, rgba(139,92,246,1) 100%)",
      }}
    />
  );
}
