import React from "react";

const signals = [
  { emoji: "🥉", text: "2nd Runner-Up — 3MTT Lagos Showcase" },
  { emoji: "🏆", text: "#1 Rated for Relevance by Fintech Judges" },
  { emoji: "⚡", text: "Live AI Product — Built & Deployed" },
];

export function TrustBar() {
  return (
    <section
      style={{
        backgroundColor: "#F5F7FF",
        borderTop: "1px solid rgba(148,163,184,0.15)",
        borderBottom: "1px solid rgba(148,163,184,0.15)",
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          flexWrap: "wrap",
        }}
      >
        {signals.map((s, i) => (
          <React.Fragment key={s.text}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 28px",
              }}
            >
              <span style={{ fontSize: "18px" }}>{s.emoji}</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                {s.text}
              </span>
            </div>
            {i < signals.length - 1 && (
              <div
                style={{
                  width: "1px",
                  height: "24px",
                  backgroundColor: "#E2E8F0",
                }}
                className="trust-divider"
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .trust-divider { display: none; }
        }
      `}</style>
    </section>
  );
}
