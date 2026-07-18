from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import ChatRequest, ChatResponse
from app.services import ai_service
from app.core.config import get_settings
from app.core.security import get_current_user, CurrentUser

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(payload: ChatRequest, user: CurrentUser = Depends(get_current_user)):
    settings = get_settings()
    history = [{"role": m.role, "content": m.content} for m in payload.history]
    context = f"Requesting user role: {user.role}."
    if payload.gate_id:
        context += f" User is near gate: {payload.gate_id}."
    try:
        reply = ai_service.generate_reply(payload.message, context=context, history=history)
    except ai_service.AIServiceError as exc:
        raise HTTPException(502, f"AI provider error: {exc}")
    return ChatResponse(reply=reply, provider=settings.AI_PROVIDER)
