import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Homenagens Memória Viva',
  description: 'Homenagens especiais em vídeo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
