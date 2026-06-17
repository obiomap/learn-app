import { NextRequest, NextResponse } from "next/server";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL ?? "http://127.0.0.1:8001";

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query?.trim()) {
    return NextResponse.json({ recommendations: [] });
  }

  try {
    const res = await fetch(`${ML_SERVICE_URL}/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k: 3 }),
    });
    if (!res.ok) throw new Error(`ML service returned ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Recommender unavailable" }, { status: 503 });
  }
}
