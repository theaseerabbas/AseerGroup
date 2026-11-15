import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subsidiaries = [
  {
    slug: "parent",
    name: "The Aseer Group",
    tagline: "One Vision, Endless Possibilities.",
    sector: "Diversified Holding Group",
    description:
      "Parent organization headquartered in Islamabad uniting mobility, travel, youth development, and commercial growth ventures.",
    websiteUrl: "https://theaseergroup.com",
    email: "info@theleappakistan.com",
    phone: "051-6145307",
  },
  {
    slug: "transport",
    name: "Aseer Transport Services",
    tagline: "Dependable movement for people and goods.",
    sector: "Transportation & Logistics",
    description:
      "Personal, family, corporate staff pick-and-drop, event transfers, rent-a-car, and commercial freight across Pakistan.",
    websiteUrl: "https://transport.theaseergroup.com",
    email: "info@theleappakistan.com",
    phone: "051-6145307",
  },
  {
    slug: "travel",
    name: "Aseer Travel & Tours",
    tagline: "Travel planned with care.",
    sector: "Travel Management & Tourism",
    description:
      "Domestic and international air ticketing, Hajj and Umrah packages, corporate travel, visas, and curated northern tours.",
    websiteUrl: "https://travel.theaseergroup.com",
    email: "info@theleappakistan.com",
    phone: "051-6145307",
  },
  {
    slug: "the-rise",
    name: "The Rise",
    tagline: "Reach • Influence • Strategy • Expansion",
    sector: "Business Development, Sales & Customer Support",
    description:
      "Commercial growth, direct sales, and client operations arm of The Aseer Group structured around Business Development, Sales, and Customer Support.",
    websiteUrl: "https://rise.theaseergroup.com",
    email: "info@theleappakistan.com",
    phone: "051-6145307",
    metadata: {
      acronym: ["Reach", "Influence", "Strategy", "Expansion"],
      departments: [
        {
          code: "01",
          name: "Business Development (BD)",
          capabilities: [
            "Lead generation",
            "Corporate visits",
            "B2B meetings",
            "Partnerships",
            "Market research",
          ],
        },
        {
          code: "02",
          name: "Sales Team",
          capabilities: [
            "Direct sales",
            "Telemarketing",
            "WhatsApp sales",
            "Follow-ups",
            "Conversion and closing",
          ],
        },
        {
          code: "03",
          name: "Customer Support",
          capabilities: [
            "Inbound calls",
            "WhatsApp support",
            "Complaint handling",
            "Customer onboarding",
            "After-sales services",
          ],
        },
      ],
    },
  },
];

async function main() {
  for (const sub of subsidiaries) {
    await prisma.subsidiary.upsert({
      where: { slug: sub.slug },
      update: sub,
      create: sub,
    });
  }
  console.log(`Seeded ${subsidiaries.length} subsidiaries successfully.`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
