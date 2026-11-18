# Activar el dashboard privado

El diseño está aprobado. La implementación usa el mismo proyecto Next.js y conserva las URLs públicas en el grupo `(marketing)`.

## Rutas y estado

- `/dashboard/demo`: prueba con datos ficticios; cambios solo en memoria, se descartan al recargar. No utiliza los datos ni el almacenamiento de la cuenta real.
- `/login`: enlace de acceso por correo para la identidad autorizada. Sin configuración muestra acceso pendiente.
- `/dashboard`: requiere sesión verificada, correo confirmado y pertenencia a `dashboard_members`.
- `/api/dashboard/*`: verifica identidad y pertenencia en cada operación. Las mutaciones requieren el mismo origen.

## Preparación de Supabase

1. Crear un proyecto Supabase en la cuenta del propietario. Elegir región y plan en su cuenta; no se ha contratado ningún servicio desde este repositorio.
2. Aplicar `supabase/migrations/202611120001_dashboard.sql` mediante migraciones o SQL Editor. Crea tablas con RLS, guardado atómico con revisión y bucket privado.
3. Crear/invitar la cuenta del propietario en Authentication y obtener su UUID. No habilitar registro público. Insertar ese UUID en `public.dashboard_members` mediante acceso administrativo. Ningún usuario normal puede agregar miembros.
4. Configurar en desarrollo y en el proyecto Vercel, fuera de Git: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `DASHBOARD_OWNER_EMAIL`. El correo confirmado por el propietario se conserva en la conversación y no se publica en el repo. No se necesita una service-role key en la aplicación.
5. En Supabase Auth configurar Site URL del entorno y permitir únicamente los callbacks usados: `https://gx1.vercel.app/auth/callback` y el callback exacto del preview o `http://localhost:3000/auth/callback`. Evitar comodines sobre dominios ajenos.
6. Revisar la configuración de envío de correo de Supabase antes del uso real. El formulario usa OTP/enlace mágico con `shouldCreateUser: false`. El callback intercambia el código PKCE desde el mismo navegador.
7. Volver a desplegar tras configurar las variables. Probar primero en un entorno de prueba con el propietario.

## Datos y archivos

Se guarda un documento de espacio por usuario con revisión incremental. Un advisory lock y la revisión esperada impiden que una pestaña sobrescriba cambios de otra. La API devuelve 409 al detectar conflicto y la interfaz permite exportar el borrador; no lo fusiona silenciosamente.

Las tareas, proyectos, revisiones, versiones y rutinas se validan antes de guardar. Las vistas comparten las mismas tareas. El historial conserva las acciones registradas; la exportación JSON es un respaldo adicional, no una política de recuperación del proveedor.

El primer límite de archivos es 3 MB para permanecer por debajo del límite de petición de las funciones. Acepta PDF, PNG, JPEG, WebP y TXT; videos y originales grandes se agregan mediante enlace externo. Cada subida usa una ruta única. No hay permisos de sobrescritura ni eliminación de archivos en el bucket. Las descargas usan URLs firmadas de 60 segundos. Un fallo al guardar metadatos después de subir un archivo puede dejar un objeto sin referencia; conservarlo y revisar su asociación antes de limpiar almacenamiento.

El acceso al enlace externo depende de los permisos de su proveedor. Las nuevas versiones quedan Por revisar, incluso si una anterior estaba validada.

Las rutinas se preparan desde Plan con «Preparar rutinas hasta…». Se generan ocurrencias con ID único por rutina y fecha, hasta 52 por rutina por operación; se conservan tareas atrasadas. No hay todavía un servicio programado que ejecute rutinas mientras la aplicación está cerrada. Una rutina mensual ajusta su fecha al último día disponible del siguiente mes.

## Verificación antes de depender del sistema

- Probar enlace por correo, sesión vencida y cierre de sesión.
- Verificar que anónimo y otra cuenta reciben rechazo en páginas, lectura/escritura y archivos; repetir directamente contra Supabase para comprobar RLS.
- Crear una tarea, cerrar el navegador y recuperarla; comparar con la fila de base de datos.
- Abrir dos pestañas: guardar en una y comprobar el conflicto en la otra.
- Subir un archivo, validar, agregar v2 y descargar v1; confirmar que las URLs directas no son públicas.
- Aplicar la migración en una base vacía y restaurar una copia de prueba. Definir respaldos del proveedor y comprobar restauración antes de cargar material importante.
- Ejecutar `node --experimental-strip-types --test tests/dashboard.test.mjs`, `npm run lint` y `npm run build` desde `web/`.

Sin proyecto/variables de Supabase, las verificaciones integradas de identidad, RLS y persistencia remota quedan pendientes. La vista demo y las pruebas locales no las sustituyen.
