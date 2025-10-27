"use client";

import { useState } from "react";
import { Mail, Copy, Check, Linkedin, Github } from "lucide-react";
import { Button } from "./ui/button";

export default function ContactCard({ variant = 'default' }) {
  const [copied, setCopied] = useState(false);
  const email = "your.email@example.com";

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'panel') {
    return (
      <div className="rounded-xl border bg-background/60 p-5">
        <h4 className="font-medium">Get in touch</h4>
        <div className="mt-3 rounded-lg border p-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-emerald-600" />
              <span className="truncate">{email}</span>
            </div>
            <button
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs hover:bg-foreground/5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <a
            href="https://github.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-foreground/5"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-foreground/5"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  // Default variant (minimal)
  return (
    <div className="flex items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-foreground/5"
      >
        <Mail className="h-4 w-4" />
        <span>Email me</span>
      </a>
      <button
        onClick={copy}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-foreground/5"
        aria-label="Copy email to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
