import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { departments, engagementModels } from "../lib/riseData";
import { usePageSeo } from "../lib/usePageSeo";
import { cn } from "../lib/utils";

export function DepartmentsPage() {
  usePageSeo({
    title: "Departments: Business Development, Sales & Support | The Rise",
    description:
      "Explore The Rise's three core commercial departments: Business Development (BD), Sales Team, and Customer Support.",
    path: "/departments",
  });

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeModel, setActiveModel] = useState<number>(1);

  const visibleDepartments =
    selectedFilter === "all"
      ? departments
      : departments.filter((d) => d.id === selectedFilter);

  return (
    <div className="page-in">
      {/* 1. OBSIDIAN EDITORIAL HEADER + INTERACTIVE FILTER */}
      <section className="bg-plum-obsidian py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-champagne" />
                <p className="text-[11px] font-semibold tracking-[0.2em] text-champagne uppercase">
                  Three Specialized Desks
                </p>
              </div>
              <h1 className="display mt-4 text-3xl text-white sm:text-5xl">
                Every stage of{" "}
                <span className="serif-i font-normal text-champagne">
                  client growth
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
                Engage a single specialized department or combine all three into
                a unified revenue and client-care pod.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition",
                  selectedFilter === "all"
                    ? "bg-white text-plum-ink"
                    : "border border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:text-white",
                )}
              >
                All Desks
              </button>
              {departments.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedFilter(d.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition",
                    selectedFilter === d.id
                      ? "bg-champagne text-plum-ink"
                      : "border border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:text-white",
                  )}
                >
                  <span className="font-mono text-[11px] opacity-80">
                    {d.code}
                  </span>
                  <span>{d.shortName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRIC DEPARTMENT SHOWCASES */}
      <section className="mx-auto max-w-6xl space-y-14 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {visibleDepartments.map((dept, idx) => {
          const reversed = idx % 2 === 1 && selectedFilter === "all";
          return (
            <div
              key={dept.id}
              className="content-fade grid items-stretch gap-6 lg:grid-cols-12"
            >
              {/* Photography */}
              <div
                className={cn(
                  "overflow-hidden rounded-3xl border border-border bg-card shadow-float lg:col-span-5",
                  reversed && "lg:order-2",
                )}
              >
                <img
                  src={dept.image}
                  alt={dept.alt}
                  loading="lazy"
                  className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.03] lg:h-full lg:min-h-[420px]"
                />
              </div>

              {/* Editorial Detail + Obsidian Outcomes Strip */}
              <div
                className={cn(
                  "flex flex-col justify-between rounded-3xl border border-border bg-white p-7 shadow-xs sm:p-10 lg:col-span-7",
                  reversed && "lg:order-1",
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-plum-soft px-3 py-1 font-mono text-xs font-bold text-plum">
                      DESK {dept.code}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {dept.tagline}
                    </span>
                  </div>

                  <h2 className="display mt-4 text-2xl text-foreground sm:text-3xl">
                    {dept.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {dept.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mt-6">
                    <p className="eyebrow">Core Capabilities</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {dept.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground"
                        >
                          <Check className="size-3 text-plum" />
                          <span>{cap}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="mt-6 rounded-2xl bg-plum-obsidian p-5 text-white">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-champagne uppercase">
                      Expected Outcomes
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {dept.outcomes.map((out) => (
                        <p
                          key={out}
                          className="text-xs leading-relaxed text-white/85"
                        >
                          • {out}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                  <Link
                    to={`/contact?department=${encodeURIComponent(dept.name)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-float transition hover:opacity-90"
                  >
                    <span>Request {dept.shortName}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/approach"
                    className="u-link hidden text-xs font-semibold text-muted-foreground hover:text-plum sm:inline-block"
                  >
                    See R·I·S·E cadence
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. INTERACTIVE ENGAGEMENT MODELS */}
      <section className="border-t border-border bg-pattern-plum py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-plum">Flexible Structure</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
                Engagement{" "}
                <span className="serif-i font-normal text-plum">models</span>
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Hover or select a structure to configure your desk
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {engagementModels.map((m, idx) => {
              const active = idx === activeModel;
              return (
                <div
                  key={m.num}
                  onMouseEnter={() => setActiveModel(idx)}
                  onClick={() => setActiveModel(idx)}
                  className={cn(
                    "cursor-pointer rounded-3xl border p-7 transition-all duration-300",
                    active
                      ? "border-plum-ink bg-plum-obsidian text-white shadow-float"
                      : "border-border bg-white text-foreground hover:border-plum/40",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold",
                        active ? "text-champagne" : "text-plum",
                      )}
                    >
                      {m.num}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "size-4",
                        active ? "text-champagne" : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <h3 className="display mt-4 text-xl">{m.title}</h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      active ? "text-white/75" : "text-muted-foreground",
                    )}
                  >
                    {m.text}
                  </p>
                  <Link
                    to="/contact"
                    className={cn(
                      "mt-6 inline-flex items-center gap-1.5 text-xs font-semibold",
                      active ? "text-champagne" : "text-plum",
                    )}
                  >
                    <span>Configure this model</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
