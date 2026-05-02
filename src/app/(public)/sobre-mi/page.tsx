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
        {/* Sección de Identidad - Sin la tarjeta genérica */}
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
              borderRadius: "16px", // Cuadrado redondeado es menos "IA" que el círculo perfecto
              background: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              border: "1px solid #e2e8f0",
              flexShrink: 0,
            }}
          >
            🧪
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
            background: "#0f1f3d", // Azul muy oscuro para contraste fuerte
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
              display: "inline-block",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
              padding: "14px 32px",
              borderRadius: "6px", // Bordes menos redondeados para un look más serio
              transition: "background 0.2s",
            }}
          >
            Reservar clase online
          </a>
        </footer>
      </main>
    </div>
  );
}
