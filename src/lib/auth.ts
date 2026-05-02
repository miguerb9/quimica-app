import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Verifica que el usuario está autenticado Y tiene rol admin.
 * Usar en todas las API routes de /api/admin/*
 */
export async function requireAdmin(): Promise<
  { error: NextResponse } | { supabase: ReturnType<typeof createClient> }
> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: NextResponse.json({ error: 'No autorizado' }, { status: 401 }) }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Acceso denegado' }, { status: 403 }) }
  }

  return { supabase }
}
