"use client";

import React from "react";
import { Users, Clock, AlertTriangle } from "lucide-react";

const stats = [
  {
    icon: <Clock style={{ width: "24px", height: "24px", color: "#EF4444" }} />,
    value: "3–5 Days",
    label: "Average verification delay",
    detail:
      "Legitimate businesses wait nearly a week just to prove they exist — before a single transaction.",
  },
  {
    icon: <Users style={{ width: "24px", height: "24px", color: "#F59E0B" }} />,
    value: "30%",
    label: "Customer dropout rate",
    detail:
      "3 in 10 applicants abandon onboarding entirely — not because they failed, but because they got tired of waiting.",
  },
  {
    icon: <AlertTriangle style={{ width: "24px", height: "24px", color: "#EF4444" }} />,
    value: "Rising",
    label: "Document fraud incidents",
    detail:
      "Manual reviewers can't keep up. Fraudsters exploit slow systems while compliance teams drown in paperwork.",
  },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      style={{
        background: "linear-gradient(180deg, #EDF0FA 0%, #F0F4FF 100%)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Label */}
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: "#EF4444",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          The Problem
        </p>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.8px",
            margin: "0 0 24px",
            maxWidth: "640px",
            lineHeight: 1.15,
          }}
        >
          The 72-Hour Delay Is Costing You Real Customers
        </h2>

        <p
          style={{
            fontSize: "17px",
            color: "#64748B",
            lineHeight: 1.7,
            maxWidth: "580px",
            margin: "0 0 64px",
          }}
        >
          Every day, legitimate businesses are forced to wait 3–5 days just to
          prove they exist. Verification was meant to build trust. Instead,
          it&rsquo;s slowing growth.
        </p>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "28px",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 24px rgba(15,23,42,0.08)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ marginBottom: "16px" }}>{stat.icon}</div>
              <p
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#0F172A",
                  margin: "0 0 4px",
                  letterSpacing: "-1px",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#64748B",
                  margin: "0 0 12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </p>
              <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px 32px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderLeft: "4px solid #EF4444",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontSize: "16px", color: "#0F172A", margin: 0, lineHeight: 1.7 }}>
            While they wait:{" "}
            <strong>compliance teams drown in manual reviews</strong>,{" "}
            <strong>fraudsters exploit slow systems</strong>, and the people
            who built real businesses walk away empty-handed.
          </p>
        </div>
      </div>
    </section>
  );
}
