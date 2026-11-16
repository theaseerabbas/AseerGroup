import { fleetVehicles as fallbackFleet, type FleetCategory, type FleetVehicle } from "./transportData";

const isLocalHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API_BASE =
  (import.meta.env["VITE_API_URL"] as string | undefined) ??
  (isLocalHost ? "http://localhost:4000/api/v1" : "https://aseerbackend.vercel.app/api/v1");

interface ApiFleetItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string | null;
  details: {
    categoryLabel?: string;
    seats?: string;
    driverOption?: string;
    imageUrl?: string;
    highlights?: string[];
  } | null;
}

export function normalizeImageUrl(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1000`;
  }

  const idMatch = trimmed.match(/drive\.google\.com\/(?:open|uc)\?[^#]*\bid=([a-zA-Z0-9_-]+)/);
  if (idMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : undefined;
}

const validFleetCats = new Set<Exclude<FleetCategory, "all">>([
  "hatchback",
  "sedan",
  "4x4",
  "luxury",
  "vans-buses",
]);

export interface TransportBookingPayload {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  vehicleName: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  tripDates?: string;
  driverPreference?: string;
  message: string;
}

export async function fetchTransportFleet(): Promise<FleetVehicle[]> {
  try {
    const res = await fetch(`${API_BASE}/subsidiaries/transport`);
    if (!res.ok) return fallbackFleet;
    const json = (await res.json()) as {
      ok?: boolean;
      data?: { services?: ApiFleetItem[] };
    };
    const services = json?.data?.services;
    if (!json?.ok || !Array.isArray(services) || services.length === 0) {
      return fallbackFleet;
    }

    return services.map((svc) => ({
      id: svc.slug || svc.id,
      name: svc.title,
      category: validFleetCats.has(svc.category as Exclude<FleetCategory, "all">)
        ? (svc.category as Exclude<FleetCategory, "all">)
        : "sedan",
      categoryLabel: svc.details?.categoryLabel || svc.category,
      seats: svc.details?.seats || "4–5 Seats",
      useCase: svc.summary || "",
      driverOption: svc.details?.driverOption || "With or without driver",
      imageUrl: normalizeImageUrl(svc.details?.imageUrl),
      highlights: Array.isArray(svc.details?.highlights) ? svc.details.highlights : [],
    }));
  } catch {
    return fallbackFleet;
  }
}

/**
 * Foundation booking submission helper wired to the shared inquiries endpoint schema.
 */
export async function submitTransportBooking(payload: TransportBookingPayload) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subsidiarySlug: "transport",
      type: "TRANSPORT_BOOKING",
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      subject: `${payload.serviceType}: ${payload.vehicleName}`,
      message: payload.message,
      details: {
        serviceType: payload.serviceType,
        vehicleName: payload.vehicleName,
        pickupLocation: payload.pickupLocation || null,
        dropoffLocation: payload.dropoffLocation || null,
        tripDates: payload.tripDates || null,
        driverPreference: payload.driverPreference || null,
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
