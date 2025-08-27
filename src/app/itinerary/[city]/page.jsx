"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import  NavBarNormal from "../../../components/Navbar.jsx";
import Foot from "../../../components/Footer.jsx";
import SearchForm from "./searchBox.jsx";

/* helpers */
const cityImage = (city) => {
  const k = String(city || "").toLowerCase();
  if (k.includes("mumbai")) return "/images/homepage/col2.jpeg";
  if (k.includes("jaipur")) return "/images/Rajesthan.jpg";
  if (k.includes("srinagar") || k.includes("kashmir")) return "/images/homepage/couples.jpeg";
  if (k.includes("delhi")) return "/images/TajMahal.jpg";
  return "/images/homepage/col3.jpeg";
};
const toTitle = (s) =>
  String(s || "")
    .split(/[\s-]+/)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join(" ");
const splitCSV = (v) =>
  String(v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export default function ItineraryPage() {
  const pathname = usePathname();
  const qs = useSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [activeDay, setActiveDay] = useState(0);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const ctrl = new AbortController();

    const slug = decodeURIComponent((pathname || "").split("/").pop() || "");
    const city = toTitle(slug);
    if (!city) return;

    const p = new URLSearchParams(qs?.toString() || "");
    const days = p.get("days");
    const interests = p.get("interests");
    const pace = p.get("pace");
    const budget_level = p.get("budget_level");
    const sc = p.get("starting_city");

    const overrideBody = {};
    if (days) overrideBody.days = Number(days);
    if (interests) overrideBody.interests = splitCSV(interests);
    if (pace) overrideBody.pace = pace;
    if (budget_level) overrideBody.budget_level = budget_level;
    if (sc) overrideBody.starting_city = toTitle(sc);

    (async () => {
      try {
        setLoading(true);
        setErr("");
        setData(null);

        const body = {
          starting_city: overrideBody.starting_city || city,
          places: [city],
          ...overrideBody,
        };

        const res = await fetch("/api/itinerary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: ctrl.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          let detail = "";
          try {
            const j = await res.json();
            detail = j?.body || j?.error || JSON.stringify(j);
          } catch {}
          throw new Error(`HTTP ${res.status}${detail ? ` — ${detail}` : ""}`);
        }
        const json = await res.json();
        setData(json);
      } catch (e) {
        const message = e && e.message ? e.message : String(e);
        if (e?.name !== "AbortError") setErr(`Failed to load itinerary: ${message}`);
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [pathname, qs]);

  // cities list
  const cities = useMemo(() => {
    if (!data?.daily_itinerary) return [];
    return Array.from(new Set((data.daily_itinerary || []).map((d) => d.city).filter(Boolean)));
  }, [data]);

  // scrollspy
  useEffect(() => {
    if (!data?.daily_itinerary?.length) return;
    const sections = Array.from(document.querySelectorAll("[data-day-section='true']"));
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) {
          const idx = Number(vis[0].target.getAttribute("data-day-index") || 0);
          setActiveDay(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [data]);

  const heroCity = toTitle(decodeURIComponent((pathname || "").split("/").pop() || ""));

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <NavBarNormal />
      <br/><br/><br/>

      {/* SEARCH BELOW NAVBAR — slight overlap on md+ for depth */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-8 lg:pt-10">
        <div className="-mt-4 sm:-mt-6 lg:-mt-8">
          <div className="rounded-2xl bg-white/95 px-6 py-5 sm:px-8 sm:py-6 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Itinerary
                </p>
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {heroCity}
                </h1>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-50"
                  onClick={() => window.print()}
                >
                  Download / Print
                </button>
              </div>
            </div>

            <div className="mt-4">
              <SearchForm />
              <br/><br/>
            </div>
          </div>
        </div>
      </div>

      {/* STATUS */}
      {loading && (
        <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse rounded-xl border border-dashed border-neutral-300 bg-white px-4 py-3 text-center font-semibold text-neutral-700">
            Fetching itinerary…
          </div>
        </div>
      )}
      {err && (
        <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-center font-semibold text-red-800">
            {err}
          </div>
        </div>
      )}

      {/* MAIN */}
      {data && (
  <main className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
    {/* Stacked: LEFT on top, RIGHT below */}
    <div className="grid grid-cols-1 gap-8"> {/* removed lg:grid-cols-[280px_1fr] */}
      {/* LEFT – now full width, not sticky */}
      <aside className="w-full"> {/* removed h-fit lg:sticky lg:top-24 */}
              <div className="rounded-2xl border border-neutral-200 bg-white/90 p-5 sm:p-6 shadow-sm backdrop-blur">
                <h2 className="text-lg font-bold tracking-tight">Trip overview</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {data?.trip_overview?.summary || `Explore ${heroCity} with a curated plan.`}
                </p>

                {cities.length > 0 && (
                  <>
                    <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Cities
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cities.map((c, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {(data?.cost_expectations || {}).total_range && (
                  <>
                    <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Cost expectations
                    </h3>
                    <ul className="mt-2 divide-y divide-dashed divide-neutral-200 text-sm">
                      {data?.cost_expectations?.total_range && (
                        <li className="flex items-baseline justify-between py-2">
                          <span className="text-neutral-500">Total</span>
                          <b className="font-semibold">{data.cost_expectations.total_range}</b>
                        </li>
                      )}
                      {data?.cost_expectations?.accommodation_range && (
                        <li className="flex items-baseline justify-between py-2">
                          <span className="text-neutral-500">Stay / night</span>
                          <b className="font-semibold">{data.cost_expectations.accommodation_range}</b>
                        </li>
                      )}
                      {data?.cost_expectations?.food_range && (
                        <li className="flex items-baseline justify-between py-2">
                          <span className="text-neutral-500">Food / meal</span>
                          <b className="font-semibold">{data.cost_expectations.food_range}</b>
                        </li>
                      )}
                      {data?.cost_expectations?.transportation_range && (
                        <li className="flex items-baseline justify-between py-2">
                          <span className="text-neutral-500">Transport</span>
                          <b className="font-semibold">{data.cost_expectations.transportation_range}</b>
                        </li>
                      )}
                      {data?.cost_expectations?.attractions_range && (
                        <li className="flex items-baseline justify-between py-2">
                          <span className="text-neutral-500">Attractions</span>
                          <b className="font-semibold">{data.cost_expectations.attractions_range}</b>
                        </li>
                      )}
                    </ul>
                  </>
                )}
              </div>

              {/* day nav */}
              <nav className="mt-6 rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm backdrop-blur">
                <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Days
                </h3>
                <ol className="mt-2 space-y-1">
                  {(data.daily_itinerary || []).map((_, i) => {
                    const isActive = i === activeDay;
                    return (
                      <li key={i}>
                        <button
                          onClick={() => scrollToId(`day-${i + 1}`)}
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition ${
                            isActive
                              ? "bg-amber-50 text-neutral-900 ring-1 ring-amber-200"
                              : "text-neutral-600 hover:bg-neutral-50"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isActive ? "bg-amber-400" : "bg-neutral-300"
                            }`}
                          />
                          Day {i + 1}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </aside>

            {/* RIGHT – days */}
            <section className="space-y-10">
              {(data.daily_itinerary || []).map((day, idx) => (
                <article
                  key={idx}
                  id={`day-${idx + 1}`}
                  data-day-section="true"
                  data-day-index={idx}
                  className="scroll-mt-24 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
                >
                  {/* Cover */}
                  <div
                    className="flex h-48 w-full items-end p-5 text-white sm:h-56 md:h-64"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,.1)), url('${cityImage(
                        day.city
                      )}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div>
                      <div className="inline-flex items-center rounded-full bg-amber-400/95 px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                        Day {idx + 1}
                      </div>
                      <h2 className="mt-2 text-2xl font-extrabold tracking-tight drop-shadow">
                        {day.city}
                      </h2>
                      {day.lodging_suggestions && (
                        <p className="mt-1 text-sm text-white/90">{day.lodging_suggestions}</p>
                      )}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="p-6 sm:p-8">
                    {(day.sections || []).map((sec, sIdx) => (
                      <div
                        key={sIdx}
                        className={`grid grid-cols-[20px_1fr] gap-4 ${sIdx > 0 ? "mt-8 pt-6 border-t border-dashed border-neutral-200" : ""}`}
                      >
                        {/* rail column */}
                        <div className="flex flex-col items-center">
                          <span className="h-3 w-3 rounded-full border-2 border-white bg-amber-400 shadow" />
                          <span className="mt-1 w-px grow bg-neutral-200" />
                        </div>

                        {/* content */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest">
                              {sec.time_of_day}
                            </span>
                            {sec.commute_notes && (
                              <span className="text-sm text-neutral-500">
                                {sec.commute_notes}
                              </span>
                            )}
                          </div>

                          <ul className="mt-3 space-y-3">
                            {(sec.activities || []).map((a, i3) => (
                              <li
                                key={i3}
                                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="text-[15px] font-semibold tracking-tight">
                                    {a.name}
                                  </div>
                                  {a.duration && (
                                    <span className="text-sm text-neutral-500">
                                      {a.duration}
                                    </span>
                                  )}
                                </div>
                                {a.description && (
                                  <p className="mt-1 text-[14px] leading-relaxed text-neutral-600">
                                    {a.description}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* card footer */}
                  <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50/60 p-5 text-sm">
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
                    >
                      ↑ Back to top
                    </button>
                    <button
                      onClick={() => scrollToId(`day-${idx + 2}`)}
                      disabled={idx + 1 >= (data.daily_itinerary || []).length}
                      className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-1.5 font-medium text-white shadow disabled:cursor-not-allowed disabled:bg-neutral-300"
                    >
                      Next day →
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </main>
      )}

      <Foot />
    </div>
  );
}
