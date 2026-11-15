import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { coreServices, tourInclusions } from "../lib/travelData";
import { usePageSeo } from "../lib/usePageSeo";

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
  usePageSeo({
    title: "Travel Services, Air Ticketing, Visas & Umrah | Aseer Travel & Tours",
    description:
      "Domestic and international air ticketing, Hajj & Umrah packages, visa documentation support, corporate travel management, and private northern Pakistan tours.",
    path: "/services",
  });

  return (
    <div>
      {/* Page Header */}
      <section className="border-b border-border bg-pattern-sand py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Full-Service Travel Desk</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Travel services built for{" "}
            <span className="serif-i font-normal text-terra">
              peace of mind
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Whether you are booking an international flight, preparing Umrah
            travel documents, or organizing a 30-person northern retreat, every
            service is coordinated under one roof in Islamabad.
          </p>
        </div>
      </section>

      {/* 6 Core Services */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((svc) => (
            <div
              key={svc.num}
              className="rounded-3xl border border-border bg-white p-7 shadow-xs transition hover:border-terra/40 hover:shadow-float"
            >
              <span className="font-mono text-xs font-semibold tracking-widest text-terra">
                {svc.num}
              </span>
              <h2 className="display mt-3 text-xl text-foreground">
                {svc.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {svc.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9 Standard Tour Inclusions */}
      <section className="border-y border-border bg-card py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Standard Group Package Care</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
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
                className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-foreground shadow-xs"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-terra-soft text-terra">
                  <Check className="size-3.5" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Booking Process */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">How It Works</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Four simple steps from{" "}
              <span className="serif-i font-normal text-terra">
                enquiry to departure
              </span>
            </h2>
          </div>
          <Link
            to="/plan-trip"
            className="inline-flex items-center gap-2 rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <span>Start Your Request</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((s) => (
            <div
              key={s.step}
              className="rounded-3xl border border-border bg-white p-6 shadow-xs"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-terra-soft font-mono text-xs font-bold text-terra">
                {s.step}
              </span>
              <h3 className="display mt-4 text-lg text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
