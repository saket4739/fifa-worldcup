from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

Role = Literal["fan", "volunteer", "organizer", "staff"]


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: list[ChatMessage] = []
    gate_id: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    provider: str


class CrowdReportCreate(BaseModel):
    zone_id: str
    density_level: Literal["low", "moderate", "high", "critical"]
    note: Optional[str] = Field(None, max_length=300)


class CrowdReportOut(BaseModel):
    id: str
    zone_id: str
    density_level: str
    note: Optional[str]
    reported_by: str
    created_at: datetime


class AnnouncementCreate(BaseModel):
    title: str = Field(..., max_length=150)
    message: str = Field(..., max_length=1000)
    severity: Literal["info", "warning", "critical"] = "info"
    audience: Literal["all", "fan", "volunteer", "organizer", "staff"] = "all"


class AnnouncementOut(BaseModel):
    id: str
    title: str
    message: str
    severity: str
    audience: str
    created_by: str
    created_at: datetime


class GateOut(BaseModel):
    id: str
    name: str
    zone_id: str
    latitude: float
    longitude: float
    accessible: bool
    status: str
