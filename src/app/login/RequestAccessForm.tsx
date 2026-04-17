'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2, UserPlus, Mail, User, Building2, Briefcase } from 'lucide-react';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  role?: string;
}

export function RequestAccessForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const errors: FormErrors = {};

    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (firstName.trim().length < 2) {
      errors.firstName = 'Must be at least 2 characters';
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (lastName.trim().length < 2) {
      errors.lastName = 'Must be at least 2 characters';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!company.trim()) {
      errors.company = 'Company name is required';
    }

    if (!role.trim()) {
      errors.role = 'Role is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          company: company.trim(),
          role: role.trim(),
        }),
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
          Thanks {firstName}! We&apos;ve received your request and will contact you at <strong>{email}</strong> shortly.
        </p>
      </div>
    );
  }

  const inputStyle = (hasError: boolean) => ({
    borderColor: hasError ? '#EF4444' : undefined,
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
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
            Don&apos;t have an account? Fill in your details below.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {error && (
          <div style={{
            fontSize: '13px',
            color: '#EF4444',
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.15)',
            padding: '10px 14px',
            borderRadius: '8px',
          }}>
            {error}
          </div>
        )}

        {/* Name row */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8', pointerEvents: 'none' }} />
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); if (fieldErrors.firstName) setFieldErrors(prev => ({ ...prev, firstName: undefined })); }}
                className="h-10 text-sm"
                style={{ paddingLeft: '36px', ...inputStyle(!!fieldErrors.firstName) }}
              />
            </div>
            {fieldErrors.firstName && <p style={{ fontSize: '11px', color: '#EF4444', margin: '4px 0 0 2px' }}>{fieldErrors.firstName}</p>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8', pointerEvents: 'none' }} />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); if (fieldErrors.lastName) setFieldErrors(prev => ({ ...prev, lastName: undefined })); }}
                className="h-10 text-sm"
                style={{ paddingLeft: '36px', ...inputStyle(!!fieldErrors.lastName) }}
              />
            </div>
            {fieldErrors.lastName && <p style={{ fontSize: '11px', color: '#EF4444', margin: '4px 0 0 2px' }}>{fieldErrors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8', pointerEvents: 'none' }} />
            <Input
              type="email"
              placeholder="Work Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined })); }}
              className="h-10 text-sm"
              style={{ paddingLeft: '36px', ...inputStyle(!!fieldErrors.email) }}
            />
          </div>
          {fieldErrors.email && <p style={{ fontSize: '11px', color: '#EF4444', margin: '4px 0 0 2px' }}>{fieldErrors.email}</p>}
        </div>

        {/* Company + Role row */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <Building2 style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8', pointerEvents: 'none' }} />
              <Input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => { setCompany(e.target.value); if (fieldErrors.company) setFieldErrors(prev => ({ ...prev, company: undefined })); }}
                className="h-10 text-sm"
                style={{ paddingLeft: '36px', ...inputStyle(!!fieldErrors.company) }}
              />
            </div>
            {fieldErrors.company && <p style={{ fontSize: '11px', color: '#EF4444', margin: '4px 0 0 2px' }}>{fieldErrors.company}</p>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <Briefcase style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8', pointerEvents: 'none' }} />
              <Input
                type="text"
                placeholder="Your Role"
                value={role}
                onChange={(e) => { setRole(e.target.value); if (fieldErrors.role) setFieldErrors(prev => ({ ...prev, role: undefined })); }}
                className="h-10 text-sm"
                style={{ paddingLeft: '36px', ...inputStyle(!!fieldErrors.role) }}
              />
            </div>
            {fieldErrors.role && <p style={{ fontSize: '11px', color: '#EF4444', margin: '4px 0 0 2px' }}>{fieldErrors.role}</p>}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full"
          style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
            border: 'none',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.02em',
            marginTop: '4px',
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Request Access'
          )}
        </Button>

        <p style={{ fontSize: '11px', color: '#94A3B8', margin: '2px 0 0', lineHeight: 1.5, textAlign: 'center' }}>
          We&apos;ll review your request and send login credentials to your email.
        </p>
      </form>
    </div>
  );
}
