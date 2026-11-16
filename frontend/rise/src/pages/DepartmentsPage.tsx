import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { departments, engagementModels } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { SpotlightCard } from "../components/SpotlightCard";

export function DepartmentsPage() {
  usePageSeo({
    title: "Departments: Business Development, Sales & Support | The Rise",
    description:
      "Explore The Rise's three core commercial departments: Business Development (BD), Sales Team, and Customer Support.",
    path: "/departments",
  });

  return (
    <div className="page-in">
      <section className="bg-halo-stage relative overflow-hidden border-b border-border py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="halo-breathe pointer-events-none absolute -right-16 top-0 size-80 rounded-full bg-[radial-gradient(circle,oklch(0.44_0.165_292/16%)_0%,transparent_70%)] blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-plum">Three Specialized Desks</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Every stage of{" "}
            <span className="serif-i font-normal text-plum">
              client growth
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Engage a single specialized department or combine all three into a
            unified revenue and client-care pod.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-9 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {departments.map((dept) => (
          <SpotlightCard
            key={dept.id}
            className="group rounded-3xl"
          >
            <div className="grid items-stretch lg:grid-cols-12">
              <div className="relative min-h-[250px] overflow-hidden bg-card lg:col-span-5">
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
                <span className="absolute left-5 top-5 rounded-full border border-white/60 bg-white/90 px-3.5 py-1 font-mono text-xs font-semibold text-plum shadow-xs backdrop-blur-md">
                  DEPARTMENT {dept.code}
                </span>
              </div>

              <div className="relative flex flex-col justify-between p-7 sm:p-9 lg:col-span-7">
                <span
                  aria-hidden="true"
                  className="display pointer-events-none absolute right-7 top-5 select-none text-6xl text-plum/8"
                >
                  {dept.code}
                </span>
                <div>
                  <span className="font-mono text-xs font-semibold tracking-widest text-plum">
                    DESK {dept.code}
                  </span>
                  <h2 className="display mt-2 text-2xl text-foreground sm:text-3xl">
                    {dept.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {dept.description}
                  </p>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow">Core Capabilities</p>
                      <ul className="mt-3 space-y-2.5">
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

                    <div>
                      <p className="eyebrow">Key Outcomes</p>
                      <ul className="mt-3 space-y-2.5">
                        {dept.outcomes.map((out) => (
                          <li
                            key={out}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-champagne" />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-7 border-t border-border/80 pt-5">
                  <Link
                    to={`/contact?department=${encodeURIComponent(dept.name)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-2.5 text-sm font-semibold text-white shadow-halo transition hover:-translate-y-0.5 hover:opacity-95"
                  >
                    <span>Request {dept.shortName}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </section>

      <section className="relative border-t border-border bg-pattern-plum py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-plum">Flexible Structure</p>
          <h2 className="display mt-2 text-3xl text-foreground">
            Engagement models
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {engagementModels.map((m) => (
              <SpotlightCard
                key={m.num}
                className="rounded-3xl p-7"
              >
                <span className="inline-flex rounded-full bg-plum-soft px-3 py-1 font-mono text-xs font-semibold text-plum ring-1 ring-plum/15">
                  {m.num}
                </span>
                <h3 className="display mt-4 text-xl text-foreground">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
