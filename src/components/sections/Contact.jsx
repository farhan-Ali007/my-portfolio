"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Facebook, Github, Linkedin, Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailAddress = "farhanali39765500@gmail.com";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.message.trim().length < 10) e.message = "Min 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(false);
    // simulate request
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 2000);
  }

  async function copyEmail() {
    try { await navigator.clipboard.writeText(emailAddress); setSuccess(true); setTimeout(()=>setSuccess(false), 1200);} catch {}
  }

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
              
              <form className="space-y-4" onSubmit={onSubmit} noValidate>
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
                          className={`w-full px-4 py-3 rounded-lg border bg-background/70 outline-none text-sm transition-all duration-300 placeholder-foreground/50 ${errors.message ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border/30 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 hover:border-emerald-500/50'} text-foreground/90`}
                          placeholder={field === 'name' ? 'Your name' : field === 'email' ? 'Your email' : 'Your message'}
                          value={form.message}
                          onChange={(e)=>setForm((f)=>({...f, message: e.target.value}))}
                        />
                      ) : (
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          id={field}
                          className={`w-full px-4 py-3 rounded-lg border bg-background/70 outline-none text-sm transition-all duration-300 placeholder-foreground/50 text-foreground/90 ${errors[field] ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-border/30 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 hover:border-emerald-500/50'}`}
                          placeholder={field === 'name' ? 'Your name' : 'Your email'}
                          value={form[field]}
                          onChange={(e)=>setForm((f)=>({...f, [field]: e.target.value}))}
                        />
                      )}
                      {errors[field] && (
                        <span className="mt-1 block text-xs text-red-500">{errors[field]}</span>
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
                    disabled={submitting}
                    className="w-full mt-2 group relative overflow-hidden disabled:opacity-60"
                    size="lg"
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                      {submitting ? 'Sending...' : success ? 'Sent' : 'Send Message'}
                      {!success ? (
                        <Send className={`ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 ${submitting ? '' : 'group-hover:translate-x-1'}`} />
                      ) : (
                        <Check className="ml-2 h-4 w-4 text-emerald-500" />
                      )}
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
          {/* Quick links row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={copyEmail} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-foreground/5">
              <Mail className="h-4 w-4 text-emerald-500" /> {emailAddress}
            </button>
            <div className="ml-auto flex items-center gap-2">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-foreground/5"><Github className="h-4 w-4" /></a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-foreground/5"><Linkedin className="h-4 w-4" /></a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-foreground/5"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
