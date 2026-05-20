'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

const SLIDE = {
  tagline: 'Delivering World-Class Engineering Solutions',
  cta: { label: 'View Projects', href: '/services#ourwork' },
  bg: 'bg-gradient-to-br from-kewo-navy via-[#243044] to-[#1a3a5c]',
} as const

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className={clsx('absolute inset-0', SLIDE.bg)} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent lines */}
      <div className="absolute bottom-0 right-0 w-1/2 h-2 bg-kewo-light opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-kewo-light opacity-30" />

      {/* Content */}
      <div className="relative z-10 container-default w-full pt-20">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-12 bg-kewo-light" />
            <span className="text-kewo-light text-xs font-bold tracking-[0.3em] uppercase">
              Electric Power Engineering
            </span>
          </div>

          <p className="text-white/80 text-lg md:text-xl font-light tracking-wide mb-4 max-w-2xl">
            {SLIDE.tagline}
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wider uppercase mb-8">
            KEWO ENGINEERING
          </h1>

          <Link href={SLIDE.cta.href} className="btn-outline-light group">
            {SLIDE.cta.label}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent" />
    </section>
  )
}