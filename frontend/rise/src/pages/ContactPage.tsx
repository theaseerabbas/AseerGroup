import { useEffect, useState, type FormEvent } from "react";
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
import { submitRiseInquiry } from "../lib/api";
import { riseContact } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { PlumSelect } from "../components/PlumSelect";
import { SpotlightCard } from "../components/SpotlightCard";
import { cn } from "../lib/utils";

const departmentOptions = [
  {
    value: "Business Development (BD)",
    label: "Business Development (BD)",
    hint: "Lead generation, corporate visits, B2B meetings & research",
  },
  {
    value: "Sales Team",
    label: "Sales Team",
    hint: "Direct sales, telemarketing, WhatsApp sales & closing",
  },
  {
    value: "Customer Support",
    label: "Customer Support",
    hint: "Inbound calls, WhatsApp support, onboarding & after-sales",
  },
  {
    value: "Full R·I·S·E Revenue Pod",
    label: "Full R·I·S·E Revenue Pod",
    hint: "Combined BD + Sales + Customer Support desk",
  },
];

const modelOptions = [
  { value: "Dedicated Department Pod", label: "Dedicated Department Pod" },
  { value: "Full R·I·S·E Revenue Desk", label: "Full R·I·S·E Revenue Desk" },
  { value: "Targeted Growth Sprint", label: "Targeted Growth Sprint" },
];

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
    errs.message = "Please describe your goals or service needs (at least 10 characters).";
  }
  return errs;
}

const inputBaseClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2";

export function ContactPage() {
  usePageSeo({
    title: "Request a Growth Desk | The Rise",
    description:
      "Connect with The Rise in Islamabad for Business Development, Sales Team, and Customer Support services.",
    path: "/contact",
  });

  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState(departmentOptions[0]!.value);
  const [engagementModel, setEngagementModel] = useState(modelOptions[0]!.value);
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const paramDept = searchParams.get("department");
    if (paramDept && departmentOptions.some((d) => d.value === paramDept)) {
      setDepartment(paramDept);
    }
  }, [searchParams]);

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
      await submitRiseInquiry({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        department,
        engagementModel,
        message: message.trim(),
      });
      setStatus("success");
      setFullName("");
      setPhone("");
      setEmail("");
      setCompany("");
      setMessage("");
      setTouched({});
      setFieldErrors({});
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Unable to send your request right now. Please message us on WhatsApp or call our desk.",
      );
    }
  }

  return (
    <div className="page-in">
      <section className="bg-plum-obsidian py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            <p className="text-[11px] font-semibold tracking-[0.2em] text-champagne uppercase">
              Commercial Desk
            </p>
          </div>
          <h1 className="display mt-4 text-3xl text-white sm:text-5xl">
            Engage{" "}
            <span className="serif-i font-normal text-champagne">The Rise</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            Select the department you want to activate and share a quick brief.
            Our Islamabad team will follow up with a clear rollout plan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-9">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-plum-soft text-plum">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h2 className="display mt-5 text-2xl text-foreground">
                    Request received
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out to The Rise. Our commercial growth
                    lead will review your brief and get in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full bg-plum px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Send Another Inquiry
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
                        placeholder="Bilal Ahmed"
                        className={cn(
                          inputBaseClass,
                          touched.fullName && fieldErrors.fullName
                            ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                            : "border-border focus:border-plum focus:ring-plum/15",
                        )}
                      />
                      {touched.fullName && fieldErrors.fullName && (
                        <p className="mt-1.5 text-xs text-destructive">
                          {fieldErrors.fullName}
                        </p>
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
                            : "border-border focus:border-plum focus:ring-plum/15",
                        )}
                      />
                      {touched.phone && fieldErrors.phone && (
                        <p className="mt-1.5 text-xs text-destructive">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Work Email *
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
                            : "border-border focus:border-plum focus:ring-plum/15",
                        )}
                      />
                      {touched.email && fieldErrors.email && (
                        <p className="mt-1.5 text-xs text-destructive">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Company / Brand (Optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Pvt Ltd"
                        className={cn(
                          inputBaseClass,
                          "border-border focus:border-plum focus:ring-plum/15",
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="department"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Department / Service
                      </label>
                      <PlumSelect
                        id="department"
                        value={department}
                        onChange={setDepartment}
                        options={departmentOptions}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="engagementModel"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Engagement Model
                      </label>
                      <PlumSelect
                        id="engagementModel"
                        value={engagementModel}
                        onChange={setEngagementModel}
                        options={modelOptions}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Goals &amp; Requirements *
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
                      placeholder="Tell us about your product/service, target market, call volume, or support channels..."
                      className={cn(
                        inputBaseClass,
                        touched.message && fieldErrors.message
                          ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                          : "border-border focus:border-plum focus:ring-plum/15",
                      )}
                    />
                    {touched.message && fieldErrors.message && (
                      <p className="mt-1.5 text-xs text-destructive">
                        {fieldErrors.message}
                      </p>
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                    <span>
                      {status === "submitting"
                        ? "Sending Inquiry..."
                        : "Submit Inquiry"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <SpotlightCard className="rounded-3xl border border-plum/20 bg-plum-soft p-7">
              <p className="eyebrow">Direct Growth Desk</p>
              <h2 className="display mt-2 text-2xl text-foreground">
                Speak with our team
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer a quick discovery call? Connect directly with our
                Islamabad commercial operations desk.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={riseContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-plum hover:text-plum"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <MessageCircle className="size-4 text-plum" />
                    <span>WhatsApp: {riseContact.whatsapp}</span>
                  </span>
                  <ExternalLink className="size-3.5 text-muted-foreground" />
                </a>

                <a
                  href={riseContact.phoneHref}
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-plum hover:text-plum"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Phone className="size-4 text-plum" />
                    <span>Desk: {riseContact.phone}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Alt: {riseContact.altPhone}
                  </span>
                </a>

                <a
                  href={riseContact.emailHref}
                  className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground shadow-xs transition hover:border-plum hover:text-plum"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Mail className="size-4 text-plum" />
                    <span>{riseContact.email}</span>
                  </span>
                </a>
              </div>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-border bg-white p-7 shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-plum" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Islamabad Head Office
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {riseContact.headOffice}
                  </p>
                  <a
                    href={riseContact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-plum hover:underline"
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
