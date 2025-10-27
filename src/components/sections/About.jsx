"use client";

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import Image from "next/image";

export default function About() {
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start 80%", "end 20%"],
  });

  // About decorative blob motion
  const blobScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  // Image parallax and subtle scale on scroll
  const imgY = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.985, 1.015]);

  return (
    <section id="about" ref={aboutRef} className="relative scroll-mt-20">
      {/* Decorative background blob */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-[46vmin] w-[46vmin] rounded-[40%] blur-3xl"
        style={{
          scale: blobScale,
          rotate: blobRotate,
          background: "radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.2), transparent 50%), radial-gradient(circle at 70% 60%, rgba(99, 102, 241, 0.15), transparent 50%)",
        }}
      />

      <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 sm:space-y-5"
        >
          {/* subtle background orbs */}
          <div aria-hidden className="pointer-events-none absolute -left-6 top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl" />
          <div aria-hidden className="pointer-events-none absolute left-24 -bottom-6 h-20 w-20 rounded-full bg-blue-500/10 blur-xl" />
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            About Me
          </h2>
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-500/40 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 56, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
          />
          <div className="space-y-3 sm:space-y-4 text-foreground/80 leading-relaxed">
            <p>
              I'm a passionate MERN stack developer with a keen eye for design and performance.
              My journey in web development started 2.5 years ago, and I've been in love with
              building things for the web ever since.
            </p>
            <p>
              I specialize in creating responsive, accessible, and performant web applications
              using modern technologies like React, Next.js, and Node.js. I'm particularly
              interested in animation and creating delightful user experiences.
            </p>
          </div>
          
          {/* interactive minimal stats */}
          <div className="pt-1">
            <div className="grid grid-cols-2 sm:inline-grid sm:grid-cols-3 gap-3">
              <motion.div 
                className="relative rounded-lg border border-border/30 bg-background/60 px-3 py-2 text-sm"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <motion.span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-emerald-500"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="font-semibold">2.5+ yrs</div>
                <div className="text-xs text-foreground/60">Experience</div>
              </motion.div>
              <motion.div 
                className="relative rounded-lg border border-border/30 bg-background/60 px-3 py-2 text-sm"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                <motion.span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-blue-500"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
                <div className="font-semibold">15+ projects</div>
                <div className="text-xs text-foreground/60">Delivered</div>
              </motion.div>
              <motion.div 
                className="relative hidden sm:block rounded-lg border border-border/30 bg-background/60 px-3 py-2 text-sm"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-purple-500"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                <div className="font-semibold">Available</div>
                <div className="text-xs text-foreground/60">for work</div>
              </motion.div>
            </div>
          </div>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
          style={{ y: imgY, scale: imgScale }}
        >
          <div className="relative aspect-[3/4] max-w-[300px] sm:max-w-[340px] mx-auto">
            {/* Main frame */}
            <div className="relative h-full w-full group">
              {/* Decorative border with gradient */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-emerald-400/30 via-blue-400/20 to-purple-400/30 p-0.5">
                <div className="relative h-full w-full overflow-hidden rounded-3xl bg-background/80 backdrop-blur-sm">
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
                  
                  {/* Image container */}
                  <div className="relative h-full w-full overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-transparent to-background/30 z-10" />
                    
                    <Image
                      src="/profilee.png"
                      alt="Professional Headshot"
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105 z-10"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 z-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:24px_24px]" />

                    {/* scan sweep overlay */}
                    <motion.div 
                      className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-emerald-400/0 via-emerald-400/15 to-emerald-400/0 mix-blend-screen"
                      animate={{ y: ["-100%", "120%"] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -right-4 -top-4 h-20 w-20 animate-float rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-xl" />
              <div className="absolute -bottom-6 -left-6 h-28 w-28 animate-float rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl" style={{ animationDelay: '1.5s' }} />
              
              {/* Corner accents */}
              <div className="absolute left-2 top-2 h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-emerald-400/50 transition-all duration-300 group-hover:border-emerald-400/80" />
              <div className="absolute right-2 top-2 h-6 w-6 rounded-tr-2xl border-r-2 border-t-2 border-blue-400/50 transition-all duration-300 group-hover:border-blue-400/80" />
              <div className="absolute bottom-2 left-2 h-6 w-6 rounded-bl-2xl border-b-2 border-l-2 border-blue-400/30 transition-all duration-300 group-hover:border-blue-400/60" />
              <div className="absolute bottom-2 right-2 h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-emerald-400/30 transition-all duration-300 group-hover:border-emerald-400/60" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-2xl transition-all duration-700 group-hover:opacity-70 group-hover:blur-3xl" />
              
              {/* Animated border highlight */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent [background:linear-gradient(90deg,transparent,transparent),linear-gradient(90deg,rgba(16,185,129,0.2),rgba(59,130,246,0.2),rgba(168,85,247,0.2))] bg-origin-border [mask:linear-gradient(#fff_0_0)padding-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:destination-out] [mask-composite:exclude] group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
