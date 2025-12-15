export default function Pricing() {
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h1 style={{ fontSize: 40, margin: 0 }}>CreatorRate Pro</h1>
      <p style={{ marginTop: 10, color: "#555", lineHeight: 1.5 }}>
        Free gives you the calculator and a copyable quote.
        Pro unlocks saving quotes, share links, and a lightweight deal tracker.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Free</h2>
          <ul style={{ color: "#444", lineHeight: 1.7 }}>
            <li>Rate calculator</li>
            <li>3-option quote generator</li>
            <li>Copy + email quote</li>
          </ul>
          <p style={{ fontWeight: 700, fontSize: 18 }}>$0</p>
        </div>

        <div style={{ border: "2px solid #111", borderRadius: 16, padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Pro</h2>
          <ul style={{ color: "#444", lineHeight: 1.7 }}>
            <li>Save quotes</li>
            <li>Shareable quote links</li>
            <li>Deal tracker (clients, due dates, status)</li>
            <li>Quote history</li>
          </ul>
          <p style={{ fontWeight: 800, fontSize: 18 }}>$9 / month</p>
          <button
            disabled
            style={{
              marginTop: 8,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "#f3f3f3",
              cursor: "not-allowed",
              fontWeight: 700,
            }}
          >
            Coming next: Checkout
          </button>
          <p style={{ marginTop: 8, color: "#666", fontSize: 12 }}>
            We’ll wire payments + unlocks in the next step.
          </p>
        </div>
      </div>

      <p style={{ marginTop: 18, color: "#666", fontSize: 12 }}>
        Note: This tool provides guidance, not a guarantee. Adjust rates based on your niche, performance, and brand requirements.
      </p>
    </main>
  );
}
