import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { coreTransportServices, whyChooseTransport } from "../lib/transportData";
import { usePageSeo } from "../lib/usePageSeo";

const dispatchSteps = [
  {
    step: "01",
    title: "Share Route & Schedule",
    text: "Tell us your pickup sector, destination, preferred vehicle class, and whether you need a driver.",
  },
  {
    step: "02",
    title: "Receive Transparent Pricing",
    text: "Our Islamabad dispatch desk sends a clear breakdown for single trips, rentals, or monthly contracts.",
  },
  {
    step: "03",
    title: "Driver & GPS Assignment",
    text: "Get verified driver details, vehicle plate number, and GPS-enabled route coordination ahead of pickup.",
  },
  {
    step: "04",
    title: "24/7 En-Route Support",
    text: "Travel with dependable on-time arrivals and round-the-clock support from our operations team.",
  },
];

export function ServicesPage() {
  usePageSeo({
    title: "Transport Services, Staff Pick & Drop & Rentals | Aseer Transport Services",
    description:
      "Personal & family transport, corporate staff pick & drop, school & university shuttles, rent-a-car, wedding transfers, and commercial freight across Pakistan.",
    path: "/services",
  });

  return (
    <div>
      <section className="border-b border-border bg-pattern-cobalt py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Mobility &amp; Logistics Solutions</p>
          <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
            Eight transport services built for{" "}
            <span className="serif-i font-normal text-cobalt">
              everyday reliability
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Whether you need a daily staff shuttle in Islamabad, a chauffeur-driven
            sedan for guests, or commercial parcel movement, we operate with
            punctuality and care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {coreTransportServices.map((svc) => (
            <div
              key={svc.num}
              className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 shadow-xs transition hover:border-cobalt/40 hover:shadow-float"
            >
              <div>
                <span className="font-mono text-xs font-semibold tracking-widest text-cobalt">
                  {svc.num}
                </span>
                <h2 className="display mt-3 text-lg text-foreground">
                  {svc.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {svc.text}
                </p>
              </div>
              <div className="mt-5 border-t border-border pt-3.5">
                <Link
                  to={`/book?service=${encodeURIComponent(svc.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cobalt hover:opacity-80"
                >
                  <span>Request quote</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Why Choose Aseer Transport</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Six standards on{" "}
              <span className="serif-i font-normal text-cobalt">
                every dispatch
              </span>
            </h2>
          </div>

          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseTransport.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-foreground shadow-xs"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cobalt-soft text-cobalt">
                  <Check className="size-3.5" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Dispatch Workflow</p>
            <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
              Four steps from{" "}
              <span className="serif-i font-normal text-cobalt">
                booking to pickup
              </span>
            </h2>
          </div>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-cobalt px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <span>Book a Vehicle</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dispatchSteps.map((s) => (
            <div
              key={s.step}
              className="rounded-3xl border border-border bg-white p-6 shadow-xs"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-cobalt-soft font-mono text-xs font-bold text-cobalt">
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
