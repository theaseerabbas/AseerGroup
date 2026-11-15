import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={cn(
          "mx-auto max-w-[1240px] rounded-full border transition-all duration-700 ease-apple",
          scrolled || open
            ? "border-black/[0.08] bg-white/94 shadow-[0_10px_34px_rgba(28,25,23,0.08)] backdrop-blur-2xl"
            : "border-black/[0.06] bg-white/80 shadow-[0_4px_20px_rgba(28,25,23,0.04)] backdrop-blur-xl",
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-5">
          <Link to="/" className="inline-flex shrink-0 items-center gap-2.5">
            <img
              src={logoImg}
              alt="Aseer Travel & Tours"
              width={40}
              height={40}
              className="size-9 rounded-full object-cover ring-1 ring-black/10"
            />
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Aseer Travel &amp; Tours
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-black/[0.06] bg-black/[0.04] p-1 md:flex">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300",
                    isActive
                      ? "bg-terra text-white shadow-xs"
                      : "text-muted-foreground hover:bg-white/85 hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/plan-trip"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground shadow-xs transition-all duration-500 ease-apple hover:bg-terra md:inline-flex"
          >
            Plan a Trip
            <ArrowUpRight className="size-3.5" />
          </Link>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative size-10 md:hidden"
          >
            <span
              className={cn(
                "absolute left-2.5 right-2.5 h-px bg-foreground transition-all duration-500 ease-apple",
                open ? "top-1/2 rotate-45" : "top-[16px]",
              )}
            />
            <span
              className={cn(
                "absolute left-2.5 right-2.5 h-px bg-foreground transition-all duration-500 ease-apple",
                open ? "top-1/2 -rotate-45" : "top-[24px]",
              )}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-2 grid max-w-[1240px] overflow-hidden rounded-3xl border border-black/[0.08] bg-white/[0.98] shadow-[0_20px_50px_rgba(28,25,23,0.12)] backdrop-blur-2xl transition-all duration-500 ease-apple md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col px-6 py-4">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "border-b border-border/60 py-4 text-xl font-semibold tracking-tight",
                    isActive ? "text-terra" : "text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/plan-trip"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-terra px-5 py-3 text-[15px] font-medium text-white"
            >
              Plan a Trip
              <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
