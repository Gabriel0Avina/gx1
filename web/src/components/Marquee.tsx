const items = [
  "Build",
  "Scale",
  "Evolve",
  "Web",
  "Contenido",
  "Video IA",
  "Automatización",
];

/* Cinta de estado: una pasada del contenido duplicada para el loop infinito */
function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li
          key={item}
          className="type-condensed flex items-center whitespace-nowrap px-6 text-2xl uppercase text-ink-dim sm:text-3xl"
        >
          {item}
          <span aria-hidden className="ml-12 inline-block size-1.5 rotate-45 bg-cyan" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-void py-5">
      <div className="marquee-track flex w-max">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
