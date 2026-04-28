"use client";

import { useEffect, useRef, useState } from "react";
import { Palette, Check, ChevronDown } from "lucide-react";

const PRESETS = [
  {
    key: "sky-indigo",
    name: "Sky/Indigo",
    a1: "rgb(56 189 248)",
    a2: "rgb(99 102 241)",
    a1_22: "rgba(56, 189, 248, 0.22)",
    a1_40: "rgba(56, 189, 248, 0.40)",
  },
  {
    key: "emerald-cyan",
    name: "Emerald/Cyan",
    a1: "rgb(16 185 129)",
    a2: "rgb(34 211 238)",
    a1_22: "rgba(16, 185, 129, 0.22)",
    a1_40: "rgba(16, 185, 129, 0.40)",
  },
  {
    key: "teal-cyan",
    name: "Teal/Cyan",
    a1: "rgb(45 212 191)",
    a2: "rgb(34 211 238)",
    a1_22: "rgba(45, 212, 191, 0.22)",
    a1_40: "rgba(45, 212, 191, 0.40)",
  },
  {
    key: "blue-cyan",
    name: "Blue/Cyan",
    a1: "rgb(59 130 246)", // blue-500
    a2: "rgb(34 211 238)", // cyan-400
    a1_22: "rgba(59, 130, 246, 0.22)",
    a1_40: "rgba(59, 130, 246, 0.40)",
  },
  {
    key: "indigo-violet",
    name: "Indigo/Violet",
    a1: "rgb(99 102 241)", // indigo-500
    a2: "rgb(139 92 246)", // violet-500
    a1_22: "rgba(99, 102, 241, 0.22)",
    a1_40: "rgba(99, 102, 241, 0.40)",
  },
  {
    key: "orange-amber",
    name: "Orange/Amber",
    a1: "rgb(249 115 22)", // orange-500
    a2: "rgb(245 158 11)", // amber-500
    a1_22: "rgba(249, 115, 22, 0.22)",
    a1_40: "rgba(249, 115, 22, 0.40)",
  },
  {
    key: "rose-fuchsia",
    name: "Rose/Fuchsia",
    a1: "rgb(244 63 94)", // rose-500
    a2: "rgb(217 70 239)", // fuchsia-500
    a1_22: "rgba(244, 63, 94, 0.22)",
    a1_40: "rgba(244, 63, 94, 0.40)",
  },
  {
    key: "violet-cyan",
    name: "Violet/Cyan",
    a1: "rgb(139 92 246)", // violet-500
    a2: "rgb(34 211 238)", // cyan-400
    a1_22: "rgba(139, 92, 246, 0.22)",
    a1_40: "rgba(139, 92, 246, 0.40)",
  },
  {
    key: "indigo-amber",
    name: "Indigo/Amber",
    a1: "rgb(99 102 241)", // indigo-500
    a2: "rgb(245 158 11)", // amber-500
    a1_22: "rgba(99, 102, 241, 0.22)",
    a1_40: "rgba(99, 102, 241, 0.40)",
  },
  {
    key: "blue-amber",
    name: "Blue/Amber",
    a1: "rgb(59 130 246)", // blue-500
    a2: "rgb(245 158 11)", // amber-500
    a1_22: "rgba(59, 130, 246, 0.22)",
    a1_40: "rgba(59, 130, 246, 0.40)",
  },
  {
    key: "emerald-indigo",
    name: "Emerald/Indigo",
    a1: "rgb(16 185 129)", // emerald-500
    a2: "rgb(99 102 241)", // indigo-500
    a1_22: "rgba(16, 185, 129, 0.22)",
    a1_40: "rgba(16, 185, 129, 0.40)",
  },
  {
    key: "slate-blue",
    name: "Slate/Blue",
    a1: "rgb(100 116 139)", // slate-500
    a2: "rgb(59 130 246)", // blue-500
    a1_22: "rgba(100, 116, 139, 0.22)",
    a1_40: "rgba(100, 116, 139, 0.40)",
  },
  {
    key: "cyan-indigo",
    name: "Cyan/Indigo",
    a1: "rgb(34 211 238)", // cyan-400
    a2: "rgb(79 70 229)", // indigo-600
    a1_22: "rgba(34, 211, 238, 0.22)",
    a1_40: "rgba(34, 211, 238, 0.40)",
  },
  {
    key: "mint-lime",
    name: "Mint/Lime",
    a1: "rgb(110 231 183)", // emerald-300
    a2: "rgb(132 204 22)", // lime-500
    a1_22: "rgba(110, 231, 183, 0.22)",
    a1_40: "rgba(110, 231, 183, 0.40)",
  },
  {
    key: "gold-rose",
    name: "Gold/Rose",
    a1: "rgb(234 179 8)", // yellow-500
    a2: "rgb(244 63 94)", // rose-500
    a1_22: "rgba(234, 179, 8, 0.22)",
    a1_40: "rgba(234, 179, 8, 0.40)",
  },
  {
    key: "purple-blue",
    name: "Purple/Blue",
    a1: "rgb(147 51 234)", // purple-600
    a2: "rgb(59 130 246)", // blue-500
    a1_22: "rgba(147, 51, 234, 0.22)",
    a1_40: "rgba(147, 51, 234, 0.40)",
  },
  {
    key: "gray-teal",
    name: "Gray/Teal",
    a1: "rgb(148 163 184)", // slate-400
    a2: "rgb(20 184 166)", // teal-500
    a1_22: "rgba(148, 163, 184, 0.22)",
    a1_40: "rgba(148, 163, 184, 0.40)",
  },
  // Bold / High-contrast
  {
    key: "crimson-gold",
    name: "Crimson/Gold",
    a1: "rgb(220 38 38)", // red-600
    a2: "rgb(234 179 8)", // yellow-500
    a1_22: "rgba(220, 38, 38, 0.22)",
    a1_40: "rgba(220, 38, 38, 0.40)",
  },
  {
    key: "amber-emerald",
    name: "Amber/Emerald",
    a1: "rgb(245 158 11)", // amber-500
    a2: "rgb(16 185 129)", // emerald-500
    a1_22: "rgba(245, 158, 11, 0.22)",
    a1_40: "rgba(245, 158, 11, 0.40)",
  },
  {
    key: "lime-indigo",
    name: "Lime/Indigo",
    a1: "rgb(132 204 22)", // lime-500
    a2: "rgb(79 70 229)", // indigo-600
    a1_22: "rgba(132, 204, 22, 0.22)",
    a1_40: "rgba(132, 204, 22, 0.40)",
  },
  {
    key: "fuchsia-blue",
    name: "Fuchsia/Blue",
    a1: "rgb(217 70 239)", // fuchsia-500
    a2: "rgb(59 130 246)", // blue-500
    a1_22: "rgba(217, 70, 239, 0.22)",
    a1_40: "rgba(217, 70, 239, 0.40)",
  },
  // Pastel / Soft
  {
    key: "pastel-sky-lavender",
    name: "Pastel Sky/Lavender",
    a1: "rgb(125 211 252)", // sky-300
    a2: "rgb(196 181 253)", // purple-300
    a1_22: "rgba(125, 211, 252, 0.22)",
    a1_40: "rgba(125, 211, 252, 0.40)",
  },
  {
    key: "pastel-mint-blue",
    name: "Pastel Mint/Blue",
    a1: "rgb(167 243 208)", // emerald-200
    a2: "rgb(147 197 253)", // blue-300
    a1_22: "rgba(167, 243, 208, 0.22)",
    a1_40: "rgba(167, 243, 208, 0.40)",
  },
  // Monochrome accents
  {
    key: "blue-duo",
    name: "Blue Duo",
    a1: "rgb(37 99 235)", // blue-600
    a2: "rgb(147 197 253)", // blue-300
    a1_22: "rgba(37, 99, 235, 0.22)",
    a1_40: "rgba(37, 99, 235, 0.40)",
  },
];

function applyPreset(p) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--accent-1", p.a1);
  root.style.setProperty("--accent-2", p.a2);
  root.style.setProperty("--accent-1-22", p.a1_22);
  root.style.setProperty("--accent-1-40", p.a1_40);
  root.style.setProperty("--primary", p.a1);
}

export default function PaletteSwitcher() {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [customA1, setCustomA1] = useState("#38bdf8");
  const [customA2, setCustomA2] = useState("#6366f1");

  function hexToRgba(hex, alpha) {
    let h = hex.replace('#','');
    if (h.length === 3) h = h.split('').map((c)=>c+c).join('');
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function applyCustom(a1Hex, a2Hex) {
    const preset = {
      key: 'custom',
      name: 'Custom',
      a1: a1Hex,
      a2: a2Hex,
      a1_22: hexToRgba(a1Hex, 0.22),
      a1_40: hexToRgba(a1Hex, 0.40),
    };
    applyPreset(preset);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("palette-key", preset.key);
      localStorage.setItem("palette-custom", JSON.stringify({ a1: a1Hex, a2: a2Hex }));
    }
  }

  useEffect(() => {
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem("palette-key") : null;
    if (saved === 'custom') {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem("palette-custom") : null;
      try {
        const parsed = raw ? JSON.parse(raw) : null;
        const a1 = parsed?.a1 || customA1;
        const a2 = parsed?.a2 || customA2;
        setCustomA1(a1);
        setCustomA2(a2);
        applyCustom(a1, a2);
      } catch (error) {
        console.warn('Failed to load custom palette:', error);
        applyPreset(PRESETS[0]);
      }
    } else {
      const i = saved ? PRESETS.findIndex((p) => p.key === saved) : -1;
      const startIndex = i >= 0 ? i : 0;
      setIdx(startIndex);
      applyPreset(PRESETS[startIndex]);
    }
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function choose(i) {
    setIdx(i);
    const preset = PRESETS[i];
    applyPreset(preset);
    if (typeof localStorage !== "undefined") localStorage.setItem("palette-key", preset.key);
    setOpen(false);
    setCustomOpen(false);
  }

  const label = `Palette: ${PRESETS[idx]?.name}`;

  function groupOf(key) {
    // Mood-based grouping
    if (/orange|amber|gold|rose|crimson/i.test(key)) return 'Warm/Joyful 🔥';
    if (/emerald|teal|mint|gray|slate/i.test(key)) return 'Fresh/Natural 🌿';
    if (/pastel/i.test(key)) return 'Pastel/Soft 🎨';
    if (/lime|amber-emerald|fuchsia|bold|crimson-gold/i.test(key)) return 'Bold ⚡';
    // default cool
    return 'Cool/Calm ❄️';
  }

  const grouped = PRESETS.reduce((acc, p, i) => {
    const g = groupOf(p.key);
    (acc[g] ||= []).push({ p, i });
    return acc;
  }, {});

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        title={label}
        className="inline-flex h-9 items-center justify-center rounded-md border px-2.5 hover:bg-foreground/5 gap-1.5"
      >
        <Palette className="h-4 w-4" />
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Choose palette"
          className="absolute right-0 z-50 mt-2 w-52 rounded-md border bg-background/95 backdrop-blur shadow-md"
        >
          <div className="py-1 max-h-80 overflow-auto">
            {['Cool/Calm ❄️','Fresh/Natural 🌿','Warm/Joyful 🔥','Bold ⚡','Pastel/Soft 🎨'].map((group) => (
              grouped[group]?.length ? (
                <div key={group}>
                  <div className="px-2.5 py-1 text-xs uppercase tracking-wide text-foreground/50">{group}</div>
                  <ul>
                    {grouped[group].map(({p,i}) => (
                      <li key={p.key}>
                        <button
                          role="menuitemradio"
                          aria-checked={idx === i}
                          onClick={() => choose(i)}
                          className={`w-full px-2.5 py-2 text-left text-sm hover:bg-foreground/5 flex items-center gap-2 ${idx === i ? 'bg-foreground/5' : ''}`}
                        >
                          <span aria-hidden className="inline-flex h-4 w-10 shrink-0 rounded-sm" style={{ background: `linear-gradient(90deg, ${p.a1}, ${p.a2})` }} />
                          <span className="flex-1 truncate">{p.name}</span>
                          {idx === i && <Check className="h-4 w-4 opacity-80" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="my-1 h-px bg-foreground/10" />
                </div>
              ) : null
            ))}

            {/* Custom */}
            <div className="px-2.5 py-2">
              <button
                className="w-full px-2 py-2 text-left text-sm hover:bg-foreground/5 rounded flex items-center gap-2"
                onClick={() => setCustomOpen((v) => !v)}
                aria-expanded={customOpen}
              >
                <span aria-hidden className="inline-flex h-4 w-10 shrink-0 rounded-sm" style={{ background: `linear-gradient(90deg, ${customA1}, ${customA2})` }} />
                <span className="flex-1">Custom</span>
                <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition-transform ${customOpen ? 'rotate-180' : ''}`} />
              </button>
              {customOpen && (
                <div className="mt-2 grid grid-cols-2 gap-2 px-2">
                  <label className="text-xs text-foreground/60">
                    Primary
                    <input type="color" value={customA1} onChange={(e)=>{ setCustomA1(e.target.value); applyCustom(e.target.value, customA2); }} className="mt-1 h-7 w-full cursor-pointer rounded border bg-transparent p-0" />
                  </label>
                  <label className="text-xs text-foreground/60">
                    Partner
                    <input type="color" value={customA2} onChange={(e)=>{ setCustomA2(e.target.value); applyCustom(customA1, e.target.value); }} className="mt-1 h-7 w-full cursor-pointer rounded border bg-transparent p-0" />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
