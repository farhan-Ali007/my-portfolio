"use client";

import Image from "next/image";
import Tilt from "./motion/tilt";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

export default function ProjectCard({ title, description, image, tech = [], href = "#", index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Tilt className="group relative overflow-hidden rounded-xl border bg-background/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Gradient border glow overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-xl p-[1px] [background:linear-gradient(90deg,rgba(16,185,129,.35),rgba(56,189,248,.25),rgba(139,92,246,.25))] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]" />
        </div>
        <a href={href} target="_blank" rel="noreferrer" className="block">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={false}
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium tracking-tight">{title}</h3>
            <p className="mt-1 text-sm text-foreground/70">{description}</p>
            {tech.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            )}
          </div>
        </a>
      </Tilt>
    </motion.div>
  );
}
