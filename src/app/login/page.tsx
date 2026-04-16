import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Zap, FileCheck, ArrowLeft } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RequestAccessForm } from './RequestAccessForm';

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>

      {/* Top navbar */}
      <nav
        style={{
          backgroundColor: '#F0F4FF',
          borderBottom: '1px solid rgba(148,163,184,0.2)',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#0F172A',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck style={{ width: '20px', height: '20px', color: '#22C55E' }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '17px', color: '#0F172A', letterSpacing: '-0.3px' }}>
            InstaVerify-AI
          </span>
        </Link>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#64748B',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'color 0.15s',
          }}
        >
          <ArrowLeft style={{ width: '14px', height: '14px' }} />
          Back to Home
        </Link>
      </nav>

      {/* Main content: Split layout */}
      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap' }}>

        {/* Left Panel — Branding */}
        <div
          className="login-left-panel"
          style={{
            flex: '1 1 460px',
            background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '64px 48px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative gradient orbs */}
          <div style={{ position: 'absolute', top: '-100px', right: '-50px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '-40px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '20px',
                padding: '5px 14px',
                marginBottom: '32px',
              }}
            >
              <span style={{ width: 6, height: 6, background: '#22C55E', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: '#22C55E', fontWeight: 600 }}>Live Platform</span>
            </div>

            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#F8F9FB', letterSpacing: '-1px', lineHeight: 1.15, margin: '0 0 20px' }}>
              Verify Documents<br />
              <span style={{ color: '#22C55E' }}>in Under 60 Seconds</span>
            </h2>

            <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: 1.7, margin: '0 0 40px', maxWidth: '400px' }}>
              AI-powered forensic verification for CAC Certificates and Utility Bills. Trusted by fintech compliance teams across Nigeria.
            </p>

            {/* Feature list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: <Zap style={{ width: '16px', height: '16px', color: '#22C55E' }} />, text: 'Sub-60s turnaround — no manual reviewers needed' },
                { icon: <FileCheck style={{ width: '16px', height: '16px', color: '#22C55E' }} />, text: 'Forensic fraud detection with full audit trail' },
                { icon: <CheckCircle2 style={{ width: '16px', height: '16px', color: '#22C55E' }} />, text: '90%+ accuracy on forgery & tamper detection' },
              ].map((feature) => (
                <div key={feature.text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {feature.icon}
                  </div>
                  <span style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.5 }}>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div style={{ marginTop: '48px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(226,232,240,0.08)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '18px' }}>🥉</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#F8F9FB' }}>2nd Runner-Up — 3MTT Lagos AI Showcase</span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                Rated #1 for relevance by fintech judges. Built, shipped, and validated in real-world use.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel — Login + Request Access */}
        <div
          className="login-right-panel"
          style={{
            flex: '1 1 460px',
            background: 'linear-gradient(180deg, #F0F4FF 0%, #E8EDF5 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative */}
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
            {/* Login Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(226,232,240,0.6)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 24px rgba(15,23,42,0.06)',
              marginBottom: '20px',
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px', margin: '0 0 6px' }}>
                  Sign in to your account
                </h1>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                  Enter your credentials to access the operator dashboard.
                </p>
              </div>
              <LoginForm searchParams={searchParams} />
            </div>

            {/* Request Access Card — Always visible */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(226,232,240,0.6)',
              borderRadius: '16px',
              padding: '28px 32px',
              boxShadow: '0 4px 24px rgba(15,23,42,0.04)',
            }}>
              <RequestAccessForm />
            </div>

            {/* Copyright  */}
            <div style={{
              marginTop: '32px',
              textAlign: 'center',
              borderTop: '1px solid rgba(148,163,184,0.15)',
              paddingTop: '20px',
            }}>
              <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#94A3B8' }}>
                © {new Date().getFullYear()} InstaVerify-AI. All rights reserved.
              </p>
              <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8' }}>
                Built by <span style={{ fontWeight: 600, color: '#64748B' }}>Ayodele Rapheal Ojo</span> · Lagos, Nigeria 🇳🇬
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-left-panel { display: none !important; }
          .login-right-panel { flex: 1 1 100% !important; padding: 32px 16px !important; }
        }
        @media (max-width: 480px) {
          .login-right-panel { padding: 24px 12px !important; }
        }
      `}</style>
    </div>
  );
}
