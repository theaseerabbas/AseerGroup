import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Bus,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Plane,
  Search,
  Users,
} from "lucide-react";
import sedanImg from "../assets/sedan.jpg";
import suv4x4Img from "../assets/suv-4x4.jpg";
import shuttleImg from "../assets/shuttle.jpg";
import transportSuvImg from "../assets/transport-suv.jpg";
import {
  fleetVehicles,
  whyChooseTransport,
  type FleetCategory,
} from "../lib/transportData";
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

const quickServiceModes = [
  {
    num: "01",
    title: "Corporate Staff Pick & Drop",
    serviceParam: "Corporate Staff Pick & Drop",
    text: "Route-optimized daily office shuttles with consolidated monthly billing.",
    Icon: Building2,
  },
  {
    num: "02",
    title: "Rent-a-Car (Self / Chauffeur)",
    serviceParam: "Rent-a-Car (With or Without Driver)",
    text: "Flexible daily, weekly, and monthly hatchbacks, sedans, and 4x4s.",
    Icon: Car,
  },
  {
    num: "03",
    title: "Airport & VIP Transfers",
    serviceParam: "Event & Wedding Transfers",
    text: "On-time Islamabad airport pickups, protocol sedans, and event convoys.",
    Icon: Plane,
  },
  {
    num: "04",
    title: "University & Group Shuttles",
    serviceParam: "School, College & University Transport",
    text: "Verified campus commuter vans and 28-seat Coasters for large groups.",
    Icon: Bus,
  },
];

const fleetPreviewTabs: { value: Exclude<FleetCategory, "all">; label: string }[] = [
  { value: "sedan", label: "Sedans" },
  { value: "4x4", label: "4x4 & SUVs" },
  { value: "luxury", label: "Luxury Cars" },
  { value: "vans-buses", label: "Vans & Coasters" },
  { value: "hatchback", label: "Hatchbacks" },
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
  const [previewCat, setPreviewCat] = useState<Exclude<FleetCategory, "all">>("sedan");

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % fleetSlides.length);
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
      (prev) => (prev - 1 + fleetSlides.length) % fleetSlides.length,
    );
  }

  function nextSlide() {
    setActiveSlide((prev) => (prev + 1) % fleetSlides.length);
  }

  const current = fleetSlides[activeSlide] ?? fleetSlides[0]!;

  const previewModels = useMemo(
    () => fleetVehicles.filter((v) => v.category === previewCat).slice(0, 3),
    [previewCat],
  );

  return (
    <div>
      {/* 1. CENTERED EXECUTIVE HERO + WIDE HORIZONTAL SLIDE-THROUGH STAGE */}
      <section className="border-b border-border bg-pattern-cobalt py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">
              Islamabad · Corporate Contracts · Nationwide
            </p>
            <h1 className="display mt-3 text-4xl text-foreground sm:text-5xl lg:text-[3.75rem]">
              Precision mobility{" "}
              <span className="serif-i font-normal text-cobalt">
                built on punctuality
              </span>{" "}
              and care.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              GPS-tracked personal rides, corporate staff pick-and-drop,
              university shuttles, rent-a-car, and commercial freight across
              Pakistan.
            </p>

            {/* Centered Fleet Finder */}
            <form
              onSubmit={handleSearch}
              className="mx-auto mt-7 max-w-xl rounded-2xl border border-border bg-white p-2 shadow-float"
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
                    className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-cobalt focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-cobalt px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <span>Find Vehicle</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Wide Horizontal Slide-Through Fleet Showcase */}
          <div
            className="mt-10 overflow-hidden rounded-3xl border border-border bg-white shadow-float"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Top Category Switcher Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-wrap gap-1.5">
                {fleetSlides.map((slide, idx) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      idx === activeSlide
                        ? "bg-cobalt text-white shadow-xs"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {slide.title}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous vehicle slide"
                  className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-cobalt hover:text-cobalt"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next vehicle slide"
                  className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-cobalt hover:text-cobalt"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Slide-Through Track */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {fleetSlides.map((slide) => (
                  <div
                    key={slide.title}
                    className="relative h-[320px] w-full shrink-0 sm:h-[400px] lg:h-[430px]"
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end sm:p-8">
                      <div className="max-w-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-cobalt px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                            {slide.badge}
                          </span>
                          <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                            {slide.capacity}
                          </span>
                        </div>
                        <h2 className="display mt-3 text-2xl text-white sm:text-4xl">
                          {slide.title}
                        </h2>
                        <p className="mt-1.5 text-xs leading-relaxed text-white/90 sm:text-sm">
                          {slide.caption}
                        </p>
                      </div>
                      <Link
                        to={`/book?vehicle=${encodeURIComponent(slide.title)}`}
                        className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-foreground shadow-sm transition hover:bg-cobalt hover:text-white sm:self-auto sm:text-sm"
                      >
                        <span>Reserve {slide.title.split(" ")[0]}</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* 5s Animated Progress Bar */}
              {!paused && (
                <div className="h-1 w-full bg-border/60">
                  <div
                    key={activeSlide}
                    className="h-full w-full bg-cobalt animate-slide-progress"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR SERVICE MODES STRIP */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">How We Serve</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Mobility tailored to{" "}
              <span className="serif-i font-normal text-cobalt">
                your schedule
              </span>
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-cobalt transition hover:opacity-80"
          >
            <span>Explore all 8 services</span>
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickServiceModes.map(({ num, title, serviceParam, text, Icon }) => (
            <article
              key={num}
              className="group flex flex-col justify-between rounded-3xl border border-border bg-white p-6 shadow-xs transition hover:border-cobalt/40 hover:shadow-float"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-cobalt-soft text-cobalt transition group-hover:bg-cobalt group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {num}
                  </span>
                </div>
                <h3 className="display mt-5 text-lg text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-3.5">
                <Link
                  to={`/book?service=${encodeURIComponent(serviceParam)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cobalt transition hover:opacity-80"
                >
                  <span>Request quote</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE FLEET PREVIEW */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">24-Vehicle Lineup</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
                Preview models by{" "}
                <span className="serif-i font-normal text-cobalt">
                  vehicle class
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {fleetPreviewTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setPreviewCat(tab.value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    previewCat === tab.value
                      ? "bg-cobalt text-white shadow-xs"
                      : "border border-border bg-white text-foreground hover:border-cobalt/50 hover:text-cobalt"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {previewModels.map((vehicle) => (
              <article
                key={vehicle.id}
                className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 shadow-xs transition hover:border-cobalt/40 hover:shadow-float"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-cobalt-soft px-3 py-1 text-[11px] font-semibold text-cobalt">
                      {vehicle.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <Users className="size-3 text-cobalt" />
                      {vehicle.seats}
                    </span>
                  </div>
                  <h3 className="display mt-4 text-xl text-foreground">
                    {vehicle.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {vehicle.useCase}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    {vehicle.driverOption}
                  </span>
                  <Link
                    to={`/book?vehicle=${encodeURIComponent(vehicle.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cobalt hover:opacity-80"
                  >
                    <span>Book</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to={`/fleet?cat=${previewCat}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:opacity-80"
            >
              <span>View all {current.category === previewCat ? "models in this class" : "24 vehicles"}</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. OPERATIONAL STANDARDS + CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
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
              Clean vehicles, verified drivers, GPS-enabled route tracking, and
              24/7 dispatch support across Islamabad and beyond.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {whyChooseTransport.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-foreground shadow-xs"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cobalt-soft text-cobalt">
                  <Check className="size-3.5" />
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-cobalt/20 bg-cobalt-soft p-8 sm:p-12">
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
                Islamabad dispatch team responds promptly with availability and
                a clear quote.
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
