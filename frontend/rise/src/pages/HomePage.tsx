import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import bdHeroImg from "../assets/rise-bd.jpg";
import { departments, risePillars } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { cn } from "../lib/utils";

export function HomePage() {
  usePageSeo({
    title: "The Rise | Reach · Influence · Strategy · Expansion",
    description:
      "Commercial growth, Business Development (BD), Sales Teams, and Customer Support desks under The Aseer Group in Islamabad.",
    path: "/",
  });

  const [activePillar, setActivePillar] = useState(0);
  const [pausedPillar, setPausedPillar] = useState(false);
  const [activeDeptIdx, setActiveDeptIdx] = useState(0);

  useEffect(() => {
    if (pausedPillar) return;
    const timer = window.setInterval(() => {
      setActivePillar((prev) => (prev + 1) % risePillars.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [pausedPillar]);

  const currentPillar = risePillars[activePillar] ?? risePillars[0]!;
  const currentDept = departments[activeDeptIdx] ?? departments[0]!;

  return (
    <div className="page-in">
      {/* 1. FULL-BLEED ARCHITECTURAL HERO (100svh) */}
      <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between overflow-hidden bg-plum-obsidian text-white">
        {/* Background photography + multi-stop obsidian plum scrim */}
        <img
          src={bdHeroImg}
          alt="The Rise commercial strategy boardroom in Islamabad"
          className="absolute inset-0 size-full object-cover object-center opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.14 0.045 292 / 95%) 0%, oklch(0.155 0.042 292 / 82%) 52%, oklch(0.155 0.042 292 / 52%) 100%)",
          }}
        />

        {/* Main Hero Copy */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-champagne" />
              <p className="text-[11px] font-semibold tracking-[0.2em] text-champagne uppercase">
                The Aseer Group · Commercial Growth Arm
              </p>
            </div>

            <h1 className="display mt-6 text-4xl tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
              Commercial growth,{" "}
              <span className="serif-i font-normal text-champagne">
                engineered.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              The Rise unites Business Development, direct Sales Teams, and
              Customer Support operations under one Islamabad hub.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-plum-ink shadow-float transition hover:bg-champagne hover:text-plum-ink"
              >
                <span>Request a Growth Desk</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/departments"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/14"
              >
                <span>Explore Departments</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Interactive R·I·S·E Index Bar */}
        <div
          className="relative z-10 border-t border-white/12 bg-black/25 backdrop-blur-md"
          onMouseEnter={() => setPausedPillar(true)}
          onMouseLeave={() => setPausedPillar(false)}
        >
          <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="grid items-center gap-5 lg:grid-cols-12">
              <div className="grid grid-cols-4 gap-2 lg:col-span-6">
                {risePillars.map((p, idx) => {
                  const active = idx === activePillar;
                  return (
                    <button
                      key={p.letter}
                      type="button"
                      onClick={() => setActivePillar(idx)}
                      onMouseEnter={() => setActivePillar(idx)}
                      className={cn(
                        "group relative flex items-baseline gap-2 border-b-2 pb-2.5 text-left transition-all",
                        active
                          ? "border-champagne text-white"
                          : "border-transparent text-white/45 hover:text-white/80",
                      )}
                    >
                      <span
                        className={cn(
                          "display text-xl sm:text-2xl",
                          active ? "text-champagne" : "text-white/60",
                        )}
                      >
                        {p.letter}
                      </span>
                      <span className="hidden text-xs font-medium tracking-wide sm:inline">
                        {p.word}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                key={currentPillar.letter}
                className="content-fade flex items-center justify-between gap-4 lg:col-span-6"
              >
                <p className="text-sm text-white/85">
                  <span className="mr-2 font-mono text-xs text-champagne">
                    0{activePillar + 1}
                  </span>
                  {currentPillar.headline}
                </p>
                <Link
                  to="/approach"
                  className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-champagne transition hover:underline sm:inline-flex"
                >
                  <span>Methodology</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE THREE-DESK STAGE */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-plum">Three Core Departments</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Acquire, convert, and{" "}
              <span className="serif-i font-normal text-plum">
                retain clients
              </span>
            </h2>
          </div>

          {/* Interactive Desk Switcher */}
          <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-1.5">
            {departments.map((dept, idx) => {
              const active = idx === activeDeptIdx;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setActiveDeptIdx(idx)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm",
                    active
                      ? "bg-plum text-white shadow-xs"
                      : "text-muted-foreground hover:bg-white hover:text-foreground",
                  )}
                >
                  <span className="font-mono text-[11px] opacity-80">
                    {dept.code}
                  </span>
                  <span>{dept.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Focused Editorial Stage */}
        <div
          key={currentDept.id}
          className="content-fade mt-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-float">
              <img
                src={currentDept.image}
                alt={currentDept.alt}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-plum-soft font-mono text-xs font-bold text-plum">
                {currentDept.code}
              </span>
              <span className="eyebrow">Active Department Desk</span>
            </div>

            <h3 className="display mt-4 text-3xl text-foreground sm:text-4xl">
              {currentDept.name}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {currentDept.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {currentDept.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground shadow-2xs"
                >
                  <Check className="size-3 text-plum" />
                  <span>{cap}</span>
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <Link
                to={`/contact?department=${encodeURIComponent(currentDept.name)}`}
                className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-float transition hover:opacity-90"
              >
                <span>Engage {currentDept.shortName}</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/departments"
                className="u-link text-sm font-semibold text-foreground hover:text-plum"
              >
                Compare all 3 desks
              </Link>
            </div>
          </div>
        </div>

        {/* Quick 3-Desk Strip */}
        <div className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
          {departments.map((dept, idx) => {
            const active = idx === activeDeptIdx;
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => setActiveDeptIdx(idx)}
                className={cn(
                  "rounded-2xl border p-5 text-left transition-all",
                  active
                    ? "border-plum/40 bg-plum-soft/60 shadow-xs"
                    : "border-border bg-white hover:border-plum/30",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-plum">
                    {dept.code}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-4 transition-transform",
                      active ? "text-plum" : "text-muted-foreground",
                    )}
                  />
                </div>
                <p className="mt-2 font-semibold text-foreground">
                  {dept.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {dept.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. OBSIDIAN PLUM R·I·S·E PHILOSOPHY BAND */}
      <section className="bg-plum-obsidian py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-white/12 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-champagne uppercase">
                The R·I·S·E Architecture
              </p>
              <h2 className="display mt-2 text-3xl text-white sm:text-4xl">
                Four pillars from{" "}
                <span className="serif-i font-normal text-champagne">
                  outreach to retention
                </span>
              </h2>
            </div>
            <Link
              to="/approach"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-champagne transition hover:underline"
            >
              <span>Explore interactive approach</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {risePillars.map((p, idx) => (
              <Link
                key={p.letter}
                to="/approach"
                className="group flex flex-col justify-between bg-plum-ink p-7 transition-colors hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="serif-i text-5xl text-champagne transition-transform duration-300 group-hover:scale-110">
                      {p.letter}
                    </span>
                    <span className="font-mono text-xs text-white/45">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">
                    {p.word}
                  </p>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-white">
                    {p.headline}
                  </h3>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-white/60">
                  {p.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURAL CLOSING CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-8 rounded-3xl border border-border bg-pattern-plum p-8 sm:flex-row sm:items-center sm:p-14">
          <div className="max-w-xl">
            <p className="eyebrow text-plum">Ready to Scale</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Need a dedicated{" "}
              <span className="serif-i font-normal text-plum">
                BD, Sales, or Support desk
              </span>
              ?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Tell us which department you want to activate and our Islamabad
              team will prepare a tailored commercial plan.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-plum px-7 py-4 text-sm font-semibold text-white shadow-float transition hover:opacity-90 sm:self-auto"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
