import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { departments, risePillars } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { SpotlightCard } from "../components/SpotlightCard";

const pillarCaptions = [
  "B2B outreach & market entry",
  "Executive pitch & authority",
  "Structured sales conversion",
  "Onboarding & retention care",
];

function PillarPattern({ index, active }: { index: number; active: boolean }) {
  const strokeClass = active ? "text-plum/25" : "text-plum/12 group-hover:text-plum/22";

  if (index === 0) {
    // Concentric quarter-arcs for Reach
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 160 160"
        className={`pointer-events-none absolute -bottom-4 -right-4 size-40 transition-colors duration-500 ${strokeClass}`}
        fill="none"
      >
        <circle cx="140" cy="140" r="36" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="140" cy="140" r="64" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="140" cy="140" r="92" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="140" cy="140" r="120" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }
  if (index === 1) {
    // Architectural diagonal facets for Influence
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 160 160"
        className={`pointer-events-none absolute -bottom-2 -right-2 size-40 transition-colors duration-500 ${strokeClass}`}
        fill="none"
      >
        <path d="M20 160 L160 20" stroke="currentColor" strokeWidth="1.25" />
        <path d="M55 160 L160 55" stroke="currentColor" strokeWidth="1.25" />
        <path d="M90 160 L160 90" stroke="currentColor" strokeWidth="1.25" />
        <path d="M125 160 L160 125" stroke="currentColor" strokeWidth="1.25" />
        <path d="M0 145 L145 0" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }
  if (index === 2) {
    // Precision geometric grid for Strategy
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 160 160"
        className={`pointer-events-none absolute -bottom-2 -right-2 size-40 transition-colors duration-500 ${strokeClass}`}
        fill="none"
      >
        <path
          d="M40 20 V160 M80 20 V160 M120 20 V160 M20 40 H160 M20 80 H160 M20 120 H160"
          stroke="currentColor"
          strokeWidth="1.1"
        />
      </svg>
    );
  }
  // Ascending architectural steps for Expansion
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className={`pointer-events-none absolute -bottom-2 -right-2 size-40 transition-colors duration-500 ${strokeClass}`}
      fill="none"
    >
      <path
        d="M16 144 H52 V108 H88 V72 H124 V36 H152"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M44 152 H80 V116 H116 V80 H152"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function HomePage() {
  usePageSeo({
    title: "The Rise | Reach · Influence · Strategy · Expansion",
    description:
      "Commercial growth, Business Development (BD), Sales Teams, and Customer Support desks under The Aseer Group in Islamabad.",
    path: "/",
  });

  const [activePillar, setActivePillar] = useState(0);

  return (
    <div className="page-in">
      {/* 1. CLEAN ARCHITECTURAL PATTERN HERO */}
      <section className="bg-hero-architectural flex min-h-[calc(100svh-4.5rem)] items-center border-b border-border py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Minimal Editorial Copy */}
            <div className="lg:col-span-5">
              <p className="eyebrow text-plum">
                The Rise · The Aseer Group
              </p>

              <h1 className="display mt-4 text-4xl text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.04]">
                Commercial growth,{" "}
                <span className="serif-i font-normal text-plum">
                  simplified.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                Business Development, Sales Teams, and Customer Support,
                structured under one roof.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-white shadow-halo transition-all hover:-translate-y-0.5 hover:opacity-95"
                >
                  <span>Request a Desk</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-plum hover:text-plum"
                >
                  <span>Explore Services</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive 2x2 Geometric Pattern Matrix */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {risePillars.map((p, idx) => {
                  const active = idx === activePillar;
                  return (
                    <button
                      key={p.letter}
                      type="button"
                      aria-pressed={active}
                      onMouseEnter={() => setActivePillar(idx)}
                      onClick={() => setActivePillar(idx)}
                      className={`group halo-card relative flex min-h-[168px] flex-col justify-between rounded-3xl p-6 text-left transition-all duration-300 sm:min-h-[196px] sm:p-7 ${
                        active ? "shadow-halo ring-1 ring-plum/30" : ""
                      }`}
                    >
                      <PillarPattern index={idx} active={active} />

                      <div className="relative z-10 flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-semibold tracking-widest transition-colors ${
                            active ? "text-plum" : "text-muted-foreground"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            active ? "w-6 bg-plum" : "w-1.5 bg-plum/25"
                          }`}
                        />
                      </div>

                      <div className="relative z-10 mt-6">
                        <div className="flex items-baseline gap-2.5">
                          <span className="display text-3xl text-plum sm:text-4xl">
                            {p.letter}
                          </span>
                          <span className="serif-i text-xl text-foreground sm:text-2xl">
                            {p.word}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                          {pillarCaptions[idx]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE DEPARTMENTS: HALO CARDS */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-14 -z-10 h-64 w-3/4 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.44_0.165_292/10%)_0%,oklch(0.75_0.125_78/10%)_50%,transparent_75%)] blur-3xl"
        />

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Three Core Departments</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Acquire, convert, and{" "}
              <span className="serif-i font-normal text-plum">
                retain clients
              </span>
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-plum/20 bg-white/85 px-4 py-2 text-sm font-semibold text-plum shadow-xs transition hover:border-plum hover:bg-plum-soft"
          >
            <span>Compare all desks</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-3">
          {departments.map((dept) => (
            <SpotlightCard
              key={dept.id}
              className="group flex flex-col justify-between rounded-3xl"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-card">
                  <img
                    src={dept.image}
                    alt={dept.alt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-3 py-1 font-mono text-xs font-semibold text-plum shadow-xs backdrop-blur-md">
                    {dept.code}
                  </span>
                </div>

                <div className="relative p-6 pb-0">
                  <span
                    aria-hidden="true"
                    className="display pointer-events-none absolute right-5 top-3 select-none text-5xl text-plum/8"
                  >
                    {dept.code}
                  </span>
                  <h3 className="display relative text-xl text-foreground">
                    {dept.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {dept.tagline}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-border/80 pt-4">
                    {dept.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-plum-soft text-plum ring-1 ring-plum/15">
                          <Check className="size-3" />
                        </span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-border/80 px-6 py-4">
                <Link
                  to={`/contact?department=${encodeURIComponent(dept.name)}`}
                  className="inline-flex w-full items-center justify-between text-sm font-semibold text-plum transition group-hover:opacity-80"
                >
                  <span>Engage {dept.shortName}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 3. R·I·S·E EXECUTION RIBBON */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="halo-card rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-plum">The R·I·S·E Cadence</p>
              <h2 className="display mt-2 text-2xl text-foreground sm:text-3xl">
                Four pillars,{" "}
                <span className="serif-i font-normal text-plum">
                  one continuous loop
                </span>
              </h2>
            </div>
            <Link
              to="/approach"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-plum hover:opacity-80"
            >
              <span>See our methodology</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {risePillars.map((p, idx) => (
              <div
                key={p.letter}
                className="group rounded-2xl border border-plum/12 bg-white/80 p-5 transition-all hover:border-plum/35 hover:bg-plum-soft/45 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="display text-2xl text-plum">{p.letter}</span>
                  <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                    0{idx + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold text-foreground">
                  {p.word}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {p.headline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LUMINOUS HALO CTA */}
      <section className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 -top-6 bottom-6 -z-10 rounded-full bg-[radial-gradient(ellipse,oklch(0.44_0.165_292/16%)_0%,oklch(0.75_0.125_78/18%)_50%,transparent_75%)] blur-3xl"
        />
        <div className="halo-card flex flex-col justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <p className="eyebrow text-plum">Ready to Scale</p>
            <h2 className="display mt-2 text-2xl text-foreground sm:text-3xl">
              Need a dedicated{" "}
              <span className="serif-i font-normal text-plum">
                BD, Sales, or Support desk
              </span>
              ?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Tell us which department you want to activate and our Islamabad
              team will prepare a tailored commercial plan.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-white shadow-halo transition hover:-translate-y-0.5 hover:opacity-95 sm:self-auto"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
