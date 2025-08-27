"use client";

import React from "react";
import  NavBarHome  from "../../components/Navbar.jsx";
import Foot from "../../components/Footer.jsx";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavBarHome />

      <main className="relative isolate">
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-6 top-40 hidden h-40 w-1.5 rounded bg-slate-100/80 sm:block" />
          <div className="absolute right-16 top-80 hidden h-24 w-1.5 rounded bg-slate-100/80 lg:block" />
          <div className="absolute left-[8%] bottom-40 hidden h-28 w-1.5 rounded bg-slate-100/80 xl:block" />
          <div className="absolute left-[-6rem] top-[-6rem] h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute right-[-4rem] bottom-[-6rem] h-56 w-56 rounded-full bg-amber-300/30 blur-3xl" />
        </div>

        {/* wrapper */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* INTRO */}
          <section className="pb-16 pt-24 sm:pt-28 lg:pt-32">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-14">
              <div className="md:col-span-7">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
                  Get to Know us –
                </h1>
                <p className="mt-4 text-[13px] font-semibold text-amber-400">
                  Your Trusted Travel Partner Across India
                </p>
                <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Whether you're planning a solo escape, a family vacation, or a heritage trip — Cabit brings you
                  safe, smart, and personalized travel experiences. From pre-booked taxis to multilingual support,
                  we make your journey stress-free.
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="relative mx-auto w-full max-w-sm">
                  <div className="absolute -left-3 top-8 h-7 w-7 rounded-md border border-slate-300/60" />
                  <div className="absolute -right-3 top-2 h-9 w-9 rounded-md border border-slate-300/60" />
                  <div className="absolute -right-4 bottom-10 h-8 w-8 rounded-md border border-slate-300/60" />
                  <img
                    src="/images/about-people.png"
                    alt="Friendly Cabit team illustrations"
                    className="relative z-10 w-full rounded-xl shadow-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* OUR MISSION */}
          <section className="py-12 sm:py-16">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="relative">
                  <div className="absolute -top-6 right-0 h-16 w-32 rounded bg-amber-300" />
                  <div className="absolute -bottom-6 left-0 h-16 w-28 rounded bg-slate-900/90" />
                  <img
                    src="/images/ourmission.jpg"
                    alt="Sunset road trip"
                    className="relative z-10 aspect-[16/9] w-full rounded-xl object-cover shadow-lg"
                  />
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative -mt-8 rounded-xl bg-white p-6 shadow-xl ring-1 ring-slate-200/70 sm:p-7 lg:-ml-16 lg:mt-0">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-[26px]">Our Mission</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
                    At Cabit, we believe travel should be simple, safe, and soulful. We’re on a mission to remove
                    travel stress with well-organized transport, personalized itineraries, and real-time support —
                    even in the most remote corners of India. Whether it’s a short trip or a grand tour, we’re your
                    on-road companion.
                  </p>
                  <span className="pointer-events-none absolute -left-2 top-6 hidden h-10 w-1 rounded bg-slate-200 lg:block" />
                </div>
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section className="py-14 sm:py-16">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Why Choose Us?</h3>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-700 sm:text-[15px]">
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span>Personalized trip planning.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span>Verified, women-safe drivers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span>Transparent pricing with zero last-minute surprises.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span>Cultural insights & local language help.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span>We’re not just a ride — we’re your travel ally.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="relative">
                  <div className="absolute -left-6 top-10 h-24 w-10 rounded bg-slate-900/90" />
                  <div className="absolute -bottom-5 left-10 h-4 w-24 rounded bg-amber-200" />
                  <img
                    src="/images/whychooseus.jpg"
                    alt="Taj Mahal through an arch"
                    className="relative z-10 aspect-[16/10] w-full rounded-xl object-cover shadow-lg"
                  />
                </div>

                {/* socials */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-block h-3.5 w-3.5 rounded-sm bg-amber-300" />
                  <a
                    href="mailto:hello@cabit.example"
                    className="no-underline text-slate-800 hover:text-black"
                    aria-label="Email"
                    title="Email"
                  >
                    <MailIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com"
                    className="no-underline text-slate-800 hover:text-black"
                    aria-label="X / Twitter"
                    title="X"
                  >
                    <XIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    className="no-underline text-slate-800 hover:text-black"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <InstaIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    className="no-underline text-slate-800 hover:text-black"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="no-underline text-slate-800 hover:text-black"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CTA BAND */}
          <section
            className="
              relative my-10 overflow-hidden rounded-2xl
              bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400
              p-6 sm:p-8 lg:p-10
              shadow-[0_18px_60px_-20px_rgba(0,0,0,0.25)]
            "
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
            <div className="absolute -left-10 -bottom-12 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h4 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Ready to plan your next journey?
                </h4>
                <p className="mt-1 text-sm text-slate-800/80 sm:text-[15px]">
                  Tell us where you’re headed and we’ll help with the rest — routes, rides, and real-time support.
                </p>
              </div>
              <div className="flex items-center justify-start gap-3 md:justify-end">
                <a
                  href="/PlanTrip"
                  className="
                    no-underline inline-flex items-center justify-center rounded-xl
                    bg-slate-900 px-5 py-3 text-sm font-semibold text-white
                    shadow hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-900/40
                  "
                >
                  Plan a Trip
                </a>
                <a
                  href="/ContactUs"
                  className="
                    no-underline inline-flex items-center justify-center rounded-xl
                    border border-slate-900/20 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900
                    backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20
                  "
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Foot />
    </div>
  );
}

/* inline icons */
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M2 6.8A2.8 2.8 0 0 1 4.8 4h14.4A2.8 2.8 0 0 1 22 6.8v10.4A2.8 2.8 0 0 1 19.2 20H4.8A2.8 2.8 0 0 1 2 17.2V6.8Zm2 .2 8 5 8-5v-.2A.8.8 0 0 0 19.2 6H4.8A.8.8 0 0 0 4 6.8V7Z" />
    </svg>
  );
}
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 3h3.3l6 7.7L18.7 3H21l-6.8 8.8L21 21h-3.2l-6-7.8L6 21H3.1l7.1-9.2L3 3Z" />
    </svg>
  );
}
function InstaIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0-3.3c2 0 2.3 0 3.1.1.8 0 1.3.2 1.8.4.5.2.9.5 1.4 1 .5.5.8.9 1 1.4.2.5.3 1 .4 1.8.1.8.1 1.1.1 3.1s0 2.3-.1 3.1c0 .8-.2 1.3-.4 1.8-.2.5-.5.9-1 1.4-.5.5-.9.8-1.4 1-.5.2-1 .3-1.8.4-.8.1-1.1.1-3.1.1s-2.3 0-3.1-.1c-.8 0-1.3-.2-1.8-.4-.5-.2-.9-.5-1.4-1-.5-.5-.8-.9-1-1.4-.2-.5-.3-1-.4-1.8C4.6 14.3 4.6 14 4.6 12s0-2.3.1-3.1c.1-.8.2-1.3.4-1.8.2-.5.5-.9 1-1.4.5-.5.9-.8 1.4-1 .5-.2 1-.3 1.8-.4C9.7 4 10 4 12 4Z" />
    </svg>
  );
}
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 20v-7h2.4l.4-2.8H13.5V8.1c0-.8.3-1.3 1.4-1.3h1.5V4.1c-.7-.1-1.5-.1-2.3-.1-2.3 0-3.8 1.3-3.8 3.7v2h-2.3V13h2.3v7h3.2Z" />
    </svg>
  );
}
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.6 3.9a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3 8.6h3.2V21H3V8.6Zm6 0h3v1.7h.1c.4-.7 1.3-1.8 3.1-1.8 3.3 0 3.9 2.2 3.9 5V21H16V14.4c0-1.6 0-3.7-2.2-3.7-2.3 0-2.7 1.7-2.7 3.6V21H9V8.6Z" />
    </svg>
  );
}
