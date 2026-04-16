"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "#solution" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Use Cases", href: "#use-cases" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(240,244,255,0.95)" : "#F0F4FF",
        borderBottom: scrolled ? "1px solid rgba(148,163,184,0.2)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#0F172A",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck style={{ width: "20px", height: "20px", color: "#22C55E" }} />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "17px",
              color: "#0F172A",
              letterSpacing: "-0.3px",
            }}
          >
            InstaVerify-AI
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: "#64748B",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F172A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="nav-desktop">
          <Link
            href="/login"
            style={{
              color: "#64748B",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0F172A";
              e.currentTarget.style.backgroundColor = "#F1F5F9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748B";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Login
          </Link>
          <a
            href="#demo"
            style={{
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              padding: "9px 20px",
              borderRadius: "7px",
              textDecoration: "none",
              transition: "background-color 0.15s",
              border: "1px solid #0F172A",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E293B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0F172A")}
          >
            Request a Demo
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "#0F172A",
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X style={{ width: "22px", height: "22px" }} /> : <Menu style={{ width: "22px", height: "22px" }} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="nav-mobile"
          style={{
            backgroundColor: "#F0F4FF",
            borderTop: "1px solid #E2E8F0",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: "#0F172A",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/login" onClick={() => setMobileOpen(false)} style={{ color: "#64748B", fontSize: "14px", textDecoration: "none" }}>
              Login
            </Link>
            <a
              href="#demo"
              onClick={() => setMobileOpen(false)}
              style={{
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 600,
                padding: "10px 20px",
                borderRadius: "7px",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Request a Demo
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .nav-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
