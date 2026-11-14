import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, MessageCircle, Compass } from "lucide-react";
import hero from "@/assets/hero-karakoram.jpg";
import aseerAbbasImg from "@/assets/team/aseer-abbas.png";
import { businesses, company, values, mission, vision } from "@/lib/site";
import { Reveal, Words } from "@/components/site/Reveal";
import { Pill } from "@/components/site/Pill";
import { CountUp, SpotlightCard } from "@/components/site/Interactive";
import { cn } from "@/lib/utils";
import { EnquiryCta } from "@/components/site/EnquiryCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Aseer Group | One Vision, Endless Possibilities." },
      {
        name: "description",
        content:
          "A diversified Pakistani business group operating across transport, travel and tourism, youth development and upcoming ventures.",
      },
      { property: "og:title", content: "The Aseer Group | One Vision, Endless Possibilities." },
      {
        property: "og:description",
        content: "Four businesses. One shared vision for Pakistan's growth.",
      },
      { property: "og:url", content: "https://theaseergroup.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theaseergroup.com/" }],
  }),
  component: Home,
});

function Home() {
  const [heroFocus, setHeroFocus] = useState<string>("overview");
  const activeBusiness = businesses.find((b) => b.slug === heroFocus);
  const stageImage = activeBusiness?.image ?? hero;
  const stageKicker = activeBusiness
    ? `${activeBusiness.sector} · ${activeBusiness.metric}`
    : "Across Pakistan · From Islamabad to the Karakoram";
  const stageLead = activeBusiness
    ? activeBusiness.intro
    : "Connecting mobility, travel hospitality, and youth leadership under one parent group.";

  return (
    <>
      {/* Interactive Kinetic Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-6 pt-32 text-center md:pt-44">
          <p className="eyebrow fade-up">The Aseer Group · Islamabad, Pakistan</p>
          <h1 className="display mx-auto mt-6 max-w-5xl text-[clamp(3rem,8.5vw,8.25rem)]">
            <Words text="One Vision," />
            <span className="serif-i block text-jade">
              <Words text="Endless Possibilities." delay={220} />
            </span>
          </h1>
          <p
            className="fade-up mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            style={{ animationDelay: "550ms" }}
          >
            A diversified Pakistani business group built on trust, excellence, and service.
          </p>

          {/* Interactive Pillar Switcher */}
          <div
            className="fade-up mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-white/80 p-1.5 shadow-xs backdrop-blur-md"
            style={{ animationDelay: "700ms" }}
          >
            <button
              type="button"
              onClick={() => setHeroFocus("overview")}
              className={cn(
                "rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300",
                heroFocus === "overview"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Overview
            </button>
            {businesses.map((b) => (
              <button
                type="button"
                key={b.slug}
                onClick={() => setHeroFocus(b.slug)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300",
                  heroFocus === b.slug
                    ? "bg-jade text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {b.short}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Hero Stage */}
        <div
          className="fade-up mx-auto mt-10 max-w-[1440px] px-3 md:px-6"
          style={{ animationDelay: "400ms" }}
        >
          <div
            className={cn(
              "group relative h-[420px] overflow-hidden rounded-[2rem] shadow-float md:h-[540px] md:rounded-[2.75rem]",
              stageImage ? "bg-card" : "bg-pattern-jade border border-jade/15",
            )}
          >
            {stageImage ? (
              <>
                <img
                  key={stageImage}
                  src={stageImage}
                  alt={
                    activeBusiness
                      ? activeBusiness.name
                      : "Karakoram peaks rising above the clouds at dawn"
                  }
                  fetchPriority="high"
                  decoding="async"
                  className="slow-zoom size-full object-cover transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
              </>
            ) : (
              <div className="bg-pattern-jade size-full" />
            )}

            {activeBusiness?.logo && (
              <div className="absolute left-6 top-6 overflow-hidden rounded-2xl bg-white/95 p-1.5 shadow-md ring-1 ring-black/10 backdrop-blur-sm md:left-10 md:top-10">
                <img
                  src={activeBusiness.logo}
                  alt={`${activeBusiness.name} logo`}
                  className="size-12 object-contain mix-blend-multiply md:size-14"
                />
              </div>
            )}

            <div
              className={cn(
                "absolute inset-x-0 bottom-0 flex flex-col justify-between gap-6 p-6 md:flex-row md:items-end md:p-10",
                stageImage ? "text-white" : "text-foreground",
              )}
            >
              <div className="max-w-2xl">
                <p
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] backdrop-blur-md",
                    stageImage
                      ? "border-white/20 bg-white/10 text-white/90"
                      : "border-jade/20 bg-white/80 text-jade",
                  )}
                >
                  <Compass className={cn("size-3.5", stageImage ? "text-gold" : "text-jade")} />
                  {stageKicker}
                </p>
                <h2 className="display mt-4 text-2xl md:text-4xl">
                  {activeBusiness ? activeBusiness.name : "Four Ventures. One Standard."}
                </h2>
                <p
                  className={cn(
                    "mt-2 text-[15px] leading-relaxed md:text-base",
                    stageImage ? "text-white/80" : "text-muted-foreground",
                  )}
                >
                  {stageLead}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {activeBusiness ? (
                  <Link
                    to="/businesses/$slug"
                    params={{ slug: activeBusiness.slug }}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-all duration-300",
                      stageImage
                        ? "bg-white text-ink hover:bg-jade hover:text-white"
                        : "bg-primary text-primary-foreground hover:bg-jade",
                    )}
                  >
                    Explore {activeBusiness.short}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                ) : (
                  <>
                    <Pill to="/businesses">Explore our businesses</Pill>
                    <Link
                      to="/about"
                      className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[13px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
                    >
                      Our story
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement & Animated Metrics */}
      <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-40">
        <Reveal>
          <p className="display max-w-5xl text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.03em]">
            Four distinct businesses, each serving a different need,{" "}
            <span className="text-muted-foreground">
              united by one shared commitment to growth, community, and the progress of Pakistan.
            </span>
          </p>
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: 4, pad: 2, suffix: "", label: "Subsidiaries" },
            { to: 2, pad: 2, suffix: "", label: "Islamabad hubs" },
            { to: 13, pad: 2, suffix: "", label: "Travel destinations" },
            { to: 50, pad: 0, suffix: "+", label: "Cohort seats per batch" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="bg-background">
              <SpotlightCard className="group p-8 transition-all duration-500 ease-apple hover:-translate-y-0.5 hover:bg-jade-soft/35 md:p-10">
                <p className="display text-6xl transition-colors duration-300 group-hover:text-jade md:text-7xl">
                  <CountUp to={stat.to} pad={stat.pad} suffix={stat.suffix} />
                </p>
                <div className="mt-4 h-0.5 w-8 rounded-full bg-border transition-all duration-500 ease-apple group-hover:w-14 group-hover:bg-jade" />
                <p className="mt-3 text-[14px] text-muted-foreground">{stat.label}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interactive Ecosystem Explorer */}
      <EcosystemExplorer />

      {/* Businesses Bento Grid */}
      <section className="bg-card py-28 md:py-36">
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
                        alt={b.name}
                        loading="lazy"
                        decoding="async"
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
      <section className="bg-pattern-jade border-y border-jade/15 py-28 text-foreground md:py-36">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 md:grid-cols-2 md:gap-10">
          {[
            ["Mission", mission],
            ["Vision", vision],
          ].map(([t, body], i) => (
            <Reveal key={t} delay={i * 150}>
              <SpotlightCard className="h-full rounded-[2rem] border border-jade/15 bg-white/90 p-10 shadow-float backdrop-blur-sm md:p-12">
                <p className="eyebrow text-jade">Our {t}</p>
                <p className="mt-6 text-[clamp(1.35rem,2.3vw,1.95rem)] font-medium leading-[1.3] tracking-[-0.02em] text-foreground">
                  {body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <ValuesSection />

      {/* Leadership Spotlight */}
      <section className="bg-pattern-dots border-y border-border bg-card/60 py-28 md:py-36">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal>
            <SpotlightCard className="rounded-[2.5rem] border border-border bg-background shadow-float">
              <div className="grid items-center md:grid-cols-12">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary md:col-span-5 md:aspect-auto md:h-full md:min-h-[440px]">
                  <img
                    src={aseerAbbasImg}
                    alt="Aseer Abbas, Executive Director"
                    loading="lazy"
                    decoding="async"
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
                    with dignity, whether moving families safely, guiding travelers, or empowering
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
            </SpotlightCard>
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
            <Reveal key={loc.address} delay={i * 100}>
              <SpotlightCard className="flex h-full flex-col justify-between rounded-[2rem] border border-border bg-card p-8 transition-all duration-500 ease-apple hover:-translate-y-0.5 hover:shadow-float md:p-10">
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
      </section>

      {/* Commitment */}
      <section className="mx-auto max-w-[1240px] px-6 pb-28 md:pb-36">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-jade-soft px-8 py-20 md:px-20 md:py-28">
          <p className="eyebrow text-accent-foreground">Our commitment</p>
          <p className="display mt-6 max-w-4xl text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] text-accent-foreground">
            Building businesses that empower individuals, support communities, and contribute
            meaningfully to{" "}
            <span className="serif-i">Pakistan's economic and social development.</span>
          </p>
        </Reveal>
      </section>

      <EnquiryCta />
    </>
  );
}

function EcosystemExplorer() {
  const [selected, setSelected] = useState(0);
  const current = businesses[selected]!;

  return (
    <section className="bg-pattern-jade border-y border-jade/15 py-28 text-foreground md:py-36">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-jade">Interactive ecosystem</p>
            <h2 className="display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)]">
              Inspect every <span className="serif-i text-jade">pillar.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-muted-foreground">
            Select a subsidiary to explore its services, reach, and role within The Aseer Group.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-5">
            {businesses.map((b, i) => (
              <button
                type="button"
                key={b.slug}
                onClick={() => setSelected(i)}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                  selected === i
                    ? "border-jade/40 bg-white shadow-float"
                    : "border-jade/15 bg-white/60 hover:border-jade/30 hover:bg-white/90",
                )}
              >
                <div className="flex items-center gap-4">
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
                  <div>
                    <p className="text-base font-medium text-foreground">{b.name}</p>
                    <p className="text-[12px] text-muted-foreground">{b.sector}</p>
                  </div>
                </div>
                <span className="text-[12px] font-medium tabular-nums text-jade">0{i + 1}</span>
              </button>
            ))}
          </div>

          <div className="rounded-[2rem] border border-jade/15 bg-white/95 p-8 shadow-float backdrop-blur-sm md:p-10 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="eyebrow text-jade">{current.metric}</p>
                <h3 className="display mt-2 text-3xl text-foreground md:text-4xl">
                  {current.name}
                </h3>
              </div>
              <Link
                to="/businesses/$slug"
                params={{ slug: current.slug }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-jade"
              >
                Open profile
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{current.intro}</p>

            <div className="mt-8">
              <p className="eyebrow">Core offerings</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.services.slice(0, 6).map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-jade/15 bg-jade-soft/60 px-3.5 py-1.5 text-[13px] font-medium text-foreground"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const [active, setActive] = useState(0);
  const current = values[active]!;

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
          <p className="eyebrow">Core values</p>
          <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.25rem)]">
            Seven values. <span className="serif-i text-jade">Every decision.</span>
          </h2>
          <div className="mt-8 rounded-3xl border border-jade/20 bg-jade-soft/55 p-7 transition-all duration-500">
            <p className="eyebrow text-jade">
              0{active + 1} · {current.name}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/85">{current.text}</p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {values.map((v, i) => (
            <Reveal key={v.name} delay={(i % 4) * 60}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex h-full w-full flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-300 ease-apple",
                  active === i
                    ? "border-jade bg-jade-soft/75 shadow-float"
                    : "border-border bg-background hover:-translate-y-0.5 hover:border-jade/35 hover:bg-card",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium tabular-nums text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "size-2 rounded-full bg-jade transition-transform duration-300",
                      active === i ? "scale-100" : "scale-0",
                    )}
                  />
                </div>
                <div className="mt-6">
                  <p className="display text-2xl">{v.name}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
