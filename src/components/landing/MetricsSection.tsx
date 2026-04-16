"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, suffix: string, duration = 1800) {
  const [display, setDisplay] = useState("0");
  const frameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startRef = useRef<number | null>(null);
  const observedRef = useRef(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !observedRef.current) {
          observedRef.current = true;
          const animate = (ts: number) => {
            if (!startRef.current) startRef.current = ts;
            const progress = Math.min((ts - startRef.current) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(ease * target);
            setDisplay(`${current}${suffix}`);
            if (progress < 1) frameRef.current = requestAnimationFrame(animate);
          };
          frameRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, suffix, duration]);

  return { display, elRef };
}

const stats = [
  {
    before: "72 hrs",
    after: "<60s",
    label: "Verification Speed",
    sub: "From 3-day wait to sub-minute results",
    animate: false,
  },
  {
    numeric: 90,
    suffix: "%+",
    label: "Detection Accuracy",
    sub: "Forgery and tamper detection confidence",
    animate: true,
  },
  {
    numeric: 30,
    suffix: "%",
    label: "Dropout Reduction",
    sub: "Faster KYB = more businesses converted",
    animate: true,
  },
];

function StatBlock({ stat }: { stat: (typeof stats)[0] }) {
  const { display, elRef } = useCountUp(stat.numeric ?? 0, stat.suffix ?? "", 1600);

  return (
    <div
      ref={elRef}
      className="stat-block"
      style={{
        flex: "1 1 220px",
        textAlign: "center",
        padding: "40px 32px",
        borderRight: "1px solid #E2E8F0",
      }}
    >
      <div
        style={{
          fontSize: "clamp(40px, 6vw, 56px)",
          fontWeight: 900,
          color: "#0F172A",
          letterSpacing: "-2px",
          lineHeight: 1,
          marginBottom: "8px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {stat.animate ? display : stat.before}
      </div>
      {!stat.animate && (
        <div
          style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            fontWeight: 700,
            color: "#22C55E",
            letterSpacing: "-0.5px",
            marginBottom: "8px",
          }}
        >
          {stat.after}
        </div>
      )}
      <div style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
        {stat.label}
      </div>
      <div style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.5 }}>{stat.sub}</div>
    </div>
  );
}

export function MetricsSection() {
  return (
    <section id="metrics" style={{ background: "linear-gradient(180deg, #F5F7FF 0%, #EDF0FA 100%)", padding: "80px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
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
            Impact
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.8px",
              margin: "0 0 12px",
            }}
          >
            Results That Matter
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            background: "#F8F9FB",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {stats.map((s) => (
            <StatBlock key={s.label} stat={s} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .stat-block {
            border-right: none !important;
            border-bottom: 1px solid #E2E8F0;
          }
          .stat-block:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
