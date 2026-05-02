import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const body = await request.json()
  const { subject_id, title, statement, solution, show_solution, order_index } = body

  if (!subject_id || !title || !statement) {
    return NextResponse.json({ error: 'subject_id, título y enunciado son obligatorios' }, { status: 400 })
  }

  const { data, error } = await auth.supabase
    .from('exercises')
    .insert({ subject_id, title, statement, solution, show_solution: show_solution ?? false, order_index: order_index ?? 0 })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
