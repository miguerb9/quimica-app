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

export default async function HomePage() {
  const supabase = createClient();
  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .order("order_index");

  return (
    <div>
      {/* Hero */}
      <div className="mb-12 pt-2">
        <h1
          className="mb-3 font-bold text-[#0f1f3d] leading-tight"
          style={{
            fontSize: "clamp(32px,5vw,50px)",
            fontFamily: "Georgia,serif",
            letterSpacing: "-0.02em",
          }}
        >
          Apuntes de <span className="text-blue-600">Química</span>
        </h1>
        <p className="text-lg text-slate-500">
          2º de Bachillerato · Temario completo con ejercicios resueltos
        </p>
        <div className="mt-5 h-px bg-slate-200" />
      </div>

      {/* Grid 2 columnas */}
      {subjects && subjects.length > 0 ? (
        <div className="grid grid-cols-2 gap-6">
          {subjects.map((subject: Subject, i: number) => {
            const imgSrc = SUBJECT_IMAGES[subject.slug];
            return (
              <Link
                key={subject.id}
                href={`/subjects/${subject.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 transition-all duration-200 no-underline"
              >
                {/* Zona imagen: altura fija, recorta limpiamente */}
                <div
                  className="relative w-full shrink-0 overflow-hidden bg-slate-100"
                  style={{ height: "240px" }}
                >
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={subject.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i < 2}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-5xl">
                      🧪
                    </div>
                  )}

                  {/* Badge número */}
                  <span className="absolute top-3 left-3 text-[11px] font-bold font-mono tracking-widest px-3 py-1 rounded-full bg-white/90 text-blue-600 shadow-sm backdrop-blur-sm">
                    T{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Texto debajo */}
                <div className="p-6 flex flex-col gap-2">
                  <h2
                    className="text-lg font-bold text-[#0f1f3d] leading-snug group-hover:text-blue-600 transition-colors"
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
        <div className="text-center py-20 rounded-2xl border border-dashed border-blue-200 text-slate-400">
          <p className="text-5xl mb-4">⚗️</p>
          <p className="font-semibold text-lg text-slate-500">
            Contenido en preparación
          </p>
          <p className="text-sm mt-1">
            El profesor está preparando los apuntes
          </p>
        </div>
      )}
    </div>
  );
}
