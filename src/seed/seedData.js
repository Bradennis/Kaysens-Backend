// Seed content mirrors the original Kaysens Group site copy, restructured for
// the new MongoDB-backed schema. Image paths point at /uploads, served by
// this same API — replace them with real, licensed photography in production.

const businesses = [
  {
    slug: "kaysens-gaisie",
    name: "Kaysens Gaisie Ltd",
    short: "Distribution",
    tagline: "Supplying essential goods to millions across Ghana.",
    description:
      "Kaysens Gaisie Ltd operates a reliable FMCG distribution network connecting ports, warehouses and retail across Ghana.",
    image: "/uploads/biz-distribution.jpg",
    category: "distribution",
    order: 1,
    brands: ["Nestlé", "Unilever", "PZ Cussons", "Fan Milk", "Promasidor", "Olam", "Wilmar", "Kasapreko"],
    features: [
      { icon: "Truck", title: "National fleet", text: "Modern long-haul and last-mile fleet covering all 16 regions." },
      { icon: "MapPin", title: "Strategic depots", text: "Distribution depots positioned for short, reliable lead times." },
      { icon: "ShieldCheck", title: "Quality controls", text: "End-to-end cold-chain and quality assurance for sensitive SKUs." },
    ],
  },
  {
    slug: "kaysens-grande-hotel",
    name: "Kaysens Grande Hotel",
    short: "Hotel",
    tagline: "Premium hospitality with a distinctly West African welcome.",
    description:
      "Kaysens Grande Hotel blends refined service, contemporary comfort and authentic Ghanaian hospitality for business and leisure travellers.",
    image: "/uploads/biz-hotel.jpg",
    category: "hotel",
    order: 2,
    rooms: [
      { name: "Deluxe Room", desc: "King bed, garden view, 32 m²", image: "/uploads/room-1.jpg" },
      { name: "Executive Suite", desc: "Separate lounge, 54 m²", image: "/uploads/room-2.jpg" },
      { name: "Presidential Suite", desc: "Panoramic suite, 110 m²", image: "/uploads/room-3.jpg" },
    ],
    amenities: [
      { icon: "Wifi", label: "High-speed Wi-Fi" },
      { icon: "Waves", label: "Outdoor Pool" },
      { icon: "UtensilsCrossed", label: "Fine Dining" },
      { icon: "Briefcase", label: "Conference Facilities" },
    ],
  },
  {
    slug: "kaysens-gas",
    name: "Kaysens Gas Ltd",
    short: "Energy",
    tagline: "Modern, safe, and reliable fuel retail.",
    description:
      "Kaysens Gas Ltd operates a growing network of service stations and energy solutions for motorists and businesses.",
    image: "/uploads/biz-energy.jpg",
    category: "energy",
    order: 3,
    products: [
      { title: "Premium Petrol", desc: "Consistent quality at every pump." },
      { title: "Diesel", desc: "Reliable supply for fleet and industrial." },
      { title: "Lubricants", desc: "Authorised distributor for premium brands." },
    ],
    safetyPoints: [
      "Certified storage and dispensing equipment",
      "ISO-aligned operating procedures",
      "Regular third-party safety audits",
      "Trained on-site emergency response teams",
    ],
  },
  {
    slug: "helena-gaisie-properties",
    name: "Helena Gaisie Properties",
    short: "Properties",
    tagline: "Thoughtful real estate and strategic investments.",
    description:
      "Helena Gaisie Properties develops long-term value through selective real estate investments and property management.",
    image: "/uploads/biz-ventures.jpg",
    category: "ventures",
    order: 4,
    ventures: [
      { title: "Real Estate", desc: "Commercial and mixed-use developments in prime urban locations." },
      { title: "Agribusiness", desc: "Selective investments in upstream agricultural value chains." },
      { title: "Strategic Investments", desc: "Equity stakes in companies aligned with the Group's vision." },
    ],
  },
  {
    slug: "telekay",
    name: "Telekay Company Ltd",
    short: "Enterprise",
    tagline: "Expanding the Group’s reach through innovation and service.",
    description:
      "Telekay Company Ltd drives enterprise growth through innovation, distribution and modern service delivery across the Group.",
    image: "/uploads/hero-hq.jpg",
    category: "enterprise",
    order: 5,
  },
];

const leaders = [
  {
    slug: "helena-gaisie-stephens",
    name: "Mrs Helena Gaisie Stephens",
    role: "Chief Executive Officer & Founder",
    bio: "Founder of Kaysens Group with over three decades of experience in trade and industry across West Africa.",
    image: "/uploads/hero-hq.jpg",
    linkedin: "https://www.linkedin.com/in/helena-gaisie-stephens",
    order: 1,
  },
  {
    slug: "maame-kwaaba-stephens",
    name: "Maame Kwaaba Stephens",
    role: "Executive Director",
    bio: "Drives Group strategy and oversees the operational performance of every subsidiary.",
    image: "/uploads/room-1.jpg",
    linkedin: "https://www.linkedin.com/in/maame-kwaaba-stephens",
    order: 2,
  },
  {
    slug: "yaw-asante",
    name: "Yaw Asante",
    role: "Director, Distribution",
    bio: "Leads the FMCG distribution division and its national logistics network.",
    image: "/uploads/room-2.jpg",
    linkedin: "https://www.linkedin.com/in/yaw-asante",
    order: 3,
  },
  {
    slug: "akua-nkrumah",
    name: "Akua Nkrumah",
    role: "Director, Hospitality",
    bio: "Heads the hospitality division and curates the guest experience across our properties.",
    image: "/uploads/room-3.jpg",
    linkedin: "https://www.linkedin.com/in/akua-nkrumah",
    order: 4,
  },
  {
    slug: "kwame-osei",
    name: "Kwame Osei",
    role: "Director, Energy",
    bio: "Oversees the energy and petroleum division and the expansion of our retail network.",
    image: "/uploads/biz-energy.jpg",
    linkedin: "https://www.linkedin.com/in/kwame-osei",
    order: 5,
  },
  {
    slug: "esi-darko",
    name: "Esi Darko",
    role: "Group Chief Financial Officer",
    bio: "Stewards Group finance, treasury, and investor relations.",
    image: "/uploads/biz-ventures.jpg",
    linkedin: "https://www.linkedin.com/in/esi-darko",
    order: 6,
  },
];

const news = [
  {
    slug: "logistics-fleet-expansion",
    title: "Kaysens Logistics expands fleet to the Northern Region",
    date: new Date("2025-10-12"),
    excerpt:
      "A 30-truck fleet addition extends our reach into the Northern and Upper East regions, bringing essential goods closer to market.",
    image: "/uploads/news-1.jpg",
    body: "Our distribution division has commissioned 30 new long-haul trucks to strengthen primary distribution across the Northern corridor. The investment supports faster lead times and unlocks new shelf presence for our brand partners.",
  },
  {
    slug: "emerald-suites-certification",
    title: "The Emerald Suites earns sustainability certification",
    date: new Date("2025-09-28"),
    excerpt:
      "Our flagship property is recognised for measurable progress on water, waste, and energy responsibility.",
    image: "/uploads/news-2.jpg",
    body: "Independent assessors recognised The Emerald Suites for its programme on water reuse, waste segregation, and reduced energy intensity per guest-night — a milestone in our hospitality sustainability roadmap.",
  },
  {
    slug: "pan-african-energy-partnership",
    title: "Strategic partnership announced with Pan-African Energy",
    date: new Date("2025-09-05"),
    excerpt: "A long-term supply agreement secures premium fuel quality across our retail network.",
    image: "/uploads/news-3.jpg",
    body: "The agreement covers premium grade petrol, diesel and lubricants for the next five years, and includes joint investment in upgrades to selected forecourts and underground storage infrastructure.",
  },
];

const csrPrograms = [
  {
    title: "Blood Donation Drives",
    description:
      "Quarterly drives partnering with the National Blood Service to replenish critical hospital reserves.",
    image: "/uploads/csr-blood.jpg",
    order: 1,
  },
  {
    title: "Education Initiatives",
    description:
      "Scholarships, school supplies, and infrastructure support for under-resourced basic schools.",
    image: "/uploads/csr-education.jpg",
    order: 2,
  },
  {
    title: "Community Support",
    description:
      "Clean water boreholes, sanitation upgrades, and disaster relief in the communities where we operate.",
    image: "/uploads/csr-water.jpg",
    order: 3,
  },
];

const homeStats = [
  { value: "30+", label: "Years of Excellence", group: "home", order: 1 },
  { value: "500+", label: "Dedicated Staff", group: "home", order: 2 },
  { value: "1000+", label: "Trade Partners", group: "home", order: 3 },
  { value: "20+", label: "Operating Sites", group: "home", order: 4 },
];

const csrStats = [
  { value: "12,000+", label: "Students supported", group: "csr", order: 1 },
  { value: "3,200", label: "Units of blood collected", group: "csr", order: 2 },
  { value: "18", label: "Community boreholes", group: "csr", order: 3 },
  { value: "₵5M+", label: "Annual CSR investment", group: "csr", order: 4 },
];

const galleryImages = [
  { image: "/uploads/hero-hq.jpg", alt: "Headquarters", span: "row-span-2", order: 1 },
  { image: "/uploads/biz-distribution.jpg", alt: "Distribution warehouse", span: "", order: 2 },
  { image: "/uploads/biz-hotel.jpg", alt: "Hotel lobby", span: "", order: 3 },
  { image: "/uploads/biz-energy.jpg", alt: "Filling station", span: "col-span-2", order: 4 },
  { image: "/uploads/room-1.jpg", alt: "Deluxe room", span: "", order: 5 },
  { image: "/uploads/csr-education.jpg", alt: "Education programme", span: "", order: 6 },
  { image: "/uploads/biz-ventures.jpg", alt: "Aerial farmland", span: "col-span-2", order: 7 },
  { image: "/uploads/csr-blood.jpg", alt: "Blood drive", span: "", order: 8 },
  { image: "/uploads/csr-water.jpg", alt: "Borehole project", span: "", order: 9 },
  { image: "/uploads/room-2.jpg", alt: "Executive suite", span: "", order: 10 },
  { image: "/uploads/room-3.jpg", alt: "Presidential suite", span: "", order: 11 },
  { image: "/uploads/news-1.jpg", alt: "Logistics fleet", span: "row-span-2", order: 12 },
];

const videos = [
  { title: "Kaysens Group — Our Story", duration: "2:48", poster: "/uploads/hero-hq.jpg", order: 1 },
  { title: "Inside Our Distribution Network", duration: "3:12", poster: "/uploads/news-1.jpg", order: 2 },
  { title: "The Emerald Suites — A Walkthrough", duration: "1:45", poster: "/uploads/news-2.jpg", order: 3 },
  { title: "Energy Division — Safety First", duration: "2:05", poster: "/uploads/news-3.jpg", order: 4 },
  { title: "CSR in Action", duration: "4:20", poster: "/uploads/news-1.jpg", order: 5 },
  { title: "Leadership Conversations", duration: "5:30", poster: "/uploads/news-3.jpg", order: 6 },
];

module.exports = {
  businesses,
  leaders,
  news,
  csrPrograms,
  homeStats,
  csrStats,
  galleryImages,
  videos,
};
