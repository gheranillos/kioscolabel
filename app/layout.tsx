import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'

import { Providers } from './providers'
import { CursorGlow } from '@/src/components/CursorGlow'
import GlobalIdentityBar from '@/src/components/GlobalIdentityBar'
import './globals.css'

/** Cuerpo: legible variable (100–900 + itálica variable). */
const urbanist = localFont({
  src: [
    {
      path: '../fonts/kioscolabel/Urbanist-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../fonts/kioscolabel/Urbanist-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-urbanist',
  display: 'swap',
})

/** Geométrica para UI y pesos destacados (familia Mozaic GEO). */
const mozaicGeo = localFont({
  src: [
    {
      path: '../fonts/kioscolabel/MozaicGEO-Regular-BF65792616e075e.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/kioscolabel/MozaicGEO-Medium-BF65792617daaee.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/kioscolabel/MozaicGEO-SemiBold-BF65792616e68bd.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/kioscolabel/MozaicGEO-Bold-BF65792617206a6.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/kioscolabel/MozaicGEO-ExtraBold-BF65792617d95f4.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/kioscolabel/MozaicGEO-Black-BF65792617e757b.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-geometric',
  display: 'swap',
})

/** Display / trial semibold para títulos tipo Work, WORKS, Servicios. */
const malinton = localFont({
  src: '../fonts/kioscolabel/MalintontrialversionSemibold-9My60.otf',
  weight: '600',
  style: 'normal',
  variable: '--font-malinton',
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
  const fontVars = [urbanist.variable, mozaicGeo.variable, malinton.variable].join(' ')

  return (
    <html lang="es" className={fontVars}>
      <body className={`${urbanist.className} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <GlobalIdentityBar />
        <CursorGlow />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
