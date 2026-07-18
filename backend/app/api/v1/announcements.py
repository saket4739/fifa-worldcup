from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import AnnouncementCreate, AnnouncementOut
from app.core.security import require_roles, get_current_user, CurrentUser
from app.db.supabase_client import get_supabase

router = APIRouter(prefix="/announcements", tags=["announcements"])


@router.get("", response_model=list[AnnouncementOut])
def list_announcements(user: CurrentUser = Depends(get_current_user)):
    sb = get_supabase()
    res = (
        sb.table("announcements")
        .select("*")
        .in_("audience", ["all", user.role])
        .order("created_at", desc=True)
        .limit(50)
        .execute()
    )
    return res.data


@router.post("", response_model=AnnouncementOut, status_code=201)
def create_announcement(
    payload: AnnouncementCreate,
    user: CurrentUser = Depends(require_roles("organizer", "staff")),
):
    sb = get_supabase()
    row = {**payload.model_dump(), "created_by": user.id}
    res = sb.table("announcements").insert(row).execute()
    if not res.data:
        raise HTTPException(500, "Failed to create announcement")
    return res.data[0]
