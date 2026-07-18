from fastapi import APIRouter
from app.core.config import get_settings

router = APIRouter(tags=["system"])


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/config-status")
def config_status():
    """Non-sensitive flags so the frontend can show setup warnings in demo mode."""
    s = get_settings()
    return {
        "ai_provider": s.AI_PROVIDER,
        "ai_key_configured": bool(
            {"groq": s.GROQ_API_KEY, "openai": s.OPENAI_API_KEY, "gemini": s.GEMINI_API_KEY}.get(
                s.AI_PROVIDER, ""
            )
        ),
        "supabase_configured": bool(s.SUPABASE_URL and s.SUPABASE_SERVICE_KEY),
    }
