"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Comprobamos la decisión del usuario solo cuando estamos seguros de estar en el cliente
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  // Si no se ha montado en el cliente, no renderizamos nada para evitar conflictos de SSR
  if (!mounted || !showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#0f1f3d",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        zIndex: 9999,
        fontFamily: "system-ui, sans-serif",
        fontSize: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <p style={{ margin: 0, lineHeight: "1.5", opacity: 0.95 }}>
        Utilizamos cookies propias y de terceros para analizar el tráfico web y
        mejorar tu experiencia académica. Puedes aceptar todas las cookies o
        rechazarlas. Lee nuestra{" "}
        <a
          href="/cookies"
          style={{ color: "#38bdf8", textDecoration: "underline" }}
        >
          Política de Cookies
        </a>{" "}
        para más información.
      </p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button
          onClick={handleDecline}
          style={{
            background: "transparent",
            border: "1px solid #64748b",
            color: "#94a3b8",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Rechazar
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: "#2563eb",
            border: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Aceptar todas
        </button>
      </div>
    </div>
  );
}
