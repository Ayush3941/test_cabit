// app/api/translate/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, from, to } = await req.json();
    if (!text || !from || !to) {
      return NextResponse.json({ error: "Missing text/from/to" }, { status: 400 });
    }
    const source = String(from).split("-")[0];
    const target = String(to).split("-")[0];

    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", text);
    url.searchParams.set("langpair", `${source}|${target}`);

    const upstream = await fetch(url.toString(), { cache: "no-store" });
    const json = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json({ error: "Upstream error", detail: json }, { status: upstream.status });
    }

    return NextResponse.json({ translated: json?.responseData?.translatedText || "" });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || "proxy failed" }, { status: 500 });
  }
}
