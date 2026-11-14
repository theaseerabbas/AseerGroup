import transportImg from "@/assets/transport.jpg";
import travelImg from "@/assets/travel.jpg";
import leapImg from "@/assets/leap.jpg";
import riseImg from "@/assets/rise.jpg";
import transportLogo from "@/assets/logos/aseer-transport.jpeg";
import travelLogo from "@/assets/logos/aseer-travel.jpeg";
import leapLogo from "@/assets/logos/leap-pakistan.jpeg";

export const company = {
  name: "The Aseer Group",
  tagline: "One Vision, Endless Possibilities.",
  domain: "https://theaseergroup.com",
  locations: [
    {
      label: "Headquarters",
      shortLabel: "Makka Heights, H-13",
      address: "Makka Heights, H-13, Islamabad, Pakistan",
      mapUrl: "https://maps.app.goo.gl/bUje8VMLCJLMqAtc6",
      mapQuery: "Makka Heights H-13 Islamabad Pakistan",
      note: "Corporate headquarters and group operations desk",
    },
    {
      label: "Innovation & Programs Hub",
      shortLabel: "NSTP, NUST H-12",
      address: "NSTP, NUST H-12 Campus, Islamabad, Pakistan",
      mapUrl:
        "https://maps.google.com/?q=National+Science+and+Technology+Park+NSTP+NUST+H-12+Islamabad",
      mapQuery: "National Science and Technology Park NSTP NUST H-12 Islamabad",
      note: "National Science & Technology Park: programs and partnerships",
    },
  ],
  address: [
    "Makka Heights, H-13, Islamabad, Pakistan",
    "NSTP, NUST H-12 Campus, Islamabad, Pakistan",
  ],
  phone: "051-6145307",
  phoneHref: "tel:+92516145307",
  whatsapp: "0370-0559371",
  whatsappUrl: "https://wa.me/923700559371",
  email: "info@theleappakistan.com",
  emailHref: "mailto:info@theleappakistan.com",
  mapUrl: "https://maps.app.goo.gl/bUje8VMLCJLMqAtc6",
  mapQuery: "Makka Heights H-13 Islamabad Pakistan",
};

export const mission =
  "To deliver reliable, inclusive, and people-centered services across transport, travel, humanitarian care, and human development, driving sustainable growth, uplifting communities, and advancing a prosperous and equitable Pakistan.";
export const vision =
  "To be Pakistan's most trusted and impactful multi-sector group, recognized for excellence in every industry we operate, celebrated for the communities we uplift, and remembered for the lives we change.";

export const values = [
  {
    name: "Integrity",
    text: "Conducting business with honesty, transparency, and ethical responsibility.",
  },
  {
    name: "Excellence",
    text: "Maintaining high standards in every service and continuously improving.",
  },
  {
    name: "Service",
    text: "Serving clients, communities, and the country through meaningful contributions.",
  },
  { name: "Compassion", text: "Treating people with dignity, empathy, and genuine care." },
  { name: "Accountability", text: "Taking responsibility for decisions, actions, and outcomes." },
  { name: "Innovation", text: "Embracing new ideas, technologies, and approaches." },
  {
    name: "Patriotism",
    text: "Supporting Pakistan's growth and contributing to national development.",
  },
];

export type Business = {
  slug: string;
  name: string;
  short: string;
  sector: string;
  intro: string;
  url: string;
  image?: string;
  logo?: string;
  metric: string;
  services: string[];
  extraTitle?: string;
  extra?: string[];
  highlights?: { label: string; value: string }[];
  placeholder?: boolean;
};

export const businesses: Business[] = [
  {
    slug: "transport",
    name: "Aseer Transport Services",
    short: "Transport",
    sector: "Transportation & Logistics",
    intro:
      "Dependable movement for people and goods, from daily family travel and corporate staff transport to events, group journeys, and commercial freight.",
    url: "https://transport.theaseergroup.com",
    image: transportImg,
    logo: transportLogo,
    metric: "8 Fleet Categories",
    services: [
      "Personal and family transportation",
      "Corporate staff pick and drop",
      "School, college and university transportation",
      "Rent-a-car, with or without drivers",
      "Daily and monthly transportation",
      "Event and wedding transfers",
      "Group transportation",
      "Logistics and parcel movement",
      "Commercial transportation and freight",
    ],
    extraTitle: "The fleet",
    extra: [
      "Sedans",
      "SUVs",
      "Hatchbacks",
      "Vans",
      "Hiace",
      "Minibuses",
      "Coaches",
      "Executive vehicles",
    ],
  },
  {
    slug: "travel",
    name: "Aseer Travel & Tours",
    short: "Travel",
    sector: "Travel Management & Tourism",
    intro:
      "Travel planned with care: air ticketing, Hajj and Umrah, corporate travel, visas, and tailored holidays across Pakistan and beyond.",
    url: "https://travel.theaseergroup.com",
    image: travelImg,
    logo: travelLogo,
    metric: "13 Curated Destinations",
    services: [
      "Domestic and international air ticketing",
      "Hajj and Umrah packages",
      "Corporate travel management",
      "Visa processing and documentation",
      "Hotel reservations",
      "Ground transportation",
      "Customized holiday and honeymoon packages",
      "Group tours and incentive travel",
      "One-day and multi-day tour packages",
    ],
    extraTitle: "Destinations",
    extra: [
      "Malam Jabba",
      "Mushkpuri",
      "Shogran",
      "Siri Paye",
      "Kashmir",
      "Kalam",
      "Swat",
      "Naran",
      "Kaghan",
      "Kumrat",
      "Hunza",
      "Fairy Meadows",
      "Skardu",
    ],
  },
  {
    slug: "the-leap",
    name: "The Leap Pakistan",
    short: "The Leap",
    sector: "Youth Development & Practical Learning",
    intro:
      "A growth space for Pakistani students, graduates, young professionals, and emerging founders. Its flagship, Safar-e-Karakoram, is a 5-day residential leadership and skills retreat in Hunza, Gilgit-Baltistan.",
    url: "https://theleappakistan.com/",
    image: leapImg,
    logo: leapLogo,
    metric: "50 Seats per Cohort",
    services: [
      "Culture & Heritage",
      "Mental Health Resilience",
      "Money Intelligence",
      "Climate & Sustainability",
      "AI, Careers & Purpose Leadership",
    ],
    highlights: [
      { label: "Flagship retreat", value: "Safar-e-Karakoram, 5 days in Hunza" },
      { label: "Age group", value: "16 to 35 years" },
      { label: "Cohort size", value: "50 seats per cohort" },
      { label: "Funding tiers", value: "Fully Funded, Partially Funded & Self-Funded" },
    ],
    extraTitle: "Vision & Mission",
    extra: [
      "To shape confident, skilled, and purpose-driven young Pakistanis ready to lead, create, and grow in a changing world.",
    ],
  },
  {
    slug: "the-rise",
    name: "The Rise",
    short: "The Rise",
    sector: "Reach • Influence • Strategy • Expansion",
    intro:
      "The commercial growth, sales, and client operations arm of The Aseer Group, structured around three core departments: Business Development, Sales, and Customer Support.",
    url: "https://rise.theaseergroup.com",
    image: riseImg,
    metric: "3 Core Departments",
    services: [
      "Business Development (BD): Lead generation, corporate visits, B2B meetings, partnerships, and market research",
      "Sales Team: Direct sales, telemarketing, WhatsApp sales, follow-ups, and conversion & closing",
      "Customer Support: Inbound calls, WhatsApp support, complaint handling, customer onboarding, and after-sales services",
    ],
    highlights: [
      { label: "Stands for", value: "Reach • Influence • Strategy • Expansion" },
      { label: "Structure", value: "3 Core Departments" },
      { label: "Focus", value: "B2B Growth, Direct Sales & Client Care" },
    ],
    extraTitle: "Core capabilities",
    extra: [
      "Lead generation",
      "Corporate visits",
      "B2B meetings",
      "Partnerships",
      "Market research",
      "Direct sales",
      "Telemarketing",
      "WhatsApp sales",
      "Follow-ups",
      "Conversion & closing",
      "Inbound calls",
      "WhatsApp support",
      "Complaint handling",
      "Customer onboarding",
      "After-sales services",
    ],
  },
];

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/businesses", label: "Businesses" },
  { to: "/leadership", label: "Leadership" },
  { to: "/careers", label: "Careers" },
  { to: "/pitch", label: "Pitch an Idea" },
  { to: "/contact", label: "Contact" },
] as const;
