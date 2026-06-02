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
          {
            label: "Personalizado",
            desc: "A tu ritmo y nivel",
            icon: (
              <svg
                style={{
                  width: "34px",
                  height: "34px",
                  margin: "0 auto 14px",
                  display: "block",
                }}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke="currentColor"
              >
                {/* Enfoque/Diana de precisión abstracta con ejes externos */}
                <circle cx="12" cy="12" r="7" stroke="#2563eb" />
                <circle
                  cx="12"
                  cy="12"
                  r="2"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  style={{ opacity: 0.5 }}
                />
                <path
                  strokeLinecap="round"
                  d="M12 2v3m0 14v3M2 12h3m14 0h3"
                  stroke="#2563eb"
                />
              </svg>
            ),
          },
          {
            label: "100% Online",
            desc: "Desde cualquier lugar",
            icon: (
              <svg
                style={{
                  width: "34px",
                  height: "34px",
                  margin: "0 auto 14px",
                  display: "block",
                }}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke="currentColor"
              >
                {/* Espacio de trabajo/Red global con nodos flotantes */}
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="12"
                  rx="1.5"
                  stroke="#2563eb"
                />
                <path
                  strokeLinecap="round"
                  d="M9 20h6m-3-4v4"
                  stroke="#2563eb"
                />
                <circle cx="12" cy="10" r="1.5" stroke="#94a3b8" />
                <path
                  strokeLinecap="round"
                  d="M8 10h1m4 0h1"
                  stroke="#94a3b8"
                />
              </svg>
            ),
          },
          {
            label: "Material",
            desc: "Ejercicios incluidos",
            icon: (
              <svg
                style={{
                  width: "34px",
                  height: "34px",
                  margin: "0 auto 14px",
                  display: "block",
                }}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke="currentColor"
              >
                {/* Cuaderno de laboratorio con guías de diseño isométricas */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                  stroke="#2563eb"
                />
                <path
                  strokeLinecap="round"
                  d="M8 7h8m-8 4h8m-8 4h5"
                  stroke="#94a3b8"
                />
              </svg>
            ),
          },
        ].map((item) => (
          <div
            key={item.label}
            className="group"
            style={{
              flex: "1 1 200px",
              padding: "28px 24px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              textAlign: "center",
              cursor: "default",
              transition: "all 0.3s ease",
            }}
          >
            {item.icon}
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
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "clamp(14px, 4vw, 17px)",
              padding: "16px 36px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontFamily: "system-ui, sans-serif",
              wordBreak: "break-all",
              maxWidth: "100%",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
          >
            {/* Icono de sobre postal clásico de email - Corregido para Vercel */}
            <svg
              style={{ width: "20px", height: "20px", flexShrink: 0 }}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            contacto.mrclases@gmail.com
          </a>
          <p
            style={{
              fontSize: "14px",
              opacity: 0.7,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Responderé a tu correo lo antes posible para <br /> agendar nuestra
            primera sesión.
          </p>
        </div>
      </section>
    </div>
  );
}
