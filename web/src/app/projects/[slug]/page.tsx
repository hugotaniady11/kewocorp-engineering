import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { getProjects, getProjectBySlug } from '@/services/projects'

interface Props {
  params: Promise<{ slug: string }>
}

type Project = {
  id?: number
  title: string
  client?: string | null
  slug: string
  description?: string | null
  image_url?: string | null
  video_url?: string | null
  category?: string | null
  tags?: string[] | null
}

export async function generateStaticParams() {
  const projects = (await getProjects()) as Project[]

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const project = (await getProjectBySlug(slug)) as Project | null

    if (!project) {
      return { title: 'Project Not Found' }
    }

    return {
      title: project.title,
      description: project.description ?? undefined,
    }
  } catch {
    return { title: 'Project Not Found' }
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params

  let project: Project | null = null

  try {
    project = (await getProjectBySlug(slug)) as Project | null
  } catch {
    project = null
  }

  if (!project) notFound()

  return (
    <main className="pt-20 min-h-screen bg-kewo-navy">
      <div className="bg-white">
        <div className="bg-kewo-navy py-16">
          <div className="container-default">
            <Link
              href="/services#ourwork"
              className="inline-flex items-center gap-2 text-kewo-gold hover:text-kewo-gold-light text-sm font-semibold uppercase tracking-wider transition-colors mb-6 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>

            {project.category && (
              <p className="text-kewo-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">
                {project.category}
              </p>
            )}

            <h1 className="text-white font-extrabold text-2xl md:text-4xl uppercase tracking-wide max-w-3xl leading-tight">
              {project.title}
            </h1>

            {project.client && (
              <p className="text-gray-400 text-sm mt-3 font-medium">
                Client: <span className="text-white">{project.client}</span>
              </p>
            )}
          </div>
        </div>

        {(project.image_url || project.video_url) && (
          <div className="container-default py-10">
            <div className="relative aspect-video w-full overflow-hidden bg-kewo-navy max-w-4xl">
              {project.image_url ? (
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : project.video_url ? (
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                >
                  <source src={project.video_url} type="video/mp4" />
                </video>
              ) : null}
            </div>
          </div>
        )}

        <div className="container-default pb-20">
          <div className="max-w-3xl">
            {project.description && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-0.5 w-8 bg-kewo-gold" />
                  <span className="text-kewo-gold text-xs font-bold uppercase tracking-[0.3em]">
                    Project Overview
                  </span>
                </div>
                <p className="text-gray-600 text-base leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="mb-8">
                <p className="text-kewo-navy text-xs font-bold uppercase tracking-widest mb-3">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-kewo-light border border-gray-200 text-kewo-navy text-xs font-semibold px-3 py-1 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/services#ourwork"
              className="btn-outline inline-flex items-center gap-2 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}