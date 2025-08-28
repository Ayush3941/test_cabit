"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMiniBars3 } from "react-icons/hi2";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import Foot from './../components/Footer.jsx';
import { SiGoogleplay, SiAppstore } from "react-icons/si";
import { useEffect } from "react";
const destinations = [
  {
    name: "Rajasthan",
    img: "/images/rajasthan-hero.png",
    rating: 4.6,
    desc: "Experience the royal forts, palaces, and desert landscapes of Rajasthan.",
    thumbs: ["/images/rajasthan-1.jpg", "/images/rajasthan-2.jpg", "/images/rajasthan-3.jpg"],
  },
  {
  name: "Gujarat",
  img: "/images/somnath.jpg",
  rating: 4.5,
  desc: "From the white sands of Rann of Kutch to Gir’s Asiatic lions, Gujarat is a land of culture and heritage.",
  thumbs: [
    "/images/gujarat-1.jpg",
    "/images/gujarat-2.jpg",
    "/images/gujarat-3.jpg",
  ],
},
  {
    name: "Kerala",
    img: "/images/Kerala.jpg",
    rating: 4.7,
    desc: "Backwaters, lush greenery, and Ayurveda retreats make Kerala ‘God’s Own Country’.",
    thumbs: ["/images/kerala-1.jpg", "/images/kerala-2.jpg", "/images/kerala-3.jpg"],
  },
];

/**
 * Cabit Home — Tailwind implementation matching the provided Figma
 * - Clean, precise spacings
 * - Responsive
 * - No external CSS required beyond Tailwind
 * - Swap image src paths with your real assets
 */
export default function CabitHome() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    // if (!location || !date) {
    //   alert("Please select a location and date!");
    //   return;
    // }
    // Example: navigate or call API
    // console.log("Searching for:", { location, date });
    window.location.href = `/search?location=${location}&date=${date}`;
  };

  const [active, setActive] = useState(0);

  // Optional: Auto-slide every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % destinations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="min-h-screen bg-white text-black antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
  <div className="flex h-20 items-center">
    {/* Left: Logo */}
    <Link href="/" className="flex items-center gap-2 select-none">
      <Image
        src="/images/logo.png"
        alt="Cabit"
        width={130}
        height={28}
        className="h-auto w-[130px]"
      />
    </Link>

    {/* Right: ALL links aligned right (desktop) */}
    <div className="ms-auto hidden items-center gap-8 md:flex">
      <nav className="flex items-center gap-8">
        <Link href="/VisitingPlaces" className="text-black hover:text-neutral-700 transition-colors text-decoration-none">
          Discover
        </Link>
        <Link href="/AboutUs" className="text-black hover:text-neutral-700 transition-colors text-decoration-none">
          About
        </Link>
        <Link href="/ContactUs" className="text-black hover:text-neutral-700 transition-colors text-decoration-none">
          Contact
        </Link>
      </nav>

      <Link
        href="/Login"
        className="inline-flex items-center gap-2 rounded-full bg-[#FFE966] px-5 py-2.5 text-[15px] font-semibold text-black shadow-sm hover:scale-[1.02] transition-transform text-decoration-none">
        Sign in
      </Link>
    </div>

    {/* Burger (mobile) */}
    <button
      className="md:hidden ms-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-900"
      aria-label="Toggle menu"
      onClick={() => setOpen((s) => !s)}
    >
      <HiMiniBars3 size={22} />
    </button>
  </div>
</div>


        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-neutral-200">
            <div className="mx-auto max-w-[1200px] px-4 py-4 space-y-3 text-[15px]">
              <Link href="/VisitingPlaces" className="block py-1">Discover</Link>
              <Link href="/AboutUs" className="block py-1">About</Link>
              <Link href="/ContactUs" className="block py-1">Contact</Link>
              <Link href="/Login" className="block pt-2 font-semibold text-[#F4B000]">Sign in</Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
       <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:py-24">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Travelling just got smarter.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
              Discover curated travel rides to top destinations — planned ahead, safe for women, and
              made for explorers like you.
            </p>

            <div className="mt-6">
              <Link
                href="/itinerary/city"
                className="inline-flex no-underline items-center gap-2 rounded-full bg-[#FFE966] px-5 py-2.5 text-[15px] font-semibold text-black shadow-sm hover:scale-[1.02] transition-transform"
              >
                Plan now!
              </Link>
            </div>

            {/* Search Bar */}
            <div className="mt-8 flex w-full max-w-xl items-stretch gap-3 bg-white rounded-xl p-2 shadow-md">
              {/* Location Input */}
              <div className="flex-1">
                <label className="text-xs text-neutral-500">LOCATION</label>
                <input
                  type="text"
                  placeholder="Enter city..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-300"
                />
              </div>

              {/* Date Input */}
              <div className="flex-1">
                <label className="text-xs text-neutral-500">DATE</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-300"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="grid place-items-center rounded-xl bg-[#FFE966] px-5 hover:scale-105 transition"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative mx-auto aspect-[16/9] w-full max-w-[560px] lg:ml-auto">
              <Image
                src="/images/hero-car.png"
                alt="Hero Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative BG */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]">
        <Image src="/images/bg-shapes.png" alt="" fill className="object-cover" />
      </div>
    </section>

      {/* WHAT WE OFFER */}
      
      {/* QUICK ACTION CARDS (clickable routes) */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Smart Trip Planner",
                desc: "Customize your trip with a personalized itinerary.",
                icon: "/images/PlanTrip.png",
                href: "/CabBooking",
              },
              {
                title: "Cab Booking",
                desc: "Book rides with trusted drivers who speak your language.",
                icon: "/images/CabDriver.png",
                href: "/CabBooking",
              },
              {
                title: "Destinations",
                desc: "Discover handpicked travel gems across India.",
                icon: "/images/Map.png",
                href: "/VisitingPlaces",
              },
              {
                title: "No Language Gaps",
                desc: "Travel smooth with in-app translation.",
                icon: "/images/Language.png",
                href: "/TranslatorPage",
              },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group block no-underline focus-visible:outline-none"
              >
                <article
                  className="relative z-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition
                             hover:-translate-y-0.5 hover:shadow-lg h-[320px]
                             group-focus-visible:ring-2 group-focus-visible:ring-[#FFE966] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-white"
                >
                  {/* Top image — full width with hover zoom */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={c.icon}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Text area */}
                  <div className="p-4 md:p-6">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-neutral-900">
                      {c.title}
                      <span className="ml-3 inline-flex items-center text-[13px] font-medium text-neutral-500 transition group-hover:text-neutral-900">
                        Explore
                        <svg
                          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-neutral-600">{c.desc}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN, BOOK, RIDE */}
      <section id="plan" className="py-6 sm:py-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold">Plan, Book, Ride – In minutes</h2>
          <p className="mt-2 text-center text-[14px] text-neutral-600">In just 3 easy steps!</p>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                num: "01",
                title: "Pick a Destination",
                desc: "Choose your travel location.",
                icon: "/images/step-pin.png",
              },
              {
                num: "02",
                title: "Select Rides & Dates",
                desc: "Get matched with routes and drivers.",
                icon: "/images/step-calendar.png",
              },
              {
                num: "03",
                title: "Travel Safely",
                desc: "Enjoy the journey with real-time support.",
                icon: "/images/step-shield.png",
              },
            ].map((s, i) => (
              <div key={s.num} className="relative">
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-[#FFD35A] text-[#F4B000]">
                    <span className="text-xl font-bold">{s.num}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-[14px] text-neutral-600">{s.desc}</p>
                  </div>
                </div>
                {/* dotted connector on larger screens */}
                {i < 2 && (
                  <div className="pointer-events-none absolute left-16 right-[-16px] top-7 hidden h-px border-t-2 border-dashed border-neutral-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}

    <section id="discover" className="py-8 sm:py-12">
  <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
    <h2 className="text-center text-2xl sm:text-3xl font-extrabold">Discover Top Destinations</h2>
    <p className="mt-2 text-center text-sm sm:text-[14px] text-neutral-600">
      Just select with hassle free planning and get ready to Explore.
    </p>

    <div className="mt-10 overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/3] sm:aspect-[16/7] w-full">
        {/* Hero Background */}
        <Image
          src={destinations[active].img}
          alt={destinations[active].name}
          fill
          priority
          className="object-cover transition-all duration-700 ease-in-out"
        />

        {/* Top-right Rating */}
        <div className="absolute right-2 top-2 sm:right-3 sm:top-3 select-none rounded-full bg-white/90 px-2 py-0.5 sm:py-1 text-[10px] sm:text-[12px] font-semibold shadow">
          ⭐ {destinations[active].rating}
        </div>

        {/* Bottom Thumbnails */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-end gap-2 sm:gap-3 z-50 w-[95%] sm:w-auto">
          <div className="flex sm:grid sm:grid-cols-3 gap-2 overflow-x-auto rounded-xl bg-white/90 p-2 backdrop-blur scrollbar-hide">
            {destinations.map((d, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-14 w-16 sm:h-16 sm:w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition 
                  ${active === i ? "border-yellow-400" : "border-transparent"}`}
              >
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
          <button className="select-none rounded-full bg-white/90 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[12px] font-semibold shadow hover:bg-white whitespace-nowrap">
            Show more
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/20" />

        {/* Title & Subtitle */}
        <div className="absolute left-3 sm:left-6 top-3 sm:top-6 max-w-[90%] sm:max-w-xl text-white">
          <h3 className="text-lg sm:text-[22px] font-semibold">{destinations[active].name}</h3>
          <p className="mt-1 text-xs sm:text-[14px] text-white/90">{destinations[active].desc}</p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* DOWNLOAD APP */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Google Play badge */}
          {/* Google Play badge */}
<a
  href="#"
  aria-label="Get it on Google Play"
  className="inline-flex h-[56px] w-[196px] items-center gap-3 rounded-[12px] border border-white/12
             bg-black px-4 text-white shadow-sm transition
             hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE966]
             no-underline hover:no-underline focus:no-underline"
>
  <Image src="/images/download 2.png" alt="Google Play" width={24} height={24} className="h-7 w-7" />
  <span className="leading-tight">
    <span className="block text-[10px] uppercase tracking-[0.18em] opacity-70 font-light text-white">
      GET IT ON
    </span>
    <span className="block -mt-[2px] text-[17px] font-light text-white">
      Google Play
    </span>
  </span>
</a>

{/* App Store badge */}
<a
  href="#"
  aria-label="Download on the App Store"
  className="inline-flex h-[56px] w-[210px] items-center gap-3 rounded-[12px] border border-white/12
             bg-black px-4 text-white shadow-sm transition
             hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE966]
             no-underline hover:no-underline focus:no-underline"
>
  <Image src="/images/Vector.png" alt="Google Play" width={24} height={24} className="h-7 w-7" />
  <span className="leading-tight">
    <span className="block text-[10px] uppercase tracking-[0.12em] opacity-70 font-light text-white">
      Download on the
    </span>
    <span className="block -mt-[2px] text-[17px] font-light text-white/90">
      App Store
    </span>
  </span>
</a>

        </div>



            <div className="relative mx-auto w-full lg:h-[500px] h-[300px] max-w-[450px]">
              <div className="relative w-full h-full overflow-hidden">
                <Image src="/images/screen.png" alt="Cabit App" fill />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Foot/>
    </div>
  );
}
