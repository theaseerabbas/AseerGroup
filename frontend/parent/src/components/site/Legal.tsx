import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

export function Legal({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead="Last updated: [date to be confirmed]" />
      <section className="mx-auto max-w-[820px] space-y-14 px-6 pb-40">
        {sections.map(([h, b], i) => (
          <Reveal key={h}>
            <p className="text-[13px] tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{h}</h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-foreground/75">{b}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}
