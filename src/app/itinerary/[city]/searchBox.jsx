"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const budgets = ["budget", "moderate", "premium", "luxury"];
const paces = ["relaxed", "balanced", "packed"];

const toTitle = (s) =>
  String(s || "")
    .split(/[\s-]+/)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join(" ");

const slugify = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function SearchForm() {
  const router = useRouter();
  const qs = useSearchParams();

  const [startingCity, setStartingCity] = useState(qs.get("starting_city") || "");
  const [places, setPlaces] = useState(qs.get("places") || "");
  const [days, setDays] = useState(qs.get("days") || "");
  const [interests, setInterests] = useState(qs.get("interests") || "");
  const [budget, setBudget] = useState(qs.get("budget_level") || "moderate");
  const [pace, setPace] = useState(qs.get("pace") || "balanced");

  const isValid = useMemo(() => startingCity.trim().length > 0, [startingCity]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const cityTitle = toTitle(startingCity.trim());
    const citySlug = slugify(cityTitle);

    const params = new URLSearchParams();
    if (places.trim()) params.set("places", places.trim());
    if (days) params.set("days", String(days));
    if (interests.trim()) params.set("interests", interests.trim());
    if (budget) params.set("budget_level", budget);
    if (pace) params.set("pace", pace);
    params.set("starting_city", cityTitle);

    const href = params.toString()
      ? `/itinerary/${encodeURIComponent(citySlug)}?${params.toString()}`
      : `/itinerary/${encodeURIComponent(citySlug)}`;

    router.push(href);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="
        mx-auto w-full max-w-[1200px]
        rounded-2xl border border-gray-200/80 bg-white/90
        p-10 sm:p-2 md:p-2
        shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur
      "
    >
      {/* GRID: 1col(xs) → 2col(sm) → 3col(md) → compact multi-col(lg/xl/2xl) */}
      <div
        className="
          grid items-stretch gap-2 sm:gap-2.5
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:[grid-template-columns:1.2fr_1.4fr_.6fr_1.4fr_1fr_1fr_auto]
          xl:[grid-template-columns:1.25fr_1.5fr_.6fr_1.5fr_1fr_1fr_auto]
          2xl:[grid-template-columns:1.25fr_1.6fr_.6fr_1.6fr_1fr_1fr_auto]
        "
      >
        {/* Starting city */}
        <Field id="start" icon={<MapPinIcon className="h-4 w-4 text-slate-500" />}>
          <input
            id="start"
            type="text"
            autoComplete="address-level2"
            placeholder="Starting city (e.g., Delhi)"
            value={startingCity}
            onChange={(e) => setStartingCity(e.target.value)}
            required
            className="
              h-11 sm:h-10 w-full min-w-0
              rounded-xl border border-gray-200 bg-slate-50
              pl-9 pr-3 text-[14px] font-semibold text-slate-900
              placeholder:text-slate-400
              focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
            "
          />
        </Field>

        {/* Places */}
        <Field id="places" icon={<LocationPathIcon className="h-4 w-4 text-slate-500" />}>
          <input
            id="places"
            type="text"
            placeholder="Places (e.g., Jaipur, Kashmir)"
            value={places}
            onChange={(e) => setPlaces(e.target.value)}
            className="
              h-11 sm:h-10 w-full min-w-0
              rounded-xl border border-gray-200 bg-slate-50
              pl-9 pr-3 text-[14px] font-semibold text-slate-900
              placeholder:text-slate-400
              focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
            "
          />
        </Field>

        {/* Days */}
        <Field id="days" icon={<CalendarIcon className="h-4 w-4 text-slate-500" />}>
          <input
            id="days"
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="
              h-11 sm:h-10 min-w-0 w-full
              rounded-xl border border-gray-200 bg-slate-50
              pl-7 pr-1 text-center text-[14px] font-semibold text-slate-900
              placeholder:text-slate-400
              focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
            "
          />
        </Field>

        {/* Interests */}
        <Field id="interests" icon={<StarIcon className="h-4 w-4 text-slate-500" />}>
          <input
            id="interests"
            type="text"
            placeholder="Interests (e.g., food, temples)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="
              h-11 sm:h-10 w-full min-w-0
              rounded-xl border border-gray-200 bg-slate-50
              pl-9 pr-8 text-[14px] font-semibold text-slate-900
              placeholder:text-slate-400
              focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
            "
          />
        </Field>

        {/* Budget */}
        <Field id="budget" icon={<WalletIcon className="h-4 w-4 text-slate-500" />}>
          <div className="relative">
            <select
              id="budget"
              aria-label="Budget level"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="
                h-11 sm:h-10 w-full min-w-0
                appearance-none rounded-xl border border-gray-200 bg-slate-50
                pl-9 pr-9 text-[14px] font-semibold text-slate-900
                focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
              "
            >
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {toTitle(b)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </Field>

        {/* Pace */}
        <Field id="pace" icon={<ZapIcon className="h-4 w-4 text-slate-500" />}>
          <div className="relative">
            <select
              id="pace"
              aria-label="Trip pace"
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              className="
                h-11 sm:h-10 w-full min-w-0
                appearance-none rounded-xl border border-gray-200 bg-slate-50
                pl-9 pr-9 text-[14px] font-semibold text-slate-900
                focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30
              "
            >
              {paces.map((p) => (
                <option key={p} value={p}>
                  {toTitle(p)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </Field>

        {/* Actions */}
        <div className="flex items-center justify-end sm:col-span-2 md:col-span-3 lg:col-span-1">
          <button
            type="submit"
            disabled={!isValid}
            className="
              inline-flex h-11 sm:h-10 items-center gap-2 rounded-xl
              bg-slate-900 px-4 text-white font-extrabold tracking-[.02em]
              motion-safe:transition
              hover:bg-slate-950 motion-safe:active:-translate-y-[1px]
              shadow-none hover:shadow-[0_10px_22px_rgba(0,0,0,0.12)]
              disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:translate-y-0
              focus:outline-none focus:ring-2 focus:ring-amber-500/40
              w-full sm:w-auto
            "
          >
            <SearchIcon className="h-4 w-4 text-white" />
            Find
          </button>
        </div>
      </div>

      {/* Quick chips on tiny screens */}
      <div className="mt-2 flex flex-wrap gap-2 sm:hidden">
        <Chip onClick={() => setPace("relaxed")} active={pace === "relaxed"}>
          Relaxed
        </Chip>
        <Chip onClick={() => setPace("balanced")} active={pace === "balanced"}>
          Balanced
        </Chip>
        <Chip onClick={() => setPace("packed")} active={pace === "packed"}>
          Packed
        </Chip>
        <span className="mx-1 inline-block h-4 w-px bg-gray-200/70" />
        <Chip onClick={() => setBudget("budget")} active={budget === "budget"}>
          Budget
        </Chip>
        <Chip onClick={() => setBudget("moderate")} active={budget === "moderate"}>
          Moderate
        </Chip>
        <Chip onClick={() => setBudget("premium")} active={budget === "premium"}>
          Premium
        </Chip>
      </div>
    </form>
  );
}

/* ---------- Small UI helpers ---------- */
function Field({ id, icon, children }) {
  return (
    <div className="relative min-w-0">
      <label htmlFor={id} className="sr-only">
        {id}
      </label>
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        {icon}
      </div>
      {children}
    </div>
  );
}

function Chip({ children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-[12px] font-semibold transition",
        active
          ? "border-amber-400 bg-amber-100 text-amber-800"
          : "border-gray-300 bg-white/80 text-slate-700 hover:bg-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ---------- Inline Icons (no deps) ---------- */
function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 22s7-5.33 7-12a7 7 0 1 0-14 0c0 6.67 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" strokeWidth="1.8" />
    </svg>
  );
}
function LocationPathIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M4 6h6l2 4h8" />
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="11" cy="6" r="1.5" />
      <circle cx="21" cy="10" r="1.5" />
    </svg>
  );
}
function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth="1.8" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 2 2.9 6.2 6.8.7-5 4.6 1.4 6.6L12 16.8 5.9 20.1 7.3 13.5 2.3 8.9l6.8-.7L12 2z" />
    </svg>
  );
}
function WalletIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth="1.8" />
      <path d="M16 12h4v4h-4z" strokeWidth="1.4" />
      <path d="M3 9h18" strokeWidth="1.2" />
    </svg>
  );
}
function ZapIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
function ChevronDown(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.16l-4.19 3.32a.75.75 0 0 1-.94 0L5.21 8.39a.75.75 0 0 1 .02-1.18z" />
    </svg>
  );
}
function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" {...props}>
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
