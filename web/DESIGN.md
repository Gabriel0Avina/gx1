# Design — GX1 "Cabina de mando"

Concepto: la landing como cabina de una máquina de vuelo. Oscura porque una cabina lo es;
los instrumentos (cyan) marcan lo importante; el metal (plata) es la estructura; el texto
grande y expandido es el fuselaje. No es neón-cyberpunk: es telemetría calibrada.

Arco de luz — "escenas del estudio": la página alterna claro/oscuro como cortes de un
video editado, con el estudio del video de marca (blanco, metal pulido, plexus) como el
mundo claro. Cada frontera claro↔oscuro lleva el corte diagonal del ala
(`.scene-cut-in`: clip 4vw + margin negativo para solapar sin huecos); escenas del mismo
tono van continuas, sin corte.

Arquitectura (v2, oct 2026): el sitio se ordena en un solo camino de tres etapas —
**Se ve · Se encuentra · Vende** — y tiene inicio + 5 páginas de servicio
(`/servicios/[slug]`). El shell (Navbar, Footer, SmoothScroll, cursores, WhatsApp
flotante) vive en `app/layout.tsx`; el contenido sale de `lib/content.ts`.

Coreografía del inicio: Hero (claro, video) → Marquee (oscuro) → Camino (oscuro,
continuo) → Servicios (claro + plexus) → Marca personal (oscuro) → Cómo trabajamos
(claro) → Formas de trabajar (oscuro) → Casos (claro) → Sobre GX1 (oscuro) → FAQ
(oscuro, continuo) → Contacto (claro + plexus, bookend con el hero) → Footer.

Página de servicio: Hero claro (ala, breadcrumb, H1 con keyword) → Qué incluye (oscuro)
→ [Marca personal, solo en marca-e-identidad] → Cómo trabajamos (claro) → Cómo se
contrata (oscuro, la forma del servicio como líder) → Otros servicios + Contacto con el
interés preseleccionado (claro).

Material "glossy metal" (`.material-metal-dark` / `.material-metal-light`): paneles con
degradado diagonal 155° tipo metal cepillado, highlight superior 1px, y filo cyan que se
enciende al entrar en viewport (`.material-lit-edge` + data-lit, interpolado por CSS).
Regla de composición anti-clones: en cada grupo, UN elemento líder con panel completo y
los secundarios en lenguaje silencioso (solo separador) — nunca N paneles idénticos.
Líderes actuales: Vende (Camino), Marca e identidad (Servicios), kit de marca (Marca
personal), Paquete integral (Formas), CAYCER (Casos), fundador (Sobre GX1), formulario
(Contacto). Camino usa además un crescendo tipográfico: cada etapa más grande que la
anterior.
Textura plexus (`Plexus.tsx`, SVG estático determinista): máximo 2 por página — en el
inicio, Servicios y Contacto; en servicios, solo Contacto.

Contenido sobre el pliegue (heros): toda animación de entrada con opacidad lleva un
seguro (`setTimeout → tl.progress(1)`) para que nunca quede invisible si los frames se
congelan (pestaña tapada, render sin pantalla).

## Color

Estrategia: **Drenched** — la superficie ES el navy-negro profundo. Cyan como instrumento
(≤8% de la superficie), plata metálica para display, un solo bloque claro ("hangar") a mitad
de página para ritmo.

```css
:root {
  /* Superficie principal (drench) */
  --void: oklch(0.16 0.03 250);        /* navy-negro profundo — body */
  --void-deep: oklch(0.12 0.025 252);  /* zonas hundidas, hero base */
  --panel: oklch(0.21 0.035 248);      /* paneles elevados */
  --line: oklch(0.32 0.03 245);        /* líneas técnicas / bordes */

  /* Tinta sobre oscuro */
  --ink-bright: oklch(0.96 0.005 240); /* display / headings */
  --ink: oklch(0.82 0.015 240);        /* cuerpo — 4.5:1+ sobre --void */
  --ink-dim: oklch(0.62 0.02 240);     /* metadatos — solo texto grande/labels */

  /* Instrumento */
  --cyan: oklch(0.85 0.14 200);        /* #22d3ee aprox — acento, telemetría */
  --cyan-deep: oklch(0.55 0.11 210);   /* cyan hundido, hovers */

  /* Bloque hangar (sección clara) */
  --hangar: oklch(0.95 0.008 240);     /* gris-azulado frío, NO crema */
  --hangar-ink: oklch(0.18 0.03 250);
}
```

Reglas: cyan nunca como fondo grande; glow solo en filos de 1-2px (como el logo), nunca
en blobs difusos. La sección clara usa el mismo hue frío de la marca, no warm-neutral.

## Typography

- **Display / headings: Archivo (variable, ejes wdth+wght).** Expandido (wdth 110-125) y
  pesado (800-900) para display — fuselaje ancho, mayúsculas solo en palabras cortas.
  Condensado (wdth 75) y medium para labels técnicos. Una familia, dos extremos.
- **Cuerpo: Archivo** wdth 100, wght 400-500, 17-18px, line-height 1.65 (texto claro sobre oscuro).
- **Telemetría: Geist Mono** — SOLO para datos: coordenadas, contadores, índices del embudo,
  timestamps. Es registro legítimo (la marca es técnica), no costume.
- Escala: clamp() fluido, ratio ≥1.3. Display máx 6rem. Letter-spacing display ≥ -0.03em.
- `text-wrap: balance` en headings.

## Layout

- Grid de 12 columnas con líneas técnicas visibles (1px --line) que aparecen por sección —
  el "chasis" de la página.
- Composición asimétrica: el motivo diagonal del ala (≈ -12°) corta heros y transiciones
  de sección vía clip-path.
- Espaciado fluido clamp(): secciones respiran 120-200px en desktop, 64-96px en móvil.
- Una idea por viewport. Scroll largo y deliberado.

## Motion (GSAP + Lenis)

Lenguaje: **calibración e ignición** — las cosas llegan como instrumentos que se encienden
y agujas que se asientan, ease-out expo/quint, nunca bounce.

- Lenis smooth scroll (desactivado con prefers-reduced-motion).
- Hero: secuencia de ignición al cargar — contador mono 0→100, líneas del chasis se trazan,
  display entra por clip-path desde abajo, filo cyan barre una vez.
- ScrollTrigger por sección con carácter propio (no reveal uniforme): números que cuentan,
  embudo que se enciende paso a paso, marquee de servicios, pin + scrub en el caso CAYCER.
- Micro: botones con fill que barre en diagonal (el ala), cursor-follow glow sutil solo desktop.
- Todo visible por defecto; GSAP anima DESDE estados (gsap.from), nunca contenido gated.
- `prefers-reduced-motion`: mata Lenis, timelines saltan a estado final, quedan crossfades.

## Components

- **Botón primario**: bloque cyan sólido, texto navy, corte diagonal en un vértice (clip-path),
  hover = barrido de brillo. Secundario: borde --line, texto --ink-bright.
- **Labels técnicos**: Geist Mono 11-12px uppercase con índice ("SYS.01") — sistema nombrado
  de la marca (telemetría), usado como grama consistente, no eyebrow decorativo genérico.
- **FAQ**: filas de tabla técnica (border-top --line), no cards.
- **Sin cards con ícono arriba.** Los servicios son filas editoriales grandes o marquee, no grid.

## Assets

- Logo: `public/gx1-logo.png` (fondo blanco — solo usable en sección hangar o recortado).
- Ala real (navbar, favicon, placeholder del fundador): `public/gx1-wing.png`, `app/icon.png`, `app/apple-icon.png`.
- Wing motif: recrear como SVG de trazos (filo + 3 plumas) para animar con DrawSVG-style
  (stroke-dashoffset), no usar el PNG.
