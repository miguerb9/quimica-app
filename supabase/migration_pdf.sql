-- ============================================================
-- MIGRACIÓN: Soporte de PDFs en Apuntes y Ejercicios
-- Ejecutar en SQL Editor de Supabase
-- ============================================================

-- 1. ACTUALIZACIÓN DE TABLAS
-- Añadir columna pdf_url a notes
ALTER TABLE public.notes
ADD COLUMN IF NOT EXISTS pdf_url TEXT DEFAULT NULL;

-- Añadir columna pdf_url a exercises
ALTER TABLE public.exercises
ADD COLUMN IF NOT EXISTS pdf_url TEXT DEFAULT NULL;


-- 2. CREACIÓN DE BUCKETS (STORAGE)
-- Bucket para Apuntes
INSERT INTO storage.buckets (id, name, public)
VALUES ('notes-pdfs', 'notes-pdfs', false)
ON CONFLICT (id) DO NOTHING;

-- Bucket para Ejercicios
INSERT INTO storage.buckets (id, name, public)
VALUES ('exercises-pdfs', 'exercises-pdfs', false)
ON CONFLICT (id) DO NOTHING;


-- 3. POLÍTICAS PARA APUNTES (notes-pdfs)
CREATE POLICY "pdfs_notes: lectura publica"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'notes-pdfs');

CREATE POLICY "pdfs_notes: admin upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'notes-pdfs' AND
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "pdfs_notes: admin delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'notes-pdfs' AND
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );


-- 4. POLÍTICAS PARA EJERCICIOS (exercises-pdfs)
CREATE POLICY "pdfs_exercises: lectura publica"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'exercises-pdfs');

CREATE POLICY "pdfs_exercises: admin upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'exercises-pdfs' AND
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "pdfs_exercises: admin delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'exercises-pdfs' AND
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );