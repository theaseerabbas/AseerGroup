import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Briefcase, Check, ChevronDown, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SpotlightCard } from "@/components/site/Interactive";
import { postApi } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | The Aseer Group" },
      {
        name: "description",
        content:
          "Submit your resume and express interest in joining The Aseer Group and its subsidiaries in Islamabad and across Pakistan.",
      },
      { property: "og:title", content: "Careers | The Aseer Group" },
      {
        property: "og:description",
        content: "Share your profile and attach your resume to join The Aseer Group.",
      },
      { property: "og:url", content: "https://theaseergroup.com/careers" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theaseergroup.com/careers" }],
  }),
  component: Careers,
});

const tracks = [
  "Group Operations",
  "Aseer Transport Services",
  "Aseer Travel & Tours",
  "The Leap Pakistan",
  "The Rise",
];

const trackCards = [
  {
    name: "Group Operations",
    role: "Finance, HR, Legal & Admin",
    desc: "Support central governance, compliance, people operations, and coordination across all subsidiaries.",
  },
  {
    name: "Aseer Transport Services",
    role: "Fleet, Logistics & Dispatch",
    desc: "Manage corporate staff mobility, fleet scheduling, client accounts, and commercial logistics.",
  },
  {
    name: "Aseer Travel & Tours",
    role: "Ticketing, Visas & Experiences",
    desc: "Craft domestic and international journeys, Hajj and Umrah operations, and corporate travel desks.",
  },
  {
    name: "The Leap Pakistan",
    role: "Programs, Youth & Community",
    desc: "Design leadership retreats, mentor cohorts, and build partnerships with universities and founders.",
  },
  {
    name: "The Rise",
    role: "BD, Sales & Client Support",
    desc: "Drive B2B growth, direct sales conversion, and responsive after-sales care across the group.",
  },
];

const pillars = [
  {
    num: "01",
    title: "Multi-Sector Exposure",
    text: "Work alongside teams spanning transport, travel, youth leadership, and commercial strategy under one cohesive group.",
  },
  {
    num: "02",
    title: "High-Trust Ownership",
    text: "Small, focused teams in Islamabad where initiative is noticed early and people are trusted to lead meaningful work.",
  },
  {
    num: "03",
    title: "Purpose & Craft",
    text: "Every role connects to real service delivery, community uplift, and long-term national development.",
  },
];

const reviewSteps = [
  {
    step: "01",
    title: "Resume Intake",
    text: "Your CV and profile enter our central talent pool.",
  },
  {
    step: "02",
    title: "Leadership Review",
    text: "Department heads match your strengths to active or upcoming needs.",
  },
  {
    step: "03",
    title: "Discovery Call",
    text: "Shortlisted candidates are invited for a conversation in Islamabad or online.",
  },
];

const careerFaqs = [
  {
    q: "Do I need to apply for a specific open vacancy?",
    a: "No. We maintain a year-round talent pool rather than posting temporary listings. Submit your resume once and our team will reach out when a matching role opens across the parent office or any subsidiary.",
  },
  {
    q: "Where are your teams based?",
    a: "Our corporate headquarters is at Makka Heights, H-13, Islamabad, and our programs and innovation hub is at NSTP, NUST H-12 Campus, Islamabad. Select roles also support hybrid or remote collaboration.",
  },
  {
    q: "Can students or fresh graduates apply?",
    a: "Yes. We welcome applications from final-year students, fresh graduates, and experienced operators alike, especially for internships, program coordination, sales, and operations tracks.",
  },
  {
    q: "How should I share my resume?",
    a: "Upload your CV or resume to Google Drive, Dropbox, or OneDrive (with link sharing enabled) and paste the shareable link into the Resume / CV Link field. Including a LinkedIn or portfolio link is optional.",
  },
];

type FormErrors = Partial<
  Record<"name" | "email" | "phone" | "portfolio" | "resume", string | undefined>
>;

function Careers() {
  const [track, setTrack] = useState(tracks[0]!);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [note, setNote] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectTrackAndScroll = (selected: string) => {
    setTrack(selected);
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!/^[+\d\s().-]+$/.test(phone.trim()) || phone.replace(/\D/g, "").length < 7) {
      next.phone = "Please enter a valid phone number (at least 7 digits).";
    }
    if (!/^https?:\/\/.+/i.test(resumeUrl.trim())) {
      next.resume = "Please enter a valid Google Drive or cloud resume link (https://...).";
    }
    if (portfolio.trim() && !/^https?:\/\/.+/i.test(portfolio.trim())) {
      next.portfolio = "URL must start with https:// or http://";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await postApi("/careers", {
        subsidiarySlug: "parent",
        areaOfInterest: track,
        fullName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim() || undefined,
        resumeUrl: resumeUrl.trim(),
        portfolioUrl: portfolio.trim() || undefined,
        coverNote: note.trim() || undefined,
      });
      setSent(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not submit your application.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTrack(tracks[0]!);
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setPortfolio("");
    setNote("");
    setResumeUrl("");
    setErrors({});
    setSubmitError(null);
    setSent(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Grow with"
        accent="The Aseer Group."
        lead="We welcome applications from thoughtful, driven individuals year-round. Explore our teams across Islamabad and submit your resume directly to our talent pool."
      />

      <section className="mx-auto max-w-[1240px] px-6 pb-24">
        <Reveal>
          <p className="eyebrow">Why build with us</p>
          <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4vw,3.25rem)]">
            A culture built on <span className="serif-i text-jade">trust and ownership.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 70}>
              <SpotlightCard className="h-full rounded-[2rem] border border-border bg-card p-8">
                <p className="text-[13px] tabular-nums text-jade">{p.num}</p>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-pattern-jade border-y border-jade/10 py-24 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-jade">Where you can contribute</p>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)]">
                Five teams, <span className="serif-i text-jade">one shared standard.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Select any team below to pre-fill your area of interest and jump straight to the
              application form.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trackCards.map((item, i) => {
              const active = track === item.name;
              return (
                <Reveal key={item.name} delay={i * 50}>
                  <button
                    type="button"
                    onClick={() => selectTrackAndScroll(item.name)}
                    className={cn(
                      "group flex h-full w-full flex-col rounded-[1.75rem] border p-7 text-left transition-all duration-300 ease-apple hover:-translate-y-0.5",
                      active
                        ? "border-jade bg-white shadow-float"
                        : "border-jade/15 bg-white/80 hover:border-jade/40 hover:bg-white",
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wider text-jade">
                        <Briefcase className="size-3.5" />
                        {item.role}
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-jade" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="apply-form"
        className="mx-auto grid max-w-[1240px] scroll-mt-24 gap-12 px-6 py-24 md:grid-cols-12 md:items-start md:py-28"
      >
        <Reveal className="space-y-6 md:sticky md:top-28 md:col-span-4">
          <SpotlightCard className="rounded-[2rem] border border-jade/15 bg-pattern-jade p-8 shadow-float">
            <span className="grid size-11 place-items-center rounded-2xl bg-white text-jade shadow-xs">
              <Sparkles className="size-5" />
            </span>
            <h2 className="display mt-6 text-2xl">Talent pool</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Even when a specific role is not listed, we review every resume submitted here as
              opportunities open across our parent office and subsidiaries.
            </p>
            <div className="mt-7 space-y-4 border-t border-jade/15 pt-6 text-[14px]">
              {reviewSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[12px] font-semibold tabular-nums text-jade">
                    {s.step}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{s.title}</p>
                    <p className="text-[13px] text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 space-y-3 border-t border-jade/15 pt-6 text-[14px]">
              <div>
                <p className="eyebrow text-jade">Locations</p>
                <p className="mt-1 font-medium text-foreground">Islamabad & Remote-friendly</p>
              </div>
              <div>
                <p className="eyebrow text-jade">Resume format</p>
                <p className="mt-1 font-medium text-foreground">
                  Google Drive, Dropbox, or OneDrive link
                </p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={120} className="md:col-span-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 md:p-12">
            <div
              className={cn(
                "transition-all duration-700 ease-apple",
                sent && "pointer-events-none -translate-y-4 opacity-0 blur-sm",
              )}
            >
              <form onSubmit={submit} noValidate className="space-y-8">
                <div>
                  <p className="eyebrow">Area of interest</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tracks.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTrack(t)}
                        className={cn(
                          "rounded-full px-4 py-2 text-[14px] transition-all duration-300 active:scale-95",
                          track === t
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-secondary",
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <InputField
                    label="Full name"
                    placeholder="e.g. Hamza Tariq"
                    value={name}
                    error={errors.name}
                    onChange={(v) => {
                      setName(v);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    required
                  />
                  <InputField
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    error={errors.email}
                    onChange={(v) => {
                      setEmail(v);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    required
                  />
                  <InputField
                    label="Phone number"
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={phone}
                    error={errors.phone}
                    onChange={(v) => {
                      setPhone(v);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    required
                  />
                  <InputField
                    label="City (optional)"
                    placeholder="e.g. Islamabad"
                    value={city}
                    onChange={setCity}
                  />
                </div>

                <InputField
                  label="LinkedIn or Portfolio URL (optional)"
                  type="url"
                  placeholder="https://linkedin.com/in/your-profile"
                  value={portfolio}
                  error={errors.portfolio}
                  onChange={(v) => {
                    setPortfolio(v);
                    if (errors.portfolio) setErrors((prev) => ({ ...prev, portfolio: undefined }));
                  }}
                />

                <label className="block">
                  <span className="eyebrow">Short note (optional)</span>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Briefly share your background, key strengths, or the kind of role you are looking for..."
                    className="mt-3 w-full resize-none rounded-2xl border border-input bg-background px-5 py-4 text-[16px] outline-none transition-all duration-300 placeholder:text-muted-foreground/55 focus:border-jade focus:ring-4 focus:ring-jade/10"
                  />
                </label>

                <div>
                  <InputField
                    label="Resume / CV Link"
                    type="url"
                    placeholder="https://drive.google.com/file/d/..."
                    value={resumeUrl}
                    error={errors.resume}
                    onChange={(v) => {
                      setResumeUrl(v);
                      if (errors.resume) setErrors((prev) => ({ ...prev, resume: undefined }));
                    }}
                    required
                  />
                  <p className="mt-2 text-[12px] text-muted-foreground">
                    Upload your CV to Google Drive, Dropbox, or OneDrive with link viewing enabled
                    and paste the URL above.
                  </p>
                </div>

                {submitError && (
                  <p className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-[14px] text-destructive">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-500 ease-apple hover:bg-jade active:scale-[0.97] disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit application"}
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
              <span
                className={cn(
                  "grid size-16 place-items-center rounded-full bg-jade text-primary-foreground transition-transform delay-200 duration-700 ease-apple",
                  sent ? "scale-100" : "scale-50",
                )}
              >
                <Check className="size-7" />
              </span>
              <p className="display mt-8 text-4xl">Application received.</p>
              <p className="mt-3 max-w-md text-muted-foreground">
                Thank you, {name || "applicant"}. Your profile for{" "}
                <span className="font-medium text-foreground">{track}</span> has been submitted to
                The Aseer Group talent pool.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="u-link mt-8 text-[14px] text-jade"
              >
                Submit another application
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-32">
        <div className="grid gap-12 border-t border-border pt-20 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-jade">
              <Users className="size-4" />
              Common questions
            </span>
            <h2 className="display mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Hiring &amp; <span className="serif-i text-jade">applications.</span>
            </h2>
          </Reveal>
          <div className="divide-y divide-border md:col-span-8">
            {careerFaqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.q} className="py-5 first:pt-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 text-left"
                  >
                    <span className="text-lg font-medium tracking-tight text-foreground">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180 text-jade",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-apple",
                      isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="min-h-0 overflow-hidden text-[15px] leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  error,
  required,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string | undefined;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        maxLength={200}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mt-3 w-full rounded-2xl border bg-background px-5 py-4 text-[16px] outline-none transition-all duration-300 placeholder:text-muted-foreground/55 focus:ring-4",
          error
            ? "border-destructive/70 focus:border-destructive focus:ring-destructive/10"
            : "border-input focus:border-jade focus:ring-jade/10",
        )}
      />
      {error && <p className="mt-2 text-[13px] text-destructive">{error}</p>}
    </label>
  );
}
