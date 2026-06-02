import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/clientes/CookieBanner"; // Ajusta la ruta de importación si es necesario

export const metadata: Metadata = {
  title: "MRclases | Recursos de Bachillerato",
  description:
    "Plataforma de recursos didácticos de ciencias para Bachillerato.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-paper">
        {children}
        {/* Banner de cookies global */}
        <CookieBanner />
      </body>
    </html>
  );
}
