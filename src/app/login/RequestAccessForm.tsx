'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2 } from 'lucide-react';

export function RequestAccessForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send request');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
        <CheckCircle2 className="h-5 w-5 mb-2 text-emerald-500" />
        <p className="text-sm font-medium text-center">Request sent!</p>
        <p className="text-xs text-center mt-1 opacity-80">
          The superadmin has been notified and will contact you shortly.
        </p>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button 
          onClick={() => setIsOpen(true)}
          className="font-semibold text-blue-600 hover:text-blue-500 border-b border-transparent hover:border-blue-500 transition-colors"
        >
          Request access
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-100">
      <p className="text-sm font-medium text-slate-900 mb-1">Request Operator Access</p>
      <p className="text-xs text-slate-500 mb-4">Enter your email address and the superadmin will create an account for you.</p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <p className="text-xs text-destructive bg-destructive/10 p-2 rounded">{error}</p>
        )}
        <div className="flex gap-2">
          <Input 
            type="email" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-10 text-sm"
          />
          <Button type="submit" disabled={isLoading} className="h-10">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Request'}
          </Button>
        </div>
        <button 
          type="button" 
          onClick={() => setIsOpen(false)}
          className="text-xs text-slate-400 hover:text-slate-600 w-full text-center"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
