from slowapi import Limiter
from slowapi.util import get_remote_address


def _key_func(request):
    # Rate-limit per authenticated user when possible, falling back to IP.
    auth = request.headers.get("authorization", "")
    if auth.startswith("Bearer "):
        return auth[len("Bearer "):][:64]
    return get_remote_address(request)


limiter = Limiter(key_func=_key_func)
