import { Words } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
}) {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-16 pt-40 md:pb-24 md:pt-52">
      <p className="eyebrow fade-up">{eyebrow}</p>
      <h1 className="display mt-6 max-w-5xl text-[clamp(2.75rem,7.5vw,6.5rem)]">
        <Words text={title} />
        {accent && (
          <span className="serif-i block text-jade">
            <Words text={accent} delay={250} />
          </span>
        )}
      </h1>
      {lead && (
        <p
          className="fade-up mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ animationDelay: "500ms" }}
        >
          {lead}
        </p>
      )}
    </section>
  );
}
