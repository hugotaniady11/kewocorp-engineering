'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

const SLIDES = [
  {
    id: 1,
    tagline: 'Delivering World-Class Engineering Solutions',
    cta: { label: 'View Projects', href: '/services#ourwork' },
    bg: 'bg-gradient-to-br from-kewo-navy via-[#243044] to-[#1a3a5c]',
  },
  {
    id: 2,
    tagline: 'Building Infrastructure Through Quality Engineering',
    cta: { label: 'Our Services', href: '/services' },
    bg: 'bg-gradient-to-br from-kewo-navy-dark via-[#1a2a4a] to-[#0f2340]',
  },
  {
    id: 3,
    tagline: 'Electric Power Engineering for Utilities & Agencies Worldwide',
    cta: { label: 'About Us', href: '/about' },
    bg: 'bg-gradient-to-br from-[#0f172a] via-[#1e2d4d] to-[#162544]',
  },
] as const

const SLIDE_INTERVAL = 6000
const SLIDE_TRANSITION = 500

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length)
        setIsAnimating(false)
      }, SLIDE_TRANSITION)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[current]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className={clsx('absolute inset-0 transition-all duration-1000', slide.bg)} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent lines */}
      <div className="absolute bottom-0 right-0 w-1/2 h-2 bg-kewo-gold opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-kewo-gold opacity-30" />

      {/* Content */}
      <div className="relative z-10 container-default w-full pt-20">
        <div
          className={clsx(
            'transition-all duration-500',
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          )}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-12 bg-kewo-gold" />
            <span className="text-kewo-gold text-xs font-bold tracking-[0.3em] uppercase">
              Electric Power Engineering
            </span>
          </div>

          <p className="text-white/80 text-lg md:text-xl font-light tracking-wide mb-4 max-w-2xl">
            {slide.tagline}
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wider uppercase mb-8">
            KEWO ENGINEERING
          </h1>

          <Link
            href={slide.cta.href}
            className="btn-primary group"
          >
            {slide.cta.label}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-4 sm:left-6 lg:left-8 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={clsx(
                'h-0.5 transition-all duration-300',
                i === current
                  ? 'w-8 bg-kewo-gold'
                  : 'w-4 bg-white/40 hover:bg-white/60'
              )}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent" />
    </section>
  )
}