import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Calendar,
  Check,
  Compass,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import heroImg from "@/assets/hero-karakoram.jpg";
import travelImg from "@/assets/travel.jpg";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SpotlightCard } from "@/components/SpotlightCard";
import { submitTravelInquiry } from "@/lib/api";
import {
  contactInfo,
  coreServices,
  packages,
  tourInclusions,
  values,
  type PackageCategory,
} from "@/lib/travelData";
import { cn } from "@/lib/utils";

const CATEGORY_TABS: { id: PackageCategory; label: string }[] = [
  { id: "all", label: "All Packages" },
  { id: "multi-day", label: "Multi-Day Expeditions" },
  { id: "one-day", label: "One-Day Tours" },
  { id: "pilgrimage", label: "Hajj & Umrah" },
  { id: "corporate", label: "Corporate & Visas" },
];

export function App() {
  const [category, setCategory] = useState<PackageCategory>("all");
  const [showTop, setShowTop] = useState(false);

  // Trip Planner form state (ready to connect to backend)
  const [tripType, setTripType] = useState("Multi-Day Tour");
  const [selectedPackage, setSelectedPackage] = useState("5-Day Hunza Valley");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 450);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered =
    category === "all" ? packages : packages.filter((pkg) => pkg.category === category);

  const jumpToCategory = (cat: PackageCategory) => {
    setCategory(cat);
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const enquireForPackage = (pkgTitle: string, cat: string) => {
    const labelMap: Record<string, string> = {
      "one-day": "One-Day Tour",
      "multi-day": "Multi-Day Tour",
      pilgrimage: "Hajj & Umrah",
      corporate: "Corporate / Custom Travel",
    };
    setTripType(labelMap[cat] ?? "Custom Holiday");
    setSelectedPackage(pkgTitle);
    setSent(false);
    document.getElementById("plan-trip")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (fullName.trim().length < 2) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!/^[+\d\s().-]+$/.test(phone.trim()) || phone.replace(/\D/g, "").length < 7) {
      setFormError("Please enter a valid phone number (at least 7 digits).");
      return;
    }
    if (message.trim().length < 5) {
      setFormError("Please share a few details about your trip or preferred dates.");
      return;
    }

    setSubmitting(true);
    try {
      await submitTravelInquiry({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        category: tripType,
        packageName: selectedPackage.trim() || tripType,
        travelDates: travelDates.trim(),
        travelers: travelers.trim(),
        message: message.trim(),
      });
      setSent(true);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not send your inquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="top" className="min-h-screen">
      <Header />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1240px] px-6 pb-12 pt-36 md:pt-44">
          <a
            href={contactInfo.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow u-link text-teal"
          >
            ← A member of The Aseer Group
          </a>

          <h1 className="display mt-6 max-w-4xl text-[clamp(3rem,8vw,6.75rem)]">
            Journeys planned <span className="serif-i text-teal">with care &amp; wonder.</span>
          </h1>

          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              From one-day northern escapes and multi-day Karakoram expeditions to Hajj, Umrah,
              international visas, and corporate travel management.
            </p>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "multi-day", label: "Multi-Day Expeditions" },
                  { id: "one-day", label: "One-Day Tours" },
                  { id: "pilgrimage", label: "Hajj & Umrah" },
                  { id: "corporate", label: "Corporate & Visas" },
                ] as const
              ).map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => jumpToCategory(pill.id)}
                  className="rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-teal hover:text-teal"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Full-bleed Hero Photography */}
        <section className="mx-auto max-w-[1440px] px-3 pb-24 md:px-6 md:pb-32">
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-float md:rounded-[2.75rem]">
            <img
              src={heroImg}
              alt="Northern Pakistan mountain valley expedition"
              className="aspect-[16/10] w-full object-cover md:aspect-[21/9]"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 text-white md:p-10">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                  Featured Circuits
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                  Hunza · Skardu · Fairy Meadows · Kashmir · Swat
                </p>
              </div>
              <a
                href="#packages"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                Explore 20+ packages
                <ArrowUpRight className="size-3.5 text-teal" />
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Package Explorer */}
        <section id="packages" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pb-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-teal">Aseer Travelling Packages</p>
              <h2 className="display mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Curated routes <span className="serif-i text-teal">across Pakistan.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Choose a one-day getaway, a multi-day northern expedition, or a custom pilgrimage &amp;
              corporate itinerary.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORY_TABS.map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-300",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "border border-border bg-white text-muted-foreground hover:border-teal/40 hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <SpotlightCard
                key={pkg.id}
                className="flex flex-col rounded-[1.75rem] border border-border bg-card p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1 text-[12px] font-medium text-teal">
                    <Calendar className="size-3" />
                    {pkg.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                    <MapPin className="size-3 text-amber" />
                    {pkg.region}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {pkg.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                  {pkg.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {pkg.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-white px-3 py-1 text-[12px] text-foreground/80"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => enquireForPackage(pkg.title, pkg.category)}
                    className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-teal transition-colors hover:text-primary"
                  >
                    Enquire for this trip
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Tour Inclusions Band */}
        <section className="bg-pattern-teal border-y border-teal/10 py-24 md:py-28">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-teal">Standard tour inclusions</p>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)]">
                Thoughtfully covered, <span className="serif-i text-teal">mile after mile.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                Every curated group expedition is structured around comfort, transparent pricing,
                and attentive ground care.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {tourInclusions.map((inc) => (
                  <div
                    key={inc}
                    className="flex items-center gap-2.5 rounded-2xl border border-teal/15 bg-white/85 px-4 py-3 text-[14px] font-medium text-foreground shadow-xs"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                      <Check className="size-3" />
                    </span>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[2rem] border border-teal/15 bg-white p-2 shadow-float">
                <img
                  src={travelImg}
                  alt="Travel planning and destinations"
                  className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section id="services" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-teal">Complete travel desk</p>
              <h2 className="display mt-3 text-[clamp(2.25rem,4.5vw,3.5rem)]">
                Beyond tours: <span className="serif-i text-teal">end-to-end travel.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Whether booking an international flight, preparing a visa file, or planning a family
              Umrah, our Islamabad desk handles every detail.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((srv) => (
              <SpotlightCard
                key={srv.num}
                className="rounded-[1.75rem] border border-border bg-card p-8"
              >
                <p className="text-[13px] font-semibold tabular-nums text-teal">{srv.num}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                  {srv.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{srv.text}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Mission, Vision & Core Values */}
        <section id="about" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pb-28">
          <div className="rounded-[2.5rem] border border-border bg-card p-8 md:p-14">
            <div className="grid gap-12 border-b border-border pb-12 md:grid-cols-2">
              <div>
                <p className="eyebrow text-teal">Our Mission</p>
                <p className="mt-4 text-lg leading-relaxed text-foreground">
                  We aim to redefine travel by delivering dependable services across tourism,
                  transport, hospitality, and community care, creating meaningful journeys while
                  making a positive social impact.
                </p>
              </div>
              <div>
                <p className="eyebrow text-teal">Our Vision</p>
                <p className="mt-4 text-lg leading-relaxed text-foreground">
                  To become a globally recognized leader in the travel and tourism industry,
                  renowned for excellence, reliability, and responsible hospitality.
                </p>
              </div>
            </div>

            <div className="pt-12">
              <p className="eyebrow">Core Values</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {values.map((v) => (
                  <div key={v.name} className="rounded-2xl border border-border bg-white p-5">
                    <h3 className="font-semibold text-foreground">{v.name}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trip Planner Inquiry Form */}
        <section
          id="plan-trip"
          className="mx-auto grid max-w-[1240px] scroll-mt-24 gap-12 px-6 pb-32 md:grid-cols-12 md:items-start"
        >
          <div className="space-y-6 md:sticky md:top-28 md:col-span-4">
            <SpotlightCard className="bg-pattern-teal rounded-[2rem] border border-teal/15 p-8 shadow-float">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-teal shadow-xs">
                <Compass className="size-5" />
              </span>
              <h2 className="display mt-6 text-2xl">Plan your journey</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Share your preferred destination, travel dates, and group size. Our travel advisors
                in Islamabad will prepare a tailored itinerary and quote.
              </p>

              <div className="mt-8 space-y-4 border-t border-teal/15 pt-6 text-[14px]">
                <a
                  href={contactInfo.phoneHref}
                  className="flex items-center gap-3 font-medium text-foreground transition-colors hover:text-teal"
                >
                  <Phone className="size-4 text-teal" />
                  <span>
                    {contactInfo.phone} / {contactInfo.altPhone}
                  </span>
                </a>
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-medium text-teal transition-opacity hover:opacity-80"
                >
                  <Sparkles className="size-4" />
                  <span>WhatsApp: {contactInfo.whatsapp}</span>
                </a>
                <a
                  href={contactInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-teal" />
                  <span>{contactInfo.headOffice}</span>
                </a>
              </div>
            </SpotlightCard>
          </div>

          <div className="md:col-span-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 md:p-12">
              <div
                className={cn(
                  "transition-all duration-700 ease-apple",
                  sent && "pointer-events-none -translate-y-4 opacity-0 blur-sm",
                )}
              >
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <div>
                    <p className="eyebrow">Journey type</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "Multi-Day Tour",
                        "One-Day Tour",
                        "Hajj & Umrah",
                        "Air Ticketing & Visas",
                        "Corporate / Custom Travel",
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTripType(t)}
                          className={cn(
                            "rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300",
                            tripType === t
                              ? "bg-primary text-primary-foreground"
                              : "bg-white text-foreground hover:bg-secondary",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      label="Full name"
                      placeholder="e.g. Bilal Ahmed"
                      value={fullName}
                      onChange={setFullName}
                      required
                    />
                    <FormField
                      label="Email address"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={setEmail}
                      required
                    />
                    <FormField
                      label="Phone / WhatsApp"
                      type="tel"
                      placeholder="+92 300 0000000"
                      value={phone}
                      onChange={setPhone}
                      required
                    />
                    <FormField
                      label="Package or destination"
                      placeholder="e.g. 5-Day Hunza Valley"
                      value={selectedPackage}
                      onChange={setSelectedPackage}
                    />
                    <FormField
                      label="Preferred dates (optional)"
                      placeholder="e.g. June 2027 or Eid holidays"
                      value={travelDates}
                      onChange={setTravelDates}
                    />
                    <label className="block">
                      <span className="eyebrow">Travelers (optional)</span>
                      <div className="relative mt-3">
                        <Users className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                          placeholder="e.g. 4 adults, 2 rooms"
                          className="w-full rounded-2xl border border-input bg-white py-4 pl-11 pr-5 text-[15px] outline-none transition-all focus:border-teal focus:ring-4 focus:ring-teal/10"
                        />
                      </div>
                    </label>
                  </div>

                  <label className="block">
                    <span className="eyebrow">Trip details &amp; preferences</span>
                    <textarea
                      rows={4}
                      maxLength={2000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your departure city, hotel tier, or any special requests..."
                      className="mt-3 w-full resize-none rounded-2xl border border-input bg-white px-5 py-4 text-[15px] outline-none transition-all focus:border-teal focus:ring-4 focus:ring-teal/10"
                    />
                  </label>

                  {formError && (
                    <p className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-[14px] text-destructive">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-500 ease-apple hover:bg-primary active:scale-[0.98] disabled:opacity-60"
                  >
                    {submitting ? "Sending request..." : "Request trip quote"}
                    <ArrowUpRight className="size-4 transition-transform duration-500 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </form>
              </div>

              <div
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center p-10 text-center transition-all duration-700 ease-apple",
                  sent ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0",
                )}
              >
                <span className="grid size-16 place-items-center rounded-full bg-teal text-white">
                  <Check className="size-7" />
                </span>
                <p className="display mt-8 text-4xl">Trip inquiry received.</p>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Thank you, {fullName || "traveler"}. Our travel desk will reach out shortly
                  regarding <span className="font-medium text-foreground">{selectedPackage}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setMessage("");
                  }}
                  className="u-link mt-8 text-[14px] text-teal"
                >
                  Plan another journey
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-teal/20 bg-white/95 text-teal shadow-float backdrop-blur-xl transition-all duration-500 ease-apple hover:-translate-y-1 hover:bg-teal hover:text-white",
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <ArrowUp className="size-4" />
      </button>
    </div>
  );
}

function FormField({
  label,
  type = "text",
  placeholder,
  value,
  required,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-input bg-white px-5 py-4 text-[15px] outline-none transition-all focus:border-teal focus:ring-4 focus:ring-teal/10"
      />
    </label>
  );
}
