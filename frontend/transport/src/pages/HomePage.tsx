import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import sedanImg from "../assets/sedan.jpg";
import suv4x4Img from "../assets/suv-4x4.jpg";
import shuttleImg from "../assets/shuttle.jpg";
import transportSuvImg from "../assets/transport-suv.jpg";
import { whyChooseTransport, type FleetCategory } from "../lib/transportData";
import { usePageSeo } from "../lib/usePageSeo";

const fleetSlides = [
  {
    title: "Executive & VIP SUVs",
    badge: "Chauffeur & Protocol",
    capacity: "5 to 7 Seats",
    category: "luxury" as FleetCategory,
    image: transportSuvImg,
    alt: "Black executive SUV ready for corporate and VIP transport in Islamabad",
    caption:
      "Toyota Land Cruiser ZX, Prado, Fortuner, and Range Rover for executive delegations and events.",
  },
  {
    title: "City & Highway Sedans",
    badge: "Daily & Intercity",
    capacity: "4 to 5 Seats",
    category: "sedan" as FleetCategory,
    image: sedanImg,
    alt: "Sleek dark-silver executive sedan parked on a clean Islamabad avenue",
    caption:
      "Toyota Grande, Corolla, Yaris, Honda Civic, and City available with or without a driver.",
  },
  {
    title: "Corporate Vans & Coasters",
    badge: "Staff & Group Shuttles",
    capacity: "12 to 28 Seats",
    category: "vans-buses" as FleetCategory,
    image: shuttleImg,
    alt: "Modern white executive shuttle van driving on a paved highway in northern Pakistan",
    caption:
      "Toyota Hiace, Grand Cabin, and Coaster 4C/5C for staff pick-and-drop, universities, and tours.",
  },
  {
    title: "4x4 Mountain & Adventure",
    badge: "All-Terrain Ready",
    capacity: "5 to 7 Seats",
    category: "4x4" as FleetCategory,
    image: suv4x4Img,
    alt: "Graphite 4x4 expedition SUV overlooking northern Pakistan mountain peaks",
    caption:
      "Toyota Revo Rocco, Prado, Fortuner, Tucson, and Sportage built for rough terrain and northern passes.",
  },
];

export function HomePage() {
  usePageSeo({
    title: "Aseer Transport Services | Safe & Reliable Mobility Across Pakistan",
    description:
      "Personal & family transport, corporate staff pick & drop, rent-a-car with or without driver, 4x4 SUVs, luxury cars, Hiace vans, and coasters from Islamabad.",
    path: "/",
  });

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % fleetSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/fleet?q=${encodeURIComponent(q)}` : "/fleet");
  }

  function prevSlide() {
    setActiveSlide(
      (prev) => (prev - 1 + fleetSlides.length) % fleetSlides.length,
    );
  }

  function nextSlide() {
    setActiveSlide((prev) => (prev + 1) % fleetSlides.length);
  }

  const current = fleetSlides[activeSlide] ?? fleetSlides[0]!;

  return (
    <div>
      {/* 1. FULL-VIEWPORT HERO + FLEET CAROUSEL */}
      <section className="flex min-h-[calc(100svh-4.5rem)] items-center border-b border-border bg-pattern-cobalt py-10 sm:py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Copy & Fleet Finder */}
            <div className="lg:col-span-6">
              <p className="eyebrow">
                Islamabad · Corporate Contracts · Nationwide
              </p>

              <h1 className="display mt-4 text-4xl text-foreground sm:text-5xl lg:text-[3.4rem]">
                Precision mobility{" "}
                <span className="serif-i font-normal text-cobalt">
                  built on punctuality
                </span>{" "}
                and care.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                Aseer Transport Services delivers GPS-tracked personal rides,
                corporate staff pick-and-drop, university shuttles, rent-a-car,
                and commercial freight across Pakistan.
              </p>

              {/* Clean Single-Input Fleet Search */}
              <form
                onSubmit={handleSearch}
                className="mt-8 rounded-2xl border border-border bg-white p-2 shadow-float"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Prado, Corolla, Hiace, Coaster..."
                      aria-label="Search vehicles or fleet category"
                      className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-cobalt px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <span>Find Vehicle</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Interactive Fleet Carousel */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-float">
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
                  {fleetSlides.map((slide, idx) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="absolute right-4 top-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous vehicle category"
                      className="flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition hover:bg-white"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next vehicle category"
                      className="flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition hover:bg-white"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-cobalt px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                        {current.badge}
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                        {current.capacity}
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

                <div className="flex items-center justify-between gap-4 border-t border-border bg-white px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {fleetSlides.map((slide, idx) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`View ${slide.title}`}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeSlide
                            ? "w-7 bg-cobalt"
                            : "w-2 bg-border hover:bg-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <Link
                    to={`/book?vehicle=${encodeURIComponent(current.title)}`}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-cobalt transition hover:opacity-80 sm:text-sm"
                  >
                    <span>Reserve this category</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BALANCED 2x2 FLEET CATEGORIES GRID */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Our Fleet</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Vehicles matched to{" "}
              <span className="serif-i font-normal text-cobalt">
                every route
              </span>
            </h2>
          </div>
          <Link
            to="/fleet"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-cobalt transition hover:opacity-80"
          >
            <span>Browse all 24 vehicles</span>
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {fleetSlides.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:border-cobalt/40 hover:shadow-float"
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
                    <span className="inline-block rounded-full bg-cobalt px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      {item.capacity}
                    </span>
                    <h3 className="display mt-2 text-2xl text-white">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-white/90">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.caption}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <Link
                    to={`/fleet?cat=${item.category}`}
                    className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-cobalt"
                  >
                    View models
                  </Link>
                  <Link
                    to={`/book?vehicle=${encodeURIComponent(item.title)}`}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-cobalt transition hover:opacity-80"
                  >
                    <span>Book vehicle</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE ASEER TRANSPORT */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Operational Standards</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
                Why organizations{" "}
                <span className="serif-i font-normal text-cobalt">
                  trust our fleet
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Every vehicle is maintained to strict cleanliness and safety
                standards, backed by verified drivers, GPS route tracking, and
                transparent pricing.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-cobalt px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-cobalt hover:text-cobalt"
                >
                  <span>About Our Company</span>
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {whyChooseTransport.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-4 text-sm font-medium text-foreground shadow-xs"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cobalt-soft text-cobalt">
                    <Check className="size-3.5" />
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. DISPATCH & CORPORATE CONTRACT CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-3xl border border-cobalt/20 bg-cobalt-soft p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">Single Rides &amp; Monthly Contracts</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
                Need a vehicle or{" "}
                <span className="serif-i font-normal text-cobalt">
                  staff shuttle contract
                </span>
                ?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Share your pickup route, dates, and passenger count. Our
                Islamabad dispatch team responds quickly with vehicle
                availability and a clear quote.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3.5 text-sm font-semibold text-white shadow-float transition hover:opacity-90"
              >
                <span>Open Booking Desk</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
