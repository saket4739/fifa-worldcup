import { supabase } from "./supabaseClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001/api/v1";

async function authHeaders(): Promise<HeadersInit> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeaders()),
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: string;
  favorite_team?: string;
  preferred_language?: string;
}

export const api = {
  chat: (message: string, history: ChatMessage[], gate_id?: string, mode?: string) =>
    request<{ reply: string; provider: string }>("/chat", {
      method: "POST",
      body: JSON.stringify({ message, history, gate_id, mode }),
    }),
  listGates: () => request<any[]>("/gates"),
  listCrowdReports: () => request<any[]>("/crowd"),
  createCrowdReport: (zone_id: string, density_level: string, note?: string) =>
    request<any>("/crowd", { method: "POST", body: JSON.stringify({ zone_id, density_level, note }) }),
  listAnnouncements: () => request<any[]>("/announcements"),
  createAnnouncement: (title: string, message: string, severity: string, audience: string) =>
    request<any>("/announcements", {
      method: "POST",
      body: JSON.stringify({ title, message, severity, audience }),
    }),
  configStatus: () => request<any>("/config-status"),
  getMe: () => request<UserProfile>("/profile/me"),
  updateMe: (data: { favorite_team?: string; preferred_language?: string }) =>
    request<UserProfile>("/profile/me", { method: "PATCH", body: JSON.stringify(data) }),
  requestRole: (role: string, code?: string) =>
    request<{ status: string; message?: string }>("/profile/request-role", {
      method: "POST",
      body: JSON.stringify({ role, code }),
    }),
  listRoleRequests: (status?: string) =>
    request<any[]>(`/profile/role-requests${status ? `?status=${status}` : ""}`),
  decideRoleRequest: (id: string, approve: boolean) =>
    request<any>(`/profile/role-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ approve }),
    }),
  opsSummary: () => request<any>("/ops/summary"),
  updateGateStatus: (id: string, status: string) =>
    request<any>(`/gates/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
};
