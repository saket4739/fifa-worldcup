def log_action(sb, actor_id: str, action: str, entity_type: str, entity_id: str | None = None, details: dict | None = None):
    """Best-effort audit log write. Never raises — a logging failure must not
    block the underlying operation the user requested."""
    try:
        sb.table("audit_logs").insert(
            {
                "actor_id": actor_id,
                "action": action,
                "entity_type": entity_type,
                "entity_id": entity_id,
                "details": details or {},
            }
        ).execute()
    except Exception:
        pass
