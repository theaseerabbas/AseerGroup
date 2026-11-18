import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/aseer-travel.jpeg";
import { contactInfo } from "@/lib/travelData";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-3">
              <img
                src={logoImg}
                alt="Aseer Travel & Tours"
                width={44}
                height={44}
                className="size-11 rounded-full object-cover ring-1 ring-black/10"
              />
              <div>
                <p className="font-semibold tracking-tight text-foreground">{contactInfo.name}</p>
                <p className="text-[12px] text-muted-foreground">
                  A subsidiary of{" "}
                  <a
                    href={contactInfo.parentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link font-medium text-terra"
                  >
                    {contactInfo.parentName}
                  </a>
                </p>
              </div>
            </div>
            <p className="serif-i mt-6 text-3xl text-foreground">{contactInfo.tagline}</p>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Curated domestic &amp; international tours, Hajj &amp; Umrah packages, air ticketing,
              visas, and corporate travel management.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aseer Travel & Tours on Facebook"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-terra hover:text-terra"
              >
                <Facebook className="size-4" />
                Facebook
              </a>
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aseer Travel & Tours on Instagram"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-terra hover:text-terra"
              >
                <Instagram className="size-4" />
                Instagram
              </a>
              <a
                href={contactInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aseer Travel & Tours on LinkedIn"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-terra hover:text-terra"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            <div>
              <p className="eyebrow">Explore</p>
              <div className="mt-5 flex flex-col gap-3 text-[15px]">
                <Link to="/" className="u-link">
                  Home
                </Link>
                <Link to="/packages" className="u-link">
                  Tour Packages
                </Link>
                <Link to="/services" className="u-link">
                  Travel Services
                </Link>
                <Link to="/about" className="u-link">
                  About Us
                </Link>
                <Link to="/plan-trip" className="u-link">
                  Plan a Trip
                </Link>
              </div>
            </div>

            <div>
              <p className="eyebrow">Offices</p>
              <div className="mt-5 flex flex-col gap-3 text-[14px] text-muted-foreground">
                <a
                  href={contactInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link text-foreground"
                >
                  Makka Heights, H-13, Islamabad
                </a>
                <a
                  href={contactInfo.hubMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link"
                >
                  NSTP, NUST H-12 Campus
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow">Get in Touch</p>
              <div className="mt-5 flex flex-col gap-3 text-[14px]">
                <a href={contactInfo.emailHref} className="u-link">
                  {contactInfo.email}
                </a>
                <a href={contactInfo.phoneHref} className="u-link">
                  {contactInfo.phone}
                </a>
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link text-terra"
                >
                  WhatsApp: {contactInfo.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-[13px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Aseer Travel &amp; Tours. All rights reserved.</p>
          <a
            href={contactInfo.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link"
          >
            theaseergroup.com
          </a>
        </div>
      </div>
    </footer>
  );
}
