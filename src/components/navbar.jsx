"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import Magnetic from "./motion/magnetic";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const [active, setActive] = useState("#home");
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [underline, setUnderline] = useState({ left: 0, width: 0, center: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    sections.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, [links]);

  const recalcUnderline = useMemo(
    () => () => {
      const el = linkRefs.current[active];
      const nav = navRef.current;
      if (!el || !nav) return;
      const r1 = nav.getBoundingClientRect();
      const r2 = el.getBoundingClientRect();
      const left = Math.round(r2.left - r1.left);
      const width = Math.round(r2.width);
      setUnderline({ left, width, center: Math.round(left + width / 2) });
    },
    [active]
  );

  useEffect(() => {
    recalcUnderline();
    const onResize = () => recalcUnderline();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });
    const onScrollY = () => setScrolled(window.scrollY > 80);
    onScrollY();
    window.addEventListener("scroll", onScrollY, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
      window.removeEventListener("scroll", onScrollY);
    };
  }, [recalcUnderline]);

  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${scrolled ? "shadow-sm" : ""}`}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="#home" className="font-semibold group relative" aria-label="Farhan home link">
          <div className="relative inline-flex items-center">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="inline-block translate-z-0 transform-gpu text-emerald-600 text-2xl md:text-3xl tracking-tight drop-shadow-[0_1px_0_rgba(0,0,0,0.05)]"
            >
              Farhan
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -4, rotate: -10 }}
              whileHover={{ opacity: 1, x: 4, rotate: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="ml-1 inline-flex h-4 w-4 items-center justify-center text-emerald-500/80 group-hover:text-emerald-500"
            >
              <Sparkles className="h-3.5 w-3.5" />
            </motion.span>
            {/* subtle glow under brand on hover */}
            <motion.span
              aria-hidden
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute -inset-x-2 -bottom-3 h-3 rounded-full blur-md bg-gradient-to-r from-emerald-500/30 via-sky-500/25 to-violet-500/25"
            />
          </div>
        </Link>
        <nav ref={navRef} className="relative hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              ref={(el) => (linkRefs.current[l.href] = el)}
              whileHover={{ y: -2 }}
              className={`text-sm transition-colors ${
                active === l.href
                  ? "text-foreground"
                  : scrolled
                  ? "text-foreground/60 hover:text-foreground/90"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {l.label}
            </motion.a>
          ))}
          <motion.div
            aria-hidden
            className="absolute -bottom-[7px] h-[2px] rounded bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500"
            animate={{ left: underline.left, width: underline.width }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-500"
            animate={{ left: underline.center }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-foreground/5"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <>
          <motion.div
            aria-hidden
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.nav
            className="md:hidden fixed left-0 right-0 top-14 z-50 border-b bg-background/95 backdrop-blur"
            initial={{ opacity: 0, y: -12, scaleY: 0.92, clipPath: 'inset(10% 10% 90% 10% round 12px)' }}
            animate={{ opacity: 1, y: 0, scaleY: 1, clipPath: 'inset(0% 0% 0% 0% round 12px)' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {/* gradient bar */}
            <div aria-hidden className="h-0.5 w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500" />
            <ul className="mx-auto max-w-6xl px-4 py-3 space-y-1">
              {links.map((l, idx) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx + 0.05, duration: 0.2 }}
                >
                  <a
                    href={l.href}
                    onClick={closeMenu}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      active === l.href ? 'bg-foreground/5 text-foreground' : 'text-foreground/80 hover:bg-foreground/5'
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </header>
  );
}
