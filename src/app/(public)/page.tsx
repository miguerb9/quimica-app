import Link from "next/link";

export const revalidate = 3600;

const COURSES = [
  {
    id: "1bach",
    href: "/1bach",
    level: "1º",
    title: "1º Bachillerato",
    subtitle: "Primer curso",
    subjects: ["Matemáticas Aplicadas a las CCSS"],
    color: "emerald",
    emoji: "📐",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "text-emerald-600",
  },
  {
    id: "2bach",
    href: "/2bach",
    level: "2º",
    title: "2º Bachillerato",
    subtitle: "Segundo curso",
    subjects: ["Química"],
    color: "blue",
    emoji: "⚗️",
    bg: "bg-blue-50",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-400",
    badge: "bg-blue-100 text-blue-700",
    icon: "text-blue-600",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl">
        {COURSES.map((course) => (
          <Link
            key={course.id}
            href={course.href}
            className={`group flex flex-col rounded-2xl overflow-hidden bg-white border-2 ${course.border} ${course.hoverBorder} shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200 no-underline`}
          >
            {/* Top colored band */}
            <div className={`${course.bg} px-6 pt-8 pb-6 flex flex-col items-start gap-3`}>
              <span
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm text-3xl`}
              >
                {course.emoji}
              </span>
              <div>
                <span className={`text-xs font-bold tracking-widest uppercase ${course.icon} font-mono`}>
                  {course.subtitle}
                </span>
                <h2
                  className="text-2xl font-bold text-[#0f1f3d] mt-0.5"
                  style={{ fontFamily: "Georgia,serif" }}
                >
                  {course.title}
                </h2>
              </div>
            </div>

            {/* Subjects list */}
            <div className="px-6 py-4 flex-1 flex flex-col justify-between gap-4">
              <ul className="space-y-2">
                {course.subjects.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className={`w-1.5 h-1.5 rounded-full ${course.badge.replace("text-", "bg-").split(" ")[0]}`} />
                    {s}
                  </li>
                ))}
              </ul>
              <span className={`self-start text-xs font-semibold px-3 py-1.5 rounded-full ${course.badge} group-hover:opacity-80 transition-opacity`}>
                Ver asignaturas →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
