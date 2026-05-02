import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteButton from '@/components/admin/DeleteButton'
import type { Subject } from '@/types'

export default async function AdminSubjectsPage() {
  const supabase = createClient()
  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .order('order_index')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-semibold">Temas</h1>
          <p className="text-muted text-sm mt-0.5">{subjects?.length ?? 0} temas en total</p>
        </div>
        <Link
          href="/admin/subjects/new"
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nuevo tema
        </Link>
      </div>

      {subjects && subjects.length > 0 ? (
        <div className="border border-border rounded-xl overflow-hidden">
          {subjects.map((subject: Subject) => (
            <div key={subject.id} className="flex items-center justify-between px-5 py-4 bg-white border-b border-border last:border-0">
              <div>
                <p className="font-medium">{subject.title}</p>
                <p className="text-xs text-muted font-mono mt-0.5">{subject.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/subjects/${subject.id}/edit`}
                  className="text-sm px-3 py-1.5 border border-border rounded-lg hover:bg-paper-dark transition-colors"
                >
                  Editar
                </Link>
                <DeleteButton id={subject.id} table="subjects" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted border border-border rounded-xl bg-white">
          <p className="text-3xl mb-3">📚</p>
          <p>No hay temas. ¡Crea el primero!</p>
        </div>
      )}
    </div>
  )
}
