# Changelog

## v2.0.1

### Fixed
- **"Invalid or expired token" on every authenticated request** (chat,
  crowd reports, announcements, gates, profile, ops summary): the backend
  verified access tokens locally against a static `SUPABASE_JWT_SECRET`
  using HS256 (`backend/app/core/security.py`). Supabase projects now sign
  tokens with rotating asymmetric JWT Signing Keys (ECC P-256), so that
  local check rejected valid tokens. `get_current_user` now verifies tokens
  via Supabase's Auth server (`auth.get_user()`), which works regardless of
  the signing key/algorithm in use and survives future key rotations.
  `SUPABASE_JWT_SECRET` is no longer required (kept as an optional/legacy
  env var so existing `.env` files still load).
  - Updated `backend/tests/conftest.py`'s fake Supabase client with a fake
    `auth.get_user()` so tests keep working offline without a real
    Supabase Auth server call.

## v2.0.0

### Security fixes
- **Fixed role self-elevation vulnerability**: registration no longer lets
  users pick their own role. Every account starts as `fan`. The backend now
  looks up role from the `profiles` table on every request instead of
  trusting the Supabase JWT's `user_metadata` (which the client controls).
  Elevated roles are granted via a new invite-code / organizer-approval
  workflow (`role_requests` table, `/api/v1/role-requests` endpoints).
- **Fixed a schema/seed-data mismatch** that caused `GET /crowd` and
  `GET /announcements` to 500 on the demo-seeded rows: `reported_by` and
  `created_by` are now `Optional[str]` to match the nullable DB columns.
- **Added rate limiting** (`slowapi`) to `/chat` to prevent abuse of paid AI
  provider calls.
- **Fixed RLS policies** for `gates` and `announcements` to allow updates,
  not just insert/select (previously there was no way to actually change a
  gate's status or edit an announcement even though the UI implied it was
  possible).

### New GenAI features (problem-statement coverage)
- **Operational Intelligence** (`GET /api/v1/ops/summary`): AI-generated
  situation summary + prioritized suggested actions from live gate status,
  recent crowd reports, and recent announcements. Organizer/staff only.
  Suggested actions can be one-click drafted into an announcement, which
  still requires human review before posting.
- **Multilingual announcement translation**: organizers can auto-translate
  a new announcement into every language in `SUPPORTED_LANGUAGES`; fans see
  announcements in their preferred language automatically, with a toggle to
  view the original.
- **Transportation Assistant**: dedicated AI chat panel (transit, parking,
  rideshare guidance) on the fan dashboard.
- **Sustainability Assistant**: dedicated AI chat panel (recycling, refill
  stations, low-carbon travel tips) on the fan dashboard.

### Other new features
- Gate status management UI (staff/organizer can set open/congested/closed).
- CSV export for crowd reports and announcements (staff/organizer).
- Pagination on crowd report and announcement list endpoints; zone filter on
  crowd reports.
- Audit log (`audit_logs` table) for role changes, announcement
  create/update/delete, crowd report creation, and gate status changes.
- Chat conversations are now logged to `chat_logs` (previously an unused
  table).
- Announcement update/delete endpoints (previously create+read only).
- User profile page: set favorite team (flag/colors only — see README
  "Design decisions") and preferred language.
- Forgot-password / reset-password pages.
- Password confirmation + minimum strength check (8+ chars, 1 number) on
  registration and reset.
- Persisted dark mode (was lost on page reload before).
- Subtle UI motion (Framer Motion) on key panels for a smoother feel.

### Testing
- Test suite grew from 10 to 21 tests, including a dedicated security
  regression test for the role-escalation fix and coverage for every new
  endpoint.
- Rebuilt the in-memory fake Supabase test client to support
  `update`/`delete`/`eq`/`range`, needed for the new CRUD endpoints.

### Migration notes
- New migration file: `backend/supabase/migrations/003_role_workflow_and_features.sql`.
  Run it **after** `001` and `002` on both new and existing Supabase
  projects. It's additive (new tables/columns, updated policies) and safe
  to run on a project that already has `001`/`002` applied.
- Existing users created under v1 will have whatever role they self-selected
  at the time — if you're upgrading a real deployment, audit `profiles.role`
  for any accounts that shouldn't have elevated access.
