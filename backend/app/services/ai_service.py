from app.core.config import get_settings

SYSTEM_PROMPT = (
    "You are StadiumAI, a multilingual assistant for FIFA World Cup 2026 stadium "
    "operations. Help fans, volunteers, organizers, and venue staff with navigation, "
    "accessibility, transportation, sustainability, crowd safety, and general event "
    "queries. Reply in the same language the user writes in. Be concise, friendly, "
    "and practical. If asked about live crowd levels, gates, or announcements, use "
    "the CONTEXT block provided, and say clearly if information is unavailable."
)


class AIServiceError(Exception):
    pass


def _build_messages(user_message: str, context: str | None, history: list[dict] | None):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if context:
        messages.append({"role": "system", "content": f"CONTEXT:\n{context}"})
    if history:
        messages.extend(history[-6:])  # keep last 6 turns
    messages.append({"role": "user", "content": user_message})
    return messages


def _groq_chat(messages: list[dict]) -> str:
    from groq import Groq

    settings = get_settings()
    client = Groq(api_key=settings.GROQ_API_KEY)
    resp = client.chat.completions.create(
        model=settings.GROQ_MODEL, messages=messages, temperature=0.4, max_tokens=600
    )
    return resp.choices[0].message.content


def _openai_chat(messages: list[dict]) -> str:
    from openai import OpenAI

    settings = get_settings()
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    resp = client.chat.completions.create(
        model=settings.OPENAI_MODEL, messages=messages, temperature=0.4, max_tokens=600
    )
    return resp.choices[0].message.content


def _gemini_chat(messages: list[dict]) -> str:
    import google.generativeai as genai

    settings = get_settings()
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel(
        settings.GEMINI_MODEL,
        system_instruction=messages[0]["content"],
    )
    convo = model.start_chat(history=[])
    prompt = "\n".join(m["content"] for m in messages[1:])
    resp = convo.send_message(prompt)
    return resp.text


def generate_reply(
    user_message: str, context: str | None = None, history: list[dict] | None = None
) -> str:
    settings = get_settings()
    messages = _build_messages(user_message, context, history)
    provider = settings.AI_PROVIDER.lower()

    try:
        if provider == "groq" and settings.GROQ_API_KEY:
            return _groq_chat(messages)
        if provider == "openai" and settings.OPENAI_API_KEY:
            return _openai_chat(messages)
        if provider == "gemini" and settings.GEMINI_API_KEY:
            return _gemini_chat(messages)
    except Exception as exc:  # noqa: BLE001
        raise AIServiceError(str(exc)) from exc

    # No API key configured — demo fallback so the app is still testable.
    return (
        "[Demo mode — no AI API key configured] I'd normally answer using "
        f"{provider.title()}. Example: for '{user_message[:60]}', I'd give "
        "directions, accessibility info, or transport tips based on live stadium "
        "data. Add an API key in backend/.env to enable real responses."
    )
