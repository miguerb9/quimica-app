export default function ClasesPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      {/* Cabecera Estilo Editorial */}
      <header
        style={{
          marginBottom: "50px",
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
          Clases{" "}
          <span style={{ color: "#2563eb", fontStyle: "italic" }}>online</span>
        </h1>
        <p
          style={{
            color: "#64748b",
            marginTop: "10px",
            fontSize: "16px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Metodología personalizada para alumnos de 2º de Bachillerato
        </p>
      </header>

      {/* Características - Layout Responsive */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "60px",
        }}
      >
        {[
          { icon: "🎯", label: "Personalizado", desc: "A tu ritmo y nivel" },
          { icon: "💻", label: "100% Online", desc: "Desde cualquier lugar" },
          { icon: "📋", label: "Material", desc: "Ejercicios incluidos" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              flex: "1 1 200px", // Esto hace que sea responsive automáticamente
              padding: "24px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>
              {item.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                color: "#0f1f3d",
                fontSize: "15px",
                marginBottom: "4px",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Sección Informativa */}
      <section
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}
      >
        <div>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#0f1f3d",
              fontFamily: "Georgia, serif",
              marginBottom: "20px",
            }}
          >
            ¿Cómo reservar una clase?
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#334155",
              lineHeight: 1.7,
              marginBottom: "32px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Es muy sencillo. Mándame un correo contándome tu situación: qué
            curso haces, qué temas necesitas reforzar y tu disponibilidad
            horaria. Te respondo en <strong>menos de 24 horas</strong> para
            acordar el horario.
          </p>

          {/* Pasos Estilo Lista de Laboratorio */}
          <div style={{ marginBottom: "40px" }}>
            {[
              { n: "01", text: "Consulta vía email sin compromiso" },
              { n: "02", text: "Acordamos horario y necesidades" },
              { n: "03", text: "Primera clase de prueba para conocernos" },
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px dashed #e2e8f0",
                  gap: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#2563eb",
                    opacity: 0.6,
                  }}
                >
                  {step.n}
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#475569",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bloque de Contacto Destacado */}
        <div
          style={{
            background: "#0f1f3d",
            borderRadius: "16px",
            padding: "40px",
            color: "white",
            textAlign: "center",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
              opacity: 0.9,
              fontSize: "15px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Contacto Directo
          </p>
          <a
            href="mailto:contacto.mrclases@gmail.com?subject=Consulta%20sobre%20clases%20online"
            style={{
              display: "inline-block",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "clamp(14px, 4vw, 18px)",
              padding: "16px 32px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontFamily: "system-ui, sans-serif",
              wordBreak: "break-all",
              maxWidth: "100%",
            }}
          >
            ✉️ contacto.mrclases@gmail.com
          </a>
          <p style={{ fontSize: "14px", opacity: 0.7, lineHeight: 1.5 }}>
            Responderé a tu correo lo antes posible para <br /> agendar nuestra
            primera sesión.
          </p>
        </div>
      </section>
    </div>
  );
}
