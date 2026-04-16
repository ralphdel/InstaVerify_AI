"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Features", href: "#solution" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "Comparison", href: "#comparison" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Upload Document", href: "/upload" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "3MTT Lagos Showcase", href: "#traction" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "mailto:hello@instaverify.ai" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer style={{ backgroundColor: "#0F172A", borderTop: "1px solid rgba(226,232,240,0.08)", padding: "64px 24px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Top Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "48px",
            justifyContent: "space-between",
            marginBottom: "56px",
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: "280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  background: "rgba(34,197,94,0.12)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShieldCheck size={18} color="#22C55E" />
              </div>
              <span style={{ fontWeight: 700, fontSize: "16px", color: "#F8F9FB", letterSpacing: "-0.3px" }}>
                InstaVerify-AI
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.7, margin: "0 0 12px" }}>
              AI-powered document verification for Nigerian fintech. CAC certificates and utility bills — verified in under 60 seconds.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "20px",
                padding: "4px 12px",
              }}
            >
              <span style={{ width: 6, height: 6, background: "#22C55E", borderRadius: "50%", display: "inline-block" }} />
              <span style={{ fontSize: "11px", color: "#22C55E", fontWeight: 600 }}>Live MVP — No Demo Mode</span>
            </div>
          </div>

          {/* Link Columns */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#475569",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {col.heading}
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{ fontSize: "13px", color: "#64748B", textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#CBD5E1")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            borderTop: "1px solid rgba(226,232,240,0.08)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "12px", color: "#475569" }}>
            © {new Date().getFullYear()} InstaVerify-AI. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "#475569" }}>
            Built by{" "}
            <span style={{ color: "#94A3B8", fontWeight: 500 }}>Ayodele Rapheal Ojo</span>
            {" "}· Lagos, Nigeria 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
}
