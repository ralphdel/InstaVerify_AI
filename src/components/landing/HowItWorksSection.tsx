import React from "react";
import { Upload, ScanSearch, GitCompareArrows, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Upload style={{ width: "24px", height: "24px", color: "#0F172A" }} />,
    title: "Upload Document",
    desc: "CAC Certificate or Utility Bill. PDF or image — any format accepted.",
  },
  {
    number: "02",
    icon: <ScanSearch style={{ width: "24px", height: "24px", color: "#0F172A" }} />,
    title: "AI Forensic Scan",
    desc: "Detects tampering, font inconsistencies, seal misalignment, and pixel manipulation.",
  },
  {
    number: "03",
    icon: <GitCompareArrows style={{ width: "24px", height: "24px", color: "#0F172A" }} />,
    title: "Cross-Validation",
    desc: "Checks registry data, recalculates bill mathematics, and confirms identity match.",
  },
  {
    number: "04",
    icon: <CheckCircle2 style={{ width: "24px", height: "24px", color: "#22C55E" }} />,
    title: "Instant Verdict",
    desc: "Verified. Flagged. Or Conditional Approval — with a full downloadable audit report.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{
        background: "linear-gradient(180deg, #EEF1FA 0%, #F0F4FF 100%)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: "#64748B",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Process
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.8px",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            From Upload to Verified — In Seconds
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0",
            position: "relative",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              style={{
                position: "relative",
                padding: "0 20px 40px",
                textAlign: "center",
              }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "32px",
                    right: "-1px",
                    width: "50%",
                    height: "1px",
                    backgroundColor: "#E2E8F0",
                    zIndex: 0,
                  }}
                  className="step-connector"
                />
              )}
              {i > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "32px",
                    left: "-1px",
                    width: "50%",
                    height: "1px",
                    backgroundColor: "#E2E8F0",
                    zIndex: 0,
                  }}
                  className="step-connector"
                />
              )}

              {/* Step number + icon */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                  }}
                >
                  {step.icon}
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#94A3B8",
                    letterSpacing: "1px",
                  }}
                >
                  STEP {step.number}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#0F172A",
                  margin: "0 0 10px",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.65, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .step-connector { display: none; }
        }
      `}</style>
    </section>
  );
}
