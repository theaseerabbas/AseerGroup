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
import { submitTravelInquiry } from "../lib/api";
import { contactInfo, packages } from "../lib/travelData";

const categoryOptions = [
  { value: "multi-day", label: "Multi-Day Northern Tour" },
  { value: "one-day", label: "One-Day Escape" },
  { value: "pilgrimage", label: "Hajj & Umrah Package" },
  { value: "corporate", label: "Corporate & Group Travel" },
  { value: "ticketing-visa", label: "Air Ticketing & Visa" },
];

export function PlanTripPage() {
  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("multi-day");
  const [packageName, setPackageName] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      setErrorMsg("Please share a few details about your trip (at least 10 characters).");
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
          : "Unable to send your enquiry right now. Please try WhatsApp or call us directly."
      );
    }
  }

  return (
    <div>
      {/* Page Hero */}
      <section className="border-b border-line bg-pattern-sand py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">Trip Planner &amp; Direct Desk</p>
          <h1 className="display mt-2 text-4xl text-ink sm:text-5xl">
            Let's plan your{" "}
            <span className="serif-i font-normal text-terra">
              next departure
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Send your preferred dates, destination, and group size below. You
            can also reach our Islamabad travel coordinators directly on
            WhatsApp, phone, Facebook, or Instagram.
          </p>
        </div>
      </section>

      {/* Form + Direct Channels */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-paper p-7 shadow-sm sm:p-9">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terra-soft text-terra">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="display mt-5 text-2xl text-ink">
                    Trip enquiry received
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                    Thank you for reaching out to Aseer Travel &amp; Tours. Our
                    Islamabad desk will review your route and get back to you
                    shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 cursor-pointer rounded-full bg-terra px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-terra/90"
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
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
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
                        className="w-full rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-terra focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
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
                        className="w-full rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-terra focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
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
                        className="w-full rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-terra focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                      >
                        Journey Type
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full cursor-pointer rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink focus:border-terra focus:outline-none"
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
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
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
                      className="w-full rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-terra focus:outline-none"
                    />
                    <datalist id="travel-packages-list">
                      {packages.map((p) => (
                        <option key={p.id} value={p.title} />
                      ))}
                    </datalist>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="travelDates"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                      >
                        Preferred Dates (Optional)
                      </label>
                      <input
                        id="travelDates"
                        type="text"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        placeholder="e.g. First week of June"
                        className="w-full rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-terra focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="travelers"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                      >
                        Number of Travellers (Optional)
                      </label>
                      <input
                        id="travelers"
                        type="text"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        placeholder="e.g. 4 adults, 2 children"
                        className="w-full rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-terra focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
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
                      className="w-full rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-terra focus:outline-none"
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
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-terra px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-terra/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
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

          {/* Direct Contact & Social Column */}
          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-3xl border border-terra/25 bg-terra-soft p-7">
              <p className="eyebrow">Instant Coordination</p>
              <h2 className="display mt-2 text-2xl text-ink">
                Speak with us directly
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Prefer a quick voice note or call? Our Islamabad travel desk is
                available for immediate route quotes and seat availability.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-paper px-4 py-3.5 text-sm font-semibold text-ink shadow-xs transition hover:border-terra hover:text-terra"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <MessageCircle className="h-4 w-4 text-terra" />
                    <span>WhatsApp: {contactInfo.whatsapp}</span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted" />
                </a>

                <a
                  href={contactInfo.phoneHref}
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-paper px-4 py-3.5 text-sm font-semibold text-ink shadow-xs transition hover:text-terra"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-terra" />
                    <span>Desk: {contactInfo.phone}</span>
                  </span>
                  <span className="text-xs text-muted">
                    Alt: {contactInfo.altPhone}
                  </span>
                </a>

                <a
                  href={contactInfo.emailHref}
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-paper px-4 py-3.5 text-sm font-semibold text-ink shadow-xs transition hover:text-terra"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-terra" />
                    <span>{contactInfo.email}</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Social Media Cards */}
            <div className="rounded-3xl border border-line bg-paper p-7">
              <p className="eyebrow">Follow Our Departures</p>
              <h3 className="display mt-2 text-xl text-ink">
                Facebook &amp; Instagram
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                See weekly departure updates, mountain weather highlights, and
                recent group moments.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={contactInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-line bg-sand px-4 py-3 text-sm font-semibold text-ink transition hover:border-terra hover:text-terra"
                >
                  <span>Facebook</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={contactInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-line bg-sand px-4 py-3 text-sm font-semibold text-ink transition hover:border-terra hover:text-terra"
                >
                  <span>Instagram</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div className="rounded-3xl border border-line bg-paper p-7">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terra" />
                <div>
                  <h3 className="text-sm font-semibold text-ink">
                    Islamabad Head Office
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    {contactInfo.headOffice}
                  </p>
                  <a
                    href={contactInfo.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-terra hover:underline"
                  >
                    <span>Directions on Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
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
