import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Química 2º Bach',
  description: 'Apuntes y ejercicios de Química de 2º de Bachillerato',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-paper">{children}</body>
    </html>
  )
}
