'use client';

import { use, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from './actions';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = use(searchParams);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (params.error) {
      setError(params.error);
    }
  }, [params.error]);

  async function handleSubmit(formData: FormData) {
    const password = formData.get('password') as string;
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await login(formData);
    } catch {
      // login redirects on success, so if we reach here something went wrong
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" size-10 className="text-sm font-medium">
            Password
          </Label>
          <Link 
            href="/auth/forgot-password" 
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            className="h-11 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Must be at least 8 characters.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-sm font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </Button>
    </form>
  );
}
