import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SpotlightCard } from "@/components/site/Interactive";
import { FileDropzone } from "@/components/site/FileDropzone";
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
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (phone.replace(/\D/g, "").length < 7) {
      next.phone = "Please enter a valid phone number.";
    }
    if (portfolio.trim() && !/^https?:\/\/.+/i.test(portfolio.trim())) {
      next.portfolio = "URL must start with https:// or http://";
    }
    if (!resume) next.resume = "Please attach your resume (PDF, DOC, or DOCX).";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  const resetForm = () => {
    setTrack(tracks[0]!);
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setPortfolio("");
    setNote("");
    setResume(null);
    setErrors({});
    setSent(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Grow with"
        accent="The Aseer Group."
        lead="We welcome applications from thoughtful, driven individuals year-round. Share your details and attach your resume for our leadership and HR team."
      />

      <section className="mx-auto grid max-w-[1240px] gap-12 px-6 pb-32 md:grid-cols-12 md:items-start">
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
            <div className="mt-8 space-y-4 border-t border-jade/15 pt-6 text-[14px]">
              <div>
                <p className="eyebrow text-jade">Locations</p>
                <p className="mt-1 font-medium text-foreground">Islamabad & Remote-friendly</p>
              </div>
              <div>
                <p className="eyebrow text-jade">Accepted formats</p>
                <p className="mt-1 font-medium text-foreground">PDF, DOC, DOCX (max 5 MB)</p>
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

                <FileDropzone
                  label="Attach Resume / CV"
                  hint="PDF, DOC, or DOCX up to 5 MB"
                  accept=".pdf,.doc,.docx"
                  maxSizeMb={5}
                  file={resume}
                  error={errors.resume}
                  onFileChange={(f, err) => {
                    setResume(f);
                    setErrors((prev) => ({ ...prev, resume: err }));
                  }}
                />

                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-500 ease-apple hover:bg-jade active:scale-[0.97]"
                >
                  Submit application
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
                <span className="font-medium text-foreground">{track}</span>
                {resume ? ` (${resume.name})` : ""} has been prepared for review.
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
