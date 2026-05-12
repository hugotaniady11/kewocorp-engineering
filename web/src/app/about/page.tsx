import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle, ChevronDown } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import { CERTIFICATIONS_DATA } from '@/lib/data'
import type { Certification } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Kewo Engineering Corporation is a multidisciplinary engineering design and consulting firm founded by Brian Kewo in 2014, specializing in Electric Power engineering services.',
}

export const revalidate = 3600

const EDUCATION = [
  { degree: 'M.S. Financial Engineering', school: 'University of Southern California, Los Angeles, CA' },
  { degree: 'M.S. Electrical Engineering – Electric Power Systems', school: 'University of Southern California, Los Angeles, CA' },
  { degree: 'B.S. Electrical Engineering', school: 'California State Polytechnic University, Pomona, CA' },
]

const LICENSES = [
  'Certified Information Systems Security Professional (CISSP), #768404',
  'Professional Engineer – Electrical, #E19688 (CA), #028599 (NV)',
  'Professional Engineer – Civil, #C79923 (CA), #028599 (NV)',
  'Professional Engineer – Mechanical, #M37237 (CA), #028599 (NV)',
  'Project Management Professional (PMP), #2012073',
  'Certified Information Security Manager (CISM), #2052877',
  'Certified Construction Manager (CCM), #13281',
  'Class A General Engineering Contractor, #1004260',
  'Class B General Building Contractor, #1004260',
  'Class C-10 Electrical Contractor, #1004260',
  'C-61/D38 – Sand and Water Blasting',
  'USPTO Patent Agent, #68586',
  'Certified General Electrician, #E-179146-G',
]

const VALUES = [
  {
    label: 'Our Commitment',
    tagline: 'As a small business owner, our work is our livelihood and our passion.',
    body: 'Being a fully committed team member and providing high-quality service is essential for long-lasting partnerships. We are committed to doing what it takes to succeed, provide flexibility, and expedite tasks for our clients.',
  },
  {
    label: 'Our Mission',
    tagline: 'Infrastructure and Jobs',
    body: 'Our mission is to build infrastructure through quality engineering and build lives through well-paying jobs.',
  },
  {
    label: 'Our Core Values',
    tagline: 'Happiness, Trust, and Self-Development',
    body: 'We enjoy what we do and how we do it. We maintain trust with our team and clients. We continually develop ourselves personally and professionally.',
  },
]

// Static only for now — swap with Supabase later
async function getCertifications(): Promise<Certification[]> {
  return CERTIFICATIONS_DATA as unknown as Certification[]
}

const GRID_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

export default async function AboutPage() {
  const certifications = await getCertifications()

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative min-h-[40vh] bg-kewo-navy flex items-center pt-20">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: GRID_PATTERN }} />
        <div className="container-default relative z-10 py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-8 bg-kewo-gold" />
            <span className="text-kewo-gold text-xs font-bold tracking-[0.3em] uppercase">Kewo Engineering</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wide">About Us</h1>
          <p className="text-gray-300 mt-3 max-w-xl text-sm">Delivering World-Class Engineering Solutions</p>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section id="about" className="section-padding bg-white">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader eyebrow="Who We Are" title="Kewo Engineering Corporation" />
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  <strong className="text-kewo-navy">Kewo Engineering Corporation</strong> is a multidisciplinary
                  engineering design and consulting firm, specializing in Electric Power related engineering services,
                  for electric utilities, public agencies, and private companies worldwide.
                </p>
                <p>
                  Kewo Engineering Corporation was founded by Brian Kewo in 2014. Prior to establishing Kewo
                  Engineering, Brian worked in the Substation Design group at the Los Angeles Department of Water
                  and Power (LADWP), the largest municipal utility in the United States.
                </p>
                <p>
                  His responsibilities at LADWP included Project Management and Engineering Design for various small
                  and large projects at low-, medium-, and high-voltage levels, with budgets that ranged from $20,000
                  to $79 million dollars. These projects included specifications, procurement, and QA of significant
                  materials and equipment; equipment replacements, retrofits, and upgrades; and the design and
                  construction of new multi-million-dollar substations.
                </p>
              </div>
            </div>

            {/* Photo placeholder */}
            <div className="relative aspect-[4/3] bg-kewo-navy overflow-hidden rounded">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/40">
                  <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-xs uppercase tracking-widest">Engineering Excellence</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-kewo-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding bg-kewo-light">
        <div className="container-default">
          <SectionHeader eyebrow="Our Foundation" title="Values" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-kewo-navy group-hover:bg-kewo-gold rounded flex items-center justify-center mb-5 transition-colors duration-300">
                  <span className="text-white font-extrabold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-kewo-gold text-xs font-bold uppercase tracking-widest mb-1">{v.label}</p>
                <h3 className="text-kewo-navy font-bold text-base mb-3 italic">{v.tagline}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-12 text-center">
            <p className="text-kewo-navy text-lg md:text-xl font-semibold italic max-w-2xl mx-auto">
              &ldquo;Our mission is to build infrastructure through quality engineering and build lives through well-paying jobs.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* FOUNDER BIO */}
      <section className="section-padding bg-white">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Portrait */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative w-48 h-64 mx-auto lg:mx-0 bg-kewo-navy overflow-hidden rounded">
                  <Image
                    src="https://kewocorp.com/wp-content/uploads/2020/08/KEC-Headshot-Brian-Kewo-225x300.jpg"
                    alt="Brian B. Kewo, P.E."
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="mt-4 text-center lg:text-left">
                  <h3 className="text-kewo-navy font-extrabold text-lg">Brian B. Kewo</h3>
                  <p className="text-kewo-gold text-xs font-bold uppercase tracking-widest">P.E., CISSP, CISM, PMP, CCM</p>
                  <p className="text-gray-500 text-sm mt-1">Founder &amp; President</p>
                </div>

                {/* Education */}
                <div className="mt-6">
                  <h4 className="text-kewo-navy font-bold text-xs uppercase tracking-widest mb-3">Education</h4>
                  <div className="space-y-2">
                    {EDUCATION.map((e, i) => (
                      <div key={i} className="text-xs">
                        <p className="font-semibold text-kewo-navy">{e.degree}</p>
                        <p className="text-gray-500">{e.school}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <SectionHeader eyebrow="Founder & President" title="Brian B. Kewo, P.E." />
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  <strong className="text-kewo-navy">Brian Kewo</strong> is the founder and president of Kewo
                  Engineering Corporation. He is a well-rounded, experienced professional engineer with a unique mix
                  of technical, financial, and business skillsets.
                </p>
                <p>
                  At the age of 29, Brian left employment with the Los Angeles Department of Water and Power (LADWP),
                  the largest municipal utility in the United States, to pursue his passion to start his own
                  electrical engineering firm that specializes in high-voltage electrical projects.
                </p>

                <h4 className="text-kewo-navy font-bold text-sm mt-6">Technical Competence</h4>
                <p>
                  Brian has multidisciplinary engineering, construction, and project management knowledge and
                  experience. He is a licensed Professional Engineer in three engineering disciplines (electrical,
                  civil, and mechanical engineering), a certified Project Management Professional (PMP), a Certified
                  Information Systems Security Professional (CISSP), a Certified Information Security Manager
                  (CISM), a licensed C-10 Electrical Contractor, a licensed Class A General Engineering Contractor,
                  and a registered Patent Agent. He holds international licenses as an APEC (Asia-Pacific Economic
                  Cooperation) Engineer and EMF (Engineers Mobility Forum) Engineer.
                </p>

                <BioAccordion
                  title="IEEE Involvement"
                  content="Brian Kewo is a Senior IEEE Member and has been an active IEEE Power & Engineering Society (PES) member. He regularly attends IEEE events and has taken on various IEEE leadership positions in Metro Los Angeles. In recent years, Brian has served as Secretary for IEEE Metro Los Angeles and Membership Development Chair. He has assisted IEEE PES with reviewing and commenting on several IEEE paper submittals for SusTech."
                />
                <BioAccordion
                  title="Continuing Education"
                  content="Brian regularly attends professional development, infrastructure, and business events. Recent programs include: Small Business Administration (SBA) Emerging Leaders Program; Construction Training Academy — Bidding & Estimating Bootcamp; Los Angeles Small Business Academy."
                />
                <BioAccordion
                  title="Community Activities"
                  content="Brian Kewo currently serves as Board Member for the Asian American Architects and Engineers (AAa/e) Foundation, a non-profit dedicated to providing students and emerging professionals with personal and professional development through scholarships, internships, and mentorships."
                />
              </div>

              {/* Licenses */}
              <div className="mt-8">
                <h4 className="text-kewo-navy font-bold text-xs uppercase tracking-widest mb-4">
                  Licenses &amp; Certifications
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {LICENSES.map((lic, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle size={12} className="text-kewo-gold mt-0.5 flex-shrink-0" />
                      {lic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section-padding bg-kewo-navy">
        <div className="container-default">
          <div className="text-center mb-8">
            <p className="text-kewo-gold font-bold text-xs uppercase tracking-widest mb-2">Recognition</p>
            <p className="text-white text-base font-semibold">
              &ldquo;In 2019, Kewo Engineering received the 2019 IEEE Region 6 Award for Outstanding Corporate Service.&rdquo;
            </p>
          </div>

          <SectionHeader eyebrow="Credentials" title="Our Certifications" light align="center" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
            {certifications.map((cert) => (
              <div
                key={cert.id ?? cert.name}
                className="border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-4"
              >
                <p className="text-white font-semibold text-sm">{cert.name}</p>
                <div className="flex gap-3 mt-1">
                  {cert.number && (
                    <span className="text-kewo-gold text-xs font-mono">{cert.number}</span>
                  )}
                  {cert.issuer && (
                    <span className="text-gray-400 text-xs">{cert.issuer}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function BioAccordion({ title, content }: { title: string; content: string }) {
  return (
    <details className="group border border-gray-100 rounded">
      <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
        <span className="text-kewo-navy font-bold text-sm">{title}</span>
        <ChevronDown
          size={16}
          className="text-kewo-gold group-open:rotate-180 transition-transform duration-200"
        />
      </summary>
      <div className="px-4 pb-4">
        <p className="text-gray-500 text-sm leading-relaxed">{content}</p>
      </div>
    </details>
  )
}