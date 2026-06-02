import Link from "next/link";

export const revalidate = 3600;

export default function Bach1Page() {
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
        <span className="text-slate-600">1º Bachillerato</span>
      </nav>

      {/* Header de la sección (Corregido el doble "1º") */}
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#0f1f3d] mb-2"
          style={{ fontFamily: "Georgia,serif" }}
        >
          1º Bachillerato
        </h1>
        <p className="text-slate-500 text-sm sm:text-base">
          Selecciona una asignatura para explorar sus contenidos
        </p>
        <div className="mt-5 h-px bg-slate-200" />
      </div>

      {/* Grid de asignaturas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        <Link
          href="/1bach/matematicas-aplicadas-ccss"
          className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/80 p-6 transition-all duration-300 no-underline hover:border-emerald-500 hover:shadow-xl hover:shadow-slate-100"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #ffffff 75%, #f0fdf4 100%)",
          }}
        >
          {/* Icono SVG de autor: Sin caja contenedora. 
            Grande, sutil, elegante y colocado arriba a la derecha de forma orgánica.
          */}
          <div className="absolute right-6 top-6 text-emerald-600/20 transition-all duration-500 group-hover:scale-110 group-hover:text-emerald-500/30">
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5" /* Trazo fino estilo premium */
              stroke="currentColor"
            >
              {/* Representación abstracta/geométrica de ejes cartesianos y una parábola */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h18M12 3v18"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 7c3 0 4 10 6 10s3-10 6-10"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col gap-5 flex-grow">
            {/* Header de la tarjeta */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-600 font-mono block mb-1">
                Ciencias Sociales
              </span>
              <h2
                className="text-xl font-bold text-[#0f1f3d] pr-14 leading-snug"
                style={{ fontFamily: "Georgia,serif" }}
              >
                Matemáticas Aplicadas
              </h2>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Listado de bloques */}
            <ul className="space-y-2 flex-grow">
              {[
                "Álgebra",
                "Análisis y funciones",
                "Estadística",
                "Probabilidad",
                "Geometría…",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2.5 text-sm text-slate-600"
                >
                  <span className="w-1.5 h-[1.5px] bg-slate-300 transition-colors duration-300 group-hover:bg-emerald-400 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="pt-2 flex items-center">
              <span className="relative text-xs font-bold tracking-wider uppercase text-slate-500 pb-0.5 group-hover:text-slate-900 transition-colors duration-300">
                Ver temario →
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
