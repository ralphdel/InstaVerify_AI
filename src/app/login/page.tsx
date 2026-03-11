import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { LoginForm } from './LoginForm';

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <span className="font-bold text-2xl text-primary tracking-tight">InstaVerify-AI</span>
          </Link>
          <p className="text-muted-foreground text-sm">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Sign in</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your credentials to access the operator dashboard.
            </p>
          </div>

          <LoginForm searchParams={searchParams} />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Protected admin area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
