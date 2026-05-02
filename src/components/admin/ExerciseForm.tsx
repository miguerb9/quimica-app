'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Exercise } from '@/types'

interface Props {
  exercise?: Exercise
  subjects: { id: string; title: string }[]
}

export default function ExerciseForm({ exercise, subjects }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    subject_id: exercise?.subject_id ?? subjects[0]?.id ?? '',
    title: exercise?.title ?? '',
    statement: exercise?.statement ?? '',
    solution: exercise?.solution ?? '',
    show_solution: exercise?.show_solution ?? false,
    order_index: exercise?.order_index ?? 0,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const method = exercise ? 'PUT' : 'POST'
    const url = exercise ? `/api/admin/exercises/${exercise.id}` : '/api/admin/exercises'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Error al guardar')
      setLoading(false)
      return
    }

    router.push('/admin/exercises')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Tema</label>
          <select
            required
            value={form.subject_id}
            onChange={e => setForm(f => ({ ...f, subject_id: e.target.value }))}
            className="input"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Orden</label>
          <input
            type="number"
            min={0}
            value={form.order_index}
            onChange={e => setForm(f => ({ ...f, order_index: Number(e.target.value) }))}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">Título del ejercicio</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          className="input"
          placeholder="Ej: Cálculo de números cuánticos"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Enunciado <span className="text-muted font-normal text-xs">(HTML permitido)</span>
        </label>
        <textarea
          required
          rows={8}
          value={form.statement}
          onChange={e => setForm(f => ({ ...f, statement: e.target.value }))}
          className="input font-mono text-sm resize-y"
          placeholder="<p>Dado el átomo de oxígeno...</p>"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Solución <span className="text-muted font-normal text-xs">(HTML — opcional)</span>
        </label>
        <textarea
          rows={8}
          value={form.solution}
          onChange={e => setForm(f => ({ ...f, solution: e.target.value }))}
          className="input font-mono text-sm resize-y"
          placeholder="<p>La configuración electrónica es...</p>"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show_solution"
          checked={form.show_solution}
          onChange={e => setForm(f => ({ ...f, show_solution: e.target.checked }))}
          className="w-4 h-4 accent-accent"
        />
        <label htmlFor="show_solution" className="text-sm font-medium text-ink">
          Mostrar solución a los alumnos
        </label>
      </div>

      {error && <p className="text-danger text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-accent text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? 'Guardando...' : exercise ? 'Guardar cambios' : 'Crear ejercicio'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 border border-border rounded-lg hover:bg-paper-dark transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  )
}
