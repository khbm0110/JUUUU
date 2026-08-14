"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type Variant = "fade-up" | "fade-in" | "slide-in-start" | "slide-in-end" | "scale-in";

/**
 * Wraps a section and animates it into view exactly once, using whichever
 * `variant` is passed. Callers should vary the `variant` and `delay` per
 * section so the page doesn't feel like the same animation repeating —
 * e.g. hero = slide-in-start, stats = scale-in, services = fade-up.
 */
export default function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? `animate-${variant}` : "opacity-0"} ${className}`}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
