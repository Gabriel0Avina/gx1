/* Ala GX1 recreada del logo: hoja metálica facetada con punta abajo-derecha,
   canto cyan-azul con glow en el borde superior y 3 plumas en abanico.
   viewBox 480×640 — misma geometría que usa WingScene en 3D. */
export default function WingMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="gx1-blade" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#fbfcfe" />
          <stop offset="0.45" stopColor="#cdd5e0" />
          <stop offset="1" stopColor="#8792a3" />
        </linearGradient>
        <linearGradient id="gx1-facet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9aa5b6" />
          <stop offset="1" stopColor="#5c6879" />
        </linearGradient>
        <linearGradient id="gx1-feather" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#f2f5f9" />
          <stop offset="0.6" stopColor="#b9c3d0" />
          <stop offset="1" stopColor="#7e8a9b" />
        </linearGradient>
        <linearGradient id="gx1-cyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7df9ff" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
        <filter id="gx1-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Glow del canto (duplicado difuminado debajo) */}
      <path
        d="M100 44 Q244 116 324 208 L312 224 Q238 136 96 66 Z"
        fill="url(#gx1-cyan)"
        filter="url(#gx1-glow)"
        opacity="0.85"
      />
      <path
        d="M102 352 Q212 374 306 404 L298 414 Q210 386 108 366 Z"
        fill="url(#gx1-cyan)"
        filter="url(#gx1-glow)"
        opacity="0.7"
      />

      {/* Hoja principal — faceta clara */}
      <path
        d="M100 44 Q244 116 324 208 Q380 350 428 560 Q332 340 252 248 Q170 142 100 44 Z"
        fill="url(#gx1-blade)"
      />
      {/* Faceta oscura del filo derecho */}
      <path
        d="M324 208 Q380 350 428 560 Q390 402 338 302 Q327 252 324 208 Z"
        fill="url(#gx1-facet)"
      />

      {/* Canto cyan nítido sobre el borde superior */}
      <path
        d="M100 44 Q244 116 324 208 L312 224 Q238 136 96 66 Z"
        fill="url(#gx1-cyan)"
      />

      {/* Plumas en abanico */}
      <path
        d="M62 212 Q190 234 302 290 Q198 302 118 336 Q78 272 62 212 Z"
        fill="url(#gx1-feather)"
      />
      <path
        d="M102 352 Q212 374 306 404 Q216 426 158 470 Q120 408 102 352 Z"
        fill="url(#gx1-feather)"
      />
      {/* Sliver cyan de la pluma media */}
      <path
        d="M102 352 Q212 374 306 404 L298 414 Q210 386 108 366 Z"
        fill="url(#gx1-cyan)"
        opacity="0.9"
      />
      <path
        d="M152 478 Q232 486 296 506 Q238 530 198 574 Q168 522 152 478 Z"
        fill="url(#gx1-feather)"
      />
    </svg>
  );
}
