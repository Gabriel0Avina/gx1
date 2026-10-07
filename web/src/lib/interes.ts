/* Puente entre CTAs y el formulario de contacto: un CTA (Marca personal,
   Paquete integral…) puede preseleccionar "Qué te interesa" antes de
   llevar al usuario a #contacto. Evento de ventana, sin estado global. */
export const INTERES_EVENT = "gx1:interes";

export function elegirInteres(interes: string) {
  window.dispatchEvent(new CustomEvent(INTERES_EVENT, { detail: interes }));
}
