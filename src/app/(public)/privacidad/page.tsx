export default function Privacidad() {
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
        Política de Privacidad
      </h1>
      <p>
        De conformidad con el RGPD y la Ley Orgánica 3/2018 (LOPDGDD), te
        informamos detalladamente sobre cómo tratamos tus datos personales.
      </p>

      <h3>¿Quién es el Responsable del tratamiento?</h3>
      <p>
        El responsable es el titular de la marca comercial{" "}
        <strong>MRclases</strong>, con email de contacto:{" "}
        <em>contacto.mrclases@gmail.com</em>.
      </p>

      <h3>¿Qué datos recogemos y con qué finalidad?</h3>
      <ul>
        <li>
          <strong>Formularios de contacto / Email:</strong> Si nos escribes para
          solicitar clases online, utilizaremos tu nombre y correo únicamente
          para gestionar tu solicitud y comunicarnos contigo.
        </li>
        <li>
          <strong>Datos de navegación (Cookies):</strong> IPs anónimas y
          analíticas para mejorar la web.
        </li>
      </ul>

      <h3>Tus Derechos</h3>
      <p>
        Puedes solicitar el acceso, rectificación, supresión o limitación del
        tratamiento de tus datos enviando un correo a{" "}
        <strong>contacto.mrclases@gmail.com</strong>.
      </p>
    </div>
  );
}
