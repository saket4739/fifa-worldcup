from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import CrowdReportCreate, CrowdReportOut
from app.core.security import require_roles, get_current_user, CurrentUser
from app.db.supabase_client import get_supabase

router = APIRouter(prefix="/crowd", tags=["crowd"])


@router.get("", response_model=list[CrowdReportOut])
def list_crowd_reports(user: CurrentUser = Depends(get_current_user)):
    sb = get_supabase()
    res = (
        sb.table("crowd_reports")
        .select("*")
        .order("created_at", desc=True)
        .limit(50)
        .execute()
    )
    return res.data


@router.post("", response_model=CrowdReportOut, status_code=201)
def create_crowd_report(
    payload: CrowdReportCreate,
    user: CurrentUser = Depends(require_roles("staff", "organizer", "volunteer")),
):
    sb = get_supabase()
    row = {**payload.model_dump(), "reported_by": user.id}
    res = sb.table("crowd_reports").insert(row).execute()
    if not res.data:
        raise HTTPException(500, "Failed to save crowd report")
    # Realtime broadcast happens automatically via Supabase Realtime on the
    # crowd_reports table (enabled in migrations) — the frontend subscribes
    # directly to Supabase, no extra work needed here.
    return res.data[0]
