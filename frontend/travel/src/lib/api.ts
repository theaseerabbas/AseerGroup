const API_BASE =
  (import.meta.env["VITE_API_URL"] as string | undefined) ?? "http://localhost:4000/api/v1";

export interface TravelInquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  packageName: string;
  travelDates?: string;
  travelers?: string;
  message: string;
}

export async function submitTravelInquiry(payload: TravelInquiryPayload) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subsidiarySlug: "travel",
      type: "TRAVEL_PACKAGE",
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      subject: `${payload.category}: ${payload.packageName}`,
      message: payload.message,
      details: {
        category: payload.category,
        packageName: payload.packageName,
        travelDates: payload.travelDates || null,
        travelers: payload.travelers || null,
      },
    }),
  });

  const json = (await res.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
    issues?: { message: string }[];
  } | null;

  if (!res.ok || !json?.ok) {
    throw new Error(
      json?.issues?.[0]?.message ?? json?.error ?? "Unable to submit your trip inquiry right now.",
    );
  }
}
