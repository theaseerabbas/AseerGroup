import { createFileRoute } from "@tanstack/react-router";
import aseerAbbasImg from "@/assets/team/aseer-abbas.png";
import ziaUrRehmanImg from "@/assets/team/zia-ur-rehman.webp";
import ayeshaNoreenImg from "@/assets/team/ayesha-noreen.png";
import bismaHaiderImg from "@/assets/team/bisma-haider.webp";
import zainabSaudImg from "@/assets/team/zainab-saud.png";
import leapLogo from "@/assets/logos/leap-pakistan.jpeg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryCta } from "@/components/site/EnquiryCta";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership & Our Team — The Aseer Group" },
      {
        name: "description",
        content:
          "Meet Executive Director Aseer Abbas and the leadership team driving The Aseer Group and its subsidiaries.",
      },
      { property: "og:title", content: "Leadership — The Aseer Group" },
      { property: "og:description", content: "The people and leadership behind The Aseer Group." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Leadership,
});

const leapTeam = [
  {
    name: "Zia Ur Rehman",
    role: "Chief Executive Officer",
    subsidiary: "The Leap Pakistan",
    photo: ziaUrRehmanImg,
  },
  {
    name: "Ayesha Noreen",
    role: "Partnerships Lead",
    subsidiary: "The Leap Pakistan",
    photo: ayeshaNoreenImg,
  },
  {
    name: "Bisma Haider",
    role: "Ambassadors Lead",
    subsidiary: "The Leap Pakistan",
    photo: bismaHaiderImg,
  },
  {
    name: "Zainab Saud",
    role: "Social Media Manager",
    subsidiary: "The Leap Pakistan",
    photo: zainabSaudImg,
  },
];

function Leadership() {
  return (
    <>
      <PageHero
        eyebrow="Leadership & our team"
        title="The people"
        accent="behind the vision."
        lead="Our people bring the group's values to life — leading with integrity, accountability and genuine care for the clients and communities we serve."
      />

      {/* Executive Director Spotlight */}
      <section className="mx-auto max-w-[1240px] px-6 pb-28">
        <Reveal className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-float">
          <div className="grid items-center md:grid-cols-12">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary md:col-span-5 md:aspect-auto md:h-full md:min-h-[480px]">
              <img
                src={aseerAbbasImg}
                alt="Aseer Abbas — Executive Director"
                className="size-full object-cover object-top transition-transform duration-[1.6s] ease-apple hover:scale-105"
              />
            </div>
            <div className="p-8 md:col-span-7 md:p-14 lg:p-16">
              <span className="inline-flex items-center rounded-full bg-jade-soft px-3.5 py-1 text-[12px] font-medium uppercase tracking-[0.12em] text-jade">
                Group Leadership
              </span>
              <h2 className="display mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)]">Aseer Abbas</h2>
              <p className="mt-2 text-lg font-medium text-jade">Executive Director</p>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                As Executive Director of The Aseer Group, Aseer Abbas oversees group strategy,
                operations, and long-term direction across all subsidiaries — uniting transport,
                travel, youth development, and future ventures under one shared standard of trust
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

      {/* Subsidiary Leadership: The Leap Pakistan */}
      <section className="bg-pattern-dots border-t border-border bg-card/60 py-28 md:py-36">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-black/8">
                  <img
                    src={leapLogo}
                    alt="The Leap Pakistan logo"
                    className="size-full object-contain mix-blend-multiply"
                  />
                </div>
                <p className="eyebrow">The Leap Pakistan</p>
              </div>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)]">
                Leadership & <span className="serif-i text-jade">core team.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Driving youth development, partnerships, and experiential learning across Pakistan.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {leapTeam.map((member, i) => (
              <Reveal
                key={member.name}
                delay={i * 90}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-float transition-all duration-500 ease-apple hover:-translate-y-1 sm:flex-row sm:items-stretch"
              >
                <div className="relative aspect-[4/4] w-full shrink-0 overflow-hidden bg-secondary sm:aspect-[4/5] sm:w-48 md:w-52">
                  <img
                    src={member.photo}
                    alt={`${member.name} — ${member.role}`}
                    loading="lazy"
                    className="size-full object-cover object-top transition-transform duration-[1.4s] ease-apple group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-7 md:p-8">
                  <div>
                    <p className="eyebrow text-jade">{member.subsidiary}</p>
                    <h3 className="display mt-3 text-2xl md:text-3xl">{member.name}</h3>
                    <p className="mt-2 text-[15px] font-medium text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-jade" />
                    <span>Active Leadership</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-28 md:py-36">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our culture</p>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.5vw,4rem)]">
              Service is <span className="serif-i text-jade">how we work.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Across every business, our teams are guided by the same principles — integrity,
              excellence, service, compassion, accountability, innovation, and patriotism.
            </p>
            <p>
              From daily operations in Islamabad to national youth cohorts in the Karakoram, every
              leader and team member is focused on delivering measurable, lasting value.
            </p>
          </Reveal>
        </div>
      </section>

      <EnquiryCta
        eyebrow="Connect with leadership"
        title="Partner with"
        accent="our team."
        lead="Reach out for executive partnerships, institutional collaborations, or group enquiries."
      />
    </>
  );
}
