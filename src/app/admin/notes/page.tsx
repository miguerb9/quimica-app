import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminNotesPage() {
  const supabase = createClient()
  const { data: notes } = await supabase
    .from('notes')
    .select('*, subjects(title, slug)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-semibold">Apuntes</h1>
          <p className="text-muted text-sm mt-0.5">{notes?.length ?? 0} apuntes</p>
        </div>
        <Link
          href="/admin/notes/new"
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nuevo apunte
        </Link>
      </div>

      {notes && notes.length > 0 ? (
        <div className="border border-border rounded-xl overflow-hidden">
          {notes.map((note: any) => (
            <div key={note.id} className="flex items-center justify-between px-5 py-4 bg-white border-b border-border last:border-0">
              <div>
                <p className="font-medium">{note.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted">{note.subjects?.title}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    note.published ? 'bg-green-100 text-green-700' : 'bg-paper-dark text-muted'
                  }`}>
                    {note.published ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/notes/${note.id}/edit`}
                  className="text-sm px-3 py-1.5 border border-border rounded-lg hover:bg-paper-dark transition-colors"
                >
                  Editar
                </Link>
                <DeleteButton id={note.id} table="notes" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted border border-border rounded-xl bg-white">
          <p className="text-3xl mb-3">📄</p>
          <p>No hay apuntes. ¡Crea el primero!</p>
        </div>
      )}
    </div>
  )
}
