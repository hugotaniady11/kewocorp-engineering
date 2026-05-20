import { Zap, HardHat, ClipboardList, GraduationCap, ShieldCheck } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { Service } from '@/lib/types'

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>

const ICON_MAP: Record<string, LucideIcon> = {
  'zap':            Zap,
  'hard-hat':       HardHat,
  'clipboard-list': ClipboardList,
  'graduation-cap': GraduationCap,
  'shield-check':   ShieldCheck,
}

interface ServiceCardProps {
  service: Service
  variant?: 'default' | 'compact'
}

export default function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const Icon: LucideIcon = service.icon ? ICON_MAP[service.icon] : Zap

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 group">
        <div className="w-8 h-8 bg-kewo-gold/10 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-kewo-gold/20 transition-colors">
          <Icon size={16} className="text-kewo-gold" />
        </div>
        <span className="text-kewo-navy font-semibold text-sm group-hover:text-kewo-gold transition-colors">
          {service.title}
        </span>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-12 h-12 bg-kewo-navy rounded flex items-center justify-center mb-4 group-hover:bg-kewo-navy transition-colors duration-300">
        <Icon size={22} className="text-white group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-kewo-navy font-bold text-base mb-2 group-hover:text-kewo-navy transition-colors">
        {service.title}
      </h3>
      {service.description && (
        <p className="text-gray-500 text-sm leading-relaxed">
          {service.description}
        </p>
      )}
    </div>
  )
}