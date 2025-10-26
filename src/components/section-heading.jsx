export default function SectionHeading({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className="mt-2 text-sm text-foreground/70 max-w-2xl">{subtitle}</p>
      ) : null}
    </div>
  );
}
