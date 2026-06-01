import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin()
    if ('error' in auth) return auth.error

    const body = await request.json()
    const { title, slug, description, order_index, course, asignatura } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Título y slug son obligatorios' }, { status: 400 })
    }

    const { data, error } = await auth.supabase
      .from('subjects')
      .insert({
        title,
        slug,
        description,
        order_index: order_index ?? 0,
        course: course ?? '2bach',
        asignatura: asignatura ?? 'quimica',
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Error interno del servidor' }, { status: 500 })
  }
}
