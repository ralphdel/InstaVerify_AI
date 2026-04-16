"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";

const VerificationCard = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const steps = [0, 1, 2, 3];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % steps.length;
      setStep(i);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const statusMessages = [
    { text: "Document uploaded...", icon: <Clock style={{ width: "14px", height: "14px", color: "#F59E0B" }} />, color: "#F59E0B" },
    { text: "Running AI forensic scan...", icon: <Clock style={{ width: "14px", height: "14px", color: "#F59E0B" }} />, color: "#F59E0B" },
    { text: "Cross-validating CAC registry...", icon: <Clock style={{ width: "14px", height: "14px", color: "#F59E0B" }} />, color: "#F59E0B" },
    { text: "Verified — No anomalies detected", icon: <CheckCircle2 style={{ width: "14px", height: "14px", color: "#22C55E" }} />, color: "#22C55E" },
  ];

  const current = statusMessages[step];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
        maxWidth: "380px",
        width: "100%",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", backgroundColor: "#F1F5F9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck style={{ width: "18px", height: "18px", color: "#0F172A" }} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>CAC Verification</p>
            <p style={{ margin: 0, fontSize: "11px", color: "#64748B" }}>Acme Holdings Ltd.</p>
          </div>
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "20px",
            backgroundColor: step === 3 ? "#dcfce7" : "#fef9c3",
            color: step === 3 ? "#16a34a" : "#a16207",
            transition: "all 0.3s ease",
          }}
        >
          {step === 3 ? "VERIFIED" : "SCANNING"}
        </span>
      </div>

      {/* Forensic checks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        {[
          { label: "Font Consistency", done: step >= 1 },
          { label: "Seal Alignment", done: step >= 2 },
          { label: "CAC Registry Match", done: step >= 3 },
        ].map((check) => (
          <div key={check.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", color: "#64748B" }}>{check.label}</span>
            {check.done ? (
              <CheckCircle2 style={{ width: "16px", height: "16px", color: "#22C55E" }} />
            ) : (
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #E2E8F0" }} />
            )}
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          backgroundColor: "#F8F9FB",
          borderRadius: "8px",
          border: "1px solid #E2E8F0",
          transition: "all 0.3s ease",
        }}
      >
        {current.icon}
        <span style={{ fontSize: "12px", color: current.color, fontWeight: 500, transition: "all 0.3s ease" }}>
          {current.text}
        </span>
      </div>

      <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
        <div
          style={{
            height: "4px",
            flex: 1,
            backgroundColor: "#E2E8F0",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min((step / 3) * 100, 100)}%`,
              backgroundColor: step === 3 ? "#22C55E" : "#0F172A",
              borderRadius: "2px",
              transition: "width 0.8s ease, background-color 0.3s ease",
            }}
          />
        </div>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748B", minWidth: "30px" }}>
          {step === 3 ? "✓" : `${Math.round((step / 3) * 100)}%`}
        </span>
      </div>
    </div>
  );
};

export function HeroSection() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #F0F4FF 0%, #E8EDF5 40%, #F0F4FA 100%)",
        padding: "80px 24px 72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: "absolute",
        top: "-120px",
        right: "-80px",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-100px",
        left: "-60px",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "64px",
          flexWrap: "wrap",
        }}
      >
        {/* Left: Copy */}
        <div style={{ flex: "1 1 480px", minWidth: "280px" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "6px 14px",
              marginBottom: "28px",
            }}
          >
            <span style={{ fontSize: "16px" }}>🥉</span>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A" }}>
              Top 3 — 3MTT Lagos Showcase
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              margin: "0 0 24px",
            }}
          >
            Verify Business Documents in Under 60 Seconds —{" "}
            <span style={{ color: "#22C55E" }}>Not 3 Days</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#64748B",
              lineHeight: 1.65,
              margin: "0 0 16px",
              maxWidth: "520px",
            }}
          >
            AI-powered forensic verification for CAC Certificates and Utility
            Bills — detect fraud instantly and onboard legitimate businesses
            faster.
          </p>

          <p
            style={{
              fontSize: "14px",
              color: "#64748B",
              margin: "0 0 36px",
              fontStyle: "italic",
            }}
          >
            Trusted by fintech builders. Validated as a Top 3 product at the
            Lagos 3MTT Showcase.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/login"
              id="hero-start-verifying"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E293B")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0F172A")}
            >
              Start Verifying <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
            <Link
              href="/login"
              id="hero-view-dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255,255,255,0.85)",
                color: "#0F172A",
                fontSize: "15px",
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                border: "1px solid rgba(148,163,184,0.3)",
                transition: "border-color 0.15s, background-color 0.15s",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#94A3B8";
                e.currentTarget.style.backgroundColor = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(148,163,184,0.3)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.85)";
              }}
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Right: Animated Card */}
        <div
          style={{
            flex: "1 1 340px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VerificationCard />
        </div>
      </div>
    </section>
  );
}
