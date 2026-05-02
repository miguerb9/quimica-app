import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await request.json()
  const { subject_id, title, content, order_index, published } = body

  if (!subject_id || !title || !content) {
    return NextResponse.json({ error: 'subject_id, título y contenido son obligatorios' }, { status: 400 })
  }

  const { data, error } = await auth.supabase
    .from('notes')
    .insert({ subject_id, title, content, order_index: order_index ?? 0, published: published ?? false })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
