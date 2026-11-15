export type PackageCategory = "all" | "one-day" | "multi-day" | "pilgrimage" | "corporate";

export interface TourPackage {
  id: string;
  title: string;
  category: Exclude<PackageCategory, "all">;
  duration: string;
  region: string;
  summary: string;
  highlights: string[];
}

export const contactInfo = {
  name: "Aseer Travel & Tours",
  parentName: "The Aseer Group",
  parentUrl: "https://theaseergroup.com",
  tagline: "One Vision, Endless Possibilities.",
  headOffice: "Office No. 106, 1st Floor, Makka Heights, H-13, Near NUST Gate No. 07, Islamabad",
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

export const packages: TourPackage[] = [
  // Multi-Day Tours (from Profile PDF)
  {
    id: "hunza-5d",
    title: "5-Day Hunza Valley",
    category: "multi-day",
    duration: "5 Days",
    region: "Gilgit-Baltistan",
    summary: "Karimabad, Altit & Baltit Forts, Attabad Lake, Passu Cones, and Eagle's Nest.",
    highlights: ["Guided heritage stops", "Mountain accommodation", "Bonfire evening"],
  },
  {
    id: "skardu-6d",
    title: "6-Day Skardu Expedition",
    category: "multi-day",
    duration: "6 Days",
    region: "Gilgit-Baltistan",
    summary: "Shangrila Resort, Upper Kachura Lake, Shigar Fort, Cold Desert, and Deosai plains.",
    highlights: ["4x4 access coordination", "Half-board meals", "Dedicated tour lead"],
  },
  {
    id: "fairy-meadows-5d",
    title: "5-Day Fairy Meadows",
    category: "multi-day",
    duration: "5 Days",
    region: "Nanga Parbat Base",
    summary: "Scenic Raikot bridge jeep track and guided trek to Nanga Parbat viewpoints.",
    highlights: ["Jeep transfers", "Alpine cabin stay", "Basic first aid support"],
  },
  {
    id: "kashmir-arang-kel-3d",
    title: "3-Day Kashmir (Arang Kel)",
    category: "multi-day",
    duration: "3 Days",
    region: "Neelum Valley",
    summary: "Keran, Sharda, Kel cable car, and the lush alpine meadows of Arang Kel.",
    highlights: ["Chairlift coordination", "Riverfront stays", "Bonfire & lanterns"],
  },
  {
    id: "kashmir-taobat-4d",
    title: "4-Day Kashmir (Arang Kel + Taobat)",
    category: "multi-day",
    duration: "4 Days",
    region: "Upper Neelum",
    summary: "Extended Neelum Valley route reaching the pristine riverside village of Taobat.",
    highlights: ["Upper valley transport", "Breakfasts & dinners", "Local guide"],
  },
  {
    id: "kalam-swat-3d",
    title: "3-Day Kalam & Swat",
    category: "multi-day",
    duration: "3 Days",
    region: "Khyber Pakhtunkhwa",
    summary: "Malam Jabba, Bahrain, Ushu Forest, and Mahodand Lake in upper Swat.",
    highlights: ["Comfortable coaster/hiace", "Forest sightseeing", "Group friendly"],
  },
  {
    id: "naran-kaghan-3d",
    title: "3-Day Naran & Kaghan",
    category: "multi-day",
    duration: "3 Days",
    region: "Mansehra / Hazara",
    summary: "Saif-ul-Malook, Lulusar Lake, Babusar Top, and Kunhar riverfronts.",
    highlights: ["Scenic stops", "Toll taxes included", "Refreshments"],
  },
  {
    id: "kumrat-4d",
    title: "4-Day Kumrat Valley",
    category: "multi-day",
    duration: "4 Days",
    region: "Upper Dir",
    summary: "Jahaz Banda meadows, Katora Lake trail, Panjkora river, and Kala Chashma.",
    highlights: ["Camping & wooden huts", "Bonfire night", "Experienced guide"],
  },
  {
    id: "hunza-fairy-7d",
    title: "7-Day Hunza + Fairy Meadows",
    category: "multi-day",
    duration: "7 Days",
    region: "Northern Circuit",
    summary: "Two iconic northern destinations combined into one seamless week-long journey.",
    highlights: ["End-to-end logistics", "Curated stays", "All breakfasts & dinners"],
  },
  {
    id: "skardu-hunza-8d",
    title: "8-Day Skardu + Hunza Grand Tour",
    category: "multi-day",
    duration: "8 Days",
    region: "Karakoram Circuit",
    summary: "Our flagship northern circuit linking Skardu's lakes and deserts with Hunza's peaks.",
    highlights: ["Flagship itinerary", "Complete ground support", "Group & custom dates"],
  },

  // One-Day Tours (from Profile PDF)
  {
    id: "malam-jabba-1d",
    title: "Malam Jabba Day Trip",
    category: "one-day",
    duration: "1 Day",
    region: "Swat",
    summary: "Quick mountain escape with chairlift, zipline, and alpine ridge views.",
    highlights: ["Same-day return", "Road tolls included", "Refreshments"],
  },
  {
    id: "mushkpuri-1d",
    title: "Mushkpuri Top Trek",
    category: "one-day",
    duration: "1 Day",
    region: "Nathia Gali",
    summary: "Guided pine-forest hike from Dunga Gali to the panoramic summit of Mushkpuri.",
    highlights: ["Guided day hike", "Breakfast & dinner", "First aid kit"],
  },
  {
    id: "sharan-forest-1d",
    title: "Sharan Forest Retreat",
    category: "one-day",
    duration: "1 Day",
    region: "Kaghan Valley",
    summary: "Day excursion into the cedar forests and Manshi Top meadows above Paras.",
    highlights: ["Jeep transfer option", "Bonfire & tea", "Photography stops"],
  },
  {
    id: "shogran-siri-paye-1d",
    title: "Shogran & Siri Paye",
    category: "one-day",
    duration: "1 Day",
    region: "Kaghan Valley",
    summary: "Green plateaus of Shogran and high-altitude meadows overlooking Makra Peak.",
    highlights: ["Group & family friendly", "Professional guide", "Meal stops"],
  },
  {
    id: "shangrila-murree-1d",
    title: "Shangrila Murree",
    category: "one-day",
    duration: "1 Day",
    region: "Galyat",
    summary: "Relaxed family-friendly day getaway near Islamabad with scenic viewpoints.",
    highlights: ["Short drive from H-13", "Comfortable AC transport", "Custom pacing"],
  },
  {
    id: "ganga-choti-1d",
    title: "Ganga Choti",
    category: "one-day",
    duration: "1 Day",
    region: "Bagh, Azad Kashmir",
    summary: "Crisp 360-degree Himalayan ridge views in Azad Kashmir within a single day.",
    highlights: ["Sunrise/sunset views", "Guided ascent", "Refreshments"],
  },
  {
    id: "khewra-mine-1d",
    title: "Khewra Salt Mine",
    category: "one-day",
    duration: "1 Day",
    region: "Jhelum",
    summary: "Educational and heritage day tour to the world's second-largest salt mine.",
    highlights: ["Ideal for schools & families", "AC coach/van", "Guided tour"],
  },
  {
    id: "balakot-balloon-1d",
    title: "Balakot Hot Air Balloon (Las Peran)",
    category: "one-day",
    duration: "1 Day",
    region: "Balakot",
    summary: "Adventure day trip featuring tethered hot air ballooning over scenic valleys.",
    highlights: ["Activity coordination", "Round-trip transport", "Group photography"],
  },
  {
    id: "peer-chanasi-1d",
    title: "Peer Chanasi Ridge",
    category: "one-day",
    duration: "1 Day",
    region: "Muzaffarabad",
    summary: "High-altitude shrine and scenic ridge overlooking Muzaffarabad valley.",
    highlights: ["Day excursion", "All road tolls", "Refreshments"],
  },

  // Pilgrimage & Corporate
  {
    id: "umrah-packages",
    title: "Custom Umrah & Hajj Packages",
    category: "pilgrimage",
    duration: "7 to 21 Days",
    region: "Makkah & Madinah",
    summary: "End-to-end pilgrimage planning with flights, visas, hotels near Haram, and ziyarat.",
    highlights: ["Visa processing", "Haram-proximity hotels", "Ground transfers"],
  },
  {
    id: "corporate-retreats",
    title: "Corporate & Incentive Travel",
    category: "corporate",
    duration: "Custom",
    region: "Domestic & International",
    summary: "Managed air ticketing, executive hotels, and team retreats tailored for organizations.",
    highlights: ["Dedicated account desk", "Consolidated invoicing", "24/7 travel support"],
  },
];

export const tourInclusions = [
  "Comfortable Transport",
  "All Road Toll Taxes",
  "Professional Guide",
  "Quality Dinners",
  "Daily Breakfasts",
  "En-route Refreshments",
  "Bonfire & Lanterns Activity",
  "Curated Accommodation",
  "Basic First Aid Kit",
];

export const coreServices = [
  {
    num: "01",
    title: "Domestic & International Air Ticketing",
    text: "Competitive fares, flexible routing, and prompt rebooking support for individuals and families.",
  },
  {
    num: "02",
    title: "Hajj & Umrah Packages",
    text: "Thoughtfully arranged spiritual journeys covering visas, flights, vetted hotels, and ground care.",
  },
  {
    num: "03",
    title: "Visa Processing & Documentation",
    text: "Accurate file preparation, appointment scheduling, and travel insurance guidance.",
  },
  {
    num: "04",
    title: "One-Day & Multi-Day Group Tours",
    text: "Weekly departures and private group itineraries across Gilgit-Baltistan, Kashmir, Swat, and Galyat.",
  },
  {
    num: "05",
    title: "Corporate Travel Management",
    text: "Dedicated business ticketing, executive hotel stays, and annual team retreats.",
  },
  {
    num: "06",
    title: "Honeymoon & Custom Holidays",
    text: "Private, unhurried itineraries tailored around your dates, pace, and preferred stays.",
  },
];

export const values = [
  {
    name: "Integrity",
    text: "Transparent pricing and ethical practices on every booking.",
  },
  {
    name: "Sustainability",
    text: "Promoting respectful, environmentally mindful tourism across Pakistan's valleys.",
  },
  {
    name: "Customer Focus",
    text: "Personalized itineraries shaped around comfort, safety, and pace.",
  },
  {
    name: "Excellence",
    text: "Setting dependable benchmarks in transport, hospitality, and tour leadership.",
  },
  {
    name: "Social Responsibility",
    text: "Supporting local communities, guides, and regional hospitality partners.",
  },
];
