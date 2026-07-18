"""
Creates demo login accounts for each role using the Supabase Admin API.

DEVELOPMENT ONLY — do not run against a production project. Change or
remove these accounts before going live.

Usage (from backend/ folder, with venv active and .env filled in):
    python scripts\\seed_users.py

Requires SUPABASE_URL and SUPABASE_SERVICE_KEY in backend/.env
(service role key — never used in the frontend).
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.config import get_settings
from supabase import create_client

DEMO_PASSWORD = "Demo@1234"

DEMO_USERS = [
    {"email": "admin@stadiumai.demo", "full_name": "Demo Admin", "role": "organizer"},
    {"email": "staff@stadiumai.demo", "full_name": "Demo Staff", "role": "staff"},
    {"email": "volunteer@stadiumai.demo", "full_name": "Demo Volunteer", "role": "volunteer"},
    {"email": "fan@stadiumai.demo", "full_name": "Demo Fan", "role": "fan"},
]


def main():
    settings = get_settings()
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_KEY:
        print("ERROR: SUPABASE_URL / SUPABASE_SERVICE_KEY missing in backend/.env")
        sys.exit(1)

    sb = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)

    for u in DEMO_USERS:
        try:
            res = sb.auth.admin.create_user(
                {
                    "email": u["email"],
                    "password": DEMO_PASSWORD,
                    "email_confirm": True,  # skip email verification
                    "user_metadata": {"full_name": u["full_name"], "role": u["role"]},
                }
            )
            print(f"Created: {u['email']}  (role={u['role']})  id={res.user.id}")
        except Exception as exc:  # noqa: BLE001
            msg = str(exc)
            if "already been registered" in msg or "already exists" in msg:
                print(f"Skipped (already exists): {u['email']}")
            else:
                print(f"FAILED: {u['email']} — {msg}")

    print("\nDemo accounts ready. Password for all:", DEMO_PASSWORD)
    print("Change or delete these before production use.")


if __name__ == "__main__":
    main()
