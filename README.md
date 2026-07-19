# RIA — Chief Rhythm Companion

> **Build for calm, not productivity.**

RIA는 Todo App이 아니다. 사용자의 하루, 일주일, 한 달, 그리고 삶 전체의 **리듬**을 함께 만들어가는 Chief Rhythm Companion이다.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, TailwindCSS
- **Backend:** Supabase (Auth + Postgres)
- **State:** Zustand
- **Deploy:** Vercel

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Git](https://git-scm.com/)
- [Supabase](https://supabase.com/) account

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/migrations/001_initial_schema.sql`
3. Copy `.env.local.example` to `.env.local` and fill in your keys:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components
├── lib/              # Supabase clients, utilities
├── stores/           # Zustand state
└── types/            # TypeScript types
supabase/
└── migrations/       # Database schema
```

## Development Roadmap

- [x] **Phase 1** — Project Setup, Supabase, Auth, Database
- [ ] **Phase 2** — Home UI, Top3, North Star, Task CRUD
- [ ] **Phase 3** — Projects, Inbox, Notes, Discovery
- [ ] **Phase 4** — Evening Review, Animations, Deploy

## Design Language

- Warm White `#faf8f5`
- Soft Black `#2c2c2c`
- Gold Accent `#c9a962`

---

**STAR AI Team** — Changwoo & Ara
