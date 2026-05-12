import Link from 'next/link'
import { Phone, Mail, Linkedin, MapPin } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/services#ourwork' },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-kewo-navy text-white">
      <div className="container-default py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo + Tagline */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-2xl tracking-wider uppercase">KEWO</span>
                <span className="text-kewo-gold text-sm font-semibold tracking-[0.2em] uppercase">Engineering</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-xs">
              A multidisciplinary engineering design and consulting firm specializing in Electric Power services worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-kewo-gold text-xs font-bold uppercase tracking-widest mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-kewo-gold text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-kewo-gold text-xs font-bold uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-kewo-gold mt-0.5 flex-shrink-0" />
                <span>
                  1370 Valley Vista Drive, Suite 200 #2114<br />
                  Diamond Bar, CA 91765
                </span>
              </li>
              <li>
                <a
                  href="tel:16464505396"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-kewo-gold transition-colors"
                >
                  <Phone size={16} className="text-kewo-gold flex-shrink-0" />
                  +1.646.450.5396
                </a>
              </li>
              <li>
                <a
                  href="mailto:brian.kewo@kewocorp.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-kewo-gold transition-colors"
                >
                  <Mail size={16} className="text-kewo-gold flex-shrink-0" />
                  brian.kewo@kewocorp.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kewobrian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-kewo-gold transition-colors"
                >
                  <Linkedin size={16} className="text-kewo-gold flex-shrink-0" />
                  linkedin.com/in/kewobrian
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-default py-4">
          <p className="text-center text-gray-500 text-xs">
            Copyright 2018 – {currentYear} | Kewo Engineering Corporation | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}