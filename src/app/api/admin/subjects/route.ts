import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

// POST /api/admin/subjects — crear tema
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await request.json()
  const { title, slug, description, order_index } = body

  if (!title || !slug) {
    return NextResponse.json({ error: 'Título y slug son obligatorios' }, { status: 400 })
  }

  const { data, error } = await auth.supabase
    .from('subjects')
    .insert({ title, slug, description, order_index: order_index ?? 0 })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data, { status: 201 })
}
