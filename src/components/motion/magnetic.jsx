"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Magnetic({ children, strength = 20, className = "" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 20, mass: 0.2 });
  const y = useSpring(my, { stiffness: 300, damping: 20, mass: 0.2 });

  function onMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mx.set(relX * strength);
    my.set(relY * strength);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onLeave} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
