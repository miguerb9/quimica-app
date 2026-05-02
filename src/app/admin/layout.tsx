import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/admin/LogoutButton'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Doble verificación en layout (además del middleware)
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-white shrink-0 flex flex-col">
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-ink hover:text-accent transition-colors">
            <span>⚗️</span> Química 2º Bach
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <p className="text-xs text-muted uppercase tracking-wider px-2 py-1 font-medium">Panel</p>
          <SideLink href="/admin" exact>🏠 Inicio</SideLink>
          <SideLink href="/admin/subjects">📚 Temas</SideLink>
          <SideLink href="/admin/notes">📄 Apuntes</SideLink>
          <SideLink href="/admin/exercises">✏️ Ejercicios</SideLink>
        </nav>

        <div className="p-3 border-t border-border">
          <p className="text-xs text-muted truncate px-2 mb-2">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto bg-paper">
        <div className="max-w-4xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

function SideLink({ href, children, exact }: { href: string; children: React.ReactNode; exact?: boolean }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-muted hover:text-ink hover:bg-paper-dark transition-colors"
    >
      {children}
    </Link>
  )
}
