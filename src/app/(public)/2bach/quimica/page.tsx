import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Subject } from "@/types";

const SUBJECT_IMAGES: Record<string, string> = {
  "estructura-atomica": "/img/estructura-atomica.jpg",
  "enlace-quimico": "/img/enlace-quimico.jpg",
  "materia-transformaciones": "/img/materia-transformaciones.jpg",
  termoquimica: "/img/termoquimica.jpg",
  "cinetica-quimica": "/img/cinetica-quimica.png",
  "equilibrio-quimico": "/img/equilibrio-quimico.png",
  "reacciones-precipitacion": "/img/reacciones-precipitacion.png",
  "reacciones-acido-base": "/img/reacciones-acido-base.png",
  "reacciones-redox": "/img/reacciones-redox.png",
  "quimica-organica": "/img/quimica-organica.png",
};

export const revalidate = 3600;

export default async function QuimicaPage() {
  const supabase = createClient();
  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .eq("course", "2bach")
    .order("order_index");

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-slate-700 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/2bach" className="hover:text-slate-700 transition-colors">
          2º Bachillerato
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">Química</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3.5 mb-2">
          {/* Icono de cabecera limpio */}
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
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
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0f1f3d]"
            style={{ fontFamily: "Georgia,serif" }}
          >
            Química
          </h1>
        </div>
        <p className="text-slate-500 ml-12">
          2º Bachillerato · Temario completo
        </p>
        <div className="mt-4 h-px bg-slate-200" />
      </div>

      {subjects && subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {subjects.map((subject: Subject, i: number) => {
            const imgSrc = SUBJECT_IMAGES[subject.slug];
            return (
              <Link
                key={subject.id}
                href={`/subjects/${subject.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-200 no-underline"
              >
                <div
                  className="relative w-full shrink-0 overflow-hidden bg-blue-50/50"
                  style={{ height: "clamp(160px, 25vw, 240px)" }}
                >
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={subject.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority={i < 2}
                    />
                  ) : (
                    /* Marcador de posición de autor en tarjetas sin imagen */
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600/20 transition-transform duration-500 group-hover:scale-105">
                      <svg
                        className="w-20 h-20"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
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
                  )}
                  <span className="absolute top-3 left-3 text-[11px] font-bold font-mono tracking-widest px-3 py-1 rounded-full bg-white/90 text-blue-600 shadow-sm backdrop-blur-sm">
                    T{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4 sm:p-6 flex flex-col gap-1 sm:gap-2">
                  <h2
                    className="text-base sm:text-lg font-bold text-[#0f1f3d] leading-snug group-hover:text-blue-600 transition-colors"
                    style={{ fontFamily: "Georgia,serif" }}
                  >
                    {subject.title}
                  </h2>
                  {subject.description && (
                    <p className="text-sm text-slate-500 leading-relaxed m-0">
                      {subject.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl border border-dashed border-blue-200 text-slate-400 bg-blue-50/10">
          {/* Icono centrado en estado vacío */}
          <div className="flex justify-center text-blue-600/30 mb-4">
            <svg
              className="w-14 h-14"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
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
          <p className="font-semibold text-lg text-slate-500">
            Contenido en preparación
          </p>
        </div>
      )}
    </div>
  );
}
