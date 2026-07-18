import logging
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.db.supabase_client import get_supabase

logger = logging.getLogger(__name__)

bearer_scheme = HTTPBearer(auto_error=False)


class CurrentUser:
    def __init__(self, id: str, email: str, role: str):
        self.id = id
        self.email = email
        self.role = role


def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> CurrentUser:
    """Verifies a Supabase-issued access token.

    Delegates verification to Supabase's Auth server via `auth.get_user()`
    instead of decoding locally against a static HS256 secret. Supabase
    projects now sign tokens with rotating asymmetric JWT Signing Keys
    (ECC P-256), so a static-secret HS256 check rejects valid tokens. This
    approach works regardless of which key/algorithm currently signs
    tokens and keeps working across future key rotations.
    """
    if creds is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Missing authentication token")

    try:
        response = get_supabase().auth.get_user(creds.credentials)
    except Exception as exc:
        logger.error("Supabase auth.get_user() failed: %s", exc)
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, f"Invalid or expired token: {exc}")

    user = getattr(response, "user", None)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")

    user_id = user.id
    email = user.email or ""
    role = (user.user_metadata or {}).get("role", "fan")
    if not user_id:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid token payload")
    return CurrentUser(id=user_id, email=email, role=role)


def require_roles(*allowed_roles: str):
    def checker(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
        if user.role not in allowed_roles:
            raise HTTPException(
                status.HTTP_403_FORBIDDEN,
                f"Role '{user.role}' is not permitted to perform this action",
            )
        return user

    return checker
