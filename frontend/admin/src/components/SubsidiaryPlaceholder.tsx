import { ArrowUpRight, Layers } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

export interface SubsidiaryInfo {
  slug: string;
  name: string;
  sector: string;
  tagline: string;
  websiteUrl: string;
  modules: string[];
}

export function SubsidiaryPlaceholder({ info }: { info: SubsidiaryInfo }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-jade">{info.sector}</p>
          <h1 className="display mt-2 text-[clamp(2rem,4vw,3rem)]">{info.name}</h1>
          <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{info.tagline}</p>
        </div>
        <a
          href={info.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-jade hover:text-jade"
        >
          Visit site
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      <SpotlightCard className="bg-pattern-jade rounded-[2rem] border border-jade/15 p-8 shadow-float md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-jade shadow-xs">
              <Layers className="size-3.5" />
              Isolated Website Workspace
            </span>
            <h2 className="display mt-5 text-2xl md:text-3xl">
              Dedicated module <span className="serif-i text-jade">prepared for rollout.</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Data for {info.name} is strictly separated from The Aseer Group parent portal and
              other subsidiaries. Once this subsidiary website launches, its submissions, bookings,
              and content controls will appear here.
            </p>
          </div>
          <div className="min-w-[260px] rounded-2xl border border-jade/15 bg-white/85 p-6">
            <p className="eyebrow text-jade">Planned Sections</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-foreground">
              {info.modules.map((mod, idx) => (
                <li key={mod} className="flex items-center gap-2.5">
                  <span className="text-[12px] font-semibold tabular-nums text-jade">
                    0{idx + 1}
                  </span>
                  <span>{mod}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
