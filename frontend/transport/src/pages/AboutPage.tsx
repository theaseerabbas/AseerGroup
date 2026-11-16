import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";
import transportSuvImg from "../assets/transport-suv.jpg";
import {
  transportContact,
  transportFaqs,
  transportValues,
} from "../lib/transportData";
import { usePageSeo } from "../lib/usePageSeo";

const officeLocations = [
  {
    id: "h13",
    shortLabel: "Makka Heights, H-13",
    label: "Makka Heights, Sector H-13, Islamabad",
    mapQuery: "Makka Heights H-13 Near NUST Gate No. 07 Islamabad Pakistan",
  },
  {
    id: "nstp",
    shortLabel: "NSTP, NUST H-12",
    label: "NSTP, NUST H-12 Campus, Islamabad",
    mapQuery: "National Science and Technology Park NSTP NUST H-12 Islamabad",
  },
];

export function AboutPage() {
  usePageSeo({
    title: "About Us & Islamabad Dispatch Office | Aseer Transport Services",
    description:
      "Learn about Aseer Transport Services, a subsidiary of The Aseer Group. Visit our Makka Heights H-13 Head Office or NSTP NUST H-12 hub in Islamabad.",
    path: "/about",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeLocId, setActiveLocId] = useState<string>("h13");
  const activeLoc =
    officeLocations.find((l) => l.id === activeLocId) ?? officeLocations[0]!;

  return (
    <div className="page-in">
      <section className="border-b border-border bg-pattern-cobalt py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">A Subsidiary of The Aseer Group</p>
              <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
                Safe, punctual{" "}
                <span className="serif-i font-normal text-cobalt">
                  mobility
                </span>{" "}
                across Pakistan.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Aseer Transport Services specializes in providing safe, reliable,
                and efficient transportation solutions across Pakistan. From
                personal travel to corporate mobility, our mission is to ensure
                comfort, punctuality, and professionalism in every ride.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-float lg:col-span-5">
              <img
                src={transportSuvImg}
                alt="Aseer Transport Services executive fleet"
                className="h-64 w-full object-cover sm:h-72"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-xs">
            <p className="eyebrow">Our Mission</p>
            <h2 className="display mt-2 text-2xl text-foreground">
              Redefining mobility with precision
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We aim to redefine travel by delivering exceptional services in
              transport, corporate mobility, and logistics, focused on customer
              satisfaction, innovation, and positive community impact.
            </p>
          </div>

          <div className="rounded-3xl border border-cobalt/20 bg-cobalt-soft p-8">
            <p className="eyebrow">Our Vision</p>
            <h2 className="display mt-2 text-2xl text-foreground">
              Setting the benchmark for reliability
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              To become a recognized leader in transportation and mobility
              across Pakistan, renowned for vehicle excellence, verified drivers,
              and dependable service.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <p className="eyebrow">What Guides Us</p>
          <h2 className="display mt-2 text-3xl text-foreground">
            Five core values
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {transportValues.map((v, idx) => (
              <div
                key={v.name}
                className="rounded-2xl border border-border bg-white p-5 shadow-xs"
              >
                <span className="font-mono text-xs font-semibold text-cobalt">
                  0{idx + 1}
                </span>
                <h3 className="display mt-2 text-lg text-foreground">
                  {v.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Islamabad Offices + Embedded Map */}
      <section className="border-y border-border bg-card py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Visit Our Dispatch Desk</p>
              <h2 className="display mt-2 text-3xl text-foreground">
                Two Islamabad locations
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {officeLocations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setActiveLocId(loc.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeLocId === loc.id
                      ? "bg-cobalt text-white shadow-xs"
                      : "border border-border bg-white text-foreground hover:border-cobalt/50 hover:text-cobalt"
                  }`}
                >
                  {loc.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <iframe
              title={`${activeLoc.label} map`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(activeLoc.mapQuery)}&output=embed`}
              className="h-[340px] w-full sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-white p-7 shadow-xs">
              <div className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold text-cobalt">
                <MapPin className="size-3.5" />
                <span>Head Office</span>
              </div>
              <h3 className="display mt-4 text-xl text-foreground">
                Makka Heights, Sector H-13
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {transportContact.headOffice}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href={transportContact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-cobalt hover:underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="size-3.5" />
                </a>
                <a
                  href={transportContact.phoneHref}
                  className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-cobalt"
                >
                  <Phone className="size-3.5" />
                  <span>{transportContact.phone}</span>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-7 shadow-xs">
              <div className="inline-flex items-center gap-2 rounded-full bg-cobalt-soft px-3 py-1 text-xs font-semibold text-cobalt">
                <MapPin className="size-3.5" />
                <span>Corporate Hub</span>
              </div>
              <h3 className="display mt-4 text-xl text-foreground">
                NSTP, NUST H-12 Campus
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {transportContact.hubOffice}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href={transportContact.hubMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-cobalt hover:underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="size-3.5" />
                </a>
                <a
                  href={transportContact.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-cobalt"
                >
                  <span>The Aseer Group</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <p className="eyebrow">Frequently Asked</p>
          <h2 className="display mt-2 text-3xl text-foreground">
            Common transport questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {transportFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-cobalt transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <span>Ready to book? Open Booking Desk</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
