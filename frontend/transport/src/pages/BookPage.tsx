import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { submitTransportBooking } from "../lib/api";
import { fleetVehicles, transportContact } from "../lib/transportData";
import { usePageSeo } from "../lib/usePageSeo";

const serviceOptions = [
  "Personal & Family Transport",
  "Corporate Staff Pick & Drop",
  "School, College & University Transport",
  "Rent-a-Car (With or Without Driver)",
  "Daily & Monthly Commute Plans",
  "Event & Wedding Transfers",
  "Group & Northern Tours Transport",
  "Logistics & Parcel Movement",
];

export function BookPage() {
  usePageSeo({
    title: "Book a Vehicle or Contract | Aseer Transport Services",
    description:
      "Reserve a sedan, 4x4 SUV, luxury car, Hiace van, or Toyota Coaster, or request a monthly corporate staff transport quote in Islamabad.",
    path: "/book",
  });

  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState(serviceOptions[0]!);
  const [vehicleName, setVehicleName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [tripDates, setTripDates] = useState("");
  const [driverPreference, setDriverPreference] = useState("With Verified Driver");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const paramVehicle = searchParams.get("vehicle");
    const paramService = searchParams.get("service");
    if (paramVehicle) setVehicleName(paramVehicle);
    if (paramService && serviceOptions.includes(paramService)) {
      setServiceType(paramService);
    }
  }, [searchParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMsg = message.trim();

    if (trimmedName.length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (trimmedPhone.length < 7) {
      setErrorMsg("Please enter a valid phone or WhatsApp number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (trimmedMsg.length < 10) {
      setErrorMsg(
        "Please share a few details about your route or schedule (at least 10 characters).",
      );
      return;
    }

    setStatus("submitting");
    try {
      await submitTransportBooking({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        serviceType,
        vehicleName: vehicleName.trim() || "Flexible / Recommend Best Vehicle",
        pickupLocation: pickupLocation.trim() || undefined,
        dropoffLocation: dropoffLocation.trim() || undefined,
        tripDates: tripDates.trim() || undefined,
        driverPreference,
        message: trimmedMsg,
      });
      setStatus("success");
      setFullName("");
      setPhone("");
      setEmail("");
      setPickupLocation("");
      setDropoffLocation("");
      setTripDates("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Unable to submit right now. Please message us on WhatsApp or call our dispatch desk directly.",
      );
    }
  }

  return (
    <div>
      <section className="border-b border-border bg-pattern-cobalt py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Booking &amp; Dispatch Desk</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Reserve your{" "}
            <span className="serif-i font-normal text-cobalt">
              ride or fleet
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Request a single transfer, daily rental, or monthly corporate staff
            contract. Our Islamabad dispatch desk responds promptly with vehicle
            availability and pricing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-9">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-cobalt-soft text-cobalt">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h2 className="display mt-5 text-2xl text-foreground">
                    Booking request received
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Thank you for contacting Aseer Transport Services. Our
                    Islamabad dispatch team will confirm availability and share
                    a quote shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full bg-cobalt px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Usman Tariq"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="serviceType"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Service Type
                      </label>
                      <select
                        id="serviceType"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-cobalt focus:outline-none"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="vehicleName"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Preferred Vehicle
                      </label>
                      <input
                        id="vehicleName"
                        type="text"
                        list="transport-fleet-list"
                        value={vehicleName}
                        onChange={(e) => setVehicleName(e.target.value)}
                        placeholder="e.g. Toyota Prado, Hiace, Civic"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                      />
                      <datalist id="transport-fleet-list">
                        {fleetVehicles.map((v) => (
                          <option key={v.id} value={v.name} />
                        ))}
                      </datalist>
                    </div>
                    <div>
                      <label
                        htmlFor="driverPreference"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Driver Option
                      </label>
                      <select
                        id="driverPreference"
                        value={driverPreference}
                        onChange={(e) => setDriverPreference(e.target.value)}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-cobalt focus:outline-none"
                      >
                        <option value="With Verified Driver">
                          With Verified Driver
                        </option>
                        <option value="Self-Drive (Subject to Verification)">
                          Self-Drive (Subject to Verification)
                        </option>
                        <option value="Corporate Monthly Contract">
                          Corporate Monthly Contract
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="pickupLocation"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Pickup Location
                      </label>
                      <input
                        id="pickupLocation"
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        placeholder="H-13, Islamabad"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dropoffLocation"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Drop-off / Route
                      </label>
                      <input
                        id="dropoffLocation"
                        type="text"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        placeholder="Airport / Lahore / Hunza"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tripDates"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Dates / Duration
                      </label>
                      <input
                        id="tripDates"
                        type="text"
                        value={tripDates}
                        onChange={(e) => setTripDates(e.target.value)}
                        placeholder="e.g. 3 days / Monthly"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Route Notes &amp; Requirements *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share passenger count, luggage, pickup timings, or corporate billing details..."
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="rounded-xl border border-cobalt/40 bg-cobalt-soft px-4 py-3 text-xs font-medium text-cobalt">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    <Send className="size-4" />
                    <span>
                      {status === "submitting"
                        ? "Sending Request..."
                        : "Submit Booking Request"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <div className="rounded-3xl border border-cobalt/20 bg-cobalt-soft p-7">
              <p className="eyebrow">24/7 Dispatch Desk</p>
              <h2 className="display mt-2 text-2xl text-foreground">
                Direct coordination
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Need an urgent airport pickup or immediate vehicle confirmation?
                Reach our Islamabad dispatch team directly.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={transportContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-cobalt hover:text-cobalt"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <MessageCircle className="size-4 text-cobalt" />
                    <span>WhatsApp: {transportContact.whatsapp}</span>
                  </span>
                  <ExternalLink className="size-3.5 text-muted-foreground" />
                </a>

                <a
                  href={transportContact.phoneHref}
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-cobalt hover:text-cobalt"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Phone className="size-4 text-cobalt" />
                    <span>Desk: {transportContact.phone}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Alt: {transportContact.altPhone}
                  </span>
                </a>

                <a
                  href={transportContact.emailHref}
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-cobalt hover:text-cobalt"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Mail className="size-4 text-cobalt" />
                    <span>{transportContact.email}</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-7 shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-cobalt" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Islamabad Head Office
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {transportContact.headOffice}
                  </p>
                  <a
                    href={transportContact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cobalt hover:underline"
                  >
                    <span>Directions on Google Maps</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
