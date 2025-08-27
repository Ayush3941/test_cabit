// app/api/itinerary/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_URL = "https://itinerary-planner-api-ocgn.onrender.com/generate_itinerary";

const DEFAULTS = {
  places: ["Mumbai", "Jaipur", "Kashmir"] as string[],
  days: 6,
  interests: ["food", "temples", "photography", "design"] as string[],
  starting_city: "Delhi",
  budget_level: "moderate",
  pace: "balanced",
};

type Payload = {
  places?: string[] | string;
  days?: number | string;
  interests?: string[] | string;
  starting_city?: string;
  budget_level?: string;
  pace?: string;
};

function splitCSV(v: string): string[] {
  return v.split(",").map(s => s.trim()).filter(Boolean);
}

function buildPayload(p: Payload = {}) {
  return {
    places: Array.isArray(p.places)
      ? p.places
      : typeof p.places === "string" ? splitCSV(p.places) : DEFAULTS.places,
    days: typeof p.days === "number" ? p.days : Number(p.days) || DEFAULTS.days,
    interests: Array.isArray(p.interests)
      ? p.interests
      : typeof p.interests === "string" ? splitCSV(p.interests) : DEFAULTS.interests,
    starting_city: p.starting_city ?? DEFAULTS.starting_city,
    budget_level: p.budget_level ?? DEFAULTS.budget_level,
    pace: p.pace ?? DEFAULTS.pace,
  };
}

// GET supports query params (optional)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const qp = Object.fromEntries(url.searchParams.entries());
    const payload = buildPayload(qp as Payload);

    const upstream = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body: text, _resolved_payload: payload },
        { status: upstream.status }
      );
    }
    return NextResponse.json(JSON.parse(text), { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "proxy failed" }, { status: 500 });
  }
}

// POST with JSON body (recommended)
export async function POST(req: Request) {
  try {
    let incoming: Payload | undefined;
    try { incoming = await req.json(); } catch { incoming = undefined; }

    const payload = buildPayload(incoming);

    const upstream = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: upstream.status, body: text, _resolved_payload: payload },
        { status: upstream.status }
      );
    }
    return NextResponse.json(JSON.parse(text), { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "proxy failed" }, { status: 500 });
  }
}
