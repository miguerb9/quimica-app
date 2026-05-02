-- ============================================================
-- MIGRACIÓN: Soporte de PDFs en apuntes
-- Ejecutar en SQL Editor de Supabase
-- ============================================================

-- 1. Añadir columna pdf_url a notes
ALTER TABLE public.notes
ADD COLUMN IF NOT EXISTS pdf_url TEXT DEFAULT NULL;

-- 2. Crear bucket de Storage para PDFs
-- (esto también puedes hacerlo desde el panel de Supabase:
--  Storage > New bucket > nombre: "notes-pdfs" > Public: NO)
INSERT INTO storage.buckets (id, name, public)
VALUES ('notes-pdfs', 'notes-pdfs', false)
ON CONFLICT (id) DO NOTHING;

-- 3. Políticas de Storage
-- Lectura pública de PDFs (cualquiera puede descargar)
CREATE POLICY "pdfs: lectura publica"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'notes-pdfs');

-- Solo admin puede subir/borrar
CREATE POLICY "pdfs: admin upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'notes-pdfs' AND
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "pdfs: admin delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'notes-pdfs' AND
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );
