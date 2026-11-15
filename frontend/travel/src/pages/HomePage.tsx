import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import heroKarakoram from "../assets/hero-karakoram.jpg";
import skarduImg from "../assets/skardu.jpg";
import kashmirImg from "../assets/kashmir.jpg";
import umrahImg from "../assets/umrah.jpg";
import { tourInclusions, type PackageCategory } from "../lib/travelData";
import { usePageSeo } from "../lib/usePageSeo";

const carouselSlides = [
  {
    title: "Hunza & Passu Cones",
    region: "Gilgit-Baltistan",
    duration: "5 Days",
    category: "multi-day" as PackageCategory,
    image: heroKarakoram,
    alt: "Golden hour light over the Karakoram peaks in Hunza Valley",
    caption:
      "Karimabad heritage forts, Attabad Lake, Passu suspension bridge, and Eagle's Nest.",
  },
  {
    title: "Skardu & Deosai Plains",
    region: "Baltistan",
    duration: "6 Days",
    category: "multi-day" as PackageCategory,
    image: skarduImg,
    alt: "Upper Kachura Lake surrounded by pines and peaks in Skardu",
    caption:
      "Shangrila Resort, Upper Kachura Lake, Shigar Fort, Cold Desert, and Deosai.",
  },
  {
    title: "Kashmir & Arang Kel",
    region: "Neelum Valley",
    duration: "3 to 4 Days",
    category: "multi-day" as PackageCategory,
    image: kashmirImg,
    alt: "Alpine meadows and wooden chalets in Arang Kel, Kashmir",
    caption:
      "Keran, Sharda, Kel chairlift ascent, and upper valley continuation to Taobat.",
  },
  {
    title: "Umrah & Hajj Hospitality",
    region: "Makkah & Madinah",
    duration: "7 to 21 Days",
    category: "pilgrimage" as PackageCategory,
    image: umrahImg,
    alt: "Serene sunlit courtyard and marble arches for Umrah and Hajj journeys",
    caption:
      "Visas, convenient flights, vetted proximity hotels, and guided ground transfers.",
  },
];

export function HomePage() {
  usePageSeo({
    title: "Aseer Travel & Tours | Northern Pakistan Tours, Umrah & Ticketing",
    description:
      "Curated one-day and multi-day northern Pakistan tours (Hunza, Skardu, Kashmir, Swat), Hajj & Umrah packages, domestic and international air ticketing, and corporate travel from Islamabad.",
    path: "/",
  });

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  function handleQuickSearch(e: FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/packages?q=${encodeURIComponent(q)}` : "/packages");
  }

  function prevSlide() {
    setActiveSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length,
    );
  }

  function nextSlide() {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  }

  const current = carouselSlides[activeSlide] ?? carouselSlides[0]!;

  return (
    <div>
      {/* 1. HERO + INTERACTIVE DESTINATION CAROUSEL (100vh first screen) */}
      <section className="flex min-h-[calc(100svh-4.5rem)] items-center border-b border-border bg-pattern-sand py-10 sm:py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Copy & Search Bar */}
            <div className="lg:col-span-6">
              <p className="eyebrow">
                Islamabad · Northern Pakistan · Worldwide
              </p>

              <h1 className="display mt-4 text-4xl text-foreground sm:text-5xl lg:text-[3.5rem]">
                Journeys crafted with{" "}
                <span className="serif-i font-normal text-terra">warmth</span>{" "}
                and mountain precision.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                Aseer Travel &amp; Tours curates northern expeditions, same-day
                escapes from Islamabad, Umrah &amp; Hajj hospitality, and
                seamless air ticketing under The Aseer Group.
              </p>

              {/* Clean Single-Input Search Bar */}
              <form
                onSubmit={handleQuickSearch}
                className="mt-8 rounded-2xl border border-border bg-white p-2 shadow-float"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Hunza, Skardu, Kashmir, Umrah..."
                      aria-label="Search destinations or packages"
                      className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-terra focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-terra px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <span>Explore</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Interactive Destination Carousel */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-float">
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
                  {carouselSlides.map((slide, idx) => (
                    <img
                      key={slide.title}
                      src={slide.image}
                      alt={slide.alt}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                        idx === activeSlide
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }`}
                    />
                  ))}
                  {/* Scrim for crisp white caption contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Prev / Next Buttons */}
                  <div className="absolute right-4 top-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous destination"
                      className="flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition hover:bg-white"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next destination"
                      className="flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition hover:bg-white"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>

                  {/* Slide Info */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-terra px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                        {current.duration}
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                        {current.region}
                      </span>
                    </div>
                    <h2 className="display mt-3 text-2xl text-white sm:text-3xl">
                      {current.title}
                    </h2>
                    <p className="mt-1.5 max-w-md text-xs leading-relaxed text-white/90 sm:text-sm">
                      {current.caption}
                    </p>
                  </div>
                </div>

                {/* Carousel Footer Controls */}
                <div className="flex items-center justify-between gap-4 border-t border-border bg-white px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {carouselSlides.map((slide, idx) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`View ${slide.title}`}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeSlide
                            ? "w-7 bg-terra"
                            : "w-2 bg-border hover:bg-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <Link
                    to={`/plan-trip?package=${encodeURIComponent(current.title)}&type=${encodeURIComponent(current.category)}`}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-terra transition hover:opacity-80 sm:text-sm"
                  >
                    <span>Enquire about this route</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE ROUTES GRID */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Signature Routes</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Destinations travellers{" "}
              <span className="serif-i font-normal text-terra">return to</span>
            </h2>
          </div>
          <Link
            to="/packages"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-terra transition hover:opacity-80"
          >
            <span>View all 21 packages</span>
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {carouselSlides.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:border-terra/40 hover:shadow-float"
            >
              <div className="relative h-60 overflow-hidden sm:h-64">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
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
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.caption}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <Link
                    to={`/packages?cat=${item.category}`}
                    className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-terra"
                  >
                    Browse category
                  </Link>
                  <Link
                    to={`/plan-trip?package=${encodeURIComponent(item.title)}&type=${encodeURIComponent(item.category)}`}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-terra transition hover:opacity-80"
                  >
                    <span>Plan this trip</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. STANDARD TOUR INCLUSIONS */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Every Detail Covered</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
                What comes standard on our{" "}
                <span className="serif-i font-normal text-terra">
                  northern tours
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                From comfortable air-conditioned transport and road tolls to
                vetted stays, warm meals, and evening bonfires, we handle the
                logistics so you can enjoy the scenery.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-terra hover:text-terra"
                >
                  <span>About Our Team</span>
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
              {tourInclusions.map((inc) => (
                <div
                  key={inc}
                  className="flex items-center gap-2.5 rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-foreground shadow-xs"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-terra-soft text-terra">
                    <Check className="size-3.5" />
                  </span>
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA BAND */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-3xl border border-terra/25 bg-terra-soft p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">Custom &amp; Group Departures</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
                Ready to map out your{" "}
                <span className="serif-i font-normal text-terra">
                  next itinerary
                </span>
                ?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Tell us your preferred destination, travel dates, and group size.
                Our Islamabad travel consultants respond promptly with a clear
                route and pricing breakdown.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/plan-trip"
                className="inline-flex items-center gap-2 rounded-full bg-terra px-6 py-3.5 text-sm font-semibold text-white shadow-float transition hover:opacity-90"
              >
                <span>Open Trip Planner</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
