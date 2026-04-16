"use client";

import { CheckCircle2, FileText, LayoutDashboard, ShieldCheck } from "lucide-react";

export function ProductPreviewSection() {
  return (
    <section id="product" className="lp-section" style={{ background: "#0F172A" }}>
      <div className="lp-container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="lp-label" style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E", borderColor: "rgba(34,197,94,0.3)" }}>
            Live Product
          </span>
          <h2 className="lp-h2" style={{ color: "#F8F9FB", marginTop: "1rem" }}>
            See It in Action
          </h2>
          <p className="lp-sub" style={{ color: "#94A3B8" }}>
            Real outputs from InstaVerify-AI — no demos, no fluff.
          </p>
        </div>

        <div className="lp-preview-grid">
          {/* Card 1 — Verified Result */}
          <div className="lp-preview-card">
            <div className="lp-preview-card-header" style={{ background: "rgba(34,197,94,0.08)", borderBottom: "1px solid rgba(34,197,94,0.15)" }}>
              <ShieldCheck size={16} color="#22C55E" />
              <span style={{ color: "#22C55E", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>VERIFICATION RESULT</span>
            </div>
            <div className="lp-preview-card-body">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={22} color="#22C55E" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#F8F9FB", fontSize: "1rem" }}>Document Verified</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Confidence: 97.4%</div>
                </div>
                <span style={{ marginLeft: "auto", background: "#22C55E", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 99, letterSpacing: "0.05em" }}>
                  GENUINE
                </span>
              </div>

              {[
                { label: "Document Type", value: "CAC Certificate (Post-2020)" },
                { label: "Business Name", value: "Zenith Logistics Ltd" },
                { label: "RC Number", value: "RC-1024857 ✓ Match" },
                { label: "Forgery Detection", value: "No Anomalies Found" },
                { label: "Processing Time", value: "44 seconds" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid rgba(226,232,240,0.08)", fontSize: "0.8rem" }}>
                  <span style={{ color: "#64748B" }}>{row.label}</span>
                  <span style={{ color: "#CBD5E1", fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Dashboard Snapshot */}
          <div className="lp-preview-card">
            <div className="lp-preview-card-header" style={{ background: "rgba(99,102,241,0.08)", borderBottom: "1px solid rgba(99,102,241,0.15)" }}>
              <LayoutDashboard size={16} color="#818CF8" />
              <span style={{ color: "#818CF8", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>OPERATOR DASHBOARD</span>
            </div>
            <div className="lp-preview-card-body">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem" }}>
                <thead>
                  <tr>
                    {["Business", "Type", "Status", "Time"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "0.4rem 0.5rem", color: "#64748B", fontWeight: 600, borderBottom: "1px solid rgba(226,232,240,0.1)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { b: "Apex Microfinance", t: "CAC", s: "Verified", sc: "#22C55E", time: "44s" },
                    { b: "NovaStar Tech Ltd", t: "Utility", s: "Verified", sc: "#22C55E", time: "51s" },
                    { b: "Goldbridge Capital", t: "CAC", s: "Flagged", sc: "#F59E0B", time: "38s" },
                    { b: "SunPath Logistics", t: "Utility", s: "Verified", sc: "#22C55E", time: "59s" },
                    { b: "Redline Imports", t: "CAC", s: "Rejected", sc: "#EF4444", time: "22s" },
                  ].map((r) => (
                    <tr key={r.b}>
                      <td style={{ padding: "0.55rem 0.5rem", color: "#CBD5E1" }}>{r.b}</td>
                      <td style={{ padding: "0.55rem 0.5rem", color: "#94A3B8" }}>{r.t}</td>
                      <td style={{ padding: "0.55rem 0.5rem" }}>
                        <span style={{ color: r.sc, fontWeight: 600, fontSize: "0.7rem" }}>{r.s}</span>
                      </td>
                      <td style={{ padding: "0.55rem 0.5rem", color: "#64748B" }}>{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 3 — Audit Report */}
          <div className="lp-preview-card">
            <div className="lp-preview-card-header" style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.15)" }}>
              <FileText size={16} color="#F59E0B" />
              <span style={{ color: "#F59E0B", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>AUDIT REPORT — UTILITY BILL</span>
            </div>
            <div className="lp-preview-card-body">
              <div style={{ fontSize: "0.8rem", color: "#94A3B8", marginBottom: "0.75rem" }}>Math Integrity Audit</div>
              {[
                { label: "Units Consumed", value: "287 kWh", ok: true },
                { label: "Rate per Unit", value: "₦68.00", ok: true },
                { label: "Energy Charge", value: "₦19,516", ok: true },
                { label: "VAT (7.5%)", value: "₦1,463.70", ok: true },
                { label: "Total on Document", value: "₦20,979.70", ok: true },
                { label: "AI Calculated Total", value: "₦20,979.70", ok: true },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.45rem 0", borderBottom: "1px solid rgba(226,232,240,0.08)", fontSize: "0.78rem" }}>
                  <span style={{ color: "#64748B" }}>{row.label}</span>
                  <span style={{ color: "#CBD5E1", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    {row.value}
                    {row.ok && <span style={{ color: "#22C55E", fontSize: "0.65rem" }}>✓</span>}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: "1rem", padding: "0.6rem 0.75rem", background: "rgba(34,197,94,0.08)", borderRadius: 8, border: "1px solid rgba(34,197,94,0.2)", textAlign: "center", color: "#22C55E", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                ✓ ARITHMETIC VERIFIED — NO DISCREPANCY
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .lp-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .lp-preview-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(226,232,240,0.1);
          border-radius: 14px;
          overflow: hidden;
        }
        .lp-preview-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
        }
        .lp-preview-card-body {
          padding: 1.25rem;
        }
        @media (max-width: 900px) {
          .lp-preview-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
