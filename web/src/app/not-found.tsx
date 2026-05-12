import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-kewo-navy flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-0.5 w-8 bg-kewo-gold" />
          <span className="text-kewo-gold text-xs font-bold tracking-[0.3em] uppercase">404</span>
          <div className="h-0.5 w-8 bg-kewo-gold" />
        </div>
        <h1 className="text-6xl font-extrabold text-white uppercase tracking-wider mb-4">
          Not Found
        </h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-kewo-gold hover:bg-kewo-gold-light text-white font-semibold px-8 py-3 uppercase tracking-widest text-sm transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}