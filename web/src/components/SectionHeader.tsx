import { clsx } from 'clsx'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionHeaderProps) {
  const isCentered = align === 'center'

  return (
    <div className={clsx('mb-10', isCentered && 'text-center')}>
      {eyebrow && (
        <div className={clsx('flex items-center gap-3 mb-3', isCentered && 'justify-center')}>
          {!isCentered && <div className="h-0.5 w-8 bg-kewo-gold" />}
          <span className="text-kewo-gold text-xs font-bold uppercase tracking-[0.3em]">
            {eyebrow}
          </span>
          {isCentered && <div className="h-0.5 w-8 bg-kewo-gold" />}
        </div>
      )}
      <h2
        className={clsx(
          'text-2xl md:text-3xl font-extrabold uppercase tracking-wide',
          light ? 'text-white' : 'text-kewo-navy'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'mt-3 text-sm leading-relaxed max-w-2xl',
            light ? 'text-gray-300' : 'text-gray-500',
            isCentered && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}