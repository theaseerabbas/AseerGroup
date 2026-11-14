import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, MessageCircle } from "lucide-react";
import hero from "@/assets/hero-karakoram.jpg";
import aseerAbbasImg from "@/assets/team/aseer-abbas.png";
import { businesses, company, values, mission, vision } from "@/lib/site";
import { Reveal, Words } from "@/components/site/Reveal";
import { Pill } from "@/components/site/Pill";
import { cn } from "@/lib/utils";
import { EnquiryCta } from "@/components/site/EnquiryCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Aseer Group — One Vision, Endless Possibilities." },
      {
        name: "description",
        content:
          "A diversified Pakistani business group operating through four subsidiaries across transport, travel and tourism, youth development and more.",
      },
      { property: "og:title", content: "The Aseer Group — One Vision, Endless Possibilities." },
      {
        property: "og:description",
        content: "Four businesses. One shared vision for Pakistan's growth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-6 pt-36 text-center md:pt-48">
          <p className="eyebrow fade-up">The Aseer Group · Islamabad, Pakistan</p>
          <h1 className="display mx-auto mt-7 max-w-5xl text-[clamp(3rem,9vw,8.5rem)]">
            <Words text="One Vision," />
            <span className="serif-i block text-jade">
              <Words text="Endless Possibilities." delay={220} />
            </span>
          </h1>
          <p
            className="fade-up mx-auto mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            style={{ animationDelay: "600ms" }}
          >
            A diversified Pakistani business group, built on trust, excellence and service.
          </p>
          <div
            className="fade-up mt-10 flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "750ms" }}
          >
            <Pill to="/businesses">Explore our businesses</Pill>
            <Pill to="/about" variant="ghost">
              Our story
            </Pill>
          </div>
        </div>
        <div
          className="fade-up mx-auto mt-20 max-w-[1440px] px-3 md:px-6"
          style={{ animationDelay: "400ms" }}
        >
          <div className="group relative overflow-hidden rounded-[2rem] shadow-float md:rounded-[2.75rem]">
            <img
              src={hero}
              alt="Karakoram peaks rising above the clouds at dawn"
              width={1920}
              height={1088}
              className="slow-zoom aspect-[16/10] w-full object-cover md:aspect-[21/9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-6 text-white md:flex-row md:items-end md:p-10">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                  Across Pakistan · From Islamabad to the Karakoram
                </p>
                <p className="mt-2 max-w-xl text-base font-medium leading-snug md:text-xl">
                  Connecting mobility, travel hospitality, and youth leadership under one parent
                  group.
                </p>
              </div>
              <Link
                to="/businesses/$slug"
                params={{ slug: "the-leap" }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2.5 text-[13px] font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-ink"
              >
                Explore Safar-e-Karakoram
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-[1240px] px-6 py-32 md:py-48">
        <Reveal>
          <p className="display max-w-5xl text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.03em]">
            Four distinct businesses, each serving a different need —{" "}
            <span className="text-muted-foreground">
              united by one shared commitment to growth, community and the progress of Pakistan.
            </span>
          </p>
        </Reveal>
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["04", "Subsidiaries"],
            ["02", "Islamabad hubs"],
            ["13", "Travel destinations"],
            ["05", "Learning modules"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 90} className="bg-background p-8 md:p-10">
              <p className="display text-6xl md:text-7xl">{n}</p>
              <p className="mt-3 text-[14px] text-muted-foreground">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Businesses */}
      <section className="bg-card py-32 md:py-40">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Our businesses</p>
              <h2 className="display mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)]">
                One group. <span className="serif-i text-jade">Four directions.</span>
              </h2>
            </div>
            <Pill to="/businesses" variant="link">
              View all businesses
            </Pill>
          </Reveal>
          <div className="mt-16 grid gap-5 md:grid-cols-6">
            {businesses.map((b, i) => (
              <Reveal
                key={b.slug}
                delay={i * 100}
                className={cn(
                  i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2",
                  i === 2 && "md:col-span-3",
                  i === 3 && "md:col-span-3",
                )}
              >
                <Link
                  to="/businesses/$slug"
                  params={{ slug: b.slug }}
                  className="group relative flex h-[440px] flex-col justify-end overflow-hidden rounded-[2rem] bg-background p-8 shadow-float transition-transform duration-700 ease-apple hover:-translate-y-1 md:h-[520px]"
                >
                  {b.image ? (
                    <>
                      <img
                        src={b.image}
                        alt=""
                        loading="lazy"
                        width={1280}
                        height={960}
                        className="absolute inset-0 size-full object-cover transition-transform duration-[1.6s] ease-apple group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/25 to-ink/10" />
                    </>
                  ) : (
                    <div className="bg-pattern-dots absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,var(--jade-soft),transparent_60%)]" />
                  )}
                  {b.logo && (
                    <div className="absolute left-7 top-7 z-10 overflow-hidden rounded-2xl bg-white/95 p-1.5 shadow-sm ring-1 ring-black/8 backdrop-blur-sm">
                      <img
                        src={b.logo}
                        alt={`${b.name} logo`}
                        className="size-11 object-contain mix-blend-multiply"
                      />
                    </div>
                  )}
                  <div
                    className={cn("relative", b.image ? "text-ink-foreground" : "text-foreground")}
                  >
                    <p
                      className={cn(
                        "text-[12px] uppercase tracking-[0.14em]",
                        b.image ? "opacity-75" : "text-muted-foreground",
                      )}
                    >
                      {b.sector}
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-4">
                      <h3 className="display text-4xl md:text-5xl">{b.name}</h3>
                      <span
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-full transition-all duration-500 ease-apple group-hover:rotate-45",
                          b.image ? "bg-background/20 backdrop-blur" : "bg-secondary",
                        )}
                      >
                        <ArrowUpRight className="size-5" />
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-4 max-w-md text-[15px] leading-relaxed",
                        b.image ? "opacity-85" : "text-muted-foreground",
                      )}
                    >
                      {b.intro}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-pattern-ink py-32 text-ink-foreground md:py-44">
        <div className="mx-auto grid max-w-[1240px] gap-20 px-6 md:grid-cols-2 md:gap-16">
          {[
            ["Mission", mission],
            ["Vision", vision],
          ].map(([t, body], i) => (
            <Reveal key={t} delay={i * 150}>
              <p className="text-[12px] uppercase tracking-[0.14em] text-ink-foreground/50">
                Our {t}
              </p>
              <p className="mt-8 text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.25] tracking-[-0.02em]">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <ValuesSection />

      {/* Leadership Spotlight */}
      <section className="bg-pattern-dots border-y border-border bg-card/60 py-28 md:py-36">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="overflow-hidden rounded-[2.5rem] border border-border bg-background shadow-float">
            <div className="grid items-center md:grid-cols-12">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary md:col-span-5 md:aspect-auto md:h-full md:min-h-[440px]">
                <img
                  src={aseerAbbasImg}
                  alt="Aseer Abbas — Executive Director"
                  loading="lazy"
                  className="size-full object-cover object-top transition-transform duration-[1.6s] ease-apple hover:scale-105"
                />
              </div>
              <div className="p-8 md:col-span-7 md:p-14">
                <p className="eyebrow text-jade">Group Leadership</p>
                <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)]">Aseer Abbas</h2>
                <p className="mt-1.5 text-[15px] font-medium text-muted-foreground">
                  Executive Director, The Aseer Group
                </p>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
                  “Our goal is simple: build trustworthy Pakistani enterprises that serve people
                  with dignity — whether moving families safely, guiding travelers, or empowering
                  young leaders.”
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Pill to="/leadership">Meet the leadership team</Pill>
                  <Pill to="/about" variant="ghost">
                    Our philosophy
                  </Pill>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Islamabad Hubs */}
      <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-36">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Where we operate</p>
            <h2 className="display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)]">
              Two hubs in <span className="serif-i text-jade">Islamabad.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium transition-colors hover:border-jade/50 hover:text-jade"
            >
              <Phone className="size-3.5 text-jade" />
              {company.phone}
            </a>
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium transition-colors hover:border-jade/50 hover:text-jade"
            >
              <MessageCircle className="size-3.5 text-jade" />
              WhatsApp: {company.whatsapp}
            </a>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {company.locations.map((loc, i) => (
            <Reveal
              key={loc.address}
              delay={i * 100}
              className="flex flex-col justify-between rounded-[2rem] border border-border bg-card p-8 transition-all duration-500 ease-apple hover:-translate-y-0.5 hover:shadow-float md:p-10"
            >
              <div>
                <p className="eyebrow text-jade">{loc.label}</p>
                <p className="mt-4 text-xl font-medium tracking-tight md:text-2xl">{loc.address}</p>
              </div>
              {loc.mapUrl ? (
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link mt-8 inline-flex w-fit items-center gap-2 text-[14px] text-muted-foreground hover:text-foreground"
                >
                  <MapPin className="size-4 text-jade" />
                  View on Google Maps
                </a>
              ) : (
                <p className="mt-8 text-[14px] text-muted-foreground">
                  National Science & Technology Park · Programs & Innovation
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section className="mx-auto max-w-[1240px] px-6 pb-32 md:pb-44">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-jade-soft px-8 py-20 md:px-20 md:py-28">
          <p className="eyebrow text-accent-foreground">Our commitment</p>
          <p className="display mt-6 max-w-4xl text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] text-accent-foreground">
            Building businesses that empower individuals, support communities and contribute
            meaningfully to{" "}
            <span className="serif-i">Pakistan's economic and social development.</span>
          </p>
        </Reveal>
      </section>

      <EnquiryCta />
    </>
  );
}

function ValuesSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-32 md:py-44">
      <div className="grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">Core values</p>
          <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
            Seven values. <span className="serif-i text-jade">Every decision.</span>
          </h2>
          <div className="relative mt-12 hidden h-40 md:block">
            {values.map((v, i) => (
              <p
                key={v.name}
                className={cn(
                  "absolute inset-0 text-xl leading-relaxed text-muted-foreground transition-all duration-700 ease-apple",
                  active === i
                    ? "translate-y-0 opacity-100 blur-0"
                    : "translate-y-3 opacity-0 blur-sm",
                )}
              >
                {v.text}
              </p>
            ))}
          </div>
        </Reveal>
        <ol className="md:col-span-7">
          {values.map((v, i) => (
            <Reveal as="li" key={v.name} delay={i * 60}>
              <button
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-baseline gap-6 border-b border-border py-5 text-left md:py-6"
              >
                <span className="w-8 text-[13px] tabular-nums text-muted-foreground">0{i + 1}</span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "display block text-[clamp(1.75rem,3.5vw,3rem)] transition-all duration-500 ease-apple",
                      active === i
                        ? "translate-x-2 text-foreground"
                        : "text-foreground/25 group-hover:text-foreground/60",
                    )}
                  >
                    {v.name}
                  </span>
                  <span
                    className={cn(
                      "grid transition-all duration-500 ease-apple md:hidden",
                      active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="min-h-0 overflow-hidden pt-2 text-[15px] text-muted-foreground">
                      {v.text}
                    </span>
                  </span>
                </span>
                <span
                  className={cn(
                    "size-2 rounded-full bg-jade transition-all duration-500 ease-apple",
                    active === i ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  )}
                />
              </button>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
