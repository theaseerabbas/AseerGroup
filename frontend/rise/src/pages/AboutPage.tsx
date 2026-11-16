import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";
import bdImg from "../assets/rise-bd.jpg";
import { riseContact, riseFaqs } from "../lib/riseData";
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
    title: "About The Rise & Islamabad Offices | The Aseer Group",
    description:
      "Learn about The Rise, the commercial growth, sales, and customer support arm of The Aseer Group in Islamabad.",
    path: "/about",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeLocId, setActiveLocId] = useState<string>("h13");
  const activeLoc =
    officeLocations.find((l) => l.id === activeLocId) ?? officeLocations[0]!;

  return (
    <div className="page-in">
      <section className="border-b border-border bg-pattern-plum py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">A Subsidiary of The Aseer Group</p>
              <h1 className="display mt-2 text-3xl text-foreground sm:text-5xl">
                Built to turn{" "}
                <span className="serif-i font-normal text-plum">
                  strategy into revenue
                </span>
                .
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The Rise is the commercial growth, direct sales, and client
                operations arm of The Aseer Group, uniting Business Development,
                Sales, and Customer Support under one Islamabad operations hub.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-float lg:col-span-5">
              <img
                src={bdImg}
                alt="The Rise glass boardroom in Islamabad"
                className="h-64 w-full object-cover sm:h-72"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Visit Our Islamabad Hubs</p>
              <h2 className="display mt-2 text-3xl text-foreground">
                Two locations to collaborate
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
                      ? "bg-plum text-white shadow-xs"
                      : "border border-border bg-white text-foreground hover:border-plum/50 hover:text-plum"
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
              <div className="inline-flex items-center gap-2 rounded-full bg-plum-soft px-3 py-1 text-xs font-semibold text-plum">
                <MapPin className="size-3.5" />
                <span>Head Office</span>
              </div>
              <h3 className="display mt-4 text-xl text-foreground">
                Makka Heights, Sector H-13
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {riseContact.headOffice}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href={riseContact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-plum hover:underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="size-3.5" />
                </a>
                <a
                  href={riseContact.phoneHref}
                  className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-plum"
                >
                  <Phone className="size-3.5" />
                  <span>{riseContact.phone}</span>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-7 shadow-xs">
              <div className="inline-flex items-center gap-2 rounded-full bg-plum-soft px-3 py-1 text-xs font-semibold text-plum">
                <MapPin className="size-3.5" />
                <span>Programs &amp; Strategy Hub</span>
              </div>
              <h3 className="display mt-4 text-xl text-foreground">
                NSTP, NUST H-12 Campus
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {riseContact.hubOffice}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href={riseContact.hubMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-plum hover:underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="size-3.5" />
                </a>
                <a
                  href={riseContact.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-plum"
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
            Common questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {riseFaqs.map((faq, idx) => {
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
                    className={`size-4 shrink-0 text-plum transition-transform duration-200 ${
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
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <span>Request a Proposal</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
