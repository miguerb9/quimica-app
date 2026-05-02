'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-2 py-1.5 text-sm text-muted hover:text-danger hover:bg-red-50 rounded-lg transition-colors"
    >
      Cerrar sesión
    </button>
  )
}
