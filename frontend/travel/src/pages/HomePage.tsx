import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Check,
} from "lucide-react";
import heroKarakoram from "../assets/hero-karakoram.jpg";
import skarduImg from "../assets/skardu.jpg";
import kashmirImg from "../assets/kashmir.jpg";
import umrahImg from "../assets/umrah.jpg";
import travelImg from "../assets/travel.jpg";
import { SpotlightCard } from "../components/SpotlightCard";
import {
  marqueeDestinations,
  tourInclusions,
  type PackageCategory,
} from "../lib/travelData";

const featuredExpeditions = [
  {
    title: "Skardu & Deosai Plains",
    duration: "6 Days",
    region: "Gilgit-Baltistan",
    category: "multi-day" as PackageCategory,
    image: skarduImg,
    alt: "Turquoise Upper Kachura Lake surrounded by pines and peaks in Skardu",
    summary:
      "Shangrila Resort, Upper Kachura Lake, Shigar Fort, Cold Desert, and high-altitude Deosai.",
  },
  {
    title: "Kashmir & Arang Kel",
    duration: "3 to 4 Days",
    region: "Neelum Valley",
    category: "multi-day" as PackageCategory,
    image: kashmirImg,
    alt: "Wooden chalets across emerald alpine meadows of Arang Kel in Neelum Valley",
    summary:
      "Keran, Sharda, Kel chairlift ascent, and optional upper valley continuation to Taobat.",
  },
  {
    title: "Umrah & Hajj Care",
    duration: "7 to 21 Days",
    region: "Makkah & Madinah",
    category: "pilgrimage" as PackageCategory,
    image: umrahImg,
    alt: "Serene sunlit courtyard and marble arches for Umrah and Hajj journeys",
    summary:
      "Visas, direct or convenient flights, vetted proximity hotels, and guided ground transfers.",
  },
  {
    title: "Hunza & Passu Cones",
    duration: "5 Days",
    region: "Karakoram Highway",
    category: "multi-day" as PackageCategory,
    image: heroKarakoram,
    alt: "Snow-dusted Karakoram peaks above Hunza Valley at golden hour",
    summary:
      "Karimabad heritage forts, Attabad Lake, Passu suspension bridge, and Eagle's Nest sunset.",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [searchCat, setSearchCat] = useState<PackageCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  function handleQuickSearch(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCat !== "all") params.set("cat", searchCat);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    const qs = params.toString();
    navigate(qs ? `/packages?${qs}` : "/packages");
  }

  return (
    <div>
      {/* 1. SPLIT ASYMMETRIC HERO + 3-PHOTO COLLAGE */}
      <section className="relative overflow-hidden border-b border-line bg-pattern-sand">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Editorial Copy */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-terra/25 bg-terra-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-terra">
                <Compass className="h-3.5 w-3.5" />
                <span>Islamabad · Northern Pakistan · Worldwide</span>
              </div>

              <h1 className="display mt-6 text-[2.6rem] text-ink sm:text-[3.5rem] lg:text-[4rem]">
                Journeys crafted with{" "}
                <span className="serif-i font-normal text-terra">warmth</span>{" "}
                and mountain precision.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-[17px]">
                Aseer Travel &amp; Tours curates northern expeditions, same-day
                escapes from Islamabad, Umrah &amp; Hajj hospitality, and
                seamless air ticketing under The Aseer Group.
              </p>

              {/* Quick Trip Search Bar */}
              <form
                onSubmit={handleQuickSearch}
                className="mt-8 rounded-2xl border border-line bg-paper/95 p-2.5 shadow-float backdrop-blur-sm"
              >
                <div className="grid gap-2 sm:grid-cols-12">
                  <div className="relative sm:col-span-5">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Hunza, Skardu, Umrah..."
                      aria-label="Destination or keyword"
                      className="w-full rounded-xl bg-sand px-10 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-terra/40"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <select
                      value={searchCat}
                      onChange={(e) =>
                        setSearchCat(e.target.value as PackageCategory)
                      }
                      aria-label="Trip category"
                      className="w-full cursor-pointer rounded-xl bg-sand px-3.5 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terra/40"
                    >
                      <option value="all">All Journeys</option>
                      <option value="multi-day">Multi-Day Tours</option>
                      <option value="one-day">One-Day Escapes</option>
                      <option value="pilgrimage">Hajj &amp; Umrah</option>
                      <option value="corporate">Corporate Travel</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-terra px-4 py-3 text-sm font-semibold text-white transition hover:bg-terra/90"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-terra" />
                  Licensed &amp; Vetted Guides
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-terra" />
                  H-13 &amp; NSTP Islamabad Desks
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-saffron" />
                  21 Curated Itineraries
                </span>
              </div>
            </div>

            {/* Right 3-Photo Overlapping Collage */}
            <div className="relative lg:col-span-6">
              <div className="grid grid-cols-12 gap-3.5 sm:gap-4">
                <div className="col-span-7 overflow-hidden rounded-3xl border border-line bg-paper shadow-float">
                  <img
                    src={heroKarakoram}
                    alt="Golden sunlight over the Karakoram mountain peaks in Hunza"
                    className="h-72 w-full object-cover transition duration-700 hover:scale-105 sm:h-96"
                  />
                </div>
                <div className="col-span-5 flex flex-col gap-3.5 sm:gap-4">
                  <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-float">
                    <img
                      src={skarduImg}
                      alt="Upper Kachura Lake in Skardu"
                      className="h-36 w-full object-cover transition duration-700 hover:scale-105 sm:h-48"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-float">
                    <img
                      src={kashmirImg}
                      alt="Arang Kel meadow in Neelum Valley, Kashmir"
                      className="h-32 w-full object-cover transition duration-700 hover:scale-105 sm:h-44"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Warm Badge */}
              <div className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-line bg-paper/95 px-4 py-3 shadow-float backdrop-blur-sm sm:absolute sm:-bottom-4 sm:left-6 sm:mt-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terra-soft text-terra">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Weekend &amp; Custom Departures
                  </p>
                  <p className="text-[11px] text-muted">
                    Families, Universities &amp; Corporate Groups
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE DESTINATION MARQUEE */}
      <div className="overflow-hidden border-b border-line bg-paper py-4">
        <div className="flex w-max animate-marquee items-center gap-8">
          {[...marqueeDestinations, ...marqueeDestinations].map((dest, idx) => (
            <div
              key={`${dest}-${idx}`}
              className="flex items-center gap-8 whitespace-nowrap"
            >
              <span className="text-sm font-medium tracking-wide text-ink-soft">
                {dest}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-terra" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. FEATURED PHOTO-BACKED EXPEDITIONS */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Signature Routes</p>
            <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">
              Destinations travellers{" "}
              <span className="serif-i font-normal text-terra">return to</span>
            </h2>
          </div>
          <Link
            to="/packages"
            className="u-link inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-terra"
          >
            <span>View all 21 packages</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredExpeditions.map((item) => (
            <SpotlightCard
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-line bg-paper shadow-sm transition hover:shadow-float"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                  <div>
                    <span className="inline-block rounded-full bg-terra px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      {item.duration}
                    </span>
                    <h3 className="display mt-2 text-2xl text-white">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-white/90">
                    {item.region}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-ink-soft">
                  {item.summary}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <Link
                    to={`/packages?cat=${item.category}`}
                    className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted transition hover:text-terra"
                  >
                    Browse category
                  </Link>
                  <Link
                    to={`/plan-trip?package=${encodeURIComponent(item.title)}&type=${encodeURIComponent(item.category)}`}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-terra transition hover:gap-2"
                  >
                    <span>Plan this trip</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 4. 5-PHOTO COLLAGE + TOUR INCLUSIONS */}
      <section className="border-y border-line bg-pattern-sand py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left 5-photo mosaic */}
            <div className="grid grid-cols-6 gap-3 lg:col-span-6">
              <div className="col-span-4 overflow-hidden rounded-2xl border border-line bg-paper">
                <img
                  src={skarduImg}
                  alt="Skardu alpine waters"
                  className="h-44 w-full object-cover"
                />
              </div>
              <div className="col-span-2 overflow-hidden rounded-2xl border border-line bg-paper">
                <img
                  src={umrahImg}
                  alt="Umrah sanctuary"
                  className="h-44 w-full object-cover"
                />
              </div>
              <div className="col-span-2 overflow-hidden rounded-2xl border border-line bg-paper">
                <img
                  src={travelImg}
                  alt="Mountain valley road"
                  className="h-40 w-full object-cover"
                />
              </div>
              <div className="col-span-2 overflow-hidden rounded-2xl border border-line bg-paper">
                <img
                  src={kashmirImg}
                  alt="Neelum Valley meadows"
                  className="h-40 w-full object-cover"
                />
              </div>
              <div className="col-span-2 overflow-hidden rounded-2xl border border-line bg-paper">
                <img
                  src={heroKarakoram}
                  alt="Karakoram skyline"
                  className="h-40 w-full object-cover"
                />
              </div>
            </div>

            {/* Right Inclusions */}
            <div className="lg:col-span-6">
              <p className="eyebrow">Every Detail Covered</p>
              <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">
                What comes standard on our{" "}
                <span className="serif-i font-normal text-terra">
                  northern tours
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                From comfortable air-conditioned coasters and road tolls to
                vetted stays, warm meals, and evening bonfires, we handle the
                logistics so you can enjoy the scenery.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tourInclusions.map((inc) => (
                  <div
                    key={inc}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-paper/90 px-3.5 py-2.5 text-sm font-medium text-ink"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terra-soft text-terra">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-terra/40 hover:text-terra"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-muted transition hover:text-terra"
                >
                  <span>About Our Islamabad Team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIGHT EDITORIAL CTA BAND */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="rounded-[2rem] border border-terra/20 bg-terra-soft p-8 sm:p-12 lg:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">Custom &amp; Group Departures</p>
              <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">
                Ready to map out your{" "}
                <span className="serif-i font-normal text-terra">
                  next itinerary
                </span>
                ?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
                Tell us your preferred destination, travel dates, and group size.
                Our Islamabad travel consultants respond promptly with a clear
                route and pricing breakdown.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/plan-trip"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-terra px-6 py-3.5 text-sm font-semibold text-white shadow-float transition hover:bg-terra/90"
              >
                <span>Open Trip Planner</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
