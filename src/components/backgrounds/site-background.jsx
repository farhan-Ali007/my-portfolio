"use client";

export default function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 opacity-[0.7] dark:opacity-[0.6]" style={{
        background: "radial-gradient(800px 400px at 50% -10%, rgba(16,185,129,0.15), transparent 60%), radial-gradient(600px 300px at 90% 10%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(600px 300px at 10% 20%, rgba(99,102,241,0.08), transparent 60%)"
      }} />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" style={{
        backgroundImage: "linear-gradient(to right, rgba(120,120,120,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,120,0.2) 1px, transparent 1px)",
        backgroundSize: "36px 36px"
      }} />
    </div>
  );
}
