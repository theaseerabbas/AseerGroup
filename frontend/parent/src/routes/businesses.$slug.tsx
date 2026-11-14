import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal, Words } from "@/components/site/Reveal";
import { Pill } from "@/components/site/Pill";
import { businesses } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/businesses/$slug")({
  loader: ({ params }) => {
    const b = businesses.find((x) => x.slug === params.slug);
    if (!b) throw notFound();
    return { slug: b.slug };
  },
  head: ({ loaderData }) => {
    const b = businesses.find((x) => x.slug === loaderData?.slug);
    const title = b ? `${b.name} — The Aseer Group` : "Business — The Aseer Group";
    const desc = b ? b.intro : "A business of The Aseer Group.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BusinessPage,
});

function BusinessPage() {
  const { slug } = Route.useLoaderData();
  const b = businesses.find((x) => x.slug === slug)!;
  const idx = businesses.indexOf(b);
  const next = businesses[(idx + 1) % businesses.length]!;
  const isLeap = b.slug === "the-leap";

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pb-16 pt-40 md:pt-52">
        <Link to="/businesses" className="eyebrow fade-up u-link">
          ← A business of The Aseer Group
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          {b.logo && (
            <div className="fade-up grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/8 md:size-20">
              <img
                src={b.logo}
                alt={`${b.name} logo`}
                className="size-full object-contain mix-blend-multiply"
              />
            </div>
          )}
          <h1 className="display text-[clamp(3rem,8vw,7rem)]">
            <Words text={b.name} />
          </h1>
        </div>
        <div
          className="fade-up mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end"
          style={{ animationDelay: "450ms" }}
        >
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {b.intro}
          </p>
          <Pill href={b.url}>{isLeap ? "Visit theleappakistan.com" : "Visit website"}</Pill>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-3 md:px-6">
        <div
          className="fade-up overflow-hidden rounded-[2rem] md:rounded-[2.75rem]"
          style={{ animationDelay: "300ms" }}
        >
          {b.image ? (
            <img
              src={b.image}
              alt={b.name}
              width={1280}
              height={960}
              className="slow-zoom aspect-[16/10] w-full object-cover md:aspect-[21/9]"
            />
          ) : (
            <div className="grid aspect-[16/10] place-items-center bg-[radial-gradient(circle_at_50%_30%,var(--jade-soft),var(--card)_70%)] md:aspect-[21/9]">
              <p className="text-center text-[14px] text-placeholder">
                [Imagery and full business profile — to be provided]
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-12 px-6 py-32 md:grid-cols-12 md:py-40">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">Sector</p>
          <p
            className={cn(
              "mt-4 text-2xl font-medium tracking-tight",
              b.placeholder && "text-placeholder",
            )}
          >
            {b.sector}
          </p>
          {isLeap && (
            <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground">
              The Leap Pakistan is an existing member of The Aseer Group with its own independent
              website and programs.
            </p>
          )}
          {b.highlights && (
            <dl className="mt-10 space-y-5 border-t border-border pt-8">
              {b.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="eyebrow">{h.label}</dt>
                  <dd className="mt-1 text-[15px] font-medium text-foreground">{h.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
        <div className="md:col-span-8">
          <Reveal>
            <p className="eyebrow">{isLeap ? "Five learning modules" : "Services"}</p>
          </Reveal>
          <ul className="mt-6">
            {b.services.map((s, i) => (
              <Reveal
                as="li"
                key={s}
                delay={i * 50}
                className={cn(
                  "flex items-baseline gap-6 border-b border-border py-5 text-xl tracking-tight md:text-2xl",
                  b.placeholder && "text-placeholder",
                )}
              >
                <span className="w-8 text-[13px] tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {b.extra && (
        <section className="bg-card py-28 md:py-36">
          <div className="mx-auto max-w-[1240px] px-6">
            <Reveal>
              <p className="eyebrow">{b.extraTitle}</p>
            </Reveal>
            {isLeap ? (
              <Reveal delay={100}>
                <p className="display mt-8 max-w-4xl text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15]">
                  {b.extra[0]}
                </p>
                <p className="mt-10 max-w-2xl text-lg text-muted-foreground">
                  Mission: to provide practical learning experiences combining leadership, future
                  skills, mentorship, reflection, and real-world exposure.
                </p>
              </Reveal>
            ) : (
              <div className="mt-10 flex flex-wrap gap-3">
                {b.extra.map((e, i) => (
                  <Reveal key={e} delay={i * 40}>
                    <span className="inline-block rounded-full bg-background px-5 py-2.5 text-[16px] shadow-float transition-transform duration-500 ease-apple hover:-translate-y-0.5">
                      {e}
                    </span>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1240px] px-6 py-24">
        <Link
          to="/businesses/$slug"
          params={{ slug: next.slug }}
          className="group flex items-end justify-between border-y border-border py-12"
        >
          <div>
            <p className="eyebrow">Next business</p>
            <p className="display mt-4 text-[clamp(2rem,5vw,4.5rem)] transition-colors duration-500 group-hover:text-jade">
              {next.name}
            </p>
          </div>
          <span className="text-4xl transition-transform duration-700 ease-apple group-hover:translate-x-2">
            →
          </span>
        </Link>
      </section>
    </>
  );
}
