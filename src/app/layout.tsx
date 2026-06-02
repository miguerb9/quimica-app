import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MRclases | Apuntes y Ejercicios",
  description:
    "Plataforma de recursos didácticos, apuntes y ejercicios resueltos de ciencias para Bachillerato.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-paper">{children}</body>
    </html>
  );
}
