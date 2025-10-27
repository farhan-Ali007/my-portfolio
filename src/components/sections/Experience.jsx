"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"]
  });

  // Calculate progress for each experience item
  const progress = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0.25, 0.5, 0.75, 0.9, 1]
  );

  const experiences = [
    {
      role: "Frontend Developer",
      company: "TechCorp",
      time: "2022 - Present",
      points: [
        "Led the development of a customer dashboard using React and TypeScript, improving load times by 40%.",
        "Collaborated with designers to implement responsive UIs with a focus on accessibility and performance.",
        "Mentored junior developers and conducted code reviews to maintain code quality.",
      ],
    },
    {
      role: "Web Developer",
      company: "DigitalAgency",
      time: "2020 - 2022",
      points: [
        "Built and maintained client websites using modern JavaScript frameworks.",
        "Implemented SEO best practices, resulting in a 30% increase in organic traffic.",
        "Worked closely with clients to understand requirements and deliver tailored solutions.",
      ],
    },
  ];

  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Experience</h2>
        <p className="mt-2 text-foreground/70">
          My professional journey and contributions so far.
        </p>
      </div>

      <div className="relative" ref={containerRef}>
        {/* Animated progress bar */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-foreground/10 overflow-hidden">
          <motion.div 
            className="relative h-full w-full bg-gradient-to-b from-emerald-500 to-sky-500 origin-top"
            style={{ scaleY: progress }}
          />
          {/* glow */}
          <div className="absolute inset-0 -z-10 blur-md bg-gradient-to-b from-emerald-500/20 to-sky-500/20" />
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            // Calculate progress for each item based on scroll
            const itemProgress = useTransform(
              scrollYProgress,
              [index * 0.5, index * 0.5 + 0.5],
              [0, 1],
              { clamp: false }
            );
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-14"
              >
                {/* Animated dot */}
                <div 
                  className="absolute left-[1.0625rem] top-1.5 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-background"
                  aria-hidden
                >
                  <motion.div 
                    className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      delay: index * 0.2
                    }}
                  />
                </div>

                <motion.div 
                  className="group relative rounded-xl border border-border/20 bg-background/60 p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -1, scale: 1.003 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {/* hover glow */}
                  <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-70" />
                  {/* top accent */}
                  <motion.div
                    className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-emerald-500/70 via-blue-500/60 to-purple-500/70 opacity-80 rounded-t-xl"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
                    style={{ originX: 0 }}
                  />
                  <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-medium">{exp.role}</h3>
                      <p className="text-foreground/80">{exp.company}</p>
                    </div>
                    <span className="mt-1 inline-block text-sm text-foreground/60 sm:mt-0">
                      {exp.time}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                    {exp.points.map((point, i) => (
                      <motion.li 
                        key={i} 
                        className="group/item relative flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.1 + 0.3 }}
                      >
                        <span className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="transition-colors group-hover/item:text-foreground">{point}</span>
                        {/* underline on hover */}
                        <span className="absolute bottom-0 left-4 right-0 h-px bg-emerald-500/0 transition-all duration-300 group-hover/item:bg-emerald-500/10" />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
