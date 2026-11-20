# Dashboard — evolución de tareas, noviembre 2026

Modo: Operate. Extensión del dashboard aprobado, conservando Hoy, Clientes, Plan, Biblioteca, Ajustes y acceso por correo. La identidad GX1 y la composición general existentes son la autoridad; no se reemplaza la página pública.

## Direction contract

THESIS: elegir el siguiente paso y terminarlo con un checkbox reconocible, conservando el contexto y la posibilidad de deshacer.

OWN-WORLD: navy profundo en navegación y foco; superficie plata fría para trabajar, Archivo en controles y Jost en títulos. Cyan reservado a acciones y progreso. Ala original de GX1, bordes finos y material metálico discreto.

STORY: crear un cliente, capturar una tarea, filtrar por cliente, marcar sus pasos, completar, comprobar lo hecho o reabrir. Fechas de trabajo y entrega siguen separadas.

FIRST VIEWPORT: sidebar estable, búsqueda y captura superior. Hoy coloca el tablero a la izquierda y el foco y atención a la derecha; tablero principal con Por hacer/En curso/Hecho, filtro Hoy/Todo/Hechas, captura directa y conteo verificable. En pantallas estrechas la navegación se pliega y tres botones permiten cambiar de columna.

FORM: extensión de la dirección existente aprobada; sin selección de un mundo nuevo. El usuario eligió tablero por estados como prioridad de uso. Interacción distintiva: checkbox → guardado confirmado → progreso y Deshacer. Movimiento corto de estado, sin secuencia de entrada.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Referencias funcionales
- Todoist, Today: prioridades, revisar tareas terminadas y agrupar el día. https://www.todoist.com/help/todoist/get-started/plan-your-day-with-the-today-view-UVUXaiSs
- Things, Scheduling: distinguir fecha de trabajo y deadline. https://culturedcode.com/things/support/articles/2803579/
- TickTick, Suggested Tasks: ayudar a elegir sin reemplazar el criterio del usuario. https://help.ticktick.com/articles/7401564165023727616

Sin gamificación, métricas inventadas ni envío de tareas reales a terceros para investigación. Los pasos existentes siguen en el campo checklist; completedAt es opcional para compatibilidad con datos anteriores. Una tarea antigua hecha sin fecha no cuenta como completada hoy.
