const isLocalHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API_BASE =
  (import.meta.env["VITE_API_URL"] as string | undefined) ??
  (isLocalHost ? "http://localhost:4000/api/v1" : "https://aseerbackend.vercel.app/api/v1");

export interface RiseInquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  department: string;
  engagementModel: string;
  message: string;
}

/**
 * Maps department choice to the existing backend InquiryType enum so backend + admin
 * wiring in the next iteration works seamlessly.
 */
function resolveInquiryType(department: string): "CORPORATE_SALES" | "SUPPORT" | "PARTNERSHIP" {
  if (department.toLowerCase().includes("support")) return "SUPPORT";
  if (department.toLowerCase().includes("business development")) return "PARTNERSHIP";
  return "CORPORATE_SALES";
}

export async function submitRiseInquiry(payload: RiseInquiryPayload) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subsidiarySlug: "the-rise",
      type: resolveInquiryType(payload.department),
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      company: payload.company || undefined,
      subject: `${payload.department} (${payload.engagementModel})`,
      message: payload.message,
      details: {
        department: payload.department,
        engagementModel: payload.engagementModel,
      },
    }),
  });

  const json = (await res.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
    issues?: { message: string }[];
  } | null;

  if (!res.ok || !json?.ok) {
    throw new Error(json?.issues?.[0]?.message ?? json?.error ?? "Unable to submit request.");
  }
}
