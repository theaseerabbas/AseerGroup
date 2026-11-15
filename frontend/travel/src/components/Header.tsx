import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoImg from "@/assets/aseer-travel.jpeg";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
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
        <Link to="/" className="inline-flex shrink-0 items-center gap-2.5">
          <img
            src={logoImg}
            alt="Aseer Travel & Tours"
            width={40}
            height={40}
            className="size-9 rounded-full object-cover ring-1 ring-border sm:size-10"
          />
          <span className="text-[15px] font-semibold tracking-tight text-foreground sm:text-base">
            Aseer Travel &amp; Tours
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
                    ? "bg-terra text-white shadow-xs"
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
            to="/plan-trip"
            className="hidden items-center gap-1.5 rounded-full bg-terra px-4 py-2 text-[13px] font-semibold text-white shadow-xs transition hover:opacity-90 md:inline-flex"
          >
            <span>Plan a Trip</span>
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

      {/* Mobile Drawer */}
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
                    isActive ? "text-terra" : "text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/plan-trip"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-terra px-5 py-3 text-sm font-semibold text-white"
          >
            <span>Plan a Trip</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
