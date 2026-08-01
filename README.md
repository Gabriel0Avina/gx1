# GX1 — IA Systems

Marca y landing page de **GX1**, agencia de marketing y automatización con IA en Guadalajara.
*Build · Scale · Evolve.*

## Estructura

```
GX1/
├── web/          Landing page (Next.js 15 + Tailwind v4 + GSAP)
├── assets/       Assets de marca (logo, ala)
├── reports/      Auditorías (SEO/GEO/AEO)
└── .agents/      Contexto de marketing del proyecto
```

## App web

La landing vive en [`web/`](web). Stack: Next.js 15 (App Router) · Tailwind CSS v4 · GSAP + Lenis · Three.js.

```bash
cd web
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Sistema de diseño

"Cabina de mando" — escenas alternadas claro/oscuro con material metálico glossy y acento cyan,
inspirado en el logo (ala de metal pulido). Detalles en [`web/DESIGN.md`](web/DESIGN.md).
Contexto de producto y posicionamiento en [`web/PRODUCT.md`](web/PRODUCT.md).

## Deploy

Configurado para Vercel. Root directory del proyecto: `web/`.
