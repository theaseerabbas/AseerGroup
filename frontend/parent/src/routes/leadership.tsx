import { createFileRoute } from "@tanstack/react-router";
import aseerAbbasImg from "@/assets/team/aseer-abbas.png";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryCta } from "@/components/site/EnquiryCta";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership | The Aseer Group" },
      {
        name: "description",
        content:
          "Meet Founder & CEO Aseer Abbas, leading strategy and operations across The Aseer Group and its subsidiaries.",
      },
      { property: "og:title", content: "Leadership | The Aseer Group" },
      { property: "og:description", content: "The leadership behind The Aseer Group." },
      { property: "og:url", content: "https://theaseergroup.com/leadership" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theaseergroup.com/leadership" }],
  }),
  component: Leadership,
});

function Leadership() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The vision"
        accent="and its founder."
        lead="Leading with integrity, accountability, and genuine care for the clients and communities we serve across Pakistan."
      />

      {/* Founder & CEO Spotlight */}
      <section className="mx-auto max-w-[1240px] px-6 pb-28">
        <Reveal className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-float">
          <div className="grid items-center md:grid-cols-12">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary md:col-span-5 md:aspect-auto md:h-full md:min-h-[480px]">
              <img
                src={aseerAbbasImg}
                alt="Aseer Abbas, Founder & CEO"
                className="size-full object-cover object-top transition-transform duration-[1.6s] ease-apple hover:scale-105"
              />
            </div>
            <div className="p-8 md:col-span-7 md:p-14 lg:p-16">
              <span className="inline-flex items-center rounded-full bg-jade-soft px-3.5 py-1 text-[12px] font-medium uppercase tracking-[0.12em] text-jade">
                Group Leadership
              </span>
              <h2 className="display mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)]">Aseer Abbas</h2>
              <p className="mt-2 text-lg font-medium text-jade">Founder &amp; CEO</p>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                As Founder &amp; CEO of The Aseer Group, Aseer Abbas leads group strategy,
                operations, and long-term direction across all subsidiaries, uniting transport,
                travel, youth development, and commercial growth under one shared standard of trust
                and service.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-3">
                <div>
                  <p className="eyebrow">Scope</p>
                  <p className="mt-1 text-[15px] font-medium">Group-wide</p>
                </div>
                <div>
                  <p className="eyebrow">Headquarters</p>
                  <p className="mt-1 text-[15px] font-medium">Islamabad, PK</p>
                </div>
                <div>
                  <p className="eyebrow">Subsidiaries</p>
                  <p className="mt-1 text-[15px] font-medium">4 Ventures</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border bg-card/60 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our culture</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.5vw,4rem)]">
              Service is <span className="serif-i text-jade">how we work.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Across every business, our teams are guided by the same principles: integrity,
              excellence, service, compassion, accountability, innovation, and patriotism.
            </p>
            <p>
              From daily operations in Islamabad to national youth cohorts in the Karakoram, every
              initiative is focused on delivering measurable, lasting value.
            </p>
          </Reveal>
        </div>
      </section>

      <EnquiryCta
        eyebrow="Connect with leadership"
        title="Partner with"
        accent="The Aseer Group."
        lead="Reach out for executive partnerships, institutional collaborations, or group enquiries."
      />
    </>
  );
}
