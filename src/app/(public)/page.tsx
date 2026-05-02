import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Subject } from '@/types'

const SUBJECT_ICONS: Record<string, string> = {
  'estructura-atomica': '⚛️',
  'enlace-quimico': '🔗',
  'materia-transformaciones': '🧪',
  'termoquimica': '🌡️',
  'cinetica-quimica': '⚡',
  'equilibrio-quimico': '⚖️',
  'reacciones-precipitacion': '💧',
  'reacciones-acido-base': '🧫',
  'reacciones-redox': '⚡',
  'quimica-organica': '🧬',
}

export const revalidate = 3600 // revalidar cada hora

export default async function HomePage() {
  const supabase = createClient()
  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .order('order_index')

  return (
    <div>
      {/* Hero */}
      <div className="mb-12 pt-4">
        <h1 className="text-4xl font-display font-semibold text-ink mb-3 text-balance">
          Apuntes de Química
        </h1>
        <p className="text-muted text-lg">
          2º de Bachillerato · Temario completo con ejercicios resueltos
        </p>
        <div className="mt-4 h-px bg-border w-full" />
      </div>

      {/* Subjects grid */}
      {subjects && subjects.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {subjects.map((subject: Subject, i: number) => (
            <Link
              key={subject.id}
              href={`/subjects/${subject.slug}`}
              className="group flex items-start gap-4 p-5 border border-border rounded-xl bg-white hover:border-accent hover:shadow-sm transition-all"
            >
              <span className="text-2xl mt-0.5 shrink-0">
                {SUBJECT_ICONS[subject.slug] ?? '📖'}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted">T{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="font-medium text-ink group-hover:text-accent transition-colors leading-snug">
                  {subject.title}
                </h2>
                {subject.description && (
                  <p className="text-sm text-muted mt-1 line-clamp-2">{subject.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted">
          <p className="text-4xl mb-4">📚</p>
          <p className="font-medium">El contenido estará disponible pronto</p>
          <p className="text-sm mt-1">El profesor está preparando los apuntes</p>
        </div>
      )}
    </div>
  )
}
