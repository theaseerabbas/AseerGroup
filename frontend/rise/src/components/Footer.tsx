import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { riseContact } from "@/lib/riseData";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 ring-1 ring-border">
                <img
                  src="/logo.png"
                  alt="The Rise"
                  className="size-full object-contain"
                />
              </span>
              <div>
                <p className="font-semibold tracking-tight text-foreground">{riseContact.name}</p>
                <p className="text-[12px] text-muted-foreground">
                  A subsidiary of{" "}
                  <a
                    href={riseContact.parentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link font-medium text-plum"
                  >
                    {riseContact.parentName}
                  </a>
                </p>
              </div>
            </div>
            <p className="serif-i mt-6 text-3xl text-foreground">{riseContact.acronym}</p>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Commercial growth, direct sales, and client operations across Business Development,
              Sales, and Customer Support.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={riseContact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Rise on LinkedIn"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-plum hover:text-plum"
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
                <Link to="/" className="u-link w-fit">
                  Home
                </Link>
                <Link to="/services" className="u-link w-fit">
                  Services
                </Link>
                <Link to="/approach" className="u-link w-fit">
                  R·I·S·E Approach
                </Link>
                <Link to="/about" className="u-link w-fit">
                  About Us
                </Link>
                <Link to="/contact" className="u-link w-fit">
                  Request a Desk
                </Link>
              </div>
            </div>

            <div>
              <p className="eyebrow">Offices</p>
              <div className="mt-5 flex flex-col gap-3 text-[14px] text-muted-foreground">
                <a
                  href={riseContact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link w-fit text-foreground"
                >
                  Makka Heights, H-13, Islamabad
                </a>
                <a
                  href={riseContact.hubMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link w-fit"
                >
                  NSTP, NUST H-12 Campus
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow">Growth Desk</p>
              <div className="mt-5 flex flex-col gap-3 text-[14px]">
                <a href={riseContact.phoneHref} className="u-link w-fit">
                  {riseContact.phone}
                </a>
                <a
                  href={riseContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link w-fit text-plum"
                >
                  WhatsApp: {riseContact.whatsapp}
                </a>
                <a href={riseContact.emailHref} className="u-link w-fit">
                  {riseContact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {riseContact.name}. All rights reserved.
          </p>
          <p>
            Part of{" "}
            <a
              href={riseContact.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-plum"
            >
              The Aseer Group
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
