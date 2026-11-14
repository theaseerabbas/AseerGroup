import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Pill } from "@/components/site/Pill";
import { EnquiryCta } from "@/components/site/EnquiryCta";
import { businesses } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/businesses/")({
  head: () => ({
    meta: [
      { title: "Our Businesses — The Aseer Group" },
      {
        name: "description",
        content:
          "Aseer Transport Services, Aseer Travel & Tours, The Leap Pakistan and The Rise — the four businesses of The Aseer Group.",
      },
      { property: "og:title", content: "Our Businesses — The Aseer Group" },
      { property: "og:description", content: "Four distinct businesses, one parent organization." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Businesses,
});

function Businesses() {
  return (
    <>
      <PageHero
        eyebrow="Our businesses"
        title="Four businesses."
        accent="One shared vision."
        lead="The Aseer Group is the parent organization of four subsidiaries. Each retains its own identity and expertise, while sharing the group's mission, values and standards."
      />
      <section className="mx-auto max-w-[1240px] space-y-5 px-6 pb-32">
        {businesses.map((b, i) => (
          <Reveal key={b.slug}>
            <article
              className={cn(
                "grid overflow-hidden rounded-[2rem] bg-card md:grid-cols-2",
                i % 2 && "md:[&>*:first-child]:order-2",
              )}
            >
              <div className="relative min-h-[320px] overflow-hidden">
                {b.image ? (
                  <img
                    src={b.image}
                    alt={b.name}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1.6s] ease-apple hover:scale-105"
                  />
                ) : (
                  <div className="bg-pattern-dots absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_40%,var(--jade-soft),var(--card)_70%)]">
                    <span className="serif-i text-7xl text-jade/70">The Rise</span>
                  </div>
                )}
                {b.logo && (
                  <div className="absolute left-6 top-6 overflow-hidden rounded-2xl bg-white/95 p-1.5 shadow-sm ring-1 ring-black/8 backdrop-blur-sm">
                    <img
                      src={b.logo}
                      alt={`${b.name} logo`}
                      className="size-12 object-contain mix-blend-multiply"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col p-10 md:p-14">
                <p className="text-[13px] tabular-nums text-muted-foreground">
                  0{i + 1} — {b.sector}
                </p>
                <h2 className="display mt-6 text-[clamp(2.25rem,4vw,3.5rem)]">{b.name}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{b.intro}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {b.services.slice(0, 5).map((s) => (
                    <li
                      key={s}
                      className={cn(
                        "rounded-full bg-background px-3.5 py-1.5 text-[13px]",
                        b.placeholder && "text-placeholder",
                      )}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-6 pt-10">
                  <Link
                    to="/businesses/$slug"
                    params={{ slug: b.slug }}
                    className="rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground transition-colors duration-500 hover:bg-jade"
                  >
                    Learn more
                  </Link>
                  <Pill href={b.url} variant="link">
                    Visit website
                  </Pill>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <EnquiryCta
        eyebrow="Subsidiary partnerships"
        title="Looking for a"
        accent="specific service?"
        lead="Reach out to our group desk and we will connect you directly with the right subsidiary team."
      />
    </>
  );
}
