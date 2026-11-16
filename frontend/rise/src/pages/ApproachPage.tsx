import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { risePillars } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { cn } from "../lib/utils";

const onboardingSteps = [
  {
    step: "01",
    title: "Discovery & Script Alignment",
    text: "We review your offer, target customer profile, pricing tiers, and brand tone.",
  },
  {
    step: "02",
    title: "Desk & Channel Setup",
    text: "Dedicated BD outreach lists, WhatsApp sales flows, and inbound support queues go live.",
  },
  {
    step: "03",
    title: "Daily Execution & Follow-Ups",
    text: "Corporate visits, telemarketing calls, and live customer care run on structured SLAs.",
  },
  {
    step: "04",
    title: "Weekly Pipeline Reporting",
    text: "Clear visibility into leads generated, meetings booked, deals closed, and tickets resolved.",
  },
];

export function ApproachPage() {
  usePageSeo({
    title: "The R·I·S·E Approach | Reach, Influence, Strategy, Expansion",
    description:
      "How The Rise executes Reach, Influence, Strategy, and Expansion to deliver measurable B2B growth and client retention.",
    path: "/approach",
  });

  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const currentStep = onboardingSteps[activeStepIdx] ?? onboardingSteps[0]!;

  return (
    <div className="page-in">
      {/* 1. EDITORIAL HEADER */}
      <section className="bg-plum-obsidian py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            <p className="text-[11px] font-semibold tracking-[0.2em] text-champagne uppercase">
              Operating Philosophy
            </p>
          </div>
          <h1 className="display mt-4 text-3xl text-white sm:text-5xl lg:text-6xl">
            Reach. Influence.{" "}
            <span className="serif-i font-normal text-champagne">
              Strategy. Expansion.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            Every engagement follows a disciplined four-pillar methodology
            connecting pipeline creation directly to long-term customer care.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE EXPANDING BLADES (R · I · S · E) */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-plum">Interactive Framework</p>
            <h2 className="display mt-2 text-2xl text-foreground sm:text-3xl">
              Select a pillar to inspect
            </h2>
          </div>
          <div className="flex gap-2">
            {risePillars.map((p, idx) => (
              <button
                key={p.letter}
                type="button"
                onClick={() => setActivePillarIdx(idx)}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full font-mono text-xs font-bold transition-all",
                  activePillarIdx === idx
                    ? "bg-plum text-white shadow-xs"
                    : "border border-border bg-white text-muted-foreground hover:border-plum/50 hover:text-plum",
                )}
              >
                {p.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Expanding Architectural Blades */}
        <div className="flex flex-col gap-3 lg:h-[430px] lg:flex-row">
          {risePillars.map((p, idx) => {
            const active = idx === activePillarIdx;
            return (
              <button
                key={p.letter}
                type="button"
                onClick={() => setActivePillarIdx(idx)}
                onMouseEnter={() => setActivePillarIdx(idx)}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active
                    ? "border-plum-ink bg-plum-obsidian text-white shadow-float lg:flex-[2.6]"
                    : "border-border bg-white text-foreground hover:border-plum/40 lg:flex-1",
                )}
              >
                {/* Giant watermark letter */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "serif-i pointer-events-none absolute -bottom-6 right-4 select-none text-[9rem] leading-none transition-all duration-500",
                    active
                      ? "text-white/[0.06] opacity-100"
                      : "text-plum/[0.05] opacity-70",
                  )}
                >
                  {p.letter}
                </span>

                {/* Top index + letter */}
                <div className="relative z-10 flex w-full items-center justify-between">
                  <span
                    className={cn(
                      "serif-i text-4xl transition-colors duration-300 sm:text-5xl",
                      active ? "text-champagne" : "text-plum",
                    )}
                  >
                    {p.letter}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold",
                      active ? "text-white/60" : "text-muted-foreground",
                    )}
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="relative z-10 mt-8">
                  <p
                    className={cn(
                      "text-xs font-semibold tracking-[0.18em] uppercase",
                      active ? "text-champagne" : "text-muted-foreground",
                    )}
                  >
                    {p.word}
                  </p>

                  {active ? (
                    <div className="content-fade mt-3 max-w-md">
                      <h3 className="display text-2xl text-white sm:text-[1.75rem]">
                        {p.headline}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                        {p.detail}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-foreground/80">
                      {p.headline}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE EXECUTION CADENCE STEPPER */}
      <section className="border-t border-border bg-pattern-plum py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-plum">Execution Cadence</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
                Four steps to{" "}
                <span className="serif-i font-normal text-plum">launch</span>
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 self-start rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-float transition hover:opacity-90 sm:self-auto"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Connected Progress Rail */}
          <div className="mt-10 rounded-3xl border border-border bg-white p-6 shadow-float sm:p-10">
            <div className="grid gap-3 sm:grid-cols-4">
              {onboardingSteps.map((s, idx) => {
                const isCurrent = idx === activeStepIdx;
                const isDone = idx < activeStepIdx;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActiveStepIdx(idx)}
                    className={cn(
                      "group rounded-2xl border p-4 text-left transition-all",
                      isCurrent
                        ? "border-plum bg-plum-soft/70 shadow-xs"
                        : isDone
                          ? "border-plum/30 bg-white"
                          : "border-border bg-white hover:border-plum/30",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "inline-flex size-8 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors",
                          isCurrent
                            ? "bg-plum text-white"
                            : isDone
                              ? "bg-plum-soft text-plum"
                              : "bg-card text-muted-foreground",
                        )}
                      >
                        {isDone ? <CheckCircle2 className="size-4" /> : s.step}
                      </span>
                      <span
                        className={cn(
                          "h-1 w-10 rounded-full transition-colors",
                          isCurrent || isDone ? "bg-plum" : "bg-border",
                        )}
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {s.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Step Stage */}
            <div
              key={currentStep.step}
              className="content-fade mt-8 flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card/70 p-6 sm:flex-row sm:items-center sm:p-8"
            >
              <div className="max-w-xl">
                <p className="font-mono text-xs font-semibold tracking-widest text-plum uppercase">
                  Phase {currentStep.step} of 04
                </p>
                <h3 className="display mt-2 text-2xl text-foreground sm:text-3xl">
                  {currentStep.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {currentStep.text}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStepIdx((prev) =>
                      prev === 0 ? onboardingSteps.length - 1 : prev - 1,
                    )
                  }
                  aria-label="Previous step"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:border-plum hover:text-plum"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStepIdx((prev) => (prev + 1) % onboardingSteps.length)
                  }
                  aria-label="Next step"
                  className="inline-flex size-11 items-center justify-center rounded-full bg-plum text-white transition hover:opacity-90"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
