import { Mail, Github, Linkedin, FileText, ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const email = "your.email@example.com"; // replace later
  return (
    <footer className="border-t mt-20">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground/60">© {year} Farhan</p>
        <div className="flex items-center gap-2 text-foreground/70">
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            title="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-foreground/5 transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-foreground/5 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-foreground/5 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="Resume"
            title="Resume"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-foreground/5 transition-colors"
          >
            <FileText className="h-4 w-4" />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            title="Back to top"
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-foreground/5 transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
