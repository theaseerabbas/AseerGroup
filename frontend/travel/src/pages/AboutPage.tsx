import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";
import heroKarakoram from "../assets/hero-karakoram.jpg";
import { SpotlightCard } from "../components/SpotlightCard";
import { contactInfo, travelFaqs, values } from "../lib/travelData";

export function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* Page Hero */}
      <section className="border-b border-line bg-pattern-sand py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">A Subsidiary of The Aseer Group</p>
              <h1 className="display mt-2 text-4xl text-ink sm:text-5xl">
                Rooted in{" "}
                <span className="serif-i font-normal text-terra">
                  Islamabad
                </span>
                , trusted across every valley.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Aseer Travel &amp; Tours operates with a simple philosophy:{" "}
                <strong className="font-semibold text-ink">
                  {contactInfo.tagline}
                </strong>{" "}
                From weekend departures out of Islamabad to Umrah hospitality
                and corporate travel desks, we pair local insight with reliable
                execution.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-float lg:col-span-5">
              <img
                src={heroKarakoram}
                alt="Northern Pakistan mountain landscape"
                className="h-64 w-full object-cover sm:h-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <SpotlightCard className="rounded-3xl border border-line bg-paper p-8">
            <p className="eyebrow">Our Mission</p>
            <h2 className="display mt-2 text-2xl text-ink">
              Dependable journeys without the friction
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              To deliver safe, well-paced, and transparent travel experiences
              across Pakistan and abroad, backed by vetted transport, thoughtful
              accommodation, and responsive support before, during, and after
              every trip.
            </p>
          </SpotlightCard>

          <SpotlightCard className="rounded-3xl border border-terra/25 bg-terra-soft p-8">
            <p className="eyebrow">Our Vision</p>
            <h2 className="display mt-2 text-2xl text-ink">
              Elevating Pakistani hospitality on every route
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              To become the most trusted travel partner for families, students,
              pilgrims, and organizations seeking authentic discovery in northern
              Pakistan and seamless international travel.
            </p>
          </SpotlightCard>
        </div>

        {/* 5 Core Values */}
        <div className="mt-14">
          <p className="eyebrow">What Guides Us</p>
          <h2 className="display mt-2 text-3xl text-ink">Five core values</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, idx) => (
              <div
                key={v.name}
                className="rounded-2xl border border-line bg-paper p-5"
              >
                <span className="font-mono text-xs font-semibold text-terra">
                  0{idx + 1}
                </span>
                <h3 className="display mt-2 text-lg text-ink">{v.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Islamabad Offices */}
      <section className="border-y border-line bg-pattern-sand py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="eyebrow">Visit Our Desks</p>
          <h2 className="display mt-2 text-3xl text-ink">
            Two Islamabad locations to serve you
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-paper p-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-terra-soft px-3 py-1 text-xs font-semibold text-terra">
                <MapPin className="h-3.5 w-3.5" />
                <span>Head Office</span>
              </div>
              <h3 className="display mt-4 text-xl text-ink">
                Makka Heights, Sector H-13
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {contactInfo.headOffice}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href={contactInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-terra hover:underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={contactInfo.phoneHref}
                  className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-ink-soft hover:text-terra"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{contactInfo.phone}</span>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-paper p-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-terra-soft px-3 py-1 text-xs font-semibold text-terra">
                <MapPin className="h-3.5 w-3.5" />
                <span>Group Hub</span>
              </div>
              <h3 className="display mt-4 text-xl text-ink">
                NSTP, NUST H-12 Campus
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {contactInfo.hubOffice}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href={contactInfo.hubMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-terra hover:underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={contactInfo.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-ink-soft hover:text-terra"
                >
                  <span>The Aseer Group</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="text-center">
          <p className="eyebrow">Frequently Asked</p>
          <h2 className="display mt-2 text-3xl text-ink">
            Common travel questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {travelFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-line bg-paper"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-ink sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-terra transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-line px-6 py-4 text-sm leading-relaxed text-ink-soft">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/plan-trip"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition hover:bg-terra/90"
          >
            <span>Have another question? Plan a Trip</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
