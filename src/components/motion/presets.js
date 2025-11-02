import { easeInOut } from "framer-motion";

export const transitions = {
  fast: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] },
  base: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  slow: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

export const containerStagger = (stagger = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitions.base },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: transitions.base },
};

export const slideIn = (dir = "up", distance = 24) => {
  const map = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };
  return {
    hidden: { opacity: 0, ...(map[dir] || map.up) },
    show: { opacity: 1, x: 0, y: 0, transition: transitions.base },
  };
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: transitions.base },
};
