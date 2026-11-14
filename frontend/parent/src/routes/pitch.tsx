import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Lightbulb } from "lucide-react";
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
        lead="We partner with founders, operators, and thinkers building meaningful solutions for Pakistan. Share your concept and attach your proposal below."
      />

      <section className="mx-auto grid max-w-[1240px] gap-12 px-6 pb-32 md:grid-cols-12 md:items-start">
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
            <div className="mt-8 space-y-4 border-t border-jade/15 pt-6 text-[14px]">
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
