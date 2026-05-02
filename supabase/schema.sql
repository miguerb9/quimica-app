-- ============================================================
-- QUÍMICA 2º BACHILLERATO — Esquema Supabase
-- Ejecutar en el SQL Editor de tu proyecto Supabase
-- ============================================================

-- 1. TABLA: profiles
-- Extiende auth.users con el rol de cada usuario
-- ============================================================
CREATE TABLE public.profiles (
  id        UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role      TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Crear perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. TABLA: subjects (temas)
-- ============================================================
CREATE TABLE public.subjects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subjects_slug ON public.subjects(slug);
CREATE INDEX idx_subjects_order ON public.subjects(order_index);


-- 3. TABLA: notes (apuntes)
-- ============================================================
CREATE TABLE public.notes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id  UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL DEFAULT '',   -- HTML
  order_index INTEGER NOT NULL DEFAULT 0,
  published   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notes_subject ON public.notes(subject_id);
CREATE INDEX idx_notes_published ON public.notes(published);

-- Auto-actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();


-- 4. TABLA: exercises (ejercicios)
-- ============================================================
CREATE TABLE public.exercises (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id    UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  statement     TEXT NOT NULL DEFAULT '',   -- HTML
  solution      TEXT,                        -- HTML, puede ser NULL
  show_solution BOOLEAN NOT NULL DEFAULT FALSE,
  order_index   INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_exercises_subject ON public.exercises(subject_id);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

-- Helper: comprobar si el usuario actual es admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;


-- ── profiles ──────────────────────────────────────────────
-- Cada usuario puede ver/editar SOLO su propio perfil
-- Los admins pueden ver todos los perfiles
CREATE POLICY "profiles: usuarios ven su perfil"
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles: solo admin actualiza roles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());


-- ── subjects ──────────────────────────────────────────────
-- Lectura pública (sin login)
CREATE POLICY "subjects: lectura publica"
  ON public.subjects FOR SELECT
  USING (true);

-- Solo admin puede crear/editar/borrar
CREATE POLICY "subjects: admin insert"
  ON public.subjects FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "subjects: admin update"
  ON public.subjects FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "subjects: admin delete"
  ON public.subjects FOR DELETE
  USING (public.is_admin());


-- ── notes ─────────────────────────────────────────────────
-- Lectura pública SOLO si published = true
CREATE POLICY "notes: lectura publica si publicado"
  ON public.notes FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "notes: admin insert"
  ON public.notes FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "notes: admin update"
  ON public.notes FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "notes: admin delete"
  ON public.notes FOR DELETE
  USING (public.is_admin());


-- ── exercises ─────────────────────────────────────────────
-- Enunciados siempre visibles; solución solo si show_solution=true
CREATE POLICY "exercises: lectura publica"
  ON public.exercises FOR SELECT
  USING (true);

CREATE POLICY "exercises: admin insert"
  ON public.exercises FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "exercises: admin update"
  ON public.exercises FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "exercises: admin delete"
  ON public.exercises FOR DELETE
  USING (public.is_admin());


-- ============================================================
-- DATOS INICIALES — Los 10 temas del temario
-- ============================================================
INSERT INTO public.subjects (slug, title, description, order_index) VALUES
  ('estructura-atomica',        'Estructura atómica',              'Modelos atómicos, números cuánticos y configuración electrónica', 1),
  ('enlace-quimico',            'Enlace químico',                  'Enlace iónico, covalente, metálico y fuerzas intermoleculares', 2),
  ('materia-transformaciones',  'La materia y sus transformaciones','Estados de agregación y disoluciones', 3),
  ('termoquimica',              'Termoquímica',                    'Entalpía, entropía y espontaneidad de reacciones', 4),
  ('cinetica-quimica',          'Cinética química',                'Velocidad de reacción y factores que la influyen', 5),
  ('equilibrio-quimico',        'Equilibrio químico',              'Principio de Le Chatelier y constantes de equilibrio', 6),
  ('reacciones-precipitacion',  'Reacciones de precipitación',     'Producto de solubilidad y precipitación selectiva', 7),
  ('reacciones-acido-base',     'Reacciones ácido-base',           'Teorías ácido-base, pH y hidrólisis', 8),
  ('reacciones-redox',          'Reacciones redox',                'Oxidación, reducción y electroquímica', 9),
  ('quimica-organica',          'Química orgánica',                'Nomenclatura, isomería y tipos de reacciones', 10);


-- ============================================================
-- CREAR EL PRIMER ADMIN (ejecutar UNA VEZ tras registrar tu cuenta)
-- ============================================================
-- Reemplaza el email con el tuyo y ejecuta esto después de
-- crear tu usuario en Supabase Auth > Users > Add User

-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = (
--   SELECT id FROM auth.users WHERE email = 'tu-email@ejemplo.com'
-- );
