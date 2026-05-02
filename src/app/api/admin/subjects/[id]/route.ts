import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

// PUT /api/admin/subjects/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await request.json()
  const { title, slug, description, order_index } = body

  const { data, error } = await auth.supabase
    .from('subjects')
    .update({ title, slug, description, order_index })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

// DELETE /api/admin/subjects/[id]
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const { error } = await auth.supabase
    .from('subjects')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
