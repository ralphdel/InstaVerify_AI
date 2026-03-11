import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-6 flex items-center">
        <ShieldCheck className="h-8 w-8 text-primary mr-2" />
        <span className="font-bold text-xl text-primary tracking-tight">InstaVerify-AI</span>
      </div>
      
      <main className="max-w-3xl px-6 text-center z-10">
        <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-success mr-2"></span>
          Sub-60s Verification Engine
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground mb-6">
          AI-Powered <br className="hidden md:block"/> Document Verification
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Eliminate the 72-hour delay in Nigerian fintech onboarding. Verify CAC certificates and utility bills in under 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/upload">
            <Button size="lg" className="h-14 px-8 text-base shadow-sm">
              Verify Document <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="h-14 px-8 text-base bg-card shadow-sm">
              View Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
