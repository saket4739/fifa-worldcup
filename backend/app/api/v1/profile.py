from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import (
    ProfileOut,
    ProfileUpdate,
    RoleRequestCreate,
    RoleRequestOut,
    RoleRequestDecision,
)
from app.core.security import get_current_user, require_roles, CurrentUser
from app.core.config import get_settings
from app.db.supabase_client import get_supabase
from app.services.audit import log_action

router = APIRouter(tags=["profile"])

INVITE_CODE_MAP_KEY = {
    "volunteer": "INVITE_CODE_VOLUNTEER",
    "staff": "INVITE_CODE_STAFF",
    "organizer": "INVITE_CODE_ORGANIZER",
}


@router.get("/me", response_model=ProfileOut)
def get_me(user: CurrentUser = Depends(get_current_user)):
    sb = get_supabase()
    res = sb.table("profiles").select("*").eq("id", user.id).limit(1).execute()
    profile = res.data[0] if res.data else {}
    return ProfileOut(
        id=user.id,
        email=user.email,
        full_name=profile.get("full_name"),
        role=user.role,
        favorite_team=profile.get("favorite_team"),
        preferred_language=profile.get("preferred_language", "en"),
    )


@router.patch("/me", response_model=ProfileOut)
def update_me(payload: ProfileUpdate, user: CurrentUser = Depends(get_current_user)):
    sb = get_supabase()
    updates = payload.model_dump(exclude_none=True)
    if updates:
        sb.table("profiles").update(updates).eq("id", user.id).execute()
    return get_me(user)


@router.post("/role-requests", response_model=RoleRequestOut, status_code=201)
def request_role(payload: RoleRequestCreate, user: CurrentUser = Depends(get_current_user)):
    settings = get_settings()
    sb = get_supabase()

    expected_code = getattr(settings, INVITE_CODE_MAP_KEY[payload.requested_role], "")
    instantly_approved = bool(expected_code) and payload.invite_code == expected_code

    row = {
        "user_id": user.id,
        "requested_role": payload.requested_role,
        "status": "approved" if instantly_approved else "pending",
    }
    res = sb.table("role_requests").insert(row).execute()
    if not res.data:
        raise HTTPException(500, "Failed to submit role request")
    created = res.data[0]

    if instantly_approved:
        sb.table("profiles").update({"role": payload.requested_role}).eq("id", user.id).execute()
        log_action(sb, user.id, "role_auto_approved", "role_request", created["id"], row)

    return created


@router.get("/role-requests", response_model=list[RoleRequestOut])
def list_role_requests(
    status: str = "pending",
    user: CurrentUser = Depends(require_roles("organizer")),
):
    sb = get_supabase()
    res = sb.table("role_requests").select("*").eq("status", status).order("created_at", desc=True).execute()
    return res.data


@router.post("/role-requests/{request_id}/decision", response_model=RoleRequestOut)
def decide_role_request(
    request_id: str,
    payload: RoleRequestDecision,
    user: CurrentUser = Depends(require_roles("organizer")),
):
    sb = get_supabase()
    existing = sb.table("role_requests").select("*").eq("id", request_id).limit(1).execute()
    if not existing.data:
        raise HTTPException(404, "Role request not found")
    req = existing.data[0]

    new_status = "approved" if payload.approve else "rejected"
    res = (
        sb.table("role_requests")
        .update({"status": new_status, "reviewed_by": user.id})
        .eq("id", request_id)
        .execute()
    )
    if payload.approve:
        sb.table("profiles").update({"role": req["requested_role"]}).eq("id", req["user_id"]).execute()

    log_action(sb, user.id, f"role_request_{new_status}", "role_request", request_id)
    return res.data[0]
