# Kewo Engineering — Next.js Website

Mirror of [kewocorp.com](https://kewocorp.com), built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

---

## 🚀 Quick Start (Local)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

> Get these from: **Supabase Dashboard → Project Settings → API**

### 3. Set up the database

1. Go to **Supabase Dashboard → SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run — this creates tables, indexes, RLS policies, and seeds all data

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```
kewo-engineering/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Home page
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Global styles + Tailwind
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── services/
│   │   └── page.tsx            # Services + Projects grid
│   └── api/
│       ├── projects/route.ts   # GET /api/projects
│       └── contact/route.ts    # POST /api/contact
├── components/
│   ├── Navbar.tsx              # Sticky responsive navbar
│   ├── Footer.tsx              # Footer with links + contact
│   ├── HeroSection.tsx         # Auto-rotating hero slider
│   ├── ProjectCard.tsx         # Portfolio card (image/video)
│   ├── ServiceCard.tsx         # Service offering card
│   └── SectionHeader.tsx       # Reusable eyebrow + title
├── lib/
│   ├── supabase.ts             # Supabase client (browser + server)
│   ├── types.ts                # TypeScript types + DB schema
│   └── data.ts                 # Static seed data (fallback)
├── supabase/
│   └── schema.sql              # Full DB schema + seed data
└── .env.local.example
```

---

## 🗄️ Database Schema

| Table            | Purpose                          |
|------------------|----------------------------------|
| `projects`       | Portfolio / recent projects      |
| `services`       | Service offerings                |
| `certifications` | Business certifications          |
| `contacts`       | Contact form submissions         |

All tables have Row Level Security (RLS) enabled:
- Public can **read** projects, services, certifications
- Public can **insert** contacts (form submissions)
- Only service role can **read** contacts

---

## 🧰 Tech Stack

| Layer      | Technology                            |
|------------|---------------------------------------|
| Framework  | Next.js 14 (App Router, RSC)          |
| Language   | TypeScript                            |
| Styling    | Tailwind CSS                          |
| Database   | Supabase (PostgreSQL)                 |
| Icons      | Lucide React                          |
| Images     | next/image (with remote pattern config) |

---

## 📄 Pages

| Route       | Page                            |
|-------------|----------------------------------|
| `/`         | Home (Hero, About, Services, Projects, Clients) |
| `/about`    | About (Company, Values, Founder Bio, Certifications) |
| `/services` | Services list + full project grid |

---

## 🔌 API Endpoints

### `GET /api/projects`
Returns projects from Supabase (fallback to static data).

Query params:
- `?category=Design+%26+Engineering` — filter by category
- `?featured=true` — featured only
- `?limit=12` — pagination limit

### `POST /api/contact`
Saves contact form submission to Supabase `contacts` table.

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555 000 0000",
  "message": "Hello, I'd like to discuss a project."
}
```

---

## 🏗️ Production Build

```bash
npm run build
npm run start
```

---

## 🚢 Deployment (when ready)

### Vercel (recommended)
```bash
npx vercel --prod
```
Add environment variables in the Vercel dashboard.

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## ✏️ Customization

- **Colors**: Edit `tailwind.config.ts` → `kewo.navy` / `kewo.gold`
- **Hero slides**: Edit `components/HeroSection.tsx` → `SLIDES` array
- **Clients list**: Edit `lib/data.ts` → `CLIENTS` array
- **Add projects**: Insert rows in Supabase `projects` table (or via Supabase dashboard)
- **Content**: All content is driven from Supabase — edit via SQL or build an admin panel

---

## 📝 Notes

- The app uses **ISR (Incremental Static Regeneration)** with `revalidate = 3600` — pages rebuild from Supabase data every hour automatically.
- If Supabase is unavailable, all pages **fall back to static data** from `lib/data.ts` so the site never goes blank.
- Contact form submissions are stored in Supabase with `status = 'new'` — you can read them in the Supabase dashboard.
