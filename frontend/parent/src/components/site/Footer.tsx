import { Link } from "@tanstack/react-router";
import { company, nav, businesses } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto max-w-[1240px] px-6 pb-10 pt-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size="lg" />
            <p className="serif-i mt-6 text-3xl text-foreground">{company.tagline}</p>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              A diversified Pakistani business group built on trust, excellence and service — the
              parent organization of four distinct businesses.
            </p>
          </div>
          <FooterCol title="Group">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="u-link">
                {n.label}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Businesses">
            {businesses.map((b) => (
              <Link
                key={b.slug}
                to="/businesses/$slug"
                params={{ slug: b.slug }}
                className="u-link"
              >
                {b.name}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Get in Touch" wide>
            <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="u-link">
              {company.locations[0]!.address}
            </a>
            <span className="text-muted-foreground">{company.locations[1]!.address}</span>
            <a href={company.phoneHref} className="u-link">
              {company.phone}
            </a>
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link"
            >
              WhatsApp: {company.whatsapp}
            </a>
            <a href={company.emailHref} className="u-link">
              {company.email}
            </a>
          </FooterCol>
        </div>
        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-6 text-[12px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} The Aseer Group. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="u-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="u-link">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  wide,
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "md:col-span-3" : "md:col-span-2"}>
      <p className="eyebrow">{title}</p>
      <div className="mt-5 flex flex-col items-start gap-3 text-[14px] text-foreground/80">
        {children}
      </div>
    </div>
  );
}
