import { createClient } from '@/lib/supabase/server'
import NoteForm from '@/components/admin/NoteForm'

export default async function NewNotePage() {
  const supabase = createClient()
  const { data: subjects } = await supabase
    .from('subjects')
    .select('id, title')
    .order('order_index')

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-6">Nuevo apunte</h1>
      <NoteForm subjects={subjects ?? []} />
    </div>
  )
}
