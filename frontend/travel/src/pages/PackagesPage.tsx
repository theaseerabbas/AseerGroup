import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Search, X } from "lucide-react";
import { fetchTravelPackages } from "../lib/api";
import { packages as fallbackPackages, type PackageCategory, type TourPackage } from "../lib/travelData";
import { usePageSeo } from "../lib/usePageSeo";

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
  usePageSeo({
    title: "Tour Packages: Hunza, Skardu, Kashmir & Umrah | Aseer Travel & Tours",
    description:
      "Explore 21 curated one-day escapes, multi-day northern Pakistan expeditions (Hunza, Skardu, Fairy Meadows, Neelum Valley, Swat), Hajj & Umrah packages, and corporate retreats.",
    path: "/packages",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = (searchParams.get("cat") as PackageCategory) || "all";
  const initialQ = searchParams.get("q") || "";

  const [activeCat, setActiveCat] = useState<PackageCategory>(
    validCats.has(initialCat) ? initialCat : "all",
  );
  const [query, setQuery] = useState(initialQ);
  const [allPackages, setAllPackages] = useState<TourPackage[]>(fallbackPackages);

  useEffect(() => {
    let mounted = true;
    void fetchTravelPackages().then((live) => {
      if (mounted) setAllPackages(live);
    });
    return () => {
      mounted = false;
    };
  }, []);

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
    return allPackages.filter((pkg) => {
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
  }, [allPackages, activeCat, query]);

  return (
    <div>
      {/* Page Header */}
      <section className="border-b border-border bg-pattern-sand py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Curated Itineraries</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Tour packages &amp;{" "}
            <span className="serif-i font-normal text-terra">
              seasonal departures
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
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
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-terra text-white shadow-sm"
                        : "border border-border bg-white text-foreground hover:border-terra/50 hover:text-terra"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Filter by valley, duration..."
                aria-label="Search packages"
                className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-6 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Showing {filteredPackages.length} of {allPackages.length} itineraries
          </span>
          {(activeCat !== "all" || query) && (
            <button
              type="button"
              onClick={() => {
                setActiveCat("all");
                setQuery("");
                setSearchParams({}, { replace: true });
              }}
              className="font-semibold text-terra hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredPackages.length === 0 ? (
          <div className="rounded-3xl border border-border bg-white p-12 text-center shadow-sm">
            <p className="display text-2xl text-foreground">
              No matching packages found
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try clearing your search or enquire directly for a custom route.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveCat("all");
                  setQuery("");
                  setSearchParams({}, { replace: true });
                }}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-terra"
              >
                Show All Packages
              </button>
              <Link
                to="/plan-trip"
                className="rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Request Custom Trip
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <article
                key={pkg.id}
                className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 shadow-xs transition hover:border-terra/40 hover:shadow-float"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-terra-soft px-3 py-1 text-[11px] font-semibold text-terra">
                      <Calendar className="size-3" />
                      {pkg.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <MapPin className="size-3 text-terra" />
                      {pkg.region}
                    </span>
                  </div>

                  <h2 className="display mt-4 text-xl text-foreground">
                    {pkg.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pkg.summary}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {pkg.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <Link
                    to={`/plan-trip?package=${encodeURIComponent(pkg.title)}&type=${encodeURIComponent(pkg.category)}`}
                    className="inline-flex w-full items-center justify-between text-sm font-semibold text-terra transition hover:opacity-80"
                  >
                    <span>Enquire for this trip</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
