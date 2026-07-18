import os
from pydantic_settings import BaseSettings
from functools import lru_cache

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ENV_PATH = os.path.join(BASE_DIR, ".env")


class Settings(BaseSettings):
    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_KEY: str = ""
    # No longer used for token verification (see app/core/security.py), kept
    # optional so existing .env files with this var still load fine.
    SUPABASE_JWT_SECRET: str = ""

    # AI Providers (only the one you set is used; AI_PROVIDER selects it)
    AI_PROVIDER: str = "groq"  # groq | openai | gemini
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    # App
    ENVIRONMENT: str = "development"
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"

    class Config:
        env_file = ENV_PATH
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()

