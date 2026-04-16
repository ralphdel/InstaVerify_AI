"use client";

const badges = [
  {
    emoji: "🥉",
    title: "2nd Runner-Up",
    subtitle: "3MTT AI Showcase — Lagos",
  },
  {
    emoji: "🏆",
    title: "#1 Most Relevant",
    subtitle: "Fintech Problem Statement Track",
  },
  {
    emoji: "⚡",
    title: "Live MVP",
    subtitle: "Fully functional product — not a prototype",
  },
  {
    emoji: "🛠",
    title: "Built in 7 Days",
    subtitle: "From zero to verified in one week",
  },
];

export function TractionSection() {
  return (
    <section
      id="traction"
      style={{ backgroundColor: "#0F172A", padding: "80px 24px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#94A3B8",
              textTransform: "uppercase",
              border: "1px solid rgba(226,232,240,0.15)",
              borderRadius: "20px",
              padding: "5px 14px",
              marginBottom: "16px",
            }}
          >
            Validated
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              color: "#F8F9FB",
              letterSpacing: "-0.8px",
              margin: "0 0 10px",
            }}
          >
            Built, Shipped & Recognised
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "15px", maxWidth: "460px", margin: "0 auto" }}>
            Real validation from Nigeria&apos;s most competitive AI product showcase.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {badges.map((b) => (
            <div
              key={b.title}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(226,232,240,0.1)",
                borderRadius: "14px",
                padding: "28px 20px",
                textAlign: "center",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,197,94,0.35)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(226,232,240,0.1)")
              }
            >
              <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>{b.emoji}</div>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#F8F9FB",
                  marginBottom: "6px",
                  letterSpacing: "-0.3px",
                }}
              >
                {b.title}
              </div>
              <div style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.5 }}>{b.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
