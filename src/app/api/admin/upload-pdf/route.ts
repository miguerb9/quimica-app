import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const noteId = formData.get('noteId') as string | null

  if (!file || !noteId) {
    return NextResponse.json({ error: 'Falta el archivo o el ID del apunte' }, { status: 400 })
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Solo se permiten archivos PDF' }, { status: 400 })
  }

  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: 'El PDF no puede superar 20 MB' }, { status: 400 })
  }

  const fileName = `${noteId}/${Date.now()}.pdf`
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error: uploadError } = await auth.supabase.storage
    .from('notes-pdfs')
    .upload(fileName, buffer, {
      contentType: 'application/pdf',
      upsert: true,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data: { publicUrl } } = auth.supabase.storage
    .from('notes-pdfs')
    .getPublicUrl(fileName)

  // Actualizar el apunte con la URL del PDF
  const { error: updateError } = await auth.supabase
    .from('notes')
    .update({ pdf_url: publicUrl })
    .eq('id', noteId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ url: publicUrl })
}

// DELETE /api/admin/upload-pdf?noteId=xxx
export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error

  const noteId = request.nextUrl.searchParams.get('noteId')
  if (!noteId) return NextResponse.json({ error: 'Falta noteId' }, { status: 400 })

  // Obtener la URL actual para saber el path en storage
  const { data: note } = await auth.supabase
    .from('notes')
    .select('pdf_url')
    .eq('id', noteId)
    .single()

  if (note?.pdf_url) {
    // Extraer el path relativo del bucket desde la URL pública
    const url = new URL(note.pdf_url)
    const pathParts = url.pathname.split('/notes-pdfs/')
    if (pathParts[1]) {
      await auth.supabase.storage.from('notes-pdfs').remove([pathParts[1]])
    }
  }

  await auth.supabase.from('notes').update({ pdf_url: null }).eq('id', noteId)

  return NextResponse.json({ ok: true })
}
