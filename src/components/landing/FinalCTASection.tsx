"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
    <section
      id="demo"
      style={{
        backgroundColor: "#0F172A",
        padding: "96px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
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
            marginBottom: "24px",
          }}
        >
          Get Started
        </span>

        <h2
          style={{
            fontSize: "clamp(30px, 5vw, 48px)",
            fontWeight: 900,
            color: "#F8F9FB",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            margin: "0 0 20px",
          }}
        >
          Stop Waiting.{" "}
          <span style={{ color: "#22C55E" }}>Start Verifying.</span>
        </h2>

        <p
          style={{
            fontSize: "17px",
            color: "#94A3B8",
            lineHeight: 1.65,
            margin: "0 0 40px",
          }}
        >
          Your competitors are still reviewing documents manually. Get InstaVerify-AI working for your team today.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/login"
            id="final-cta-start"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#22C55E",
              color: "#0F172A",
              fontSize: "15px",
              fontWeight: 700,
              padding: "14px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#22C55E")}
          >
            Start Verifying Now <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            id="final-cta-dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "transparent",
              color: "#CBD5E1",
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid rgba(226,232,240,0.2)",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(226,232,240,0.5)";
              e.currentTarget.style.color = "#F8F9FB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(226,232,240,0.2)";
              e.currentTarget.style.color = "#CBD5E1";
            }}
          >
            View Dashboard
          </Link>
        </div>

        <p style={{ marginTop: "28px", fontSize: "13px", color: "#475569" }}>
          No credit card required · Nigerian documents supported · Results in under 60s
        </p>
      </div>
    </section>
  );
}
