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
import { cn } from "../lib/utils";

const officeLocations = [
  {
    id: "h13",
    badge: "Head Office",
    shortLabel: "Makka Heights, H-13",
    label: "Makka Heights, Sector H-13, Islamabad",
    address: riseContact.headOffice,
    mapUrl: riseContact.mapUrl,
    mapQuery: "Makka Heights H-13 Near NUST Gate No. 07 Islamabad Pakistan",
  },
  {
    id: "nstp",
    badge: "Programs & Strategy Hub",
    shortLabel: "NSTP, NUST H-12",
    label: "NSTP, NUST H-12 Campus, Islamabad",
    address: riseContact.hubOffice,
    mapUrl: riseContact.hubMapUrl,
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
      {/* 1. OBSIDIAN EDITORIAL HERO */}
      <section className="bg-plum-obsidian py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-champagne" />
                <p className="text-[11px] font-semibold tracking-[0.2em] text-champagne uppercase">
                  A Subsidiary of The Aseer Group
                </p>
              </div>
              <h1 className="display mt-4 text-3xl text-white sm:text-5xl">
                Built to turn{" "}
                <span className="serif-i font-normal text-champagne">
                  strategy into revenue
                </span>
                .
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
                The Rise is the commercial growth, direct sales, and client
                operations arm of The Aseer Group, uniting Business Development,
                Sales, and Customer Support under one Islamabad operations hub.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-float lg:col-span-5">
              <img
                src={bdImg}
                alt="The Rise glass boardroom in Islamabad"
                className="h-64 w-full object-cover sm:h-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE ISLAMABAD HUBS + LIVE MAP */}
      <section className="border-b border-border bg-pattern-plum py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-plum">Visit Our Islamabad Hubs</p>
              <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
                Two locations to{" "}
                <span className="serif-i font-normal text-plum">
                  collaborate
                </span>
              </h2>
            </div>
          </div>

          <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-12">
            {/* Location Switcher Cards */}
            <div className="flex flex-col justify-between gap-4 lg:col-span-5">
              {officeLocations.map((loc) => {
                const active = loc.id === activeLocId;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setActiveLocId(loc.id)}
                    className={cn(
                      "cursor-pointer rounded-3xl border p-7 transition-all duration-300",
                      active
                        ? "border-plum-ink bg-plum-obsidian text-white shadow-float"
                        : "border-border bg-white text-foreground hover:border-plum/40",
                    )}
                  >
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                        active
                          ? "bg-white/10 text-champagne"
                          : "bg-plum-soft text-plum",
                      )}
                    >
                      <MapPin className="size-3.5" />
                      <span>{loc.badge}</span>
                    </div>
                    <h3 className="display mt-4 text-xl">{loc.shortLabel}</h3>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-relaxed",
                        active ? "text-white/75" : "text-muted-foreground",
                      )}
                    >
                      {loc.address}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold">
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "inline-flex items-center gap-1.5 hover:underline",
                          active ? "text-champagne" : "text-plum",
                        )}
                      >
                        <span>Open in Maps</span>
                        <ExternalLink className="size-3.5" />
                      </a>
                      <a
                        href={riseContact.phoneHref}
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "inline-flex items-center gap-1.5",
                          active
                            ? "text-white/75 hover:text-white"
                            : "text-muted-foreground hover:text-plum",
                        )}
                      >
                        <Phone className="size-3.5" />
                        <span>{riseContact.phone}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Map Frame */}
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-float lg:col-span-7">
              <iframe
                title={`${activeLoc.label} map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(activeLoc.mapQuery)}&output=embed`}
                className="h-[340px] w-full lg:h-full lg:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL FAQ ACCORDION */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="eyebrow text-plum">Frequently Asked</p>
          <h2 className="display mt-2 text-3xl text-foreground sm:text-4xl">
            Common questions
          </h2>
        </div>

        <div className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-white shadow-xs">
          {riseFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-card/50 sm:px-8"
                >
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-plum transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="content-fade px-6 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-8">
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
            className="inline-flex items-center gap-2 rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-white shadow-float transition hover:opacity-90"
          >
            <span>Request a Proposal</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
