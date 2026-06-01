import Link from "next/link";

export const revalidate = 3600;

export default function Bach2Page() {
  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-slate-700 transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">2º Bachillerato</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm shrink-0">2º</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f1f3d]" style={{ fontFamily: "Georgia,serif" }}>
            2º Bachillerato
          </h1>
        </div>
        <p className="text-slate-500 ml-12">Selecciona una asignatura</p>
        <div className="mt-4 h-px bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        <Link
          href="/2bach/quimica"
          className="group flex flex-col rounded-2xl overflow-hidden bg-white border-2 border-blue-200 hover:border-blue-400 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200 no-underline"
        >
          <div className="bg-blue-50 px-6 pt-8 pb-6 flex flex-col items-start gap-3">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm text-3xl">⚗️</span>
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600 font-mono">Ciencias</span>
              <h2 className="text-2xl font-bold text-[#0f1f3d] mt-0.5" style={{ fontFamily: "Georgia,serif" }}>Química</h2>
            </div>
          </div>
          <div className="px-6 py-4 flex flex-col gap-4">
            <ul className="space-y-2">
              {["Estructura atómica", "Enlace químico", "Termoquímica", "Equilibrio químico", "Química orgánica…"].map(s => (
                <li key={s} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                  {s}
                </li>
              ))}
            </ul>
            <span className="self-start text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-700">
              Ver temario →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
