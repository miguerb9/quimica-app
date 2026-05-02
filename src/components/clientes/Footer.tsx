import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-white/50 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Columna 1: Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧪</span>
              <span className="font-display font-bold text-ink">
                Química 2º Bach
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Recursos educativos gratuitos para preparar la EBAU. Apuntes
              detallados, ejercicios resueltos y guías de estudio.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Legal
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/aviso-legal"
                className="text-sm text-ink hover:text-accent transition-colors"
              >
                Aviso legal
              </Link>
              <Link
                href="/privacidad"
                className="text-sm text-ink hover:text-accent transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-ink hover:text-accent transition-colors"
              >
                Cookies
              </Link>
            </nav>
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Contacto
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contacto@tuproyecto.com"
                className="text-sm text-ink hover:text-accent transition-colors flex items-center gap-2"
              >
                <span className="opacity-70">✉️</span>{" "}
                contacto.mrclases@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior de copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            © {currentYear} Química 2º Bachillerato — Material de uso académico.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted">
            Hecho con <span className="text-red-400">❤️</span> para estudiantes
          </div>
        </div>
      </div>
    </footer>
  );
}
