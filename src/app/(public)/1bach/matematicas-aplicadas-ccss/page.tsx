import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Subject } from "@/types";

const SUBJECT_IMAGES: Record<string, string> = {
  probabilidad: "/img/probabilidad.jpg",
};

export const revalidate = 3600;

export default async function MatematicasPage() {
  const supabase = createClient();
  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .eq("course", "1bach")
    .eq("asignatura", "matematicas")
    .order("order_index");

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-slate-700 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/1bach" className="hover:text-slate-700 transition-colors">
          1º Bachillerato
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">
          Matemáticas Aplicadas a las CCSS
        </span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3.5 mb-2">
          {/* Icono de cabecera limpio */}
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
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
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0f1f3d]"
            style={{ fontFamily: "Georgia,serif" }}
          >
            Matemáticas Aplicadas a las CCSS
          </h1>
        </div>
        <p className="text-slate-500 ml-12">
          1º Bachillerato · Temario completo
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
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 transition-all duration-200 no-underline"
              >
                <div
                  className="relative w-full shrink-0 overflow-hidden bg-emerald-50/50"
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
                    /* Marcador de posición sofisticado en lugar de emoji flotante */
                    <div className="absolute inset-0 flex items-center justify-center text-emerald-600/20 transition-transform duration-500 group-hover:scale-105">
                      <svg
                        className="w-20 h-20"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
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
                  )}
                  <span className="absolute top-3 left-3 text-[11px] font-bold font-mono tracking-widest px-3 py-1 rounded-full bg-white/90 text-emerald-600 shadow-sm backdrop-blur-sm">
                    T{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4 sm:p-6 flex flex-col gap-1 sm:gap-2">
                  <h2
                    className="text-base sm:text-lg font-bold text-[#0f1f3d] leading-snug group-hover:text-emerald-600 transition-colors"
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
        <div className="text-center py-16 rounded-2xl border border-dashed border-emerald-200 text-slate-400 bg-emerald-50/10">
          {/* Icono centrado en estado vacío */}
          <div className="flex justify-center text-emerald-600/30 mb-4">
            <svg
              className="w-14 h-14"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
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
          <p className="font-semibold text-lg text-slate-500">
            Contenido en preparación
          </p>
        </div>
      )}
    </div>
  );
}
