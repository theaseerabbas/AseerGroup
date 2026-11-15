import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import logoImg from "@/assets/aseer-travel.jpeg";
import { cn } from "@/lib/utils";

const links = [
  { href: "#top", label: "Home" },
  { href: "#packages", label: "Packages" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

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
          <a href="#top" className="inline-flex shrink-0 items-center gap-2.5">
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
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-black/[0.06] bg-black/[0.045] p-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.85)] md:flex">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-all duration-300 hover:bg-white/85 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#plan-trip"
            className="hidden items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-[13px] font-medium text-white shadow-xs transition-all duration-500 ease-apple hover:bg-primary md:inline-flex"
          >
            Plan a Trip
            <ArrowUpRight className="size-3.5" />
          </a>

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
          "mx-auto mt-2 grid max-w-[1240px] overflow-hidden rounded-3xl border border-black/[0.08] bg-white/[0.98] shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-500 ease-apple md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col px-6 py-4">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 text-xl font-semibold tracking-tight text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#plan-trip"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 text-[15px] font-medium text-white"
            >
              Plan a Trip
              <ArrowUpRight className="size-4" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
