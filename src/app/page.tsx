import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Zap, FileSearch } from "lucide-react";
import { LoginForm } from "./login/LoginForm";
import { RequestAccessForm } from "./login/RequestAccessForm";

export default function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden font-sans">
      
      {/* LEFT SIDE: Details & Branding (Navy Blue Variant) */}
      <div className="flex-1 bg-[#0A192F] text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-16">
            <ShieldCheck className="h-8 w-8 text-blue-400 mr-3" />
            <span className="font-bold text-2xl tracking-tight text-white">InstaVerify-AI</span>
          </div>
          
          <div className="max-w-xl">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium mb-8 text-blue-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2"></span>
              Sub-60s Verification Engine
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
              Instantly Verify <br className="hidden md:block"/> Business Entities.
            </h1>
            
            <p className="text-lg text-blue-100/80 mb-10 max-w-lg leading-relaxed">
              Eliminate the 72-hour delay in Nigerian fintech onboarding. AI-powered forensics for CAC certificates and utility bills.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mr-4 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Automated Forensics</h3>
                  <p className="text-sm text-blue-100/70 mt-1">Detect pixel manipulation and digital forgery instantly.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileSearch className="h-6 w-6 text-emerald-400 mr-4 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Instant Cross-referencing</h3>
                  <p className="text-sm text-blue-100/70 mt-1">Match Merchant Names and Addresses precisely.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-emerald-400 mr-4 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Scale Seamlessly</h3>
                  <p className="text-sm text-blue-100/70 mt-1">From waitlists to real-time approvals, built for the MVP stage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-16 text-sm text-blue-200/50">
          &copy; {new Date().getFullYear()} InstaVerify-AI. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: Login / Sign up Form */}
      <div className="w-full lg:w-1/2 xl:w-[45%] bg-white flex flex-col justify-center items-center p-8 lg:p-16 relative">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500">Sign in to your operator dashboard to manage verifications.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <LoginForm searchParams={searchParams} />
          </div>

          <RequestAccessForm />
        </div>
      </div>
    </div>
  );
}
