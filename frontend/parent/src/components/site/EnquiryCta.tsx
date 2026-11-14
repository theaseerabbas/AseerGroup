import { company } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Pill } from "./Pill";

type EnquiryCtaProps = {
  eyebrow?: string;
  title?: string;
  accent?: string;
  lead?: string;
};

export function EnquiryCta({
  eyebrow = "Business enquiries",
  title = "Let's build",
  accent = "something lasting.",
  lead = "Partnerships, clients, and stakeholders: we'd be glad to hear from you.",
}: EnquiryCtaProps) {
  return (
    <section className="bg-pattern-dots border-t border-border">
      <div className="mx-auto max-w-[1240px] px-6 py-28 text-center md:py-36">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mx-auto mt-6 max-w-4xl text-[clamp(2.75rem,6.5vw,5.5rem)]">
            {title} <span className="serif-i text-jade">{accent}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg text-muted-foreground">{lead}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Pill to="/contact">Contact the group</Pill>
            <Pill href={company.mapUrl} variant="ghost">
              Visit our office
            </Pill>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
