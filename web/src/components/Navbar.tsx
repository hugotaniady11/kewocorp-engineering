'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search } from 'lucide-react'
import { clsx } from 'clsx'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/services#ourwork' },
] as const

function parseLinkHref(href: string) {
  const [pathname, hash] = href.split('#')
  return { pathname, hash: hash ? `#${hash}` : undefined }
}

function isNavItemActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href.split('#')[0])
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setSearchOpen(false)
  }, [pathname])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-kewo-navy/95 backdrop-blur-sm shadow-lg'
          : 'bg-kewo-navy/1'
      )}
    >
      <div className="container-default">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={
                isScrolled
                  ? 'https://kewocorp.com/wp-content/uploads/2019/02/Logo-KEC-white-32px.png'
                  : 'https://kewocorp.com/wp-content/uploads/2019/02/Logo-KEC-white-100px-200x52.png'
              }
              alt="KEWO Engineering"
              className="h-8 lg:h-10 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex h-full items-stretch space-x-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={parseLinkHref(item.href)}
                className={clsx(
                  'relative inline-flex h-full items-center px-4 text-sm font-medium tracking-wide uppercase transition-colors duration-200',
                  isNavItemActive(item.href, pathname)
                    ? 'text-white before:absolute before:top-0 before:left-1/2 before:h-0.5 before:w-10 before:-translate-x-1/2 before:bg-white before:content-[""]'
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="ml-2 inline-flex h-full items-center p-2 text-gray-300 transition-colors hover:text-white"
              aria-label="Toggle search"
            >
              <Search size={18} />
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop search bar */}
        {searchOpen && (
          <div className="hidden md:block pb-3 animate-fade-in">
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-full max-w-xs bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded px-4 py-2 text-sm focus:outline-none focus:border-kewo-gold"
            />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          'md:hidden transition-all duration-300 overflow-hidden',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-kewo-navy-dark border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={parseLinkHref(item.href)}
              className={clsx(
                'block px-3 py-2 text-sm font-medium uppercase tracking-wide rounded',
                isNavItemActive(item.href, pathname)
                  ? 'text-kewo-gold bg-white/5'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded px-4 py-2 text-sm focus:outline-none focus:border-kewo-gold"
            />
          </div>
        </div>
      </div>
    </header>
  )
}