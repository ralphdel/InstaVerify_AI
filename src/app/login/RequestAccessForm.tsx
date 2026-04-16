'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2, UserPlus, Mail } from 'lucide-react';

export function RequestAccessForm() {
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(34,197,94,0.02) 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(34,197,94,0.15)',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(34,197,94,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '14px',
        }}>
          <CheckCircle2 style={{ width: '24px', height: '24px', color: '#22C55E' }} />
        </div>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', margin: '0 0 6px', textAlign: 'center' }}>
          Request Sent Successfully!
        </p>
        <p style={{ fontSize: '13px', color: '#64748B', margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
          The superadmin has been notified and will contact you shortly with your credentials.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <UserPlus style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
        </div>
        <div>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 2px', letterSpacing: '-0.3px' }}>
            Request Operator Access
          </p>
          <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
            Don&apos;t have an account? Request one below.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{
            fontSize: '13px',
            color: '#EF4444',
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.15)',
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '12px',
          }}>
            {error}
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Mail style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: '#94A3B8',
              pointerEvents: 'none',
            }} />
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 text-sm"
              style={{ paddingLeft: '38px' }}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 px-5"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.02em',
            }}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Request Access'}
          </Button>
        </div>
        <p style={{
          fontSize: '11px',
          color: '#94A3B8',
          margin: '10px 0 0',
          lineHeight: 1.5,
        }}>
          The superadmin will receive your request and create your account. You&apos;ll be contacted via email.
        </p>
      </form>
    </div>
  );
}
