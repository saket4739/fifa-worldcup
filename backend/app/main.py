import httpx

# Monkeypatch httpx to disable HTTP/2. This prevents ConnectionTerminated/RemoteProtocolError
# issues on Windows when gotrue/supabase-py attempts to talk to Supabase Auth over HTTP/2.
original_client_init = httpx.Client.__init__
def patched_client_init(self, *args, **kwargs):
    kwargs["http2"] = False
    original_client_init(self, *args, **kwargs)
httpx.Client.__init__ = patched_client_init

original_async_client_init = httpx.AsyncClient.__init__
def patched_async_client_init(self, *args, **kwargs):
    kwargs["http2"] = False
    original_async_client_init(self, *args, **kwargs)
httpx.AsyncClient.__init__ = patched_async_client_init

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api.v1 import chat, crowd, announcements, gates, system

settings = get_settings()

app = FastAPI(
    title="Stadium AI - FIFA World Cup 2026",
    description="GenAI-enabled stadium operations backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(system.router, prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")
app.include_router(crowd.router, prefix="/api/v1")
app.include_router(announcements.router, prefix="/api/v1")
app.include_router(gates.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "Stadium AI backend is running. See /docs for API reference."}
