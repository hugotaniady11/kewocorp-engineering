-- ============================================================
-- Kewo Engineering — Supabase Schema
-- Run this in Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- Projects / Portfolio
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  category TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  number TEXT,
  issuer TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions
CREATE TYPE contact_status AS ENUM ('new', 'read', 'replied');

CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status contact_status DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIGGERS — auto-update updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Public read for content tables
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read certifications" ON certifications FOR SELECT USING (true);

-- Contacts: anyone can insert, only service role can read
CREATE POLICY "Anyone can submit contact" ON contacts FOR INSERT WITH CHECK (true);

-- ============================================================
-- SEED DATA — Services
-- ============================================================

INSERT INTO services (title, slug, description, icon, order_index) VALUES
  ('Design & Engineering', 'design-engineering',
   'Comprehensive electrical power system design including substations, transmission lines, distribution systems, and renewable energy facilities.',
   'zap', 1),
  ('Project & Construction Management', 'project-construction-management',
   'End-to-end project management and construction oversight for electric power infrastructure, from planning through commissioning.',
   'hard-hat', 2),
  ('Specifications & Procurement', 'specifications-procurement',
   'Technical specification development and procurement support for electrical equipment, materials, and systems.',
   'clipboard-list', 3),
  ('Training & Knowledge Transfer', 'training-knowledge-transfer',
   'Professional training programs and knowledge transfer sessions tailored for utility engineers and operations staff.',
   'graduation-cap', 4),
  ('Quality Assurance & Control', 'quality-assurance-control',
   'Rigorous QA/QC programs ensuring engineering deliverables and construction work meet the highest industry standards.',
   'shield-check', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED DATA — Projects
-- ============================================================

INSERT INTO projects (title, client, slug, description, image_url, video_url, category, tags, featured, order_index) VALUES
  ('2025 Tar Pit Assessment at 2600 Wilshire',
   'Housing Authority City of Los Angeles',
   '2025-tar-pit-assessment-wilshire',
   'Comprehensive tar pit assessment and environmental engineering services.',
   'https://kewocorp.com/wp-content/uploads/2025/04/tar_pit_assestment_willshore_poster-300x214.jpg',
   NULL, 'Design & Engineering', ARRAY['environmental','assessment'], true, 1),

  ('Electric Vehicle, Energy Storage and Solar Infrastructure Project Management',
   'City of Thousand Oaks',
   'ev-energy-storage-solar-thousand-oaks',
   'Project management for EV charging, battery energy storage systems, and solar installations.',
   'https://kewocorp.com/wp-content/uploads/2025/04/DJI_0155-300x214.jpg',
   NULL, 'Project & Construction Management', ARRAY['EV','solar','BESS'], true, 2),

  ('Owners Engineering for Glenarm 25MW BESS Project',
   'Pasadena Water and Power',
   'glenarm-25mw-bess-owners-engineering',
   'Owner''s engineering services for a 25MW battery energy storage system project.',
   'https://kewocorp.com/wp-content/uploads/2025/03/Owners-Engineering-BESS-PWP-300x214.jpg',
   NULL, 'Design & Engineering', ARRAY['BESS','energy storage'], true, 3),

  ('Mobile Substation Specification',
   'Pasadena Water and Power',
   'pwp-mobile-substation-specification',
   'Technical specification development for mobile substation equipment.',
   'https://kewocorp.com/wp-content/uploads/2025/04/PWP-300x214.jpg',
   NULL, 'Specifications & Procurement', ARRAY['substation','specification'], false, 4),

  ('Electric Vehicle Charger Design',
   'City of Anaheim',
   'anaheim-ev-charger-design',
   'Electrical design services for EV charging infrastructure.',
   'https://kewocorp.com/wp-content/uploads/2025/04/electric_vehicle_charger_design-221x214.png',
   NULL, 'Design & Engineering', ARRAY['EV','charging'], false, 5),

  ('Overhead-Underground Conversion',
   'Cedars Sinai',
   'cedars-sinai-overhead-underground-conversion',
   'Engineering design for overhead to underground power line conversion.',
   'https://kewocorp.com/wp-content/uploads/2025/03/DJI_0374-300x214.jpg',
   NULL, 'Design & Engineering', ARRAY['underground','conversion'], false, 6),

  ('Electrical Design Services for Overhead Electrical Upgrades',
   'City of Anaheim',
   'gsa-03-overhead-electrical-upgrades',
   'Electrical design services for upgrading overhead electrical infrastructure.',
   'https://kewocorp.com/wp-content/uploads/2024/07/Electrical_Design_Services_for_Overhead_Electrical_Upgrades_2-300x214.png',
   NULL, 'Design & Engineering', ARRAY['overhead','upgrades'], true, 7),

  ('Garland Solar Facility — Conduit Design-Build for Centralized Remedial Action Scheme',
   'LADWP',
   'garland-solar-conduit-design-build',
   'Conduit design-build for centralized remedial action scheme at Garland Solar Facility.',
   NULL,
   'https://kewocorp.com/wp-content/uploads/2020/10/Garland-Coinduit-Revise-201127.mp4',
   'Design & Engineering', ARRAY['solar','conduit'], true, 8),

  ('Maintenance Yards EV Charger Expansion',
   'Pasadena Water and Power',
   'pwp-maintenance-yards-ev-charger-expansion',
   'Expansion of EV charging infrastructure at utility maintenance yards.',
   'https://kewocorp.com/wp-content/uploads/2025/03/Maintenance-EV-PWP-300x214.jpg',
   NULL, 'Design & Engineering', ARRAY['EV','charging'], false, 9),

  ('McCullough-Victorville Lines 1 and 2 Series Compensation Project',
   'LADWP',
   'mccullough-victorville-series-compensation',
   'Series compensation engineering for high-voltage transmission lines.',
   NULL, NULL,
   'Design & Engineering', ARRAY['transmission','compensation'], true, 10),

  ('Center Substation — Replacement of 66kV Circuit Breakers',
   'Southern California Edison',
   'sce-center-substation-66kv-breakers',
   'Engineering services for 66kV circuit breaker replacement at Center Substation.',
   NULL, NULL,
   'Design & Engineering', ARRAY['substation','high-voltage'], false, 11),

  ('Federally Funded Marine Engineering Services',
   'Port of Oakland',
   'port-of-oakland-marine-engineering',
   'Marine electrical engineering services supported by federal funding.',
   NULL, NULL,
   'Design & Engineering', ARRAY['marine','federal'], false, 12)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED DATA — Certifications
-- ============================================================

INSERT INTO certifications (name, number, issuer, order_index) VALUES
  ('SBE: Small Business Enterprise', '#732030', 'Port of Long Beach', 1),
  ('SB Micro: Small Business', '#1787885', 'Department of General Services (DGS OSDS)', 2),
  ('SLB: Small Local Business', '#SLB-3788', 'City of Los Angeles', 3),
  ('SBE: Small Business Enterprise', '#7317', 'LA Metropolitan Transportation Authority (Metro)', 4),
  ('MBE: Micro Business Enterprise', '#900085238', 'LAUSD Los Angeles Unified School District', 5),
  ('DBE: Disadvantaged Business Enterprise', '#42281', 'California Department of Transportation', 6),
  ('EDE: Emerging Business Enterprise', '#1787885', 'Department of General Services OSDS', 7),
  ('LBE: Local Business Enterprise', NULL, 'City of Los Angeles', 8),
  ('MBE: Minority Owned Business Enterprise', '#42281', 'California Unified Certification Program (CUCP)', 9),
  ('VSBE: Very Small Business Enterprise', '#1787885', 'DGS OSDS', 10),
  ('DIR: Department of Industrial Relations', '#1000027050', NULL, 11),
  ('EVITP: Electric Vehicle Infrastructure Training Program', '#4046696', NULL, 12)
ON CONFLICT DO NOTHING;
