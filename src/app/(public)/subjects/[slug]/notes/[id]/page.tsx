import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export default async function NotePage({ params }: Props) {
  const { slug, id } = await params;
  const supabase = await createClient();

  const { data: subject } = await supabase
    .from("subjects")
    .select("id, title, slug")
    .eq("slug", slug)
    .single();

  if (!subject) notFound();

  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .eq("subject_id", subject.id)
    .eq("published", true)
    .single();

  if (!note) notFound();

  return (
    <div className="px-4 py-6 md:px-8 max-w-5xl mx-auto">
      {/* Breadcrumb - flex-wrap permite que no se corte en móviles */}
      <nav className="flex items-center gap-2 text-xs md:text-sm text-muted mb-6 flex-wrap leading-relaxed">
        <Link href="/" className="hover:text-ink transition-colors shrink-0">
          Inicio
        </Link>
        <span className="text-muted/50">/</span>
        <Link
          href={`/subjects/${subject.slug}`}
          className="hover:text-ink transition-colors shrink-0"
        >
          {subject.title}
        </Link>
        <span className="text-muted/50">/</span>
        <span className="text-ink truncate max-w-[150px] md:max-w-none">
          {note.title}
        </span>
      </nav>

      <article className="w-full">
        <h1 className="text-2xl md:text-4xl font-display font-semibold text-ink mb-4 break-words">
          {note.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted">
            <span className="font-medium text-accent">{subject.title}</span>
            <span>·</span>
            <span>
              {new Date(note.updated_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          {note.pdf_url && (
            <a
              href={note.pdf_url}
              download
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-accent hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
            >
              ⬇️ <span className="sm:hidden">Descargar</span> PDF
            </a>
          )}
        </div>

        {/* Contenido HTML - prose-sm para móviles, prose normal para escritorio */}
        <div
          className="prose prose-sm md:prose-base max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </article>

      {/* Visualizador de PDF - Se oculta o se ajusta en móviles pequeños */}
      {note.pdf_url && (
        <div className="mt-12 w-full">
          <h2 className="text-lg font-semibold mb-4 text-ink">
            Previsualización del PDF
          </h2>
          <div className="rounded-xl overflow-hidden border border-border shadow-sm bg-muted/10">
            <iframe
              src={`${note.pdf_url}#view=FitH`}
              className="w-full"
              style={{ height: "70vh", minHeight: "400px" }}
              title={`PDF: ${note.title}`}
            />
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href={`/subjects/${subject.slug}`}
          className="inline-flex items-center text-sm text-accent hover:underline font-medium"
        >
          ← Volver a {subject.title}
        </Link>
      </div>
    </div>
  );
}
