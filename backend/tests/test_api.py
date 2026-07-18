from tests.conftest import auth_header


def test_health(client):
    resp = client.get("/api/v1/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_config_status(client):
    resp = client.get("/api/v1/config-status")
    assert resp.status_code == 200
    body = resp.json()
    assert "ai_provider" in body
    assert "ai_key_configured" in body


def test_chat_requires_auth(client):
    resp = client.post("/api/v1/chat", json={"message": "Where is Gate B?"})
    assert resp.status_code == 401


def test_chat_demo_fallback_without_api_key(client):
    resp = client.post(
        "/api/v1/chat",
        json={"message": "Where is Gate B?"},
        headers=auth_header(role="fan"),
    )
    assert resp.status_code == 200
    body = resp.json()
    assert "Demo mode" in body["reply"]
    assert body["provider"] == "groq"


def test_crowd_report_requires_staff_role(client):
    resp = client.post(
        "/api/v1/crowd",
        json={"zone_id": "north-stand", "density_level": "high"},
        headers=auth_header(role="fan"),
    )
    assert resp.status_code == 403


def test_crowd_report_created_by_staff(client):
    resp = client.post(
        "/api/v1/crowd",
        json={"zone_id": "north-stand", "density_level": "high", "note": "Gate congestion"},
        headers=auth_header(role="staff"),
    )
    assert resp.status_code == 201
    body = resp.json()
    assert body["zone_id"] == "north-stand"
    assert body["reported_by"] == "user-123"


def test_list_crowd_reports(client):
    client.post(
        "/api/v1/crowd",
        json={"zone_id": "south-stand", "density_level": "moderate"},
        headers=auth_header(role="volunteer"),
    )
    resp = client.get("/api/v1/crowd", headers=auth_header(role="fan"))
    assert resp.status_code == 200
    assert len(resp.json()) >= 1


def test_announcement_requires_organizer_or_staff(client):
    resp = client.post(
        "/api/v1/announcements",
        json={"title": "Delay", "message": "Kickoff delayed 15 min"},
        headers=auth_header(role="fan"),
    )
    assert resp.status_code == 403


def test_announcement_created_by_organizer(client):
    resp = client.post(
        "/api/v1/announcements",
        json={"title": "Delay", "message": "Kickoff delayed 15 min", "severity": "warning"},
        headers=auth_header(role="organizer"),
    )
    assert resp.status_code == 201
    assert resp.json()["title"] == "Delay"


def test_gates_list(client):
    resp = client.get("/api/v1/gates", headers=auth_header(role="fan"))
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)
