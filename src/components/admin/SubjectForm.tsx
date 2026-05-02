'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Subject } from '@/types'

interface Props { subject?: Subject }

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function SubjectForm({ subject }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: subject?.title ?? '',
    slug: subject?.slug ?? '',
    description: subject?.description ?? '',
    order_index: subject?.order_index ?? 0,
  })

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    setForm(f => ({
      ...f,
      title,
      slug: subject ? f.slug : slugify(title),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const method = subject ? 'PUT' : 'POST'
    const url = subject ? `/api/admin/subjects/${subject.id}` : '/api/admin/subjects'

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

    router.push('/admin/subjects')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <Field label="Título">
        <input
          type="text"
          required
          value={form.title}
          onChange={handleTitleChange}
          className="input"
          placeholder="Ej: Estructura atómica"
        />
      </Field>

      <Field label="Slug (URL)" hint="Solo letras, números y guiones">
        <input
          type="text"
          required
          value={form.slug}
          onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
          className="input font-mono text-sm"
          placeholder="estructura-atomica"
        />
      </Field>

      <Field label="Descripción (opcional)">
        <textarea
          rows={3}
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          className="input resize-none"
          placeholder="Breve descripción del tema..."
        />
      </Field>

      <Field label="Orden">
        <input
          type="number"
          min={0}
          value={form.order_index}
          onChange={e => setForm(f => ({ ...f, order_index: Number(e.target.value) }))}
          className="input w-24"
        />
      </Field>

      {error && <p className="text-danger text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-accent text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? 'Guardando...' : subject ? 'Guardar cambios' : 'Crear tema'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2 border border-border rounded-lg hover:bg-paper-dark transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {hint && <span className="text-muted font-normal ml-1.5 text-xs">({hint})</span>}
      </label>
      {children}
    </div>
  )
}
