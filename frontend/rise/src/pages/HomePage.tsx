import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { departments, risePillars } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { SpotlightCard } from "../components/SpotlightCard";

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
      {/* 1. SPLIT EDITORIAL HERO + INTERACTIVE R·I·S·E PILLAR STAGE */}
      <section className="flex min-h-[calc(100svh-4.5rem)] items-center border-b border-border bg-pattern-plum py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Copy */}
            <div className="lg:col-span-6">
              <p className="eyebrow">
                The Aseer Group · Commercial Growth Arm
              </p>
              <h1 className="display mt-4 text-4xl text-foreground sm:text-5xl lg:text-[3.75rem]">
                Commercial growth,{" "}
                <span className="serif-i font-normal text-plum">
                  engineered
                </span>{" "}
                end to end.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                The Rise powers Business Development, direct Sales Teams, and
                Customer Support operations for ambitious brands across
                Pakistan.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3.5 text-sm font-semibold text-white shadow-float transition hover:opacity-90"
                >
                  <span>Request a Growth Desk</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/departments"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-plum hover:text-plum"
                >
                  <span>Explore Departments</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive R·I·S·E Stage */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="rounded-3xl border border-border bg-white p-6 shadow-float sm:p-8">
                <div className="grid grid-cols-4 gap-2">
                  {risePillars.map((p, idx) => {
                    const active = idx === activePillar;
                    return (
                      <button
                        key={p.letter}
                        type="button"
                        onClick={() => setActivePillar(idx)}
                        className={`rounded-2xl border p-3 text-left transition-all sm:p-4 ${
                          active
                            ? "border-plum bg-plum text-white shadow-sm"
                            : "border-border bg-card text-foreground hover:border-plum/40"
                        }`}
                      >
                        <span className="display block text-2xl sm:text-3xl">
                          {p.letter}
                        </span>
                        <span
                          className={`mt-1 block text-[11px] font-medium ${
                            active ? "text-white/85" : "text-muted-foreground"
                          }`}
                        >
                          {p.word}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-card/60 p-6 sm:p-7">
                  <p className="eyebrow text-plum">
                    0{activePillar + 1} · {currentPillar.word}
                  </p>
                  <h2 className="display mt-2 text-2xl text-foreground sm:text-[1.75rem]">
                    {currentPillar.headline}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {currentPillar.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE DEPARTMENTS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-plum hover:opacity-80"
          >
            <span>Compare all desks</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {departments.map((dept) => (
            <SpotlightCard
              key={dept.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-card">
                  <img
                    src={dept.image}
                    alt={dept.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-mono text-xs font-semibold text-plum shadow-xs">
                    {dept.code}
                  </span>
                </div>

                <div className="p-6 pb-0">
                  <h3 className="display text-xl text-foreground">
                    {dept.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {dept.tagline}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-border pt-4">
                    {dept.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-plum-soft text-plum">
                          <Check className="size-3" />
                        </span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-border px-6 py-4">
                <Link
                  to={`/contact?department=${encodeURIComponent(dept.name)}`}
                  className="inline-flex w-full items-center justify-between text-sm font-semibold text-plum transition group-hover:opacity-80"
                >
                  <span>Engage {dept.shortName}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 3. MINIMAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-plum/20 bg-plum-soft p-8 sm:flex-row sm:items-center sm:p-12">
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
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-plum px-6 py-3.5 text-sm font-semibold text-white shadow-float transition hover:opacity-90 sm:self-auto"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
