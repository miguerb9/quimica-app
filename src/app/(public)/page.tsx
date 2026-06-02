import Link from "next/link";

export const revalidate = 3600;

const COURSES = [
  {
    id: "1bach",
    href: "/1bach",
    label: "PRIMER CURSO",
    title: "1º Bachillerato",
    subjects: ["Matemáticas Aplicadas a las CCSS"],
    accent: "hover:border-emerald-500", // Clase dinámica para el borde
    accentTextClass: "text-emerald-500", // Para la flecha y etiquetas
    accentLight: "#f0fdf4", // emerald-50
    accentColor: "#10b981", // Para el número de fondo y línea
    number: "1",
  },
  {
    id: "2bach",
    href: "/2bach",
    label: "SEGUNDO CURSO",
    title: "2º Bachillerato",
    subjects: ["Química"],
    accent: "hover:border-blue-500",
    accentTextClass: "text-blue-500",
    accentLight: "#eff6ff", // blue-50
    accentColor: "#3b82f6",
    number: "2",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-10 sm:mb-14 pt-2">
        <h1
          className="mb-3 font-bold text-[#0f1f3d] leading-tight"
          style={{
            fontSize: "clamp(26px,5vw,50px)",
            fontFamily: "Georgia,serif",
            letterSpacing: "-0.02em",
          }}
        >
          Apuntes de <span className="text-blue-600">Bachillerato</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500">
          Elige tu curso para ver las asignaturas disponibles
        </p>
        <div className="mt-4 sm:mt-5 h-px bg-slate-200" />
      </div>

      {/* Course cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        {COURSES.map((course) => (
          <Link
            key={course.id}
            href={course.href}
            className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/80 p-6 transition-all duration-300 no-underline hover:shadow-xl hover:shadow-slate-100/70 ${course.accent}`}
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 60%, ${course.accentLight} 100%)`,
            }}
          >
            {/* Fondo decorativo: Número gigante traslúcido */}
            <span
              className="absolute right-4 bottom-2 text-8xl font-black select-none pointer-events-none opacity-[0.07] transition-transform duration-500 group-hover:scale-110"
              style={{
                color: course.accentColor,
                fontFamily: "Georgia,serif",
              }}
            >
              {course.number}
            </span>

            {/* Contenido principal */}
            <div className="relative z-10 flex flex-col h-full justify-between gap-5">
              {/* Header */}
              <div>
                <span
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase font-mono block mb-1 ${course.accentTextClass}`}
                >
                  {course.label}
                </span>
                <h2
                  className="text-2xl font-bold text-[#0f1f3d] leading-tight"
                  style={{ fontFamily: "Georgia,serif" }}
                >
                  {course.title}
                </h2>
              </div>

              {/* Subjects */}
              <ul className="space-y-2.5 my-2 flex-grow">
                {course.subjects.map((subject) => (
                  <li
                    key={subject}
                    className="flex items-center gap-2 text-sm text-slate-600 font-medium"
                  >
                    {/* Flecha que reacciona al hover de la tarjeta */}
                    <svg
                      className={`w-3 h-3 shrink-0 transition-transform duration-300 translate-x-0 group-hover:translate-x-1 ${course.accentTextClass}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                    {subject}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="pt-2 flex items-center">
                <span className="relative text-sm font-semibold text-slate-700 pb-0.5 group-hover:text-slate-900 transition-colors duration-300">
                  Explorar temario
                  <span
                    className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: course.accentColor }}
                  />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
