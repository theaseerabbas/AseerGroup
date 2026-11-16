export type FleetCategory =
  | "all"
  | "hatchback"
  | "sedan"
  | "4x4"
  | "luxury"
  | "vans-buses";

export interface FleetVehicle {
  id: string;
  name: string;
  category: Exclude<FleetCategory, "all">;
  categoryLabel: string;
  seats: string;
  useCase: string;
  driverOption: string;
  imageUrl?: string;
  highlights: string[];
}

export const transportContact = {
  name: "Aseer Transport Services",
  shortName: "ATS",
  parentName: "The Aseer Group",
  parentUrl: "https://theaseergroup.com",
  tagline: "One Vision, Endless Possibilities.",
  headOffice:
    "Office No. 106, 1st Floor, Makka Heights, H-13, Near NUST Gate No. 07, Islamabad, Pakistan",
  mapUrl: "https://maps.app.goo.gl/bUje8VMLCJLMqAtc6",
  hubOffice: "NSTP, NUST H-12 Campus, Islamabad, Pakistan",
  hubMapUrl:
    "https://maps.google.com/?q=National+Science+and+Technology+Park+NSTP+NUST+H-12+Islamabad",
  phone: "051-5452836",
  phoneHref: "tel:+92515452836",
  altPhone: "051-6145307",
  whatsapp: "0370-0559371",
  whatsappUrl: "https://wa.me/923700559371",
  email: "info@theleappakistan.com",
  emailHref: "mailto:info@theleappakistan.com",
};

export const whyChooseTransport = [
  "Modern, clean & well-maintained vehicles",
  "Verified & experienced drivers",
  "GPS-enabled routes & real-time tracking",
  "Customized corporate contracts",
  "Affordable & transparent pricing",
  "24/7 customer support",
];

export const coreTransportServices = [
  {
    num: "01",
    title: "Personal & Family Transport",
    text: "Clean sedans, hatchbacks, and SUVs for daily errands, city visits, and comfortable intercity family travel.",
  },
  {
    num: "02",
    title: "Corporate Staff Pick & Drop",
    text: "Punctual, route-optimized commuter vans and coasters with dedicated corporate billing and SLA reliability.",
  },
  {
    num: "03",
    title: "School, College & University Transport",
    text: "Safe, verified campus commuter routes across Islamabad and Rawalpindi with consistent driver assignments.",
  },
  {
    num: "04",
    title: "Rent-a-Car (With or Without Driver)",
    text: "Flexible daily, weekly, and monthly rentals across city hatchbacks, executive sedans, and 4x4 SUVs.",
  },
  {
    num: "05",
    title: "Daily & Monthly Commute Plans",
    text: "Predictable subscription-style transport for professionals, executives, and recurring inter-urban routes.",
  },
  {
    num: "06",
    title: "Event & Wedding Transfers",
    text: "Coordinated luxury sedans, SUVs, and guest shuttles for weddings, conferences, and VIP delegations.",
  },
  {
    num: "07",
    title: "Group & Northern Tours Transport",
    text: "Hiace Grand Cabins, Toyota Coasters, and high-clearance 4x4s built for group tours and northern passes.",
  },
  {
    num: "08",
    title: "Logistics & Parcel Movement",
    text: "Dependable commercial parcel movement and light cargo transport tailored for growing businesses.",
  },
];

export const fleetVehicles: FleetVehicle[] = [
  // Hatchbacks (City-Friendly)
  {
    id: "suzuki-alto",
    name: "Suzuki Alto",
    category: "hatchback",
    categoryLabel: "Hatchback",
    seats: "4 Seats",
    useCase: "Economical city errands & solo commutes",
    driverOption: "With or without driver",
    highlights: ["Fuel efficient", "Easy city parking", "AC equipped"],
  },
  {
    id: "suzuki-cultus",
    name: "Suzuki Cultus",
    category: "hatchback",
    categoryLabel: "Hatchback",
    seats: "4–5 Seats",
    useCase: "Daily urban travel & campus commutes",
    driverOption: "With or without driver",
    highlights: ["Spacious cabin", "Smooth city ride", "Daily & monthly plans"],
  },
  // Sedans (Family & Executive)
  {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    category: "sedan",
    categoryLabel: "Sedan",
    seats: "4–5 Seats",
    useCase: "Intercity highway travel & family trips",
    driverOption: "With or without driver",
    highlights: ["Highway comfort", "Large boot", "Verified chauffeur option"],
  },
  {
    id: "toyota-altis-grande",
    name: "Toyota Altis / Grande",
    category: "sedan",
    categoryLabel: "Sedan",
    seats: "4–5 Seats",
    useCase: "Executive travel & intercity business routes",
    driverOption: "With or without driver",
    highlights: ["Premium trim", "Cruise comfort", "Executive standard"],
  },
  {
    id: "honda-civic",
    name: "Honda Civic",
    category: "sedan",
    categoryLabel: "Sedan",
    seats: "4–5 Seats",
    useCase: "Executive meetings, events & VIP city transfers",
    driverOption: "With or without driver",
    highlights: ["Sleek profile", "Leather comfort", "Chauffeur ready"],
  },
  // 4x4 & SUVs
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner",
    category: "4x4",
    categoryLabel: "4x4 & SUV",
    seats: "7 Seats",
    useCase: "Executive 4x4 for rough terrains & northern highways",
    driverOption: "Chauffeur or self-drive",
    highlights: ["True 4x4 power", "7-seat versatility", "VIP road presence"],
  },
  {
    id: "toyota-prado",
    name: "Toyota Prado",
    category: "4x4",
    categoryLabel: "4x4 & SUV",
    seats: "7 Seats",
    useCase: "High-comfort corporate delegations & mountain routes",
    driverOption: "Verified chauffeur",
    highlights: ["Air-ride poise", "Executive interior", "All-terrain"],
  },
  {
    id: "toyota-land-cruiser-zx",
    name: "Toyota Land Cruiser ZX V8",
    category: "4x4",
    categoryLabel: "4x4 & SUV",
    seats: "7 Seats",
    useCase: "Flagship V8 command for VIP delegations & northern passes",
    driverOption: "Dedicated chauffeur",
    highlights: ["Flagship V8", "Maximum terrain capability", "VIP protocol"],
  },
  // Luxury / Premium Cars
  {
    id: "mercedes-c-class",
    name: "Mercedes-Benz C-Class",
    category: "luxury",
    categoryLabel: "Luxury",
    seats: "4 Seats",
    useCase: "Weddings, diplomatic protocol & executive arrivals",
    driverOption: "Dedicated chauffeur",
    highlights: ["Executive prestige", "Immaculate presentation", "Protocol ready"],
  },
  {
    id: "range-rover",
    name: "Range Rover",
    category: "luxury",
    categoryLabel: "Luxury",
    seats: "5 Seats",
    useCase: "Premier luxury SUV for high-profile events & VIP travel",
    driverOption: "Dedicated chauffeur",
    highlights: ["Flagship luxury SUV", "Commanding presence", "Bespoke service"],
  },
  // Vans & Buses
  {
    id: "toyota-grand-cabin",
    name: "Toyota Grand Cabin",
    category: "vans-buses",
    categoryLabel: "Van / Bus",
    seats: "14–16 Seats",
    useCase: "Executive group tours, northern trips & corporate retreats",
    driverOption: "Dedicated driver",
    highlights: ["High-roof comfort", "Generous luggage", "Mountain-ready"],
  },
  {
    id: "toyota-coaster-4c-5c",
    name: "Toyota Coaster (4C & 5C)",
    category: "vans-buses",
    categoryLabel: "Van / Bus",
    seats: "22–28 Seats",
    useCase: "University trips, corporate conferences & large group tours",
    driverOption: "Dedicated driver",
    highlights: ["Full-coach AC", "Reclining seats", "Long-haul comfort"],
  },
];

export const transportValues = [
  {
    name: "Integrity",
    text: "We build trust through transparency and ethical practices on every trip.",
  },
  {
    name: "Sustainability",
    text: "We promote environmentally mindful maintenance and fuel-efficient routing.",
  },
  {
    name: "Customer Focus",
    text: "We deliver personalized, punctual service tailored to each client.",
  },
  {
    name: "Excellence",
    text: "We set dependable benchmarks in vehicle condition, safety, and driver conduct.",
  },
  {
    name: "Social Responsibility",
    text: "We support safe mobility for students, families, and local communities.",
  },
];

export const transportFaqs = [
  {
    q: "Can we book vehicles both with and without a driver?",
    a: "Yes. Hatchbacks, sedans, and select SUVs are available for both self-drive (with verification) and chauffeur-driven rental. Luxury cars, Hiace vans, and Coasters come with verified professional drivers.",
  },
  {
    q: "Do you offer monthly corporate staff and university pick-and-drop contracts?",
    a: "Yes. We customize daily and monthly pick-and-drop contracts for offices, schools, colleges, and universities across Islamabad and Rawalpindi with consolidated billing.",
  },
  {
    q: "Are your routes GPS-tracked and supported 24/7?",
    a: "Yes. Our fleet operates with GPS-enabled route monitoring, verified drivers, and 24/7 dispatch support from our Islamabad desk.",
  },
  {
    q: "Can I book a single vehicle for an airport transfer or wedding event?",
    a: "Absolutely. You can reserve single-trip airport pickups, executive sedans, or multi-car wedding convoys for specific dates.",
  },
];
