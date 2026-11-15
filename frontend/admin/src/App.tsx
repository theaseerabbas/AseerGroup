import { useEffect, useState } from "react";
import { Building2, Compass, LogOut, TrendingUp, Truck } from "lucide-react";
import { fetchMe, getStoredToken, setStoredToken, type AdminUser } from "@/lib/api";
import { cn } from "@/lib/utils";
import { GroupWorkspace } from "./components/GroupWorkspace";
import { LoginView } from "./components/LoginView";
import { Logo } from "./components/Logo";
import { SubsidiaryPlaceholder, type SubsidiaryInfo } from "./components/SubsidiaryPlaceholder";

type WebsiteKey = "parent" | "transport" | "travel" | "the-rise";

const WEBSITES: {
  key: WebsiteKey;
  label: string;
  short: string;
  icon: typeof Building2;
  live: boolean;
}[] = [
  { key: "parent", label: "The Aseer Group", short: "Group", icon: Building2, live: true },
  {
    key: "transport",
    label: "Aseer Transport Services",
    short: "Transport",
    icon: Truck,
    live: false,
  },
  { key: "travel", label: "Aseer Travel & Tours", short: "Travel", icon: Compass, live: false },
  { key: "the-rise", label: "The Rise", short: "The Rise", icon: TrendingUp, live: false },
];

const SUBSIDIARY_META: Record<Exclude<WebsiteKey, "parent">, SubsidiaryInfo> = {
  transport: {
    slug: "transport",
    name: "Aseer Transport Services",
    sector: "Transportation & Logistics",
    tagline:
      "Dependable movement for people and goods, from corporate staff pick-and-drop to commercial freight.",
    websiteUrl: "https://transport.theaseergroup.com",
    modules: [
      "Fleet & Vehicle Categories",
      "Transport Booking Enquiries",
      "Corporate Staff Contracts",
      "Logistics & Freight Requests",
    ],
  },
  travel: {
    slug: "travel",
    name: "Aseer Travel & Tours",
    sector: "Travel Management & Tourism",
    tagline:
      "Air ticketing, Hajj and Umrah packages, corporate travel, visas, and curated tours across Pakistan.",
    websiteUrl: "https://travel.theaseergroup.com",
    modules: [
      "Tour & Hajj/Umrah Packages",
      "Visa & Ticketing Enquiries",
      "Destination Highlights",
      "Group & Corporate Travel Desk",
    ],
  },
  "the-rise": {
    slug: "the-rise",
    name: "The Rise",
    sector: "Reach • Influence • Strategy • Expansion",
    tagline:
      "Commercial growth, direct sales, and client operations across Business Development, Sales, and Customer Support.",
    websiteUrl: "https://rise.theaseergroup.com",
    modules: [
      "Business Development (BD) Leads",
      "Sales Team & WhatsApp Pipeline",
      "Customer Support & Onboarding",
      "Partner & Market Research Logs",
    ],
  },
};

export function App() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [activeSite, setActiveSite] = useState<WebsiteKey>("parent");

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setChecking(false);
      return;
    }
    fetchMe()
      .then((me) => setUser(me))
      .catch(() => setStoredToken(null))
      .finally(() => setChecking(false));
  }, []);

  const logout = () => {
    setStoredToken(null);
    setUser(null);
  };

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center text-[14px] text-muted-foreground">
        Verifying session...
      </div>
    );
  }

  if (!user) {
    return <LoginView onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 rounded-full border border-black/[0.08] bg-white/90 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl md:px-5">
          <Logo />

          <nav className="hidden items-center gap-1 rounded-full border border-black/[0.06] bg-black/[0.045] p-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)] lg:flex">
            {WEBSITES.map((site) => {
              const Icon = site.icon;
              const active = activeSite === site.key;
              return (
                <button
                  key={site.key}
                  type="button"
                  onClick={() => setActiveSite(site.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-white/80 hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  {site.label}
                  {!site.live && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px]",
                        active
                          ? "bg-white/20 text-white"
                          : "bg-jade-soft text-jade",
                      )}
                    >
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[13px] font-medium text-foreground">{user.name}</p>
              <p className="text-[11px] text-muted-foreground">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-2 flex max-w-[1320px] gap-1.5 overflow-x-auto pb-1 lg:hidden">
          {WEBSITES.map((site) => {
            const Icon = site.icon;
            const active = activeSite === site.key;
            return (
              <button
                key={site.key}
                type="button"
                onClick={() => setActiveSite(site.key)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white text-muted-foreground",
                )}
              >
                <Icon className="size-3.5" />
                {site.short}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-6 py-10 md:py-14">
        {activeSite === "parent" ? (
          <GroupWorkspace />
        ) : (
          <SubsidiaryPlaceholder info={SUBSIDIARY_META[activeSite]} />
        )}
      </main>
    </div>
  );
}
