import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { businesses, company } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Aseer Group" },
      {
        name: "description",
        content:
          "Get in touch with The Aseer Group at our Islamabad headquarters for business and partnership enquiries.",
      },
      { property: "og:title", content: "Contact The Aseer Group" },
      {
        property: "og:description",
        content: "Business and partnership enquiries, Islamabad headquarters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const topics = ["General enquiry", "Business partnership", "Client services", "Careers", "Media"];

function Contact() {
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love"
        accent="to hear from you."
        lead="Whether you are a client, a partner or a potential stakeholder, our team is here to help you find the right part of the group."
      />

      <section className="mx-auto grid max-w-[1240px] gap-16 px-6 pb-32 md:grid-cols-12">
        <Reveal className="space-y-10 md:col-span-4">
          <Info label="Headquarters">
            <a
              href={company.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link inline-block"
            >
              {company.locations[0]!.address}
            </a>
          </Info>
          <Info label="Innovation & Programs Hub">{company.locations[1]!.address}</Info>
          <Info label="Telephone">
            <a href={company.phoneHref} className="u-link">
              {company.phone}
            </a>
          </Info>
          <Info label="WhatsApp">
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link"
            >
              {company.whatsapp}
            </a>
          </Info>
          <Info label="Email">
            <a href={company.emailHref} className="u-link">
              {company.email}
            </a>
          </Info>
          <Info label="Partnerships">
            Business and partnership enquiries are welcome — select “Business partnership” in the
            form.
          </Info>
        </Reveal>

        <Reveal delay={120} className="md:col-span-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-card p-8 md:p-12">
            <div
              className={cn(
                "transition-all duration-700 ease-apple",
                sent && "pointer-events-none -translate-y-4 opacity-0 blur-sm",
              )}
            >
              <form onSubmit={submit} className="space-y-8">
                <div>
                  <p className="eyebrow">Topic</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTopic(t)}
                        className={cn(
                          "rounded-full px-4 py-2 text-[14px] transition-all duration-500 ease-apple active:scale-95",
                          topic === t
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
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone (optional)" name="phone" type="tel" />
                  <Field label="Organization (optional)" name="org" />
                </div>
                <label className="block">
                  <span className="eyebrow">Message</span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    maxLength={2000}
                    className="mt-3 w-full resize-none rounded-2xl border border-input bg-background px-5 py-4 text-[16px] outline-none transition-all duration-300 focus:border-jade focus:ring-4 focus:ring-jade/10"
                  />
                </label>
                <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-500 ease-apple hover:bg-jade active:scale-[0.97]">
                  Send enquiry
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
              <p className="display mt-8 text-4xl">Thank you.</p>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Your enquiry has been noted. Our team will be in touch.
              </p>
              <button onClick={() => setSent(false)} className="u-link mt-8 text-[14px] text-jade">
                Send another
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-3 md:px-6">
        <Reveal className="overflow-hidden rounded-[2rem] md:rounded-[2.75rem]">
          <iframe
            title="The Aseer Group headquarters map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
            className="h-[460px] w-full grayscale-[0.6]"
            loading="lazy"
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-32">
        <Reveal>
          <p className="eyebrow">Reach a business directly</p>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((b, i) => (
            <Reveal key={b.slug} delay={i * 80}>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-10 bg-background p-8 transition-colors duration-500 hover:bg-jade-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  {b.logo ? (
                    <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-black/8">
                      <img
                        src={b.logo}
                        alt={`${b.name} logo`}
                        className="size-full object-contain mix-blend-multiply"
                      />
                    </div>
                  ) : (
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-jade-soft text-xs font-semibold text-jade">
                      TR
                    </div>
                  )}
                  <ArrowUpRight className="size-5 transition-transform duration-500 ease-apple group-hover:rotate-45" />
                </div>
                <div>
                  <p className="text-lg font-medium tracking-tight">{b.name}</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {b.url.replace(/^https:\/\//, "").replace(/\/$/, "")}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <div className="mt-3 text-lg leading-relaxed">{children}</div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={200}
        className="mt-3 w-full rounded-2xl border border-input bg-background px-5 py-4 text-[16px] outline-none transition-all duration-300 focus:border-jade focus:ring-4 focus:ring-jade/10"
      />
    </label>
  );
}
