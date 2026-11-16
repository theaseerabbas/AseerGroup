import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, ShieldCheck, Users, X } from "lucide-react";
import { fetchTransportFleet } from "../lib/api";
import {
  fleetVehicles as fallbackFleet,
  type FleetCategory,
  type FleetVehicle,
} from "../lib/transportData";
import { usePageSeo } from "../lib/usePageSeo";

const categoryTabs: { value: FleetCategory; label: string }[] = [
  { value: "all", label: "All Vehicles" },
  { value: "hatchback", label: "Hatchbacks" },
  { value: "sedan", label: "Sedans" },
  { value: "4x4", label: "4x4 & SUVs" },
  { value: "luxury", label: "Luxury Cars" },
  { value: "vans-buses", label: "Vans & Coasters" },
];

const validCats = new Set<FleetCategory>([
  "all",
  "hatchback",
  "sedan",
  "4x4",
  "luxury",
  "vans-buses",
]);

export function FleetPage() {
  usePageSeo({
    title: "Our Fleet: Sedans, 4x4 SUVs, Luxury Cars, Hiace & Coasters | Aseer Transport Services",
    description:
      "Browse 24 well-maintained vehicles across Hatchbacks, Sedans, 4x4 SUVs, Luxury Cars, Hiace Vans, and Toyota Coasters available for rental and corporate contracts.",
    path: "/fleet",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = (searchParams.get("cat") as FleetCategory) || "all";
  const initialQ = searchParams.get("q") || "";

  const [activeCat, setActiveCat] = useState<FleetCategory>(
    validCats.has(initialCat) ? initialCat : "all",
  );
  const [query, setQuery] = useState(initialQ);
  const [fleet, setFleet] = useState<FleetVehicle[]>(fallbackFleet);

  useEffect(() => {
    let mounted = true;
    void fetchTransportFleet().then((items) => {
      if (mounted) setFleet(items);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const paramCat = (searchParams.get("cat") as FleetCategory) || "all";
    const paramQ = searchParams.get("q") || "";
    setActiveCat(validCats.has(paramCat) ? paramCat : "all");
    setQuery(paramQ);
  }, [searchParams]);

  function selectCategory(cat: FleetCategory) {
    setActiveCat(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === "all") next.delete("cat");
    else next.set("cat", cat);
    setSearchParams(next, { replace: true });
  }

  function handleQueryChange(val: string) {
    setQuery(val);
    const next = new URLSearchParams(searchParams);
    if (val.trim()) next.set("q", val);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  }

  const filteredFleet = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fleet.filter((v) => {
      const catMatch = activeCat === "all" || v.category === activeCat;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.categoryLabel.toLowerCase().includes(q) ||
        v.useCase.toLowerCase().includes(q) ||
        v.seats.toLowerCase().includes(q)
      );
    });
  }, [fleet, activeCat, query]);

  return (
    <div>
      <section className="border-b border-border bg-pattern-cobalt py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Complete Vehicle Lineup</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Modern fleet for{" "}
            <span className="serif-i font-normal text-cobalt">
              every journey
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            From economical city hatchbacks and executive sedans to 4x4 Prado
            expedition SUVs, luxury protocol cars, and 28-seat Coasters.
          </p>

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
                        ? "bg-cobalt text-white shadow-sm"
                        : "border border-border bg-white text-foreground hover:border-cobalt/50 hover:text-cobalt"
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
                placeholder="Search model or seats..."
                aria-label="Search fleet vehicles"
                className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
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

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-6 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Showing {filteredFleet.length} of {fleet.length} vehicles
          </span>
          {(activeCat !== "all" || query) && (
            <button
              type="button"
              onClick={() => {
                setActiveCat("all");
                setQuery("");
                setSearchParams({}, { replace: true });
              }}
              className="font-semibold text-cobalt hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredFleet.length === 0 ? (
          <div className="rounded-3xl border border-border bg-white p-12 text-center shadow-sm">
            <p className="display text-2xl text-foreground">
              No matching vehicles found
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try clearing your filter or request a custom fleet arrangement.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveCat("all");
                  setQuery("");
                  setSearchParams({}, { replace: true });
                }}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-cobalt"
              >
                Show All Vehicles
              </button>
              <Link
                to="/book"
                className="rounded-full bg-cobalt px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Request Custom Fleet
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFleet.map((vehicle) => (
              <article
                key={vehicle.id}
                className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 shadow-xs transition hover:border-cobalt/40 hover:shadow-float"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-cobalt-soft px-3 py-1 text-[11px] font-semibold text-cobalt">
                      {vehicle.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <Users className="size-3 text-cobalt" />
                      {vehicle.seats}
                    </span>
                  </div>

                  <h2 className="display mt-4 text-xl text-foreground">
                    {vehicle.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {vehicle.useCase}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-cobalt">
                    <ShieldCheck className="size-3.5" />
                    {vehicle.driverOption}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {vehicle.highlights.map((h) => (
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
                    to={`/book?vehicle=${encodeURIComponent(vehicle.name)}`}
                    className="inline-flex w-full items-center justify-between text-sm font-semibold text-cobalt transition hover:opacity-80"
                  >
                    <span>Book this vehicle</span>
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
