'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  id: string
  table: 'subjects' | 'notes' | 'exercises'
}

export default function DeleteButton({ id, table }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('¿Seguro que quieres borrar esto? Esta acción no se puede deshacer.')) return

    setLoading(true)
    const res = await fetch(`/api/admin/${table}/${id}`, { method: 'DELETE' })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Error al borrar. Inténtalo de nuevo.')
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm px-3 py-1.5 border border-red-200 text-danger rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
    >
      {loading ? '...' : 'Borrar'}
    </button>
  )
}
