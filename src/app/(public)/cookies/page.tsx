export default function CookiesPage() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "system-ui, sans-serif",
        color: "#334155",
        lineHeight: "1.6",
      }}
    >
      <h1
        style={{
          fontFamily: "Georgia, serif",
          color: "#0f1f3d",
          fontSize: "32px",
        }}
      >
        Política de Cookies
      </h1>
      <p>
        Esta web utiliza cookies técnicas (necesarias para el funcionamiento) y
        cookies de análisis (si aceptas el consentimiento) para medir el tráfico
        web de forma anónima.
      </p>

      <h3>¿Qué son las cookies?</h3>
      <p>
        Son pequeños archivos de texto que se guardan en tu navegador cuando
        visitas una página web.
      </p>

      <h3>Tipos de cookies que usamos</h3>
      <ul>
        <li>
          <strong>Cookies Propias/Técnicas:</strong> Necesarias para recordar si
          has aceptado o rechazado el aviso de cookies.
        </li>
        <li>
          <strong>Cookies de Terceros (Analíticas):</strong> Si das tu
          consentimiento, Google Analytics recopilará información anónima sobre
          las páginas más visitadas.
        </li>
      </ul>
      <p>
        Puedes desactivar las cookies en cualquier momento configurando las
        opciones de privacidad de tu navegador de Internet.
      </p>
    </div>
  );
}
