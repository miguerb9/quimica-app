# ⚗️ Química 2º Bachillerato

Aplicación web de apuntes y ejercicios para Química de 2º de Bachillerato.

## Stack
- **Next.js 14** (App Router) + TypeScript
- **Supabase** — Base de datos PostgreSQL + Auth
- **TailwindCSS** — Estilos
- **Vercel** — Despliegue

---

## 🚀 Despliegue paso a paso

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto gratuito
2. En **SQL Editor**, pega y ejecuta el contenido de `supabase/schema.sql`
3. Copia las claves desde **Project Settings > API**:
   - `URL`
   - `anon public key`
   - `service_role key` (secreta, no la expongas)

### 2. Crear tu cuenta de admin en Supabase

1. Ve a **Authentication > Users > Add User**
2. Crea un usuario con tu email y contraseña
3. En **SQL Editor**, ejecuta:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE id = (
     SELECT id FROM auth.users WHERE email = 'tu-email@ejemplo.com'
   );
   ```

### 3. Variables de entorno locales

Copia `.env.local.example` a `.env.local` y rellena los valores:

```bash
cp .env.local.example .env.local
```

### 4. Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### 5. Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) > **New Project** > importa tu repo
3. En **Environment Variables**, añade las tres variables de `.env.local.example`
4. Haz clic en **Deploy** ✓

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── (public)/          # Vistas públicas (sin login)
│   │   ├── page.tsx       # Portada con listado de temas
│   │   └── subjects/
│   │       └── [slug]/    # Página de cada tema
│   │           ├── page.tsx
│   │           └── notes/[id]/page.tsx
│   ├── admin/             # Panel admin (protegido)
│   │   ├── layout.tsx     # Sidebar + doble verificación de rol
│   │   ├── page.tsx       # Dashboard
│   │   ├── subjects/      # CRUD temas
│   │   ├── notes/         # CRUD apuntes
│   │   └── exercises/     # CRUD ejercicios
│   ├── api/admin/         # API routes (verifican rol en servidor)
│   ├── login/             # Página de login
│   └── layout.tsx
├── components/admin/      # Formularios y componentes del panel
├── lib/
│   ├── supabase/          # Clientes (browser, server, middleware)
│   └── auth.ts            # Helper requireAdmin()
├── middleware.ts           # Protección de rutas /admin/*
└── types/index.ts
```

---

## 🔐 Seguridad (capas)

| Capa | Qué hace |
|------|----------|
| **Middleware Next.js** | Redirige a `/login` si no hay sesión activa en `/admin/*` |
| **Layout admin (servidor)** | Segunda verificación de sesión + rol en cada render |
| **API routes** | `requireAdmin()` verifica sesión + rol antes de cualquier operación |
| **RLS Supabase** | Políticas a nivel de base de datos: público solo lee publicado, admin hace CRUD |
| **Service role key** | Nunca sale al frontend; solo en API routes de servidor |

---

## 📝 Añadir contenido

### Desde el panel admin (`/admin`):
- **Temas**: crear/editar los 10 temas de química
- **Apuntes**: HTML con soporte para tablas, fórmulas, código
- **Ejercicios**: enunciado + solución opcional con toggle de visibilidad

### Formato del contenido (HTML)
El contenido acepta HTML enriquecido. Ejemplo:

```html
<h2>El modelo de Bohr</h2>
<p>En 1913, Niels Bohr propuso un modelo atómico donde...</p>
<ul>
  <li>Los electrones orbitan en niveles de energía definidos</li>
  <li>Al saltar de nivel emiten o absorben fotones</li>
</ul>
<p>La energía del nivel n es: <code>E = -13.6/n² eV</code></p>
```

---

## 💸 Costes estimados

| Servicio | Plan | Coste |
|---------|------|-------|
| Vercel | Hobby | **Gratis** |
| Supabase | Free | **Gratis** (hasta 500 MB, 50.000 req/mes) |

Para un uso académico personal, la capa gratuita de ambos es más que suficiente.
