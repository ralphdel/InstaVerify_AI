const testimonials = [
  {
    quote:
      "InstaVerify-AI cut our document review time from 3 days to under a minute. Our fraud rejection rate went up, and our onboarding conversion improved significantly. This is exactly what Nigerian fintech needs.",
    name: "Chidi Okonkwo",
    role: "Head of Compliance",
    company: "Apex Financial Services",
    initials: "CO",
    color: "#0F172A",
  },
  {
    quote:
      "We used to have a manual analyst reviewing utility bills for arithmetic errors. Now the AI catches discrepancies before the file even reaches a human. The math audit alone is worth everything.",
    name: "Adaeze Nwosu",
    role: "Loan Operations Manager",
    company: "Sunrise Microfinance Bank",
    initials: "AN",
    color: "#1D4ED8",
  },
  {
    quote:
      "As a startup founder doing KYB on third-party businesses, InstaVerify-AI gave us the confidence to onboard faster without hiring a compliance officer. The CAC certificate check is remarkably accurate.",
    name: "Emeka Adeyemi",
    role: "Co-Founder & CEO",
    company: "NovaPay Technologies",
    initials: "EA",
    color: "#15803D",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: "linear-gradient(180deg, #F0F4FF 0%, #EEF1FA 100%)", padding: "96px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#64748B",
              textTransform: "uppercase",
              background: "#F1F5F9",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "5px 14px",
              marginBottom: "16px",
            }}
          >
            Testimonials
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.8px",
              margin: 0,
            }}
          >
            Trusted by Compliance Professionals
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "4px" }}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} style={{ color: "#F59E0B", fontSize: "14px" }}>
                      ★
                    </span>
                  ))}
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "#334155",
                  lineHeight: 1.7,
                  margin: 0,
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #F1F5F9", paddingTop: "16px" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: t.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#0F172A" }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748B" }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
