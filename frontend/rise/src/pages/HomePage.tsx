import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { departments, risePillars } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { SpotlightCard } from "../components/SpotlightCard";

const marqueeCapabilities = [
  "Lead Generation",
  "Corporate Visits",
  "B2B Meetings",
  "Partnerships",
  "Market Research",
  "Direct Sales",
  "Telemarketing",
  "WhatsApp Sales",
  "Conversion & Closing",
  "Inbound Calls",
  "WhatsApp Support",
  "Customer Onboarding",
  "After-Sales Care",
];

const orbitalPositions = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
];

export function HomePage() {
  usePageSeo({
    title: "The Rise | Reach · Influence · Strategy · Expansion",
    description:
      "Commercial growth, Business Development (BD), Sales Teams, and Customer Support desks under The Aseer Group in Islamabad.",
    path: "/",
  });

  const [activePillar, setActivePillar] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActivePillar((prev) => (prev + 1) % risePillars.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const currentPillar = risePillars[activePillar] ?? risePillars[0]!;

  return (
    <div className="page-in">
      {/* 1. ATMOSPHERIC R·I·S·E HALO HERO */}
      <section className="bg-halo-stage relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between overflow-hidden border-b border-border">
        {/* Ambient breathing halo blooms */}
        <div
          aria-hidden="true"
          className="halo-breathe pointer-events-none absolute -right-24 top-10 size-[460px] rounded-full bg-[radial-gradient(circle,oklch(0.44_0.165_292/16%)_0%,transparent_68%)] blur-3xl sm:size-[580px]"
        />
        <div
          aria-hidden="true"
          className="halo-breathe pointer-events-none absolute -left-28 bottom-12 size-[380px] rounded-full bg-[radial-gradient(circle,oklch(0.75_0.125_78/20%)_0%,transparent_70%)] blur-3xl sm:size-[480px]"
        />

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Typographic Command */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-plum/20 bg-white/85 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-plum opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-plum" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-plum">
                  The Aseer Group · Commercial Arm
                </span>
              </div>

              <h1 className="display mt-6 text-4xl text-foreground sm:text-5xl lg:text-[3.95rem] lg:leading-[1.03]">
                Growth{" "}
                <span className="serif-i relative inline-block font-normal text-plum">
                  engineered
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-plum/60 via-champagne to-plum/20"
                  />
                </span>{" "}
                around every client.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                The Rise unites Business Development, direct Sales Teams, and
                Customer Support into one high-precision commercial engine.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-white shadow-halo transition-all hover:-translate-y-0.5 hover:opacity-95"
                >
                  <span>Request a Growth Desk</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/departments"
                  className="inline-flex items-center gap-2 rounded-full border border-plum/20 bg-white/85 px-6 py-3.5 text-sm font-semibold text-foreground shadow-xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-plum hover:text-plum"
                >
                  <span>Explore 01–03 Desks</span>
                </Link>
              </div>

              {/* Quick Department Halo Chips */}
              <div className="mt-9 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Active Desks:
                </span>
                {departments.map((d) => (
                  <Link
                    key={d.id}
                    to={`/contact?department=${encodeURIComponent(d.name)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm transition hover:border-plum/45 hover:bg-plum-soft hover:text-plum"
                  >
                    <span className="font-mono text-[10px] font-bold text-plum">
                      {d.code}
                    </span>
                    <span>{d.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Interactive R·I·S·E Orbital Halo Engine */}
            <div
              className="relative flex flex-col items-center lg:col-span-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Floating Micro Glass Badges (desktop) */}
              <div className="halo-float pointer-events-none absolute -left-2 top-6 z-20 hidden rounded-2xl border border-plum/15 bg-white/90 px-3.5 py-2 shadow-halo backdrop-blur-md sm:flex sm:items-center sm:gap-2">
                <span className="flex size-6 items-center justify-center rounded-lg bg-plum-soft font-mono text-[11px] font-bold text-plum">
                  01
                </span>
                <span className="text-xs font-semibold text-foreground">
                  B2B &amp; Partnerships
                </span>
              </div>

              <div className="halo-float-slow pointer-events-none absolute -right-2 top-16 z-20 hidden rounded-2xl border border-champagne/40 bg-white/90 px-3.5 py-2 shadow-halo backdrop-blur-md sm:flex sm:items-center sm:gap-2">
                <span className="flex size-6 items-center justify-center rounded-lg bg-champagne/20 font-mono text-[11px] font-bold text-plum">
                  02
                </span>
                <span className="text-xs font-semibold text-foreground">
                  Direct &amp; WhatsApp Sales
                </span>
              </div>

              {/* Orbital Halo Dial */}
              <div className="relative flex size-[280px] items-center justify-center sm:size-[330px]">
                {/* Soft radial halo aura behind dial */}
                <div
                  aria-hidden="true"
                  className="halo-breathe absolute inset-3 rounded-full bg-[radial-gradient(circle,oklch(0.44_0.165_292/18%)_0%,oklch(0.75_0.125_78/14%)_45%,transparent_72%)] blur-xl"
                />

                {/* Outer Rotating Dashed Ring */}
                <div
                  aria-hidden="true"
                  className="halo-orbit absolute inset-0 rounded-full border border-dashed border-plum/25"
                />

                {/* Inner Counter-Rotating Gradient Ring */}
                <div
                  aria-hidden="true"
                  className="halo-orbit-reverse absolute inset-5 rounded-full border border-champagne/45"
                />

                {/* Static Crisp Track Ring */}
                <div
                  aria-hidden="true"
                  className="absolute inset-10 rounded-full border border-plum/15 bg-white/45 backdrop-blur-xs"
                />

                {/* 4 Interactive Orbital Nodes: R · I · S · E */}
                {risePillars.map((p, idx) => {
                  const active = idx === activePillar;
                  return (
                    <button
                      key={p.letter}
                      type="button"
                      onClick={() => setActivePillar(idx)}
                      aria-label={`${p.word}: ${p.headline}`}
                      className={`group absolute z-20 flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                        orbitalPositions[idx]
                      } ${
                        active
                          ? "size-16 border-plum bg-plum text-white shadow-halo scale-110 sm:size-[70px]"
                          : "size-14 border-plum/20 bg-white/95 text-foreground shadow-sm backdrop-blur-md hover:scale-105 hover:border-plum/50 hover:text-plum sm:size-16"
                      }`}
                    >
                      <span className="display text-xl sm:text-2xl">
                        {p.letter}
                      </span>
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-wider ${
                          active ? "text-white/85" : "text-muted-foreground"
                        }`}
                      >
                        {p.word}
                      </span>
                    </button>
                  );
                })}

                {/* Luminous Center Core */}
                <div className="halo-card relative z-10 flex size-36 flex-col items-center justify-center rounded-full text-center sm:size-44">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-plum">
                    <Sparkles className="size-3" />
                    0{activePillar + 1} / 04
                  </span>
                  <span className="display mt-1 text-4xl text-plum sm:text-5xl">
                    {currentPillar.letter}
                  </span>
                  <span className="serif-i mt-0.5 text-lg text-foreground sm:text-xl">
                    {currentPillar.word}
                  </span>
                </div>
              </div>

              {/* Floating Frosted Pillar Readout Card */}
              <div className="halo-card relative z-20 mt-8 w-full max-w-md rounded-3xl p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="eyebrow text-plum">
                    0{activePillar + 1} · {currentPillar.word}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {risePillars.map((p, idx) => (
                      <button
                        key={p.letter}
                        type="button"
                        aria-label={`Select ${p.word}`}
                        onClick={() => setActivePillar(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === activePillar
                            ? "w-6 bg-plum"
                            : "w-1.5 bg-plum/25 hover:bg-plum/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h2 className="display mt-2.5 text-lg text-foreground sm:text-xl">
                  {currentPillar.headline}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {currentPillar.detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless Capability Ticker Strip */}
        <div className="relative overflow-hidden border-t border-plum/10 bg-white/75 py-3.5 backdrop-blur-md">
          <div className="marquee-track items-center gap-8">
            {[...marqueeCapabilities, ...marqueeCapabilities].map(
              (item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-8 whitespace-nowrap"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/75">
                    {item}
                  </span>
                  <span className="size-1.5 rounded-full bg-champagne" />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 2. THREE CORE DEPARTMENTS — HALO CARDS */}
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
            to="/departments"
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
