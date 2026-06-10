import type { Metadata } from 'next'
import Link from 'next/link'
import { Filter } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import ServiceCard from '@/components/ServiceCard'
import ProjectCard from '@/components/ProjectCard'
import { getServices } from '@/services/services'
import { getProjects } from '@/services/projects'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Kewo Engineering offers Design & Engineering, Project & Construction Management, Specifications & Procurement, Training, and Quality Assurance services for electric power systems.',
}

export const revalidate = 3600

const GRID_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

type Service = {
  id?: number
  title: string
  slug: string
  description?: string | null
}

type Project = {
  id: string
  title: string
  slug: string
  client?: string
  description?: string
  image_url?: string
  video_url?: string
  category?: string
}

type ServicesPageProps = {
  searchParams?: {
    category?: string
  }
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const selectedCategory = searchParams?.category || 'All'

  const [services, allProjects] = await Promise.all([
    getServices(),
    getProjects(),
  ])

  const categories = [
    'All',
    ...Array.from(
      new Set(
        (allProjects as Project[])
          .map((project) => project.category)
          .filter(Boolean)
      )
    ),
  ] as string[]

  const projects =
    selectedCategory === 'All'
      ? (allProjects as Project[])
      : (allProjects as Project[]).filter((project) => project.category === selectedCategory)

  return (
    <>
      <section className="relative min-h-[40vh] bg-kewo-navy flex items-center pt-20">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: GRID_PATTERN }} />
        <div className="container-default relative z-10 py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-8 bg-white" />
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">What We Offer</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wide">Services</h1>
          <p className="text-gray-300 mt-3 max-w-xl text-sm">
            Our lean team of multidisciplinary engineers are committed to providing you with responsive support and
            world-class engineering solutions.
          </p>
        </div>
      </section>

      <section className="section-padding bg-kewo-light">
        <div className="container-default">
          <SectionHeader eyebrow="What We Offer" title="Our Services" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
            {(services as Service[]).map((service) => (
              <ServiceCard key={service.id ?? service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(services as Service[]).map((service, i) => (
              <div
                key={service.id ?? service.slug}
                className="flex gap-5 p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-kewo-navy rounded flex items-center justify-center flex-shrink-0 text-white font-extrabold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-kewo-navy font-bold text-base mb-2">{service.title}</h3>
                  {service.description && (
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ourwork" className="section-padding bg-kewo-light">
        <div className="container-default">
          <SectionHeader
            eyebrow="Recent Projects"
            title="Recent Projects"
            subtitle="A selection of our recent engineering projects across electric utilities, public agencies, and private sector clients."
          />

          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider mr-2">
              <Filter size={12} />
              Filter:
            </div>

            {categories.map((cat) => {
              const isActive = cat === selectedCategory

              return (
                <Link
                  key={cat}
                  href={cat === 'All' ? '/services#ourwork' : `/services?category=${encodeURIComponent(cat)}#ourwork`}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${isActive
                      ? 'bg-kewo-navy text-white border-kewo-navy'
                      : 'border-kewo-navy text-kewo-navy hover:bg-kewo-navy hover:text-white'
                    }`}
                >
                  {cat}
                </Link>
              )
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.id ?? project.slug} project={project} />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-sm">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      {/* <section className="bg-kewo-navy py-12">
        <div className="container-default text-center">
          <h2 className="text-white font-extrabold text-2xl md:text-3xl uppercase tracking-wide mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            Let&apos;s discuss how we can deliver world-class engineering solutions for your needs.
          </p>
          <a
            href="mailto:brian.kewo@kewocorp.com"
            className="btn-outline-light group"
          >
            Contact Us
          </a>
        </div>
      </section> */}
    </>
  )
}