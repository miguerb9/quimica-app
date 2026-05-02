import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ExerciseForm from '@/components/admin/ExerciseForm'

interface Props { params: { id: string } }

export default async function EditExercisePage({ params }: Props) {
  const supabase = createClient()
  const [{ data: exercise }, { data: subjects }] = await Promise.all([
    supabase.from('exercises').select('*').eq('id', params.id).single(),
    supabase.from('subjects').select('id, title').order('order_index'),
  ])

  if (!exercise) notFound()

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-6">Editar ejercicio</h1>
      <ExerciseForm exercise={exercise} subjects={subjects ?? []} />
    </div>
  )
}
