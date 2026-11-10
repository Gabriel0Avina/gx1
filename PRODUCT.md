# GX1 Dashboard — contexto de producto

<!-- impeccable:product-schema 1 -->

Estado: definición funcional en curso, 10 de noviembre de 2026. Este documento describe el dashboard interno solicitado por Gabriel. La página pública conserva su contexto en `web/PRODUCT.md` y su identidad en `web/DESIGN.md`.

## Platform

web

## Users

Gabriel, como operador de GX1. El acceso inicial será exclusivamente personal. Clientes y equipo no tendrán cuentas en la primera versión; no se ha solicitado construir sus portales.

## Product Purpose

Un espacio de trabajo sobre gx1.vercel.app para revisar el trabajo diario, decidir qué hacer y cómo hacerlo, organizar proyectos y procesos recurrentes, guardar materiales y volver a verificarlos. Debe permitir retomar lo ya trabajado y sostener un plan de continuidad por cliente.

Las prioridades confirmadas son saber qué hacer hoy y dar seguimiento, junto con planear proyectos y procesos recurrentes. La facilidad de uso y la productividad diaria guían las decisiones.

## Operating Context

- Áreas de trabajo confirmadas: Ecopests, Caycer, RP Carpintería y GX1 como cliente interno.
- Uso frecuente: revisión diaria y planeación del trabajo propio y para clientes.
- El código y la documentación de desarrollo se mantendrán en el repositorio existente `Gabriel0Avina/gx1`.
- La aplicación existente vive en `web/`: Next.js 16.2.10, React 19.2.4, TypeScript y Tailwind CSS 4, según `web/package.json` revisado el 10 de noviembre de 2026.
- El alcance inicial incluye contenido, webs/sistemas y seguimiento recurrente.
- Hoy los pendientes se recuerdan mentalmente y se consultan en un chat de WhatsApp. No existe un sistema organizado confirmado. La ubicación de los archivos sigue pendiente de precisar.
- Los casos publicados no equivalen a un inventario operativo vigente.

## Capabilities and Constraints

Confirmado: organización por cliente, planeación, seguimiento diario, continuidad, materiales y revisión posterior. El orden de implementación y los detalles de comportamiento son propuestas por validar en `docs/dashboard/PLAN.md`.

El repositorio es público. El código y la documentación técnica pueden versionarse allí; las tareas reales, archivos, notas privadas y credenciales deben mantenerse en servicios privados, fuera del repositorio y de `web/public/`.

El desarrollo debe integrarse a la web existente. La ruta propuesta es `/dashboard`; todavía no existe ni está desplegada. La arquitectura de acceso, base de datos y archivos está por decidir; no se han contratado ni creado servicios.

## Brand Commitments

GX1 es la marca existente. Hay logo, ala, tipografías y estilos en `web/`. El dashboard debe conservar la identificación con GX1 y adaptar la interfaz al trabajo frecuente. No se ha pedido rediseñar la página pública.

## Evidence on Hand

- Repositorio clonado y accesible en GitHub: `https://github.com/Gabriel0Avina/gx1`.
- `web/README.md`, `web/PRODUCT.md`, `web/DESIGN.md`, `web/src/app/layout.tsx` y `web/src/lib/content.ts`.
- Nombres de las cuatro áreas confirmados por Gabriel. Los tres clientes externos ya aparecen en los casos públicos del sitio.
- No hay todavía un inventario confirmado de entregables, compromisos, fechas, recurrencias ni pendientes activos. No inventarlos ni convertir ejemplos en tareas reales.
- La revisión del código no encontró autenticación, base de datos ni rutas de dashboard existentes.

## Product Principles

1. Cada visita debe ayudar a decidir una acción concreta.
2. El contexto del proyecto debe conservarse entre sesiones.
3. GX1 recibe el mismo seguimiento que los clientes externos.
4. Capturar un pendiente debe ser fácil; el detalle se agrega cuando resulta útil.
5. Una entrega conserva su evidencia y su revisión, para poder comprobarla después.

## Open Decisions

- Inventario de compromisos actuales y estrategia de incorporación del trabajo en curso.
- Ubicación actual de los archivos.
- Composición de las pantallas y modalidad del prototipo.
- Proveedor de identidad, base de datos, almacenamiento y límites de archivos.
- Cadencia real de revisiones y rutinas por cliente.
