import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Logo } from "@/components/site/Logo";
import { businesses, company } from "@/lib/site";
import { EnquiryCta } from "@/components/site/EnquiryCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — The Aseer Group" },
      {
        name: "description",
        content:
          "The story, business philosophy, group structure and Islamabad presence of The Aseer Group.",
      },
      { property: "og:title", content: "About The Aseer Group" },
      {
        property: "og:description",
        content: "Established on the principles of trust, excellence, and service.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const philosophy = [
  [
    "Trust first",
    "Every relationship — with clients, partners and communities — begins with honesty and transparency.",
  ],
  ["Excellence, always", "High standards in every service, with a constant drive to improve."],
  ["Owned outcomes", "We take responsibility for our decisions, our actions and their results."],
];

function About() {
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
              to Pakistan's economic and social development — building businesses that deliver
              quality services, empower individuals, support communities, and create lasting value.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-pattern-ink py-28 text-ink-foreground md:py-36">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.14em] text-ink-foreground/50">
              Business philosophy
            </p>
          </Reveal>
          <div className="mt-16 grid gap-14 md:grid-cols-3">
            {philosophy.map(([t, b], i) => (
              <Reveal key={t} delay={i * 120}>
                <div className="h-px w-12 bg-gold" />
                <p className="mt-8 text-2xl font-medium tracking-tight">{t}</p>
                <p className="mt-4 leading-relaxed text-ink-foreground/65">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
              <Reveal
                key={loc.address}
                delay={i * 100}
                className="flex flex-col justify-between rounded-[2rem] bg-background p-8 shadow-float md:p-10"
              >
                <div>
                  <p className="eyebrow text-jade">{loc.label}</p>
                  <p className="mt-4 text-xl font-medium tracking-tight md:text-2xl">
                    {loc.address}
                  </p>
                </div>
                {loc.mapUrl && (
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link mt-8 inline-flex w-fit items-center gap-2 text-[14px] text-muted-foreground hover:text-foreground"
                  >
                    <MapPin className="size-4 text-jade" />
                    Open in Google Maps
                  </a>
                )}
              </Reveal>
            ))}
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
