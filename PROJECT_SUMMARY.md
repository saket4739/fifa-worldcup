# Project Summary — Stadium AI

## Overview
GenAI-enabled platform for FIFA World Cup 2026 stadium operations: multilingual
AI assistant, interactive dual-provider map, live crowd density dashboard,
role-based portals, and announcements — addressing navigation, crowd
management, accessibility, and multilingual assistance from the problem
statement.

## Technology Stack
- **Frontend**: Next.js 14 (TypeScript, App Router), Tailwind CSS
- **Backend**: FastAPI (Python 3.11+)
- **AI**: Groq (Llama 3.3) — swappable to OpenAI or Gemini via `AI_PROVIDER` env var
- **Database/Auth/Realtime**: Supabase (PostgreSQL + Auth + Realtime)
- **Maps**: Leaflet + OpenStreetMap (free, no API key required)
- **Deployment**: Vercel (frontend) + Render (backend)

## User Roles
- **Fan** — map, chat assistant, view announcements
- **Volunteer** — above + submit crowd density reports
- **Organizer/Admin** — above + post announcements + stats overview
- **Staff** — above + congestion alerts banner

## Key Features
1. Multilingual floating AI chat assistant (role- and gate-aware context)
2. Interactive stadium map with gate status, accessibility markers
3. Live crowd density dashboard (manual input, Supabase Realtime broadcast)
4. Role-scoped announcements with severity levels
5. Accessible, responsive UI with dark mode

## Important Notes
- No demo accounts are pre-seeded (Supabase Auth needs real emails) —
  register test accounts locally per role in under a minute each.
- AI chat runs in a clearly-labeled "demo mode" fallback if no API key is
  configured, so the app is testable before you add keys.
- Demo venue: MetLife Stadium (East Rutherford, NJ), a real 2026 host venue —
  gate coordinates and crowd/announcement data are fictional.

## Quick Start
```cmd
cd backend  && setup.bat   REM then edit .env
cd frontend && setup.bat   REM then edit .env.local
REM run backend\run.bat and frontend\run.bat in two terminals
```
Full instructions: `README.md`. Deployment: `DEPLOYMENT.md`.
