"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import  NavBarNormal  from "../../components/Navbar.jsx";
import Foot from "../../components/Footer.jsx";
import BookForm from "./BookForm.jsx";

const MapComponent = dynamic(() => import("../../components/Map.jsx"), { ssr: false });

export default function CabBook() {
  const [start, setStartLocation] = useState("Your Location");
  const [end, setEndLocation] = useState("");

  const drawRoute = (startLocation, endLocation) => {
    setStartLocation(startLocation || "Your Location");
    setEndLocation(endLocation || "");
  };

  const handleConfirm = () => {
    window.alert("Presently no drivers are available.");
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <NavBarNormal />

      {/* BACKDROP */}
      <main className="relative isolate bg-[url('/images/3rdBackground.png')] bg-top bg-no-repeat bg-cover pt-24 pb-16 sm:pb-20">
        {/* gradient wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-200/70 to-white/90" />
        {/* subtle glow accents */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-300/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 -z-10 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* CARD */}
          <section
            className="
              overflow-hidden rounded-2xl border border-black/10 bg-white/80 backdrop-blur
              shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5
            "
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 sm:px-6 lg:px-8">
              <h1 className="text-lg font-semibold tracking-tight text-slate-800 sm:text-xl">
                Book Your Cab
              </h1>
              <span className="hidden text-xs font-medium text-amber-700/90 sm:inline">
                Seamless city to city rides ✨
              </span>
            </div>

            {/* GRID: form + map */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT: FORM */}
              <div className="p-4 sm:p-6 lg:p-8">
                <BookForm onFormSubmit={drawRoute} />
              </div>

              {/* RIGHT: MAP */}
              <div className="border-t border-black/10 lg:border-t-0 lg:border-l">
                <div
                  className="
                    relative w-full
                    h-[320px] sm:h-[380px] md:h-[420px] lg:h-[560px] xl:h-[640px]
                    overflow-hidden
                  "
                >
                  <MapComponent startLocation={start} endLocation={end} />
                </div>
              </div>
            </div>
          </section>

          {/* CTA: Confirm Booking */}
          <div className="mt-6 flex w-full items-center justify-center">
            <button
              type="button"
              onClick={handleConfirm}
              className="
                group relative inline-flex w-full max-w-md items-center justify-center gap-2
                rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500
                px-6 py-3 text-sm font-semibold text-black shadow-lg
                transition
                hover:shadow-xl active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
              "
            >
              Confirm Booking
              {/* subtle sheen */}
              <span
                className="
                  pointer-events-none absolute inset-0 rounded-xl
                  ring-1 ring-black/5
                "
              />
            </button>
          </div>
        </div>
      </main>

      <Foot />
    </div>
  );
}
