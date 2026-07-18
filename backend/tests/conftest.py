import os
import sys
import pytest
from jose import jwt

os.environ.setdefault("SUPABASE_URL", "https://test.supabase.co")
os.environ.setdefault("SUPABASE_SERVICE_KEY", "test-service-key")
os.environ.setdefault("SUPABASE_JWT_SECRET", "test-jwt-secret")
os.environ.setdefault("AI_PROVIDER", "groq")
os.environ.setdefault("GROQ_API_KEY", "")  # empty -> demo fallback path in tests

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from fastapi.testclient import TestClient  # noqa: E402
from app.main import app  # noqa: E402
from app.db import supabase_client  # noqa: E402


def make_token(user_id: str = "user-123", email: str = "test@example.com", role: str = "fan"):
    payload = {"sub": user_id, "email": email, "aud": "authenticated", "user_metadata": {"role": role}}
    return jwt.encode(payload, os.environ["SUPABASE_JWT_SECRET"], algorithm="HS256")


def auth_header(role: str = "fan", user_id: str = "user-123"):
    return {"Authorization": f"Bearer {make_token(user_id=user_id, role=role)}"}


class _FakeQuery:
    def __init__(self, table_store, table_name):
        self._store = table_store
        self._table = table_name
        self._insert_row = None

    def select(self, *_args, **_kw):
        return self

    def order(self, *_args, **_kw):
        return self

    def limit(self, *_args, **_kw):
        return self

    def in_(self, *_args, **_kw):
        return self

    def insert(self, row):
        self._insert_row = row
        return self

    def execute(self):
        if self._insert_row is not None:
            row = {**self._insert_row, "id": "generated-id", "created_at": "2026-01-01T00:00:00Z"}
            self._store[self._table].append(row)
            return type("R", (), {"data": [row]})
        return type("R", (), {"data": self._store[self._table]})


class _FakeAuthUser:
    def __init__(self, id, email, user_metadata):
        self.id = id
        self.email = email
        self.user_metadata = user_metadata


class _FakeAuthResponse:
    def __init__(self, user):
        self.user = user


class _FakeAuth:
    """Stands in for Supabase's Auth server during tests: decodes the same
    HS256 test token that `make_token()` mints, instead of making a real
    network call to `auth.get_user()`."""

    def get_user(self, token):
        payload = jwt.decode(
            token,
            os.environ["SUPABASE_JWT_SECRET"],
            algorithms=["HS256"],
            audience="authenticated",
        )
        user = _FakeAuthUser(
            id=payload.get("sub"),
            email=payload.get("email", ""),
            user_metadata=payload.get("user_metadata") or {},
        )
        return _FakeAuthResponse(user)


class FakeSupabase:
    def __init__(self):
        self._store = {"crowd_reports": [], "announcements": [], "gates": []}
        self.auth = _FakeAuth()

    def table(self, name):
        return _FakeQuery(self._store, name)


@pytest.fixture(autouse=True)
def fake_supabase(monkeypatch):
    fake = FakeSupabase()
    monkeypatch.setattr(supabase_client, "get_supabase", lambda: fake)
    from app.api.v1 import crowd, announcements, gates
    from app.core import security

    monkeypatch.setattr(crowd, "get_supabase", lambda: fake)
    monkeypatch.setattr(announcements, "get_supabase", lambda: fake)
    monkeypatch.setattr(gates, "get_supabase", lambda: fake)
    monkeypatch.setattr(security, "get_supabase", lambda: fake)
    return fake


@pytest.fixture
def client():
    return TestClient(app)
