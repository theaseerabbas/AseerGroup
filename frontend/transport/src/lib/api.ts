import { fleetVehicles, type FleetVehicle } from "./transportData";

const isLocalHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API_BASE =
  (import.meta.env["VITE_API_URL"] as string | undefined) ??
  (isLocalHost ? "http://localhost:4000/api/v1" : "https://aseerbackend.vercel.app/api/v1");

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

/**
 * Foundation helper for the next iteration (backend + admin wiring).
 * Returns the static fleet immediately for now; ready to hydrate from /subsidiaries/transport.
 */
export async function fetchTransportFleet(): Promise<FleetVehicle[]> {
  return fleetVehicles;
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
