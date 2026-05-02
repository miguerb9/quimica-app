import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Note, Exercise } from "@/types";

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

export default async function SubjectPage({ params }: Props) {
  const supabase = createClient();

  const { data: subject } = await supabase
    .from("subjects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!subject) notFound();

  const [{ data: notes }, { data: exercises }] = await Promise.all([
    supabase
      .from("notes")
      .select("*")
      .eq("subject_id", subject.id)
      .eq("published", true)
      .order("order_index"),
    supabase
      .from("exercises")
      .select("*")
      .eq("subject_id", subject.id)
      .order("order_index"),
  ]);

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-ink transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <span className="text-ink">{subject.title}</span>
      </nav>

      <h1 className="text-3xl font-display font-semibold text-ink mb-2">
        {subject.title}
      </h1>
      {subject.description && (
        <p className="text-muted mb-8">{subject.description}</p>
      )}

      <div className="flex gap-2 mb-8">
        <span className="text-xs bg-accent-light text-accent px-2 py-1 rounded font-medium">
          {notes?.length ?? 0} apuntes
        </span>
        <span className="text-xs bg-paper-dark text-muted px-2 py-1 rounded font-medium">
          {exercises?.length ?? 0} ejercicios
        </span>
      </div>

      {/* Notes */}
      {notes && notes.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
            <span>📄</span> Apuntes
          </h2>
          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {notes.map((note: Note) => (
              <div
                key={note.id}
                className="flex items-center justify-between bg-white hover:bg-paper-dark transition-colors group border-0"
              >
                <Link
                  href={`/subjects/${subject.slug}/notes/${note.id}`}
                  className="flex-1 flex items-center gap-2 px-5 py-4"
                >
                  <span className="font-medium group-hover:text-accent transition-colors">
                    {note.title}
                  </span>
                  {note.pdf_url && (
                    <span className="text-xs bg-accent-light text-accent px-1.5 py-0.5 rounded font-medium">
                      PDF
                    </span>
                  )}
                </Link>
                {note.pdf_url ? (
                  <a
                    href={note.pdf_url}
                    download
                    className="px-4 py-4 text-muted hover:text-accent transition-colors text-sm"
                    title="Descargar PDF"
                  >
                    ⬇️
                  </a>
                ) : (
                  <Link
                    href={`/subjects/${subject.slug}/notes/${note.id}`}
                    className="px-5 py-4 text-muted text-sm"
                  >
                    →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Exercises */}
      {exercises && exercises.length > 0 && (
        <section>
          <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
            <span>✏️</span> Ejercicios
          </h2>
          <div className="space-y-4">
            {exercises.map((ex: Exercise, i: number) => (
              <div
                key={ex.id}
                className="border border-border rounded-xl p-5 bg-white"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm text-muted shrink-0 mt-0.5">
                    #{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-2">{ex.title}</h3>
                    <div
                      className="prose text-sm text-ink/80"
                      dangerouslySetInnerHTML={{ __html: ex.statement }}
                    />
                    {ex.show_solution && ex.solution && (
                      <details className="mt-4">
                        <summary className="text-sm font-medium text-accent cursor-pointer hover:underline">
                          Ver solución
                        </summary>
                        <div
                          className="prose text-sm mt-3 p-4 bg-paper-dark rounded-lg"
                          dangerouslySetInnerHTML={{ __html: ex.solution }}
                        />
                      </details>
                    )}
                    {!ex.show_solution && (
                      <p className="mt-3 text-xs text-muted italic">
                        La solución no está disponible aún
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!notes?.length && !exercises?.length && (
        <div className="text-center py-16 text-muted">
          <p className="text-3xl mb-3">🚧</p>
          <p>Contenido en preparación</p>
        </div>
      )}
    </div>
  );
}
