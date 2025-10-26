"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, Send, Facebook } from "lucide-react";
import { Button } from "../ui/button";
import ContactCard from "../contact-card";

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/',
    icon: Github,
    color: 'hover:text-foreground',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/',
    icon: Linkedin,
    color: 'hover:text-[#0A66C2]',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/',
    icon: Facebook,
    color: 'hover:text-[#1877F2]',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const formItem = {
  hidden: { opacity: 0, x: 20 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
    },
  }),
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16 px-2"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="inline-block"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Get In Touch
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-foreground/70 max-w-2xl mx-auto text-lg"
          >
            Have a project in mind or want to discuss opportunities? I'm just an email away.
          </motion.p>
        </motion.div>

        <div className="max-w-2xl mx-auto">

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="show"
            className="relative group"
          >
            {/* Animated background gradient */}
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500/20 via-blue-500/10 to-purple-500/20 opacity-30 blur-xl -z-10"></div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 rounded-xl opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px]"></div>
            
            <motion.div 
              className="bg-background/80 backdrop-blur-sm border border-border/20 rounded-xl p-6 sm:p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500/50 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-500/50 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-500/50 rounded-br-xl"></div>
              <motion.h3 
                className="text-xl font-semibold mb-6 flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.span 
                  className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 text-emerald-500"
                  animate={{ 
                    rotate: [0, 10, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </motion.span>
                Send a Message
              </motion.h3>
              
              <form className="space-y-4">
                <AnimatePresence>
                  {['name', 'email', 'message'].map((field, i) => (
                    <motion.div
                      key={field}
                      custom={i}
                      initial="hidden"
                      animate="show"
                      variants={formItem}
                      className="relative"
                    >
                      {field === 'message' ? (
                        <textarea
                          id={field}
                          rows="4"
                          className="w-full px-4 py-3 rounded-lg border border-border/30 bg-background/70 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none text-sm transition-all duration-300 hover:border-emerald-500/50 text-foreground/90 placeholder-foreground/50"
                          placeholder={field === 'name' ? 'Your name' : field === 'email' ? 'Your email' : 'Your message'}
                        />
                      ) : (
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          id={field}
                          className="w-full px-4 py-3 rounded-lg border border-border/30 bg-background/70 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none text-sm transition-all duration-300 hover:border-emerald-500/50 text-foreground/90 placeholder-foreground/50"
                          placeholder={field === 'name' ? 'Your name' : 'Your email'}
                        />
                      )}
                      <motion.div 
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500"
                        whileFocus={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full mt-2 group relative overflow-hidden"
                    size="lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                      Send Message
                      <Send className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                    />
                  </Button>
                </motion.div>
              </form>
            </motion.div>
            
            {/* Animated background elements */}
            {/* Animated floating orbs */}
            <motion.div 
              className="absolute -top-10 -right-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-xl -z-20"
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div 
              className="absolute -bottom-12 -left-12 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-xl -z-20"
              animate={{
                y: [0, 15, 0],
                x: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
