"use client";

import  NavBarNormal  from "../../components/Navbar.jsx";
import PlaceCard from "./tourcard.jsx";
import Foot from "../../components/Footer.jsx";

const ATTRACTIONS = [
  {
    imageSrc: "/images/destinations/1.avif",
    badgeText: "1",
    title: "Taj Mahal, Agra",
    subtitle: "An Immortal Symbol of Love",
    description:
      "Majestically located on the banks of Yamuna River, this wonder was built by Shah Jahan as a memorial for Mumtaz Mahal.",
  },
  {
    imageSrc: "/images/destinations/2.avif",
    badgeText: "2",
    title: "Red Fort, Delhi",
    subtitle: "Symbol of Mughal Dynasty",
    description:
      "An architectural masterpiece built by Shah Jahan in Delhi, symbolizing the peak of Mughal creativity.",
  },
  {
    imageSrc: "/images/destinations/3.webp",
    badgeText: "3",
    title: "Golden Temple, Amritsar",
    subtitle: "Holiest Sikh Shrine",
    description:
      "Sri Harmandir Sahib stuns visitors with its golden façade and serene surroundings.",
  },
  {
    imageSrc: "/images/destinations/4.avif",
    badgeText: "4",
    title: "Amer Fort, Jaipur",
    subtitle: "A Majestic Hilltop Fort",
    description:
      "A UNESCO site, this red sandstone fort offers a fusion of Mughal and Rajput architecture atop a hill.",
  },
  {
    imageSrc: "/images/destinations/5.webp",
    badgeText: "5",
    title: "Hawa Mahal, Jaipur",
    subtitle: "Palace of Winds",
    description:
      "Known for its 953 jharokhas, this honeycomb palace was built for royal women to view street festivals.",
  },
  {
    imageSrc: "/images/destinations/6.avif",
    badgeText: "6",
    title: "Humayun's Tomb, Delhi",
    subtitle: "Mughal Architectural Marvel",
    description:
      "Built by Hamida Banu Begum, it's the royal mausoleum of Mughal Emperor Humayun.",
  },
  {
    imageSrc: "/images/destinations/7.avif",
    badgeText: "7",
    title: "Qutub Minar, Delhi",
    subtitle: "Soaring above Delhi's Skyline",
    description:
      "The 73-meter-high minaret started by Qutb ud Din Aibak is known for intricate carvings.",
  },
  {
    imageSrc: "/images/destinations/8.avif",
    badgeText: "8",
    title: "Mysore Palace, Mysore",
    subtitle: "Historical Royal Palace",
    description:
      "An architectural marvel blending Hindu, Muslim, Rajput, and Gothic styles.",
  },
  {
    imageSrc: "/images/destinations/9.avif",
    badgeText: "9",
    title: "India Gate, Delhi",
    subtitle: "War Memorial and Landmark",
    description:
      "A 42-meter-high monument built in memory of soldiers who died in World War I.",
  },
  {
    imageSrc: "/images/destinations/10.avif",
    badgeText: "10",
    title: "Aguada Fort, Goa",
    subtitle: "Portuguese Fort Overlooking Sea",
    description:
      "A 17th-century Portuguese fort known for its lighthouse and panoramic sea views.",
  },
  {
    imageSrc: "/images/destinations/11.avif",
    badgeText: "11",
    title: "Gateway of India, Mumbai",
    subtitle: "Majestic Arch Monument",
    description:
      "Built during the British Raj, this iconic monument overlooks the Arabian Sea.",
  },
  {
    imageSrc: "/images/destinations/12.avif",
    badgeText: "12",
    title: "Charminar, Hyderabad",
    subtitle: "Historic Mosque and Monument",
    description:
      "Constructed in 1591, this Indo-Islamic structure is famous for its four grand minarets.",
  },
  {
    imageSrc: "/images/destinations/13.webp",
    badgeText: "13",
    title: "Meenakshi Temple, Madurai",
    subtitle: "Dravidian Marvel",
    description:
      "Known for its towering gopurams and intricate carvings dedicated to Goddess Meenakshi.",
  },
  {
    imageSrc: "/images/destinations/14.avif",
    badgeText: "14",
    title: "Victoria Memorial, Kolkata",
    subtitle: "Symbol of British India",
    description:
      "A white marble monument built in memory of Queen Victoria surrounded by lush gardens.",
  },
  {
    imageSrc: "/images/destinations/15.avif",
    badgeText: "15",
    title: "Sun Temple, Konark",
    subtitle: "Chariot of the Sun God",
    description:
      "A UNESCO World Heritage Site shaped like a giant stone chariot dedicated to Surya.",
  },
  {
    imageSrc: "/images/destinations/16.avif",
    badgeText: "16",
    title: "Jaisalmer Fort, Jaisalmer",
    subtitle: "The Golden Fort",
    description:
      "One of the few living forts in the world, known for its yellow sandstone architecture.",
  },
  {
    imageSrc: "/images/destinations/17.webp",
    badgeText: "17",
    title: "Ajanta Caves, Maharashtra",
    subtitle: "Buddhist Rock-cut Caves",
    description:
      "30 rock-cut caves famous for murals, sculptures, and ancient Buddhist art.",
  },
  {
    imageSrc: "/images/destinations/18.avif",
    badgeText: "18",
    title: "Ellora Caves, Maharashtra",
    subtitle: "Rock-cut Architectural Wonder",
    description:
      "34 caves showcasing Buddhist, Hindu, and Jain monuments and art.",
  },
  {
    imageSrc: "/images/destinations/19.avif",
    badgeText: "19",
    title: "Ranthambore Fort, Rajasthan",
    subtitle: "Historic Fort in a Tiger Reserve",
    description:
      "UNESCO-listed fort offering views of Ranthambore National Park's wildlife.",
  },
  {
    imageSrc: "/images/destinations/20.avif",
    badgeText: "20",
    title: "Chittorgarh Fort, Rajasthan",
    subtitle: "Largest Fort in India",
    description:
      "A symbol of Rajput pride, known for tales of valor and sacrifice.",
  },
  {
    imageSrc: "/images/destinations/21.avif",
    badgeText: "21",
    title: "Sanchi Stupa, Madhya Pradesh",
    subtitle: "Ancient Buddhist Monument",
    description:
      "Built by Emperor Ashoka, it is one of the oldest stone structures in India.",
  },
  {
    imageSrc: "/images/destinations/22.avif",
    badgeText: "22",
    title: "Mahabalipuram Temples, Tamil Nadu",
    subtitle: "UNESCO World Heritage Site",
    description:
      "Known for its rock-cut temples and intricate stone carvings by the Pallavas.",
  },
  {
    imageSrc: "/images/destinations/23.avif",
    badgeText: "23",
    title: "Fatehpur Sikri, Uttar Pradesh",
    subtitle: "Mughal Architectural Wonder",
    description:
      "A historic city built by Akbar known for its red sandstone buildings and palaces.",
  },
  {
    imageSrc: "/images/destinations/24.avif",
    badgeText: "24",
    title: "Hampi, Karnataka",
    subtitle: "Ruins of the Vijayanagara Empire",
    description:
      "A UNESCO site with ancient temples, palaces, and market streets.",
  },
  {
    imageSrc: "/images/destinations/25.avif",
    badgeText: "25",
    title: "Golconda Fort, Hyderabad",
    subtitle: "Defensive Fortress",
    description:
      "Known for its acoustics, grand gateways, and historical importance.",
  },
  {
    imageSrc: "/images/destinations/26.avif",
    badgeText: "26",
    title: "Jantar Mantar, Jaipur",
    subtitle: "Astronomical Observatory",
    description:
      "Built by Maharaja Jai Singh II, it's a collection of architectural astronomical instruments.",
  },
  {
    imageSrc: "/images/destinations/27.avif",
    badgeText: "27",
    title: "Rani Ki Vav, Gujarat",
    subtitle: "Queen's Stepwell",
    description:
      "A UNESCO site known for its intricate carvings and seven levels of steps.",
  },
  {
    imageSrc: "/images/destinations/28.avif",
    badgeText: "28",
    title: "Mysore Palace, Karnataka",
    subtitle: "Royal Heritage Palace",
    description:
      "An Indo-Saracenic architectural marvel illuminated with thousands of lights.",
  },
  {
    imageSrc: "/images/destinations/29.avif",
    badgeText: "29",
    title: "Shaniwar Wada, Pune",
    subtitle: "Historic Fortification",
    description:
      "Once the seat of the Peshwas, known for its majestic gates and stories of intrigue.",
  },
  {
    imageSrc: "/images/destinations/30.avif",
    badgeText: "30",
    title: "Belur and Halebidu Temples, Karnataka",
    subtitle: "Hoysala Architectural Marvels",
    description:
      "Renowned for intricate stone carvings and sculptures.",
  },
  {
    imageSrc: "/images/destinations/31.avif",
    badgeText: "31",
    title: "Nalanda University Ruins, Bihar",
    subtitle: "Ancient Center of Learning",
    description:
      "The ruins of the world's first residential university dating back to the 5th century.",
  },
  {
    imageSrc: "/images/destinations/32.avif",
    badgeText: "32",
    title: "Qutub Minar, Delhi",
    subtitle: "Tallest Brick Minaret",
    description:
      "Built in 1193 by Qutb-ud-din Aibak, this UNESCO monument marks the beginning of Muslim rule in India.",
  },
  {
    imageSrc: "/images/destinations/33.avif",
    badgeText: "33",
    title: "Kumbhalgarh Fort, Rajasthan",
    subtitle: "The Great Wall of India",
    description:
      "Second-longest wall after the Great Wall of China, known for its massive fortifications.",
  },
  {
    imageSrc: "/images/destinations/34.avif",
    badgeText: "34",
    title: "Brihadeeswara Temple, Tamil Nadu",
    subtitle: "Chola Dynasty Marvel",
    description:
      "A UNESCO World Heritage Site known for its massive vimana and detailed sculptures.",
  },
  {
    imageSrc: "/images/destinations/35.avif",
    badgeText: "35",
    title: "Jagannath Temple, Puri",
    subtitle: "Sacred Hindu Temple",
    description:
      "Famous for the annual Rath Yatra and its ancient spiritual significance.",
  },
  {
    imageSrc: "/images/destinations/36.avif",
    badgeText: "36",
    title: "Lotus Temple, Delhi",
    subtitle: "Symbol of Peace and Harmony",
    description:
      "Bahá'í House of Worship known for its lotus-like design and serene atmosphere.",
  },
  {
    imageSrc: "/images/destinations/37.avif",
    badgeText: "37",
    title: "Humayun’s Tomb, Delhi",
    subtitle: "Garden Tomb",
    description:
      "A UNESCO site and the inspiration behind the Taj Mahal’s architecture.",
  },
  {
    imageSrc: "/images/destinations/38.avif",
    badgeText: "38",
    title: "Rajarani Temple, Bhubaneswar",
    subtitle: "Love Temple of Odisha",
    description:
      "Famous for its detailed sculptures depicting various scenes of love and life.",
  },
  {
    imageSrc: "/images/destinations/39.avif",
    badgeText: "39",
    title: "Sundarbans National Park, West Bengal",
    subtitle: "Mangrove Wonderland",
    description:
      "Home to the Royal Bengal Tiger, it’s the largest mangrove forest in the world.",
  },
  {
    imageSrc: "/images/destinations/40.avif",
    badgeText: "40",
    title: "Kaziranga National Park, Assam",
    subtitle: "Home of the One-Horned Rhino",
    description:
      "A UNESCO World Heritage Site known for its population of Indian one-horned rhinoceroses.",
  },
  {
    imageSrc: "/images/destinations/41.avif",
    badgeText: "41",
    title: "Chittorgarh Fort, Rajasthan",
    subtitle: "Largest Fort in India",
    description:
      "A symbol of Rajput valor and pride, known for tales of jauhar and battles.",
  },
  {
    imageSrc: "/images/destinations/42.avif",
    badgeText: "42",
    title: "Meenakshi Temple, Madurai",
    subtitle: "Architectural Masterpiece",
    description:
      "Famous for its towering gopurams and intricate sculptures, dedicated to Goddess Meenakshi.",
  },
  {
    imageSrc: "/images/destinations/43.avif",
    badgeText: "43",
    title: "Elephanta Caves, Maharashtra",
    subtitle: "Rock-Cut Marvels",
    description:
      "UNESCO site with ancient rock-cut temples dedicated to Lord Shiva, located on an island.",
  },
  {
    imageSrc: "/images/destinations/44.avif",
    badgeText: "44",
    title: "Ajanta Caves, Maharashtra",
    subtitle: "Ancient Buddhist Paintings",
    description:
      "Famous for rock-cut caves with exquisite murals and sculptures dating back to 2nd century BCE.",
  },
  {
    imageSrc: "/images/destinations/45.jpg",
    badgeText: "45",
    title: "Ellora Caves, Maharashtra",
    subtitle: "Multi-Religious Monument",
    description:
      "A UNESCO World Heritage Site with Hindu, Buddhist, and Jain caves, including Kailasa Temple.",
  },
  {
    imageSrc: "/images/destinations/46.webp",
    badgeText: "46",
    title: "Sun Temple, Konark",
    subtitle: "Chariot of the Sun God",
    description:
      "Known for its intricate carvings and unique design representing the Sun God’s chariot.",
  },
  {
    imageSrc: "/images/destinations/47.avif",
    badgeText: "47",
    title: "Gwalior Fort, Madhya Pradesh",
    subtitle: "The Gibraltar of India",
    description:
      "A massive fort with palaces, temples, and historic significance from various dynasties.",
  },
  {
    imageSrc: "/images/destinations/48.avif",
    badgeText: "48",
    title: "Victoria Memorial, Kolkata",
    subtitle: "Icon of Colonial Era",
    description:
      "A grand marble building built in memory of Queen Victoria, now a museum and tourist spot.",
  },
  {
    imageSrc: "/images/destinations/49.avif",
    badgeText: "49",
    title: "Jaisalmer Fort, Rajasthan",
    subtitle: "The Golden Fort",
    description:
      "One of the few 'living forts' in the world, built of yellow sandstone, giving it a golden hue.",
  },
  {
    imageSrc: "/images/destinations/50.webp",
    badgeText: "50",
    title: "Charminar, Hyderabad",
    subtitle: "Architectural Icon",
    description:
      "Built in 1591, this monument is the heart of Hyderabad’s old city and a symbol of its heritage.",
  },
];

export default function TouristAttractions() {
  return (
    <div className="min-h-screen bg-white text-[color:var(--foreground)]">
      <NavBarNormal />

      {/* HERO */}
      <section className="relative isolate bg-[url('/images/3rdBackground.png')] bg-top bg-no-repeat bg-cover pt-24 pb-20">
        {/* overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-200/70 to-white/90" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white/80 backdrop-blur p-6 sm:p-8 shadow-[0_60px_40px_-40px_rgba(245,200,0,0.35)]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Top 50 Tourist Attractions In India
            </h1>
            <p className="mt-3 text-base sm:text-lg text-neutral-700">
              Explore the list of best tourist destinations in India — Taj Mahal, Red Fort,
              India Gate & many more.
            </p>
          </div>
        </div>
      </section>

      {/* GRID */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gradient-to-t from-amber-200/30 to-white rounded-2xl p-4 sm:p-6">
          {ATTRACTIONS.map((item) => (
            <div key={item.badgeText} className="h-full">
              <PlaceCard
                imageSrc={item.imageSrc}
                badgeText={item.badgeText}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </main>

      <Foot />
    </div>
  );
}
