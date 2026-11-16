import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { risePillars } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { SpotlightCard } from "../components/SpotlightCard";

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

  return (
    <div className="page-in">
      <section className="border-b border-border bg-pattern-plum py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Operating Philosophy</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Reach. Influence.{" "}
            <span className="serif-i font-normal text-plum">
              Strategy. Expansion.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every engagement follows a disciplined four-pillar methodology
            connecting pipeline creation directly to long-term customer care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {risePillars.map((p, idx) => (
            <SpotlightCard
              key={p.letter}
              className="rounded-3xl border border-border bg-white p-8"
            >
              <div className="flex items-center justify-between">
                <span className="display text-4xl text-plum">{p.letter}</span>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  0{idx + 1} · {p.word}
                </span>
              </div>
              <h2 className="display mt-5 text-2xl text-foreground">
                {p.headline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {p.detail}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Execution Cadence</p>
              <h2 className="display mt-2 text-3xl text-foreground">
                Four steps to launch
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {onboardingSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-border bg-white p-6 shadow-xs"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-plum-soft font-mono text-xs font-bold text-plum">
                  {s.step}
                </span>
                <h3 className="display mt-4 text-lg text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
