import Link from 'next/link'
import { Award, ChevronRight, ArrowRight } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import SectionHeader from '@/components/SectionHeader'
import ProjectCard from '@/components/ProjectCard'
import ServiceCard from '@/components/ServiceCard'
import { getProjects } from '@/services/projects'
import { getServices } from '@/services/services'
import clsx from 'clsx'

export const revalidate = 3600

const CLIENTS = [
  {
    name: 'LADWP',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-LADWP.png',
  },
  {
    name: 'AECOM',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-aecom.png',
  },
  {
    name: 'HATCH',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-hatch.png',
  },
  {
    name: 'ARUP',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-arup.png',
  },
  {
    name: 'PRESIDIO',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-presidio.png',
  },
  {
    name: 'PORT OF LOS ANGELES',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-port-of-LA.png',
  },
  {
    name: 'HACLA',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-HACLA.png',
  },
  {
    name: 'PORT OF LOS ANGELES',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-port-of-LA.png',
  },
  {
    name: 'CITY OF ANAHEIM',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-city-of-anaheim.png',
  },
  {
    name: 'CITY OF RIVERSIDE PUBLIC UTILITIES',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-city-of-riverside-public-utilities.png',
  },
  {
    name: 'WSP',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-wsp.png',
  },
  {
    name: 'MMR',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-mmr.png',
  },
  {
    name: 'HDR',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-hdr.png',
  },
  {
    name: 'KTR',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-ktr.png',
  },
  {
    name: 'LAWA',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-lawa.png',
  },
  {
    name: 'DH GREEN ENERGY',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-dhgreenenergy.png',
  },
  {
    name: 'FOOTHILL GOLDLINE',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-Foothill_Goldline.png',
  },
  {
    name: 'METROLINK',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/Metrolink_logo.png',
  },
  {
    name: 'HOLLYWOOD BURBANK AIRPORT',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-Hollywood-Burbank-Airport.png',
  },
  {
    name: 'FENIX',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-fenix.png',
  },
  {
    name: 'SVUSD',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-sonoma-valley-unified-school-district.png',
  },
  {
    name: 'PASADENA WATER AND POWER',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-pasadena-water-and-power-copy.png',
  },
  {
    name: 'PORT OF LONG BEACH',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-port-of-long-beach.png',
  },
  {
    name: 'METRO',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-la-metro-2.png',
  },
  {
    name: 'CITY OF SAN DIEGO',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-city-of-san-diego.png',
  },
  {
    name: 'DNV GL',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-dnvgl.png',
  },
  {
    name: 'TBEA',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-tbea.png',
  },
  {
    name: 'KS DRILLING',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-ks-drilling.png',
  },
  {
    name: 'TYLIN',
    logo: 'https://kewocorp.com/wp-content/uploads/2020/09/logo-tylin-2.png',
  },

]

export default async function HomePage() {
  const [services, featuredProjects] = await Promise.all([
    getServices(),
    getProjects({ featured: true, limit: 4 }),
  ])

  return (
    <>
      <HeroSection />

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

      <section className="section-padding bg-kewo-light">
        <div className="container-default">
          <SectionHeader
            eyebrow="Services"
            title="Services"
            subtitle="Our lean team of multidisciplinary engineers are committed to providing you with responsive support and world-class engineering solutions."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
            {services.map((service: any) => (
              <ServiceCard key={service.id ?? service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-padding bg-white">
        <div className="container-default">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader eyebrow="Recent Projects" title="Recent Projects" />
            <Link
              href="/services#ourwork"
              className="hidden sm:inline-flex items-center gap-2 text-kewo-navy hover:text-kewo-navy-light text-sm font-semibold uppercase tracking-wider transition-colors group"
            >
              View All Work
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project: any) => (
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

      <section className="section-padding bg-kewo-light">
        <div className="container-default">
          <SectionHeader eyebrow="Clients" title="Our Clients" align="center" />
          <div className="mt-8 flex flex-wrap justify-center gap-y-6">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex h-16 w-1/2 items-center justify-center sm:w-1/3 lg:w-1/5"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-16 w-auto object-contain opacity-90 transition-opacity duration-200 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-default text-center">
          <h2 className="text-kewo-navy font-extrabold text-2xl md:text-3xl uppercase tracking-wide mb-4">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-kewo-navy/80 mb-6 max-w-xl mx-auto text-sm">
            Contact us today to discuss how Kewo Engineering can deliver world-class solutions
            for your electric power needs.
          </p>
          <a
            href="mailto:brian.kewo@kewocorp.com"
            className="inline-flex items-center gap-2 bg-kewo-navy hover:bg-kewo-navy-light text-white font-semibold px-8 py-3 uppercase tracking-widest text-sm transition-all duration-200"
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
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10 flex gap-5 items-start">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <Award size={24} className="text-kewo-navy" />
        </div>
        <div>
          <p className="text-kewo-white text-xs font-bold uppercase tracking-widest mb-2">
            IEEE Region 6 Award
          </p>
          <p className="text-white font-semibold leading-relaxed">
            Kewo Engineering is a recipient of the{' '}
            <strong className="text-kewo-white">IEEE Region 6 Award</strong> for{' '}
            <strong className="text-kewo-white">&ldquo;Outstanding Corporate Service&rdquo;</strong>
          </p>
        </div>
      </div>
    </div>
  )
}