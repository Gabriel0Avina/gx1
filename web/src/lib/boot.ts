/* Coordina el preloader con la ignición del hero.
   El boot solo corre una vez por sesión y nunca con reduced-motion. */
export function shouldBoot(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Pestaña abierta en background: los rAF están pausados y la secuencia
  // se quedaría congelada tapando el contenido — mejor no arrancarla
  if (document.visibilityState === "hidden") return false;
  try {
    return !window.sessionStorage.getItem("gx1-booted");
  } catch {
    return true;
  }
}

export function markBooted() {
  try {
    window.sessionStorage.setItem("gx1-booted", "1");
  } catch {
    /* sessionStorage bloqueado: el boot se repite, no pasa nada */
  }
}

/* Retraso que el hero espera cuando hay boot (el wipe revela a mitad de ignición) */
export const BOOT_HERO_DELAY = 1.25;
