import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import sedanImg from "../assets/sedan.jpg";
import suv4x4Img from "../assets/suv-4x4.jpg";
import shuttleImg from "../assets/shuttle.jpg";
import transportSuvImg from "../assets/transport-suv.jpg";
import { type FleetCategory } from "../lib/transportData";
import { usePageSeo } from "../lib/usePageSeo";

const heroSlides = [
  {
    title: "Executive & VIP Fleet",
    subtitle: "Chauffeur-driven SUVs and protocol sedans across Islamabad.",
    category: "luxury" as FleetCategory,
    image: transportSuvImg,
    alt: "Black executive SUV ready for corporate and VIP transport",
  },
  {
    title: "City & Highway Sedans",
    subtitle: "Daily, weekly, and intercity rides with or without a driver.",
    category: "sedan" as FleetCategory,
    image: sedanImg,
    alt: "Dark-silver executive sedan on an Islamabad avenue",
  },
  {
    title: "Corporate & Group Shuttles",
    subtitle: "Hiace Grand Cabins and 28-seat Coasters for teams and tours.",
    category: "vans-buses" as FleetCategory,
    image: shuttleImg,
    alt: "White executive passenger van on a northern highway",
  },
  {
    title: "4x4 Mountain & Terrain",
    subtitle: "Prado, Fortuner, and Revo built for northern passes.",
    category: "4x4" as FleetCategory,
    image: suv4x4Img,
    alt: "Graphite 4x4 SUV overlooking northern Pakistan mountains",
  },
];

const serviceRows = [
  {
    title: "Corporate Staff Pick & Drop",
    note: "Punctual daily office routes & monthly billing",
  },
  {
    title: "Rent-a-Car (With or Without Driver)",
    note: "Flexible city hatchbacks, sedans & 4x4s",
  },
  {
    title: "Airport, Event & Wedding Transfers",
    note: "Protocol sedans & coordinated guest convoys",
  },
  {
    title: "School, College & University Transport",
    note: "Verified drivers & GPS-tracked campus routes",
  },
  {
    title: "Group & Northern Tours Transport",
    note: "Hiace Grand Cabins, Coasters & 4x4 expeditions",
  },
  {
    title: "Logistics & Parcel Movement",
    note: "Dependable commercial cargo & light freight",
  },
];

export function HomePage() {
  usePageSeo({
    title: "Aseer Transport Services | Executive & Fleet Mobility",
    description:
      "Chauffeur-driven sedans, 4x4 SUVs, luxury cars, corporate staff pick & drop, and Coaster shuttles from Islamabad.",
    path: "/",
  });

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, activeSlide]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/fleet?q=${encodeURIComponent(q)}` : "/fleet");
  }

  function prevSlide() {
    setActiveSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  }

  function nextSlide() {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }

  const current = heroSlides[activeSlide] ?? heroSlides[0]!;

  return (
    <div>
      {/* 1. CLEAN FULL-BLEED CAROUSEL HERO WITH SEARCH OVERLAY */}
      <section
        className="relative overflow-hidden bg-primary text-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative h-[78svh] min-h-[520px] max-h-[760px] w-full">
          {/* Slide Track */}
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {heroSlides.map((slide) => (
              <div key={slide.title} className="relative h-full w-full shrink-0">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30" />
              </div>
            ))}
          </div>

          {/* Minimalist Overlaid Content + Search */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
              <div className="pointer-events-auto max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
                  Aseer Transport Services
                </p>
                <h1 className="display mt-3 text-4xl text-white sm:text-5xl lg:text-6xl">
                  {current.title}
                </h1>
                <p className="mt-3 text-sm text-white/85 sm:text-base">
                  {current.subtitle}
                </p>

                {/* Sleek Search Bar on Top of Carousel */}
                <form
                  onSubmit={handleSearch}
                  className="mt-6 flex items-center gap-2 rounded-2xl bg-white/95 p-1.5 shadow-xl backdrop-blur-md"
                >
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Prado, Corolla, Hiace, Coaster..."
                      aria-label="Search fleet vehicles"
                      className="w-full rounded-xl bg-transparent py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-cobalt px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <span>Search</span>
                    <ArrowRight className="size-4" />
                  </button>
                </form>
              </div>

              {/* Minimal Slide Controls */}
              <div className="pointer-events-auto mt-8 flex items-center justify-between border-t border-white/15 pt-4">
                <div className="flex items-center gap-2">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Show ${slide.title}`}
                      className={`h-1 rounded-full transition-all ${
                        idx === activeSlide
                          ? "w-10 bg-white"
                          : "w-4 bg-white/35 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-foreground"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-foreground"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLEAN VISUAL FLEET CLASSES (ZERO TEXT CLUTTER) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The Fleet</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Four classes.{" "}
              <span className="serif-i font-normal text-cobalt">
                Twenty-four vehicles.
              </span>
            </h2>
          </div>
          <Link
            to="/fleet"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-cobalt hover:opacity-80"
          >
            <span>View full fleet</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {heroSlides.map((item) => (
            <Link
              key={item.title}
              to={`/fleet?cat=${item.category}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition hover:-translate-y-1 hover:shadow-float"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="size-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                  <h3 className="display text-lg text-white">{item.title}</h3>
                  <ArrowRight className="size-4 shrink-0 text-white/80 transition group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL SERVICES LIST (NO ICON-BOX CLUTTER) */}
      <section className="border-y border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Services</p>
              <h2 className="display mt-2 text-3xl text-foreground">
                Built for daily{" "}
                <span className="serif-i font-normal text-cobalt">
                  reliability.
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Verified drivers, GPS-tracked routes, and 24/7 dispatch from
                Islamabad.
              </p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:opacity-80"
              >
                <span>Explore services</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="divide-y divide-border border-y border-border lg:col-span-8">
              {serviceRows.map((row) => (
                <Link
                  key={row.title}
                  to={`/book?service=${encodeURIComponent(row.title)}`}
                  className="group flex items-center justify-between gap-4 py-4 transition hover:px-2"
                >
                  <div>
                    <h3 className="text-base font-semibold text-foreground transition group-hover:text-cobalt">
                      {row.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {row.note}
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-cobalt" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MINIMAL CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-cobalt/20 bg-cobalt-soft p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="display text-2xl text-foreground sm:text-3xl">
              Ready to reserve a{" "}
              <span className="serif-i font-normal text-cobalt">
                vehicle or contract
              </span>
              ?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your route and dates with our Islamabad dispatch desk.
            </p>
          </div>
          <Link
            to="/book"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-cobalt px-6 py-3.5 text-sm font-semibold text-white shadow-float transition hover:opacity-90 sm:self-auto"
          >
            <span>Book a Ride</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
