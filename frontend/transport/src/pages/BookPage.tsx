import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { fetchTransportFleet, submitTransportBooking } from "../lib/api";
import {
  fleetVehicles as fallbackFleet,
  transportContact,
  type FleetVehicle,
} from "../lib/transportData";
import { usePageSeo } from "../lib/usePageSeo";
import { CobaltSelect, type SelectOption } from "../components/CobaltSelect";
import { SpotlightCard } from "../components/SpotlightCard";
import { cn } from "../lib/utils";

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

const driverOptions = [
  "With Verified Driver",
  "Self-Drive (Subject to Verification)",
  "Corporate Monthly Contract",
];

const FLEXIBLE_VEHICLE = "Flexible / Recommend Best Vehicle";

type FieldErrors = Partial<Record<"fullName" | "phone" | "email" | "message", string>>;

function validateFields(fields: {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}): FieldErrors {
  const errs: FieldErrors = {};
  if (fields.fullName.trim().length < 2) {
    errs.fullName = "Please enter your full name (at least 2 characters).";
  }
  const phoneTrim = fields.phone.trim();
  const digits = phoneTrim.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(phoneTrim) || digits.length < 7) {
    errs.phone = "Please enter a valid phone or WhatsApp number (at least 7 digits).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errs.email = "Please enter a valid email address.";
  }
  if (fields.message.trim().length < 10) {
    errs.message = "Please add a brief note about your route or schedule (at least 10 characters).";
  }
  return errs;
}

const inputBaseClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2";

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
  const [vehicleName, setVehicleName] = useState(FLEXIBLE_VEHICLE);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [tripDates, setTripDates] = useState("");
  const [driverPreference, setDriverPreference] = useState(driverOptions[0]!);
  const [message, setMessage] = useState("");

  const [fleetList, setFleetList] = useState<FleetVehicle[]>(fallbackFleet);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    let mounted = true;
    void fetchTransportFleet().then((items) => {
      if (mounted) setFleetList(items);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const paramVehicle = searchParams.get("vehicle");
    const paramService = searchParams.get("service");
    if (paramVehicle) setVehicleName(paramVehicle);
    if (paramService && serviceOptions.includes(paramService)) {
      setServiceType(paramService);
    }
  }, [searchParams]);

  const vehicleSelectOptions = useMemo<SelectOption[]>(() => {
    const base: SelectOption[] = [
      {
        value: FLEXIBLE_VEHICLE,
        label: FLEXIBLE_VEHICLE,
        hint: "Let our dispatch team suggest the best fit",
      },
      ...fleetList.map((v) => ({
        value: v.name,
        label: v.name,
        hint: `${v.categoryLabel} · ${v.seats}`,
      })),
    ];

    if (
      vehicleName &&
      vehicleName !== FLEXIBLE_VEHICLE &&
      !base.some((o) => o.value === vehicleName)
    ) {
      base.splice(1, 0, {
        value: vehicleName,
        label: vehicleName,
        hint: "Selected category",
      });
    }

    return base;
  }, [fleetList, vehicleName]);

  function handleBlur(field: keyof FieldErrors) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldErrors(validateFields({ fullName, phone, email, message }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");

    const errs = validateFields({ fullName, phone, email, message });
    setFieldErrors(errs);
    setTouched({ fullName: true, phone: true, email: true, message: true });

    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      await submitTransportBooking({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        serviceType,
        vehicleName: vehicleName || FLEXIBLE_VEHICLE,
        pickupLocation: pickupLocation.trim() || undefined,
        dropoffLocation: dropoffLocation.trim() || undefined,
        tripDates: tripDates.trim() || undefined,
        driverPreference,
        message: message.trim(),
      });
      setStatus("success");
      setFullName("");
      setPhone("");
      setEmail("");
      setPickupLocation("");
      setDropoffLocation("");
      setTripDates("");
      setMessage("");
      setTouched({});
      setFieldErrors({});
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Unable to submit right now. Please message us on WhatsApp or call our dispatch desk directly.",
      );
    }
  }

  return (
    <div className="page-in">
      <section className="border-b border-border bg-pattern-cobalt py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Booking &amp; Dispatch Desk</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Reserve your{" "}
            <span className="serif-i font-normal text-cobalt">ride or fleet</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Request a single transfer, daily rental, or monthly corporate staff contract. Our
            Islamabad dispatch desk responds promptly with vehicle availability and pricing.
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
                    Thank you for contacting Aseer Transport Services. Our Islamabad dispatch team
                    will confirm availability and share a quote shortly.
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
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (touched.fullName) {
                            setFieldErrors(
                              validateFields({
                                fullName: e.target.value,
                                phone,
                                email,
                                message,
                              }),
                            );
                          }
                        }}
                        onBlur={() => handleBlur("fullName")}
                        placeholder="Usman Tariq"
                        className={cn(
                          inputBaseClass,
                          touched.fullName && fieldErrors.fullName
                            ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                            : "border-border focus:border-cobalt focus:ring-cobalt/15",
                        )}
                      />
                      {touched.fullName && fieldErrors.fullName && (
                        <p className="mt-1.5 text-xs text-destructive">{fieldErrors.fullName}</p>
                      )}
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
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (touched.phone) {
                            setFieldErrors(
                              validateFields({
                                fullName,
                                phone: e.target.value,
                                email,
                                message,
                              }),
                            );
                          }
                        }}
                        onBlur={() => handleBlur("phone")}
                        placeholder="0300-1234567"
                        className={cn(
                          inputBaseClass,
                          touched.phone && fieldErrors.phone
                            ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                            : "border-border focus:border-cobalt focus:ring-cobalt/15",
                        )}
                      />
                      {touched.phone && fieldErrors.phone && (
                        <p className="mt-1.5 text-xs text-destructive">{fieldErrors.phone}</p>
                      )}
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
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (touched.email) {
                            setFieldErrors(
                              validateFields({
                                fullName,
                                phone,
                                email: e.target.value,
                                message,
                              }),
                            );
                          }
                        }}
                        onBlur={() => handleBlur("email")}
                        placeholder="you@company.com"
                        className={cn(
                          inputBaseClass,
                          touched.email && fieldErrors.email
                            ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                            : "border-border focus:border-cobalt focus:ring-cobalt/15",
                        )}
                      />
                      {touched.email && fieldErrors.email && (
                        <p className="mt-1.5 text-xs text-destructive">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="serviceType"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Service Type
                      </label>
                      <CobaltSelect
                        id="serviceType"
                        value={serviceType}
                        onChange={setServiceType}
                        options={serviceOptions.map((opt) => ({ value: opt, label: opt }))}
                      />
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
                      <CobaltSelect
                        id="vehicleName"
                        value={vehicleName}
                        onChange={setVehicleName}
                        options={vehicleSelectOptions}
                        placeholder="Select a vehicle from fleet"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="driverPreference"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Driver Option
                      </label>
                      <CobaltSelect
                        id="driverPreference"
                        value={driverPreference}
                        onChange={setDriverPreference}
                        options={driverOptions.map((opt) => ({ value: opt, label: opt }))}
                      />
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
                        className={cn(
                          inputBaseClass,
                          "border-border focus:border-cobalt focus:ring-cobalt/15",
                        )}
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
                        className={cn(
                          inputBaseClass,
                          "border-border focus:border-cobalt focus:ring-cobalt/15",
                        )}
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
                        className={cn(
                          inputBaseClass,
                          "border-border focus:border-cobalt focus:ring-cobalt/15",
                        )}
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
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (touched.message) {
                          setFieldErrors(
                            validateFields({
                              fullName,
                              phone,
                              email,
                              message: e.target.value,
                            }),
                          );
                        }
                      }}
                      onBlur={() => handleBlur("message")}
                      placeholder="Share passenger count, luggage, pickup timings, or corporate billing details..."
                      className={cn(
                        inputBaseClass,
                        touched.message && fieldErrors.message
                          ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                          : "border-border focus:border-cobalt focus:ring-cobalt/15",
                      )}
                    />
                    {touched.message && fieldErrors.message && (
                      <p className="mt-1.5 text-xs text-destructive">{fieldErrors.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <div className="rounded-xl border border-destructive/35 bg-destructive/5 px-4 py-3 text-xs font-medium text-destructive">
                      {serverError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                    <span>
                      {status === "submitting" ? "Sending Request..." : "Submit Booking Request"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <SpotlightCard className="rounded-3xl border border-cobalt/20 bg-cobalt-soft p-7">
              <p className="eyebrow">24/7 Dispatch Desk</p>
              <h2 className="display mt-2 text-2xl text-foreground">Direct coordination</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Need an urgent airport pickup or immediate vehicle confirmation? Reach our
                Islamabad dispatch team directly.
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
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-border bg-white p-7 shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-cobalt" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Islamabad Head Office</h3>
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
            </SpotlightCard>
          </div>
        </div>
      </section>
    </div>
  );
}
