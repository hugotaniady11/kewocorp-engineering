'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { removeAuthToken } from '@/lib/auth'
import clsx from 'clsx'

const navItems = [
  { label: 'Projects', href: '/dashboard/projects' },
  { label: 'Services', href: '/dashboard/services' },
  { label: 'RFP', href: '/dashboard/rfp' },
  { label: 'Profile', href: '/dashboard/profile' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  function handleSignOut() {
    removeAuthToken()
    router.push('/sign-in')
  }

  return (
    <aside className="w-56 min-h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b">
        <span className="font-semibold text-lg tracking-tight">
          <Link href="/dashboard">Kewo Dashboard</Link>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'block px-3 py-2 rounded text-sm font-medium transition-colors',
              pathname.startsWith(item.href)
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t">
        <button
          onClick={handleSignOut}
          className="w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}