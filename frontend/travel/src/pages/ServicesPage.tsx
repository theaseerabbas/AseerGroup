import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SpotlightCard } from "../components/SpotlightCard";
import { coreServices, tourInclusions } from "../lib/travelData";

const bookingSteps = [
  {
    step: "01",
    title: "Share Your Dates & Group Size",
    text: "Pick a listed itinerary or describe a custom route for your family, friends, university, or office team.",
  },
  {
    step: "02",
    title: "Receive a Clear Breakdown",
    text: "Our Islamabad desk sends transport, accommodation, meal, and permit details with transparent pricing.",
  },
  {
    step: "03",
    title: "Confirm Seats & Documentation",
    text: "Lock in your departure, flight tickets, or visa paperwork with direct guidance from your coordinator.",
  },
  {
    step: "04",
    title: "Travel with Dedicated Support",
    text: "Enjoy vetted drivers, experienced tour leads, and responsive assistance from departure to return.",
  },
];

export function ServicesPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="border-b border-line bg-pattern-sand py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">Full-Service Travel Desk</p>
          <h1 className="display mt-2 text-4xl text-ink sm:text-5xl">
            Travel services built for{" "}
            <span className="serif-i font-normal text-terra">
              peace of mind
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Whether you are booking an international flight, preparing Umrah
            travel documents, or organizing a 30-person northern retreat, every
            service is coordinated under one roof in Islamabad.
          </p>
        </div>
      </section>

      {/* 6 Core Services */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((svc) => (
            <SpotlightCard
              key={svc.num}
              className="rounded-3xl border border-line bg-paper p-7 transition hover:border-terra/35 hover:shadow-float"
            >
              <span className="font-mono text-xs font-semibold tracking-widest text-terra">
                {svc.num}
              </span>
              <h2 className="display mt-3 text-xl text-ink">{svc.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                {svc.text}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 9 Standard Tour Inclusions */}
      <section className="border-y border-line bg-pattern-sand py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Standard Group Package Care</p>
            <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">
              Nine essentials included in{" "}
              <span className="serif-i font-normal text-terra">
                every northern departure
              </span>
            </h2>
          </div>

          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {tourInclusions.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3.5 text-sm font-medium text-ink shadow-xs"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terra-soft text-terra">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Booking Process */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">How It Works</p>
            <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">
              Four simple steps from{" "}
              <span className="serif-i font-normal text-terra">
                enquiry to departure
              </span>
            </h2>
          </div>
          <Link
            to="/plan-trip"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-terra/90"
          >
            <span>Start Your Request</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((s) => (
            <div
              key={s.step}
              className="rounded-3xl border border-line bg-paper p-6"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-terra-soft font-mono text-xs font-bold text-terra">
                {s.step}
              </span>
              <h3 className="display mt-4 text-lg text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
