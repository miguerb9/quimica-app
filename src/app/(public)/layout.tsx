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
    <header
      style={{
        borderBottom: "1px solid rgba(30,60,90,0.12)",
        background: "rgba(250,248,242,0.94)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <Image
            src="/img/logo.png"
            alt="MrClases Logo"
            width={44}
            height={44}
            style={{ objectFit: "contain" }}
            priority
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              fontFamily: "Georgia, serif",
              color: "#1a2e44",
              letterSpacing: "-0.01em",
            }}
          >
            MR<span style={{ color: "#2563eb" }}>clases</span>
          </span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link
            href="/"
            style={{
              color: "#64748b",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Inicio
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              style={{
                background: "#2563eb",
                color: "white",
                padding: "6px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
              }}
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column" as const,
        background: "#faf8f2",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Science SVG background */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.06,
        }}
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
              {/* Erlenmeyer flask */}
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

              {/* H2O molecule */}
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

              {/* Atom orbits */}
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

              {/* Test tube */}
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

              {/* Benzene ring */}
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

              {/* Formulas */}
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

              {/* Round-bottom flask */}
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

              {/* DNA double helix */}
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

              {/* Microscope */}
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
      <main
        style={{
          flex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          padding: "48px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
