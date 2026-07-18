# Deployment Guide — Vercel (Frontend) + Render (Backend) + Supabase

Everything below uses free tiers.

## 0. Prerequisites
- GitHub account (Vercel and Render both deploy from a Git repo)
- Push this project to a new GitHub repository first:
  ```bash
  cd worldcup-stadium-ai
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/worldcup-stadium-ai.git
  git push -u origin main
  ```

## 1. Supabase (do this first — both frontend and backend need it)
1. supabase.com → New project → note the region closest to your users.
2. **SQL Editor** → run `backend/supabase/migrations/001_schema.sql`, then
   `002_seed_demo_data.sql`.
3. **Settings → API** → copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (keep secret — backend only)
4. **Settings → API → JWT Settings** → copy the `JWT Secret`.

## 2. Backend on Render
1. render.com → New → **Web Service** → connect your GitHub repo.
2. Root directory: `backend`
3. Runtime: **Python 3**
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (Render dashboard → Environment):
   ```
   SUPABASE_URL=...
   SUPABASE_SERVICE_KEY=...
   SUPABASE_JWT_SECRET=...
   AI_PROVIDER=groq
   GROQ_API_KEY=...
   CORS_ORIGINS=https://YOUR-APP.vercel.app
   ENVIRONMENT=production
   ```
7. Deploy. Note your backend URL, e.g. `https://stadium-ai-backend.onrender.com`.
8. Confirm it's live: visit `https://YOUR-BACKEND.onrender.com/api/v1/health`
   → should return `{"status":"ok"}`.

> Free Render web services sleep after inactivity; the first request after
> idling takes ~30-50s to wake up. Fine for a demo/hackathon; for production
> use a paid instance type.

## 3. Frontend on Vercel
1. vercel.com → Add New → Project → import your GitHub repo.
2. Root directory: `frontend`
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables (Vercel dashboard → Settings → Environment Variables):
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXT_PUBLIC_API_URL=https://YOUR-BACKEND.onrender.com/api/v1
   ```
   (No map keys needed — the map uses free OpenStreetMap tiles.)
5. Deploy. Vercel gives you a URL like `https://stadium-ai.vercel.app`.

## 4. Close the loop
Go back to Render → update `CORS_ORIGINS` to your real Vercel URL (not a
placeholder) → redeploy the backend so CORS allows requests from your live
frontend.

## 5. Verify the live deployment
1. Visit your Vercel URL.
2. Register a test account for each role you want to demo.
3. Open the chat widget, ask a question — confirm you get a real AI reply
   (not "[Demo mode]"), which confirms `GROQ_API_KEY` is working on Render.
4. Log in as `staff` or `organizer`, submit a crowd report, confirm it appears
   instantly (Supabase Realtime works cross-origin automatically — no extra
   config needed).
5. Check the map renders (OpenStreetMap tiles — no configuration needed).

## Getting free API keys

| Service | Where | Free tier notes |
|---|---|---|
| Supabase | supabase.com | Free project: 500MB DB, 50k monthly active users |
| Groq | console.groq.com | Free tier with generous rate limits, Llama models |
| Render | render.com | Free web service tier (sleeps when idle) |
| Vercel | vercel.com | Free Hobby tier, generous for demos |

## Map tiles in production
The map uses `tile.openstreetmap.org` directly, which is fine for demos and
low traffic but subject to OSM's fair-use tile policy. For a production
deployment with real traffic, consider a free-tier hosted tile provider (e.g.
MapTiler's free plan) or self-hosting tiles — no code changes needed beyond
the tile URL in `frontend/components/MapView.tsx`.

## Redeploying after code changes
- **Frontend**: `git push` to `main` → Vercel auto-deploys.
- **Backend**: `git push` to `main` → Render auto-deploys (if auto-deploy is
  enabled on the service, which it is by default).

## Rolling back
- Vercel: Deployments tab → pick a previous deployment → "Promote to Production".
- Render: Events/Deploys tab → pick a previous successful deploy → "Redeploy".
