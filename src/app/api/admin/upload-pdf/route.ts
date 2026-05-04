import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  // Detectar qué estamos actualizando
  const noteId = formData.get("noteId") as string | null;
  const exerciseId = formData.get("exerciseId") as string | null;

  if (!file || (!noteId && !exerciseId)) {
    return NextResponse.json(
      { error: "Falta el archivo o el ID (note/exercise)" },
      { status: 400 },
    );
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Solo se permiten archivos PDF" },
      { status: 400 },
    );
  }

  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json(
      { error: "El PDF no puede superar 20 MB" },
      { status: 400 },
    );
  }

  // Configuración dinámica según el tipo
  const isExercise = !!exerciseId;
  const targetId = isExercise ? exerciseId : noteId;
  const bucketName = isExercise ? "exercises-pdfs" : "notes-pdfs";
  const tableName = isExercise ? "exercises" : "notes";

  const fileName = `${targetId}/${Date.now()}.pdf`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  // 1. Subir al Storage
  const { error: uploadError } = await auth.supabase.storage
    .from(bucketName)
    .upload(fileName, buffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // 2. Obtener URL pública
  const {
    data: { publicUrl },
  } = auth.supabase.storage.from(bucketName).getPublicUrl(fileName);

  // 3. Actualizar la base de datos (tabla dinámica)
  const { error: updateError } = await auth.supabase
    .from(tableName)
    .update({ pdf_url: publicUrl })
    .eq("id", targetId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ url: publicUrl });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const noteId = request.nextUrl.searchParams.get("noteId");
  const exerciseId = request.nextUrl.searchParams.get("exerciseId");

  if (!noteId && !exerciseId) {
    return NextResponse.json({ error: "Falta ID" }, { status: 400 });
  }

  const isExercise = !!exerciseId;
  const targetId = isExercise ? exerciseId : noteId;
  const bucketName = isExercise ? "exercises-pdfs" : "notes-pdfs";
  const tableName = isExercise ? "exercises" : "notes";

  // Obtener la URL actual para limpiar el storage
  const { data: record } = await auth.supabase
    .from(tableName)
    .select("pdf_url")
    .eq("id", targetId)
    .single();

  if (record?.pdf_url) {
    const url = new URL(record.pdf_url);
    // El path Parts depende del nombre del bucket en la URL
    const pathParts = url.pathname.split(`/${bucketName}/`);
    if (pathParts[1]) {
      await auth.supabase.storage.from(bucketName).remove([pathParts[1]]);
    }
  }

  // Limpiar campo en la BD
  await auth.supabase
    .from(tableName)
    .update({ pdf_url: null })
    .eq("id", targetId);

  return NextResponse.json({ ok: true });
}
