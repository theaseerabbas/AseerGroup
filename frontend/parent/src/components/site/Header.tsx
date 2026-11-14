import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { nav, businesses } from "@/lib/site";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [path]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={cn(
          "mx-auto max-w-[1240px] rounded-full border transition-all duration-700 ease-apple",
          scrolled || open
            ? "border-black/[0.08] bg-white/92 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
            : "border-black/[0.05] bg-white/75 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-xl",
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-5">
          <Link to="/" aria-label="The Aseer Group home" className="shrink-0">
            <Logo />
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full bg-secondary/60 p-1 md:flex"
            onMouseLeave={() => setMenu(false)}
          >
            {nav.map((n) => {
              const isActive =
                n.to === "/"
                  ? path === "/"
                  : n.to === "/businesses"
                    ? path.startsWith("/businesses")
                    : path === n.to;

              return n.to === "/businesses" ? (
                <div key={n.to} className="relative" onMouseEnter={() => setMenu(true)}>
                  <Link
                    to="/businesses"
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:bg-white/80 hover:text-foreground",
                    )}
                  >
                    {n.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-500 ease-apple",
                        menu && "rotate-180",
                      )}
                    />
                  </Link>

                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-[260px] -translate-x-1/2 pt-3 transition-all duration-300 ease-apple",
                      menu
                        ? "visible translate-y-0 opacity-100"
                        : "pointer-events-none invisible -translate-y-2 opacity-0",
                    )}
                  >
                    <div className="rounded-2xl border border-black/[0.08] bg-white/[0.98] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.14)] backdrop-blur-2xl">
                      {businesses.map((b) => {
                        const subActive = path === `/businesses/${b.slug}`;
                        return (
                          <Link
                            key={b.slug}
                            to="/businesses/$slug"
                            params={{ slug: b.slug }}
                            className={cn(
                              "group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors duration-200",
                              subActive
                                ? "bg-jade-soft text-jade"
                                : "text-foreground hover:bg-secondary",
                            )}
                          >
                            <span>{b.name}</span>
                            <ArrowUpRight className="size-3.5 opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-white/80 hover:text-foreground",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-jade px-4 py-2 text-[13px] font-medium text-white shadow-xs transition-all duration-500 ease-apple hover:bg-primary md:inline-flex"
          >
            Enquire
            <ArrowUpRight className="size-3.5" />
          </Link>

          <button
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
          "mx-auto mt-2 grid max-w-[1240px] overflow-hidden rounded-3xl border border-black/[0.08] bg-white/[0.98] shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-500 ease-apple md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col px-6 py-4">
            {nav.map((n, i) => {
              const isActive =
                n.to === "/"
                  ? path === "/"
                  : n.to === "/businesses"
                    ? path.startsWith("/businesses")
                    : path === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "border-b border-border/60 py-4 text-xl font-semibold tracking-tight last:border-b-0",
                    isActive ? "text-jade" : "text-foreground",
                  )}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
