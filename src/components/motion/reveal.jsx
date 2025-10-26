"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 16, as = "div", className = "" }) {
  const shouldReduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      initial={shouldReduce ? false : { opacity: 0, y }}
      whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}
