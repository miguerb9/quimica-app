export default function SobreMiPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      {/* Cabecera Estilo Editorial */}
      <header
        style={{
          marginBottom: "60px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "#0f1f3d",
            fontFamily: "Georgia, serif",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          Sobre{" "}
          <span style={{ color: "#2563eb", fontStyle: "italic" }}>
            nosotros
          </span>
        </h1>
        <p
          style={{
            color: "#64748b",
            marginTop: "10px",
            fontSize: "16px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Compromiso con la excelencia académica en Química
        </p>
      </header>

      <main
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}
      >
        {/* Sección de Identidad - Con Iconografía de Autor */}
        <section
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "16px",
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e2e8f0",
              flexShrink: 0,
            }}
          >
            {/* Gráfico de Autor: Bitácora de laboratorio editorial con trazo fino */}
            <svg
              style={{ width: "42px", height: "42px", display: "block" }}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
            >
              {/* Cuerpo del cuaderno/registro científico */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                stroke="#2563eb"
              />
              {/* Líneas sutiles de anotación técnica */}
              <path strokeLinecap="round" d="M15 8h3m-3 3h2" stroke="#94a3b8" />
              <path strokeLinecap="round" d="M9 8H6m3 3H7" stroke="#94a3b8" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: "300px" }}>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#0f1f3d",
                fontFamily: "Georgia, serif",
                marginBottom: "4px",
              }}
            >
              MRclases
            </h2>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#2563eb",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "20px",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Graduado en Química / Universidad de Sevilla
            </p>

            <div
              style={{
                fontSize: "17px",
                color: "#334155",
                lineHeight: 1.7,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              <p style={{ marginBottom: "20px" }}>
                Soy profesor particular de Química con formación universitaria
                en la
                <strong> Universidad de Sevilla</strong>. Mi objetivo es ayudar
                a los alumnos de 2º de Bachillerato a dominar la Química de una
                forma clara, ordenada y sin agobios.
              </p>

              {/* Bloque destacado con borde lateral - Muy editorial */}
              <blockquote
                style={{
                  margin: "30px 0",
                  paddingLeft: "24px",
                  borderLeft: "3px solid #2563eb",
                  color: "#475569",
                  fontStyle: "italic",
                }}
              >
                "Esta plataforma nace de la necesidad de tener un recurso de
                calidad, gratuito y accesible para todos los estudiantes que se
                enfrentan a la Selectividad."
              </blockquote>

              <p>
                Aquí encontrarás el temario completo organizado por temas, con
                teoría simplificada y ejercicios resueltos paso a paso,
                diseñados específicamente para los exámenes actuales.
              </p>
            </div>
          </div>
        </section>

        {/* CTA - Botón más sobrio y profesional */}
        <footer
          style={{
            marginTop: "40px",
            padding: "40px",
            background: "#0f1f3d",
            borderRadius: "12px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "22px",
              marginBottom: "12px",
            }}
          >
            ¿Necesitas apoyo personalizado?
          </h3>
          <p style={{ marginBottom: "24px", opacity: 0.9, fontSize: "15px" }}>
            Clases individuales online adaptadas a tu ritmo y nivel.
          </p>
          <a
            href="/clases"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
              padding: "14px 32px",
              borderRadius: "6px",
              transition: "transform 0.2s ease, background 0.2s ease",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
            }}
          >
            {/* Pequeño icono de flecha direccional minimalista - Corregido flexShrink */}
            <svg
              style={{ width: "16px", height: "16px", flexShrink: 0 }}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
            Reservar clase online
          </a>
        </footer>
      </main>
    </div>
  );
}
