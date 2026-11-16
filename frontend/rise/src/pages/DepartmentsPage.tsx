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
      <section className="border-b border-border bg-pattern-plum py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Three Specialized Desks</p>
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

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {departments.map((dept) => (
          <SpotlightCard
            key={dept.id}
            className="overflow-hidden rounded-3xl border border-border bg-white"
          >
            <div className="grid items-stretch lg:grid-cols-12">
              <div className="relative min-h-[240px] bg-card lg:col-span-5">
                <img
                  src={dept.image}
                  alt={dept.alt}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-7">
                <div>
                  <span className="font-mono text-xs font-semibold tracking-widest text-plum">
                    DEPARTMENT {dept.code}
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
                      <ul className="mt-3 space-y-2">
                        {dept.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-center gap-2 text-sm text-foreground"
                          >
                            <Check className="size-3.5 shrink-0 text-plum" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="eyebrow">Key Outcomes</p>
                      <ul className="mt-3 space-y-2">
                        {dept.outcomes.map((out) => (
                          <li
                            key={out}
                            className="text-sm text-muted-foreground"
                          >
                            • {out}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-7 border-t border-border pt-5">
                  <Link
                    to={`/contact?department=${encodeURIComponent(dept.name)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
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

      <section className="border-t border-border bg-card py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Flexible Structure</p>
          <h2 className="display mt-2 text-3xl text-foreground">
            Engagement models
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {engagementModels.map((m) => (
              <div
                key={m.num}
                className="rounded-3xl border border-border bg-white p-7 shadow-xs"
              >
                <span className="font-mono text-xs font-semibold text-plum">
                  {m.num}
                </span>
                <h3 className="display mt-3 text-xl text-foreground">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
