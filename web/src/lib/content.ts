/* Contenido compartido entre componentes visibles, páginas de servicio y
   datos estructurados (JSON-LD). Una sola fuente: lo que lee el usuario es
   lo que lee Google. Textos tomados del documento de contenido GX1 (oct 2026). */

export type Etapa = "ve" | "encuentra" | "vende";
export type Forma = "proyecto" | "mensualidad";

export type Servicio = {
  slug: string;
  num: string;
  nombre: string;
  etapa: Etapa;
  tarjeta: string;
  intro: string;
  incluye: string[];
  idealPara: string;
  forma: Forma;
  interes: string;
  seo: { title: string; description: string; keyword: string; h1: string };
};

export const servicios: Servicio[] = [
  {
    slug: "marca-e-identidad",
    num: "01",
    nombre: "Marca e identidad",
    etapa: "ve",
    tarjeta:
      "Logo, colores, tipografía y voz para que te reconozcan y confíen en ti desde el primer vistazo.",
    intro:
      "Tu marca es lo primero que un cliente ve de ti, y decide si confía antes de leer una palabra. Definimos tu posicionamiento y tu mensaje, y le damos logo, colores, tipografía y voz para que te reconozcan igual en tu página, tus redes y tu tarjeta.",
    incluye: [
      "Posicionamiento y mensaje de marca",
      "Logo, paleta de colores y tipografía",
      "Manual de marca y plantillas para redes",
      "Marca personal para fundadores y profesionistas",
    ],
    idealPara:
      "Negocios que arrancan, o que se ven distinto en cada lugar donde aparecen.",
    forma: "proyecto",
    interes: "Marca e identidad",
    seo: {
      title: "Diseño de marca e identidad visual en Guadalajara | GX1",
      description:
        "Logo, colores, tipografía y voz de marca para tu empresa o tu marca personal. Posicionamiento y manual de marca con GX1, en Guadalajara.",
      keyword: "diseño de marca Guadalajara",
      h1: "Diseño de marca e identidad visual en Guadalajara",
    },
  },
  {
    slug: "visibilidad-y-campanas",
    num: "02",
    nombre: "Visibilidad y campañas",
    etapa: "encuentra",
    tarjeta:
      "SEO local, Google Business Profile y campañas para que te encuentren quienes ya te están buscando.",
    intro:
      "Hay clientes que ya te están buscando en Google y en redes; la pregunta es si te encuentran a ti o a tu competencia. Optimizamos tu perfil de Google Business y tu SEO local, y lanzamos campañas en Meta Ads con seguimiento mensual de los contactos que generan.",
    incluye: [
      "Perfil de Google Business optimizado y SEO local",
      "Campañas pagadas en Meta Ads",
      "Seguimiento mensual de contactos y resultados",
    ],
    idealPara:
      "Negocios locales y empresas de servicios que dependen de que el cliente los encuentre.",
    forma: "mensualidad",
    interes: "Visibilidad y campañas",
    seo: {
      title: "SEO local y campañas en Meta Ads en Guadalajara | GX1",
      description:
        "Aparece cuando te buscan: Google Business Profile, SEO local y campañas en Meta Ads con reporte mensual de contactos. Agencia GX1 en Guadalajara.",
      keyword: "SEO local Guadalajara",
      h1: "SEO local y campañas en Meta Ads en Guadalajara",
    },
  },
  {
    slug: "video-y-redes-sociales",
    num: "03",
    nombre: "Video y redes sociales",
    etapa: "encuentra",
    tarjeta:
      "Contenido que educa, muestra resultados y mantiene tu marca presente cada semana.",
    intro:
      "Publicar de vez en cuando no construye presencia. Armamos tu calendario y el guion de cada pieza, producimos y editamos video para TikTok, Instagram y Facebook con apoyo de IA, y gestionamos tus redes cada semana con un reporte de cierre.",
    incluye: [
      "Calendario de contenido y guiones por pieza",
      "Video para TikTok, Instagram y Facebook",
      "Edición y producción con apoyo de IA",
      "Gestión semanal de redes y reporte de cierre",
    ],
    idealPara:
      "Empresas que saben que deben publicar pero no tienen quién lo haga de forma constante.",
    forma: "mensualidad",
    interes: "Video y redes",
    seo: {
      title: "Videos para redes sociales y gestión de contenido | GX1",
      description:
        "Guiones, video para TikTok, Instagram y Facebook, edición con IA y gestión semanal de redes. Contenido constante para tu marca con GX1.",
      keyword: "videos para redes sociales",
      h1: "Videos para redes sociales y gestión de contenido",
    },
  },
  {
    slug: "web-y-software",
    num: "04",
    nombre: "Web y software a la medida",
    etapa: "ve",
    tarjeta:
      "Página, catálogo y un sistema para controlar servicios, personal y manuales.",
    intro:
      "Tu página es tu mejor vendedor cuando está bien hecha, y tu sistema interno es lo que te deja crecer sin desorden. Hacemos sitios rápidos y listos para celular, catálogos o tiendas en línea, y sistemas a la medida en Laravel para controlar servicios, personal y procesos.",
    incluye: [
      "Sitio web profesional, rápido y listo para celular",
      "Catálogo o tienda en línea",
      "Sistemas a la medida desarrollados en Laravel",
      "Mantenimiento y soporte mensual",
    ],
    idealPara:
      "Empresas que ya superaron las hojas de cálculo y necesitan algo hecho a su proceso.",
    forma: "proyecto",
    interes: "Web y software",
    seo: {
      title: "Desarrollo web y software a la medida en Laravel | GX1",
      description:
        "Sitios web, catálogos y sistemas a la medida en Laravel para controlar servicios, personal y procesos. Desarrollo de software en Guadalajara.",
      keyword: "software a la medida Guadalajara",
      h1: "Desarrollo web y software a la medida en Laravel",
    },
  },
  {
    slug: "automatizacion-con-ia",
    num: "05",
    nombre: "Automatización con IA",
    etapa: "vende",
    tarjeta:
      "Flujos que cotizan, recuerdan, certifican y dan seguimiento sin trabajo manual.",
    intro:
      "Cada prospecto que espera respuesta se enfría. Automatizamos la captura y el seguimiento por WhatsApp o correo, calificamos a cada prospecto con atención automática y conectamos todo a un CRM con reportes que se generan solos.",
    incluye: [
      "Captura de prospectos y seguimiento por WhatsApp o correo",
      "Atención automática que califica a cada prospecto",
      "CRM y flujos de venta",
      "Reportes que se generan solos",
    ],
    idealPara:
      "Equipos de ventas o servicio que hoy pierden tiempo y clientes por responder tarde.",
    forma: "mensualidad",
    interes: "Automatización con IA",
    seo: {
      title: "Automatización de ventas con IA y WhatsApp | GX1",
      description:
        "Automatiza cotizaciones, seguimiento y atención de prospectos con IA, WhatsApp y CRM. Menos trabajo manual y ningún cliente sin respuesta.",
      keyword: "automatización de ventas",
      h1: "Automatización de ventas con IA y WhatsApp",
    },
  },
];

export const getServicio = (slug: string) =>
  servicios.find((s) => s.slug === slug);

/* El camino: la idea que ordena todo el sitio */
export const etapas: Array<{
  id: Etapa;
  nombre: string;
  resuelve: string;
  problema: string;
}> = [
  {
    id: "ve",
    nombre: "Se ve",
    resuelve: "Que te reconozcan y confíen en ti",
    problema:
      "Tu web está vieja o tu marca se ve distinta en cada lugar donde aparece.",
  },
  {
    id: "encuentra",
    nombre: "Se encuentra",
    resuelve: "Que te busquen y te vean seguido",
    problema:
      "Publicas cuando hay tiempo, sin plan, y quien te busca no te encuentra.",
  },
  {
    id: "vende",
    nombre: "Vende",
    resuelve: "Que ningún prospecto se enfríe",
    problema:
      "Los prospectos llegan, pero se enfrían esperando respuesta y seguimiento.",
  },
];

export const pasos = [
  {
    id: "T-01",
    titulo: "Diagnóstico",
    texto:
      "Revisamos tu marca, tus redes y la forma en que hoy te llegan los clientes.",
  },
  {
    id: "T-02",
    titulo: "Estrategia",
    texto:
      "Definimos qué servicio va primero y qué resultado buscamos con él.",
  },
  {
    id: "T-03",
    titulo: "Producción",
    texto:
      "Creamos, desarrollamos y automatizamos con apoyo de IA para entregar rápido y con constancia.",
  },
  {
    id: "T-04",
    titulo: "Medición y mejora",
    texto:
      "Cada mes revisamos qué funcionó y ajustamos. Recibes un reporte claro, sin tecnicismos.",
  },
];

export const formas: Array<{
  id: Forma | "integral";
  nombre: string;
  para: string;
  como: string;
  recibes: string;
  destacado?: boolean;
}> = [
  {
    id: "integral",
    nombre: "Paquete integral",
    para: "Marca, contenido, web y automatización",
    como: "Un solo responsable y un solo pago mensual",
    recibes:
      "Todo el sistema trabajando junto, con mejor precio que por separado",
    destacado: true,
  },
  {
    id: "proyecto",
    nombre: "Por proyecto",
    para: "Marca e identidad, sitio web, software a la medida",
    como: "Alcance cerrado, fecha de entrega y pago por etapas",
    recibes: "Entregables definidos desde el inicio",
  },
  {
    id: "mensualidad",
    nombre: "Mensualidad",
    para: "Video y redes, campañas, mantenimiento web, automatización",
    como: "Un equipo constante con calendario de trabajo",
    recibes: "Contenido y soporte continuos, con reporte mensual",
  },
];

export const marcaPersonal = {
  titulo: "Marca personal para fundadores y profesionistas",
  texto:
    "Tu empresa se parece a ti. Definimos cómo quieres que te vean, le damos identidad visual y te dejamos listo para aparecer en video con claridad y constancia.",
  recibes: [
    "Posicionamiento y mensaje: qué haces, para quién y por qué tú",
    "Identidad visual: colores, tipografía y estilo propios",
    "Perfiles optimizados en redes, con bio y foto de portada",
    "Sesión de foto y video",
    "Plan de contenido de arranque para las primeras semanas",
  ],
  continua:
    "Al terminar, tu marca personal pasa a una mensualidad de contenido en video para mantenerla activa.",
};

/* Casos: solo lo que ya es verdad. Los proyectos en curso van sin nombre
   hasta tener permiso escrito del cliente. */
export const casos = {
  lider: {
    cliente: "CAYCER Ingeniería y Metrología",
    giro: "Ingeniería y metrología",
    hace: "Estrategia y producción de contenido para redes: guiones por pieza, video y reporte de cierre semanal.",
    estado: "Trabajo continuo",
    plataformas: ["TikTok", "Instagram", "Facebook", "YouTube"],
    embudo: [
      { id: "T-01", paso: "TikTok", detalle: "El contenido despierta interés" },
      { id: "T-02", paso: "Google", detalle: "Buscan la marca por su nombre" },
      { id: "T-03", paso: "caycer.ing", detalle: "Llegan al sitio y contactan" },
    ],
  },
  enCurso: [
    {
      cliente: "Empresa de fumigación y control de plagas",
      hace: "Landing page y catálogo de servicios; como siguiente etapa, un sistema para controlar servicios, personal y manuales por tipo de servicio.",
      estado: "Proyecto en curso",
    },
    {
      cliente: "Carpintería residencial premium",
      hace: "Sitio web con galería de obras y un sistema que controlará las obras en producción y compartirá el avance con el cliente final.",
      estado: "Proyecto en curso",
    },
  ],
  confianza: [
    "Agencia con base en Guadalajara",
    "Desarrollo propio en Laravel",
    "Producción apoyada en IA",
  ],
};

export const preguntas = [
  {
    q: "¿Tengo que contratar todos los servicios?",
    a: "No. Puedes empezar por uno, por ejemplo la marca o el contenido en video, y sumar los demás cuando lo necesites. Todos están pensados para conectarse.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance. Después de una llamada de diagnóstico te enviamos una propuesta con entregables, tiempos y forma de pago.",
  },
  {
    q: "¿En qué se diferencia GX1 de una agencia de redes tradicional?",
    a: "Aquí marca, contenido, web y automatización los lleva un mismo equipo. Además usamos IA para producir más rápido, así que entregas constantes sin que el costo se dispare.",
  },
  {
    q: "¿Qué es automatizar con IA en mi negocio?",
    a: "Es que las tareas repetitivas se hagan solas. Por ejemplo: que cada prospecto reciba respuesta al instante, que se le dé seguimiento por WhatsApp y que tu equipo vea quién está listo para comprar.",
  },
  {
    q: "¿Los videos hechos con IA se ven artificiales?",
    a: "Usamos IA para producir y editar más rápido, y cada pieza se revisa antes de publicarse para que suene y se vea como tu marca.",
  },
  {
    q: "¿Qué pasa cuando termina mi sitio web?",
    a: "Te lo entregamos funcionando. Si quieres, seguimos con una mensualidad de mantenimiento y soporte para que nada se quede desactualizado.",
  },
];

/* Opciones del formulario de contacto */
export const intereses = [
  ...servicios.map((s) => s.interes),
  "Paquete integral",
  "No lo sé todavía",
];
