import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'

import { Providers } from './providers'
import { CursorGlow } from '@/src/components/CursorGlow'
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
  title: 'Kiosco Label - Creative Agency',
  description:
    'Kiosco Label es una agencia creativa: branding, audiovisual y diseño digital con criterio editorial para marcas que quieren verse reales y memorables.',
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
        <CursorGlow />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
