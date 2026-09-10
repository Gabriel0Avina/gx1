# GX1 — IA Systems

Marca y landing page de **GX1**, agencia de marketing y automatización con IA en Guadalajara.
*Build · Scale · Evolve.*

## Estructura

```
GX1/
├── web/          Landing page (Next.js 16 + Tailwind v4 + GSAP)
├── assets/       Assets de marca (logo, ala)
├── reports/      Auditorías (SEO/GEO/AEO)
└── .agents/      Contexto de marketing del proyecto
```

## App web

La landing vive en [`web/`](web). Stack: Next.js 16 (App Router) · Tailwind CSS v4 · GSAP + Lenis · Three.js.

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

Importar `Gabriel0Avina/gx1` en Vercel con estos ajustes:

| Ajuste | Valor |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `web` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | Automático de Next.js |

El dominio público usado por canonical, Open Graph, sitemap y datos estructurados
se resuelve al compilar, en este orden:

1. `NEXT_PUBLIC_SITE_URL`, si se configura con una URL completa, como `https://dominio-confirmado.com`.
2. `VERCEL_PROJECT_PRODUCTION_URL`, que Vercel proporciona automáticamente.
3. `VERCEL_URL`, si no está disponible el dominio de producción.
4. `http://localhost:3000` para desarrollo local.

No hace falta configurar un dominio propio para el primer despliegue. Mantener
activada la exposición de variables de sistema en Vercel. Si se configura o cambia
`NEXT_PUBLIC_SITE_URL`, hacer un nuevo despliegue para actualizar las páginas estáticas.

Comprobación local de producción: ejecutar `npm ci` y `npm run build` dentro de `web/`.
