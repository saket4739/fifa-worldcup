# Verification Report

## v2.0.1 fix round (JWT verification)

- ✅ `backend/app/core/security.py`, `config.py`, and `tests/conftest.py`
  compile cleanly (`python -m py_compile`) — no syntax errors.
- ✅ Manually traced every protected route (`chat`, `crowd`, `announcements`,
  `gates`, `ops`, `profile`) — all depend on the single
  `get_current_user`/`require_roles` dependency that was fixed, so this one
  change resolves the "Invalid or expired token" errors shown in all your
  screenshots (chat widget, crowd density report, announcement form).
- ⚠️ **Not verified**: could not `pip install` or run `pytest` in this
  session — this sandbox has no network access. The test fixture changes
  (`_FakeAuth.get_user`) were written to mirror the exact payload shape the
  old `jose.jwt.decode()` call produced, so the existing assertions should
  pass unchanged, but this was not executed.
- **Please run before deploying:**
  ```
  cd backend
  venv\Scripts\activate
  pip install -r requirements.txt
  pytest
  ```
- **Also verify manually**: log in on the frontend, then confirm the chat
  widget, crowd density report, and announcement form no longer show
  "Invalid or expired token".

## Verified in this environment

### Backend (FastAPI)
- ✅ `pip install -r requirements.txt` completes cleanly in a fresh venv (Python 3.12).
- ✅ App imports successfully: `from app.main import app` → 13 routes registered.
- ✅ Full pytest suite: **10/10 tests passed**.
  - Health & config-status endpoints
  - Chat requires authentication (401 without token)
  - Chat returns labeled demo-mode reply when no AI key is set
  - Crowd report creation blocked for `fan` role (403), allowed for `staff`/`volunteer`/`organizer`
  - Crowd report listing
  - Announcement creation blocked for `fan` role (403), allowed for `organizer`
  - Gates listing
  - Supabase calls are mocked in tests (no live Supabase project needed to verify logic)
- ✅ Re-ran full suite (10/10 passed) after removing `MAPBOX_TOKEN`/
  `GOOGLE_MAPS_API_KEY` from `config.py` — no regressions.

### Frontend (Next.js)
- ✅ `npm install` completes cleanly (Node 22, npm 10).
- ✅ `npm run build` completes successfully — TypeScript type-checking passes,
  all 8 routes (`/`, `/login`, `/register`, `/dashboard/{fan,volunteer,organizer,staff}`,
  `/_not-found`) statically generate with no errors.
- ✅ Upgraded `next` from 14.2.5 → 14.2.35 after `npm install` flagged a known
  security vulnerability in 14.2.5; rebuilt and reverified after the bump.
- ✅ **Map provider swapped to Leaflet + OpenStreetMap** (removed `mapbox-gl`
  and `@react-google-maps/api`): re-ran `npm install` and `npm run build`
  clean with the new `leaflet` dependency; `MapView.tsx` compiles and
  type-checks with no map API key present anywhere in the project.

### Project structure
- ✅ All files listed in README's folder structure exist.
- ✅ `.env.example` (backend) and `.env.local.example` (frontend) present with
  no real secrets.
- ✅ ZIP archive builds and extracts correctly.

## Not verified (requires your own accounts/keys — cannot be tested in this sandbox)

- **Live Supabase project**: schema/RLS SQL has been reviewed for correctness
  but not executed against a real Supabase instance. Run the migrations and
  confirm via Supabase Table Editor.
- **Live AI responses**: Groq/OpenAI/Gemini API calls were not exercised with
  a real key (network access to those APIs isn't available here). The demo-mode
  fallback path *was* verified. Test with a real `GROQ_API_KEY` locally.
- **Supabase Realtime end-to-end**: the subscription code is standard
  Supabase JS usage, but live cross-tab broadcast wasn't exercised against a
  real project. Verify by opening two browser tabs after deployment.
- **Vercel / Render deployment**: deployment steps are documented in
  `DEPLOYMENT.md` but the actual deploy wasn't performed (requires your
  accounts). Free-tier behavior (e.g., Render cold starts) is described but
  not measured firsthand.
- **User registration/login flow against real Supabase Auth**: code-reviewed
  against Supabase's documented API; not exercised against a live project.

## Manual verification steps (do these after adding your keys)

1. Run `backend/setup.bat` then `backend/run.bat` → visit
   `http://localhost:8000/docs` → confirm Swagger UI loads and endpoints are listed.
2. Run `frontend/setup.bat` then `frontend/run.bat` → visit
   `http://localhost:3000` → confirm the landing page renders.
3. Register one account per role → confirm each lands on the correct dashboard
   and cannot access other roles' dashboards (should redirect).
4. Ask the chat assistant a question with a real `GROQ_API_KEY` set → confirm
   you get a real (non-"[Demo mode]") reply.
5. As `staff`, submit a crowd report → open a second tab as `fan` → confirm
   the report appears without refreshing (Realtime).
6. As `organizer`, post an announcement → confirm it appears in the
   Announcements list for relevant roles.
7. Confirm the Stadium Map renders OpenStreetMap tiles with gate markers —
   no configuration needed, works immediately after `npm install`.

## Known Limitations

- Crowd density is manually reported (per your selection), not sensor-driven —
  by design for this scope.
- No pre-seeded demo user accounts (Supabase Auth requires real emails).
- Render's free tier cold-starts after inactivity (~30-50s first request).
- Single demo venue (MetLife Stadium) with fictional gate/crowd data.
