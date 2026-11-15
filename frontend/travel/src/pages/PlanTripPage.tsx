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
import { fetchTravelPackages, submitTravelInquiry } from "../lib/api";
import { contactInfo, packages as fallbackPackages, type TourPackage } from "../lib/travelData";
import { usePageSeo } from "../lib/usePageSeo";

const categoryOptions = [
  { value: "multi-day", label: "Multi-Day Northern Tour" },
  { value: "one-day", label: "One-Day Escape" },
  { value: "pilgrimage", label: "Hajj & Umrah Package" },
  { value: "corporate", label: "Corporate & Group Travel" },
  { value: "ticketing-visa", label: "Air Ticketing & Visa" },
];

export function PlanTripPage() {
  usePageSeo({
    title: "Plan a Trip & Package Inquiry | Aseer Travel & Tours",
    description:
      "Request a custom quote or book a northern Pakistan tour, Umrah package, air ticket, or corporate retreat with Aseer Travel & Tours in Islamabad.",
    path: "/plan-trip",
  });

  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("multi-day");
  const [packageName, setPackageName] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [packageOptions, setPackageOptions] = useState<TourPackage[]>(fallbackPackages);

  useEffect(() => {
    let mounted = true;
    void fetchTravelPackages().then((live) => {
      if (mounted) setPackageOptions(live);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const paramPkg = searchParams.get("package");
    const paramType = searchParams.get("type");
    if (paramPkg) setPackageName(paramPkg);
    if (
      paramType &&
      categoryOptions.some((opt) => opt.value === paramType)
    ) {
      setCategory(paramType);
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (trimmedPhone.length < 7) {
      setErrorMsg("Please enter a valid phone or WhatsApp number.");
      return;
    }
    if (trimmedMsg.length < 10) {
      setErrorMsg(
        "Please share a few details about your trip (at least 10 characters).",
      );
      return;
    }

    setStatus("submitting");
    try {
      await submitTravelInquiry({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        category,
        packageName: packageName.trim() || "Custom Itinerary",
        travelDates: travelDates.trim() || undefined,
        travelers: travelers.trim() || undefined,
        message: trimmedMsg,
      });
      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setTravelDates("");
      setTravelers("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Unable to send your enquiry right now. Please try WhatsApp or call us directly.",
      );
    }
  }

  return (
    <div>
      {/* Page Header */}
      <section className="border-b border-border bg-pattern-sand py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Trip Planner &amp; Direct Desk</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Let's plan your{" "}
            <span className="serif-i font-normal text-terra">
              next departure
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Send your preferred dates, destination, and group size below. You
            can also reach our Islamabad travel coordinators directly on
            WhatsApp, phone, Facebook, or Instagram.
          </p>
        </div>
      </section>

      {/* Form + Direct Channels */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Form Column (sticky on desktop when scrolling right side) */}
          <div className="lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-9">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-terra-soft text-terra">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h2 className="display mt-5 text-2xl text-foreground">
                    Trip enquiry received
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out to Aseer Travel &amp; Tours. Our
                    Islamabad desk will review your route and get back to you
                    shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full bg-terra px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Send Another Enquiry
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
                        placeholder="Ali Raza"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
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
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
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
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Journey Type
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-terra focus:outline-none"
                      >
                        {categoryOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="packageName"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Package or Destination
                    </label>
                    <input
                      id="packageName"
                      type="text"
                      list="travel-packages-list"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      placeholder="e.g. 5-Day Hunza Valley or Custom Family Trip"
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
                    />
                    <datalist id="travel-packages-list">
                      {packageOptions.map((p) => (
                        <option key={p.id} value={p.title} />
                      ))}
                    </datalist>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="travelDates"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Preferred Dates (Optional)
                      </label>
                      <input
                        id="travelDates"
                        type="text"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        placeholder="e.g. First week of June"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="travelers"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Number of Travellers (Optional)
                      </label>
                      <input
                        id="travelers"
                        type="text"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        placeholder="e.g. 4 adults, 2 children"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Trip Notes &amp; Preferences *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about pickup city, room preferences, or any special requests..."
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="rounded-xl border border-terra/40 bg-terra-soft px-4 py-3 text-xs font-medium text-terra">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-terra px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    <Send className="size-4" />
                    <span>
                      {status === "submitting"
                        ? "Sending Enquiry..."
                        : "Submit Trip Enquiry"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Direct Contact & Social Column (sticky on desktop when scrolling form) */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <div className="rounded-3xl border border-terra/25 bg-terra-soft p-7">
              <p className="eyebrow">Instant Coordination</p>
              <h2 className="display mt-2 text-2xl text-foreground">
                Speak with us directly
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer a quick voice note or call? Our Islamabad travel desk is
                available for immediate route quotes and seat availability.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-terra hover:text-terra"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <MessageCircle className="size-4 text-terra" />
                    <span>WhatsApp: {contactInfo.whatsapp}</span>
                  </span>
                  <ExternalLink className="size-3.5 text-muted-foreground" />
                </a>

                <a
                  href={contactInfo.phoneHref}
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-terra hover:text-terra"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Phone className="size-4 text-terra" />
                    <span>Desk: {contactInfo.phone}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Alt: {contactInfo.altPhone}
                  </span>
                </a>

                <a
                  href={contactInfo.emailHref}
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-terra hover:text-terra"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Mail className="size-4 text-terra" />
                    <span>{contactInfo.email}</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Social Media Cards */}
            <div className="rounded-3xl border border-border bg-white p-7 shadow-xs">
              <p className="eyebrow">Follow Our Departures</p>
              <h3 className="display mt-2 text-xl text-foreground">
                Facebook &amp; Instagram
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                See weekly departure updates, mountain weather highlights, and
                recent group moments.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={contactInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-terra hover:text-terra"
                >
                  <span>Facebook</span>
                  <ExternalLink className="size-3.5" />
                </a>
                <a
                  href={contactInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-terra hover:text-terra"
                >
                  <span>Instagram</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div className="rounded-3xl border border-border bg-white p-7 shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-terra" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Islamabad Head Office
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {contactInfo.headOffice}
                  </p>
                  <a
                    href={contactInfo.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-terra hover:underline"
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
