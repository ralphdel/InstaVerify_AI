"use client";

import { Building2, Landmark, CreditCard, Shield } from "lucide-react";

const cases = [
  {
    icon: <CreditCard size={24} color="#22C55E" />,
    title: "Fintech Platforms",
    description:
      "Accelerate KYB onboarding by verifying CAC certificates and utility bills in seconds — not days. Reduce dropout and increase conversion.",
    tag: "KYB Automation",
  },
  {
    icon: <Landmark size={24} color="#22C55E" />,
    title: "Microfinance Banks",
    description:
      "Detect forged supporting documents before disbursing loans. Protect your MFB from fraudulent business entity registrations.",
    tag: "Fraud Prevention",
  },
  {
    icon: <Building2 size={24} color="#22C55E" />,
    title: "Lending Platforms",
    description:
      "Verify utility bill arithmetic and cross-reference merchant names and addresses with AI precision before approving credit lines.",
    tag: "Credit Risk",
  },
  {
    icon: <Shield size={24} color="#22C55E" />,
    title: "Compliance Teams",
    description:
      "Generate instant audit-ready PDF reports for every verification. Stay audit-compliant with a full, timestamped evidence trail.",
    tag: "Audit Trail",
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" style={{ background: "linear-gradient(180deg, #F5F7FF 0%, #EEF1FA 100%)", padding: "96px 24px" }}>
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
            Who It&apos;s For
          </span>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.8px",
              margin: "0 0 12px",
            }}
          >
            Built for Nigerian Financial Services
          </h2>
          <p style={{ color: "#64748B", fontSize: "16px", maxWidth: "520px", margin: "0 auto" }}>
            Every team that touches business document verification can save time, cut fraud, and stay compliant.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {cases.map((c) => (
            <div
              key={c.title}
              style={{
                background: "#F8F9FB",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "28px 24px",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  background: "rgba(34,197,94,0.08)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                {c.icon}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#22C55E",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {c.tag}
              </div>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#0F172A",
                  margin: "0 0 10px",
                  letterSpacing: "-0.3px",
                }}
              >
                {c.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
