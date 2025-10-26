"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Tilt({ children, className = "", intensity = 8, glare = false }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useTransform(my, [ -0.5, 0.5 ], [ intensity, -intensity ]);
  const ry = useTransform(mx, [ -0.5, 0.5 ], [ -intensity, intensity ]);

  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        transformStyle: "preserve-3d",
        rotateX: srx,
        rotateY: sry,
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{
            background:
              "radial-gradient(600px 200px at 50% 0%, rgba(255,255,255,0.15), transparent)",
            opacity: useSpring(mx, { stiffness: 100, damping: 25 }),
          }}
        />
      )}
    </motion.div>
  );
}
