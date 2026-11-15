import { packages as fallbackPackages, type PackageCategory, type TourPackage } from "./travelData";

const isLocalHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API_BASE =
  (import.meta.env["VITE_API_URL"] as string | undefined) ??
  (isLocalHost ? "http://localhost:4000/api/v1" : "https://aseerbackend.vercel.app/api/v1");

interface ApiServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string | null;
  details: {
    duration?: string;
    region?: string;
    highlights?: string[];
  } | null;
}

const validPackageCats = new Set<Exclude<PackageCategory, "all">>([
  "one-day",
  "multi-day",
  "pilgrimage",
  "corporate",
]);

export async function fetchTravelPackages(): Promise<TourPackage[]> {
  try {
    const res = await fetch(`${API_BASE}/subsidiaries/travel`);
    if (!res.ok) return fallbackPackages;
    const json = (await res.json()) as {
      ok?: boolean;
      data?: { services?: ApiServiceItem[] };
    };
    const services = json?.data?.services;
    if (!json?.ok || !Array.isArray(services) || services.length === 0) {
      return fallbackPackages;
    }

    return services.map((svc) => ({
      id: svc.slug || svc.id,
      title: svc.title,
      category: validPackageCats.has(svc.category as Exclude<PackageCategory, "all">)
        ? (svc.category as Exclude<PackageCategory, "all">)
        : "multi-day",
      duration: svc.details?.duration || "Custom",
      region: svc.details?.region || "Pakistan",
      summary: svc.summary || "",
      highlights: Array.isArray(svc.details?.highlights) ? svc.details.highlights : [],
    }));
  } catch {
    return fallbackPackages;
  }
}

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
