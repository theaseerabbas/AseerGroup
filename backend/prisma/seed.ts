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

const travelPackages = [
  {
    slug: "hunza-5d",
    title: "5-Day Hunza Valley",
    category: "multi-day",
    duration: "5 Days",
    region: "Gilgit-Baltistan",
    summary: "Karimabad, Altit & Baltit Forts, Attabad Lake, Passu Cones, and Eagle's Nest.",
    highlights: ["Guided heritage stops", "Mountain accommodation", "Bonfire evening"],
  },
  {
    slug: "skardu-6d",
    title: "6-Day Skardu Expedition",
    category: "multi-day",
    duration: "6 Days",
    region: "Gilgit-Baltistan",
    summary: "Shangrila Resort, Upper Kachura Lake, Shigar Fort, Cold Desert, and Deosai plains.",
    highlights: ["4x4 access coordination", "Half-board meals", "Dedicated tour lead"],
  },
  {
    slug: "fairy-meadows-5d",
    title: "5-Day Fairy Meadows",
    category: "multi-day",
    duration: "5 Days",
    region: "Nanga Parbat Base",
    summary: "Scenic Raikot bridge jeep track and guided trek to Nanga Parbat viewpoints.",
    highlights: ["Jeep transfers", "Alpine cabin stay", "Basic first aid support"],
  },
  {
    slug: "kashmir-arang-kel-3d",
    title: "3-Day Kashmir (Arang Kel)",
    category: "multi-day",
    duration: "3 Days",
    region: "Neelum Valley",
    summary: "Keran, Sharda, Kel cable car, and the lush alpine meadows of Arang Kel.",
    highlights: ["Chairlift coordination", "Riverfront stays", "Bonfire & lanterns"],
  },
  {
    slug: "kashmir-taobat-4d",
    title: "4-Day Kashmir (Arang Kel + Taobat)",
    category: "multi-day",
    duration: "4 Days",
    region: "Upper Neelum",
    summary: "Extended Neelum Valley route reaching the pristine riverside village of Taobat.",
    highlights: ["Upper valley transport", "Breakfasts & dinners", "Local guide"],
  },
  {
    slug: "kalam-swat-3d",
    title: "3-Day Kalam & Swat",
    category: "multi-day",
    duration: "3 Days",
    region: "Khyber Pakhtunkhwa",
    summary: "Malam Jabba, Bahrain, Ushu Forest, and Mahodand Lake in upper Swat.",
    highlights: ["Comfortable coaster/hiace", "Forest sightseeing", "Group friendly"],
  },
  {
    slug: "naran-kaghan-3d",
    title: "3-Day Naran & Kaghan",
    category: "multi-day",
    duration: "3 Days",
    region: "Mansehra / Hazara",
    summary: "Saif-ul-Malook, Lulusar Lake, Babusar Top, and Kunhar riverfronts.",
    highlights: ["Scenic stops", "Toll taxes included", "Refreshments"],
  },
  {
    slug: "kumrat-4d",
    title: "4-Day Kumrat Valley",
    category: "multi-day",
    duration: "4 Days",
    region: "Upper Dir",
    summary: "Jahaz Banda meadows, Katora Lake trail, Panjkora river, and Kala Chashma.",
    highlights: ["Camping & wooden huts", "Bonfire night", "Experienced guide"],
  },
  {
    slug: "hunza-fairy-7d",
    title: "7-Day Hunza + Fairy Meadows",
    category: "multi-day",
    duration: "7 Days",
    region: "Northern Circuit",
    summary: "Two iconic northern destinations combined into one seamless week-long journey.",
    highlights: ["End-to-end logistics", "Curated stays", "All breakfasts & dinners"],
  },
  {
    slug: "skardu-hunza-8d",
    title: "8-Day Skardu + Hunza Grand Tour",
    category: "multi-day",
    duration: "8 Days",
    region: "Karakoram Circuit",
    summary: "Our flagship northern circuit linking Skardu's lakes and deserts with Hunza's peaks.",
    highlights: ["Flagship itinerary", "Complete ground support", "Group & custom dates"],
  },
  {
    slug: "malam-jabba-1d",
    title: "Malam Jabba Day Trip",
    category: "one-day",
    duration: "1 Day",
    region: "Swat",
    summary: "Quick mountain escape with chairlift, zipline, and alpine ridge views.",
    highlights: ["Same-day return", "Road tolls included", "Refreshments"],
  },
  {
    slug: "mushkpuri-1d",
    title: "Mushkpuri Top Trek",
    category: "one-day",
    duration: "1 Day",
    region: "Nathia Gali",
    summary: "Guided pine-forest hike from Dunga Gali to the panoramic summit of Mushkpuri.",
    highlights: ["Guided day hike", "Breakfast & dinner", "First aid kit"],
  },
  {
    slug: "sharan-forest-1d",
    title: "Sharan Forest Retreat",
    category: "one-day",
    duration: "1 Day",
    region: "Kaghan Valley",
    summary: "Day excursion into the cedar forests and Manshi Top meadows above Paras.",
    highlights: ["Jeep transfer option", "Bonfire & tea", "Photography stops"],
  },
  {
    slug: "shogran-siri-paye-1d",
    title: "Shogran & Siri Paye",
    category: "one-day",
    duration: "1 Day",
    region: "Kaghan Valley",
    summary: "Green plateaus of Shogran and high-altitude meadows overlooking Makra Peak.",
    highlights: ["Group & family friendly", "Professional guide", "Meal stops"],
  },
  {
    slug: "shangrila-murree-1d",
    title: "Shangrila Murree",
    category: "one-day",
    duration: "1 Day",
    region: "Galyat",
    summary: "Relaxed family-friendly day getaway near Islamabad with scenic viewpoints.",
    highlights: ["Short drive from H-13", "Comfortable AC transport", "Custom pacing"],
  },
  {
    slug: "ganga-choti-1d",
    title: "Ganga Choti",
    category: "one-day",
    duration: "1 Day",
    region: "Bagh, Azad Kashmir",
    summary: "Crisp 360-degree Himalayan ridge views in Azad Kashmir within a single day.",
    highlights: ["Sunrise/sunset views", "Guided ascent", "Refreshments"],
  },
  {
    slug: "khewra-mine-1d",
    title: "Khewra Salt Mine",
    category: "one-day",
    duration: "1 Day",
    region: "Jhelum",
    summary: "Educational and heritage day tour to the world's second-largest salt mine.",
    highlights: ["Ideal for schools & families", "AC coach/van", "Guided tour"],
  },
  {
    slug: "balakot-balloon-1d",
    title: "Balakot Hot Air Balloon (Las Peran)",
    category: "one-day",
    duration: "1 Day",
    region: "Balakot",
    summary: "Adventure day trip featuring tethered hot air ballooning over scenic valleys.",
    highlights: ["Activity coordination", "Round-trip transport", "Group photography"],
  },
  {
    slug: "peer-chanasi-1d",
    title: "Peer Chanasi Ridge",
    category: "one-day",
    duration: "1 Day",
    region: "Muzaffarabad",
    summary: "High-altitude shrine and scenic ridge overlooking Muzaffarabad valley.",
    highlights: ["Day excursion", "All road tolls", "Refreshments"],
  },
  {
    slug: "umrah-packages",
    title: "Custom Umrah & Hajj Packages",
    category: "pilgrimage",
    duration: "7 to 21 Days",
    region: "Makkah & Madinah",
    summary: "End-to-end pilgrimage planning with flights, visas, hotels near Haram, and ziyarat.",
    highlights: ["Visa processing", "Haram-proximity hotels", "Ground transfers"],
  },
  {
    slug: "corporate-retreats",
    title: "Corporate & Incentive Travel",
    category: "corporate",
    duration: "Custom",
    region: "Domestic & International",
    summary: "Managed air ticketing, executive hotels, and team retreats tailored for organizations.",
    highlights: ["Dedicated account desk", "Consolidated invoicing", "24/7 travel support"],
  },
];

const transportFleet = [
  { slug: "suzuki-alto", title: "Suzuki Alto", category: "hatchback", categoryLabel: "Hatchback", seats: "4 Seats", useCase: "Economical city errands & solo commutes", driverOption: "With or without driver" },
  { slug: "suzuki-cultus", title: "Suzuki Cultus", category: "hatchback", categoryLabel: "Hatchback", seats: "4–5 Seats", useCase: "Daily urban travel & campus commutes", driverOption: "With or without driver" },
  { slug: "toyota-corolla", title: "Toyota Corolla", category: "sedan", categoryLabel: "Sedan", seats: "4–5 Seats", useCase: "Intercity highway travel & family trips", driverOption: "With or without driver" },
  { slug: "toyota-altis-grande", title: "Toyota Altis / Grande", category: "sedan", categoryLabel: "Sedan", seats: "4–5 Seats", useCase: "Executive travel & intercity business routes", driverOption: "With or without driver" },
  { slug: "honda-civic", title: "Honda Civic", category: "sedan", categoryLabel: "Sedan", seats: "4–5 Seats", useCase: "Executive meetings, events & VIP city transfers", driverOption: "With or without driver" },
  { slug: "toyota-fortuner", title: "Toyota Fortuner", category: "4x4", categoryLabel: "4x4 & SUV", seats: "7 Seats", useCase: "Executive 4x4 for rough terrains & northern highways", driverOption: "Chauffeur or self-drive" },
  { slug: "toyota-prado", title: "Toyota Prado", category: "4x4", categoryLabel: "4x4 & SUV", seats: "7 Seats", useCase: "High-comfort corporate delegations & mountain routes", driverOption: "Verified chauffeur" },
  { slug: "toyota-land-cruiser-zx", title: "Toyota Land Cruiser ZX V8", category: "4x4", categoryLabel: "4x4 & SUV", seats: "7 Seats", useCase: "Flagship V8 command for VIP delegations & northern passes", driverOption: "Dedicated chauffeur" },
  { slug: "mercedes-c-class", title: "Mercedes-Benz C-Class", category: "luxury", categoryLabel: "Luxury", seats: "4 Seats", useCase: "Weddings, diplomatic protocol & executive arrivals", driverOption: "Dedicated chauffeur" },
  { slug: "range-rover", title: "Range Rover", category: "luxury", categoryLabel: "Luxury", seats: "5 Seats", useCase: "Premier luxury SUV for high-profile events & VIP travel", driverOption: "Dedicated chauffeur" },
  { slug: "toyota-grand-cabin", title: "Toyota Grand Cabin", category: "vans-buses", categoryLabel: "Van / Bus", seats: "14–16 Seats", useCase: "Executive group tours, northern trips & corporate retreats", driverOption: "Dedicated driver" },
  { slug: "toyota-coaster-4c-5c", title: "Toyota Coaster (4C & 5C)", category: "vans-buses", categoryLabel: "Van / Bus", seats: "22–28 Seats", useCase: "University trips, corporate conferences & large group tours", driverOption: "Dedicated driver" },
];

async function main() {
  for (const sub of subsidiaries) {
    await prisma.subsidiary.upsert({
      where: { slug: sub.slug },
      update: sub,
      create: sub,
    });
  }

  const travelSub = await prisma.subsidiary.findUnique({
    where: { slug: "travel" },
    select: { id: true },
  });

  if (travelSub) {
    for (let i = 0; i < travelPackages.length; i++) {
      const pkg = travelPackages[i]!;
      await prisma.service.upsert({
        where: {
          subsidiaryId_slug: {
            subsidiaryId: travelSub.id,
            slug: pkg.slug,
          },
        },
        update: {
          title: pkg.title,
          category: pkg.category,
          summary: pkg.summary,
          sortOrder: i + 1,
          details: {
            duration: pkg.duration,
            region: pkg.region,
            highlights: pkg.highlights,
          },
        },
        create: {
          subsidiaryId: travelSub.id,
          slug: pkg.slug,
          title: pkg.title,
          category: pkg.category,
          summary: pkg.summary,
          sortOrder: i + 1,
          isActive: true,
          details: {
            duration: pkg.duration,
            region: pkg.region,
            highlights: pkg.highlights,
          },
        },
      });
    }
  }

  const transportSub = await prisma.subsidiary.findUnique({
    where: { slug: "transport" },
    select: { id: true },
  });

  if (transportSub) {
    await prisma.service.deleteMany({
      where: {
        subsidiaryId: transportSub.id,
        slug: { notIn: transportFleet.map((v) => v.slug) },
      },
    });
    for (let i = 0; i < transportFleet.length; i++) {
      const v = transportFleet[i]!;
      await prisma.service.upsert({
        where: {
          subsidiaryId_slug: {
            subsidiaryId: transportSub.id,
            slug: v.slug,
          },
        },
        update: {
          title: v.title,
          category: v.category,
          summary: v.useCase,
          sortOrder: i + 1,
          details: {
            categoryLabel: v.categoryLabel,
            seats: v.seats,
            driverOption: v.driverOption,
          },
        },
        create: {
          subsidiaryId: transportSub.id,
          slug: v.slug,
          title: v.title,
          category: v.category,
          summary: v.useCase,
          sortOrder: i + 1,
          isActive: true,
          details: {
            categoryLabel: v.categoryLabel,
            seats: v.seats,
            driverOption: v.driverOption,
          },
        },
      });
    }
  }

  console.log(
    `Seeded ${subsidiaries.length} subsidiaries, ${travelPackages.length} travel packages, and ${transportFleet.length} transport vehicles successfully.`,
  );
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
