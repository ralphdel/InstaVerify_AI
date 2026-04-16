"use client";

import React from "react";
import { ScanSearch, Calculator, Building2, FileCheck } from "lucide-react";

const features = [
  {
    icon: <ScanSearch style={{ width: "22px", height: "22px", color: "#0F172A" }} />,
    title: "Detect Forgery at the Source",
    desc: "Identify font inconsistencies, seal misalignment, and digital manipulation — before a human ever opens the file.",
  },
  {
    icon: <Calculator style={{ width: "22px", height: "22px", color: "#0F172A" }} />,
    title: "Validate Utility Bills with Logic",
    desc: "Independently recalculate electricity bills — meter readings, tariff rates, VAT — to catch hidden fraud that passes visual inspection.",
  },
  {
    icon: <Building2 style={{ width: "22px", height: "22px", color: "#0F172A" }} />,
    title: "Confirm CAC Records in Real-Time",
    desc: "Verify RC numbers and business identity against live registry data. Confirm documents belong to the right entity.",
  },
  {
    icon: <FileCheck style={{ width: "22px", height: "22px", color: "#0F172A" }} />,
    title: "Work Across All Document Eras",
    desc: "From typewritten 1970 certificates to modern digital CAC formats — our Multi-Era OCR handles every generation.",
  },
];

export function SolutionSection() {
  return (
    <section
      id="solution"
      style={{
        background: "linear-gradient(180deg, #F5F7FF 0%, #EEF1FA 100%)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ maxWidth: "680px", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: "#22C55E",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            The Solution
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.8px",
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}
          >
            Instant Verification. Built for African Fintech.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#64748B",
              lineHeight: 1.7,
              margin: "0 0 20px",
            }}
          >
            InstaVerify-AI replaces slow manual checks with an intelligent
            verification engine that analyzes documents in seconds — not days.
          </p>
          {/* Pipeline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {["Upload a document.", "Let AI do the work.", "Get a clear, auditable result instantly."].map(
              (step, i) => (
                <React.Fragment key={step}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0F172A",
                      backgroundColor: "#F1F5F9",
                      padding: "6px 14px",
                      borderRadius: "20px",
                    }}
                  >
                    {step}
                  </span>
                  {i < 2 && (
                    <span style={{ color: "#64748B", fontSize: "14px" }}>→</span>
                  )}
                </React.Fragment>
              )
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                backgroundColor: "#F8F9FB",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "28px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#94A3B8";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(15,23,42,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E8F0";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#0F172A",
                  margin: "0 0 10px",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.65, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
