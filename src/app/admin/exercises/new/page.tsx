import { createClient } from '@/lib/supabase/server'
import ExerciseForm from '@/components/admin/ExerciseForm'

export default async function NewExercisePage() {
  const supabase = createClient()
  const { data: subjects } = await supabase
    .from('subjects')
    .select('id, title')
    .order('order_index')

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-6">Nuevo ejercicio</h1>
      <ExerciseForm subjects={subjects ?? []} />
    </div>
  )
}
