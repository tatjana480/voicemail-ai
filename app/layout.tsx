import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VoiceEmail Pro - Voice to Perfect Email',
  description: 'Transform your voice into perfectly crafted emails with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}