import type { Metadata } from 'next'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Kewo Engineering Corporation',
    template: '%s | Kewo Engineering',
  },
  description:
    'Kewo Engineering is a multidisciplinary engineering design and consulting firm, specializing in Electric Power related engineering services for electric utilities, public agencies, and private companies worldwide.',
  keywords: [
    'electrical engineering',
    'power systems',
    'substation design',
    'engineering consulting',
    'electric utility',
    'project management',
    'EV charging',
    'BESS',
    'solar engineering',
  ],
  authors: [{ name: 'Kewo Engineering Corporation' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kewocorp.com',
    siteName: 'Kewo Engineering',
    title: 'Kewo Engineering Corporation',
    description:
      'Multidisciplinary engineering design and consulting firm specializing in Electric Power services.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}