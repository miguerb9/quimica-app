import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Footer from "@/components/clientes/Footer";

async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    isAdmin = data?.role === "admin";
  }

  return (
    <header className="border-b border-border bg-paper sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/img/logo.png"
            alt="MrClases Logo"
            width={55}
            height={55}
            className="object-contain"
            priority
          />
          <span className="text-lg font-display font-semibold tracking-tight">
            <span className="text-ink group-hover:text-accent transition-colors">
              MR<span className="text-accent">clases</span>
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-muted hover:text-ink transition-colors"
          >
            Inicio
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="bg-accent text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
