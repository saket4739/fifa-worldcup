from fastapi import APIRouter, Depends
from app.models.schemas import GateOut
from app.core.security import get_current_user, CurrentUser
from app.db.supabase_client import get_supabase

router = APIRouter(prefix="/gates", tags=["gates"])


@router.get("", response_model=list[GateOut])
def list_gates(user: CurrentUser = Depends(get_current_user)):
    sb = get_supabase()
    res = sb.table("gates").select("*").execute()
    return res.data
