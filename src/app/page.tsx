"use client";

import { useMemo, useState } from "react";

type Engagement = "Low" | "Medium" | "High";
type Effort = "Simple" | "Medium" | "High";
type Usage = "None" | "Organic Repost" | "Paid Usage 30d" | "Paid Usage 90d" | "Whitelisting";
type Exclusivity = "None" | "Category 30d" | "Category 90d" | "Competitor 90d";
type Rush = "No" | "72h" | "48h" | "24h";

const mult = {
  engagement: { Low: 0.9, Medium: 1.0, High: 1.15 } as const,
  effort: { Simple: 0.9, Medium: 1.0, High: 1.25 } as const,
  usage: {
    None: 1.0,
    "Organic Repost": 1.2,
    "Paid Usage 30d": 1.5,
    "Paid Usage 90d": 2.0,
    Whitelisting: 2.5,
  } as const,
  exclusivity: {
    None: 1.0,
    "Category 30d": 1.25,
    "Category 90d": 1.6,
    "Competitor 90d": 2.0,
  } as const,
  rush: { No: 1.0, "72h": 1.2, "48h": 1.35, "24h": 1.6 } as const,
};

function clampNum(v: number, min: number, max: number) {
  if (Number.isNaN(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function money(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function Home() {
  const [deliverable, setDeliverable] = useState("TikTok / Reel");
  const [avgViews, setAvgViews] = useState<number>(25000);
  const [baseCPM, setBaseCPM] = useState<number>(25);
  const [engagement, setEngagement] = useState<Engagement>("Medium");
  const [effort, setEffort] = useState<Effort>("Medium");
  const [usage, setUsage] = useState<Usage>("None");
  const [exclusivity, setExclusivity] = useState<Exclusivity>("None");
  const [rush, setRush] = useState<Rush>("No");

  const calc = useMemo(() => {
    const v = clampNum(avgViews, 0, 1_000_000_000);
    const cpm = clampNum(baseCPM, 1, 10_000);

    const base = (v / 1000) * cpm;
    const target =
      base *
      mult.engagement[engagement] *
      mult.effort[effort] *
      mult.usage[usage] *
      mult.exclusivity[exclusivity] *
      mult.rush[rush];

    const floor = target * 0.8;
    const anchor = target * 1.25;

    const quote = `Here are 3 options for ${deliverable}:

Option 1 (Lean): ${money(floor)}
Option 2 (Recommended): ${money(target)}
Option 3 (Premium): ${money(anchor)}

If you share budget + usage/exclusivity requirements, I can tailor the package.`;

    return { base, floor, target, anchor, quote };
  }, [avgViews, baseCPM, engagement, effort, usage, exclusivity, rush, deliverable]);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h1 style={{ fontSize: 40, margin: 0 }}>CreatorRate</h1>
      <p style={{ marginTop: 8, color: "#555" }}>
        Calculate a sponsorship quote in 30 seconds. Pro (next) will save quotes + track deals.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Deliverable</span>
          <input
            value={deliverable}
            onChange={(e) => setDeliverable(e.target.value)}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Avg Views (or Opens)</span>
          <input
            type="number"
            value={avgViews}
            onChange={(e) => setAvgViews(Number(e.target.value))}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Base CPM</span>
          <input
            type="number"
            value={baseCPM}
            onChange={(e) => setBaseCPM(Number(e.target.value))}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Engagement</span>
          <select
            value={engagement}
            onChange={(e) => setEngagement(e.target.value as Engagement)}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Effort</span>
          <select
            value={effort}
            onChange={(e) => setEffort(e.target.value as Effort)}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
          >
            <option>Simple</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Usage Rights</span>
          <select
            value={usage}
            onChange={(e) => setUsage(e.target.value as Usage)}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
          >
            <option>None</option>
            <option>Organic Repost</option>
            <option>Paid Usage 30d</option>
            <option>Paid Usage 90d</option>
            <option>Whitelisting</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Exclusivity</span>
          <select
            value={exclusivity}
            onChange={(e) => setExclusivity(e.target.value as Exclusivity)}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
          >
            <option>None</option>
            <option>Category 30d</option>
            <option>Category 90d</option>
            <option>Competitor 90d</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Rush</span>
          <select
            value={rush}
            onChange={(e) => setRush(e.target.value as Rush)}
            style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
          >
            <option>No</option>
            <option>72h</option>
            <option>48h</option>
            <option>24h</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: 18, padding: 16, border: "1px solid #ddd", borderRadius: 16 }}>
        <h2 style={{ marginTop: 0 }}>Your Quote</h2>
        <p style={{ margin: "8px 0" }}>
          Floor: <b>{money(calc.floor)}</b> | Target: <b>{money(calc.target)}</b> | Anchor: <b>{money(calc.anchor)}</b>
        </p>
        <p style={{ margin: "0 0 10px 0", color: "#666", fontSize: 12 }}>
          Base (views/1000 × CPM): {money(calc.base)}
        </p>
       <textarea
  readOnly
  value={calc.quote}
  style={{ width: "100%", minHeight: 160, padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
/>

<div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
  <button
    onClick={async () => {
      await navigator.clipboard.writeText(calc.quote);
      alert("Quote copied ✅");
    }}
    style={{
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid #ddd",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    Copy Quote
  </button>

  <button
    onClick={() => {
      const subject = encodeURIComponent("Sponsorship options");
      const body = encodeURIComponent(calc.quote);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }}
    style={{
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid #ddd",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    Email Quote
  </button>
</div>

        <p style={{ marginTop: 10, color: "#666", fontSize: 12 }}>
          Next: add Pro features (save quotes, share links, deal tracker).
        </p>
      </div>
    </main>
  );
}
