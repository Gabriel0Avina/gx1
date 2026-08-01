"use client";

import { useMemo } from "react";

type PlexusProps = {
  className?: string;
  count?: number;
  seed?: number;
  variant?: "dark" | "light";
  connectDistance?: number;
};

/* Textura plexus: eco del video de marca (puntos conectados en el estudio).
   SVG estático — sin canvas, sin rAF. Posiciones deterministas por seed
   (mulberry32) para que server y cliente rendericen idéntico. El drift
   de los puntos es CSS puro y se anula con prefers-reduced-motion.
   Uso limitado a 2 secciones (Sistemas y Despegue) por diseño. */
export default function Plexus({
  className = "",
  count = 18,
  seed = 1,
  variant = "dark",
  connectDistance = 0.22,
}: PlexusProps) {
  const { points, lines } = useMemo(() => {
    let s = seed;
    const rand = () => {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const pts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      r: 0.5 + rand() * 0.7,
      delay: rand() * 4,
    }));

    const ls: Array<[number, number]> = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        if (Math.hypot(dx, dy) < connectDistance * 100) ls.push([i, j]);
      }
    }
    return { points: pts, lines: ls };
  }, [count, seed, connectDistance]);

  const stroke =
    variant === "dark"
      ? "oklch(0.55 0.11 210 / 0.35)"
      : "oklch(0.55 0.11 210 / 0.22)";
  const dot =
    variant === "dark"
      ? "oklch(0.85 0.14 200 / 0.55)"
      : "oklch(0.55 0.11 210 / 0.4)";

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <g stroke={stroke} strokeWidth="0.12">
        {lines.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={points[a].x}
            y1={points[a].y}
            x2={points[b].x}
            y2={points[b].y}
          />
        ))}
      </g>
      <g fill={dot}>
        {points.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.r}
            className="plexus-drift"
            style={{ animationDelay: `${p.delay}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
