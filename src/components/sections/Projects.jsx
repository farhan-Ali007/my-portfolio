"use client";

import { motion } from "framer-motion";
import ProjectCard from "../project-card";

export default function Projects({ selectedTag, setSelectedTag }) {
  const projects = [
    {
      title: "Etimad E-commerce",
      description: "Full-stack e-commerce platform with cart, checkout, and admin dashboard. Built with modern web technologies for optimal performance.",
      image: "/etimad.png",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
      href: "https://etimad-shop.vercel.app/",
    },
    {
      title: "E-Learning Platform",
      description: "Interactive online learning platform with course management, progress tracking, and video lessons.",
      image: "/e-learn.png",
      tech: ["React", "Express", "MongoDB", "JWT", "REST API", "Framer Motion", "Tailwind"],
      href: "https://e-learn-platform.vercel.app/",
    },
    {
      title: "Real-time Chat App",
      description: "WebSocket-powered chat application with real-time messaging, read receipts, and typing indicators.",
      image: "/chatapp.png",
      tech: ["Socket.io", "React", "Node.js", "Express", "MongoDB", "Daisy UI"],
      href: "https://chat-app-socket-io.vercel.app/",
    },
    {
      title: "Job Board",
      description: "Job listing platform with advanced filtering, company profiles, and application tracking.",
      image: "/jobapp.png",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
      href: "https://job-board-app.vercel.app/",
    },
  ];

  const filteredProjects = selectedTag
    ? projects.filter((p) => p.tech.some((t) => t.toLowerCase() === selectedTag.toLowerCase()))
    : projects;

  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h2>
        <p className="mt-2 text-foreground/70">Selected work with modern stacks and motion design.</p>
        
        {selectedTag && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="rounded-full border px-2.5 py-1">Filter: {selectedTag}</span>
            <button 
              onClick={() => setSelectedTag("")} 
              className="rounded border px-2 py-1 hover:bg-foreground/5"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <motion.div 
        className="grid gap-6 sm:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <ProjectCard 
              title={project.title}
              description={project.description}
              image={project.image}
              tech={project.tech}
              href={project.href}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
