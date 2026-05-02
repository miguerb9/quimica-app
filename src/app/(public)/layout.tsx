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
    <header className="border-b border-slate-200/80 bg-[#faf8f2]/94 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Fila principal */}
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 no-underline"
          >
            <Image
              src="/img/logo.png"
              alt="MrClases Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <span
              className="text-[17px] font-bold text-[#1a2e44]"
              style={{ fontFamily: "Georgia,serif" }}
            >
              MR<span className="text-blue-600">clases</span>
            </span>
          </Link>

          {/* Nav — oculto en móvil muy pequeño, visible en sm+ */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="hidden sm:block text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium px-3 py-2 rounded-lg"
            >
              Inicio
            </Link>
            <Link
              href="/sobre-mi"
              className="text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium px-2 sm:px-3 py-2 rounded-lg whitespace-nowrap"
            >
              <span className="hidden sm:inline">Quiénes somos</span>
              <span className="sm:hidden">Nosotros</span>
            </Link>
            <Link
              href="/clases"
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap"
            >
              <span className="hidden sm:inline">Clases online</span>
              <span className="sm:hidden">Clases</span>
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="bg-[#0f1f3d] text-white text-xs font-bold px-3 py-2 rounded-lg tracking-wider uppercase"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
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
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#faf8f2" }}
    >
      {/* Science SVG background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.06 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="scienceBg"
              x="0"
              y="0"
              width="440"
              height="440"
              patternUnits="userSpaceOnUse"
            >
              <g
                transform="translate(30,20)"
                fill="none"
                stroke="#1a3a6e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 2 h8 M20 2 v14 l-16 28 a4 4 0 0 0 3.5 6 h25 a4 4 0 0 0 3.5-6 L20 16 V2" />
                <line x1="12" y1="2" x2="28" y2="2" />
                <path d="M8 38 h24" strokeDasharray="3 2" />
                <circle cx="14" cy="44" r="1.5" fill="#1a3a6e" />
                <circle cx="22" cy="47" r="1" fill="#1a3a6e" />
                <circle cx="29" cy="43" r="1.2" fill="#1a3a6e" />
              </g>
              <g
                transform="translate(190,25)"
                fill="none"
                stroke="#1a3a6e"
                strokeWidth="2"
              >
                <circle cx="30" cy="30" r="10" />
                <circle cx="8" cy="12" r="7" />
                <circle cx="54" cy="12" r="7" />
                <line x1="20" y1="22" x2="12" y2="17" />
                <line x1="40" y1="22" x2="50" y2="17" />
                <text
                  x="26"
                  y="34"
                  fontSize="8"
                  fontFamily="Georgia,serif"
                  fill="#1a3a6e"
                  stroke="none"
                >
                  O
                </text>
                <text
                  x="4"
                  y="16"
                  fontSize="7"
                  fontFamily="Georgia,serif"
                  fill="#1a3a6e"
                  stroke="none"
                >
                  H
                </text>
                <text
                  x="50"
                  y="16"
                  fontSize="7"
                  fontFamily="Georgia,serif"
                  fill="#1a3a6e"
                  stroke="none"
                >
                  H
                </text>
              </g>
              <g
                transform="translate(330,10)"
                fill="none"
                stroke="#1a3a6e"
                strokeWidth="1.8"
              >
                <circle cx="35" cy="35" r="5" fill="#1a3a6e" />
                <ellipse cx="35" cy="35" rx="30" ry="10" />
                <ellipse
                  cx="35"
                  cy="35"
                  rx="30"
                  ry="10"
                  transform="rotate(60 35 35)"
                />
                <ellipse
                  cx="35"
                  cy="35"
                  rx="30"
                  ry="10"
                  transform="rotate(120 35 35)"
                />
              </g>
              <g
                transform="translate(100,195)"
                fill="none"
                stroke="#1a3a6e"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M10 4 v34 a8 8 0 0 0 16 0 V4" />
                <line x1="10" y1="4" x2="26" y2="4" />
                <line x1="8" y1="8" x2="28" y2="8" />
              </g>
              <g
                transform="translate(275,165)"
                fill="none"
                stroke="#1a3a6e"
                strokeWidth="2"
              >
                <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" />
                <polygon
                  points="24,12 36,18 36,32 24,38 12,32 12,18"
                  strokeDasharray="4 2"
                />
              </g>
              <text
                x="355"
                y="255"
                fontSize="24"
                fontFamily="Georgia,serif"
                fill="#1a3a6e"
              >
                ΔH°
              </text>
              <text
                x="18"
                y="308"
                fontSize="19"
                fontFamily="Georgia,serif"
                fill="#1a3a6e"
              >
                Ka · Kb = Kw
              </text>
              <text
                x="175"
                y="382"
                fontSize="17"
                fontFamily="Georgia,serif"
                fill="#1a3a6e"
              >
                pH = −log[H⁺]
              </text>
              <text
                x="310"
                y="345"
                fontSize="15"
                fontFamily="Georgia,serif"
                fill="#1a3a6e"
              >
                Kc = [P]/[R]
              </text>
              <text
                x="50"
                y="420"
                fontSize="15"
                fontFamily="Georgia,serif"
                fill="#1a3a6e"
              >
                E = hν
              </text>
              <text
                x="370"
                y="420"
                fontSize="14"
                fontFamily="Georgia,serif"
                fill="#1a3a6e"
              >
                n = m/M
              </text>
              <g
                transform="translate(345,275)"
                fill="none"
                stroke="#1a3a6e"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <line x1="18" y1="2" x2="18" y2="16" />
                <line x1="14" y1="2" x2="22" y2="2" />
                <path d="M10 16 Q4 22 4 32 a14 14 0 0 0 28 0 Q32 22 26 16 Z" />
                <circle cx="12" cy="34" r="1.5" fill="#1a3a6e" />
                <circle cx="20" cy="38" r="1" fill="#1a3a6e" />
                <circle cx="27" cy="33" r="1.3" fill="#1a3a6e" />
              </g>
              <g
                transform="translate(195,270)"
                fill="none"
                stroke="#1a3a6e"
                strokeWidth="1.8"
              >
                <path d="M10,0 C10,20 30,20 30,40 C30,60 10,60 10,80 C10,100 30,100 30,120" />
                <path d="M30,0 C30,20 10,20 10,40 C10,60 30,60 30,80 C30,100 10,100 10,120" />
                <line x1="10" y1="10" x2="30" y2="10" strokeDasharray="2 2" />
                <line x1="10" y1="30" x2="30" y2="30" strokeDasharray="2 2" />
                <line x1="10" y1="50" x2="30" y2="50" strokeDasharray="2 2" />
                <line x1="10" y1="70" x2="30" y2="70" strokeDasharray="2 2" />
                <line x1="10" y1="90" x2="30" y2="90" strokeDasharray="2 2" />
                <line x1="10" y1="110" x2="30" y2="110" strokeDasharray="2 2" />
              </g>
              <g
                transform="translate(48,308)"
                fill="none"
                stroke="#1a3a6e"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="20" y1="50" x2="20" y2="20" />
                <rect x="14" y="14" width="12" height="8" rx="2" />
                <rect x="16" y="8" width="8" height="7" rx="1" />
                <line x1="10" y1="50" x2="30" y2="50" />
                <line x1="15" y1="50" x2="12" y2="60" />
                <line x1="25" y1="50" x2="28" y2="60" />
                <line x1="10" y1="60" x2="30" y2="60" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scienceBg)" />
        </svg>
      </div>

      <Navbar />
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 relative z-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
