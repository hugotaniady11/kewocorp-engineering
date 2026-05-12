import Link from 'next/link'
import { Award, ChevronRight, ArrowRight } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import SectionHeader from '@/components/SectionHeader'
import ProjectCard from '@/components/ProjectCard'
import ServiceCard from '@/components/ServiceCard'
import { getHomeData } from '@/lib/data/home'
import { CLIENTS } from '@/lib/data'
import type { Project, Service } from '@/lib/types'

export const revalidate = 3600

export default async function HomePage() {
  const { services, featuredProjects } = await getHomeData()

  return (
    <>
      <HeroSection />

      {/* ABOUT */}
      <section className="section-padding bg-white">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow="About Us"
                title="About Us"
                subtitle="Kewo Engineering is a multidisciplinary engineering design and consulting firm, specializing in Electric Power related engineering services for electric utilities, public agencies, and private companies worldwide."
              />
              <Link href="/about#about" className="btn-primary group">
                Learn More About Us
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <IeeeAwardCard />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding bg-kewo-light">
        <div className="container-default">
          <SectionHeader
            eyebrow="Services"
            title="Services"
            subtitle="Our lean team of multidisciplinary engineers are committed to providing you with responsive support and world-class engineering solutions."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
            {services.map((service) => (
              <ServiceCard key={service.id ?? service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      <section id="projects" className="section-padding bg-white">
        <div className="container-default">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader eyebrow="Recent Projects" title="Recent Projects" />
            <Link
              href="/services#ourwork"
              className="hidden sm:inline-flex items-center gap-2 text-kewo-navy hover:text-kewo-gold text-sm font-semibold uppercase tracking-wider transition-colors group"
            >
              View All Work
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id ?? project.slug} project={project} />
            ))}
          </div>
          <div className="text-center mt-10 sm:hidden">
            <Link href="/services#ourwork" className="btn-outline">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section-padding bg-kewo-navy">
        <div className="container-default">
          <SectionHeader eyebrow="Clients" title="Our Clients" light align="center" />
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {CLIENTS.map((client) => (
              <span
                key={client}
                className="border border-white/20 text-white/70 hover:text-kewo-gold hover:border-kewo-gold/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-kewo-gold py-12">
        <div className="container-default text-center">
          <h2 className="text-white font-extrabold text-2xl md:text-3xl uppercase tracking-wide mb-4">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm">
            Contact us today to discuss how Kewo Engineering can deliver world-class solutions
            for your electric power needs.
          </p>
          <a
            href="mailto:brian.kewo@kewocorp.com"
            className="inline-flex items-center gap-2 bg-kewo-navy hover:bg-kewo-navy-dark text-white font-semibold px-8 py-3 uppercase tracking-widest text-sm transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </>
  )
}

function IeeeAwardCard() {
  return (
    <div className="bg-kewo-navy text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-kewo-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10 flex gap-5 items-start">
        <div className="w-14 h-14 bg-kewo-gold rounded-full flex items-center justify-center flex-shrink-0">
          <Award size={24} className="text-white" />
        </div>
        <div>
          <p className="text-kewo-gold text-xs font-bold uppercase tracking-widest mb-2">
            IEEE Region 6 Award
          </p>
          <p className="text-white font-semibold leading-relaxed">
            Kewo Engineering is a recipient of the{' '}
            <strong className="text-kewo-gold">IEEE Region 6 Award</strong> for{' '}
            <strong className="text-kewo-gold">&ldquo;Outstanding Corporate Service&rdquo;</strong>
          </p>
        </div>
      </div>
    </div>
  )
}