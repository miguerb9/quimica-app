import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

interface Props {
  params: { slug: string; id: string };
}

export default async function NotePage({ params }: Props) {
  const supabase = createClient();

  const { data: subject } = await supabase
    .from("subjects")
    .select("id, title, slug")
    .eq("slug", params.slug)
    .single();

  if (!subject) notFound();

  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", params.id)
    .eq("subject_id", subject.id)
    .eq("published", true)
    .single();

  if (!note) notFound();

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-6 flex-wrap">
        <Link href="/" className="hover:text-ink transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link
          href={`/subjects/${subject.slug}`}
          className="hover:text-ink transition-colors"
        >
          {subject.title}
        </Link>
        <span>/</span>
        <span className="text-ink">{note.title}</span>
      </nav>

      <article className="max-w-2xl">
        <h1 className="text-3xl font-display font-semibold text-ink mb-2">
          {note.title}
        </h1>
        <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{subject.title}</span>
            <span>·</span>
            <span>
              Actualizado:{" "}
              {new Date(note.updated_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          {note.pdf_url && (
            <a
              href={note.pdf_url}
              download
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-accent hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              ⬇️ Descargar PDF
            </a>
          )}
        </div>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />

        {note.pdf_url && (
          <div className="mt-8">
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              <iframe
                src={note.pdf_url}
                className="w-full"
                style={{ height: "80vh", minHeight: "500px" }}
                title={`PDF: ${note.title}`}
              />
            </div>
          </div>
        )}
      </article>

      <div className="mt-10 pt-6 border-t border-border">
        <Link
          href={`/subjects/${subject.slug}`}
          className="text-sm text-accent hover:underline"
        >
          ← Volver a {subject.title}
        </Link>
      </div>
    </div>
  );
}
