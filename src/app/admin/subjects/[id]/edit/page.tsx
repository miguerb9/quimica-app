import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SubjectForm from '@/components/admin/SubjectForm'

interface Props {
  params: { id: string }
}

export default async function EditSubjectPage({ params }: Props) {
  const supabase = createClient()
  const { data: subject } = await supabase
    .from('subjects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!subject) notFound()

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-6">Editar tema</h1>
      <SubjectForm subject={subject} />
    </div>
  )
}
