import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'

import { Providers } from './providers'
import { CursorGlow } from '@/src/components/CursorGlow'
import FloatingNav from '@/src/components/FloatingNav'
import GlobalIdentityBar from '@/src/components/GlobalIdentityBar'
import './globals.css'

const coolveticaBook = localFont({
  src: '../fonts/coolvetica/Coolvetica-Book-Regular.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-coolvetica-book',
  display: 'swap',
})

const coolvetica = localFont({
  src: [
    {
      path: '../fonts/coolvetica/coolvetica-rg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/coolvetica/coolvetica-rg-it.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/coolvetica/coolvetica-condensed-rg.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/coolvetica/coolvetica-compressed-hv.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-coolvetica',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gherard',
  description: 'Portfolio creativo de Gherard. Edición de video, branding y dirección creativa para marcas con personalidad y estética auténtica.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${coolvetica.variable} ${coolveticaBook.variable}`}
    >
      <body className={`${coolvetica.className} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <GlobalIdentityBar />
        <FloatingNav />
        <CursorGlow />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
