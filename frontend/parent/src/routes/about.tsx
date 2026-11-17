import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, MapPin, ShieldCheck, Sparkles, Target } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Logo } from "@/components/site/Logo";
import { SpotlightCard } from "@/components/site/Interactive";
import { businesses, company, mission, values, vision } from "@/lib/site";
import { EnquiryCta } from "@/components/site/EnquiryCta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | The Aseer Group" },
      {
        name: "description",
        content:
          "The story, business philosophy, group structure, FAQs and Islamabad presence of The Aseer Group.",
      },
      { property: "og:title", content: "About The Aseer Group" },
      {
        property: "og:description",
        content: "Established on the principles of trust, excellence, and service.",
      },
      { property: "og:url", content: "https://theaseergroup.com/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theaseergroup.com/about" }],
  }),
  component: About,
});

const philosophy = [
  {
    num: "01",
    title: "Trust first",
    body: "Every relationship, with clients, partners, and communities, begins with honesty and transparency.",
    Icon: ShieldCheck,
  },
  {
    num: "02",
    title: "Excellence, always",
    body: "High standards in every service, with a constant drive to improve and refine how we deliver.",
    Icon: Sparkles,
  },
  {
    num: "03",
    title: "Owned outcomes",
    body: "We take full responsibility for our decisions, our actions, and the results we create.",
    Icon: Target,
  },
];

const faqs = [
  {
    q: "What is The Aseer Group?",
    a: "The Aseer Group is a diversified Pakistani business group headquartered in Islamabad, built on trust, excellence, and service. It serves as the parent organization uniting four distinct subsidiaries across transport, travel and tourism, youth development, and upcoming ventures.",
  },
  {
    q: "Which businesses operate under The Aseer Group?",
    a: "The group operates four subsidiaries: Aseer Transport Services (transportation and logistics), Aseer Travel & Tours (travel management, ticketing, Hajj and Umrah, and domestic/international tours), The Leap Pakistan (youth development and practical learning), and The Rise (Reach, Influence, Strategy, Expansion: business development, sales, and customer support).",
  },
  {
    q: "How is The Leap Pakistan connected to The Aseer Group?",
    a: "The Leap Pakistan is a member of The Aseer Group with its own independent website (theleappakistan.com) and programs, including its flagship 5-day residential leadership retreat, Safar-e-Karakoram, in Hunza.",
  },
  {
    q: "Where are your offices located in Islamabad?",
    a: "Our corporate headquarters is located at Makka Heights, H-13, Islamabad, and our Innovation & Programs Hub is at the National Science & Technology Park (NSTP), NUST H-12 Campus, Islamabad.",
  },
  {
    q: "How can I partner with or enquire about a specific subsidiary?",
    a: "You can reach us directly through our Contact page, call 051-6145307, message us on WhatsApp at 0310-5850362, or email info@theaseergroup.com and our team will connect you with the right subsidiary.",
  },
];

function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built on trust."
        accent="Driven by service."
        lead="The Aseer Group is a diversified Pakistani business group established on the principles of trust, excellence, and service."
      />

      <section className="mx-auto grid max-w-[1240px] gap-12 border-t border-border px-6 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">Our story & purpose</p>
        </Reveal>
        <div className="space-y-8 text-xl leading-relaxed text-foreground/80 md:col-span-8 md:text-2xl md:leading-[1.5]">
          <Reveal>
            <p>
              The group operates through four distinct subsidiaries, each addressing a different
              sector while contributing to a shared vision of business growth, community
              development, and national progress.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-muted-foreground">
              We combine local expertise with a broader outlook, aiming to contribute meaningfully
              to Pakistan's economic and social development, building businesses that deliver
              quality services, empower individuals, support communities, and create lasting value.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-[1240px] px-6 pb-24 md:pb-32">
        <div className="grid gap-8 md:grid-cols-2">
          {[
            ["Mission", mission],
            ["Vision", vision],
          ].map(([title, body], i) => (
            <Reveal key={title} delay={i * 120}>
              <SpotlightCard className="h-full rounded-[2rem] border border-jade/15 bg-card p-10 shadow-float md:p-12">
                <p className="eyebrow text-jade">Our {title}</p>
                <p className="mt-5 text-[clamp(1.3rem,2.2vw,1.85rem)] font-medium leading-[1.35] tracking-[-0.02em] text-foreground">
                  {body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Upgraded Business Philosophy */}
      <section className="bg-pattern-jade border-y border-jade/15 py-28 text-foreground md:py-36">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-jade">Business philosophy</p>
              <h2 className="display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Principles behind <span className="serif-i text-jade">every venture.</span>
              </h2>
            </div>
            <p className="max-w-sm text-[15px] text-muted-foreground">
              Three foundational commitments that shape how we serve clients, partners, and
              communities across Pakistan.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {philosophy.map(({ num, title, body, Icon }, i) => (
              <Reveal key={title} delay={i * 100}>
                <SpotlightCard className="group flex h-full flex-col justify-between rounded-[2rem] border border-jade/15 bg-white/95 p-8 shadow-float transition-all duration-500 ease-apple hover:-translate-y-1 md:p-10">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-jade-soft text-jade transition-colors duration-300 group-hover:bg-jade group-hover:text-white">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-[13px] font-medium tabular-nums text-muted-foreground">
                        {num}
                      </span>
                    </div>
                    <h3 className="display mt-8 text-2xl md:text-3xl">{title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                  <div className="mt-8 h-0.5 w-10 rounded-full bg-jade/25 transition-all duration-500 ease-apple group-hover:w-16 group-hover:bg-jade" />
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Parent & Subsidiaries */}
      <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-36">
        <div className="grid gap-16 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">The parent & its businesses</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.5vw,4rem)]">
              One organization, <span className="serif-i text-jade">many sectors.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              The Aseer Group is the parent organization. Each subsidiary keeps its own identity and
              expertise, while sharing the group's mission, values and standards.
            </p>
          </Reveal>
          <Reveal delay={150} className="relative flex flex-col items-center md:col-span-7">
            <div className="rounded-2xl border border-border bg-card px-6 py-3 shadow-float">
              <Logo size="sm" />
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="grid w-full gap-4 sm:grid-cols-2">
              {businesses.map((b) => (
                <Link
                  key={b.slug}
                  to="/businesses/$slug"
                  params={{ slug: b.slug }}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 transition-all duration-500 ease-apple hover:-translate-y-0.5 hover:border-jade/40 hover:shadow-float"
                >
                  {b.logo ? (
                    <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-black/8">
                      <img
                        src={b.logo}
                        alt={`${b.name} logo`}
                        className="size-full object-contain mix-blend-multiply"
                      />
                    </div>
                  ) : (
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-jade-soft text-sm font-semibold text-jade">
                      TR
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[15px] font-medium">{b.name}</p>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-500 ease-apple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-jade" />
                    </div>
                    <p className="mt-1 text-[12px] text-muted-foreground">{b.sector}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-[1240px] px-6 pb-24 md:pb-32">
        <Reveal>
          <p className="eyebrow">Core values</p>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)]">
            Seven values. <span className="serif-i text-jade">Every decision.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.name} delay={(i % 4) * 60}>
              <SpotlightCard className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6">
                <span className="text-[12px] font-medium tabular-nums text-muted-foreground">
                  0{i + 1}
                </span>
                <div className="mt-5">
                  <p className="display text-2xl">{v.name}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Our Commitment */}
      <section className="mx-auto max-w-[1240px] px-6 pb-24 md:pb-32">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-jade-soft px-8 py-16 md:px-16 md:py-24">
          <p className="eyebrow text-accent-foreground">Our commitment</p>
          <p className="display mt-5 max-w-4xl text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.08] text-accent-foreground">
            Building businesses that empower individuals, support communities, and contribute
            meaningfully to{" "}
            <span className="serif-i">Pakistan's economic and social development.</span>
          </p>
        </Reveal>
      </section>

      {/* Islamabad Presence */}
      <section className="border-t border-border bg-card/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal>
            <p className="eyebrow">Our presence</p>
            <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)]">
              Rooted in <span className="serif-i text-jade">Islamabad.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {company.locations.map((loc, i) => (
              <Reveal key={loc.address} delay={i * 100}>
                <SpotlightCard className="flex h-full flex-col justify-between rounded-[2rem] border border-border bg-background p-8 shadow-float md:p-10">
                  <div>
                    <p className="eyebrow text-jade">{loc.label}</p>
                    <p className="mt-4 text-xl font-medium tracking-tight md:text-2xl">
                      {loc.address}
                    </p>
                    <p className="mt-2 text-[14px] text-muted-foreground">{loc.note}</p>
                  </div>
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link mt-8 inline-flex w-fit items-center gap-2 text-[14px] text-muted-foreground hover:text-foreground"
                  >
                    <MapPin className="size-4 text-jade" />
                    Open in Google Maps
                  </a>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-4">
            <p className="eyebrow">FAQs</p>
            <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)]">
              Common <span className="serif-i text-jade">questions.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Everything you need to know about our parent organization, subsidiaries, and Islamabad
              offices.
            </p>
          </Reveal>

          <div className="space-y-3 lg:col-span-8">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={item.q} delay={i * 60}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-all duration-300",
                      isOpen
                        ? "border-jade/35 bg-jade-soft/45 shadow-xs"
                        : "border-border bg-background hover:border-jade/25",
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-base font-medium tracking-tight md:text-lg">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-5 shrink-0 text-jade transition-transform duration-300 ease-apple",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-apple",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <EnquiryCta
        eyebrow="Work with us"
        title="Ready to"
        accent="collaborate?"
        lead="Connect with our Islamabad headquarters for group partnerships, corporate services, or media enquiries."
      />
    </>
  );
}
