import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown, Lightbulb, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SpotlightCard } from "@/components/site/Interactive";
import { FileDropzone } from "@/components/site/FileDropzone";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pitch")({
  head: () => ({
    meta: [
      { title: "Pitch a Venture | The Aseer Group" },
      {
        name: "description",
        content:
          "Pitch a startup, business concept, or strategic partnership idea to The Aseer Group leadership team.",
      },
      { property: "og:title", content: "Pitch a Venture | The Aseer Group" },
      {
        property: "og:description",
        content: "Share your business idea and proposal with The Aseer Group.",
      },
      { property: "og:url", content: "https://theaseergroup.com/pitch" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theaseergroup.com/pitch" }],
  }),
  component: Pitch,
});

const sectors = [
  "Transport & Mobility",
  "Travel & Hospitality",
  "Youth & Education",
  "Technology & Digital",
  "Social Impact",
  "Other",
];

const stages = ["Idea / Concept", "Prototype / MVP", "Early Revenue", "Scaling"];

const partnerPillars = [
  {
    num: "01",
    title: "Venture Incubation",
    text: "Turn early concepts into structured operating businesses with governance, brand credibility, and operational guidance.",
  },
  {
    num: "02",
    title: "Strategic Network",
    text: "Tap into our Islamabad headquarters, NSTP NUST innovation hub, and commercial growth capabilities through The Rise.",
  },
  {
    num: "03",
    title: "Shared Infrastructure",
    text: "Connect directly with our transport, travel, digital, and youth-program ecosystems to accelerate real-world distribution.",
  },
];

const evaluationSteps = [
  {
    step: "01",
    title: "Pitch Submission",
    text: "Share your summary and optional deck using the form below.",
  },
  {
    step: "02",
    title: "Initial Screening",
    text: "Our strategy team reviews problem-solution fit and group synergy.",
  },
  {
    step: "03",
    title: "Leadership Pitch",
    text: "Shortlisted founders present directly to Aseer Abbas and key leads.",
  },
  {
    step: "04",
    title: "Partnership Design",
    text: "We align on incubation, joint venture, or strategic support terms.",
  },
];

const pitchFaqs = [
  {
    q: "Do I need a registered company or existing revenue to pitch?",
    a: "No. We review ideas across all four stages, from early-stage concepts and prototypes to revenue-generating startups looking to scale.",
  },
  {
    q: "Is attaching a pitch deck or proposal mandatory?",
    a: "Attaching a deck is optional. A clear, thoughtful executive summary is enough to start, though a PDF or PowerPoint proposal (up to 10 MB) helps us evaluate faster.",
  },
  {
    q: "How is my idea kept confidential?",
    a: "All submissions are reviewed strictly by The Aseer Group leadership and strategy team for evaluation purposes only, and are never shared publicly.",
  },
  {
    q: "What kinds of ventures fit best with The Aseer Group?",
    a: "We prioritize practical, high-integrity businesses in mobility, travel and hospitality, youth and education, technology, and social impact across Pakistan.",
  },
];

type PitchErrors = Partial<
  Record<"name" | "email" | "phone" | "title" | "summary" | "deck", string | undefined>
>;

function Pitch() {
  const [sector, setSector] = useState(sectors[0]!);
  const [stage, setStage] = useState(stages[0]!);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [deck, setDeck] = useState<File | null>(null);
  const [errors, setErrors] = useState<PitchErrors>({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = (): boolean => {
    const next: PitchErrors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (phone.replace(/\D/g, "").length < 7) {
      next.phone = "Please enter a valid phone number.";
    }
    if (title.trim().length < 3) {
      next.title = "Please enter a title for your idea or venture.";
    }
    if (summary.trim().length < 30) {
      next.summary = "Please provide at least 30 characters describing your idea.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  const resetForm = () => {
    setSector(sectors[0]!);
    setStage(stages[0]!);
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setTitle("");
    setSummary("");
    setDeck(null);
    setErrors({});
    setSent(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Venture & Idea Pitch"
        title="Have a bold"
        accent="business idea?"
        lead="We partner with founders, operators, and thinkers building meaningful solutions for Pakistan. Learn how we evaluate ventures and submit your proposal below."
      />

      <section className="mx-auto max-w-[1240px] px-6 pb-24">
        <Reveal>
          <p className="eyebrow">How we partner</p>
          <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4vw,3.25rem)]">
            Backing ideas with <span className="serif-i text-jade">structure and reach.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {partnerPillars.map((p, i) => (
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
              <p className="eyebrow text-jade">Evaluation process</p>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)]">
                From concept to <span className="serif-i text-jade">subsidiary.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Every proposal follows a transparent four-step review with our leadership team.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {evaluationSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 60}>
                <div className="h-full rounded-[1.75rem] border border-jade/15 bg-white/85 p-7 shadow-xs">
                  <p className="text-[13px] font-semibold tabular-nums text-jade">{s.step}</p>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pitch-form"
        className="mx-auto grid max-w-[1240px] scroll-mt-24 gap-12 px-6 py-24 md:grid-cols-12 md:items-start md:py-28"
      >
        <Reveal className="space-y-6 md:sticky md:top-28 md:col-span-4">
          <SpotlightCard className="rounded-[2rem] border border-jade/15 bg-pattern-jade p-8 shadow-float">
            <span className="grid size-11 place-items-center rounded-2xl bg-white text-jade shadow-xs">
              <Lightbulb className="size-5" />
            </span>
            <h2 className="display mt-6 text-2xl">What we look for</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-jade" />
                <span>Clear real-world problem and practical execution plan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-jade" />
                <span>Alignment with integrity, service, and community impact.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-jade" />
                <span>Synergy with our transport, travel, or youth ecosystems.</span>
              </li>
            </ul>
            <div className="mt-7 flex items-start gap-3 border-t border-jade/15 pt-6 text-[13px] text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-jade" />
              <span>
                Reviewed privately by group leadership only. Your proposal is never shared
                externally.
              </span>
            </div>
            <div className="mt-6 space-y-4 border-t border-jade/15 pt-6 text-[14px]">
              <div>
                <p className="eyebrow text-jade">Accepted proposals</p>
                <p className="mt-1 font-medium text-foreground">
                  PDF, PPT, PPTX, DOC, DOCX (max 10 MB)
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
                  <p className="eyebrow">Sector / Category</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sectors.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSector(s)}
                        className={cn(
                          "rounded-full px-4 py-2 text-[14px] transition-all duration-300 active:scale-95",
                          sector === s
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-secondary",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="eyebrow">Current Stage</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stages.map((st) => (
                      <button
                        type="button"
                        key={st}
                        onClick={() => setStage(st)}
                        className={cn(
                          "rounded-full px-4 py-2 text-[14px] transition-all duration-300 active:scale-95",
                          stage === st ? "bg-jade text-white" : "bg-background hover:bg-secondary",
                        )}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <PitchField
                    label="Your full name"
                    placeholder="e.g. Usman Ali"
                    value={name}
                    error={errors.name}
                    onChange={(v) => {
                      setName(v);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    required
                  />
                  <PitchField
                    label="Email address"
                    type="email"
                    placeholder="founder@venture.pk"
                    value={email}
                    error={errors.email}
                    onChange={(v) => {
                      setEmail(v);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    required
                  />
                  <PitchField
                    label="Phone / WhatsApp"
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
                  <PitchField
                    label="City (optional)"
                    placeholder="e.g. Islamabad"
                    value={city}
                    onChange={setCity}
                  />
                </div>

                <PitchField
                  label="Venture or Idea Title"
                  placeholder="e.g. Smart Intercity Shuttle Network"
                  value={title}
                  error={errors.title}
                  onChange={(v) => {
                    setTitle(v);
                    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  required
                />

                <label className="block">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">Executive Summary</span>
                    <span className="text-[12px] tabular-nums text-muted-foreground">
                      {summary.length} / 2500
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    maxLength={2500}
                    value={summary}
                    onChange={(e) => {
                      setSummary(e.target.value);
                      if (errors.summary) setErrors((prev) => ({ ...prev, summary: undefined }));
                    }}
                    placeholder="Describe the problem you are solving, your proposed solution, target market, and what kind of support or partnership you are seeking..."
                    className={cn(
                      "mt-3 w-full resize-none rounded-2xl border bg-background px-5 py-4 text-[16px] outline-none transition-all duration-300 placeholder:text-muted-foreground/55 focus:ring-4",
                      errors.summary
                        ? "border-destructive/70 focus:border-destructive focus:ring-destructive/10"
                        : "border-input focus:border-jade focus:ring-jade/10",
                    )}
                  />
                  {errors.summary && (
                    <p className="mt-2 text-[13px] text-destructive">{errors.summary}</p>
                  )}
                </label>

                <FileDropzone
                  label="Attach Proposal or Pitch Deck (optional)"
                  hint="PDF, PPT, PPTX, DOC, or DOCX up to 10 MB"
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  maxSizeMb={10}
                  file={deck}
                  error={errors.deck}
                  onFileChange={(f, err) => {
                    setDeck(f);
                    setErrors((prev) => ({ ...prev, deck: err }));
                  }}
                />

                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-500 ease-apple hover:bg-jade active:scale-[0.97]"
                >
                  Submit pitch
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
              <p className="display mt-8 text-4xl">Pitch noted.</p>
              <p className="mt-3 max-w-md text-muted-foreground">
                Thank you, {name || "founder"}. Your pitch for{" "}
                <span className="font-medium text-foreground">{title}</span> ({sector} · {stage})
                has been prepared for our executive review.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="u-link mt-8 text-[14px] text-jade"
              >
                Submit another pitch
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-32">
        <div className="grid gap-12 border-t border-border pt-20 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-jade">
              <Lightbulb className="size-4" />
              Common questions
            </span>
            <h2 className="display mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Venture &amp; <span className="serif-i text-jade">pitch FAQ.</span>
            </h2>
          </Reveal>
          <div className="divide-y divide-border md:col-span-8">
            {pitchFaqs.map((item, i) => {
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

function PitchField({
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
