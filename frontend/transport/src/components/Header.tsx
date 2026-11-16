import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoImg from "@/assets/aseer-transport.jpeg";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled || open
          ? "border-border bg-white/95 shadow-sm backdrop-blur-xl"
          : "border-border/70 bg-background/90 backdrop-blur-lg",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link to="/" className="inline-flex shrink-0 items-center gap-3">
          <span className="inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 ring-1 ring-border md:size-12">
            <img
              src={logoImg}
              alt="Aseer Transport Services"
              className="size-full object-contain mix-blend-multiply"
            />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground md:text-[16px]">
            Aseer Transport Services
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card p-1 md:flex">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-200",
                  isActive
                    ? "bg-cobalt text-white shadow-xs"
                    : "text-muted-foreground hover:bg-white hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/book"
            className="hidden items-center gap-1.5 rounded-full bg-cobalt px-4 py-2 text-[13px] font-semibold text-white shadow-xs transition hover:opacity-90 md:inline-flex"
          >
            <span>Book a Ride</span>
            <ArrowUpRight className="size-3.5" />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-5 pb-6 pt-3 shadow-lg md:hidden">
          <nav className="flex flex-col divide-y divide-border/70">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "py-3.5 text-base font-semibold transition-colors",
                    isActive ? "text-cobalt" : "text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/book"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cobalt px-5 py-3 text-sm font-semibold text-white"
          >
            <span>Book a Ride</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
