import bdImg from "../assets/rise-bd.jpg";
import salesImg from "../assets/rise-sales.jpg";
import supportImg from "../assets/rise-support.jpg";

export interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  capabilities: string[];
  outcomes: string[];
}

export const riseContact = {
  name: "The Rise",
  parentName: "The Aseer Group",
  parentUrl: "https://theaseergroup.com",
  acronym: "Reach · Influence · Strategy · Expansion",
  tagline: "One Vision, Endless Possibilities.",
  headOffice:
    "Office No. 106, 1st Floor, Makka Heights, H-13, Near NUST Gate No. 07, Islamabad, Pakistan",
  mapUrl: "https://maps.app.goo.gl/bUje8VMLCJLMqAtc6",
  hubOffice: "NSTP, NUST H-12 Campus, Islamabad, Pakistan",
  hubMapUrl:
    "https://maps.google.com/?q=National+Science+and+Technology+Park+NSTP+NUST+H-12+Islamabad",
  phone: "051-6145307",
  phoneHref: "tel:+92516145307",
  altPhone: "051-5452836",
  whatsapp: "0370-0559371",
  whatsappUrl: "https://wa.me/923700559371",
  email: "info@theleappakistan.com",
  emailHref: "mailto:info@theleappakistan.com",
};

export const risePillars = [
  {
    letter: "R",
    word: "Reach",
    headline: "Open qualified doors in priority markets.",
    detail:
      "Structured outbound outreach, corporate field visits, and territory mapping that put your offer in front of real decision-makers.",
  },
  {
    letter: "I",
    word: "Influence",
    headline: "Build authority that shortens the sales cycle.",
    detail:
      "Consultative B2B pitch meetings, executive proposals, and partnership narratives tailored for institutional buyers.",
  },
  {
    letter: "S",
    word: "Strategy",
    headline: "Turn pipeline activity into predictable conversion.",
    detail:
      "Disciplined follow-up cadences across direct calls, telemarketing, and WhatsApp sales desks with clear conversion tracking.",
  },
  {
    letter: "E",
    word: "Expansion",
    headline: "Retain customers and grow account lifetime value.",
    detail:
      "Dedicated inbound support, smooth onboarding, and responsive after-sales care that turns first-time buyers into long-term accounts.",
  },
];

export const departments: DepartmentItem[] = [
  {
    id: "business-development",
    code: "01",
    name: "Business Development (BD)",
    shortName: "Business Development",
    tagline: "Pipeline creation, B2B outreach & strategic alliances.",
    description:
      "Our Business Development desk identifies high-value accounts, conducts corporate visits, leads B2B meetings, and delivers actionable market research.",
    image: bdImg,
    alt: "Modern glass boardroom for B2B strategy and partnership meetings",
    capabilities: [
      "Lead generation",
      "Corporate visits",
      "B2B meetings",
      "Partnerships",
      "Market research",
    ],
    outcomes: [
      "Qualified B2B pipeline every week",
      "In-person corporate representations",
      "Competitor & market intelligence",
    ],
  },
  {
    id: "sales-team",
    code: "02",
    name: "Sales Team",
    shortName: "Sales Team",
    tagline: "High-touch conversion across voice, WhatsApp & direct channels.",
    description:
      "Trained commercial closers managing direct sales, outbound telemarketing, structured WhatsApp sales funnels, and persistent follow-ups.",
    image: salesImg,
    alt: "Sales and strategy team collaborating around whiteboard and laptops",
    capabilities: [
      "Direct sales",
      "Telemarketing",
      "WhatsApp sales",
      "Follow-ups",
      "Conversion and closing",
    ],
    outcomes: [
      "Rapid lead-to-call response",
      "Structured follow-up cadences",
      "Transparent conversion reporting",
    ],
  },
  {
    id: "customer-support",
    code: "03",
    name: "Customer Support",
    shortName: "Customer Support",
    tagline: "Responsive onboarding, issue resolution & after-sales care.",
    description:
      "Dedicated client operations specialists handling inbound calls, WhatsApp support desks, complaint resolution, and smooth customer onboarding.",
    image: supportImg,
    alt: "Customer operations specialists collaborating with laptops",
    capabilities: [
      "Inbound calls",
      "WhatsApp support",
      "Complaint handling",
      "Customer onboarding",
      "After-sales services",
    ],
    outcomes: [
      "Consistent first-response care",
      "Clean ticket & complaint escalation",
      "Higher retention and repeat business",
    ],
  },
];

export const engagementModels = [
  {
    num: "01",
    title: "Dedicated Department Pod",
    text: "Plug in an entire BD, Sales, or Customer Support team aligned to your brand scripts and KPIs.",
  },
  {
    num: "02",
    title: "Full R·I·S·E Revenue Desk",
    text: "Combine all three departments into a unified acquisition, closing, and retention engine.",
  },
  {
    num: "03",
    title: "Targeted Growth Sprint",
    text: "Focused 30-to-90-day corporate outreach, telemarketing, or market research campaigns.",
  },
];

export const riseFaqs = [
  {
    q: "Can we hire just one department, like Customer Support or Sales?",
    a: "Yes. Clients can engage Business Development (BD), Sales Team, or Customer Support independently, or combine all three into a unified commercial operations pod.",
  },
  {
    q: "How quickly can The Rise onboard our product or service?",
    a: "After an initial discovery call, we align on scripts, target audience, WhatsApp/call workflows, and reporting cadence so your desk can go live within days.",
  },
  {
    q: "Do you handle both B2B corporate visits and WhatsApp/telemarketing sales?",
    a: "Yes. Our Business Development team conducts in-person corporate visits and B2B meetings, while our Sales Team drives telemarketing, WhatsApp sales, and closing.",
  },
  {
    q: "How do we request a proposal or consultation?",
    a: "Use the Contact page to select your preferred department and share a brief summary of your goals, or reach our Islamabad desk directly via WhatsApp or phone.",
  },
];
