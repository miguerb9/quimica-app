import Link from "next/link";

export const revalidate = 3600;

export default function Bach2Page() {
  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
        <Link
          href="/"
          className="hover:text-slate-600 transition-colors no-underline"
        >
          Inicio
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600">2º Bachillerato</span>
      </nav>

      {/* Header de la sección (Corregido el doble "2º") */}
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#0f1f3d] mb-2"
          style={{ fontFamily: "Georgia,serif" }}
        >
          2º Bachillerato
        </h1>
        <p className="text-slate-500 text-sm sm:text-base">
          Selecciona una asignatura para explorar sus contenidos
        </p>
        <div className="mt-5 h-px bg-slate-200" />
      </div>

      {/* Grid de asignaturas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        <Link
          href="/2bach/quimica"
          className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/80 p-6 transition-all duration-300 no-underline hover:border-blue-500 hover:shadow-xl hover:shadow-slate-100"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #ffffff 75%, #eff6ff 100%)",
          }}
        >
          {/* Icono SVG de autor: Estructura molecular/enlace orbital.
              Grande, sutil y sin caja contenedora para un look puramente editorial.
          */}
          <div className="absolute right-6 top-6 text-blue-600/20 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-500/30">
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {/* Representación geométrica y limpia de enlaces moleculares */}
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="5" cy="18" r="2" />
              <circle cx="19" cy="18" r="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v3M6.5 16.5l2.5-2M17.5 16.5l-2.5-2"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col gap-5 flex-grow">
            {/* Header de la tarjeta */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600 font-mono block mb-1">
                Ciencias
              </span>
              <h2
                className="text-xl font-bold text-[#0f1f3d] pr-14 leading-snug"
                style={{ fontFamily: "Georgia,serif" }}
              >
                Química
              </h2>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Listado de bloques con guiones minimalistas en lugar de círculos */}
            <ul className="space-y-2 flex-grow">
              {[
                "Estructura atómica",
                "Enlace químico",
                "Termoquímica",
                "Equilibrio químico",
                "Química orgánica…",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2.5 text-sm text-slate-600"
                >
                  <span className="w-1.5 h-[1.5px] bg-slate-300 transition-colors duration-300 group-hover:bg-blue-400 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>

            {/* CTA con animación de línea inferior */}
            <div className="pt-2 flex items-center">
              <span className="relative text-xs font-bold tracking-wider uppercase text-slate-500 pb-0.5 group-hover:text-slate-900 transition-colors duration-300">
                Ver temario →
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
