from fastapi import APIRouter, Depends
from app.models.schemas import OpsSummaryResponse
from app.core.security import require_roles, CurrentUser
from app.core.config import get_settings
from app.db.supabase_client import get_supabase
from app.services import ai_service

router = APIRouter(prefix="/ops", tags=["operational-intelligence"])


@router.get("/summary", response_model=OpsSummaryResponse)
def ops_summary(user: CurrentUser = Depends(require_roles("organizer", "staff"))):
    sb = get_supabase()
    gates = sb.table("gates").select("name,zone_id,status,accessible").execute().data
    crowd = (
        sb.table("crowd_reports")
        .select("zone_id,density_level,note,created_at")
        .order("created_at", desc=True)
        .limit(10)
        .execute()
        .data
    )
    announcements = (
        sb.table("announcements")
        .select("title,severity,audience,created_at")
        .order("created_at", desc=True)
        .limit(5)
        .execute()
        .data
    )

    context_lines = ["GATES:"]
    for g in gates:
        context_lines.append(f"- {g['name']} ({g['zone_id']}): status={g['status']}, accessible={g['accessible']}")
    context_lines.append("RECENT CROWD REPORTS:")
    for c in crowd:
        context_lines.append(f"- {c['zone_id']}: {c['density_level']} ({c.get('note') or 'no note'})")
    context_lines.append("RECENT ANNOUNCEMENTS:")
    for a in announcements:
        context_lines.append(f"- [{a['severity']}] {a['title']} (audience={a['audience']})")

    result = ai_service.generate_ops_summary("\n".join(context_lines))
    settings = get_settings()
    return OpsSummaryResponse(
        summary=result["summary"],
        suggested_actions=result["suggested_actions"],
        provider=settings.AI_PROVIDER,
    )
