const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000/api/v1";

const TOKEN_KEY = "aseer_admin_token";

export type SubmissionStatus = "NEW" | "IN_REVIEW" | "CONTACTED" | "RESOLVED" | "ARCHIVED";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "SUBSIDIARY_ADMIN";
}

export interface CareerRecord {
  id: string;
  areaOfInterest: string;
  fullName: string;
  email: string;
  phone: string;
  city: string | null;
  resumeUrl: string;
  portfolioUrl: string | null;
  coverNote: string | null;
  status: SubmissionStatus;
  adminNotes: string | null;
  createdAt: string;
}

export interface PitchRecord {
  id: string;
  sector: string;
  stage: string;
  founderName: string;
  email: string;
  phone: string;
  city: string | null;
  ventureTitle: string;
  executiveSummary: string;
  proposalUrl: string | null;
  status: SubmissionStatus;
  adminNotes: string | null;
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  type: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  details: Record<string, unknown> | null;
  status: SubmissionStatus;
  adminNotes: string | null;
  createdAt: string;
}

export interface ServiceRecord {
  id: string;
  subsidiaryId: string;
  slug: string;
  title: string;
  category: string;
  summary: string | null;
  details: {
    duration?: string;
    region?: string;
    highlights?: string[];
    [key: string]: unknown;
  } | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OverviewResponse {
  counts: {
    careersTotal: number;
    careersNew: number;
    pitchesTotal: number;
    pitchesNew: number;
    inquiriesTotal: number;
    inquiriesNew: number;
    pendingTotal: number;
  };
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  const json = (await res.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
    token?: string;
    user?: AdminUser;
    data?: T;
  } | null;

  if (!res.ok || !json?.ok) {
    throw new Error(json?.error ?? "Request failed");
  }

  return json as T;
}

export async function loginAdmin(email: string, password: string) {
  const res = await apiFetch<{ ok: true; token: string; user: AdminUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setStoredToken(res.token);
  return res.user;
}

export async function fetchMe() {
  const res = await apiFetch<{ ok: true; user: AdminUser }>("/auth/me");
  return res.user;
}

export async function fetchOverview(subsidiary = "parent") {
  const res = await apiFetch<{ ok: true; data: OverviewResponse }>(
    `/admin/overview?subsidiary=${encodeURIComponent(subsidiary)}`,
  );
  return res.data;
}

export async function fetchCareers(params: {
  subsidiary?: string;
  status?: string;
  search?: string;
}) {
  const qs = new URLSearchParams();
  if (params.subsidiary) qs.set("subsidiary", params.subsidiary);
  if (params.status && params.status !== "ALL") qs.set("status", params.status);
  if (params.search?.trim()) qs.set("search", params.search.trim());
  const res = await apiFetch<{ ok: true; data: CareerRecord[] }>(`/admin/careers?${qs.toString()}`);
  return res.data;
}

export async function fetchPitches(params: {
  subsidiary?: string;
  status?: string;
  search?: string;
}) {
  const qs = new URLSearchParams();
  if (params.subsidiary) qs.set("subsidiary", params.subsidiary);
  if (params.status && params.status !== "ALL") qs.set("status", params.status);
  if (params.search?.trim()) qs.set("search", params.search.trim());
  const res = await apiFetch<{ ok: true; data: PitchRecord[] }>(`/admin/pitches?${qs.toString()}`);
  return res.data;
}

export async function fetchInquiries(params: {
  subsidiary?: string;
  status?: string;
  search?: string;
}) {
  const qs = new URLSearchParams();
  if (params.subsidiary) qs.set("subsidiary", params.subsidiary);
  if (params.status && params.status !== "ALL") qs.set("status", params.status);
  if (params.search?.trim()) qs.set("search", params.search.trim());
  const res = await apiFetch<{ ok: true; data: InquiryRecord[] }>(
    `/admin/inquiries?${qs.toString()}`,
  );
  return res.data;
}

export async function updateSubmission(
  kind: "careers" | "pitches" | "inquiries",
  id: string,
  payload: { status?: SubmissionStatus; adminNotes?: string | null },
) {
  const res = await apiFetch<{ ok: true; data: unknown }>(`/admin/${kind}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteSubmission(kind: "careers" | "pitches" | "inquiries", id: string) {
  const res = await apiFetch<{ ok: true; data: { id: string } }>(`/admin/${kind}/${id}`, {
    method: "DELETE",
  });
  return res.data;
}

export async function fetchServices(subsidiary: string, category?: string) {
  const qs = new URLSearchParams({ subsidiary });
  if (category && category !== "all") qs.set("category", category);
  const res = await apiFetch<{ ok: true; data: ServiceRecord[] }>(`/admin/services?${qs.toString()}`);
  return res.data;
}

export async function createService(payload: {
  subsidiarySlug: string;
  title: string;
  category: string;
  summary?: string;
  details?: Record<string, unknown>;
  sortOrder?: number;
  isActive?: boolean;
}) {
  const res = await apiFetch<{ ok: true; data: ServiceRecord }>("/admin/services", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateService(
  id: string,
  payload: {
    title?: string;
    category?: string;
    summary?: string | null;
    details?: Record<string, unknown> | null;
    sortOrder?: number;
    isActive?: boolean;
  },
) {
  const res = await apiFetch<{ ok: true; data: ServiceRecord }>(`/admin/services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteService(id: string) {
  const res = await apiFetch<{ ok: true; data: { id: string } }>(`/admin/services/${id}`, {
    method: "DELETE",
  });
  return res.data;
}
