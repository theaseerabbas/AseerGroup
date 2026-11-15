import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Search, X } from "lucide-react";
import { SpotlightCard } from "../components/SpotlightCard";
import {
  packages,
  type PackageCategory,
} from "../lib/travelData";

const categoryTabs: { value: PackageCategory; label: string }[] = [
  { value: "all", label: "All Packages" },
  { value: "multi-day", label: "Multi-Day Tours" },
  { value: "one-day", label: "One-Day Escapes" },
  { value: "pilgrimage", label: "Hajj & Umrah" },
  { value: "corporate", label: "Corporate & Custom" },
];

const validCats = new Set<PackageCategory>([
  "all",
  "multi-day",
  "one-day",
  "pilgrimage",
  "corporate",
]);

export function PackagesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = (searchParams.get("cat") as PackageCategory) || "all";
  const initialQ = searchParams.get("q") || "";

  const [activeCat, setActiveCat] = useState<PackageCategory>(
    validCats.has(initialCat) ? initialCat : "all"
  );
  const [query, setQuery] = useState(initialQ);

  useEffect(() => {
    const paramCat = (searchParams.get("cat") as PackageCategory) || "all";
    const paramQ = searchParams.get("q") || "";
    setActiveCat(validCats.has(paramCat) ? paramCat : "all");
    setQuery(paramQ);
  }, [searchParams]);

  function selectCategory(cat: PackageCategory) {
    setActiveCat(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === "all") {
      next.delete("cat");
    } else {
      next.set("cat", cat);
    }
    setSearchParams(next, { replace: true });
  }

  function handleQueryChange(val: string) {
    setQuery(val);
    const next = new URLSearchParams(searchParams);
    if (val.trim()) {
      next.set("q", val);
    } else {
      next.delete("q");
    }
    setSearchParams(next, { replace: true });
  }

  const filteredPackages = useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages.filter((pkg) => {
      const catMatch = activeCat === "all" || pkg.category === activeCat;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        pkg.title.toLowerCase().includes(q) ||
        pkg.region.toLowerCase().includes(q) ||
        pkg.summary.toLowerCase().includes(q) ||
        pkg.duration.toLowerCase().includes(q)
      );
    });
  }, [activeCat, query]);

  return (
    <div>
      {/* Page Hero */}
      <section className="border-b border-line bg-pattern-sand py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">Curated Itineraries</p>
          <h1 className="display mt-2 text-4xl text-ink sm:text-5xl">
            Tour packages &amp;{" "}
            <span className="serif-i font-normal text-terra">
              seasonal departures
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Browse our 21 one-day, multi-day northern, pilgrimage, and corporate
            itineraries. Every route can also be arranged privately on your own
            dates.
          </p>

          {/* Filter Tabs + Search */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categoryTabs.map((tab) => {
                const active = activeCat === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => selectCategory(tab.value)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-terra text-white shadow-sm"
                        : "border border-line bg-paper text-ink-soft hover:border-terra/40 hover:text-terra"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Filter by valley, duration..."
                aria-label="Search packages"
                className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-muted focus:border-terra focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-6 flex items-center justify-between text-xs font-medium text-muted">
          <span>
            Showing {filteredPackages.length} of {packages.length} itineraries
          </span>
          {(activeCat !== "all" || query) && (
            <button
              type="button"
              onClick={() => {
                setActiveCat("all");
                setQuery("");
                setSearchParams({}, { replace: true });
              }}
              className="cursor-pointer font-semibold text-terra hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredPackages.length === 0 ? (
          <div className="rounded-3xl border border-line bg-paper p-12 text-center">
            <p className="display text-2xl text-ink">
              No matching packages found
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Try clearing your search or enquire directly for a custom route.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveCat("all");
                  setQuery("");
                  setSearchParams({}, { replace: true });
                }}
                className="cursor-pointer rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-terra/40"
              >
                Show All Packages
              </button>
              <Link
                to="/plan-trip"
                className="cursor-pointer rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-white hover:bg-terra/90"
              >
                Request Custom Trip
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <SpotlightCard
                key={pkg.id}
                className="flex flex-col justify-between rounded-3xl border border-line bg-paper p-6 transition hover:border-terra/35 hover:shadow-float"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-terra-soft px-3 py-1 text-[11px] font-semibold text-terra">
                      <Calendar className="h-3 w-3" />
                      {pkg.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted">
                      <MapPin className="h-3 w-3 text-terra" />
                      {pkg.region}
                    </span>
                  </div>

                  <h2 className="display mt-4 text-xl text-ink">{pkg.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {pkg.summary}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {pkg.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-line bg-sand px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-line pt-4">
                  <Link
                    to={`/plan-trip?package=${encodeURIComponent(pkg.title)}&type=${encodeURIComponent(pkg.category)}`}
                    className="inline-flex w-full cursor-pointer items-center justify-between text-sm font-semibold text-terra transition hover:opacity-80"
                  >
                    <span>Enquire for this trip</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
