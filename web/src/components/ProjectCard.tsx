'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-kewo-navy">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : project.video_url ? (
          <VideoThumbnail src={project.video_url} />
        ) : (
          <PlaceholderThumbnail />
        )}

        {project.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-kewo-navy-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-kewo-navy text-xs font-bold uppercase tracking-widest mb-1">
          {project.client}
        </p>
        <h3 className="text-kewo-navy font-semibold text-sm leading-snug line-clamp-2 mb-3 group-hover:text-kewo-navy-light transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-kewo-navy hover:text-kewo-navy-light text-xs font-semibold uppercase tracking-wider transition-colors group/link"
        >
          View Project
          <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}

function VideoThumbnail({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <video
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
        onMouseLeave={(e) => {
          e.currentTarget.pause()
          e.currentTarget.currentTime = 0
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-kewo-light/80 flex items-center justify-center">
          <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function PlaceholderThumbnail() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-16 h-16 mx-auto mb-3 border-2 border-kewo-light/40 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-kewo-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-white/60 text-xs uppercase tracking-wider">Engineering Project</span>
      </div>
    </div>
  )
}