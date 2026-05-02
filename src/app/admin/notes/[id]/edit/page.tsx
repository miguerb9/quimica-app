import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NoteForm from '@/components/admin/NoteForm'

interface Props { params: { id: string } }

export default async function EditNotePage({ params }: Props) {
  const supabase = createClient()
  const [{ data: note }, { data: subjects }] = await Promise.all([
    supabase.from('notes').select('*').eq('id', params.id).single(),
    supabase.from('subjects').select('id, title').order('order_index'),
  ])

  if (!note) notFound()

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-6">Editar apunte</h1>
      <NoteForm note={note} subjects={subjects ?? []} />
    </div>
  )
}
