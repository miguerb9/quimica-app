import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/app/admin/LogoutButton";

export default async function AdminHomePage() {
  const supabase = createClient();

  const [
    { count: subjectsCount },
    { count: notesCount },
    { count: exercisesCount },
  ] = await Promise.all([
    supabase.from("subjects").select("*", { count: "exact", head: true }),
    supabase.from("notes").select("*", { count: "exact", head: true }),
    supabase.from("exercises").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Temas",
      value: subjectsCount ?? 0,
      href: "/admin/subjects",
      icon: "📚",
    },
    {
      label: "Apuntes",
      value: notesCount ?? 0,
      href: "/admin/notes",
      icon: "📄",
    },
    {
      label: "Ejercicios",
      value: exercisesCount ?? 0,
      href: "/admin/exercises",
      icon: "✏️",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-1">
        Panel de administración
      </h1>
      <p className="text-muted mb-8">
        Gestiona el contenido de Química 2º Bachillerato
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border border-border rounded-xl p-5 bg-white hover:border-accent hover:shadow-sm transition-all"
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-3xl font-mono font-semibold text-ink">
              {s.value}
            </div>
            <div className="text-sm text-muted mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="border border-border rounded-xl p-5 bg-white">
        <h2 className="font-medium mb-3">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/subjects/new" className="btn-primary text-sm">
            + Nuevo tema
          </Link>
          <Link href="/admin/notes/new" className="btn-secondary text-sm">
            + Nuevo apunte
          </Link>
          <Link href="/admin/exercises/new" className="btn-secondary text-sm">
            + Nuevo ejercicio
          </Link>
        </div>
      </div>
    </div>
  );
}
