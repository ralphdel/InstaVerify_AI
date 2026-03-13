'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { requestPasswordReset } from './actions';
import { Loader2, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    // Pass the current origin to the server action to ensure the redirect URL is always accurate
    const origin = window.location.origin;
    formData.append('origin', origin);

    try {
      const result = await requestPasswordReset(formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        setSuccess(true);
        setIsLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-primary">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {success ? (
          <div className="space-y-6 text-center py-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-success/10 text-success">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Check your email</h2>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to your email address.
              </p>
            </div>
            <div className="space-y-4 pt-4">
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">
                  Return to Login
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full text-xs text-muted-foreground hover:text-primary"
                onClick={() => setSuccess(false)}
              >
                Didn't receive the email? Try again
              </Button>
            </div>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@instaverify.ai"
                required
                autoComplete="email"
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>

            <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
