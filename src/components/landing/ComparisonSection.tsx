import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

const rows = [
  { feature: "Document-level forensics", traditional: false, instaverify: true },
  { feature: "Forgery & tamper detection", traditional: false, instaverify: true },
  { feature: "Utility bill arithmetic audit", traditional: false, instaverify: true },
  { feature: "Nigerian CAC registry cross-check", traditional: "partial", instaverify: true },
  { feature: "Pre-2010 CAC certificate support", traditional: false, instaverify: true },
  { feature: "Full audit trail & PDF report", traditional: "partial", instaverify: true },
  { feature: "Sub-60s turnaround", traditional: false, instaverify: true },
  { feature: "No manual reviewer needed", traditional: false, instaverify: true },
];

const Tick = ({ val }: { val: boolean | string }) => {
  if (val === true)
    return <CheckCircle2 size={19} color="#22C55E" style={{ margin: "0 auto" }} />;
  if (val === "partial")
    return <MinusCircle size={19} color="#F59E0B" style={{ margin: "0 auto" }} />;
  return <XCircle size={19} color="#EF4444" style={{ margin: "0 auto" }} />;
};

export function ComparisonSection() {
  return (
    <section id="comparison" style={{ background: "linear-gradient(180deg, #EEF1FA 0%, #F0F4FF 100%)", padding: "96px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
            Why InstaVerify-AI
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
            How We Compare
          </h2>
          <p style={{ color: "#64748B", fontSize: "16px", maxWidth: "520px", margin: "0 auto" }}>
            Traditional compliance tools were not built for modern Nigerian fintech onboarding.
          </p>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div
          className="comparison-table"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            overflow: "hidden",
            minWidth: "540px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 180px 180px",
              backgroundColor: "#F8F9FB",
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            <div style={{ padding: "14px 24px", color: "#64748B", fontSize: "13px", fontWeight: 600 }}>Feature</div>
            <div style={{ padding: "14px 12px", textAlign: "center", color: "#64748B", fontSize: "13px", fontWeight: 600 }}>
              Traditional Tools
            </div>
            <div
              style={{
                padding: "14px 12px",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: 700,
                color: "#0F172A",
                background: "#F0FDF4",
                borderLeft: "2px solid #22C55E",
              }}
            >
              InstaVerify-AI
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 180px 180px",
                borderBottom: i < rows.length - 1 ? "1px solid #F1F5F9" : "none",
              }}
            >
              <div style={{ padding: "14px 24px", fontSize: "14px", color: "#334155", fontWeight: 500 }}>{row.feature}</div>
              <div style={{ padding: "14px 12px", textAlign: "center" }}>
                <Tick val={row.traditional} />
              </div>
              <div
                style={{
                  padding: "14px 12px",
                  textAlign: "center",
                  background: "#F0FDF4",
                  borderLeft: "2px solid #22C55E",
                }}
              >
                <Tick val={row.instaverify} />
              </div>
            </div>
          ))}
        </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#94A3B8", marginTop: "16px" }}>
          <MinusCircle size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px", color: "#F59E0B" }} />
          Partial = limited / manual workaround required
        </p>
      </div>
    </section>
  );
}
