import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero-karakoram.jpg";
import { businesses } from "@/lib/site";
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

const heroSlides = [
  { key: "overview", label: "Overview", image: hero },
  ...businesses.map((b) => ({
    key: b.slug,
    label: b.short,
    image: b.image ?? hero,
  })),
];

function Home() {
  const [heroFocus, setHeroFocus] = useState<string>("overview");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroFocus((prev) => {
        const idx = heroSlides.findIndex((s) => s.key === prev);
        const nextIdx = (idx + 1) % heroSlides.length;
        return heroSlides[nextIdx]?.key ?? "overview";
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [heroFocus]);

  const activeSlide = heroSlides.find((s) => s.key === heroFocus) ?? heroSlides[0]!;
  const activeBusiness = businesses.find((b) => b.slug === heroFocus);

  return (
    <>
      {/* 1. Light Editorial Hero with 5s Auto-Cycling Backdrop Images */}
      <section className="relative overflow-hidden bg-background">
        {/* Background Image Layer */}
        <div className="pointer-events-none absolute inset-0">
          {heroSlides.map((slide) => {
            const isActive = activeSlide.key === slide.key;
            return (
              <img
                key={slide.key}
                src={slide.image}
                alt={slide.label}
                fetchPriority={slide.key === "overview" ? "high" : "auto"}
                decoding="async"
                style={{
                  opacity: isActive ? 0.58 : 0,
                  zIndex: isActive ? 1 : 0,
                }}
                className="absolute inset-0 size-full object-cover will-change-[opacity] transition-opacity duration-700 ease-apple"
              />
            );
          })}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(252,250,246,0.9) 0%, rgba(252,250,246,0.62) 65%, rgba(252,250,246,0.82) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 pb-20 pt-32 text-center md:pb-24 md:pt-44">
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
            className="fade-up mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-white/85 p-1.5 shadow-xs backdrop-blur-md"
            style={{ animationDelay: "700ms" }}
          >
            {heroSlides.map((slide) => (
              <button
                type="button"
                key={slide.key}
                onClick={() => setHeroFocus(slide.key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300",
                  heroFocus === slide.key
                    ? slide.key === "overview"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-jade text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {slide.label}
              </button>
            ))}
          </div>

          <div className="fade-up mt-7 flex flex-wrap items-center justify-center gap-3">
            {activeBusiness ? (
              <Pill to={`/businesses/${activeBusiness.slug}`}>
                Explore {activeBusiness.short}
              </Pill>
            ) : (
              <>
                <Pill to="/businesses">Explore our businesses</Pill>
                <Pill
                  to="/about"
                  variant="ghost"
                  className="border-foreground/20 bg-white/95 text-foreground shadow-xs backdrop-blur-sm hover:border-jade hover:bg-jade hover:text-white"
                >
                  Our story
                </Pill>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. Light, Airy Key Figures Strip */}
      <section className="mx-auto max-w-[1240px] px-6 py-14 md:py-16">
        <div className="grid grid-cols-2 gap-6 border-y border-border/70 py-10 lg:grid-cols-4">
          {[
            { to: 4, pad: 2, suffix: "", label: "Subsidiaries" },
            { to: 2, pad: 2, suffix: "", label: "Islamabad hubs" },
            { to: 13, pad: 2, suffix: "", label: "Travel destinations" },
            { to: 50, pad: 0, suffix: "+", label: "Cohort seats per batch" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60} className="text-center lg:text-left">
              <p className="display text-4xl text-foreground md:text-5xl">
                <CountUp to={stat.to} pad={stat.pad} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[13px] text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Lightened Interactive Ecosystem Explorer */}
      <EcosystemExplorer />

      {/* 4. Businesses Bento Grid */}
      <section className="bg-card py-24 md:py-32">
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
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {businesses.map((b, i) => (
              <Reveal key={b.slug} delay={i * 100}>
                <Link
                  to="/businesses/$slug"
                  params={{ slug: b.slug }}
                  className="group relative flex h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] bg-background p-8 shadow-float transition-transform duration-700 ease-apple hover:-translate-y-1 md:h-[480px]"
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
                      <h3 className="display text-2xl md:text-[1.7rem] lg:text-[1.95rem]">
                        {b.name}
                      </h3>
                      <span
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-full transition-all duration-500 ease-apple group-hover:rotate-45",
                          b.image ? "bg-background/20 backdrop-blur" : "bg-secondary",
                        )}
                      >
                        <ArrowUpRight className="size-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnquiryCta />
    </>
  );
}

function EcosystemExplorer() {
  const [selected, setSelected] = useState(0);
  const current = businesses[selected]!;

  return (
    <section className="bg-pattern-jade border-y border-jade/15 py-20 text-foreground md:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <p className="eyebrow text-jade">Interactive ecosystem</p>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3.25rem)]">
            Inspect every <span className="serif-i text-jade">pillar.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-2.5 lg:col-span-5">
            {businesses.map((b, i) => (
              <button
                type="button"
                key={b.slug}
                onClick={() => setSelected(i)}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                  selected === i
                    ? "border-jade/40 bg-white shadow-float"
                    : "border-jade/15 bg-white/65 hover:border-jade/30 hover:bg-white/90",
                )}
              >
                <div className="flex items-center gap-3.5">
                  {b.logo ? (
                    <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-black/8">
                      <img
                        src={b.logo}
                        alt={`${b.name} logo`}
                        className="size-full object-contain mix-blend-multiply"
                      />
                    </div>
                  ) : (
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-jade-soft text-xs font-semibold text-jade">
                      TR
                    </div>
                  )}
                  <div>
                    <p className="text-[15px] font-medium text-foreground">{b.name}</p>
                    <p className="text-[12px] text-muted-foreground">{b.sector}</p>
                  </div>
                </div>
                <span className="text-[12px] font-medium tabular-nums text-jade">0{i + 1}</span>
              </button>
            ))}
          </div>

          <SpotlightCard className="flex flex-col justify-between rounded-[2rem] border border-jade/15 bg-white/95 p-7 shadow-float backdrop-blur-sm md:p-9 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                  <p className="eyebrow text-jade">{current.metric}</p>
                  <h3 className="display mt-1.5 text-2xl text-foreground md:text-3xl">
                    {current.name}
                  </h3>
                </div>
                <Link
                  to="/businesses/$slug"
                  params={{ slug: current.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-jade"
                >
                  Open profile
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {current.services.slice(0, 5).map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-jade/15 bg-jade-soft/60 px-3.5 py-1.5 text-[13px] font-medium text-foreground"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
