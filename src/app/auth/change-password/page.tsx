'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { notifyPasswordChanged } from './actions';

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Use browser client to automatically parse the token hash from the URL
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
      } else {
        // Now trigger the metadata update and notification action server-side
        const result = await notifyPasswordChanged();
        if (result?.error) {
          setError(result.error);
          setIsLoading(false);
        } else {
          setSuccess(true);
        }
      }
    } catch {
      setError('Failed to update password. Please try again.');
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-sm p-8 text-center">
          <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">Password Updated</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your password has been successfully updated. You can now access your dashboard.
          </p>
          <Button asChild className="w-full">
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex flex-col items-center mb-10">
          <ShieldCheck className="h-10 w-10 text-primary mb-3" />
          <h1 className="text-2xl font-bold text-foreground tracking-tight text-center">Update Password</h1>
          <p className="text-muted-foreground text-sm mt-1 text-center">
            You are required to change your password on first login.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm p-8">
          <form action={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="••••••••"
                required
                className="h-11"
              />
              <p className="text-[11px] text-muted-foreground">
                Minimum 8 characters. Make it secure.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-medium mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update & Sign in'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
